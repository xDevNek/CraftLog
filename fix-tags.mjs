import fs from "node:fs";
import AdmZip from "adm-zip";

const VERSION = "1.21.4";

async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Download fehlgeschlagen: HTTP ${response.status}`
    );
  }

  return response.json();
}

async function getBuffer(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Download fehlgeschlagen: HTTP ${response.status}`
    );
  }

  return Buffer.from(
    await response.arrayBuffer()
  );
}

function fullId(value) {
  return value.includes(":")
    ? value
    : `minecraft:${value}`;
}

console.log("Lade Minecraft-Gegenstandsgruppen …");

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

const serverBuffer = await getBuffer(
  version.downloads.server.url
);

const downloadedZip = new AdmZip(
  serverBuffer
);

const nestedServer = downloadedZip
  .getEntries()
  .find(entry =>
    /^META-INF\/versions\/.+\.jar$/.test(
      entry.entryName
    )
  );

const serverZip = nestedServer
  ? new AdmZip(nestedServer.getData())
  : downloadedZip;

const tags = new Map();

for (const entry of serverZip.getEntries()) {
  const match = entry.entryName.match(
    /^data\/([^/]+)\/tags\/items?\/(.+)\.json$/
  );

  if (!match) continue;

  const namespace = match[1];
  const path = match[2];

  const tagId = `${namespace}:${path}`;

  const content = JSON.parse(
    entry.getData().toString("utf8")
  );

  tags.set(
    tagId,
    Array.isArray(content.values)
      ? content.values
      : []
  );
}

if (tags.size === 0) {
  throw new Error(
    "Keine Gegenstandsgruppen in der Server-Datei gefunden."
  );
}

function expandTag(tagId, visited = new Set()) {
  if (visited.has(tagId)) {
    return [];
  }

  const values = tags.get(tagId);

  if (!values) {
    return [];
  }

  const nextVisited = new Set(visited);
  nextVisited.add(tagId);

  const items = [];

  for (const value of values) {
    const raw =
      typeof value === "string"
        ? value
        : value?.id;

    if (typeof raw !== "string") {
      continue;
    }

    if (raw.startsWith("#")) {
      items.push(
        ...expandTag(
          fullId(raw.slice(1)),
          nextVisited
        )
      );
    } else {
      items.push(fullId(raw));
    }
  }

  return [...new Set(items)];
}

const file = new URL(
  "./minecraft-data.json",
  import.meta.url
);

const data = JSON.parse(
  fs.readFileSync(file, "utf8")
);

if (data.version !== VERSION) {
  throw new Error(
    `Datendatei hat Version ${data.version}, ` +
    `erwartet wurde ${VERSION}.`
  );
}

const oakLogs = expandTag(
  "minecraft:oak_logs"
);

if (!oakLogs.includes("minecraft:oak_log")) {
  throw new Error(
    "Die Gruppe minecraft:oak_logs konnte " +
    "nicht korrekt aufgelöst werden."
  );
}

let resolved = 0;
const unresolved = new Set();

function fixIngredient(ingredient) {
  if (ingredient.tag) {
    const items = expandTag(
      ingredient.tag
    );

    if (items.length === 0) {
      unresolved.add(ingredient.tag);
      return ingredient;
    }

    resolved++;

    return {
      alternatives: items.map(
        item => ({ item })
      )
    };
  }

  if (ingredient.alternatives) {
    return {
      alternatives:
        ingredient.alternatives.map(
          fixIngredient
        )
    };
  }

  return ingredient;
}

for (
  const recipeList of
  Object.values(data.recipes)
) {
  for (const recipe of recipeList) {
    recipe.ingredients =
      recipe.ingredients.map(
        fixIngredient
      );
  }
}

fs.writeFileSync(
  file,
  JSON.stringify(data),
  "utf8"
);

console.log(
  `${tags.size} Gegenstandsgruppen gefunden.`
);

console.log(
  `${resolved} Gruppenzutaten in Rezepten aufgelöst.`
);

console.log(
  `Nicht aufgelöste Gruppen: ${unresolved.size}`
);

if (unresolved.size > 0) {
  console.log(
    [...unresolved].join("\n")
  );
}

console.log(
  "minecraft-data.json aktualisiert."
);
