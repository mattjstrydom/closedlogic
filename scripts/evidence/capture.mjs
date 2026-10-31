#!/usr/bin/env node
// Evidence capture for the unlisted /v/ video pages (rebuild piloted on Borderless, 31 Oct 2026).
// Committed, never deployed: nothing under scripts/ ships in out/. Run from a dev box, not CI.
//
// What it does, using only the prospect's public website:
//   1. Loads the home page in a fresh browser with no consent choice, and records which tags load (GTM, gtag/GA4,
//      Google Ads AW-, Meta, LinkedIn, HubSpot and so on) and which collect endpoints the page calls.
//   2. Clicks the site's own link to the form page (an ordinary visitor click) and records what fires.
//   3. Loads the form page directly in a second fresh browser, screenshots it with the form outlined in coral.
//   4. Focuses a field and types a few characters, then Tabs away. It NEVER submits the form.
//   5. Clicks the cookie banner's Accept, if there is one, and records what fires.
//   6. Optional (--simulate, HubSpot only): with every request blocked first, posts HubSpot's documented
//      "onFormSubmitted" browser message to the page and records which tags try to fire. No request leaves the
//      browser, so no lead, analytics hit or conversion reaches the prospect's accounts. Labelled as a simulation.
//   7. Downloads each public GTM container (gtm.js) and Google Ads tag config (gtag/js?id=AW-...) and lists the tags
//      and their triggers, so a claim can be proved from the published config when it can't be proved by a submit.
//
// Ad and analytics collect requests the prospect's page sends are recorded and then aborted (blocked) by this script,
// so our test visits are not counted in their Google Ads, GA4, Meta or LinkedIn reports.
//
// Privacy: the output keeps cookie NAMES only, never values, and keeps only a whitelist of URL parameters (tag ids,
// conversion labels, event names, consent STATE flags). No client ids, session ids, consent ids, gclids or user data.
//
// Usage (Playwright is not a site dependency; point at any install):
//   PLAYWRIGHT=/workspace/shot/node_modules/playwright/index.js \
//   node scripts/evidence/capture.mjs --url https://www.getborderless.co.uk --form /demo --slug borderless-abuhiuen \
//     --out ../outbound/video-rebuild/evidence/borderless-abuhiuen [--simulate]
// Output: <out>/evidence.json, <out>/form-desktop.webp, <out>/form-mobile.webp (sharp, already in node_modules).
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]);
    return acc;
  }, []),
);
if (!args.url || !args.form || !args.slug) {
  console.error("usage: capture.mjs --url https://example.com --form /demo --slug name-xxxx --out dir [--simulate]");
  process.exit(2);
}
const SITE = new URL(args.url);
const FORM_URL = new URL(args.form, SITE).href;
const OUT = resolve(args.out || `evidence-${args.slug}`);
mkdirSync(OUT, { recursive: true });

const pwPath = process.env.PLAYWRIGHT || "playwright";
const { chromium } = await import(pwPath.startsWith("/") ? pathToFileURL(pwPath).href : pwPath).then((m) => m.default || m);
const sharp = (await import("sharp")).default;

