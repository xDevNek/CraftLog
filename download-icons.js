const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const DATA_FILE = path.join(__dirname, "minecraft-data.json");
const OUTPUT_DIR = path.join(__dirname, "assets", "icons");
const CONCURRENCY = 3;
const REQUEST_TIMEOUT_MS = 15000;

const ICON_ALIASES = {
  carrots: "carrot",
  potatoes: "potato",
  beetroots: "beetroot",
  sweet_berry_bush: "sweet_berries",
  attached_melon_stem: "melon_seeds",
  melon_stem: "melon_seeds",
  attached_pumpkin_stem: "pumpkin_seeds",
  pumpkin_stem: "pumpkin_seeds",
  torchflower_crop: "torchflower_seeds",
  pitcher_crop: "pitcher_pod",
  cocoa: "cocoa_beans",
  wall_torch: "torch",
  soul_wall_torch: "soul_torch",
  redstone_wall_torch: "redstone_torch",
  redstone_wire: "redstone",
  tripwire: "string",
  water: "water_bucket",
  lava: "lava_bucket",
  powder_snow: "powder_snow_bucket",
  frosted_ice: "ice",
  piston_head: "piston",
  tall_seagrass: "seagrass",
  kelp_plant: "kelp",
  bamboo_sapling: "bamboo",
  big_dripleaf_stem: "big_dripleaf",
  cave_vines: "glow_berries",
  cave_vines_plant: "glow_berries",
  weeping_vines_plant: "weeping_vines",
  twisting_vines_plant: "twisting_vines",
  potted_azalea_bush: "azalea",
  potted_flowering_azalea_bush: "flowering_azalea"
};

function resolveShortId(rawId) {
  const shortId = String(rawId || "").replace(/^minecraft:/, "").trim();
  if (!shortId) return "";
  if (ICON_ALIASES[shortId]) return ICON_ALIASES[shortId];
  if (shortId.startsWith("potted_")) return shortId.slice(7);
  if (shortId.endsWith("_wall_sign")) return shortId.replace("_wall_sign", "_sign");
  if (shortId.endsWith("_wall_hanging_sign")) return shortId.replace("_wall_hanging_sign", "_hanging_sign");
  if (shortId.endsWith("_wall_banner")) return shortId.replace("_wall_banner", "_banner");
  if (shortId.endsWith("_wall_head")) return shortId.replace("_wall_head", "_head");
  if (shortId.endsWith("_wall_skull")) return shortId.replace("_wall_skull", "_skull");
  if (shortId.endsWith("_wall_fan")) return shortId.replace("_wall_fan", "_fan");
  if (shortId === "candle_cake" || shortId.endsWith("_candle_cake")) return "cake";
  if (shortId.endsWith("_cauldron")) return "cauldron";
  return shortId;
}

function isPngBuffer(buffer) {
  return (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCandidateUrls(shortId, version) {
  const encoded = encodeURIComponent(shortId);
  return [
    `https://mc.nerothe.com/img/${version}/minecraft_${encoded}.png`,
    `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/${version}/items/${encoded}.png`,
    `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/${version}/blocks/${encoded}.png`,
    `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${version}/assets/minecraft/textures/item/${encoded}.png`,
    `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${version}/assets/minecraft/textures/block/${encoded}.png`
  ];
}

async function fetchIconBuffer(urls) {
  for (const url of urls) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: { "User-Agent": "CraftLog-Icon-Downloader/1.1" }
        });

        if (response.status === 429 || response.status >= 500) {
          await sleep(800 * (attempt + 1));
          continue;
        }

        if (!response.ok) {
          break;
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        if (isPngBuffer(buffer)) {
          return buffer;
        }
        break;
      } catch {
        await sleep(300);
      } finally {
        clearTimeout(timer);
      }
    }
  }

  return null;
}

async function main() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error("Fehler: minecraft-data.json wurde im Projektordner nicht gefunden.");
    process.exit(1);
  }

  const data = JSON.parse(await fsp.readFile(DATA_FILE, "utf8"));
  const version = data.version || "1.21.4";

  await fsp.mkdir(OUTPUT_DIR, { recursive: true });

  const skipUnrenderable = new Set([
    "air", "cave_air", "void_air", "moving_piston", "fire", "soul_fire",
    "nether_portal", "end_portal", "end_gateway", "bubble_column"
  ]);

  const ids = [
    ...new Set(
      data.catalog
        .map(entry => resolveShortId(entry.id))
        .filter(id => id && !skipUnrenderable.has(id))
    )
  ];

  console.log(`Prüfe ${ids.length} eindeutige Icons (Minecraft ${version}) ...`);

  let index = 0;
  let downloaded = 0;
  let skipped = 0;
  const missing = [];

  async function worker() {
    while (true) {
      const current = index++;
      if (current >= ids.length) break;

      const shortId = ids[current];
      const targetPath = path.join(OUTPUT_DIR, `${shortId}.png`);

      if (fs.existsSync(targetPath)) {
        skipped++;
        continue;
      }

      await sleep(120);
      const buffer = await fetchIconBuffer(getCandidateUrls(shortId, version));

      if (buffer) {
        await fsp.writeFile(targetPath, buffer);
        downloaded++;
      } else {
        missing.push(shortId);
      }

      const done = downloaded + skipped + missing.length;
      if (done % 25 === 0 || done === ids.length) {
        console.log(
          `Fortschritt: ${done}/${ids.length} (neu: ${downloaded}, vorhanden: ${skipped}, offen: ${missing.length})`
        );
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log("\nFertig!");
  console.log(`- Neu gespeichert: ${downloaded}`);
  console.log(`- Bereits vorhanden: ${skipped}`);
  console.log(`- Offen: ${missing.length}`);
  if (missing.length > 0) {
    console.log("Offene IDs:", missing.join(", "));
  }
}

main().catch(error => {
  console.error("Unerwarteter Fehler:", error);
  process.exit(1);
});