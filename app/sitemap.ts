import type { MetadataRoute } from "next";
import { site } from "./site.config";
import { allGuides, hasLiveGuides } from "./guides/content";

// Static export: metadata routes must opt in to being written as files at build time.
export const dynamic = "force-static";

// No lastModified, changeFrequency or priority on the fixed pages: Google ignores the last two, and a wrong lastModified is worse than none.
// Guides: only published, not future dated posts (drafts are never built, see app/guides/content.ts), each with lastModified from its dateModified. /guides appears once one exists.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["/", "/agencies", "/agencies/teardown", "/sample-report", "/teardown", "/privacy", "/terms"].map((p) => ({ url: p === "/" ? site.url : `${site.url}${p}` }));
  const live = allGuides().filter((g) => !g.isDraft);
  if (!hasLiveGuides()) return pages;
  const newest = live.map((g) => g.dateModified).sort().pop();
  return [
    ...pages,
    { url: `${site.url}/guides`, lastModified: newest },
    ...live.map((g) => ({ url: `${site.url}/guides/${g.slug}`, lastModified: g.dateModified })),
  ];
}
