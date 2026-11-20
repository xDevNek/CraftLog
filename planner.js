window.createMaterialPlan = function createMaterialPlan(
  item,
  minecraft,
  nameOf,
  language,
  save,
  onQuantitySync
) {
  const de = language === "de";
  const recipesById = minecraft.recipes;

  const recipeTypeNames = {
    crafting_shaped: de ? "Werkbank" : "Crafting Table",
    crafting_shapeless: de ? "Werkbank" : "Crafting Table",
    smelting: de ? "Ofen" : "Furnace",
    blasting: de ? "Hochofen" : "Blast Furnace",
    smoking: de ? "Räucherofen" : "Smoker",
    campfire_cooking: de ? "Lagerfeuer" : "Campfire",
    stonecutting: de ? "Steinsäge" : "Stonecutter",
    smithing_transform: de ? "Schmiedetisch" : "Smithing Table"
  };

  // Brenndauer in Vierteln eines Schmelzvorgangs.
  // Dadurch lassen sich auch Stock und Bambus ohne
  // Rundungsfehler berechnen.
  const fuels = [
    {
      id: "minecraft:coal",
      quarters: 32
    },
    {
      id: "minecraft:charcoal",
      quarters: 32
    },
    {
      id: "minecraft:coal_block",
      quarters: 320
    },
    {
      id: "minecraft:dried_kelp_block",
      quarters: 80
    },
    {
      id: "minecraft:blaze_rod",
      quarters: 48
    },
    {
      id: "minecraft:stick",
      quarters: 2
    },
    {
      id: "minecraft:bamboo",
      quarters: 1
    },
    {
      id: "minecraft:lava_bucket",
      quarters: 400,
      reusableBucket: true
    }
  ];

  if (
    !item.planChoices ||
    typeof item.planChoices !== "object"
  ) {
    item.planChoices = {};
  }

  if (!fuels.some(fuel => fuel.id === item.planFuel)) {
    item.planFuel = "minecraft:coal";
  }

  let calcQuantity = Math.max(1, Number(item.quantity) || 1);

  const details = document.createElement("details");
  details.className = "material-plan";

  const heading = document.createElement("summary");
  heading.textContent = de
    ? "Rekursiver Rohstoff-Rechner"
    : "Recursive raw material calculator";

  const body = document.createElement("div");
  body.className = "material-plan-body";

  details.append(heading, body);

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) {
      node.className = className;
    }

    if (content !== undefined) {
      node.textContent = content;
    }

    return node;
  }

  function fullId(id) {
    return String(id || "").startsWith("minecraft:")
      ? String(id)
      : `minecraft:${id}`;
  }

  function formatStacks(amount) {
    if (!Number.isFinite(amount) || amount < 64) {
      return "";
    }

    const stacks = Math.floor(amount / 64);
    const rest = amount % 64;
    const stackLabel =
      stacks === 1 ? "1 Stack" : `${stacks} Stacks`;

    return rest > 0
      ? `${stackLabel} + ${rest}`
      : stackLabel;
  }

  function addAmount(map, id, amount) {
    map.set(id, (map.get(id) || 0) + amount);
  }

  function ingredientOptions(ingredient) {
    if (ingredient?.item) {
      return [ingredient.item];
    }

    if (Array.isArray(ingredient?.alternatives)) {
      return [
        ...new Set(
          ingredient.alternatives.flatMap(
            ingredientOptions
          )
        )
      ];
    }

    return [];
  }

  function describeGroup(optionIds, rawIngredient) {
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
      smelts_to_glass: de ? "Sand oder Roter Sand" : "Sand or Red Sand"
    };

    if (tag && tagLabels[tag]) {
      return tagLabels[tag];
    }

    if (ids.length <= 1) {
      return ids[0] ? nameOf(ids[0]) : "";
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

    if (every(id => id.endsWith("_wool"))) {
      return de ? "Beliebige Wolle" : "Any Wool";
    }

    if (
      ids.length === 2 &&
      idSet.has("coal") &&
      idSet.has("charcoal")
    ) {
      return de ? "Kohle oder Holzkohle" : "Coal or Charcoal";
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

  function makeSelect(
    options,
    savedValue,
    placeholder,
    onChange
  ) {
    const select = document.createElement("select");
    select.className = "material-plan-select";

    if (placeholder) {
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = placeholder;
      select.append(empty);
    }

    for (const optionData of options) {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.label;
      select.append(option);
    }

    select.value = savedValue || "";

    select.addEventListener("change", () => {
      onChange(select.value);
      save();
      draw();
    });

    return select;
  }

  function fuelDescription(fuel) {
    const operations = fuel.quarters / 4;

    if (de) {
      return `${nameOf(fuel.id)} · ${operations} Vorgänge`;
    }

    return `${nameOf(fuel.id)} · ${operations} operations`;
  }

  function draw() {
    body.replaceChildren();

    const rawMaterials = new Map();
    const cooking = new Map();
    const warnings = [];
    const listQuantity = Math.max(1, Number(item.quantity) || 1);

    // 1. Mengen-Multiplikator & Brennstoff
    const settingsBox = element(
      "div",
      "material-plan-setting"
    );

    const controlsGrid = element(
      "div",
      "material-plan-controls"
    );

    // Multiplikator-Steuerung
    const multiplierBlock = element(
      "div",
      "material-plan-multiplier"
    );

    const multiplierLabel = element(
      "label",
      "",
      de ? "Mengen-Multiplikator (Zielmenge)" : "Quantity multiplier (target)"
    );

    const multiplierInputRow = element(
      "div",
      "material-plan-multiplier-row"
    );

    const multiplierInput = document.createElement("input");
    multiplierInput.type = "number";
    multiplierInput.className = "material-plan-qty-input";
    multiplierInput.min = "1";
    multiplierInput.step = "1";
    multiplierInput.value = String(calcQuantity);
    multiplierInput.setAttribute(
      "aria-label",
      de ? "Menge berechnen für" : "Calculate quantity for"
    );

    const applyMultiplier = () => {
      const parsed = Number(multiplierInput.value);
      if (Number.isSafeInteger(parsed) && parsed >= 1) {
        calcQuantity = parsed;
        draw();
      } else {
        multiplierInput.value = String(calcQuantity);
      }
    };

    multiplierInput.addEventListener("change", applyMultiplier);
    multiplierInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyMultiplier();
      }
    });

    const stackInfo = formatStacks(calcQuantity);
    const unitHint = element(
      "span",
      "material-plan-unit-hint",
      stackInfo
        ? `${de ? "Stück" : "items"} (${stackInfo})`
        : (de ? "Stück" : "items")
    );

    multiplierInputRow.append(multiplierInput, unitHint);
    multiplierLabel.append(multiplierInputRow);
    multiplierBlock.append(multiplierLabel);

    // Schnellwahl-Presets
    const presetRow = element(
      "div",
      "material-plan-presets"
    );

    const presets = [
      {
        value: listQuantity,
        label: de
          ? `Liste (${listQuantity})`
          : `List (${listQuantity})`
      },
      { value: 1, label: "1" },
      { value: 16, label: "16" },
      { value: 64, label: "64 (1 Stack)" },
      { value: 576, label: "576 (9 Stacks)" }
    ];

    const seenPresets = new Set();

    for (const preset of presets) {
      if (seenPresets.has(preset.value)) continue;
      seenPresets.add(preset.value);

      const presetBtn = document.createElement("button");
      presetBtn.type = "button";
      presetBtn.className =
        `material-plan-preset${calcQuantity === preset.value ? " is-active" : ""}`;
      presetBtn.textContent = preset.label;

      presetBtn.addEventListener("click", () => {
        calcQuantity = preset.value;
        draw();
      });

      presetRow.append(presetBtn);
    }

    multiplierBlock.append(presetRow);

    if (
      calcQuantity !== listQuantity &&
      typeof onQuantitySync === "function"
    ) {
      const syncBtn = document.createElement("button");
      syncBtn.type = "button";
      syncBtn.className = "quiet-button material-plan-sync";
      syncBtn.textContent = de
        ? `Menge (${calcQuantity}) in Liste übernehmen`
        : `Apply quantity (${calcQuantity}) to list`;

      syncBtn.addEventListener("click", () => {
        item.quantity = calcQuantity;
        save();
        onQuantitySync();
      });

      multiplierBlock.append(syncBtn);
    }

    // Brennstoff-Auswahl
    const fuelLabel = element(
      "label",
      "",
      de ? "Brennstoff (für Öfen)" : "Fuel (for furnaces)"
    );

    const fuelSelect = makeSelect(
      fuels.map(fuel => ({
        value: fuel.id,
        label: fuelDescription(fuel)
      })),
      item.planFuel,
      "",
      value => {
        item.planFuel = value;
      }
    );

    fuelLabel.append(fuelSelect);

    controlsGrid.append(multiplierBlock, fuelLabel);
    settingsBox.append(controlsGrid);
    body.append(settingsBox);

    // 2. Aufklappbare Baumansicht
    const treeSection = element(
      "section",
      "material-plan-tree-section"
    );

    const treeHeader = element(
      "div",
      "material-plan-tree-header"
    );

    treeHeader.append(
      element(
        "h3",
        "",
        de
          ? `Herstellungsbaum (für ${calcQuantity} × ${nameOf(item.blockId)})`
          : `Crafting tree (for ${calcQuantity} × ${nameOf(item.blockId)})`
      )
    );

    const treeToggleAll = document.createElement("button");
    treeToggleAll.type = "button";
    treeToggleAll.className = "material-plan-tree-toggle";
    treeToggleAll.textContent = de
      ? "Alle zuklappen"
      : "Collapse all";

    treeHeader.append(treeToggleAll);
    treeSection.append(treeHeader);

    const tree = element(
      "div",
      "material-plan-tree"
    );

    treeSection.append(tree);
    body.append(treeSection);

    function expand(
      id,
      quantity,
      path,
      depth,
      ancestors,
      parent
    ) {
      const recipes = recipesById[id] || [];
      const stackText = formatStacks(quantity);
      const qtyDisplay = stackText
        ? `${quantity} × ${nameOf(id)} (${stackText})`
        : `${quantity} × ${nameOf(id)}`;

      // Blattknoten: Basis-Rohstoff (kein Rezept vorhanden)
      if (recipes.length === 0) {
        addAmount(rawMaterials, id, quantity);

        const leaf = element(
          "div",
          "material-plan-leaf"
        );

        leaf.append(
          element("strong", "", qtyDisplay),
          element(
            "span",
            "material-plan-badge is-raw",
            de ? "Basis-Rohstoff" : "Raw material"
          )
        );

        parent.append(leaf);
        return;
      }

      // Herstellbarer Knoten: aufklappbarer Zweig
      const branch = document.createElement("details");
      branch.className = "material-plan-branch";
      branch.open = true;

      const branchSummary = document.createElement("summary");
      branchSummary.className = "material-plan-branch-summary";

      const titleSpan = element("strong", "", qtyDisplay);
      branchSummary.append(titleSpan);

      const metaBadge = element(
        "span",
        "material-plan-badge"
      );
      branchSummary.append(metaBadge);

      const branchBody = element(
        "div",
        "material-plan-branch-content"
      );

      branch.append(branchSummary, branchBody);
      parent.append(branch);

      if (ancestors.has(id) || depth >= 16) {
        metaBadge.textContent = de ? "Schleife" : "Cycle";
        warnings.push(
          de
            ? `Rezeptschleife oder zu viele Schritte bei ${nameOf(id)}.`
            : `Recipe cycle or too many steps at ${nameOf(id)}.`
        );
        return;
      }

      let recipeIndex = 0;

      if (recipes.length > 1) {
        const choiceKey = `${path}/recipe`;
        const savedIndex = item.planChoices[choiceKey];

        const select = makeSelect(
          recipes.map((recipe, index) => ({
            value: String(index),
            label:
              `${de ? "Rezept" : "Recipe"} ${index + 1}: ` +
              `${recipeTypeNames[recipe.type] || recipe.type} ` +
              `(${recipe.count || 1} ×)`
          })),
          savedIndex,
          de ? "Rezept wählen" : "Choose recipe",
          value => {
            item.planChoices[choiceKey] = value;
          }
        );

        select.setAttribute(
          "aria-label",
          `${de ? "Rezept für" : "Recipe for"} ${nameOf(id)}`
        );

        branchBody.append(select);

        if (
          savedIndex === undefined ||
          savedIndex === ""
        ) {
          metaBadge.textContent = de
            ? "Rezept wählen"
            : "Choose recipe";
          warnings.push(
            de
              ? `Rezept für ${nameOf(id)} auswählen.`
              : `Choose a recipe for ${nameOf(id)}.`
          );
          return;
        }

        recipeIndex = Number(savedIndex);
      }

      const recipe = recipes[recipeIndex];

      if (
        !recipe ||
        !Array.isArray(recipe.ingredients) ||
        !Number.isFinite(Number(recipe.count)) ||
        Number(recipe.count) < 1
      ) {
        warnings.push(
          de
            ? `Rezept für ${nameOf(id)} kann nicht berechnet werden.`
            : `Recipe for ${nameOf(id)} cannot be calculated.`
        );
        return;
      }

      const batches = Math.ceil(
        quantity / Number(recipe.count)
      );

      const stationLabel =
        recipeTypeNames[recipe.type] || recipe.type;
      metaBadge.textContent = de
        ? `${stationLabel} · ${batches}×`
        : `${stationLabel} · ${batches}×`;

      if (
        ["smelting", "blasting", "smoking"]
          .includes(recipe.type)
      ) {
        cooking.set(
          recipe.type,
          (cooking.get(recipe.type) || 0) + batches
        );
      }

      const groups = new Map();

      for (const ingredient of recipe.ingredients) {
        const key = JSON.stringify(ingredient);

        if (!groups.has(key)) {
          groups.set(key, {
            ingredient,
            count: 0
          });
        }

        groups.get(key).count++;
      }

      const nextAncestors = new Set(ancestors);
      nextAncestors.add(id);

      let groupIndex = 0;

      for (const group of groups.values()) {
        const childPath =
          `${path}/r${recipeIndex}/g${groupIndex}`;

        groupIndex++;

        const needed = batches * group.count;
        const options = ingredientOptions(
          group.ingredient
        );

        if (options.length === 0) {
          warnings.push(
            de
              ? `Zutat für ${nameOf(id)} nicht auflösbar.`
              : `Ingredient for ${nameOf(id)} cannot be resolved.`
          );
          continue;
        }

        let chosenId = options[0];

        if (options.length > 1) {
          const choiceKey =
            `${childPath}/ingredient`;

          const savedId =
            item.planChoices[choiceKey];

          const groupLabel = describeGroup(
            options,
            group.ingredient
          );

          const labelText = groupLabel
            ? `${needed} × ${groupLabel}`
            : (
              de
                ? `${needed} × Zutat auswählen`
                : `Choose ${needed} × ingredient`
            );

          const label = element(
            "label",
            "material-plan-choice",
            labelText
          );

          const select = makeSelect(
            options.map(optionId => ({
              value: optionId,
              label: nameOf(optionId)
            })),
            savedId,
            de
              ? "Variante wählen"
              : "Choose variant",
            value => {
              item.planChoices[choiceKey] = value;
            }
          );

          label.append(select);
          branchBody.append(label);

          if (
            !savedId ||
            !options.includes(savedId)
          ) {
            warnings.push(
              de
                ? `Zutatenvariante für ${nameOf(id)} auswählen.`
                : `Choose an ingredient variant for ${nameOf(id)}.`
            );
            continue;
          }

          chosenId = savedId;
        }

        expand(
          chosenId,
          needed,
          childPath,
          depth + 1,
          nextAncestors,
          branchBody
        );
      }
    }

    const id = fullId(item.blockId);

    expand(
      id,
      calcQuantity,
      "root",
      0,
      new Set(),
      tree
    );

    let allExpanded = true;
    treeToggleAll.addEventListener("click", () => {
      allExpanded = !allExpanded;
      tree
        .querySelectorAll("details.material-plan-branch")
        .forEach(branch => {
          branch.open = allExpanded;
        });
      treeToggleAll.textContent = allExpanded
        ? (de ? "Alle zuklappen" : "Collapse all")
        : (de ? "Alle aufklappen" : "Expand all");
    });

    // 3. Einkaufsliste (Basis-Rohstoffe)
    const chosenFuel = fuels.find(
      fuel => fuel.id === item.planFuel
    );

    let fuelNeeded = 0;

    for (const operations of cooking.values()) {
      fuelNeeded += Math.ceil(
        (operations * 4) / chosenFuel.quarters
      );
    }

    if (
      fuelNeeded > 0 &&
      !chosenFuel.reusableBucket
    ) {
      addAmount(
        rawMaterials,
        chosenFuel.id,
        fuelNeeded
      );
    }

    const summary = element(
      "section",
      "material-plan-summary"
    );

    summary.append(
      element(
        "h3",
        "",
        warnings.length
          ? (
            de
              ? "Einkaufsliste noch unvollständig"
              : "Shopping list not complete yet"
          )
          : (
            de
              ? `Einkaufsliste · Basis-Rohstoffe (für ${calcQuantity} × ${nameOf(item.blockId)})`
              : `Shopping list · Raw materials (for ${calcQuantity} × ${nameOf(item.blockId)})`
          )
      )
    );

    if (warnings.length > 0) {
      const warningList = element(
        "ul",
        "material-plan-warnings"
      );

      for (const warning of [
        ...new Set(warnings)
      ]) {
        warningList.append(
          element("li", "", warning)
        );
      }

      summary.append(warningList);
    }

    if (
      rawMaterials.size > 0 ||
      fuelNeeded > 0
    ) {
      const materialTags = element(
        "div",
        "material-plan-tags"
      );

      for (const [rawId, amount] of [
        ...rawMaterials.entries()
      ].sort((a, b) =>
        nameOf(a[0]).localeCompare(
          nameOf(b[0]),
          language
        )
      )) {
        const stacks = formatStacks(amount);
        const text = stacks
          ? `${amount} × ${nameOf(rawId)} (${stacks})`
          : `${amount} × ${nameOf(rawId)}`;

        materialTags.append(
          element("span", "material-plan-tag", text)
        );
      }

      if (
        fuelNeeded > 0 &&
        chosenFuel.reusableBucket
      ) {
        materialTags.append(
          element(
            "span",
            "material-plan-tag",
            de
              ? `${fuelNeeded} × Lavaeimer-Befüllung (Eimer wiederverwendbar)`
              : `${fuelNeeded} × lava bucket fill (bucket reusable)`
          )
        );
      }

      summary.append(materialTags);
    }

    if (fuelNeeded > 0) {
      summary.append(
        element(
          "p",
          "material-plan-note",
          de
            ? "Brennstoff ist eine geschätzte Mindestmenge bei effizienter Nutzung eines Geräts pro Ofenart."
            : "Fuel is an estimated minimum with efficient use of one device per furnace type."
        )
      );
    }

    body.append(summary);
  }

  details.addEventListener("toggle", () => {
    if (details.open) {
      calcQuantity = Math.max(1, Number(item.quantity) || 1);
      draw();
    }
  });

  return details;
};