import { guaranteeFaqs } from "./guarantee";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import { BookButton } from "./components/cta";
import CheckForm from "./components/check-form";
import ComparisonGrid from "./components/comparison-grid";
import { Accent, Numeral, SectionHead } from "./components/ui";
import { faqNode, jsonLdScript } from "./jsonld";
import { offers, fixScopeLine, watchLine, fixDeliverables, fixGuarantee, watchTerms, checkOfferText, auditCredit } from "./offers";
import { site } from "./site.config";
import { bookHref } from "./booking";
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
  ["A page view counts as a lead.", "If a page view or a button click is a Primary conversion, Google Ads learns to find visitors, not buyers."],
  ["The click ID never reaches HubSpot.", "Without the click ID on the contact, the lead can't be matched back to the ad, and the channel looks like direct traffic."],
  ["Bidding stops at the form fill.", "If the deeper stages never reach Google Ads, bidding can't tell a real lead from a form that sales threw away."],
];

type OfferCard = { name: string; price: string; body: string; href: string; link: string };

const offerCards: OfferCard[] = [
  {
    name: offers.check.name,
    price: offers.check.price,
    body: `${checkOfferText} Every finding comes with steps you can check without us.`,
    href: "#check",
    link: "Get the check",
  },
  {
    name: offers.fix.name,
    price: `${offers.fix.price} · fixed scope`,
    body: `We fix what is miscounted: Primary conversion actions, triggers, form-submit and booking events, click IDs and UTMs in HubSpot, and the bidding stage your volume can support. ${fixDeliverables}`,
    href: "/signal-fix",
    link: "See the scope",
  },
  {
    name: offers.watch.name,
    price: `${offers.watch.per} · month to month`,
    body: `Weekly checks that conversions still arrive, click IDs are still stored, Primary actions haven't changed and form embeds still fire. A short monthly note and ${offers.watch.allowanceHours} hours of fixes.`,
    href: "/pricing",
    link: "See what we check",
  },
];

const largerAccounts: OfferCard[] = [
  {
    name: offers.audit.name,
    price: `${offers.audit.price} · ${offers.audit.days} business days`,
    body: `The 10 core checks across Google Ads, HubSpot and your reporting, with a 90-day baseline and a roadmap. ${auditCredit}`,
    href: "/method#checks",
    link: "See the 10 core checks",
  },
  {
    name: offers.fractional.name,
    price: `${offers.fractional.per} · ${offers.fractional.hours} hours · 3-month term`,
    body: "The step after the audit: the 10 core checks plus 10 extended checks, with the fixes. You keep your agency.",
    href: "/for-b2b-saas",
    link: "For B2B SaaS",
  },
];

const steps: [string, string][] = [
  ["Get a free outside-in check.", "Send your work email and website. We look at what your site sends to Google Ads, with no access needed."],
  ["We send what we find.", "Each finding comes with steps you can check without us."],
  ["We fix it at a fixed price.", `${offers.fix.name}, ${offers.fix.price}. You get a before-and-after check you can rerun and a change log.`],
  ["We keep checking it.", `${offers.watch.name} runs weekly checks and sends a short monthly note.`],
];

const faqs: { q: string; a: string }[] = [
  { q: "Why not just use our agency?", a: "Keep them. We sell no media and take no cut of ad spend, so nothing we report depends on you spending more. Every finding comes with steps you can check without us." },
  { q: "Why not just use our CRM partner?", a: "Keep them too. They set up the tool. We check what it sends to Google Ads, and we resell no software." },
  { q: "What is the free outside-in check?", a: checkOfferText },
  { q: `What does ${offers.fix.name} cover?`, a: `${fixScopeLine}. ${fixDeliverables} ${fixGuarantee}` },
  { q: `What does ${offers.watch.name} cover?`, a: `${watchLine}. ${watchTerms}` },
  { q: "What does it cost?", a: `${offers.check.name}: free. ${offers.fix.name}: ${offers.fix.price}. ${offers.watch.name}: ${offers.watch.per}. For larger accounts: ${offers.audit.name} ${offers.audit.price}, and ${offers.fractional.name} ${offers.fractional.per}. Fixed scope. No media percentage.` },
  { q: "What if we’re not sure?", a: "Start with the free outside-in check. If you later buy the audit and it doesn’t find at least three material issues, we refund the full $1,500 within 14 days of the audit readout. You keep the report, the baseline and the roadmap." },
  ...guaranteeFaqs,
  { q: "How fast is the audit?", a: `Audit, baseline and roadmap in ${offers.audit.days} business days from read access.` },
  { q: "Do you sign NDAs?", a: "Yes." },
];
const faqItems: FaqItem[] = faqs.map(({ q, a }) => ({ q, a }));

