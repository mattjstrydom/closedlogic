// Runs after the build (npm "postbuild"). Fails if a placeholder is left in rendered content:
//  - a {{TOKEN}} anywhere in out/**/*.html or .txt
//  - bracketed placeholder text such as [X], [price] or [Name] in the visible text of a page (code, pre, script, style and
//    JSON are left out, and so are markdown-style [text](url) links). Unlike check-placeholders.mjs (source, skipped on preview
//    builds), this runs on every build: a placeholder in rendered content never ships.
import { readdirSync, readFileSync } from "node:fs";

const out = new URL("../out/", import.meta.url);
const hits = [];
const visible = (html) =>
  html.replace(/<(script|style|noscript|code|pre|svg)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ");
const walk = (dir) => {
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const u = new URL(d.isDirectory() ? `${d.name}/` : d.name, dir);
    if (d.isDirectory()) walk(u);
    else if (/\.(html|txt)$/.test(d.name)) {
      const raw = readFileSync(u, "utf8");
      const name = u.href.slice(out.href.length);
      const tokens = raw.match(/\{\{[A-Za-z0-9_]+\}\}/g);
      if (tokens) hits.push(`${name}: ${[...new Set(tokens)].join(" ")}`);
      if (d.name.endsWith(".html")) {
        const brackets = visible(raw).match(/\[[A-Za-z0-9][A-Za-z0-9 _\-/$.,]{0,30}\](?!\()/g);
        if (brackets) hits.push(`${name}: ${[...new Set(brackets)].join(" ")}`);
      }
    }
  }
};
walk(out);

if (hits.length) {
  console.error("Placeholders in rendered content:\n  " + hits.join("\n  "));
  process.exit(1);
}
console.log("check-rendered: no placeholders in out/");
