window.CraftLogHelpers = (function createCraftLogHelpers() {
  // Brenndauer in Vierteln eines Schmelzvorgangs.
  // Dadurch lassen sich auch Stock (2) und Bambus (1) ohne Rundungsfehler berechnen.
  const fuels = [
    { id: "minecraft:coal", quarters: 32 },
    { id: "minecraft:charcoal", quarters: 32 },
    { id: "minecraft:coal_block", quarters: 320 },
    { id: "minecraft:dried_kelp_block", quarters: 80 },
    { id: "minecraft:blaze_rod", quarters: 48 },
    { id: "minecraft:stick", quarters: 2 },
    { id: "minecraft:bamboo", quarters: 1 },
    { id: "minecraft:lava_bucket", quarters: 400, reusableBucket: true }
  ];

  // Rohstoffe, die direkt abgebaut werden und nicht über Erz-Schmelzen
  // oder Block-Zerlegen als Handwerksschritt geplant werden sollen.
  const BASE_RESOURCES = new Set([
    "minecraft:redstone",
    "minecraft:coal",
    "minecraft:lapis_lazuli",
    "minecraft:diamond",
    "minecraft:emerald",
    "minecraft:quartz"
  ]);
const ICON_BASE_URL = "./assets/icons";

  function iconUrlForItem(id) {
    const shortId = fullId(id).replace(/^minecraft:/, "");
    return `${ICON_BASE_URL}/${encodeURIComponent(shortId)}.png`;
  }

  function applyItemIcon(container, id) {
    let img = container.querySelector("img.mc-icon-img");
    if (!img) {
      img = document.createElement("img");
      img.className = "mc-icon-img";
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";

      img.addEventListener("load", () => {
        if (img.isConnected) {
          container.classList.add("has-icon");
        }
      });

      img.addEventListener("error", () => {
        container.classList.remove("has-icon");
        img.hidden = true;
      });

      container.append(img);
    }

    img.hidden = false;
    img.src = iconUrlForItem(id);
  }

  const MATERIAL_COLORS = [
    [/pale_oak/, "#d6d2cc"],
    [/dark_oak/, "#49331d"],
    [/oak/, "#b8945f"],
    [/spruce/, "#7a5934"],
    [/birch/, "#d8cb9e"],
    [/jungle/, "#a87853"],
    [/acacia/, "#ba6337"],
    [/mangrove/, "#773636"],
    [/cherry/, "#e4b4bc"],
    [/bamboo/, "#c9b44c"],
    [/crimson/, "#7e354e"],
    [/warped/, "#2b6e6c"],
    [/light_blue/, "#4aa3d8"],
    [/light_gray/, "#9da09b"],
    [/white/, "#eaeded"],
    [/orange/, "#e06c1d"],
    [/magenta/, "#b83da8"],
    [/yellow/, "#e5c229"],
    [/lime/, "#68b824"],
    [/pink/, "#e588a8"],
    [/gray/, "#52585b"],
    [/cyan/, "#1d8694"],
    [/purple/, "#7a32a8"],
    [/blue/, "#3446a2"],
    [/brown/, "#6d4426"],
    [/green/, "#4f6b24"],
    [/red_sand/, "#b8622b"],
    [/red/, "#9e2b25"],
    [/blackstone/, "#322e36"],
    [/black/, "#24262a"],
    [/deepslate/, "#4c4e52"],
    [/granite/, "#9c6c5c"],
    [/diorite/, "#cececf"],
    [/andesite|cobblestone|stone/, "#878a88"],
    [/sand/, "#dbd0a0"],
    [/charcoal/, "#463b32"],
    [/coal/, "#2c2c2c"],
    [/copper/, "#c06b4f"],
    [/iron/, "#d4d4d4"],
    [/gold/, "#ebd044"],
    [/diamond/, "#4ee2d8"],
    [/emerald/, "#39c964"],
    [/netherite/, "#474044"],
    [/amethyst/, "#9b69d4"],
    [/quartz/, "#ece6dd"],
    [/prismarine/, "#5da399"],
    [/obsidian/, "#291e3a"]
  ];

  function fullId(id) {
    return String(id || "").startsWith("minecraft:")
      ? String(id)
      : `minecraft:${id}`;
  }

  function isBaseResource(id) {
    return BASE_RESOURCES.has(fullId(id));
  }

  function optionsFor(ingredient) {
    if (ingredient?.item) {
      return [ingredient.item];
    }

    if (Array.isArray(ingredient?.alternatives)) {
      return [
        ...new Set(
          ingredient.alternatives.flatMap(optionsFor)
        )
      ];
    }

    return [];
  }

  function isOreSmeltingRecipe(recipe) {
    if (
      !recipe ||
      !["smelting", "blasting"].includes(recipe.type) ||
      !Array.isArray(recipe.ingredients) ||
      recipe.ingredients.length === 0
    ) {
      return false;
    }

    return recipe.ingredients.every(ingredient => {
      const options = optionsFor(ingredient);
      return (
        options.length > 0 &&
        options.every(opt => /_ore$/.test(fullId(opt)))
      );
    });
  }

  function isRedundantDecompressionRecipe(id, recipe, minecraft) {
    if (
      !recipe ||
      !["crafting_shaped", "crafting_shapeless"].includes(recipe.type) ||
      !Array.isArray(recipe.ingredients)
    ) {
      return false;
    }

    const outCount = Number(recipe.count);

    // 1. Lagerblock wieder in 9 Einzelitems zerlegen (z. B. 1 × Roheisenblock -> 9 × Roheisen).
    // Klumpen (z. B. 1 × Eisenbarren -> 9 × Eisenklumpen für Laternen) bleiben erlaubt.
    if (
      outCount === 9 &&
      recipe.ingredients.length === 1 &&
      !/_nugget$/.test(id)
    ) {
      const options = optionsFor(recipe.ingredients[0]);
      if (options.length === 1) {
        const blockId = fullId(options[0]);
        const blockRecipes = minecraft?.recipes?.[blockId] || [];
        const canPackBack = blockRecipes.some(
          r =>
            Number(r.count) === 1 &&
            Array.isArray(r.ingredients) &&
            r.ingredients.length === 9 &&
            r.ingredients.every(ing => {
              const opts = optionsFor(ing);
              return opts.length === 1 && fullId(opts[0]) === id;
            })
        );
        if (canPackBack) {
          return true;
        }
      }
    }

    // 2. 9 Klumpen wieder zu 1 Barren zusammensetzen (z. B. 9 × Eisenklumpen -> 1 × Eisenbarren)
    if (outCount === 1 && recipe.ingredients.length === 9) {
      const allSameNugget = recipe.ingredients.every(ing => {
        const opts = optionsFor(ing);
        return opts.length === 1 && /_nugget$/.test(fullId(opts[0]));
      });
      if (allSameNugget) {
        return true;
      }
    }

    return false;
  }

  function getEffectiveRecipes(id, minecraft) {
    const normalized = fullId(id);
    if (isBaseResource(normalized)) {
      return [];
    }

    const recipes = minecraft?.recipes?.[normalized] || [];
    if (recipes.length === 0) {
      return [];
    }

    const withoutDecompression = recipes.filter(
      recipe => !isRedundantDecompressionRecipe(normalized, recipe, minecraft)
    );

    if (withoutDecompression.length <= 1) {
      return withoutDecompression;
    }

    const withoutOreSmelting = withoutDecompression.filter(
      recipe => !isOreSmeltingRecipe(recipe)
    );

    return withoutOreSmelting.length > 0
      ? withoutOreSmelting
      : withoutDecompression;
  }

  function colorForItem(id) {
    const shortId = fullId(id).replace(/^minecraft:/, "");

    for (const [pattern, color] of MATERIAL_COLORS) {
      if (pattern.test(shortId)) {
        return color;
      }
    }

    let hash = 0;
    for (let i = 0; i < shortId.length; i++) {
      hash = (hash * 31 + shortId.charCodeAt(i)) >>> 0;
    }

    const hue = hash % 360;
    return `hsl(${hue}, 38%, 52%)`;
  }

  function getRecipeTypeNames(language) {
    const de = language === "de";
    return {
      crafting_shaped: de ? "Werkbank" : "Crafting Table",
      crafting_shapeless: de ? "Werkbank" : "Crafting Table",
      smelting: de ? "Ofen" : "Furnace",
      blasting: de ? "Hochofen" : "Blast Furnace",
      smoking: de ? "Räucherofen" : "Smoker",
      campfire_cooking: de ? "Lagerfeuer" : "Campfire",
      stonecutting: de ? "Steinsäge" : "Stonecutter",
      smithing_transform: de ? "Schmiedetisch" : "Smithing Table"
    };
  }

  function getSourceCategoryLabels(language) {
    const de = language === "de";
    return {
      location: de ? "Fundort / Abbauen" : "Location / Mining",
      farm: de ? "Farm" : "Farming",
      trade: de ? "Villager-Handel" : "Villager Trading",
      loot: de ? "Loot / Truhen" : "Loot / Chests",
      craft: de ? "Herstellung" : "Crafting",
      fuel: de ? "Brennstoff" : "Fuel",
      other: de ? "Allgemeine Rohstoffe" : "General Resources"
    };
  }

  function formatQuantity(amount, unitMode) {
    const n = Math.max(0, Math.floor(Number(amount) || 0));

    if (unitMode === "shulkers" && n >= 1728) {
      const shulkers = Math.floor(n / 1728);
      const restAfterShulker = n % 1728;
      const stacks = Math.floor(restAfterShulker / 64);
      const rest = restAfterShulker % 64;
      const parts = [`${shulkers} Shulker`];
      if (stacks > 0) {
        parts.push(stacks === 1 ? "1 Stack" : `${stacks} Stacks`);
      }
      if (rest > 0) {
        parts.push(`${rest}`);
      }
      return parts.join(" + ");
    }

    if ((unitMode === "stacks" || unitMode === "shulkers") && n >= 64) {
      const stacks = Math.floor(n / 64);
      const rest = n % 64;
      const label = stacks === 1 ? "1 Stack" : `${stacks} Stacks`;
      return rest > 0 ? `${label} + ${rest}` : label;
    }

    return String(n);
  }

  function describeIngredientGroup(optionIds, rawIngredient, nameOf, language) {
    const de = language === "de";
    const ids = (optionIds || []).map(id =>
      fullId(id).replace(/^minecraft:/, "")
    );

    const tag = rawIngredient?.tag
      ? fullId(rawIngredient.tag).replace(/^minecraft:/, "")
      : "";

    const tagLabels = {
      planks: de ? "Beliebige Holzbretter" : "Any Wooden Planks",
      logs: de ? "Beliebige Stämme" : "Any Logs",
      logs_that_burn: de ? "Beliebige Stämme" : "Any Logs",
      wooden_slabs: de ? "Beliebige Holzstufen" : "Any Wooden Slabs",
      wooden_stairs: de ? "Beliebige Holztreppen" : "Any Wooden Stairs",
      wool: de ? "Beliebige Wolle" : "Any Wool",
      stone_tool_materials: de
        ? "Bruchstein / Tiefenschiefer / Schwarzstein"
        : "Cobblestone / Deepslate / Blackstone",
      stone_crafting_materials: de
        ? "Bruchstein / Tiefenschiefer / Schwarzstein"
        : "Cobblestone / Deepslate / Blackstone",
      coals: de ? "Kohle oder Holzkohle" : "Coal or Charcoal",
      sand: de ? "Beliebiger Sand" : "Any Sand",
      smelts_to_glass: de ? "Sand oder Roter Sand" : "Sand or Red Sand",
      flowers: de ? "Beliebige Blume" : "Any Flower",
      small_flowers: de ? "Beliebige Blume" : "Any Flower",
      saplings: de ? "Beliebiger Setzling" : "Any Sapling"
    };

    if (tag && tagLabels[tag]) {
      return tagLabels[tag];
    }

    if (ids.length === 0) {
      return tag ? (de ? `Gruppe ${tag}` : `Group ${tag}`) : "";
    }

    if (ids.length === 1) {
      return nameOf(ids[0]);
    }

    const every = fn => ids.every(fn);
    const idSet = new Set(ids);

    if (every(id => id.endsWith("_planks"))) {
      return de ? "Beliebige Holzbretter" : "Any Wooden Planks";
    }

    if (
      every(
        id =>
          id.endsWith("_log") ||
          id.endsWith("_stem") ||
          id.endsWith("_wood") ||
          id.endsWith("_hyphae")
      )
    ) {
      return de ? "Beliebige Stämme / Holz" : "Any Logs / Wood";
    }

    if (every(id => id.endsWith("_slab"))) {
      const woodPrefixes = [
        "oak_",
        "spruce_",
        "birch_",
        "jungle_",
        "acacia_",
        "dark_oak_",
        "mangrove_",
        "cherry_",
        "pale_oak_",
        "bamboo_",
        "crimson_",
        "warped_"
      ];

      if (every(id => woodPrefixes.some(prefix => id.startsWith(prefix)))) {
        return de ? "Beliebige Holzstufen" : "Any Wooden Slabs";
      }

      return de ? "Beliebige Stufen" : "Any Slabs";
    }

    if (every(id => id.endsWith("_wool"))) {
      return de ? "Beliebige Wolle" : "Any Wool";
    }

    if (every(id => id.endsWith("_carpet"))) {
      return de ? "Beliebiger Teppich" : "Any Carpet";
    }

    if (every(id => id.endsWith("_bed"))) {
      return de ? "Beliebiges Bett" : "Any Bed";
    }

    if (every(id => id.endsWith("_banner"))) {
      return de ? "Beliebiges Banner" : "Any Banner";
    }

    if (every(id => id.endsWith("_glazed_terracotta"))) {
      return de ? "Beliebige glasierte Keramik" : "Any Glazed Terracotta";
    }

    if (every(id => id.endsWith("_terracotta"))) {
      return de ? "Beliebige Keramik" : "Any Terracotta";
    }

    if (every(id => id.endsWith("_concrete_powder"))) {
      return de ? "Beliebiger Trockenbeton" : "Any Concrete Powder";
    }

    if (every(id => id.endsWith("_concrete"))) {
      return de ? "Beliebiger Beton" : "Any Concrete";
    }

    if (every(id => id === "glass" || id.endsWith("_stained_glass"))) {
      return de ? "Beliebiges Glas" : "Any Glass";
    }

    if (
      every(id => id === "glass_pane" || id.endsWith("_stained_glass_pane"))
    ) {
      return de ? "Beliebige Glasscheibe" : "Any Glass Pane";
    }

    if (every(id => id.endsWith("_candle"))) {
      return de ? "Beliebige Kerze" : "Any Candle";
    }

    if (every(id => id.endsWith("_shulker_box"))) {
      return de ? "Beliebige Shulker-Kiste" : "Any Shulker Box";
    }

    if (
      every(
        id =>
          id.endsWith("_sapling") ||
          id === "mangrove_propagule" ||
          id === "azalea" ||
          id === "flowering_azalea"
      )
    ) {
      return de ? "Beliebiger Setzling" : "Any Sapling";
    }

    if (every(id => id.endsWith("_dye"))) {
      return de ? "Beliebiger Farbstoff" : "Any Dye";
    }

    if (
      ids.length === 2 &&
      idSet.has("coal") &&
      idSet.has("charcoal")
    ) {
      return de ? "Kohle oder Holzkohle" : "Coal or Charcoal";
    }

    if (
      ids.length === 2 &&
      idSet.has("sand") &&
      idSet.has("red_sand")
    ) {
      return de ? "Sand oder Roter Sand" : "Sand or Red Sand";
    }

    if (
      every(id =>
        ["cobblestone", "cobbled_deepslate", "blackstone"].includes(id)
      )
    ) {
      return de
        ? "Bruchstein / Tiefenschiefer / Schwarzstein"
        : "Cobblestone / Deepslate / Blackstone";
    }

    if (ids.length === 2) {
      return de
        ? `${nameOf(ids[0])} oder ${nameOf(ids[1])}`
        : `${nameOf(ids[0])} or ${nameOf(ids[1])}`;
    }

    return de
      ? `Beliebige Zutat (${ids.length} Varianten)`
      : `Any ingredient (${ids.length} variants)`;
  }

  function summarizeRecipeIngredients(recipe, nameOf, language) {
    if (!recipe || !Array.isArray(recipe.ingredients)) {
      return "";
    }

    const groups = new Map();

    for (const ingredient of recipe.ingredients) {
      const options = optionsFor(ingredient);
      const label =
        options.length === 1
          ? nameOf(options[0])
          : describeIngredientGroup(options, ingredient, nameOf, language);

      if (!label) continue;
      groups.set(label, (groups.get(label) || 0) + 1);
    }

    return [...groups.entries()]
      .map(([label, count]) => `${count} × ${label}`)
      .join(" + ");
  }

  function buildDistinctRecipeOptions(recipes, nameOf, language) {
    const recipeTypeNames = getRecipeTypeNames(language);
    const seenSignatures = new Set();
    const options = [];

    recipes.forEach((recipe, index) => {
      const ingredientSummary = summarizeRecipeIngredients(
        recipe,
        nameOf,
        language
      );
      const signature = `${recipe.type}|${recipe.count || 1}|${ingredientSummary}`;

      if (seenSignatures.has(signature)) {
        return;
      }
      seenSignatures.add(signature);

      const station = recipeTypeNames[recipe.type] || recipe.type;
      const outCount = recipe.count || 1;
      const label = ingredientSummary
        ? `${station}: ${ingredientSummary} → ${outCount} ×`
        : `${station} (${outCount} ×)`;

      options.push({
        value: String(index),
        label
      });
    });

    return options;
  }

  return {
    fuels,
    fullId,
    isBaseResource,
    getEffectiveRecipes,
    colorForItem,
    applyItemIcon,
    getRecipeTypeNames,
    getSourceCategoryLabels,
    formatQuantity,
    optionsFor,
    describeIngredientGroup,
    buildDistinctRecipeOptions
  };
})();