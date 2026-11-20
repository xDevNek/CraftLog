import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectDirectory = path.dirname(
  fileURLToPath(import.meta.url)
);

const steps = [
  "build-sources.mjs",
  "build-loot.mjs",
  "derive-all.mjs",
  "audit-sources.mjs"
];

for (const step of steps) {
  console.log(`\n=== ${step} ===`);

  try {
    execFileSync(
      process.execPath,
      [step],
      {
        cwd: projectDirectory,
        stdio: "inherit"
      }
    );
  } catch {
    console.error(
      `Abgebrochen: ${step} ist fehlgeschlagen.`
    );
    process.exit(1);
  }
}
