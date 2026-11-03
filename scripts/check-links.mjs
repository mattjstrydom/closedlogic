// Internal link check over the built site (out/). Fails on an internal link whose page does not exist, or whose #fragment
// is not an id on that page. A link to a redirect source is followed one hop and counted as a warning, so internal links
// can be pointed at the final page. Run: node scripts/check-links.mjs (after npm run build).
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out/", import.meta.url));
const SITE = /^https:\/\/(www\.)?closedlogic\.com/;
const redirects = new Map(
  readFileSync(out + "_redirects", "utf8").split("\n").filter((l) => l && !l.startsWith("#")).map((l) => l.split(/\s+/)).map(([from, to]) => [from.replace(/\/$/, "") || "/", to]),
);
const files = [];
const walk = (dir) => {
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const p = dir + d.name;
    if (d.isDirectory()) { if (d.name !== "_next" && d.name !== "_img") walk(p + "/"); }
    else if (d.name.endsWith(".html")) files.push(p);
  }
};
walk(out);

const pageFile = (path) => {
  const p = path.replace(/\/$/, "") || "/";
  for (const c of p === "/" ? ["index.html"] : [`${p.slice(1)}.html`, `${p.slice(1)}/index.html`, p.slice(1)]) if (existsSync(out + c) && !out.endsWith(c)) return out + c;
  return null;
};
const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};

const broken = [], warned = new Set();
let checked = 0;
for (const f of files) {
  const html = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  const page = "/" + f.slice(out.length).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    let href = m[1].replace(/&amp;/g, "&");
    if (SITE.test(href)) href = href.replace(SITE, "") || "/";
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    if (href.startsWith("//")) continue;
    const [pathAndQuery, hash = ""] = href.split("#");
    let path = pathAndQuery.split("?")[0] || page;
    checked++;
    const red = redirects.get(path.replace(/\/$/, "") || "/");
    if (red) { warned.add(`${page} -> ${path} (redirects to ${red.split("?")[0]})`); continue; }
    const target = pageFile(path);
    if (!target) { if (!existsSync(out + path.slice(1))) broken.push(`${page}: ${href} (no such page)`); continue; }
    if (hash && !idsOf(target).has(hash)) broken.push(`${page}: ${href} (no #${hash} on ${path})`);
  }
}
if (warned.size) console.warn("check-links: links to redirect sources:\n  " + [...warned].join("\n  "));
if (broken.length) { console.error("check-links: broken internal links:\n  " + broken.join("\n  ")); process.exit(1); }
console.log(`check-links: ${checked} internal links in ${files.length} pages, none broken`);
