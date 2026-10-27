import Link from "next/link";
import type { Metadata } from "next";
import "./guide.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Breadcrumbs from "../components/breadcrumbs";
import { allGuides, formatDate, hasLiveGuides, pillars, showDrafts, type PillarKey } from "./content";
import { abs, jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

const meta = pageMetadata({
  title: "Guides: HubSpot and Google Ads measurement",
  description: "Technical notes on HubSpot and Google Ads measurement: how lifecycle stages and click IDs reach Google Ads, and how to check that bidding uses them.",
  path: "/guides",
});

// The index is noindex until at least one guide is published, and the sitemap leaves it out until then (app/sitemap.ts).
export function generateMetadata(): Metadata {
  return hasLiveGuides() ? meta : { ...meta, robots: { index: false, follow: false } };
}

export default function GuidesIndex() {
  const guides = allGuides();
  const keys = (Object.keys(pillars) as PillarKey[]).filter((k) => guides.some((g) => g.pillar === k));
  const graph = [
    orgNode,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: abs("/guides") },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      {showDrafts && guides.some((g) => g.isDraft) && <div className="guide-draft-banner" role="status">DRAFT PREVIEW: unpublished guides are listed below and are hidden from the live site</div>}
      <Header />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="guides-title" className="container-site pb-16 pt-10 sm:pb-24 sm:pt-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />
          <h1 id="guides-title" className="mt-8 max-w-[22ch] text-title-l">Guides</h1>
          {guides.length === 0 ? (
            <p className="mt-6 max-w-[62ch] text-text-xl text-body">
              Guides coming soon. Meanwhile, see <Link href="/method" className="link">the method</Link> to see what we check.
            </p>
          ) : (
            <>
              <p className="mt-6 max-w-[62ch] text-text-xl text-body">
                Technical notes on HubSpot and Google Ads measurement.
              </p>
              {keys.map((k) => (
                <section key={k} aria-labelledby={`pillar-${k}`} className="mt-12">
                  <h2 id={`pillar-${k}`} className="text-title-m">{pillars[k].name}</h2>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                    {guides.filter((g) => g.pillar === k).sort((a, b) => Number(b.type === "pillar") - Number(a.type === "pillar")).map((g) => (
                      <li key={g.slug} className="tile border border-solid border-rule p-5">
                        <h3 className="text-title-xs">
                          <Link href={`/guides/${g.slug}`} className="text-ink no-underline hover:text-accent-text">{g.title}</Link>
                          {g.isDraft && <span className="ml-2 text-text-s font-semibold text-warn">DRAFT</span>}
                        </h3>
                        <p className="mt-2 text-text-s text-body">{g.description}</p>
                        <p className="mt-3 text-text-s text-muted">
                          {g.readingMinutes} min read · Updated <time dateTime={g.dateModified}>{formatDate(g.dateModified)}</time>
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
