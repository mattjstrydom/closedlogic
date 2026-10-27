import { guaranteeFaqs } from "./guarantee";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import { AuditButton, BookButton } from "./components/cta";
import CtaBand from "./components/cta-band";
import ThreeNumbers from "./components/three-numbers";
import ComparisonGrid from "./components/comparison-grid";
import { Accent, Numeral, SectionHead } from "./components/ui";
import { faqNode, jsonLdScript } from "./jsonld";
import { site } from "./site.config";
import { sharedOpenGraph, ogImage, twitterImage } from "./seo";

const homeTitle = `${site.brand} | ${site.positioning}`;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, url: "/", title: homeTitle, description: site.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description, images: [twitterImage] },
};

const problems: [string, string][] = [
  ["The agency grades its own homework.", "The team buying the media also reports whether the media worked. That is not a measurement; it is a self-assessment."],
  ["The CRM records what it can see.", "If the GCLID never reaches the contact, the channel looks like direct traffic. The CRM is not wrong. It is incomplete."],
  ["The dashboard reports; it doesn’t reconcile.", "A dashboard can show ten numbers. It cannot tell you which one is true, or why they disagree."],
];

const offers: { name: string; price: string; body: string; href: string; link: string }[] = [
  {
    name: "Pipeline Truth Audit",
    price: "$1,500 · 10 business days",
    body: "20 checks across Google Ads, HubSpot and your reporting. You get a baseline, a 90-day roadmap and the material issues we find, with the top three ranked by revenue impact.",
    href: "/method#checks",
    link: "See the 20-point audit",
  },
  {
    name: "Measurement Scorecard",
    price: "$1,500/month · month to month, no notice period",
    body: "A monthly reconciliation of your pipeline and revenue numbers across your CRM, ads and finance, plus a one-page scorecard showing what moved and what doesn’t agree. No fix hours: fixes are quoted separately or covered by Fractional.",
    href: "/pricing",
    link: "See pricing",
  },
  {
    name: "Fractional Measurement Lead",
    price: "$5,000/month · 25 hours · 3-month initial, 30-day exit",
    body: "We own the monthly scorecard, the fixes and the Monday number. You keep your agency. We keep the agency honest.",
    href: "/for-b2b-saas",
    link: "For B2B SaaS",
  },
];

const steps: [string, string][] = [
  ["Book a 20-minute review.", "Bring your Google Ads conversions, your HubSpot pipeline and the number in your board deck. No deck. No pitch. A diagnosis."],
  ["We find the gap.", "20 checks in 10 business days from read access: tracking, GCLID coverage, lifecycle stages, lead scoring, routing, attribution, reporting reconciliation."],
  ["You get one number.", "A baseline, a one-page scorecard and a 90-day roadmap. The material issues we find, with the top three ranked by revenue impact."],
  ["We keep it true.", "A monthly scorecard, a fix list and a 60-minute review. The number stays defensible after the audit ends."],
];

const faqs: { q: string; a: string }[] = [
  { q: "Why not just use our agency?", a: "Because the agency that runs your ads has an incentive to report them favorably. We don’t run media. We audit the number." },
  { q: "Why not just use our CRM partner?", a: "CRM partners implement and standardize the tool. We test whether the numbers the tool produces are true — and whether they compare across companies." },
  { q: "Do you replace our dashboard?", a: "No. We define the metrics, reconcile the sources and own the monthly scorecard. Your dashboard can stay." },
  { q: "What does it cost?", a: "Audit $1,500. Measurement Scorecard $1,500/month, no notice period. Fractional $5,000/month, with a 30-day exit. Fixed scope. No media percentage." },
  { q: "What if we’re not sure?", a: "Start with the audit. If the audit doesn’t find at least three material issues, we refund the full $1,500 within 14 days of the audit readout. You keep the report, the baseline and the roadmap." },
  ...guaranteeFaqs,
  { q: "How fast?", a: "Audit in 10 business days from read access. Baseline in 30 days." },
  { q: "Do you sign NDAs?", a: "Yes." },
];
const faqItems: FaqItem[] = faqs.map(({ q, a }) => ({ q, a }));

