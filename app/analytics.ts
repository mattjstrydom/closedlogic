// GA4 events go onto the Tag Manager data layer. The GA4 tag only fires after the visitor accepts cookies (consent
// defaults are set in app/layout.tsx), so pushing an event here sends nothing on its own.
export function track(event: string, params: Record<string, string | number> = {}) {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...params });
  } catch {
    /* analytics must never break the page */
  }
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
