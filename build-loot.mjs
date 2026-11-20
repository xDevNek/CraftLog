import fs from "node:fs/promises";
import AdmZip from "adm-zip";

const VERSION = "1.21.4";
const DATA_FILE = `data/sources/${VERSION}.json`;
const CATALOG_FILE = "minecraft-data.json";
const ORIGIN = "official_loot_table";

async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${url}`
    );
  }

  return response.json();
}

async function getBuffer(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${url}`
    );
  }

  return Buffer.from(
    await response.arrayBuffer()
  );
}

function fullId(value) {
  if (typeof value !== "string") {
    return null;
  }

  return value.includes(":")
    ? value
    : `minecraft:${value}`;
}

function collectItems(value, result) {
  if (!value || typeof value !== "object") {
    return;
  }

  if (
    value.type === "minecraft:item" ||
    value.type === "item"
  ) {
    const id = fullId(value.name);

    if (id) {
      result.add(id);
    }
  }

  // Alternativen und Gruppen innerhalb einer Loot-Tabelle
  // können weitere Einträge enthalten.
  if (Array.isArray(value.entries)) {
    for (const entry of value.entries) {
      collectItems(entry, result);
    }
  }

  if (Array.isArray(value.children)) {
    for (const child of value.children) {
      collectItems(child, result);
    }
  }
}

const minecraft = JSON.parse(
  await fs.readFile(CATALOG_FILE, "utf8")
);

const sources = JSON.parse(
  await fs.readFile(DATA_FILE, "utf8")
);

if (
  minecraft.version !== VERSION ||
  sources.version !== VERSION ||
  !Array.isArray(minecraft.catalog) ||
  !sources.entries
) {
  throw new Error(
    `Die Datendateien müssen zu Java ${VERSION} passen.`
  );
}

const catalogById = new Map(
  minecraft.catalog.map(entry => [
    entry.id,
    entry
  ])
);

console.log(
  `Lade offizielle Server-Datei für Java ${VERSION} …`
);

const manifest = await getJson(
  "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"
);

const versionEntry = manifest.versions.find(
  entry => entry.id === VERSION
);

if (!versionEntry) {
  throw new Error(
    `Version ${VERSION} nicht gefunden.`
  );
}

const version = await getJson(
  versionEntry.url
);

const outerZip = new AdmZip(
  await getBuffer(
    version.downloads.server.url
  )
);

const nestedServer = outerZip
  .getEntries()
  .find(entry =>
    /^META-INF\/versions\/.+\.jar$/.test(
      entry.entryName
    )
  );

const serverZip = nestedServer
  ? new AdmZip(nestedServer.getData())
  : outerZip;

const found = new Map();
let tableCount = 0;

for (const entry of serverZip.getEntries()) {
  const match = entry.entryName.match(
    /^data\/minecraft\/loot_tables?\/(blocks|entities|chests|archaeology)\/(.+)\.json$/

  );

  if (!match) {
    continue;
  }

  const category = match[1];
  const path = match[2];

  let table;

  try {
    table = JSON.parse(
      entry.getData().toString("utf8")
    );
  } catch {
    continue;
  }

  tableCount++;

  const possibleItems = new Set();

  for (const pool of table.pools || []) {
    for (const lootEntry of pool.entries || []) {
      collectItems(lootEntry, possibleItems);
    }
  }

  const tableId =
    `minecraft:${category}/${path}`;

  for (const itemId of possibleItems) {
    // Nur Ergebnisse übernehmen, die tatsächlich
    // in unserem Katalog vorhanden sind.
    if (!catalogById.has(itemId)) {
      continue;
    }

    if (!found.has(itemId)) {
      found.set(itemId, new Map());
    }

    found.get(itemId).set(tableId, {
      category,
      path,
      tableId
    });
  }
}

if (tableCount === 0) {
  throw new Error(
    "Keine passenden Loot-Tabellen gefunden. " +
    "Die Quelldatei wurde nicht verändert."
  );
}

