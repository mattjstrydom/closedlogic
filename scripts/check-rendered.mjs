// Runs after the build (npm "postbuild"). Fails if a {{PLACEHOLDER}} token is left in any rendered page (out/**/*.html and
// the .txt page payloads). Unlike check-placeholders.mjs (which reads source and is skipped on preview builds), this runs on
// every build: a token in rendered content never ships.
import { readdirSync, readFileSync } from "node:fs";

const out = new URL("../out/", import.meta.url);
const hits = [];
const walk = (dir) => {
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const u = new URL(d.isDirectory() ? `${d.name}/` : d.name, dir);
    if (d.isDirectory()) walk(u);
    else if (/\.(html|txt)$/.test(d.name)) {
      const m = readFileSync(u, "utf8").match(/\{\{[A-Za-z0-9_]+\}\}/g);
      if (m) hits.push(`${u.href.slice(out.href.length)}: ${[...new Set(m)].join(" ")}`);
    }
  }
};
walk(out);

if (hits.length) {
  console.error("Placeholders in rendered content:\n  " + hits.join("\n  "));
  process.exit(1);
}
console.log("check-rendered: no placeholders in out/");
