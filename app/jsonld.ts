import { site } from "./site.config";

// The same @ids the home page defines, so every page's graph points at one Organization and one Person.
export const ORG_ID = `${site.url}/#organization`;
export const MATT_ID = `${site.url}/#matt`;

// Minimal copies of the home page nodes, so a page that references the ids also carries the nodes (Google reads one page at a time).
export const orgNode = { "@type": "Organization", "@id": ORG_ID, name: site.brand, legalName: site.legalName, url: site.url };
export const mattNode = { "@type": "Person", "@id": MATT_ID, name: "Matt Strydom", sameAs: [site.linkedin] };

export const abs = (path: string) => (/^https?:/.test(path) ? path : `${site.url}${path}`);

export function jsonLdScript(graph: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
