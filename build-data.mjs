import fs from "node:fs/promises";
import AdmZip from "adm-zip";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const minecraftData = require("minecraft-data");

const VERSION = "1.21.4";

async function downloadJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Download fehlgeschlagen: ${response.status} ${url}`);
  }

  return response.json();
}

async function downloadBuffer(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Download fehlgeschlagen: ${response.status} ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

function readJsonFromZip(zip, path) {
  const entry = zip.getEntry(path);

  if (!entry) {
    throw new Error(`Datei nicht gefunden: ${path}`);
  }

  return JSON.parse(entry.getData().toString("utf8"));
}

function id(value) {
  if (typeof value !== "string") return null;

  return value.startsWith("minecraft:")
    ? value
    : `minecraft:${value}`;
}

function getResult(recipe) {
  if (typeof recipe.result === "string") {
    return {
      id: id(recipe.result),
      count: 1
    };
  }

  if (recipe.result && typeof recipe.result === "object") {
    return {
      id: id(recipe.result.id || recipe.result.item),
      count: Number(recipe.result.count) || 1
    };
  }

  return null;
}

function getIngredient(value) {
  if (typeof value === "string") {
    return value.startsWith("#")
      ? { tag: id(value.slice(1)) }
      : { item: id(value) };
  }

  if (Array.isArray(value)) {
    return {
      alternatives: value
        .map(getIngredient)
        .filter(Boolean)
    };
  }

  if (value && typeof value === "object") {
    if (typeof value.tag === "string") {
      return { tag: id(value.tag) };
    }

    if (
      typeof value.item === "string" ||
      typeof value.id === "string"
    ) {
      return {
        item: id(value.item || value.id)
      };
    }
  }

  return null;
}

function getIngredients(recipe, type) {
  if (type === "crafting_shaped") {
    if (!Array.isArray(recipe.pattern) || !recipe.key) {
      return null;
    }

    const ingredients = [];

    for (const row of recipe.pattern) {
      for (const symbol of row) {
        if (symbol === " ") continue;

        const ingredient = getIngredient(
          recipe.key[symbol]
        );

        if (!ingredient) return null;

        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  if (type === "crafting_shapeless") {
    if (!Array.isArray(recipe.ingredients)) {
      return null;
    }

    const ingredients = recipe.ingredients.map(
      getIngredient
    );

    return ingredients.every(Boolean)
      ? ingredients
      : null;
  }

  if (
    type === "smelting" ||
    type === "blasting" ||
    type === "smoking" ||
    type === "campfire_cooking" ||
    type === "stonecutting"
  ) {
    const ingredient = getIngredient(
      recipe.ingredient
    );

    return ingredient ? [ingredient] : null;
  }

  if (type === "smithing_transform") {
    const ingredients = [
      getIngredient(recipe.template),
      getIngredient(recipe.base),
      getIngredient(recipe.addition)
    ];

    return ingredients.every(Boolean)
      ? ingredients
      : null;
  }

  return null;
}

console.log(`Suche offizielle Minecraft-Version ${VERSION} …`);

const manifest = await downloadJson(
  "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"
);

const versionEntry = manifest.versions.find(
  entry => entry.id === VERSION
);

if (!versionEntry) {
  throw new Error(`Version ${VERSION} nicht gefunden.`);
}

const version = await downloadJson(versionEntry.url);
const assetIndex = await downloadJson(
  version.assetIndex.url
);

const germanAsset =
  assetIndex.objects["minecraft/lang/de_de.json"];

if (!germanAsset) {
  throw new Error(
    "Deutsche Sprachdatei nicht gefunden."
  );
}

const germanUrl =
  "https://resources.download.minecraft.net/" +
  `${germanAsset.hash.slice(0, 2)}/${germanAsset.hash}`;

console.log(
  "Lade Sprachdatei, Client und Server herunter. " +
  "Das kann einige Minuten dauern …"
);

const [german, clientBuffer, serverBuffer] =
  await Promise.all([
    downloadJson(germanUrl),
    downloadBuffer(version.downloads.client.url),
    downloadBuffer(version.downloads.server.url)
  ]);

const clientZip = new AdmZip(clientBuffer);

const english = readJsonFromZip(
  clientZip,
  "assets/minecraft/lang/en_us.json"
);

const downloadedServerZip = new AdmZip(serverBuffer);

// Moderne Minecraft-Server-Dateien enthalten häufig
// eine zweite JAR-Datei mit den eigentlichen Spieldaten.
let recipeZip = downloadedServerZip;

const nestedServer = downloadedServerZip
  .getEntries()
  .find(entry =>
    /^META-INF\/versions\/.+\.jar$/.test(
      entry.entryName
    )
  );

if (nestedServer) {
  recipeZip = new AdmZip(
    nestedServer.getData()
  );
}

const mc = minecraftData(VERSION);

if (
  !mc ||
  !Array.isArray(mc.itemsArray) ||
  !Array.isArray(mc.blocksArray)
) {
  throw new Error(
    `Block- und Gegenstandsdaten für ${VERSION} fehlen.`
  );
}

const catalogById = new Map();

for (const item of mc.itemsArray) {
  const itemId = id(item.name);
  if (!itemId) continue;

  catalogById.set(itemId, {
    id: itemId,
    en:
      english[`item.minecraft.${item.name}`] ||
      english[`block.minecraft.${item.name}`] ||
      item.displayName ||
      item.name,
    de:
      german[`item.minecraft.${item.name}`] ||
      german[`block.minecraft.${item.name}`] ||
      null,
    isBlock: false
  });
}

for (const block of mc.blocksArray) {
  const blockId = id(block.name);
  if (!blockId) continue;

  const existing = catalogById.get(blockId);

  catalogById.set(blockId, {
    id: blockId,
    en:
      english[`block.minecraft.${block.name}`] ||
      english[`item.minecraft.${block.name}`] ||
      existing?.en ||
      block.displayName ||
      block.name,
    de:
      german[`block.minecraft.${block.name}`] ||
      german[`item.minecraft.${block.name}`] ||
      existing?.de ||
      null,
    isBlock: true
  });
}

const recipes = {};
let recipeCount = 0;

for (const entry of recipeZip.getEntries()) {
  if (
    !/^data\/minecraft\/recipes?\/.+\.json$/.test(
      entry.entryName
    )
  ) {
    continue;
  }

  let source;

  try {
    source = JSON.parse(
      entry.getData().toString("utf8")
    );
  } catch {
    continue;
  }

  const type = String(source.type || "")
    .replace(/^minecraft:/, "");

  const result = getResult(source);
  const ingredients = getIngredients(
    source,
    type
  );

  if (
    !result?.id ||
    !ingredients ||
    ingredients.length === 0
  ) {
    continue;
  }

  if (!recipes[result.id]) {
    recipes[result.id] = [];
  }

  recipes[result.id].push({
    type,
    count: result.count,
    ingredients
  });

  recipeCount++;
}

if (recipeCount === 0) {
  throw new Error(
    "Es wurden keine Rezepte in der Server-Datei gefunden. " +
    "Die Datendatei wurde deshalb nicht erstellt."
  );
}

const catalog = [...catalogById.values()];

const missingGerman = catalog
  .filter(entry => !entry.de)
  .map(entry => entry.id);

await fs.writeFile(
  "minecraft-data.json",
  JSON.stringify({
    version: VERSION,
    catalog,
    recipes,
    missingGerman
  }),
  "utf8"
);

console.log(
  `Fertig: ${catalog.length} Blöcke/Gegenstände, ` +
  `${recipeCount} Rezepte.`
);

console.log(
  `Einträge ohne deutschen Namen: ${missingGerman.length}`
);

console.log(
  "Datei erstellt: minecraft-data.json"
);