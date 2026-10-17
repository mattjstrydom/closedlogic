// Dev helper: measures the hero stack at phone widths (A1 height, gap to the pause control, horizontal overflow).
//   node scripts/measure.mjs [baseUrl]    npm run dev serves :3000, npm run cf:preview serves :8787
// Set CHROME_PATH if Chrome is not at the default Windows location.
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const b = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const w of [360, 390, 430]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await p.goto(BASE, { waitUntil: "networkidle0" });
  await p.evaluate(() => localStorage.setItem("cl-consent", "denied"));
  await p.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  const m = await p.evaluate(() => {
    const box = (el) => el.getBoundingClientRect();
    const ltb = box(document.querySelector(".ltb"));
    const hero = box(document.getElementById("hero"));
    const toggle = box(document.querySelector("[data-motion-toggle]"));
    const pill = box([...document.querySelectorAll("#hero p")].find((e) => e.textContent.includes("named lead")));
    return {
      a1Height: Math.round(ltb.height),
      heroHeight: Math.round(hero.height),
      pillToA1: Math.round(ltb.top - pill.bottom),
      pauseBottomToNext: Math.round(hero.bottom - toggle.bottom),
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  console.log(w, JSON.stringify(m));
  await p.close();
}
await b.close();
