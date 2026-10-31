// Copy-paste fix templates for the /v/ evidence report, one per form tool. scripts/evidence/render.mjs picks the
// template for the tool that capture.mjs detected. Only templates with ready: true are ever rendered on a page;
// the stubs below throw at render time, so an unfinished fix can't reach a live page.
import hubspot from "./hubspot.mjs";

const stub = (tool, docs) => ({
  tool,
  ready: false,
  docs,
  // TODO: write and test this template on a public page that uses the tool before rendering it anywhere.
  build() { throw new Error(`fix template for ${tool} is a stub (ready: false); finish it before rendering`); },
});

export const FIXES = {
  hubspot, // HubSpot legacy (v2) embed + RevenueHero/ScheduleHero booking: done
  // TODO Webflow native forms: listen for the form's success state (Webflow has no public submit event).
  // TODO find and cite Webflow's docs for the form success state before finishing this template.
  webflow: stub("Webflow forms", ""),
  // TODO Typeform embeds: onSubmit callback of the embed SDK. Docs: https://www.typeform.com/developers/embed/callbacks/
  typeform: stub("Typeform", "https://www.typeform.com/developers/embed/callbacks/"),
  // TODO Chili Piper: window message events from the router; find and cite Chili Piper's docs first.
  chilipiper: stub("Chili Piper", ""),
  // TODO Calendly: the calendly.event_scheduled postMessage from the embed; find and cite Calendly's docs first.
  calendly: stub("Calendly", ""),
  // TODO Gravity Forms, Contact Form 7, Marketo, Pardot and others.
  other: stub("Other form tools", ""),
};

export function fixFor(tool) {
  const f = FIXES[tool];
  if (!f) throw new Error(`no fix template for form tool "${tool}"`);
  if (!f.ready) throw new Error(`fix template for "${tool}" is not ready (stub); it must not be shown on a page`);
  return f;
}
