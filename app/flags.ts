// PE switch (Matt, 26 Oct 2026: "remove PE everywhere, but keep the code so it can come back").
// false hides every PE offer, price, clause, form option and CTA across the site. Set it to true to bring them all back:
// /pricing rows and meta, terms clause 6 (and the numbering after it), the contact form's PE option and portfolio size,
// privacy wording, the method's quarterly roll-up and the guide portfolio CTA. /for-pe always builds, but stays unlinked,
// noindex and out of the sitemap until those are restored by hand (see the dev report).
// Kept in its own tiny module so client components (the contact form) can read it without bundling site.config.
export const SHOW_PE = false;