// ---------- request classification ----------
/** [vendor, kind, regex]. kind: "script" (a tag loading) or "hit" (data sent to a collect endpoint). */
const RULES = [
  ["Google Tag Manager", "script", /googletagmanager\.com\/gtm\.js/],
  ["Google tag (gtag.js)", "script", /googletagmanager\.com\/gtag\/js/],
  ["Google Ads conversion", "hit", /googleadservices\.com\/pagead\/conversion\/|google\.[a-z.]+\/pagead\/1p-conversion\/|\/ccm\/conversion\//],
  ["Google Ads remarketing", "hit", /googleads\.g\.doubleclick\.net\/pagead\/viewthroughconversion\/|google\.[a-z.]+\/pagead\/1p-user-list\/|\/ccm\/collect/],
  ["Google Ads form data", "hit", /google\.[a-z.]+\/pagead\/form-data\//],
  ["GA4", "hit", /(google-analytics\.com|analytics\.google\.com)\/g\/collect/],
  ["Meta pixel", "script", /connect\.facebook\.net\/.*(fbevents|signals)/],
  ["Meta pixel", "hit", /facebook\.com\/tr/],
  ["LinkedIn Insight", "script", /snap\.licdn\.com/],
  ["LinkedIn Insight", "hit", /px\.ads\.linkedin\.com|linkedin\.com\/px/],
  ["Microsoft Ads (UET)", "script", /bat\.bing\.com\/bat\.js/],
  ["Microsoft Ads (UET)", "hit", /bat\.bing\.com\/action/],
  ["Microsoft Clarity", "script", /clarity\.ms\/tag/],
  ["Microsoft Clarity", "hit", /\.clarity\.ms\/collect/],
  ["HubSpot tracking", "script", /js[\w-]*\.hs-scripts\.com|js[\w-]*\.hs-analytics\.net|js[\w-]*\.hs-banner\.com/],
  ["HubSpot tracking", "hit", /track[\w-]*\.hubspot\.com\/__pt|\/__ptq\.gif/],
  ["HubSpot forms", "script", /hsforms\.net\/forms|hsforms\.com\/forms|js[\w-]*\.hsforms\.net/],
  ["HubSpot forms", "hit", /forms[\w-]*\.hubspot\.com\/submissions|hsforms\.com\/submissions/],
  ["RevenueHero", "script", /revenuehero\.io\/scheduler/],
  ["Chili Piper", "script", /chilipiper\.com/],
  ["Calendly", "script", /assets\.calendly\.com/],
  ["Typeform", "script", /embed\.typeform\.com/],
  ["Intercom", "script", /widget\.intercom\.io|js\.intercomcdn\.com/],
  ["GrowSurf", "script", /growsurf\.com\/growsurf\.js/],
  ["Hotjar", "script", /static\.hotjar\.com/],
  ["TikTok pixel", "script", /analytics\.tiktok\.com/],
  ["Reddit pixel", "script", /redditstatic\.com\/ads/],
  ["X (Twitter) pixel", "script", /static\.ads-twitter\.com/],
  ["Finsweet cookie consent", "script", /finsweet.*cookie|fs-cc/],
  ["Cookiebot", "script", /consent\.cookiebot\.com/],
  ["OneTrust", "script", /cdn\.cookielaw\.org|onetrust/],
];
// Collect hits are aborted after being recorded, so our visits never count in the prospect's reports.
const BLOCK = /\/g\/collect|pagead\/conversion\/|1p-conversion|1p-user-list|viewthroughconversion|\/ccm\/|pagead\/form-data|facebook\.com\/tr|px\.ads\.linkedin|linkedin\.com\/px|bat\.bing\.com\/action|clarity\.ms\/collect|__ptq\.gif|\/__pt|td\.doubleclick\.net|forms[\w-]*\.hubspot\.com\/submissions|hsforms\.com\/submissions|growsurf\.com\/api|ingest/;
// URL parameters worth keeping: tag ids, labels, event names and consent STATE flags. Nothing that identifies a person.
const KEEP = new Set(["id", "tid", "label", "en", "ev", "pid", "conversionId", "gcs", "gcd", "npa", "dma", "fmt", "url_path"]);

function clean(u) {
  try {
    const url = new URL(u);
    const q = new URLSearchParams();
    for (const [k, v] of url.searchParams) if (KEEP.has(k)) q.set(k, v.slice(0, 80));
    // page the hit is about: path only (dl/url/page_location can carry a gclid or form values)
    for (const k of ["dl", "url", "page_location"]) {
      const v = url.searchParams.get(k);
      if (v) try { q.set("page_path", new URL(v).pathname); } catch { /* not a url */ }
    }
    const s = q.toString();
    return `${url.origin}${url.pathname}${s ? `?${s}` : ""}`;
  } catch {
    return String(u).split("?")[0];
  }
}
function classify(u) {
  for (const [vendor, kind, re] of RULES) if (re.test(u)) return { vendor, kind };
  return null;
}
function idsFrom(u) {
  const url = new URL(u);
  const out = {};
  const gtm = url.searchParams.get("id");
  if (gtm && /^(GTM|G|AW|DC|GT)-/.test(gtm)) out.tagId = gtm;
  const conv = url.pathname.match(/(?:conversion|1p-conversion|viewthroughconversion|1p-user-list)\/(\d+)/);
  if (conv) out.adsAccount = `AW-${conv[1]}`;
  if (url.searchParams.get("label")) out.label = url.searchParams.get("label");
  if (url.searchParams.get("tid")) out.tagId = url.searchParams.get("tid");
  if (url.searchParams.get("en")) out.event = url.searchParams.get("en");
  if (url.searchParams.get("ev")) out.event = url.searchParams.get("ev");
  if (url.searchParams.get("pid")) out.tagId = `LinkedIn ${url.searchParams.get("pid")}`;
  if (/facebook\.com\/tr/.test(u) && url.searchParams.get("id")) out.tagId = `Meta ${url.searchParams.get("id")}`;
  if (url.searchParams.get("gcs")) out.consentState = url.searchParams.get("gcs");
  return out;
}

// Records every request; tags it with the current phase.
function recorder(context) {
  const rec = { phase: "init", requests: [], navigations: [] };
  context.on("request", (r) => {
    const u = r.url();
    if (!/^https?:/.test(u)) return;
    const c = classify(u);
    if (!c) return;
    rec.requests.push({ phase: rec.phase, ...c, ...idsFrom(u), method: r.method(), url: clean(u) });
  });
  return rec;
}
async function blockCollect(context, rec) {
  await context.route("**/*", (route) => {
    const u = route.request().url();
    if (rec.blockAll) {
      rec.blockedAll = (rec.blockedAll || 0) + 1;
      if (route.request().isNavigationRequest()) rec.navigations.push({ phase: rec.phase, url: clean(u), hadQueryString: u.includes("?"), blocked: true });
      return route.abort();
    }
    return BLOCK.test(u) ? route.abort() : route.continue();
  });
}
// Listens to window messages (type, eventName, whether data is a string or an object, origin). No values kept.
const MESSAGE_SPY = () => {
  window.__evMsgs = [];
  window.addEventListener("message", (e) => {
    let d = e.data;
    const dataType = typeof d;
    if (typeof d === "string") { if (!/hsFormCallback|MEETING|hs-form/i.test(d)) return; try { d = JSON.parse(d); } catch { d = { raw: "string" }; } }
    if (!d || typeof d !== "object") return;
    const t = d.type || d.event || d.eventName;
    if (!t || !/hsFormCallback|MEETING|PAGE_LOADED|PROSPECT|calendly|chilipiper|form/i.test(String(t))) return;
    window.__evMsgs.push({ type: String(d.type || ""), eventName: String(d.eventName || ""), dataType, origin: e.origin, at: Math.round(performance.now()) });
  });
};
const dataLayerEvents = (page) =>
  page.evaluate(() =>
    (window.dataLayer || []).map((x) => {
      if (!x || typeof x !== "object") return null;
      if (x[0] !== undefined) return { gtag: String(x[0]), arg: typeof x[1] === "string" ? x[1].slice(0, 40) : undefined };
      const o = { event: x.event ? String(x.event) : undefined };
      if (x.event === "gtm.click" || x.event === "gtm.linkClick") {
        try { o.elementUrl = new URL(x["gtm.elementUrl"]).pathname + (new URL(x["gtm.elementUrl"]).hash || ""); } catch { /* none */ }
        o.elementText = String(x["gtm.element"]?.innerText || "").trim().slice(0, 40) || undefined;
      }
      return o;
    }).filter(Boolean),
  ).catch(() => []);
const cookieNames = async (context) => [...new Set((await context.cookies()).map((c) => c.name))].sort();

// ---------- form detection (from the page, not a submit) ----------
async function detectForm(page) {
  return page.evaluate(() => {
    const html = document.documentElement.outerHTML;
    const tools = [];
    const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden";
    const hsCreate = [...html.matchAll(/hbspt\.forms\.create\(\{([^}]*)\}/g)].map((m) => ({
      portalId: (m[1].match(/portalId\s*:\s*["']?(\d+)/) || [])[1],
      formId: (m[1].match(/formId\s*:\s*["']([\w-]+)/) || [])[1],
      region: (m[1].match(/region\s*:\s*["']([\w-]+)/) || [])[1],
    }));
    const hsForm = document.querySelector("form.hs-form, form[id^='hsForm_'], .hs-form-frame, iframe.hs-form-iframe");
    if (hsCreate.length || hsForm) tools.push({ tool: "hubspot", variant: /hsforms\.net\/forms\/embed\/v2|forms\/v2\.js|embed\/v2\.js/.test(html) ? "v2-embed" : document.querySelector(".hs-form-frame") ? "v4-embed" : "unknown", forms: hsCreate, visible: visible(hsForm) });
    for (const f of document.querySelectorAll("form[data-wf-hs-form], form[action*='hubspotonwebflow']")) tools.push({ tool: "hubspot-on-webflow", visible: visible(f), name: f.getAttribute("data-name") || f.getAttribute("name") || "" });
    for (const f of document.querySelectorAll(".w-form form:not([data-wf-hs-form])")) tools.push({ tool: "webflow", visible: visible(f), name: f.getAttribute("data-name") || "" });
    if (/revenuehero\.io\/scheduler/.test(html)) tools.push({ tool: "revenuehero", routerId: (html.match(/routerId\s*:\s*["'](\d+)/) || [])[1], schedules: (html.match(/hero\.schedule\(["']([^"']+)/) || [])[1] });
    if (/chilipiper\.com/.test(html)) tools.push({ tool: "chilipiper" });
    if (/calendly\.com/.test(html)) tools.push({ tool: "calendly" });
    if (/typeform\.com/.test(html)) tools.push({ tool: "typeform" });
    if (/marketo|mktoForms2/.test(html)) tools.push({ tool: "marketo" });
    const scriptsOnPage = [...document.scripts].filter((s) => !s.src).map((s) => s.textContent || "");
    const pageListeners = {
      // how the page's own scripts read HubSpot's message: as a string or as an object
      hsStringListener: scriptsOnPage.some((t) => /hsFormCallback/.test(t) && /typeof\s+\w+\.data\s*!==?\s*["']string/.test(t)),
      hsObjectListener: scriptsOnPage.some((t) => /hsFormCallback/.test(t) && /\.data\.type\s*===?\s*["']hsFormCallback/.test(t)),
      redirectsWithFormValues: scriptsOnPage.some((t) => /hsFormCallback/.test(t) && /location\.href\s*=/.test(t) && /email/i.test(t)),
    };
    return { tools, pageListeners };
  });
}
// Outline the form in coral and scroll it into view; returns the element handle's box.
async function highlightForm(page) {
  return page.evaluate(() => {
    const cands = [...document.querySelectorAll("form.hs-form, form[id^='hsForm_'], .hs-form-frame, iframe.hs-form-iframe, .w-form form, form")]
      .filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== "hidden" && el.offsetHeight > 120);
    const el = cands[0];
    if (!el) return null;
    // Sticky headers and cookie banners would cover the form in a full-page shot: hide them for the screenshot only.
    for (const x of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(x).position;
      if ((pos === "fixed" || pos === "sticky") && !x.contains(el)) { x.style.setProperty("visibility", "hidden", "important"); x.setAttribute("data-ev-hidden", ""); }
    }
    el.style.outline = "4px solid #ff4b3e";
    el.style.outlineOffset = "6px";
    el.style.borderRadius = "4px";
    el.scrollIntoView({ block: "center" });
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y + window.scrollY, width: r.width, height: r.height, selector: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : "") };
  });
}
const unhide = (page) => page.evaluate(() => { for (const el of document.querySelectorAll("[data-ev-hidden]")) { el.style.removeProperty("visibility"); el.removeAttribute("data-ev-hidden"); } });
async function toWebp(png, file, width) {
  await sharp(png).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
}

// ---------- GTM and gtag config parsing (public files) ----------
function loadResource(js) {
  const i = js.indexOf('"resource":');
  if (i < 0) return null;
  const s = js.slice(i + 11).trimStart();
  let depth = 0, inStr = false, esc = false;
  for (let j = 0; j < s.length; j++) {
    const ch = s[j];
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true; else if (ch === "{") depth++; else if (ch === "}" && --depth === 0) return JSON.parse(s.slice(0, j + 1));
  }
  return null;
}
function val(r, v, d = 0) {
  if (d > 5) return "?";
  if (!Array.isArray(v)) return v;
  if (!v.length) return [];
  if (v[0] === "macro") { const m = r.macros[v[1]] || {}; return `{{${(m.function || "").replace(/^__/, "")}:${m.vtp_name || m.vtp_component || m.vtp_varType || ""}}}`; }
  if (v[0] === "escape") return val(r, v[1], d + 1);
  if (v[0] === "template") return v.slice(1).map((x) => val(r, x, d + 1)).join("");
  if (v[0] === "list") return v.slice(1).map((x) => val(r, x, d + 1));
  if (v[0] === "map") { const o = {}; for (let i = 1; i < v.length - 1; i += 2) o[val(r, v[i], d + 1)] = val(r, v[i + 1], d + 1); return o; }
  return v.map((x) => val(r, x, d + 1));
}
const FN = { __awct: "Google Ads conversion", __googtag: "Google tag", __gclidw: "Conversion linker", __awud: "Google Ads user-provided data", __html: "Custom HTML", __cl: "Click listener", __lcl: "Link click listener", __sp: "Google Ads remarketing", __gaawe: "GA4 event", __ua: "Universal Analytics", __bzi: "LinkedIn Insight", __img: "Custom image", __fls: "Floodlight", __tg: "Trigger group" };
function parseGtm(js) {
  const r = loadResource(js);
  if (!r) return null;
  const pred = (i) => { const p = r.predicates[i]; return `${val(r, p.arg0)} ${p.function.replace(/^_/, "")} ${val(r, p.arg1)}`; };
  const tags = r.tags.map((t, ti) => {
    const triggers = r.rules.filter((rule) => rule.some((x) => x[0] === "add" && x.slice(1).includes(ti))).map((rule) => ({
      if: rule.filter((x) => x[0] === "if").flatMap((x) => x.slice(1).map(pred)),
      unless: rule.filter((x) => x[0] === "unless").flatMap((x) => x.slice(1).map(pred)),
    }));
    const o = { index: ti, type: FN[t.function] || t.function, function: t.function, paused: !!t.paused, triggers };
    for (const k of ["vtp_conversionId", "vtp_conversionLabel", "vtp_tagId", "vtp_eventName"]) if (t[k] !== undefined) o[k.slice(4)] = val(r, t[k]);
    if (t.function === "__html") o.html = String(val(r, t.vtp_html)).replace(/\s+/g, " ").slice(0, 400);
    return o;
  });
  const count = {};
  for (const t of tags) count[t.type] = (count[t.type] || 0) + 1;
  const version = (js.match(/"version":"(\d+)"/) || [])[1];
  return { version, tagCount: tags.length, byType: count, tags };
}
function parseGtagAds(js) {
  const r = loadResource(js);
  if (!r) return null;
  const flat = (e) => {
    if (e.booleanExpressionValue) e = e.booleanExpressionValue;
    if (e.contextValue) return e.contextValue.keyParts.join(".");
    if (e.stringValue !== undefined) return JSON.stringify(e.stringValue);
    const op = { 1: "OR", 2: "AND", 5: "equals", 6: "starts with", 7: "contains" }[e.type] || `op${e.type}`;
    return `(${(e.args || []).map(flat).join(` ${op} `)})`;
  };
  const rules = [];
  for (const t of r.tags) {
    if (t.function !== "__ccd_ads_conv_marking") continue;
    for (const m of t.vtp_conversionRules.slice(1)) {
      const o = {};
      for (let i = 1; i < m.length - 1; i += 2) o[m[i]] = m[i + 1];
      rules.push({ label: o.conversionLabel, rule: flat(JSON.parse(o.matchingRules)) });
    }
  }
  const features = r.tags.map((t) => t.function).filter((f) => /^__ogt|^__ccd/.test(f));
  const autoEmail = r.tags.some((t) => t.function === "__ogt_1p_data_v2" && t.vtp_autoEmailEnabled);
  return { urlRules: rules, features: [...new Set(features)], autoCollectEmailForEnhancedConversions: autoEmail };
}

// ---------- run ----------
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const browser = await chromium.launch();
const evidence = {
  slug: args.slug,
  site: SITE.origin,
  formUrl: FORM_URL,
  capturedAt: new Date().toISOString(),
  capturedFrom: process.env.CAPTURE_FROM || "unknown location (set CAPTURE_FROM, e.g. 'South Africa'); consent banners can differ by country",
  method: "Public pages only, fresh browser, no consent choice unless stated. Collect requests recorded then blocked by the script. Form never submitted.",
  phases: {},
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Phase 1 and 2: home page, then the site's own link to the form page.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: "en-GB" });
  const rec = recorder(context);
  await blockCollect(context, rec);
  const page = await context.newPage();
  rec.phase = "home_load";
  await page.goto(SITE.href, { waitUntil: "load", timeout: 60000 });
  await wait(7000);
  evidence.phases.home_load = { cookiesBeforeConsent: await cookieNames(context), dataLayer: await dataLayerEvents(page) };
  const formPath = new URL(FORM_URL).pathname;
  // The first visible link on the page whose address is the form page (resolved, so /demo and https://site/demo both count).
  const linkIndex = await page.evaluate((formPath) => [...document.querySelectorAll("a[href]")].findIndex((a) => {
    try { return new URL(a.href).pathname.replace(/\/$/, "") === formPath.replace(/\/$/, "") && a.getClientRects().length > 0 && getComputedStyle(a).visibility !== "hidden"; } catch { return false; }
  }), formPath);
  const link = page.locator("a[href]").nth(Math.max(0, linkIndex));
  if (linkIndex >= 0) {
    const text = (await link.innerText().catch(() => "")).trim().slice(0, 40);
    rec.phase = "click_link_to_form";
    page.on("framenavigated", (f) => { if (f === page.mainFrame() && rec.phase === "click_link_to_form") rec.phase = "form_load_after_click"; });
    const dlBefore = (await dataLayerEvents(page)).length;
    await page.evaluate(() => { window.__keep = true; });
    await Promise.all([page.waitForURL((u) => u.pathname.startsWith(formPath), { timeout: 20000 }).catch(() => null), link.click()]);
    await wait(7000);
    evidence.phases.click_link_to_form = { linkText: text, linkHref: formPath, dataLayerBeforeNavigation: dlBefore };
  } else evidence.phases.click_link_to_form = { skipped: `no visible link to ${formPath} on the home page` };
  evidence.requestsHome = rec.requests;
  await context.close();
}

// Phase 3 to 6: the form page in a fresh browser.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: "en-GB" });
  await context.addInitScript(MESSAGE_SPY);
  const rec = recorder(context);
  await blockCollect(context, rec);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(String(e.message).slice(0, 160)));
  rec.phase = "form_load";
  await page.goto(FORM_URL, { waitUntil: "load", timeout: 60000 });
  await wait(9000);
  const form = await detectForm(page);
  evidence.form = form;
  evidence.phases.form_load = { cookiesBeforeConsent: await cookieNames(context), dataLayer: await dataLayerEvents(page), messages: await page.evaluate(() => window.__evMsgs) };

  // Screenshots: desktop full width around the form, then mobile.
  const box = await highlightForm(page);
  evidence.screenshot = { formElement: box?.selector || null };
  if (box) {
    await wait(600);
    const png = await page.screenshot({ fullPage: true, clip: { x: 0, y: Math.max(0, box.y - 140), width: 1440, height: Math.min(1300, box.height + 280) } });
    await toWebp(png, `${OUT}/form-desktop.webp`, 1200);
    evidence.screenshot.desktop = "form-desktop.webp";
    await unhide(page);
  }

  // Phase 4: type into one field, Tab away. Never submit.
  rec.phase = "form_interaction";
  // The form can sit in the page or in HubSpot's iframe; use whichever has a visible text field. Not the email field.
  const sel = "form input[name=firstname]:visible, form input[type=text]:visible";
  const iframes = page.locator("iframe[id^='hs-form-iframe'], iframe.hs-form-iframe");
  const frames = [page];
  for (let i = 0; i < (await iframes.count()); i++) if (await iframes.nth(i).isVisible()) frames.push(page.frameLocator("iframe[id^='hs-form-iframe'], iframe.hs-form-iframe").nth(i));
  let field = page.locator(sel).first();
  for (const f of frames) if (await f.locator(sel).count()) { field = f.locator(sel).first(); break; }
  if (await field.count()) {
    await field.scrollIntoViewIfNeeded();
    await field.click();
    await page.keyboard.type("Test", { delay: 60 });
    await page.keyboard.press("Tab");
    await wait(5000);
    await field.fill("");
    evidence.phases.form_interaction = { field: (await field.getAttribute("name")) || "first text field", typed: "Test (then cleared)", submitted: false, dataLayer: await dataLayerEvents(page) };
  } else evidence.phases.form_interaction = { skipped: "no visible text field" };

  // Phase 5: cookie banner Accept, if present.
  const accept = page.locator("a, button").filter({ hasText: /^\s*(accept|accept all|allow all|i agree|agree)\s*$/i }).filter({ visible: true }).first();
  if (await accept.count()) {
    rec.phase = "consent_accept_click";
    const href = await accept.getAttribute("href");
    const before = (await dataLayerEvents(page)).length;
    await accept.click({ noWaitAfter: true }).catch(() => null);
    await wait(5000);
    const dl = await dataLayerEvents(page);
    evidence.phases.consent_accept_click = { elementText: (await accept.innerText().catch(() => "Accept")).trim(), elementHref: href, dataLayerAfter: dl.slice(before), cookiesAfter: await cookieNames(context) };
  } else evidence.phases.consent_accept_click = { skipped: "no visible Accept button (banner may not show in this country)" };

  // Mobile screenshot of the form (new tab, same context; collect hits are blocked anyway).
  {
    rec.phase = "mobile_screenshot_load";
    const m = await context.newPage();
    await m.setViewportSize({ width: 390, height: 844 });
    await m.goto(FORM_URL, { waitUntil: "load", timeout: 60000 });
    await wait(6000);
    const mb = await highlightForm(m);
    if (mb) {
      await wait(500);
      const png = await m.screenshot({ fullPage: true, clip: { x: 0, y: Math.max(0, mb.y - 80), width: 390, height: Math.min(1400, mb.height + 160) } });
      await toWebp(png, `${OUT}/form-mobile.webp`, 390 * 2);
      evidence.screenshot.mobile = "form-mobile.webp";
    }
    await m.close();
  }

  // Phase 6: optional simulation of HubSpot's documented submit message, with the network fully blocked first.
  const hs = form.tools.find((t) => t.tool === "hubspot");
  if (args.simulate && hs) {
    rec.blockAll = true;
    const formId = hs.forms?.[0]?.formId || "unknown";
    const sim = {};
    for (const variant of ["object", "string"]) {
      rec.phase = `simulated_submit_${variant}`;
      const before = (await dataLayerEvents(page)).length;
      await page.evaluate(({ formId, variant }) => {
        // HubSpot global form events (legacydocs.hubspot.com/docs/methods/forms/advanced_form_options): the embed posts
        // { type: "hsFormCallback", eventName: "onFormSubmitted", id: <form guid>, data: {...} } to the window.
        const msg = { type: "hsFormCallback", eventName: "onFormSubmitted", id: formId, data: { formGuid: formId, submissionValues: {} } };
        window.postMessage(variant === "string" ? JSON.stringify(msg) : msg, "*");
      }, { formId, variant });
      await wait(4000);
      sim[variant] = { dataLayer: (await dataLayerEvents(page)).slice(before), url: new URL(page.url()).pathname };
    }
    evidence.phases.simulated_submit = {
      note: "SIMULATION. Every request was blocked before this step, so nothing left the browser. The form was not submitted. 'object' is the documented message shape; 'string' is the shape the page's own redirect script expects.",
      formId,
      ...sim,
      navigationAttempts: rec.navigations.map((n) => ({ ...n, url: n.url.split("?")[0] })),
      requestsAborted: rec.blockedAll || 0,
    };
  }
  evidence.consoleErrorsOnForm = consoleErrors.slice(0, 10);
  evidence.requestsForm = rec.requests;
  await context.close();
}
await browser.close();

// Phase 7: public container configs.
const ids = new Set([...evidence.requestsHome, ...evidence.requestsForm].map((r) => r.tagId).filter((x) => /^(GTM|AW|G)-/.test(x || "")));
for (const r of [...evidence.requestsHome, ...evidence.requestsForm]) if (r.adsAccount) ids.add(r.adsAccount);
evidence.containers = {};
for (const id of [...ids].sort()) {
  const src = id.startsWith("GTM-") ? `https://www.googletagmanager.com/gtm.js?id=${id}` : `https://www.googletagmanager.com/gtag/js?id=${id}`;
  try {
    const js = await (await fetch(src, { headers: { "user-agent": UA } })).text();
    evidence.containers[id] = id.startsWith("GTM-") ? parseGtm(js) : id.startsWith("AW-") ? parseGtagAds(js) : { loaded: true };
  } catch (e) { evidence.containers[id] = { error: String(e.message) }; }
}

// Summary: one row per tag/vendor with loaded / fired per phase.
const all = [...evidence.requestsHome, ...evidence.requestsForm];
const summary = {};
for (const r of all) {
  const key = r.vendor + (r.tagId ? ` ${r.tagId}` : r.adsAccount ? ` ${r.adsAccount}` : "");
  const s = (summary[key] ||= { vendor: r.vendor, id: r.tagId || r.adsAccount || "", loaded: false, fired: {} });
  if (r.kind === "script") s.loaded = true;
  else { const k = r.phase; const tag = r.label ? `label ${r.label}` : r.event || "hit"; (s.fired[k] ||= new Set()).add(tag); }
}
for (const s of Object.values(summary)) for (const k of Object.keys(s.fired)) s.fired[k] = [...s.fired[k]];
evidence.summary = Object.values(summary);
evidence.adsConversionHits = all.filter((r) => r.vendor === "Google Ads conversion").map(({ phase, adsAccount, label, event, url }) => ({ phase, adsAccount, label, event, url }));
writeFileSync(`${OUT}/evidence.json`, JSON.stringify(evidence, null, 2) + "\n");
console.log(`capture: ${OUT}/evidence.json (${all.length} classified requests, ${evidence.adsConversionHits.length} Google Ads conversion hits)`);
