// Microsoft Clarity (project yuwphgh9zx) for the unlisted /v/ video pages only. Matt, 29 Oct 2026: load it straight
// away here, without waiting for cookie consent, to see engagement on these pages. The main site still loads Clarity
// through GTM, gated on consent. Standard Clarity snippet, kept as a file so the pages need no inline script.
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "yuwphgh9zx");
