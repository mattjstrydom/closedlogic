// Renders the share images from scripts/og-v3.html: 1200x630 for Open Graph and 1200x600 for X/Twitter, into public/.
//   node scripts/make-og.mjs
// Needs puppeteer-core and a local Chrome (set CHROME_PATH if it isn't at the default Windows location) and a network
// connection for the Google Fonts the template links. Re-run after any change to the positioning text.
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const page = fileURLToPath(new URL("./og-v3.html", import.meta.url));
const sizes = [
  ["closedlogic-og-v3-1200x630.png", 630],
  ["closedlogic-og-v3-x-1200x600.png", 600],
];

const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files"] });
for (const [file, h] of sizes) {
  const p = await b.newPage();
  await p.setViewport({ width: 1200, height: h });
  await p.goto(`file:///${page.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });
  await p.evaluate((hh) => document.getElementById("frame").style.setProperty("--h", `${hh}px`), h);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: fileURLToPath(new URL(`../public/${file}`, import.meta.url)), clip: { x: 0, y: 0, width: 1200, height: h } });
  await p.close();
  console.log("wrote", file);
}
await b.close();
