// Renders the evidence report blocks on a /v/ page from capture.mjs output (scripts/evidence/capture.mjs).
//   node scripts/evidence/render.mjs --evidence <dir>/evidence.json --page public/v/<slug>.html [--rows "Google Ads conversion,..."]
// The page copy is written by hand; this script only fills the blocks between these markers, so a re-capture
// updates the facts without touching the words around them:
//   <!-- ev:tags --> ... <!-- /ev:tags -->    tags table: what loads, and what fires on each step we took
//   <!-- ev:proof --> ... <!-- /ev:proof -->  the request that proves the main finding (Google Ads conversion on load)
//   <!-- ev:fix --> ... <!-- /ev:fix -->      copy-paste fix for the detected form tool, with a copy button
// It also copies the form screenshots into public/v/evidence/<slug>/. Nothing here loads anything from a third party.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fixFor } from "./fixes/index.mjs";

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1]]] : a), []));
if (!args.evidence || !args.page) throw new Error("usage: render.mjs --evidence <evidence.json> --page <public/v/slug.html>");
const ev = JSON.parse(readFileSync(args.evidence, "utf8"));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Screenshots
const imgDir = join(dirname(args.page), "evidence", ev.slug);
mkdirSync(imgDir, { recursive: true });
for (const f of ["form-desktop.webp", "form-mobile.webp"]) {
  const src = join(dirname(args.evidence), f);
  if (existsSync(src)) copyFileSync(src, join(imgDir, f));
}

