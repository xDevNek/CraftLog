import fs from "node:fs";

const file = new URL(
  "./minecraft-data.json",
  import.meta.url
);

const data = JSON.parse(
  fs.readFileSync(file, "utf8")
);

for (const id of data.missingGerman) {
  const entry = data.catalog.find(
    item => item.id === id
  );

  console.log(
    `${id} → ${entry?.en || "unbekannt"}`
  );
}
