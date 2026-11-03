import booking from "./booking.json";

// Site booking links (Matt, 2 Nov 2026: UTM tags and click tracking on the site's booking buttons). Every button goes
// straight to the Cal.com event in app/booking.json, tagged utm_source=site, utm_content=book-cta and
// utm_campaign=<page slug>, so Cal.com shows which page the booking came from. /book stays as a tagged redirect
// (utm_campaign=book, scripts/cf-postbuild.mjs) for links shared outside the site. public/cta.js records the click.
export const UTM = { source: "site", content: "book-cta" } as const;

export function bookHref(campaign: string): string {
  const base = booking.direct;
  return `${base}${base.includes("?") ? "&" : "?"}utm_source=${UTM.source}&utm_content=${UTM.content}&utm_campaign=${encodeURIComponent(campaign)}`;
}

/** Campaign slug for a page path: "/" is home, a guide is its own slug, anything else is the route ("fractional"). */
export function campaignFor(path: string): string {
  const p = path.replace(/^\/+|\/+$/g, "");
  if (!p) return "home";
  return p.startsWith("guides/") ? p.slice("guides/".length) : p;
}