function blockName(path, language) {
  const entry = catalogById.get(
    `minecraft:${path}`
  );

  if (!entry) {
    return path.replaceAll("_", " ");
  }

  return language === "de"
    ? entry.de || entry.en
    : entry.en;
}

function wayFor(table) {
  const sourceName =
    table.path.replaceAll("_", " ");

  if (table.category === "blocks") {
    return {
      type: "loot",
      origin: ORIGIN,
      table: table.tableId,
      de:
        `Möglicher Drop beim Abbauen von ` +
        `${blockName(table.path, "de")}. ` +
        `Werkzeug und weitere Bedingungen können erforderlich sein.`,
      en:
        `Possible drop when breaking ` +
        `${blockName(table.path, "en")}. ` +
        `A specific tool or other conditions may be required.`
    };
  }

  if (table.category === "entities") {
    return {
      type: "loot",
      origin: ORIGIN,
      table: table.tableId,
      de:
        `Möglicher Drop aus der Mob-Loot-Tabelle ` +
        `„${sourceName}“. Drop-Bedingungen und ` +
        `Wahrscheinlichkeiten sind noch nicht ausgewertet.`,
      en:
        `Possible drop from the mob loot table ` +
        `“${sourceName}”. Drop conditions and ` +
        `probabilities have not been evaluated yet.`
    };
  }

  if (table.category === "archaeology") {
  return {
    type: "loot",
    origin: ORIGIN,
    table: table.tableId,
    de:
      `Möglicher Fund beim Abbürsten von verdächtigem Sand ` +
      `oder Kies aus der Archäologie-Loot-Tabelle ` +
      `„${sourceName}“. Die konkrete Fundstelle hängt ` +
      `von dieser Tabelle ab.`,
    en:
      `Possible find when brushing suspicious sand or gravel ` +
      `from the archaeology loot table “${sourceName}”. ` +
      `The exact location depends on that table.`
  };
}

  return {
    type: "loot",
    origin: ORIGIN,
    table: table.tableId,
    de:
      `Möglicher Inhalt der Struktur-/Behälter-Loot-Tabelle ` +
      `„${sourceName}“. Das ist kein garantierter Fund.`,
    en:
      `Possible content of the structure/container loot table ` +
      `“${sourceName}”. This is not a guaranteed find.`
  };
}

let addedWays = 0;

// Bei erneutem Ausführen zuerst nur die zuvor
// automatisch erzeugten Wege entfernen.
// Manuell gepflegte Angaben bleiben erhalten.
for (const source of Object.values(sources.entries)) {
  source.ways = Array.isArray(source.ways)
    ? source.ways.filter(
        way => way.origin !== ORIGIN
      )
    : [];
}

for (const [itemId, tables] of found) {
  const source = sources.entries[itemId];

  if (!source) {
    throw new Error(
      `Eintrag für ${itemId} fehlt. ` +
      `Führe zuerst build-sources.mjs aus.`
    );
  }

  if (source.survival === "not_obtainable") {
  continue;
}

  for (const table of tables.values()) {
    source.ways.push(wayFor(table));
    addedWays++;
  }

  if (
    source.status === "needs_review" &&
    source.ways.length > 0
  ) {
    source.status = "loot_candidate";
  }
}

// Die Überlebensmodus-Einstufung bleibt ausdrücklich
// ungeprüft: Ein Loot-Tabellen-Eintrag allein beweist
// nicht, dass alle Bedingungen erreichbar sind.
const temporaryFile =
  `${DATA_FILE}.tmp`;

await fs.writeFile(
  temporaryFile,
  JSON.stringify(sources, null, 2) + "\n",
  "utf8"
);

await fs.rename(
  temporaryFile,
  DATA_FILE
);

console.log(
  `${tableCount} Loot-Tabellen untersucht.`
);

console.log(
  `${addedWays} mögliche Beschaffungswege ergänzt.`
);

console.log(
  `Aktualisiert: ${DATA_FILE}`
);
