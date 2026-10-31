// Evidence report on the /v/ pages (v-evidence-pilot, 31 Oct 2026). No inline script (CSP), nothing third-party.
// - Copy button: copies the fix snippet exactly as shown (textContent of the <code> block) and records the Clarity
//   custom event fix_copy_click.
// - Reply link (a[data-cta="reply"], a mailto with a "fix" subject): records reply_fix_intent, then opens the mail app.
// - Book link (a[data-cta="book"], if a page has one): records book_call_click, as cta.js does on the other pages.
// clarity.js defines the window.clarity queue first, so calls made before Clarity has loaded are queued, not lost.
(function () {
  var slug = location.pathname.split("/").pop().replace(/\.html$/, "");
  function track(name) {
    try {
      if (typeof window.clarity === "function") {
        window.clarity("set", "v_page", slug);
        window.clarity("event", name);
      }
    } catch (err) { /* never block the click */ }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target : null;
    if (!t) return;
    var btn = t.closest("button[data-copy]");
    if (btn) {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      if (!src) return;
      var text = src.textContent;
      var done = function (ok) {
        btn.textContent = ok ? "Copied" : "Select and copy";
        setTimeout(function () { btn.textContent = "Copy"; }, 2000);
      };
      track("fix_copy_click");
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
      else done(fallbackCopy(text));
      return;
    }
    if (t.closest('a[data-cta="reply"]')) track("reply_fix_intent");
    else if (t.closest('a[data-cta="book"]')) track("book_call_click");
  }, true);
})();
