// Response headers for every page and file. The site is a static export served by Cloudflare Workers static assets,
// which ignores next.config.ts headers, so scripts/cf-postbuild.mjs writes these into out/_headers after each build.
// worker/index.ts sends its own, stricter set on /api/request.

// Cloudflare Web Analytics (Matt, 9 Oct 2026: keep it on) loads static.cloudflareinsights.com/beacon.min.js and reports to
// the site's own /cdn-cgi/rum ('self') and cloudflareinsights.com; Cloudflare injects the script automatically.
// Microsoft Clarity (loaded from GTM, Matt 12 Oct 2026) needs https://*.clarity.ms and https://c.bing.com, per Microsoft's
// CSP guide (learn.microsoft.com/clarity/setup-and-installation/clarity-csp), on script-src, connect-src and img-src.
// Google hosts for GA4 through GTM only (Matt, 8 Oct 2026: no other tags), from Google's tag CSP guide
// (https://developers.google.com/tag-platform/security/guides/csp, "Google Analytics" with Ads-linked features, checked
// October 2026). If Google Ads conversion or remarketing tags are ever added in GTM, add https://*.googleadservices.com and
// https://ad.doubleclick.net to script-src/img-src/connect-src and https://td.doubleclick.net to frame-src first.
// Country Google domains (www.google.co.za and so on) cannot be wildcarded in CSP and are not listed.
const G =
  "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com";

// 'unsafe-inline' for scripts is deliberate: the pages are static files, so there is no per-request nonce. No 'unsafe-eval'.
export const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://static.cloudflareinsights.com https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${G} https://*.clarity.ms https://c.bing.com`,
  `connect-src 'self' https://cloudflareinsights.com ${G} https://*.clarity.ms https://c.bing.com`,
  "font-src 'self'",
  "frame-src https://*.googletagmanager.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Headers for every page and file. Non-production builds add X-Robots-Tag: noindex. */
/** @param {boolean} indexable @returns {[string, string][]} */
export function securityHeaders(indexable) {
  return [
    ["Content-Security-Policy", csp],
    ["Strict-Transport-Security", "max-age=63072000; includeSubDomains"],
    ["X-Content-Type-Options", "nosniff"],
    ["Referrer-Policy", "strict-origin-when-cross-origin"],
    ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()"],
    ["X-Frame-Options", "DENY"],
    // No Cross-Origin-Opener-Policy: Tag Assistant (GTM preview) opens this site from tagassistant.google.com and talks to
    // it through window.opener, which COOP: same-origin severs ("Couldn't connect"). Revisit once GTM preview isn't needed.
    ...(indexable ? [] : [["X-Robots-Tag", "noindex, nofollow"]]),
  ];
}
