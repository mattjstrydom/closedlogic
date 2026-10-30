// "Book a 20-minute call" button on the unlisted /v/ video pages (Matt, 30 Oct 2026). Records the click in Clarity as
// a custom event, tagged with the page slug, then lets the link open Cal.com in a new tab as normal. Kept as a file so
// the pages need no inline script (CSP). clarity.js defines the window.clarity queue first, so calls made before the
// Clarity tag has loaded are queued, not lost.
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-cta="book"]') : null;
    if (!a) return;
    try {
      var slug = a.getAttribute("data-v-slug") || location.pathname.split("/").pop().replace(/\.html$/, "");
      if (typeof window.clarity === "function") {
        window.clarity("set", "v_page", slug);
        window.clarity("event", "book_call_click");
      }
    } catch { /* never block the link */ }
  }, true);
})();