const ORG = `${site.url}/#organization`;
const service = (id: string, name: string, serviceType: string, description: string, offers?: object) => ({
  "@type": "Service",
  "@id": `${site.url}/#${id}`,
  name,
  serviceType,
  provider: { "@id": ORG },
  description,
  ...(offers ? { offers } : {}),
});
const graph = [
  {
    "@type": "Organization",
    "@id": ORG,
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    founder: { "@type": "Person", "@id": `${site.url}/#matt`, name: "Matt Strydom", sameAs: [site.linkedin] },
  },
  { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.brand, inLanguage: "en", publisher: { "@id": ORG } },
  service("audit", "Pipeline Truth Audit", "Measurement audit", "20 checks across Google Ads, HubSpot and reporting in 10 business days from read access, with a baseline, a one-page scorecard and a 90-day roadmap.", {
    "@type": "Offer",
    price: "1500",
    priceCurrency: "USD",
    url: `${site.url}/pricing`,
  }),
  service("scorecard", "Measurement Scorecard", "Measurement reporting", "A monthly reconciliation of pipeline and revenue numbers across CRM, ads and finance, with a one-page scorecard showing what moved and what doesn’t agree. Month to month, no notice period. No fix hours.", {
    "@type": "Offer",
    priceSpecification: { "@type": "UnitPriceSpecification", price: "1500", priceCurrency: "USD", unitText: "MONTH" },
    url: `${site.url}/pricing`,
  }),
  service("fractional", "Fractional Measurement Lead", "Fractional measurement leadership", "25 hours a month on tracking, attribution, HubSpot lifecycle and reporting for B2B SaaS, with a monthly scorecard. 3-month initial term; either side can end it in writing during the first 30 days.", {
    "@type": "Offer",
    priceSpecification: { "@type": "UnitPriceSpecification", price: "5000", priceCurrency: "USD", unitText: "MONTH" },
    url: `${site.url}/for-b2b-saas`,
  }),
  faqNode(faqs),
];

