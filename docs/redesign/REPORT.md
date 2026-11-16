# Redesign report: "Bright and crisp"

Deployed to production from `main` on 16 Nov 2026 (commit `8f53626`). No PR, no branch.

**Rollback point:** `b8f4a73` (`git revert 7fc6a86..8f53626`, or reset `main` to `b8f4a73` and force-push, then let Workers Builds deploy).

## Stack and approach
- Next.js 16 static export, React 19, Tailwind 4, Cloudflare Workers static assets. No new dependencies.
- Tokens live once in `:root` in `app/globals.css`. The old Tailwind utility names (`text-ink`, `bg-band`, `border-rule`, type scale) now point at those tokens, so inner pages restyled without markup changes.
- Inter (variable, self-hosted, preloaded) and JetBrains Mono (unchanged). Poppins and Fira Sans removed. Light theme only; one brand red, used as a fill.
- New components: navbar with accessible mobile menu (`aria-expanded`, focus trap, Esc), four-column footer, eyebrow hero, dark closing block, inline hero check form, `cl.tsx` (SignalReport, FeatureCard, PricingTier, Evidence, TrustStrip, StatusPill).
- Removed: the neo-brutalist styles, `comparison-grid.tsx`, `code-block.tsx`, the old fonts.

## Pages changed
Rebuilt: `/`. Restyled with content, URLs, meta, canonicals, OG and JSON-LD unchanged: `/signal-fix`, `/ops-desk`, `/pricing`, `/method`, `/about`, `/access`, `/contact`, `/free-check`, `/fractional`, `/guides`, six guide articles, `/privacy`, `/terms`, 404. Share images (OG and X) re-rendered in the new style. The nine `/v/` pages are byte-identical (`diff -rq public/v out/v`).

## Tracking, before and after
Unchanged and re-tested on production: GTM `GTM-M7JTCXDW` loads; Consent Mode default is denied; banner shows for a new visitor; Accept stores `cl-consent=granted` and fires `consent_granted`; Decline fires `consent_denied`; `cta.js` fires Clarity `book_call_click` (with `site_page`) from `a[data-cta="book"]` and the link goes to `https://cal.com/closedlogic/20min-fit` with UTMs, in a new tab. Book links appear on the same pages as before. Forms: home hero, home closing form, `/free-check` and `/contact` post the same body (`email`, `website`, `note`, `type:"check"`, `source`, honeypot `company_fax`) and fire `check_request_submit`; the hero showed the confirmation on production. Head parity (title, description, robots, canonical, OG, Twitter, JSON-LD) is identical on 21 pages. Full inventory: `tracking-inventory.md`.
Note: production now holds a few test submissions from `redesign-test@example.com` and `redesign-test2@example.com`.

## Lighthouse (mobile, home)
| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Before, local build | 80 to 81 | 100 | 100 | 69 |
| After, local build | 78 to 79 | 100 | 96 | 69 |
| After, live | 84 | 100 | 81 | 100 |

Accessibility is 100 on `/`, `/pricing`, `/signal-fix`, `/free-check`, `/contact`, `/about`. Local performance is 1 to 2 points under baseline, inside run-to-run spread (FCP 2.0 s vs 1.4 s: one 47 KB stylesheet and a 73 KB Inter file). Local best practices 96 is a 404 on a Next prefetch URL in my static test server (the old `/pricing` shows the same 96). Live best practices 81 is a Cloudflare challenge frame and a storage deprecation warning, not site code. I have no pre-deploy live score to compare against. Keyboard: mobile menu opens, traps focus, closes on Esc and returns focus; 40 tab stops on the home page all show a focus ring.

## Screenshots
`before/` and `after/` hold every page at 1440 and 390. The mockup and its screenshot are in this folder.

## New copy
See `new-copy-for-review.md`.

## Not done, and open flags
- Side-by-side homepage check is by eye against the mockup screenshot, not a pixel diff.
- The team photos on the home page were confirmed to load by script; I did not re-check them in a real browser.
- The Fractional price remains on `/pricing` and `/fractional` (inner content unchanged).
- The street address stays in the footer and About; LinkedIn remains in JSON-LD `sameAs`.
- `app/icon.svg` still uses `#0A0A0A` for the favicon tile; `scripts/v-template*.html` still reference Poppins (not deployed).
- Intermediate commits were not individually build-tested; the final state was.
