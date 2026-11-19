// GA4 events go onto the Tag Manager data layer. The GA4 tag only fires after the visitor accepts cookies (consent
// defaults are set in app/layout.tsx), so pushing an event here sends nothing on its own.
export function track(event: string, params: Record<string, string | number> = {}) {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...params });
  } catch {
    /* analytics must never break the page */
  }
}

const TOUCH_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"] as const;
const TOUCH_RE = /^[\w.~%+: -]{1,100}$/;

/** First-touch attribution for the form: the values public/cta.js stored in sessionStorage (cl-touch), else this page's own URL params. Empty values are left out. */
export function readTouch(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    let stored: Record<string, string> = {};
    try { stored = JSON.parse(sessionStorage.getItem("cl-touch") || "{}") || {}; } catch { /* storage blocked */ }
    const q = new URLSearchParams(window.location.search);
    for (const k of TOUCH_KEYS) {
      const v = stored[k] || q.get(k) || "";
      if (TOUCH_RE.test(v)) out[k] = v;
    }
    out.page_path = window.location.pathname.slice(0, 200);
  } catch { /* analytics must never break the form */ }
  return out;
}

/** Where the visitor came from: the ?src= value (letters, numbers, dot, dash, underscore, up to 40 characters), else "". */
export function readSource(): string {
  try {
    const s = new URLSearchParams(window.location.search).get("src") ?? "";
    return /^[\w.-]{1,40}$/.test(s) ? s : "";
  } catch {
    return "";
  }
}