const card = "card flex flex-col gap-3 text-text-m";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/" />
      <main id="main" tabIndex={-1}>
        {/* 1. Hero */}
        <section id="hero" aria-labelledby="hero-title" className="hero-grid">
          <div className="container-site pb-[110px] pt-24 max-lg:pb-16 max-lg:pt-14">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 id="hero-title" className="heading-center max-w-[18ch] text-title-xl">
                Your pipeline numbers don’t agree. <Accent>We find out which one is right.</Accent>
              </h1>
              <p className="lead max-w-[46rem]">
                Closed Logic is the independent measurement layer for B2B SaaS. We don’t run your ads or implement your CRM. We own the number you take to the board.
              </p>
              <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
                <BookButton className="w-full sm:w-auto" />
                <AuditButton className="w-full sm:w-auto" />
              </div>
              <p className="max-w-[40rem] text-[1.05rem] text-body">Bring three numbers. We’ll tell you which one is wrong.</p>
              <p className="font-display text-[0.95rem] font-semibold text-ink">Independent · Technical · Fixed scope · No media-buying incentive</p>
            </div>
            <div className="mt-14">
              <ThreeNumbers />
            </div>
          </div>
        </section>

        {/* 2. Problem */}
        <section id="problem" aria-labelledby="problem-title">
          <div className="panel-navy mt-10">
            <div className="container-site">
              <SectionHead id="problem" className="on-navy-text">
                Three versions <Accent>of the truth.</Accent>
              </SectionHead>
              <div className="on-navy-text mx-auto mt-8 max-w-[44rem] space-y-5 text-center text-text-xl">
                <p>Google Ads says 42 conversions. HubSpot says 31 leads. Your board deck says 18 opportunities. Nobody can explain the gap.</p>
                <p>Your agency reports ROAS on the ads it runs. Your CRM partner built a dashboard that shows what the CRM can see. The board asks for one number. You have four.</p>
              </div>
              <div className="mt-14 grid gap-7 lg:grid-cols-3">
                {problems.map(([t, b]) => (
                  <div key={t} className={card}>
                    <h3 className="text-title-xs">{t}</h3>
                    <p>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. What we do */}
        <section id="offers" aria-labelledby="offers-title" className="section-y">
          <div className="container-site">
            <SectionHead id="offers">
              One measurement standard. <Accent>Three ways to use it.</Accent>
            </SectionHead>
            <ul className="mt-14 grid gap-7 lg:grid-cols-3">
              {offers.map((o) => (
                <li key={o.name} className={`${card} !p-8`}>
                  <h3 className="text-title-m">{o.name}</h3>
                  <p className="font-display text-[1.05rem] font-bold text-ink">{o.price}</p>
                  <p className="text-body">{o.body}</p>
                  <p className="mt-auto pt-3">
                    <Link href={o.href} className="link font-semibold">{o.link} →</Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Why independent */}
        <section id="independent" aria-labelledby="independent-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="independent" chip="Why independent">
              We don’t run media. We don’t sell CRM. <Accent>We don’t get paid when you spend more.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">The number is only useful if the person measuring it isn’t also selling the thing being measured. That is the whole model.</p>
            <div className="mx-auto max-w-[60rem]">
              <ComparisonGrid />
            </div>
          </div>
        </section>

        {/* 5. How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y">
          <div className="container-site">
            <SectionHead id="how" chip="How it works">
              Bring three numbers. <Accent>We’ll tell you which one is wrong.</Accent>
            </SectionHead>
            <ol className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(([lead, rest], i) => (
                <li key={lead} className="card group flex flex-col gap-3 p-6 text-text-m">
                  <Numeral n={i + 1} pad className="!text-[3.2rem]" />
                  <h3 className="text-title-xs">{lead}</h3>
                  <p className="text-body">{rest}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Who it's for */}
        <section id="for" aria-labelledby="for-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="for">Who this is for.</SectionHead>
            <div className={`${card} mx-auto mt-14 max-w-[60rem]`}>
              <h3 className="text-title-m">For B2B SaaS</h3>
              <p>$10M to $50M ARR · 20 to 200 employees · HubSpot Professional or Enterprise · Google Ads $10k+/month · sales-led or hybrid · 2 to 15 marketing staff · US, UK or Canada.</p>
              <p className="mt-auto pt-2"><Link href="/for-b2b-saas" className="link font-semibold">For B2B SaaS →</Link></p>
            </div>
            <div className="card mx-auto mt-7 max-w-[60rem] text-text-m">
              <h3 className="text-title-xs">Who this is not for</h3>
              <p className="mt-2">Ecommerce with a uniform average order value. Pre-PMF startups. Companies that want a body shop.</p>
            </div>
          </div>
        </section>

        {/* 7. Sample assets */}
        <section id="samples" aria-labelledby="samples-title" className="section-y">
          <div className="container-site">
            <SectionHead id="samples">
              See the work <Accent>before you buy.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">We don’t publish logos we haven’t earned. What we can show you is the work: the 20-point checklist and the method behind it.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/method#checks" className="btn-outline w-full sm:w-auto">See the 20-point checklist →</Link>
            </div>
            <p className="mt-6 text-center text-muted">Samples are illustrative, not client results.</p>
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="questions" aria-labelledby="questions-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="questions">Questions we get.</SectionHead>
            <div className="mx-auto mt-12 max-w-[900px]">
              <Faq items={faqItems} />
            </div>
          </div>
        </section>

        {/* 9. Final CTA */}
        <CtaBand id="request" title="Bring three numbers. We’ll tell you which one is wrong." body="A 20-minute pipeline review. No pitch. A diagnosis.">
          <BookButton className="w-full sm:w-auto">Book the review</BookButton>
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
