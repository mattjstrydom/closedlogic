// Dev helper: full-page screenshots at the four breakpoints, for checking layout by eye.
//   node scripts/shots.mjs [baseUrl]      npm run dev serves :3000, npm run cf:preview serves :8787
// Set CHROME_PATH if Chrome is not at the default Windows location. Screenshots go to $OUT (default ./shots).
import { mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = process.env.OUT || "shots";
mkdirSync(OUT, { recursive: true });

const b = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const w of [360, 768, 1280, 1600]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 900 });
  await p.goto(BASE, { waitUntil: "networkidle0" });
  await p.evaluate(() => localStorage.setItem("cl-consent", "denied"));
  await p.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 4500));
  const over = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(w, "h-overflow:", over);
  await p.screenshot({ path: `${OUT}/shot-${w}.png`, fullPage: true });
  await p.close();
}
await b.close();
