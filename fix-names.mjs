import fs from "node:fs";

const file = new URL(
  "./minecraft-data.json",
  import.meta.url
);

const data = JSON.parse(
  fs.readFileSync(file, "utf8")
);

const byId = new Map(
  data.catalog.map(entry => [entry.id, entry])
);

let fixed = 0;

for (const entry of data.catalog) {
  if (!entry.id.endsWith("_wall_banner")) {
    continue;
  }

  const regularId = entry.id.replace(
    /_wall_banner$/,
    "_banner"
  );

  const regularBanner = byId.get(regularId);

  if (!regularBanner?.de) {
    throw new Error(
      `Deutscher Name für ${regularId} fehlt.`
    );
  }

  entry.de = `${regularBanner.de} (Wand)`;
  entry.en = `${regularBanner.en} (Wall)`;

  fixed++;
}

data.missingGerman = data.catalog
  .filter(entry => !entry.de)
  .map(entry => entry.id);

fs.writeFileSync(
  file,
  JSON.stringify(data),
  "utf8"
);

console.log(`${fixed} Wandbanner benannt.`);
console.log(
  `Einträge ohne deutschen Namen: ${data.missingGerman.length}`
);
