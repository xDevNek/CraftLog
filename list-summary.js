window.createListSummary = function createListSummary(
  list,
  minecraft,
  nameOf,
  language,
  save
) {
  const de = language === "de";
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

  if (
    !list.summaryChoices ||
    typeof list.summaryChoices !== "object"
  ) {
    list.summaryChoices = {};
  }

  const choices = list.summaryChoices;

  const panel = document.createElement("details");
  panel.className = "list-summary";

  const summary = document.createElement("summary");
  summary.textContent = de
    ? "Gesamtbedarf der Liste"
    : "Total materials for this list";

  const body = document.createElement("div");
  body.className = "list-summary-body";

  panel.append(summary, body);

  function node(tag, className, text) {
    const result = document.createElement(tag);
    result.className = className;

    if (text !== undefined) {
      result.textContent = text;
    }

    return result;
  }

  function fullId(id) {
    return id.startsWith("minecraft:")
      ? id
      : `minecraft:${id}`;
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

  function add(map, id, amount) {
    map.set(id, (map.get(id) || 0) + amount);
  }

  function selectChoice(labelText, values, selected, onChange) {
    const label = node("label", "list-summary-choice", labelText);
    const select = node("select", "list-summary-select");

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = de
      ? "Bitte auswählen"
      : "Please choose";

    select.append(placeholder);

    for (const value of values) {
      const option = document.createElement("option");
      option.value = value.value;
      option.textContent = value.label;
      select.append(option);
    }

    select.value = selected || "";

    select.addEventListener("change", () => {
      onChange(select.value);
      save();
      draw();
    });

    label.append(select);
    return label;
  }

  function draw() {
    body.replaceChildren();

    const goalQuantities = new Map();

    for (const item of list.items || []) {
      const quantity = Number(item.quantity);

      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        continue;
      }

      add(goalQuantities, fullId(item.blockId), quantity);
    }

    if (goalQuantities.size === 0) {
      body.append(
        node(
          "p",
          "list-summary-note",
          de
            ? "Füge zuerst Materialien zur Liste hinzu."
            : "Add materials to the list first."
        )
      );
      return;
    }

    const choiceBox = node(
      "div",
      "list-summary-choices"
    );

    const warnings = [];
    const graph = new Map();

    function buildGraph(id, ancestors = new Set()) {
      if (ancestors.has(id)) {
        warnings.push(
          de
            ? `Rezeptschleife bei ${nameOf(id)}.`
            : `Recipe cycle at ${nameOf(id)}.`
        );
        return;
      }

      if (graph.has(id)) return;

      const entry = {
        id,
        recipe: null,
        ingredients: [],
        unresolved: false
      };

      graph.set(id, entry);

      const recipes = minecraft.recipes[id] || [];

      if (recipes.length === 0) {
        return;
      }

      let recipeIndex = 0;

      if (recipes.length > 1) {
        const key = `recipe:${id}`;
        const selected = choices[key];

        choiceBox.append(
          selectChoice(
            de
              ? `Rezept für ${nameOf(id)}`
              : `Recipe for ${nameOf(id)}`,
            recipes.map((recipe, index) => ({
  value: String(index),
  label:
    `${index + 1}. ` +
    `${recipeTypeNames[recipe.type] || recipe.type} ` +
    `(${recipe.count || 1} ×)`
})),

            selected,
            value => {
              choices[key] = value;
            }
          )
        );

        if (
          selected === undefined ||
          selected === ""
        ) {
          entry.unresolved = true;
          warnings.push(
            de
              ? `Rezept für ${nameOf(id)} auswählen.`
              : `Choose a recipe for ${nameOf(id)}.`
          );
          return;
        }

        recipeIndex = Number(selected);
      }

      const recipe = recipes[recipeIndex];

      if (
        !recipe ||
        !Array.isArray(recipe.ingredients) ||
        recipe.ingredients.length === 0 ||
        !Number.isSafeInteger(Number(recipe.count)) ||
        Number(recipe.count) < 1
      ) {
        entry.unresolved = true;
        warnings.push(
          de
            ? `Rezept für ${nameOf(id)} nicht berechenbar.`
            : `Recipe for ${nameOf(id)} cannot be calculated.`
        );
        return;
      }

      entry.recipe = recipe;

      // Gleiche Zutatenpositionen gemeinsam zählen.
      const ingredientGroups = new Map();

      for (const ingredient of recipe.ingredients) {
        const key = JSON.stringify(ingredient);

        if (!ingredientGroups.has(key)) {
          ingredientGroups.set(key, {
            ingredient,
            count: 0
          });
        }

        ingredientGroups.get(key).count++;
      }

      for (const [key, group] of ingredientGroups) {
        const options = optionsFor(group.ingredient);

        if (options.length === 0) {
          entry.unresolved = true;
          warnings.push(
            de
              ? `Unbekannte Zutat für ${nameOf(id)}.`
              : `Unknown ingredient for ${nameOf(id)}.`
          );
          continue;
        }

        let ingredientId = options[0];

        if (options.length > 1) {
          const choiceKey = `ingredient:${id}:${key}`;
          const selected = choices[choiceKey];

          choiceBox.append(
            selectChoice(
              de
                ? `Zutat für ${nameOf(id)}`
                : `Ingredient for ${nameOf(id)}`,
              options.map(optionId => ({
                value: optionId,
                label: nameOf(optionId)
              })),
              selected,
              value => {
                choices[choiceKey] = value;
              }
            )
          );

          if (!selected || !options.includes(selected)) {
            entry.unresolved = true;
            warnings.push(
              de
                ? `Zutatenvariante für ${nameOf(id)} auswählen.`
                : `Choose an ingredient for ${nameOf(id)}.`
            );
            continue;
          }

          ingredientId = selected;
        }

        entry.ingredients.push({
          id: ingredientId,
          count: group.count
        });
      }

      const nextAncestors = new Set(ancestors);
      nextAncestors.add(id);

      for (const ingredient of entry.ingredients) {
        buildGraph(ingredient.id, nextAncestors);
      }
    }

    for (const id of goalQuantities.keys()) {
      buildGraph(id);
    }

    if (choiceBox.childElementCount > 0) {
      choiceBox.prepend(
        node(
          "h3",
          "",
          de
            ? "Entscheidungen für diese Liste"
            : "Choices for this list"
        )
      );

      body.append(choiceBox);
    }

    // Kanten zeigen vom gewünschten Gegenstand
    // zu seinen benötigten Zutaten.
    const indegree = new Map(
      [...graph.keys()].map(id => [id, 0])
    );

    for (const entry of graph.values()) {
      for (const ingredient of entry.ingredients) {
        indegree.set(
          ingredient.id,
          (indegree.get(ingredient.id) || 0) + 1
        );
      }
    }

    const demand = new Map(goalQuantities);
    const depth = new Map(
      [...goalQuantities.keys()].map(id => [id, 0])
    );

    const queue = [...graph.keys()].filter(
      id => indegree.get(id) === 0
    );

    const processed = [];
    const rawMaterials = new Map();
    const cooking = new Map();

    while (queue.length > 0) {
      const id = queue.shift();
      const entry = graph.get(id);
      const needed = demand.get(id) || 0;

      if (!entry) continue;

      let produced = needed;

      if (
        !entry.recipe &&
        !entry.unresolved &&
        needed > 0
      ) {
        add(rawMaterials, id, needed);
      }

      if (entry.recipe && needed > 0) {
        const outputCount = Number(
          entry.recipe.count
        );

        const batches = Math.ceil(
          needed / outputCount
        );

        produced = batches * outputCount;

        if (
          ["smelting", "blasting", "smoking"]
            .includes(entry.recipe.type)
        ) {
          add(cooking, entry.recipe.type, batches);
        }

        for (const ingredient of entry.ingredients) {
          add(
            demand,
            ingredient.id,
            ingredient.count * batches
          );

          depth.set(
            ingredient.id,
            Math.max(
              depth.get(ingredient.id) || 0,
              (depth.get(id) || 0) + 1
            )
          );
        }
      }

      if (needed > 0) {
        processed.push({
          id,
          needed,
          produced,
          depth: depth.get(id) || 0,
          isRaw: !entry.recipe
        });
      }

      for (const ingredient of entry.ingredients) {
        indegree.set(
          ingredient.id,
          indegree.get(ingredient.id) - 1
        );

        if (indegree.get(ingredient.id) === 0) {
          queue.push(ingredient.id);
        }
      }
    }

    if (processed.length < graph.size) {
      warnings.push(
        de
          ? "Eine Rezeptschleife verhindert die vollständige Berechnung."
          : "A recipe cycle prevents a complete calculation."
      );
    }

    // Brennstoff als getrennte Schätzung:
    // je acht Schmelzvorgänge pro Kohle, pro Gerätetyp gerundet.
    let coal = 0;

    for (const operations of cooking.values()) {
      coal += Math.ceil(operations / 8);
    }

    if (coal > 0) {
      add(
        rawMaterials,
        "minecraft:coal",
        coal
      );
    }

    if (warnings.length > 0) {
      const warningBox = node(
        "div",
        "list-summary-warning"
      );

      warningBox.append(
        node(
          "strong",
          "",
          de
            ? "Berechnung noch unvollständig"
            : "Calculation not complete yet"
        )
      );

      const warningList = node("ul", "");

      for (const warning of new Set(warnings)) {
        warningList.append(node("li", "", warning));
      }

      warningBox.append(warningList);
      body.append(warningBox);
    }

    const rawBox = node(
      "section",
      "list-summary-section"
    );

    rawBox.append(
      node(
        "h3",
        "",
        de
          ? "Ausgangsmaterialien"
          : "Starting materials"
      )
    );

    const rawList = node(
      "div",
      "list-summary-tags"
    );

    for (const [id, amount] of [...rawMaterials].sort(
      (a, b) =>
        nameOf(a[0]).localeCompare(
          nameOf(b[0]),
          language
        )
    )) {
      rawList.append(
        node(
          "span",
          "list-summary-tag",
          `${amount} × ${nameOf(id)}`
        )
      );
    }

    rawBox.append(rawList);
    body.append(rawBox);

    const stepsBox = node(
      "section",
      "list-summary-section"
    );

    stepsBox.append(
      node(
        "h3",
        "",
        de
          ? "Herstellungsschritte"
          : "Production steps"
      )
    );

    // Rohstoffe oben, Ziele unten.
    const ordered = [...processed]
      .filter(entry => !entry.isRaw)
      .sort((a, b) => b.depth - a.depth);

    for (const step of ordered) {
      const row = node(
        "div",
        "list-summary-step"
      );

      row.append(
        node(
          "span",
          "",
          `${step.needed} × ${nameOf(step.id)}`
        )
      );

      if (step.produced > step.needed) {
        row.append(
          node(
            "small",
            "",
            de
              ? `Herstellung: ${step.produced} · Überschuss: ${step.produced - step.needed}`
              : `Produced: ${step.produced} · Left over: ${step.produced - step.needed}`
          )
        );
      }

      stepsBox.append(row);
    }

    body.append(stepsBox);

    const goals = node(
      "section",
      "list-summary-goals"
    );

    goals.append(
      node(
        "h3",
        "",
        de ? "Dein Crafting-Ziel" : "Your crafting goal"
      )
    );

    for (const [id, amount] of goalQuantities) {
      goals.append(
        node(
          "div",
          "list-summary-goal",
          `${amount} × ${nameOf(id)}`
        )
      );
    }

    body.append(goals);

    if (coal > 0) {
      body.append(
        node(
          "p",
          "list-summary-note",
          de
            ? "Kohle ist eine geschätzte Mindestmenge. Andere Brennstoffe und ungenutzte Brenndauer sind hier noch nicht berücksichtigt."
            : "Coal is an estimated minimum. Other fuels and unused burn time are not accounted for here."
        )
      );
    }
  }

  draw();
panel.open = true;

return panel;

};
