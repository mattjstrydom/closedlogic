// Fix-offer link click on the new check pages (a[data-cta="fixoffer"]): records the Clarity custom event fix_offer_click,
// tagged with the page slug, then lets the link open as normal. Reply "fix" and the Book link are recorded by report.js.
// New file: the existing /v/ pages don't load it.
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-cta="fixoffer"]') : null;
    if (!a) return;
    try {
      if (typeof window.clarity === "function") {
        window.clarity("set", "v_page", location.pathname.split("/").pop().replace(/\.html$/, ""));
        window.clarity("event", "fix_offer_click");
      }
    } catch (err) { /* never block the link */ }
  }, true);
})();
