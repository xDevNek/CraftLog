import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const directory = path.dirname(
  fileURLToPath(import.meta.url)
);

const sourceFile = path.join(
  directory,
  "data",
  "sources",
  "1.21.4.json"
);

async function confirmedCount() {
  const data = JSON.parse(
    await fs.readFile(sourceFile, "utf8")
  );

  return Object.values(data.entries).filter(
    entry => entry.survival === "obtainable"
  ).length;
}

for (let round = 1; round <= 1537; round++) {
  const before = await confirmedCount();

  console.log(
    `\n--- Ableitungsrunde ${round} ---`
  );

  for (const script of [
    "derive-crafting.mjs",
    "derive-production.mjs"
  ]) {
    execFileSync(
      process.execPath,
      [script],
      {
        cwd: directory,
        stdio: "inherit"
      }
    );
  }

  const after = await confirmedCount();

  if (after < before) {
    throw new Error(
      "Die Zahl bestätigter Gegenstände ist gesunken."
    );
  }

  console.log(
    `Bestätigt: ${before} → ${after}`
  );

  if (after === before) {
    console.log(
      "Keine weiteren Gegenstände über diese Rezepte ableitbar."
    );
    break;
  }

  if (round === 1537) {
    throw new Error(
      "Keine stabile Ableitung erreicht."
    );
  }
}
