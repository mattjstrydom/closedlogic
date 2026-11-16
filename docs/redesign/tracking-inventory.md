# Tracking inventory and stack findings (before the redesign)

Recorded 16 Nov 2026, from the repository at `b8f4a73` (production at the time). Every item below must work the same after the redesign.

## Stack (verified)

- **Framework:** Next.js 16.3.8 (App Router), React 19.2.8, TypeScript. Static export (`output: "export"`), so every page is a file in `out/`.
- **Styling:** Tailwind CSS 4 (`@import "tailwindcss"`, tokens in `@theme` in `app/globals.css`) plus a `@layer components` block of hand-written classes (`.btn`, `.card`, `.band`, `.faq`, ...). Utility classes in the JSX use the token names (`text-ink`, `bg-band`, `border-rule`, `text-title-xl`, ...).
- **Fonts:** self-hosted woff2 in `app/fonts/` through `next/font/local` (Poppins 400 to 700, Fira Sans 400 to 600, JetBrains Mono 400 to 500). They were self-hosted on 30 Oct 2026 after a Google Fonts fetch broke a Cloudflare build, so Inter is self-hosted too (`app/fonts/inter-latin-var.woff2`).
- **Package manager and scripts:** npm; `npm run build` runs `scripts/check-placeholders.mjs`, `next build`, then `scripts/cf-postbuild.mjs` (writes `out/_headers` and `out/_redirects`), `scripts/check-rendered.mjs` and `scripts/check-links.mjs`. `npm run lint` is ESLint. There are no unit tests.
- **Hosting and deploy:** Cloudflare Workers with static assets (`wrangler.jsonc`, `out/`), plus `worker/index.ts` for `POST /api/request`. Cloudflare Workers Builds deploys on every push to GitHub `main`.
- **Rollback point:** commit `b8f4a73` (the last production commit before this work).

## Routes (21 built pages)

`/`, `/about`, `/access`, `/contact`, `/fractional`, `/free-check`, `/guides`, six guides under `/guides/<slug>` (`bid-on-pipeline-not-form-fills`, `google-ads-primary-vs-secondary-conversions`, `google-data-manager-api-change-hubspot`, `hubspot-gclid-missing-click-id`, `hubspot-google-ads-conversion-tracking`, `hubspot-google-ads-offline-conversions`), `/method`, `/ops-desk`, `/pricing`, `/privacy`, `/signal-fix`, `/terms`, plus the 404 page. Redirects live in `scripts/cf-postbuild.mjs` (`/for-b2b-saas`, `/for-pe`, `/agencies`, `/partners`, `/teardown`, `/book` and others). The nine unlisted `/v/*.html` pages are static HTML outside the Next layout and are not touched.

## Scripts and tags

| What | Where it loads | Notes |
|---|---|---|
| Consent defaults for Google (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` all `denied`, updated to `granted` from localStorage) | inline `<Script id="gtm" strategy="beforeInteractive">` in `app/layout.tsx` | Key: `cl-consent` (`app/consent-key.ts`). |
| Google Tag Manager `GTM-M7JTCXDW` | same inline script; the `gtm.js` loader is added after the window `load` event and an idle callback (max 2 s); `<noscript>` iframe in the body | GA4 and Microsoft Clarity are tags inside this container. No gtag, Google Ads or HubSpot tracking code is loaded by the site itself. |
| Microsoft Clarity queue and consent | same inline script (`window.clarity` stub, `consentv2` from the saved choice); Clarity itself loads from GTM | `/v/` pages load Clarity directly via `/v/clarity.js` (not touched). |
| Booking-click recorder | `<Script id="cta" src="/cta.js" strategy="afterInteractive">` in `app/layout.tsx`, `public/cta.js` | Capture-phase listener on `a[data-cta="book"]`; sets Clarity tag `site_page` from `data-cta-page` and fires `book_call_click`. |
| Mobile menu | inline `<Script id="menu">` in `app/layout.tsx` | Closes `#site-menu` (a popover) when a link inside it is clicked. |
| Cookie banner | `app/components/consent-banner.tsx` (`aria-label="Cookie consent"`), "Cookie settings" button in the footer (`app/components/cookie-settings.tsx`) | Pushes `consent` default/update and the events `consent_granted` / `consent_denied` to `dataLayer`, and calls `clarity("consentv2", ...)`. |

## Forms

One component, `app/components/check-form.tsx`, used in four places: homepage hero (`idPrefix="hero"`), homepage final CTA, `/free-check`, `/contact` (`withNote`).

- **Endpoint:** `POST /api/request` (`worker/index.ts`), JSON body `{ email, website, note?, type: "check", source, company_fax }`.
- **Field names and ids:** `name="email"`, `name="website"`, `name="note"` (contact only); ids `<idPrefix>-email`, `<idPrefix>-website`, `<idPrefix>-note`, error ids `<idPrefix>-<field>-err`. Honeypot input `name="company_fax"` in an off-screen `aria-hidden` wrapper.
- **Hidden fields:** none. The only attribution capture is `source`, read from the `?src=` query parameter by `readSource()` in `app/analytics.ts`. There is no gclid or UTM capture on this site's own forms (HubSpot is not used here).
- **Success and error:** success replaces the form with `<div role="status">Thanks. We'll reply within 1 business day.</div>`; 422 shows field errors; any other failure shows "That didn't send..." with the email address. Success pushes `check_request_submit` `{ source, page_path }` to `dataLayer`.
- **Server side:** same-origin check, rate limit (5 per IP per minute), honeypot, Sequenzy subscriber (`outside-in-check-request`) plus a notification email to `hello@closedlogic.com`.

## Selectors and attributes that tracking depends on (keep exactly)

- `a[data-cta="book"]` and `data-cta-page="<slug>"` on every booking link (`app/components/cta.tsx`, home, contact, ops-desk, and guide Cal.com links rewritten in `app/guides/content.ts`).
- Form field `name` and `id` attributes above; the `role="status"` confirmation element.
- `id="site-menu"` on the mobile menu popover and `popoverTarget="site-menu"` on its toggle.
- `aria-label="Cookie consent"` on the banner and the "Cookie settings" button.
- Section ids used by in-page links and the link check (`#check`, `#checks`, `#extended`, `#clause-8`, `#bidding-stage`, `#first-30-days`, `#differ`, and each page's own section ids). Kept as they are.
- Cal.com link: `https://cal.com/closedlogic/20min-fit` with `utm_source=site&utm_content=book-cta&utm_campaign=<page slug>` (`app/booking.ts`, `app/booking.json`).
- GTM trigger conditions live inside the container and cannot be read from the repository. The events the site pushes are `check_request_submit`, `consent_granted`, `consent_denied` and the `gtm.js` start event; nothing in the redesign changes how they are pushed.

## Baselines taken before any change

- Screenshots of every page at 1440 px and 390 px: `docs/redesign/before/` (JPEG).
- Rendered head data (title, description, robots, Open Graph, Twitter, canonical, JSON-LD) for every page, saved outside the repo and compared again at the end.
- `out/v/*.html` byte-identical to `public/v/*.html` (nine pages).
- Lighthouse, homepage, mobile, local static build (a local build is `noindex`, which lowers the SEO score; the same build type is used before and after): performance 81, accessibility 100, best practices 100, SEO 69; LCP 5.0 s, CLS 0, TBT 50 ms, FCP 1.5 s.
