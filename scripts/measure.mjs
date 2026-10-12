import puppeteer from "puppeteer-core";
const base = process.argv[2];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const w of [360, 390, 430]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await p.goto(base + "/", { waitUntil: "networkidle0" });
  await p.evaluate(() => localStorage.setItem("cl-consent", "denied"));
  await p.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  const m = await p.evaluate(() => {
    const ltb = document.querySelector(".ltb").getBoundingClientRect();
    const hero = document.getElementById("hero").getBoundingClientRect();
    const btn = document.querySelector("[data-motion-toggle]").getBoundingClientRect();
    const pill = [...document.querySelectorAll("#hero p")].find((e) => e.textContent.includes("named lead")).getBoundingClientRect();
    return { a1Height: Math.round(ltb.height), heroHeight: Math.round(hero.height), pillToA1: Math.round(ltb.top - pill.bottom), pauseBottomToNext: Math.round(hero.bottom - btn.bottom) };
  });
  console.log(w, JSON.stringify(m));
  await p.close();
}
await b.close();
