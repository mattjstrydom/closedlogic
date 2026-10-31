// Copy-paste fix templates for the /v/ evidence report, one per form tool. scripts/evidence/render.mjs picks the
// template for the tool that capture.mjs detected. Only templates with ready: true are ever rendered on a page;
// the stubs below throw at render time, so an unfinished fix can't reach a live page.
import hubspot from "./hubspot.mjs";
import framer from "./framer.mjs";
import webflow from "./webflow.mjs";

const stub = (tool, docs) => ({
  tool,
  ready: false,
  docs,
  // TODO: write and test this template on a public page that uses the tool before rendering it anywhere.
  build() { throw new Error(`fix template for ${tool} is a stub (ready: false); finish it before rendering`); },
});

export const FIXES = {
  hubspot, // HubSpot legacy (v2) embed + RevenueHero/ScheduleHero booking: done
  // Form tools counted across video-pool.csv, for-matt-visme-check.csv and the live pages on 31 Oct 2026
  // (outbound/form-tools/form-tools.json): HubSpot first by far, then Framer and Webflow native forms.
  framer, // Framer native form, framer:formsubmit event (needs a Tracking ID on the form): done, not yet used on a page
  webflow, // Webflow native form, .w-form-done success state: done, not yet used on a page
  // TODO Typeform embeds: onSubmit callback of the embed SDK. Docs: https://www.typeform.com/developers/embed/callbacks/
  typeform: stub("Typeform", "https://www.typeform.com/developers/embed/callbacks/"),
  // TODO Chili Piper (booking layer on 13 of 86 prospect sites): window message {action: "booked"} /
  // "booking-confirmed". Docs: https://help.chilipiper.com/hc/en-us/articles/1500011381522-Capturing-Javascript-Messaging-in-Browser
  chilipiper: stub("Chili Piper", "https://help.chilipiper.com/hc/en-us/articles/1500011381522-Capturing-Javascript-Messaging-in-Browser"),
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
