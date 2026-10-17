// Site facts and every open placeholder. scripts/check-placeholders.mjs fails the
// production build while any double-brace token is left in app/.
import booking from "./booking.json";

export type CaseStudy = { title: string; body: string; attribution: string };

export const site = {
  // Brand, domain, email and legal lines: the single source for copy, metadata, JSON-LD, terms, privacy, icons, the
  // generated headers and the form Worker (worker/index.ts). A rename is a change here plus re-rendering
  // Nova's artwork (wordmark, icons, share images), whose text is outlined or baked in (see README, "Renaming").
  // Renamed from the old brand to Closed Logic (Matt, 9 Oct 2026). The old domain's 301 plan is in the dev report.
  brand: "Closed Logic",
  domain: "closedlogic.com", // apex; redirects to url (a Cloudflare redirect rule, see README)
  url: "https://www.closedlogic.com",
  // scripts/check-placeholders.mjs blocks the production build while emailLive is false, so the site never goes live
  // showing an address that bounces.
  email: "hello@closedlogic.com",
  emailLive: true, // Matt confirmed hello@closedlogic.com receives mail (9 Oct 2026)
  // Where the form Worker sends new-lead notifications.
  notifyTo: "hello@closedlogic.com", // switched from the old inbox (Matt, 9 Oct 2026)
  legalName: "Reubika LLC",
  legalEntity: "Reubika LLC, a New Mexico limited liability company", // Terms 1.1
  // Footer, C2, FAQ and privacy: "Closed Logic is a trading name of Reubika LLC, a New Mexico limited liability company"
  get legalLine() {
    return `${this.brand} is a trading name of ${this.legalEntity}`;
  },
  linkedin: "https://www.linkedin.com/in/mattstrydom",
  // Booking links. The two Cal.com URLs live in app/booking.json (one place, also read by scripts/cf-postbuild.mjs).
  // Direct buttons link to bookPath, a redirect to the direct URL written to out/_redirects at build time, so the
  // homepage never shows a Cal.com address. Agency buttons link straight to the agency URL.
  bookPath: "/book",
  directBookingUrl: booking.direct,
  agencyBookingUrl: booking.agency,
  // Only the production build is indexable: the Cloudflare Workers Builds build of main, or any build with
  // SITE_INDEXABLE=1. VERCEL_ENV keeps a Vercel production build working.
  indexable:
    process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "1" || process.env.WORKERS_CI_BRANCH === "main",

  replyTime: "Within one business day",
  // Terms clause 12 (Reubika LLC is a New Mexico LLC), text from matt-decisions-drafts.md section 5.
  governingLaw: [
    "These terms, and any dispute arising from them, are governed by the laws of the State of New Mexico, USA, without regard to its conflict-of-law rules.",
    "Before starting legal proceedings, each of us will try in good faith to settle the dispute by email for 30 days.",
    "If the dispute isn't settled, the state and federal courts located in New Mexico have exclusive jurisdiction, and each of us submits to it.",
    "Nothing in this clause stops either of us from asking any court for urgent interim relief.",
  ],
  // Set both to the publish date at deploy, for example "12 October 2026".
  privacyLastUpdated: "17 October 2026",
  termsLastUpdated: "9 October 2026",

  c3Label: "Example data, fictional account",
  caseStudy: null as CaseStudy | null,
};
