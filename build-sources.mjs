import fs from "node:fs/promises";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const minecraftData = require("minecraft-data");

const minecraft = JSON.parse(
  await fs.readFile("minecraft-data.json", "utf8")
);

if (
  typeof minecraft.version !== "string" ||
  !Array.isArray(minecraft.catalog) ||
  !minecraft.recipes ||
  typeof minecraft.recipes !== "object"
) {
  throw new Error(
    "minecraft-data.json ist ungültig."
  );
}

const gameData = minecraftData(
  minecraft.version
);

if (!Array.isArray(gameData?.itemsArray)) {
  throw new Error(
    `Gegenstandskatalog für ${minecraft.version} fehlt.`
  );
}

const inventoryItemIds = new Set(
  gameData.itemsArray.map(
    item => `minecraft:${item.name}`
  )
);

const context = {
  window: {}
};

for (const file of [
  "sources.js",
  "survival-status.js"
]) {
  const code = await fs.readFile(
    file,
    "utf8"
  );

  vm.runInNewContext(
    code,
    context,
    {
      filename: file,
      timeout: 1000
    }
  );
}

const manualSources =
  context.window.materialSources;

const statuses =
  context.window.survivalStatuses;

if (
  !manualSources ||
  typeof manualSources !== "object" ||
  !statuses ||
  !Array.isArray(statuses.obtainable) ||
  !Array.isArray(statuses.not_obtainable)
) {
  throw new Error(
    "sources.js oder survival-status.js ist ungültig."
  );
}

const knownIds = new Set(
  minecraft.catalog.map(entry => entry.id)
);

const allowedTypes = new Set([
  "location",
  "farm",
  "trade",
  "loot",
  "craft"
]);

const errors = [];
const classified = new Map();

// Spawn-Eier sind keine gewöhnlich erhältlichen
// Inventargegenstände im Überlebensmodus.
for (const entry of minecraft.catalog) {
  if (entry.id.endsWith("_spawn_egg")) {
    classified.set(
      entry.id,
      "not_obtainable"
    );
  }
}

// Von Hand geprüfte Einstufungen übernehmen.
for (const status of [
  "obtainable",
  "not_obtainable"
]) {
  for (const id of statuses[status]) {
    if (!knownIds.has(id)) {
      errors.push(
        `${id}: Status-ID nicht im Katalog.`
      );
      continue;
    }

    const previous = classified.get(id);

    if (previous && previous !== status) {
      errors.push(
        `${id}: widersprüchliche Status-Einstufung.`
      );
      continue;
    }

    classified.set(id, status);
  }
}

let blockVariants = 0;

// Nur Block-IDs ohne eigene Gegenstands-ID,
// ohne manuelle Beschaffungsangabe und ohne Rezept.
// Bereits eingestufte IDs bleiben unangetastet.
for (const entry of minecraft.catalog) {
  const id = entry.id;

  const hasRecipe =
    Array.isArray(minecraft.recipes[id]) &&
    minecraft.recipes[id].length > 0;

  if (
    entry.isBlock &&
    !inventoryItemIds.has(id) &&
    !manualSources[id] &&
    !hasRecipe &&
    !classified.has(id)
  ) {
    classified.set(
      id,
      "not_obtainable"
    );

    blockVariants++;
  }
}

for (
  const [id, source] of
  Object.entries(manualSources)
) {
  if (!knownIds.has(id)) {
    errors.push(
      `${id}: Beschaffungs-ID nicht im Katalog.`
    );
  }

  if (
    !source ||
    !Array.isArray(source.ways) ||
    source.ways.length === 0
  ) {
    errors.push(
      `${id}: Beschaffungswege fehlen.`
    );
    continue;
  }

  if (
    classified.get(id) === "not_obtainable"
  ) {
    errors.push(
      `${id}: hat Beschaffungswege, ist aber als nicht erhältlich markiert.`
    );
  }

  for (
    const [index, way] of
    source.ways.entries()
  ) {
    if (!allowedTypes.has(way?.type)) {
      errors.push(
        `${id}, Weg ${index + 1}: unbekannter Typ.`
      );
    }

    for (const language of ["de", "en"]) {
      if (
        typeof way?.[language] !== "string" ||
        !way[language].trim()
      ) {
        errors.push(
          `${id}, Weg ${index + 1}: ${language}-Text fehlt.`
        );
      }
    }
  }
}

for (const id of statuses.obtainable) {
  const hasWays =
    manualSources[id]?.ways?.length > 0;

  const hasRecipe =
    Array.isArray(minecraft.recipes[id]) &&
    minecraft.recipes[id].length > 0;

  if (!hasWays && !hasRecipe) {
    errors.push(
      `${id}: als erhältlich markiert, aber ohne Beschaffungsweg oder Rezept.`
    );
  }
}

if (errors.length > 0) {
  throw new Error(
    "Datenprüfung fehlgeschlagen:\n" +
    errors.join("\n")
  );
}

const entries = {};

const counts = {
  obtainable: 0,
  not_obtainable: 0,
  needs_review: 0
};

for (const catalogEntry of minecraft.catalog) {
  const id = catalogEntry.id;
  const manual = manualSources[id];

  const survival =
    classified.get(id) ||
    "needs_review";

  counts[survival]++;

  const hasRecipe =
    Array.isArray(minecraft.recipes[id]) &&
    minecraft.recipes[id].length > 0;

  entries[id] = {
    survival,

    status:
      survival === "not_obtainable"
        ? "not_obtainable"
        : manual
          ? "documented"
          : hasRecipe
            ? "recipe_only"
            : "needs_review",

    ways:
      survival === "not_obtainable"
        ? []
        : manual?.ways || []
  };
}

const directory = "data/sources";
const outputFile =
  `${directory}/${minecraft.version}.json`;

await fs.mkdir(
  directory,
  { recursive: true }
);

await fs.writeFile(
  outputFile,
  JSON.stringify(
    {
      version: minecraft.version,
      entries
    },
    null,
    2
  ) + "\n",
  "utf8"
);

console.log(
  `Katalogeinträge: ${minecraft.catalog.length}`
);

console.log(
  `Als erhältlich geprüft: ${counts.obtainable}`
);

console.log(
  `Als eigenständiger Gegenstand nicht erhältlich: ${counts.not_obtainable}`
);

console.log(
  `Davon durch Blockvarianten-Regel eingestuft: ${blockVariants}`
);

console.log(
  `Überlebensmodus-Einstufung noch offen: ${counts.needs_review}`
);

console.log(
  `Erstellt: ${outputFile}`
);
