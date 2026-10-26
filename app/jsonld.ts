import { site } from "./site.config";

// The same @ids the home page defines, so every page's graph points at one Organization and one Person.
export const ORG_ID = `${site.url}/#organization`;
export const MATT_ID = `${site.url}/#matt`;
export const JENNIFER_ID = `${site.url}/#jennifer`;

// Minimal copies of the home page nodes, so a page that references the ids also carries the nodes (Google reads one page at a time).
export const orgNode = { "@type": "Organization", "@id": ORG_ID, name: site.brand, legalName: site.legalName, url: site.url };
export const mattNode = { "@type": "Person", "@id": MATT_ID, name: "Matt Strydom", sameAs: [site.linkedin] };
export const jenniferNode = { "@type": "Person", "@id": JENNIFER_ID, name: "Jennifer Taylor", worksFor: { "@id": ORG_ID } };

export const abs = (path: string) => (/^https?:/.test(path) ? path : `${site.url}${path}`);

export function jsonLdScript(graph: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

/** FAQPage node from plain-text question and answer pairs (the page renders the same strings). */
export function faqNode(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}
