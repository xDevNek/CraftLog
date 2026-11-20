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

const groups = {
  manual: [],
  recipeOnly: [],
  lootOnly: [],
  other: []
};

for (const entry of minecraft.catalog) {
  const id = entry.id;
  const source = sources.entries[id];

  if (source?.survival !== "needs_review") {
    continue;
  }

  const ways = Array.isArray(source.ways)
    ? source.ways
    : [];

  const hasManualWay = ways.some(
    way => way.origin !== "official_loot_table"
  );

  const hasLootCandidate = ways.some(
    way => way.origin === "official_loot_table"
  );

  const hasRecipe =
    Array.isArray(minecraft.recipes[id]) &&
    minecraft.recipes[id].length > 0;

  const result = {
    id,
    name: entry.de || entry.en
  };

  if (hasManualWay) {
    groups.manual.push(result);
  } else if (hasRecipe) {
    groups.recipeOnly.push(result);
  } else if (hasLootCandidate) {
    groups.lootOnly.push(result);
  } else {
    groups.other.push(result);
  }
}

for (const [key, entries] of Object.entries(groups)) {
  console.log(`${key}: ${entries.length}`);

  if (key === "recipeOnly" || key === "other") {
    for (const entry of entries.slice(0, 30)) {
      console.log(`  ${entry.id} → ${entry.name}`);
    }
  }
}

const total = Object.values(groups).reduce(
  (sum, entries) => sum + entries.length,
  0
);

console.log(`Insgesamt noch zu prüfen: ${total}`);
