window.createMaterialPlan = function createMaterialPlan(
  item,
  minecraft,
  nameOf,
  language,
  save
) {
  const de = language === "de";
  const recipesById = minecraft.recipes;

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

  const details = document.createElement("details");
  details.className = "material-plan";

  const heading = document.createElement("summary");
  heading.textContent = de
    ? "Materialplan berechnen"
    : "Calculate material plan";

  const body = document.createElement("div");
  body.className = "material-plan-body";

  details.append(heading, body);

  function element(tag, className, content) {
    const node = document.createElement(tag);
    node.className = className;

    if (content !== undefined) {
      node.textContent = content;
    }

    return node;
  }

  function addAmount(map, id, amount) {
    map.set(id, (map.get(id) || 0) + amount);
  }

  function ingredientOptions(ingredient) {
    if (ingredient.item) {
      return [ingredient.item];
    }

    if (Array.isArray(ingredient.alternatives)) {
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

    const fuelRow = element(
      "div",
      "material-plan-setting"
    );

    const fuelLabel = element(
      "label",
      "",
      de ? "Brennstoff" : "Fuel"
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
    fuelRow.append(fuelLabel);
    body.append(fuelRow);

    const tree = element(
      "div",
      "material-plan-tree"
    );

    body.append(tree);

    function expand(
      id,
      quantity,
      path,
      depth,
      ancestors,
      parent
    ) {
      const node = element(
        "div",
        "material-plan-node"
      );

      node.append(
        element(
          "strong",
          "",
          `${quantity} × ${nameOf(id)}`
        )
      );

      parent.append(node);

      if (ancestors.has(id) || depth >= 16) {
        warnings.push(
          de
            ? `Rezeptschleife oder zu viele Schritte bei ${nameOf(id)}.`
            : `Recipe cycle or too many steps at ${nameOf(id)}.`
        );
        return;
      }

      const recipes = recipesById[id] || [];

      if (recipes.length === 0) {
        addAmount(rawMaterials, id, quantity);
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
              `${recipe.type.replaceAll("_", " ")} ` +
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

        node.append(select);

        if (
          savedIndex === undefined ||
          savedIndex === ""
        ) {
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

          const label = element(
            "label",
            "material-plan-choice",
            de
              ? `${needed} × Zutat auswählen`
              : `Choose ${needed} × ingredient`
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
          node.append(label);

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
          node
        );
      }
    }

    const requested = Number(item.quantity);

    if (
      !Number.isSafeInteger(requested) ||
      requested < 1
    ) {
      warnings.push(
        de
          ? "Ungültige Anzahl im Listeneintrag."
          : "Invalid quantity in list entry."
      );
    } else {
      const id = String(item.blockId).startsWith(
        "minecraft:"
      )
        ? item.blockId
        : `minecraft:${item.blockId}`;

      expand(
        id,
        requested,
        "root",
        0,
        new Set(),
        tree
      );
    }

    const chosenFuel = fuels.find(
      fuel => fuel.id === item.planFuel
    );

    let fuelNeeded = 0;

    // Pro Ofenart getrennt rechnen. Das ist eine
    // Mindestmenge bei effizienter Nutzung.
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
              ? "Plan noch nicht vollständig"
              : "Plan not complete yet"
          )
          : (
            de
              ? "Benötigte Ausgangsmaterialien"
              : "Required starting materials"
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
      const materialList = element(
        "ul",
        "material-plan-materials"
      );

      for (const [id, amount] of [
        ...rawMaterials.entries()
      ].sort((a, b) =>
        nameOf(a[0]).localeCompare(
          nameOf(b[0]),
          language
        )
      )) {
        materialList.append(
          element(
            "li",
            "",
            `${amount} × ${nameOf(id)}`
          )
        );
      }

      if (
        fuelNeeded > 0 &&
        chosenFuel.reusableBucket
      ) {
        materialList.append(
          element(
            "li",
            "",
            de
              ? `${fuelNeeded} × Lavaeimer-Befüllung; der leere Eimer kann erneut verwendet werden.`
              : `${fuelNeeded} × lava bucket fill; the empty bucket can be reused.`
          )
        );
      }

      summary.append(materialList);
    }

    summary.append(
      element(
        "p",
        "material-plan-note",
        de
          ? "Brennstoff ist eine geschätzte Mindestmenge bei effizienter Nutzung eines Geräts pro Ofenart. Angefangene Brenndauer und mögliche Verluste sind nicht berücksichtigt. Brennstoffe werden nicht weiter in ihre eigenen Zutaten zerlegt; Lagerfeuer und der Bau der Geräte sind nicht eingerechnet."
          : "Fuel is an estimated minimum with efficient use of one device per furnace type. Partially used burn time and possible waste are not included. Fuels are not broken down into their own ingredients; campfires and building the stations are not included."
      )
    );

    body.append(summary);
  }

  details.addEventListener("toggle", () => {
    if (details.open) {
      draw();
    }
  });

  return details;
};
