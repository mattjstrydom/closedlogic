// Booking buttons on the site pages (Matt, 2 Nov 2026: "add UTM tags and click tracking to the site's booking buttons").
// Two jobs, both in a capture-phase click listener on a[data-cta="book"], then the link opens Cal.com in a new tab as normal:
//  1. records one Clarity custom event, book_call_click, tagged site_page=<page slug> (data-cta-page);
//  2. first-touch attribution (Matt, Nov 2026): on landing, utm_source, utm_medium, utm_campaign, utm_content and ref are kept in
//     sessionStorage (key cl-touch, first touch of the session wins). Every cal.com link then carries them: utm_source,
//     utm_medium and utm_campaign are the visitor's own (so outbound tags and ?ref= are no longer overwritten by
//     utm_source=site), ref goes in the Cal.com "ref" field, and the site's own button label stays in utm_content with the
//     page slug in cta_page. A first-touch utm_content is kept as first_utm_content. Without a first touch the links keep
//     the site's tags (utm_source=site). Never blocks the link.
// Loaded from app/layout.tsx, which the /v/ pages don't use, so nothing counts twice. The window.clarity queue is defined
// in the layout's head script; Clarity itself loads from GTM, after consent.
(function () {
  var KEY = "cl-touch";
  var PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"];
  var clean = function (v) { return typeof v === "string" && /^[\w.~%+: -]{1,100}$/.test(v) ? v : ""; };

  var touch = null;
  try { touch = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (e) { /* storage blocked */ }
  if (!touch) {
    try {
      var q = new URLSearchParams(location.search), t = {}, any = false;
      PARAMS.forEach(function (p) { var v = clean(q.get(p)); if (v) { t[p] = v; any = true; } });
      if (any) { touch = t; try { sessionStorage.setItem(KEY, JSON.stringify(t)); } catch (e) { /* storage blocked */ } }
    } catch (e) { /* no URL API */ }
  }

  function tag(a) {
    try {
      var u = new URL(a.href);
      if (u.hostname !== "cal.com") return;
      var slug = a.getAttribute("data-cta-page") || location.pathname.replace(/^\/+|\/+$/g, "") || "home";
      u.searchParams.set("cta_page", slug);
      if (touch) {
        ["utm_source", "utm_medium", "utm_campaign"].forEach(function (p) { if (touch[p]) u.searchParams.set(p, touch[p]); });
        if (touch.utm_content) u.searchParams.set("first_utm_content", touch.utm_content);
        if (touch.ref) u.searchParams.set("ref", touch.ref);
      }
      a.href = u.toString();
    } catch (e) { /* leave the link as it is */ }
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-cta="book"]') : null;
    if (!a) return;
    tag(a);
    try {
      var slug = a.getAttribute("data-cta-page") || location.pathname.replace(/^\/+|\/+$/g, "") || "home";
      if (typeof window.clarity === "function") {
        window.clarity("set", "site_page", slug);
        window.clarity("event", "book_call_click");
      }
    } catch (e2) { /* never block the link */ }
  }, true);

  // Also tag on load, so the link shows its final address on hover and when opened in a new tab by middle click.
  var tagAll = function () { document.querySelectorAll('a[href^="https://cal.com/"]').forEach(tag); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tagAll); else tagAll();
})();
