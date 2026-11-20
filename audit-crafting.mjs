import fs from "node:fs/promises";

const version = "1.21.4";

const minecraft = JSON.parse(
  await fs.readFile("minecraft-data.json", "utf8")
);

const sources = JSON.parse(
  await fs.readFile(
    `data/sources/${version}.json`,
    "utf8"
  )
);

if (
  minecraft.version !== version ||
  sources.version !== version
) {
  throw new Error("Die Minecraft-Versionen stimmen nicht überein.");
}

const catalogById = new Map(
  minecraft.catalog.map(entry => [entry.id, entry])
);

const confirmed = new Set(
  Object.entries(sources.entries)
    .filter(([, entry]) =>
      entry.survival === "obtainable"
    )
    .map(([id]) => id)
);

const originalCount = confirmed.size;
const discovered = [];

function ingredientAvailable(ingredient) {
  if (ingredient?.item) {
    return confirmed.has(ingredient.item);
  }

  if (Array.isArray(ingredient?.alternatives)) {
    return ingredient.alternatives.some(
      ingredientAvailable
    );
  }

  // Nicht aufgelöste Gruppen oder unbekannte Formen
  // gelten ausdrücklich nicht als bestätigt.
  return false;
}

let changed;

do {
  changed = false;

  for (const [resultId, recipes] of Object.entries(
    minecraft.recipes
  )) {
    if (
      confirmed.has(resultId) ||
      sources.entries[resultId]?.survival ===
        "not_obtainable" ||
      !Array.isArray(recipes)
    ) {
      continue;
    }

    const usableRecipe = recipes.find(recipe =>
      (
        recipe.type === "crafting_shaped" ||
        recipe.type === "crafting_shapeless"
      ) &&
      Array.isArray(recipe.ingredients) &&
      recipe.ingredients.length > 0 &&
      recipe.ingredients.every(
        ingredientAvailable
      )
    );

    if (!usableRecipe) {
      continue;
    }

    confirmed.add(resultId);
    changed = true;

    discovered.push({
      id: resultId,
      name:
        catalogById.get(resultId)?.de ||
        catalogById.get(resultId)?.en ||
        resultId
    });
  }
} while (changed);

console.log(
  `Bereits ausdrücklich bestätigt: ${originalCount}`
);

console.log(
  `Zusätzliche Kandidaten durch Crafting-Ketten: ${discovered.length}`
);

console.log("\nErste 40 Kandidaten:");

for (const entry of discovered.slice(0, 40)) {
  console.log(`${entry.id} → ${entry.name}`);
}

console.log(
  "\nEs wurden keine Datendateien verändert."
);