// Tags table. Steps we report on the page (the simulated submit and the mobile screenshot load are internal checks).
const STEPS = [
  ["click_link_to_form", "Click \u201cBook a demo\u201d on the homepage"],
  ["form_load", `Open ${new URL(ev.formUrl).pathname}`],
  ["consent_accept_click", "Click Accept on the cookie banner"],
];
// Rows to show, in this order. Keep only the rows that prove the page's finding: pass --rows "A,B" per page.
// Google Tag Manager is never a row: it loads the tags but sends no hits of its own.
const SHOW = (args.rows ? args.rows.split(",") : ["Google Ads conversion", "Google Ads remarketing", "GA4", "Meta pixel", "LinkedIn Insight", "HubSpot tracking"]).map((x) => x.trim());
for (const v of SHOW) if (v === "Google Tag Manager") throw new Error("render: Google Tag Manager sends no hits; don't show it as a row");
// The event parameter each vendor's hits carry, so every cell reads the same way as the proof request (en=..., label=...).
const PARAM = { "Google Ads conversion": "en", "Google Ads remarketing": "en", GA4: "en", "Meta pixel": "ev" };
const rows = new Map(SHOW.map((v) => [v, { vendor: v, ids: new Set(), loaded: false, fired: {} }]));
let adsTagLoaded = false;
for (const s of ev.summary) {
  // GA4 hits and the GA4 gtag.js load are one row; the Ads gtag.js load joins the Google Ads conversion row.
  const vendor = s.vendor === "Google tag (gtag.js)" ? (/^G-/.test(s.id) ? "GA4" : "Google Ads conversion") : s.vendor;
  if (s.vendor === "Google tag (gtag.js)" && /^AW-/.test(s.id) && s.loaded) adsTagLoaded = true;
  const r = rows.get(vendor);
  if (!r) continue;
  if (s.id) r.ids.add(s.id);
  r.loaded ||= s.loaded;
  for (const [ph, evs] of Object.entries(s.fired || {})) {
    const cur = new Set(r.fired[ph] || []);
    for (const e of evs) if (!/^gtag\.config$/.test(e)) cur.add(e);
    r.fired[ph] = [...cur];
  }
}
// Google Ads conversions: show the event and label of each /pagead/conversion/ request, as in the proof request.
const conv = rows.get("Google Ads conversion");
if (conv) {
  conv.fired = {};
  for (const h of ev.adsConversionHits.filter((x) => /\/pagead\/conversion\//.test(x.url))) {
    const pair = `en=${new URL(h.url).searchParams.get("en")} label=${h.label}`;
    conv.fired[h.phase] = [...new Set([...(conv.fired[h.phase] || []), pair])];
  }
}
// Remarketing hits are sent by the Google Ads tag (gtag/js?id=AW-...), which has no script of its own to load.
const rmkt = rows.get("Google Ads remarketing");
const loads = (r) => (r.loaded ? "Yes" : r === rmkt && adsTagLoaded ? "Yes, via the Google Ads tag" : "No");
const fmt = (r, e) => {
  if (e === "hit") return "Request sent";
  return e.split(" ").map((kv) => `<code>${esc(kv.includes("=") ? kv : `${PARAM[r.vendor] || "event"}=${kv.replace(/^label /, "")}`)}</code>`).join("<br>");
};
const cell = (r, ph) => {
  const f = r.fired[ph] || (ph === "form_load" ? r.fired.form_load_after_click : null);
  if (!f || !f.length) return "No request";
  const named = f.filter((x) => x !== "hit");
  return (named.length ? named : f).map((e) => fmt(r, e)).join("<br>");
};
const tagsHtml = `<div class="tablewrap"><table class="tags">
<caption>What loaded and what was sent at each step (${esc(new Date(ev.capturedAt).toLocaleString("en-GB", { timeZone: "Africa/Johannesburg", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }))} SAST, fresh browser, no consent choice made before the Accept click)</caption>
<thead><tr><th scope="col">Tag</th><th scope="col">Loads</th>${STEPS.map(([, h]) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
<tbody>
${[...rows.values()].filter((r) => r.loaded || Object.keys(r.fired).length).map((r) => `<tr><th scope="row">${esc(r.vendor)}${r.ids.size ? `<br><code>${[...r.ids].map(esc).join(", ")}</code>` : ""}</th><td>${loads(r)}</td>${STEPS.map(([ph]) => `<td>${cell(r, ph)}</td>`).join("")}</tr>`).join("\n")}
</tbody></table></div>`;

// Proof request: the conversion sent when the form page is opened, before any click.
const proof = ev.adsConversionHits.find((h) => h.phase === "form_load" && /pagead\/conversion/.test(h.url));
if (!proof) throw new Error("no Google Ads conversion on form page load in this capture: the main finding does not hold, do not render");
const u = new URL(proof.url);
const keep = ["en", "label", "page_path"];
const proofHtml = `<pre class="req" tabindex="0"><code>GET ${esc(u.origin + u.pathname)}
${keep.filter((k) => u.searchParams.has(k)).map((k) => `  ${k}=${esc(u.searchParams.get(k))}`).join("\n")}</code></pre>`;

// Fix for the detected form tool (stubs throw, so only a finished template can be rendered).
const tool = ev.form.tools.find((t) => t.tool === "hubspot" && t.forms && t.forms.length);
if (!tool) throw new Error("render: no supported form tool detected; finish its template in scripts/evidence/fixes/");
const fix = fixFor("hubspot").build({ formId: tool.forms[0].formId, variant: tool.variant });
if (!fix.embedNote) console.warn(`render: capture couldn't tell which HubSpot embed the form uses (variant "${tool.variant}"); no embed sentence on the page`);
const fixHtml = `<div class="fix"><div class="fixbar"><span>GTM: ${esc(fix.gtm.tag)}</span><button type="button" class="copy" data-copy="fix-snippet">Copy</button></div>
<pre tabindex="0"><code id="fix-snippet">${esc(fix.snippet)}</code></pre>
<ul class="triggers">${fix.gtm.triggers.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>${fix.embedNote ? `\n<p class="embed">${fix.embedNote}</p>` : ""}`;

let html = readFileSync(args.page, "utf8");
for (const [name, block] of [["tags", tagsHtml], ["proof", proofHtml], ["fix", fixHtml]]) {
  const re = new RegExp(`<!-- ev:${name} -->[\\s\\S]*?<!-- /ev:${name} -->`);
  if (!re.test(html)) throw new Error(`render: marker <!-- ev:${name} --> missing in ${args.page}`);
  html = html.replace(re, `<!-- ev:${name} -->\n${block}\n<!-- /ev:${name} -->`);
}
writeFileSync(args.page, html);
console.log(`render: ${args.page} (tags ${rows.size} rows, proof ${proof.label}, fix ${fix.snippet.length} chars)`);
