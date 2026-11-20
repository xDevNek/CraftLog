import fs from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const minecraftData = require("minecraft-data");

const version = "1.21.4";
const sourceFile = `data/sources/${version}.json`;

const minecraft = JSON.parse(
  await fs.readFile("minecraft-data.json", "utf8")
);

const sources = JSON.parse(
  await fs.readFile(sourceFile, "utf8")
);

if (
  minecraft.version !== version ||
  sources.version !== version
) {
  throw new Error("Die Minecraft-Versionen stimmen nicht überein.");
}

const gameData = minecraftData(version);

if (!Array.isArray(gameData?.itemsArray)) {
  throw new Error("Der Gegenstandskatalog fehlt.");
}

const inventoryItems = new Set(
  gameData.itemsArray.map(
    item => `minecraft:${item.name}`
  )
);

const confirmed = new Set(
  Object.entries(sources.entries)
    .filter(([, entry]) =>
      entry.survival === "obtainable"
    )
    .map(([id]) => id)
);

function chooseIngredient(ingredient) {
  if (ingredient?.item) {
    return confirmed.has(ingredient.item)
      ? ingredient.item
      : null;
  }

  if (Array.isArray(ingredient?.alternatives)) {
    for (const option of ingredient.alternatives) {
      const selected = chooseIngredient(option);

      if (selected) {
        return selected;
      }
    }
  }

  return null;
}

let added = 0;
let changed;

do {
  changed = false;

  for (const [resultId, recipes] of Object.entries(
    minecraft.recipes
  )) {
    const entry = sources.entries[resultId];

    if (
      !entry ||
      entry.survival !== "needs_review" ||
      !inventoryItems.has(resultId) ||
      !Array.isArray(recipes)
    ) {
      continue;
    }

    for (const [index, recipe] of recipes.entries()) {
      if (
        recipe.type !== "crafting_shaped" &&
        recipe.type !== "crafting_shapeless"
      ) {
        continue;
      }

      if (
        !Array.isArray(recipe.ingredients) ||
        recipe.ingredients.length === 0
      ) {
        continue;
      }

      const chosenIngredients =
        recipe.ingredients.map(
          chooseIngredient
        );

      if (
        chosenIngredients.some(
          ingredient => ingredient === null
        )
      ) {
        continue;
      }

      entry.survival = "obtainable";
      entry.status = "derived_crafting";
      entry.evidence = {
        method: "crafting_chain",
        recipeIndex: index,
        ingredients: chosenIngredients
      };

      confirmed.add(resultId);
      added++;
      changed = true;
      break;
    }
  }
} while (changed);

const temporaryFile = `${sourceFile}.tmp`;

await fs.writeFile(
  temporaryFile,
  JSON.stringify(sources, null, 2) + "\n",
  "utf8"
);

await fs.rename(
  temporaryFile,
  sourceFile
);

console.log(
  `${added} Gegenstände durch bestätigte Crafting-Ketten eingestuft.`
);

console.log(
  `Aktualisiert: ${sourceFile}`
);
