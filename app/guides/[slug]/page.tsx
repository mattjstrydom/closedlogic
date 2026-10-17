import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../guide.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs, { type Crumb } from "../../components/breadcrumbs";
import GuideCta from "../../components/guide-cta";
import { allGuides, formatDate, getGuide, pillars, showDrafts } from "../content";
import { abs, jsonLdScript, mattNode, MATT_ID, ORG_ID, orgNode } from "../../jsonld";
import { ogImage, pageMetadata, twitterImage } from "../../seo";
import { site } from "../../site.config";

// Only guides the build is allowed to show (see content.ts). Anything else is a 404 and is never built.
export const dynamicParams = false;
const PLACEHOLDER = "_none";
export function generateStaticParams() {
  // A static export needs at least one param. With nothing to show, one placeholder is built; it calls notFound() and
  // scripts/cf-postbuild.mjs removes its output, so no guide page exists in out/.
  const slugs = allGuides().map((g) => ({ slug: g.slug }));
  return slugs.length ? slugs : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  const path = `/guides/${g.slug}`;
  const og = g.ogImage ? { ...ogImage, ...g.ogImage, alt: g.ogAlt } : ogImage;
  const tw = g.twitterImage ? { ...twitterImage, ...g.twitterImage, alt: g.ogAlt } : twitterImage;
  const m = pageMetadata({ title: g.metaTitle, description: g.description, path, ogImg: og, twImg: tw });
  return {
    ...m,
    openGraph: { ...m.openGraph, type: "article", publishedTime: g.datePublished, modifiedTime: g.dateModified, authors: ["Matt Strydom"] },
    ...(g.isDraft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const pillar = pillars[g.pillar];
  const pillarPage = g.type === "post" ? allGuides().find((x) => x.type === "pillar" && x.pillar === g.pillar && x.slug !== g.slug) : undefined;
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }];
  if (pillarPage) crumbs.push({ name: pillarPage.title, href: `/guides/${pillarPage.slug}` });
  crumbs.push({ name: g.title });
  const related = g.related.map((s) => allGuides().find((x) => x.slug === s)).filter((x) => !!x);
  const url = `${site.url}/guides/${g.slug}`;
  const image = abs((g.ogImage ?? ogImage).url);
  const graph = [
    orgNode,
    mattNode,
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: g.title,
      description: g.description,
      datePublished: g.datePublished,
      dateModified: g.dateModified,
      image: [image],
      inLanguage: "en-ZA",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@id": MATT_ID },
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.href ? abs(c.href === "/" ? "" : c.href) || site.url : url,
      })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      {g.isDraft && showDrafts && <div className="guide-draft-banner" role="status">DRAFT ({g.status}): not published, hidden from the live site, noindex</div>}
      <Header />
      <main id="main" tabIndex={-1}>
        <article className="container-site pb-16 pt-10 sm:pb-24 sm:pt-14">
          <Breadcrumbs items={crumbs} />
          <p className="chip mt-8">{g.type === "pillar" ? "Guide" : pillar.name}</p>
          <h1 className="mt-4 max-w-[24ch] text-title-l">{g.title}</h1>
          <p className="mt-5 text-text-s text-body">
            By <span className="text-ink">Matt Strydom</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={g.datePublished}>{formatDate(g.datePublished)}</time>
            {g.dateModified !== g.datePublished && (
              <>
                <span aria-hidden="true"> · </span>Updated <time dateTime={g.dateModified}>{formatDate(g.dateModified)}</time>
              </>
            )}
            {g.lastChecked && (
              <>
                <span aria-hidden="true"> · </span>Last checked <time dateTime={g.lastChecked}>{formatDate(g.lastChecked)}</time>
              </>
            )}
            <span aria-hidden="true"> · </span>
            {g.readingMinutes} min read
          </p>
          <div className="guide-prose mt-10" dangerouslySetInnerHTML={{ __html: g.html }} />
          <div className="max-w-[68ch]">
            <GuideCta cta={g.cta} />
            {(related.length > 0 || pillarPage) && (
              <nav aria-label="Keep reading" className="mt-10">
                <h2 className="text-title-s">Keep reading</h2>
                <ul className="mt-3 space-y-2 text-text-m">
                  {pillarPage && (
                    <li><Link href={`/guides/${pillarPage.slug}`} className="link">{pillarPage.title}</Link></li>
                  )}
                  {related.map((r) => (
                    <li key={r.slug}><Link href={`/guides/${r.slug}`} className="link">{r.title}</Link></li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
