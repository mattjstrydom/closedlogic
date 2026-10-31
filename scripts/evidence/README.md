# Evidence scripts for the /v/ pages

These scripts build the evidence section of an unlisted /v/ video page:

- the tags table,
- the request that proves the main finding,
- the copy-paste fix.

They're committed but never deployed: nothing under `scripts/` ships in `out/`. Run them from a dev box, never from CI.

| Script | What it does |
| --- | --- |
| `capture.mjs` | Visits the prospect's public site in a fresh browser, records which tags load and fire, screenshots the form and reads the public GTM and gtag configs. It never submits the form. |
| `render.mjs` | Fills the `<!-- ev:tags -->`, `<!-- ev:proof -->` and `<!-- ev:fix -->` blocks of `public/v/<slug>.html` from `evidence.json`. The words around the blocks are written by hand. |
| `fixes/*.mjs` | One copy-paste fix template per form tool. Each one includes the snippet, the GTM setup, a 2-minute test and the docs it relies on. `render.mjs` refuses to render a stub (`ready: false`). |

## Blocked network is the standard

`capture.mjs` blocks every tracking hit by default. Each hit is recorded first, then aborted, so it never leaves the browser. Our visits never show up in the prospect's Google Ads, GA4, Meta, LinkedIn, HubSpot or other reports.

- **Hits are blocked; tag libraries still load.** `gtm.js`, `gtag/js`, `fbevents.js`, `insight.min.js` and the HubSpot scripts load normally, because the evidence is what they *try* to send.
- **Blocked hits:**
  - Google: GA4 collect, Ads conversion, remarketing, `ccm`, 1p-conversion and user-list, `rmkt/collect`, `ga-audiences`, Floodlight and doubleclick
  - Ad and social platforms: Meta, LinkedIn, Bing, X, Pinterest, TikTok, Reddit, Quora
  - HubSpot: `__ptq`/`__ptc`, collected-forms, form submissions
  - Product analytics, session replay and error tracking: Segment, Heap, Hotjar, Mixpanel, Amplitude, GrowSurf, and any `ingest` endpoint
- **Blocked outright, scripts included:** visitor-identification tools (RB2B, Vector, 6sense, Clearbit, Koala, Warmly), because loading the script is itself the hit.
- **Where the list came from:** it's the union of the old `capture.mjs` list and the `TRACK` list in `outbound/video-rebuild/fresh/visit.py`, diffed on 31 Oct 2026. If you add an endpoint to one, add it to the other.
- **`--allow-tracking` turns blocking off, and real hits then reach the prospect's accounts.** Only use it with Matt's explicit approval for that prospect. The run prints a warning, and `evidence.json` records `trackingBlocked: false`.
- **`--simulate`** (HubSpot only) blocks *every* request before it posts HubSpot's documented submit message. Nothing leaves the browser.

Other ad-hoc scripts that visit a prospect's site (Playwright, Puppeteer or Python) must use the same block list. Check the run's blocked count before trusting a capture.

## Privacy

- `evidence.json` keeps cookie *names* only, never their values.
- It keeps only an allow-list of URL parameters: tag IDs, conversion labels, event names and consent state flags (`gcs`, `gcd`, `npa`, `dma`).
- Before publishing, check every image and code block on the page for `auid`, `_gcl_*`, `gclid`, client, session or consent IDs, and personal data.

## Run

```sh
PLAYWRIGHT=/workspace/shot/node_modules/playwright/index.js \
node scripts/evidence/capture.mjs --url https://www.example.com --form /demo --slug example-xxxx \
  --out ../outbound/video-rebuild/evidence/example-xxxx [--simulate]
node scripts/evidence/render.mjs --evidence ../outbound/video-rebuild/evidence/example-xxxx/evidence.json \
  --page public/v/example-xxxx.html
```

Then run `npx eslint . && npx tsc --noEmit && npm run build`, and push to the preview branch only.

## Where the capture runs from

The box browses from South Africa. Consent banners and Google's consent defaults can change by region. For a UK prospect, either say on the page where the check ran from, or repeat it from a UK connection before quoting consent behaviour.
