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
  throw new Error(
    "Die Minecraft-Versionen stimmen nicht überein."
  );
}

const gameData = minecraftData(version);

if (!Array.isArray(gameData?.itemsArray)) {
  throw new Error(
    "Der Gegenstandskatalog fehlt."
  );
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

const stations = {
  smelting: "minecraft:furnace",
  blasting: "minecraft:blast_furnace",
  smoking: "minecraft:smoker",
  stonecutting: "minecraft:stonecutter"
};

const cookingTypes = new Set([
  "smelting",
  "blasting",
  "smoking"
]);

const fuelId = "minecraft:coal";

function chooseIngredient(ingredient) {
  if (ingredient?.item) {
    return confirmed.has(ingredient.item)
      ? ingredient.item
      : null;
  }

  if (
    Array.isArray(ingredient?.alternatives)
  ) {
    for (
      const option of
      ingredient.alternatives
    ) {
      const selected =
        chooseIngredient(option);

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

  for (
    const [resultId, recipes] of
    Object.entries(minecraft.recipes)
  ) {
    const entry =
      sources.entries[resultId];

    if (
      !entry ||
      entry.survival !== "needs_review" ||
      !inventoryItems.has(resultId) ||
      !Array.isArray(recipes)
    ) {
      continue;
    }

    for (
      const [index, recipe] of
      recipes.entries()
    ) {
      const stationId =
        stations[recipe.type];

      if (
        !stationId ||
        !confirmed.has(stationId)
      ) {
        continue;
      }

      if (
        cookingTypes.has(recipe.type) &&
        !confirmed.has(fuelId)
      ) {
        continue;
      }

      if (
        !Array.isArray(
          recipe.ingredients
        ) ||
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
          id => id === null
        )
      ) {
        continue;
      }

      entry.survival = "obtainable";
      entry.status = "derived_production";

      entry.evidence = {
        method: recipe.type,
        recipeIndex: index,
        station: stationId,
        ingredients:
          chosenIngredients,
        ...(cookingTypes.has(recipe.type)
          ? { fuel: fuelId }
          : {})
      };

      confirmed.add(resultId);
      added++;
      changed = true;
      break;
    }
  }
} while (changed);

const temporaryFile =
  `${sourceFile}.tmp`;

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
  `${added} weitere Gegenstände über Ofen, ` +
  `Hochofen, Räucherofen oder Steinsäge abgeleitet.`
);

console.log(
  `Aktualisiert: ${sourceFile}`
);
