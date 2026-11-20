import fs from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const minecraftData = require("minecraft-data");

const version = "1.21.4";

const catalog = JSON.parse(
  await fs.readFile("minecraft-data.json", "utf8")
);

const sources = JSON.parse(
  await fs.readFile(
    `data/sources/${version}.json`,
    "utf8"
  )
);

const gameData = minecraftData(version);

if (
  catalog.version !== version ||
  sources.version !== version ||
  !Array.isArray(gameData?.itemsArray)
) {
  throw new Error(
    "Die Datendateien passen nicht zu Java 1.21.4."
  );
}

const inventoryItemIds = new Set(
  gameData.itemsArray.map(
    item => `minecraft:${item.name}`
  )
);

const withoutItem = [];
const withItem = [];

for (const entry of catalog.catalog) {
  const id = entry.id;
  const source = sources.entries[id];

  if (!source || source.survival !== "needs_review") {
    continue;
  }

  const hasWay =
    Array.isArray(source.ways) &&
    source.ways.length > 0;

  const hasRecipe =
    Array.isArray(catalog.recipes[id]) &&
    catalog.recipes[id].length > 0;

  if (hasWay || hasRecipe) {
    continue;
  }

  const result = `${id} → ${entry.de || entry.en}`;

  if (inventoryItemIds.has(id)) {
    withItem.push(result);
  } else {
    withoutItem.push(result);
  }
}

console.log(
  `Offen ohne Weg/Rezept insgesamt: ${
    withItem.length + withoutItem.length
  }`
);

console.log(
  `Davon im Gegenstandskatalog: ${withItem.length}`
);

console.log(
  `Ohne eigene ID im Gegenstandskatalog: ${withoutItem.length}`
);

console.log(
  "\nOffene IDs im Gegenstandskatalog:"
);

console.log(withItem.join("\n"));

console.log(
  "\nErste 30 IDs ohne eigenen Gegenstand:"
);

console.log(
  withoutItem.slice(0, 30).join("\n")
);