const ORG = `${site.url}/#organization`;
const service = (id: string, name: string, serviceType: string, description: string, offer: object) => ({
  "@type": "Service",
  "@id": `${site.url}/#${id}`,
  name,
  serviceType,
  provider: { "@id": ORG },
  description,
  offers: offer,
});
const monthly = (price: string, url: string) => ({ "@type": "Offer", priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitText: "MONTH" }, url });
const once = (price: string, url: string) => ({ "@type": "Offer", price, priceCurrency: "USD", url });
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
  service("check", offers.check.name, "Tracking check", checkOfferText, once("0", `${site.url}/pricing`)),
  service("fix", offers.fix.name, "Conversion tracking fix", `A fixed-scope fix of Google Ads and HubSpot conversion tracking. ${fixDeliverables}`, once("750", `${site.url}/pricing`)),
  service("watch", offers.watch.name, "Conversion tracking monitoring", `${watchLine}. ${watchTerms}`, monthly("750", `${site.url}/pricing`)),
  service("audit", offers.audit.name, "Measurement audit", `10 core checks across Google Ads, HubSpot and reporting in ${offers.audit.days} business days from read access, with a baseline and a 90-day roadmap.`, once("1500", `${site.url}/pricing`)),
  service("fractional", offers.fractional.name, "Fractional measurement leadership", "25 hours a month on tracking, attribution, HubSpot lifecycle and reporting for B2B SaaS, with a monthly scorecard. 3-month term; cancel in the first 30 days and pay only that month.", monthly("5000", `${site.url}/for-b2b-saas`)),
  faqNode(faqs),
];

const card = "card flex flex-col gap-3 text-text-m";

function OfferList({ items, cols }: { items: OfferCard[]; cols: string }) {
  return (
    <ul className={`mt-10 grid gap-7 ${cols}`}>
      {items.map((o) => (
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
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/" />
      <main id="main" tabIndex={-1}>
        {/* 1. Hero */}
        <section id="hero" aria-labelledby="hero-title" className="hero-grid">
          <div className="container-site pb-24 pt-24 max-lg:pb-14 max-lg:pt-14">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 id="hero-title" className="heading-center max-w-[18ch] text-title-xl">
                Make sure Google Ads learns from <Accent>your real leads.</Accent>
              </h1>
              <p className="lead max-w-[46rem]">
                We find what your Google Ads and HubSpot setup is miscounting, fix it at a fixed price, and keep checking it. Every finding comes with steps you can check without us.
              </p>
              <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
                <a href="#check" className="btn w-full sm:w-auto">Get a free outside-in check</a>
                <BookButton campaign="home" className="w-full sm:w-auto" />
              </div>
              <p className="font-display text-[0.95rem] font-semibold text-ink">Independent · Technical · Fixed scope · No media-buying incentive</p>
            </div>
          </div>
        </section>

        {/* 2. Problem */}
        <section id="problem" aria-labelledby="problem-title">
          <div className="panel-navy mt-10">
            <div className="container-site">
              <SectionHead id="problem" className="on-navy-text">
                Google Ads bids on <Accent>what you tell it counts.</Accent>
              </SectionHead>
              <div className="on-navy-text mx-auto mt-8 max-w-[44rem] space-y-5 text-center text-text-xl">
                <p>If the conversions it counts are the wrong ones, it spends your budget finding more of them. The leads that became pipeline never teach it anything.</p>
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

        {/* 3. Offers */}
        <section id="offers" aria-labelledby="offers-title" className="section-y">
          <div className="container-site">
            <SectionHead id="offers">
              Find it. Fix it. <Accent>Keep checking it.</Accent>
            </SectionHead>
            <OfferList items={offerCards} cols="lg:grid-cols-3" />
            <h3 className="heading-center mt-16 text-center text-title-m">For larger accounts</h3>
            <div className="mx-auto max-w-[60rem]">
              <OfferList items={largerAccounts} cols="lg:grid-cols-2" />
            </div>
          </div>
        </section>

        {/* 4. Why independent */}
        <section id="independent" aria-labelledby="independent-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="independent" chip="Why independent">
              We sell no media. We resell no software. <Accent>We take no cut of ad spend.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">You keep your agency. Nothing we report depends on you spending more, and every finding comes with reproduction steps.</p>
            <div className="mx-auto max-w-[60rem]">
              <ComparisonGrid />
            </div>
          </div>
        </section>

        {/* 5. How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y">
          <div className="container-site">
            <SectionHead id="how" chip="How it works">
              From a free check <Accent>to weekly checks.</Accent>
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
            <div className="card mx-auto mt-10 max-w-[52rem] space-y-3 text-text-l">
              <p>B2B companies running Google Ads into HubSpot, usually seed to Series B, and often just after hiring a marketing lead.</p>
              <p className="text-body">Not for ecommerce with a uniform average order value, or companies that want a body shop.</p>
            </div>
          </div>
        </section>

        {/* 7. Method */}
        <section id="samples" aria-labelledby="samples-title" className="section-y">
          <div className="container-site">
            <SectionHead id="samples">
              See the method <Accent>before you buy.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">We don’t publish logos we haven’t earned. What we can show you is the method: the checks we run, what broken looks like and what it costs.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/method#checks" className="btn-outline w-full sm:w-auto">See the 10 core checks →</Link>
            </div>
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

        {/* 9. Final CTA: the free check form */}
        <section id="check" aria-labelledby="check-title" className="section-y">
          <div className="container-site">
            <div className="mx-auto max-w-[36rem] text-center">
              <h2 id="check-title" className="heading-center text-title-l">Get a free outside-in check.</h2>
              <p className="lead mx-auto mt-5">{checkOfferText}</p>
              <div className="card mt-10"><CheckForm email={site.email} /></div>
              <p className="mt-6 text-body">Prefer to talk? <a href={bookHref("home")} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer" className="link">Book a 20-minute fit call<span className="sr-only"> (opens in a new tab)</span></a></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
