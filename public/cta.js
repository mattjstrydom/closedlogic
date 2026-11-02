// Booking buttons on the site pages (Matt, 2 Nov 2026: "add UTM tags and click tracking to the site's booking buttons").
// Same mechanism as public/v/cta.js on the /v/ pages: a capture-phase listener on a[data-cta="book"] records one
// Clarity custom event, book_call_click, tagged site_page=<page slug> (data-cta-page), then lets the link open Cal.com
// in a new tab as normal. Loaded from app/layout.tsx, which the /v/ pages don't use, so nothing counts twice. The
// window.clarity queue is defined in the layout's head script; Clarity itself loads from GTM, after consent.
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-cta="book"]') : null;
    if (!a) return;
    try {
      var slug = a.getAttribute("data-cta-page") || location.pathname.replace(/^\/+|\/+$/g, "") || "home";
      if (typeof window.clarity === "function") {
        window.clarity("set", "site_page", slug);
        window.clarity("event", "book_call_click");
      }
    } catch { /* never block the link */ }
  }, true);
})();
