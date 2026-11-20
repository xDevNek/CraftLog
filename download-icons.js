const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const DATA_FILE = path.join(__dirname, "minecraft-data.json");
const OUTPUT_DIR = path.join(__dirname, "assets", "icons");
const CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 12000;

function isPngBuffer(buffer) {
  return (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  );
}

function getCandidateUrls(shortId, version) {
  const encoded = encodeURIComponent(shortId);
  return [
    // 1. Gerenderte Inventar-Icons (inkl. 3D-Blöcke)
    `https://mc.nerothe.com/img/${version}/minecraft_${encoded}.png`,
    // 2. PrismarineJS Fallback (Items & Blöcke)
    `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/${version}/items/${encoded}.png`,
    `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/${version}/blocks/${encoded}.png`,
    // 3. InventivetalentDev Fallback
    `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${version}/assets/minecraft/textures/item/${encoded}.png`,
    `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${version}/assets/minecraft/textures/block/${encoded}.png`
  ];
}

async function fetchIconBuffer(urls) {
  for (const url of urls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "CraftLog-Icon-Downloader/1.0"
        }
      });

      if (!response.ok) {
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (isPngBuffer(buffer)) {
        return buffer;
      }
    } catch {
      // Nächste Quelle probieren
    } finally {
      clearTimeout(timer);
    }
  }

  return null;
}

async function main() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error("Fehler: minecraft-data.json wurde im Projektordner nicht gefunden.");
    process.exit(1);
  }

  const rawData = await fsp.readFile(DATA_FILE, "utf8");
  const data = JSON.parse(rawData);
  const version = data.version || "1.21.4";

  if (!Array.isArray(data.catalog) || data.catalog.length === 0) {
    console.error("Fehler: Kein gültiger Katalog in minecraft-data.json gefunden.");
    process.exit(1);
  }

  await fsp.mkdir(OUTPUT_DIR, { recursive: true });

  const ids = [
    ...new Set(
      data.catalog
        .map(entry => String(entry.id || "").replace(/^minecraft:/, "").trim())
        .filter(Boolean)
    )
  ];

  console.log(`Starte Icon-Download für ${ids.length} Einträge (Minecraft ${version}) ...`);

  let index = 0;
  let downloaded = 0;
  let skipped = 0;
  const missing = [];

  async function worker() {
    while (true) {
      const current = index++;
      if (current >= ids.length) {
        break;
      }

      const shortId = ids[current];
      const targetPath = path.join(OUTPUT_DIR, `${shortId}.png`);

      if (fs.existsSync(targetPath)) {
        skipped++;
        continue;
      }

      const urls = getCandidateUrls(shortId, version);
      const buffer = await fetchIconBuffer(urls);

      if (buffer) {
        await fsp.writeFile(targetPath, buffer);
        downloaded++;
      } else {
        missing.push(shortId);
      }

      const done = downloaded + skipped + missing.length;
      if (done % 50 === 0 || done === ids.length) {
        console.log(
          `Fortschritt: ${done}/${ids.length} (neu: ${downloaded}, vorhanden: ${skipped}, offen: ${missing.length})`
        );
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker())
  );

  console.log("\nFertig!");
  console.log(`- Neu gespeichert: ${downloaded}`);
  console.log(`- Bereits vorhanden: ${skipped}`);
  console.log(`- Nicht gefunden (nutzen Farb-Fallback): ${missing.length}`);

  if (missing.length > 0 && missing.length <= 40) {
    console.log("Fehlende IDs:", missing.join(", "));
  }
}

main().catch(error => {
  console.error("Unerwarteter Fehler:", error);
  process.exit(1);
});