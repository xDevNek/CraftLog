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
  sources.version !== version ||
  !Array.isArray(minecraft.catalog) ||
  !sources.entries
) {
  throw new Error(
    "Die Datendateien fehlen oder haben unterschiedliche Versionen."
  );
}

const catalogById = new Map(
  minecraft.catalog.map(entry => [
    entry.id,
    entry
  ])
);

const counts = {
  obtainable: 0,
  not_obtainable: 0,
  needs_review: 0,
  openWithWays: 0,
  openWithRecipeOnly: 0,
  openWithoutInformation: 0
};

const openWithoutInformation = [];

for (const catalogEntry of minecraft.catalog) {
  const id = catalogEntry.id;
  const entry = sources.entries[id];

  if (!entry) {
    throw new Error(
      `Beschaffungseintrag fehlt: ${id}`
    );
  }

  const survival = entry.survival;

  if (!(survival in counts)) {
    throw new Error(
      `Unbekannter Survival-Status bei ${id}: ${survival}`
    );
  }

  counts[survival]++;

  // Bereits eingestufte Einträge gehören nicht
  // erneut auf die Liste der offenen Fälle.
  if (survival !== "needs_review") {
    continue;
  }

  const hasWays =
    Array.isArray(entry.ways) &&
    entry.ways.length > 0;

  const hasRecipe =
    Array.isArray(minecraft.recipes[id]) &&
    minecraft.recipes[id].length > 0;

  if (hasWays) {
    counts.openWithWays++;
  } else if (hasRecipe) {
    counts.openWithRecipeOnly++;
  } else {
    counts.openWithoutInformation++;
    openWithoutInformation.push(id);
  }
}

console.log(
  `Katalogeinträge: ${minecraft.catalog.length}`
);

console.log(
  `Als erhältlich geprüft: ${counts.obtainable}`
);

console.log(
  `Als Gegenstand nicht erhältlich geprüft: ${counts.not_obtainable}`
);

console.log(
  `Einstufung noch offen: ${counts.needs_review}`
);

console.log(
  `  Davon mit Beschaffungshinweisen: ${counts.openWithWays}`
);

console.log(
  `  Davon nur mit Rezept: ${counts.openWithRecipeOnly}`
);

console.log(
  `  Davon ohne Weg und ohne Rezept: ${counts.openWithoutInformation}`
);

console.log(
  "\nErste 30 tatsächlich offenen Einträge ohne Weg und Rezept:"
);

for (const id of openWithoutInformation.slice(0, 30)) {
  const catalogEntry = catalogById.get(id);

  console.log(
    `${id} → ` +
    (catalogEntry?.de ||
      catalogEntry?.en ||
      "Kein Name")
  );
}
