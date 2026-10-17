// Fails the production build while any placeholder is left.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Preview deployments may show placeholders; production (and local builds) may not.
// Preview = a Vercel preview, or a Cloudflare Workers Builds build of any branch other than main. Both are read from
// the environment CI injects, and nothing else here depends on an .env file, so this script needs no env loader.
const cfPreview = process.env.WORKERS_CI === "1" && process.env.WORKERS_CI_BRANCH && process.env.WORKERS_CI_BRANCH !== "main";
if (process.env.VERCEL_ENV === "preview" || cfPreview) {
  console.log("Preview deployment: skipping placeholder check.");
  process.exit(0);
}

const hits = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(f) && f !== "ph.tsx") {
      readFileSync(p, "utf8")
        .split("\n")
        .forEach((l, i) => {
          if (/<Ph[\s>]/.test(l)) hits.push(`${p}:${i + 1}`);
          if (/\{\{[A-Z0-9_]+\}\}/.test(l)) hits.push(`${p}:${i + 1} token ${l.match(/\{\{[A-Z0-9_]+\}\}/)[0]}`);
        });
    }
  }
};
walk("app");

const cfg = readFileSync("app/site.config.ts", "utf8");
// The new mailbox isn't set up yet (rename to Closed Logic): block production until Matt confirms it receives mail.
if (/emailLive:\s*false/.test(cfg)) hits.push("app/site.config.ts emailLive is false (the site email address has no working mailbox yet)");

if (hits.length) {
  console.error("Placeholders remain:\n  " + hits.join("\n  "));
  process.exit(1);
}
