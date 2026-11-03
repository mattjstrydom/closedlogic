# Changes: full site rewrite, 3 Nov 2026 (branch site-rewrite-nov-2026, not deployed)

Copy source: the rewrite doc (Claude Docs, "Closed Logic website rewrite, trust plan and offer pack"), with Matt's decisions of 3 Nov overriding it.

- **Offers (single source `app/offers.ts`):** free check, Signal Fix ($750, one defined defect, 30-day fix-at-no-charge guarantee), Ops Desk (pilot $1,250; $2,500/month for up to 10 hours, one active request, weekly updates, month to month, 30 days' notice), Pipeline Truth Audit ($1,500) and Fractional Measurement Lead ($5,000/month) for larger accounts.
- **Retired:** Signal Watch (and the Measurement Scorecard before it), both founding offers, the old three-material-issue refund.
- **New audit guarantee:** if the audit finds nothing that changes how Google Ads counts or bids, we refund the fee in full (14 days from delivering the report).
- **One audit credit rule:** continue to Fractional within 30 days of the audit report and the audit fee is credited against Fractional's first month. No credit toward other offers.
- **Pages:** `/` rebuilt; `/signal-fix`, `/pricing`, `/about`, `/contact`, `/method` rewritten; new `/ops-desk`, `/free-check`, `/access`; `/for-b2b-saas` is now `/fractional` (301); `/for-pe` removed (301 to `/`). Header nav: Signal Fix, Ops Desk, Method, Pricing, Guides, About.
- **Left off the site on purpose (code comments say where they go):** the example check (hero visual, "See an example check" link, home section "What a check looks like"), certification badges, Jennifer's LinkedIn link.
- **Checks:** `scripts/check-rendered.mjs` fails on `{{...}}` tokens and on bracketed placeholders such as `[X]` in visible text; `scripts/check-links.mjs` fails on broken internal links and fragments.
- **Existing `/v/` pages:** untouched (byte-identical to `public/v/`). Only addition: `public/v/fixoffer.js` and `scripts/v-template-check.html` (new pages only).

## Terms changes for legal review (app/terms/page.tsx, last updated 3 November 2026)

Numbering is now fixed (the PE gating is gone): 1 to 11, with 8 = Access and data (data processing terms in 8.6).
- 1.1, 1.2: scope lists the free check, Signal Fix, Ops Desk, audit and Fractional.
- 2.2: prices for every offer. 2.4: the single audit credit rule.
- 3.2: audit deliverables say "the findings, each with its evidence and the steps to reproduce it". 3.5: audit report. 3.6: audit guarantee and the test (evidence; effect (i) to (iv); separate cause; not counted; checking a finding within 7 days).
- Heading 4 and 4.1: audit refund, full fee within 14 days of delivering the report (14 days of a settled challenge if you challenge a finding).
- Heading 5, 5.3 (Signal Watch sentence removed), 5.6 Signal Fix (one defect, extra fixes quoted first, access removal confirmed in writing), 5.7 guarantee (free fix, not a refund), 5.8 Ops Desk pilot, 5.9 Ops Desk, 5.10 free check, 5.11 case studies as an optional request with written approval. Old Signal Watch (5.6) and founding offer (5.11) clauses removed.
- 8.2: access removal is confirmed in writing. 8.6(b): nature and purpose also covers the work in the written scope. 9.1: liability cap wording covers Signal Fix and the Ops Desk pilot. 11.2, 11.3: same, and Ops Desk notice replaces the Signal Watch reference.
- Spelling made US ("authorize", "publicize").
- To check: the Ops Desk pilot and plan terms (5.8, 5.9) are new drafts; the refund timing and the 3.6 test wording are proposed defaults.

# Changes: site update, 2 Nov 2026 (branch site-update-nov-2026, not deployed)

New offers (single source: `app/offers.ts`): free outside-in check, Signal Fix ($750, 30-day guarantee), Signal Watch ($750/month, weekly checks, 2 hours of fixes) replacing the Measurement Scorecard, audit narrowed to 10 core checks, Fractional adds 10 extended checks. New `/signal-fix` page, free-check form (`app/components/check-form.tsx`, Worker type `check`, Sequenzy tag `outside-in-check-request`), `/method` split into core and extended checks with the bidding-stage section, new /v/ template `scripts/v-template-check.html`, unpublished samples in `scripts/samples/`, and `scripts/check-rendered.mjs` (fails the build if a double-brace token reaches `out/`).

Existing `/v/` pages, their scripts and `_headers` rules are untouched (out/v/*.html byte-identical to public/v/*.html). New file only: `public/v/fixoffer.js`.

## Terms changes for legal review (app/terms/page.tsx; last updated 2 November 2026)

- Metadata and 1.2: scope lists the free outside-in check, Signal Fix, Signal Watch, audit, Fractional (Scorecard removed).
- 2.2: prices for all offers; founding Fractional rate kept ($4,000, first 2 clients); pointer to 5.11.
- 2.4 (was the audit credit): in full against the first month of Fractional; against Signal Watch, $750 applied to the first month's fee, the remaining $750 not carried forward; no Signal Fix credit except 5.11; founding offers and the audit credit don't combine, and a client gets at most one free first month of Signal Watch.
- 3.1: "20 checks" is now "10 core checks". 3.2 to 3.6 unchanged, including the material-issue tests. Note: test (b)(iii) refers to a lifecycle stage the client wants bid on; "Lifecycle stages" is now an extended check, not a core one.
- Clause 5 heading: Signal Fix, Signal Watch and Fractional Measurement Lead.
- 5.3: "doesn't apply to the Measurement Scorecard" is now Signal Watch.
- 5.6: Scorecard replaced by Signal Watch ($750/month, weekly checks, monthly note, 2 hours of fixes, no rollover, larger work quoted, not an alert service, no response-time promise). Cancellation mechanics carried over unchanged.
- 5.7: case-study wording now points to founding offers in 2.2 and 5.11.
- New 5.8 (Signal Fix scope and deliverables), 5.9 (30-day guarantee, remedy is a free fix, not a refund), 5.10 (no credit toward Signal Watch), 5.11 (first 5 Signal Fix clients get a free first month of Signal Watch for a written case study; founding offers, including the founding Fractional rate in 2.2, don't combine with each other or with the audit credit in 2.4; at most one free first month of Signal Watch), 5.12 (free outside-in check).
- 13.3: "Measurement Scorecard" is now Signal Watch.
- Unchanged: refund timing (4.1), material-issue tests and thresholds, 7.x refunds, liability, data processing. PE clauses still hidden by SHOW_PE (en dashes in them became "to").

Privacy (flag for review): new paragraph for the free outside-in check form; last updated 2 November 2026.

## Open items

- OG images regenerated (wordmark and headline only); alt text matches the image exactly.
- `/for-pe` is still built (hidden, noindex, not in the sitemap); left as is pending a separate brief apart from the "comparable" line and en dashes already removed.
- Founding offers are shown only on `/pricing` ("Founding clients" box); removed from home, `/for-b2b-saas` and `/signal-fix`.
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
