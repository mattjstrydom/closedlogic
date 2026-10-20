# Changes: repositioning, 20 Oct 2026

The site was rewritten in place from a fixed-price HubSpot to Google Ads check and fix (with agency and teardown lead
magnets) to an independent measurement practice with two audiences: B2B SaaS (fractional measurement leadership,
$1,500 audit as the door) and PE funds (portfolio measurement, partner-led). Copy source:
`C:\dev\Tidypage\research\closedlogic-website-copy.md`. Nothing was deployed. The domain, Cloudflare project and
deploy target are unchanged.

## Routes

| Route | Status |
|---|---|
| `/`, `/for-b2b-saas`, `/for-pe`, `/method`, `/pricing`, `/about`, `/contact` | New or rewritten |
| `/guides`, `/guides/[slug]` | Kept. Index intro and the end-of-guide call to action reframed. Guide bodies untouched |
| `/privacy`, `/terms` | Kept and updated for the new services |
| `/agencies`, `/agencies/teardown`, `/partners` | 301 to `/for-pe` |
| `/teardown` | 301 to `/for-b2b-saas` |
| `/sample-report`, `/tools/stage-check` | 301 to `/method` |
| `/book`, `/book-pe`, `/book-partner` | 302 to Cal.com |

The stage check was redirected rather than reframed: it was tied to the teardown and to a form type that no longer
exists. `out/_redirects` is written by `scripts/cf-postbuild.mjs`.

## Copy deviations

- **No downloadable checklist or sample scorecard exists.** "Download the 20-point checklist" became a link to the 20
  checks on `/method`. "See a sample portfolio scorecard" links to a sample table on `/for-pe` (figures are invented
  and labelled "Illustrative, not a client result"). The Method page's closing call to action was reworded to "Want the
  checks run on your accounts?" because its "Download the checklist" button had nothing to download.
- **PE page call to action** is "Book a portfolio measurement call" (as in the copy deck), not "Book a 20-minute
  pipeline review". Every other page uses the 20-minute review.
- The 20 checks are listed by name only, as in the deck. No per-check descriptions were invented.
- "Sometimes" in the comparison table became "Depends", and the table compares roles, not named companies.
- The footer has no "Refunds" link (no refunds page exists) and adds "Contact".
- Footer trademark line uses US spelling ("authorized").

## Placeholders and open items

- **Cal.com:** no PE event exists, so `pe` in `app/booking.json` falls back to the direct event. `partner` still points at
  the old agency event (`20-minute-fit-agency`), whose name and description say agency. Create `closedlogic/<pe event>`
  and a partner event, then edit `app/booking.json`.
- **Form:** `FORM_DRY_RUN` in `.dev.vars` is hidden from the Worker because `wrangler.jsonc` declares `secrets.required`
  with only `SEQUENZY_API_KEY`. Local dry runs need `FORM_DRY_RUN` added to that list temporarily (see README).
- **Rate limiting** on `POST /api/request` is still not in place (README, "Before the domain goes public").
- **Guide bodies** still link to `/sample-report` and one to `/tools/stage-check`. Both redirect to `/method`, but the
  stage check link text ("two-minute stage check") now lands on a page that does not offer one. Edit
  `content/guides/hubspot-google-ads-conversion-tracking.md` line 20 when guide edits are in scope.
- **Share images** were rendered with `scripts/make-og.mjs`; the logo in them is `public/closed-logic-logo.svg`.

## Legal review needed (privacy and terms)

Privacy: service descriptions, data categories (contact form fields, Google Ads, HubSpot or other CRM, analytics and
reporting access), retention (contact requests deleted within 24 months), and the provider list. The stage check
section was removed. MXroute, Google Workspace, Microsoft Clarity and the South Africa transfer text were kept as is.

Terms: clauses 1 to 7 and 10 to 13 were rewritten from the copy deck's prices and scope. The data processing clause 9.6
is kept with its service references updated. These are new commitments that need a lawyer's read:

- 2.5: payment timing is "in your written scope" (the old 50% and 50% split was removed because the deck gives none).
- 4 and 5.4: "if we don't find three material issues you don't continue" and "a 30-day escape on the first
  engagement" are the deck's words. What a client owes in each case is not defined.
- 5.3: month to month after the 3-month term with 30 days' written notice (carried over from the old monthly plan).
- 7.1: refunds "as set out in your written scope" (the old fix cap and refund were removed).
- 8.2: unpaid work is invoiced if access is missing for 30 days.
- 9.1 and 9.3: read-only access where possible, and working from client-supplied exports.
- 10.5: the 12-month non-solicit of a partner's clients was kept as it was.
- 11.1: liability cap by engagement type.

`privacyLastUpdated` and `termsLastUpdated` are 20 October 2026.

## Removed

Old routes (`app/agencies`, `app/teardown`, `app/sample-report`, `app/partners`, `app/tools`), old-offer components
(`a1-lead-to-bid`, `a2-secondary-to-primary`, `a3-change-log`, `c1-report`, `c3-finding`, `c4-count`, `hero-tabs`,
`mocks`, `trust`, `PipelineFlow`, `stage-check`, `checks-preview`), `app/motion.css`, `app/motion-script.ts`, the old
share images, and `public/partners`, `public/tools`, `public/images`. Dead styles in `app/globals.css` were pruned
(old-offer grids, the change log row, the price block, callout numerals, the teardown tags and status dots).

## Verified

In the working copy: `npm run build` (placeholder check, Turbopack build, postbuild) passes with every route static;
`tsc --noEmit` and `eslint .` are clean; a local wrangler run returns 200 for the new routes, 301 for the old ones,
302 for the booking routes and 404 for an unknown path; the sitemap lists only the new pages and the live guides;
the form dry run succeeds for `b2b`, `pe` and `partner` (with `FORM_DRY_RUN` temporarily declared in `wrangler.jsonc`)
and invalid input returns 422. No horizontal overflow at 375, 768 and 1440 px (checked on a copy before the old files
were deleted). Also removed: the generated `public/_img/images` files, and `images.manifest.json` is now empty.
