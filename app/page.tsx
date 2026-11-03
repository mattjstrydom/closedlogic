import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import CheckForm from "./components/check-form";
import Headshot from "./components/headshot";
import { Accent, Chip, Numeral, SectionHead, TickList } from "./components/ui";
import { bookHref } from "./booking";
import { homeFaqs } from "./faqs";
import { faqNode, jsonLdScript, MATT_ID, ORG_ID } from "./jsonld";
import { offers } from "./offers";
import { sharedOpenGraph, ogImage, twitterImage } from "./seo";
import { site } from "./site.config";
import { team } from "./team";

// Title is the doc's, without the brand suffix: with " | Closed Logic" it is 61 characters, over the 60 limit.
const homeTitle = "Fix HubSpot and Google Ads Conversion Tracking";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, url: "/", title: homeTitle, description: site.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description, images: [twitterImage] },
};

const reassurance = ["No logins for the check", "Prices on the site", "Read-only access if you hire us", "Every change can be undone", "We sell no media"];

const problems: [string, string, string][] = [
  ["A page view counts as a demo", "If opening your demo page or clicking a link counts as a conversion, Google Ads learns to find visitors, not buyers.", "Your reported cost per demo looks lower than it is."],
  ["The click ID never reaches HubSpot", "If the Google click ID isn't stored on the contact, the lead can't be matched back to the ad that brought it.", "You can't tell which campaigns produce pipeline."],
  ["Bidding stops at the form fill", "If qualified stages never reach Google Ads, bidding can't tell a real lead from a form sales threw away.", "Budget keeps flowing to the leads you didn't want."],
];

const steps: [string, string][] = [
  ["Free check.", "Send your work email and website. We look at what your site sends to Google Ads from outside and send you the evidence, with steps you can check yourself."],
  ["Fix it for $750.", "If you want us to fix it, we agree the scope in writing, work with read-only access where possible, and hand back a before-and-after check and a change log."],
  ["Keep it running, if you want.", "Our Ops Desk plan handles your ongoing HubSpot, tracking and automation work each month."],
];

type OfferCard = { name: string; price: string; body: string; href: string; button: string };
const offerCards: OfferCard[] = [
  { name: offers.check.name, price: offers.check.price, body: "What your site sends to Google Ads, with the evidence.", href: "/free-check", button: "Get my free check" },
  { name: offers.fix.name, price: offers.fix.price, body: "One miscounted conversion, fixed and documented, with a 30-day guarantee.", href: "/signal-fix", button: "See what's included" },
  { name: offers.ops.name, price: `${offers.pilot.price} pilot, then ${offers.ops.per}`, body: "Your HubSpot, tracking and automation backlog, handled each month.", href: "/ops-desk", button: "See the plan" },
];

const why: [string, string][] = [
  ["Evidence first.", "You see what we found on your own site before you pay or share access."],
  ["Steps you can rerun.", "Every finding comes with steps your team can repeat without us."],
  ["Published prices.", "What you see on this site is what you pay."],
  ["Read-only by default.", "We ask for the least access the job needs, and remove it when we're done."],
  ["Every change can be undone.", "You get a change log with how to reverse each change."],
  ["No reason to inflate your spend.", "We sell no media, resell no software and take no cut of ad spend."],
];

const faqItems: FaqItem[] = homeFaqs.map(({ q, a }) => ({ q, a }));

const graph = [
  {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    founder: { "@type": "Person", "@id": MATT_ID, name: "Matt Strydom", sameAs: [site.linkedin] },
  },
  { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.brand, inLanguage: "en", publisher: { "@id": ORG_ID } },
  faqNode(homeFaqs),
];

const card = "card flex flex-col gap-3 text-text-m";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/" />
      <main id="main" tabIndex={-1}>
        {/* 2. Hero */}
        <section id="hero" aria-labelledby="hero-title" className="hero-grid">
          <div className="container-site pb-20 pt-24 max-lg:pb-14 max-lg:pt-14">
            <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-6 text-center">
              <Chip>HubSpot and Google Ads conversion tracking</Chip>
              <h1 id="hero-title" className="heading-center max-w-[20ch] text-title-xl">
                Make sure Google Ads learns from <Accent>real leads, not page views.</Accent>
              </h1>
              <p className="lead">We check what your site sends to Google Ads and HubSpot, show you the evidence before you share any access, and fix what&apos;s miscounted for $750.</p>
              <div className="card w-full max-w-[34rem]"><CheckForm email={site.email} idPrefix="hero" /></div>
              {/* Not yet: a "See an example check" link and an anonymized evidence card beside the form. Both wait for a real, permitted
                  or fully anonymized example check. */}
            </div>
          </div>
        </section>

        {/* 3. Reassurance strip */}
        <section aria-label="What to expect" className="border-y border-solid border-rule bg-white py-5">
          <ul className="container-site flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center font-display text-[0.95rem] font-semibold text-ink">
            {reassurance.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        {/* 4. The problem */}
        <section id="problem" aria-labelledby="problem-title" className="section-y">
          <div className="container-site">
            <SectionHead id="problem">Three ways Google Ads ends up <Accent>chasing the wrong people</Accent></SectionHead>
            <div className="mt-14 grid gap-7 lg:grid-cols-3">
              {problems.map(([t, b, c]) => (
                <div key={t} className={card}>
                  <h3 className="text-title-xs">{t}</h3>
                  <p>{b}</p>
                  <p className="mt-auto pt-2 font-medium text-ink">What it costs: {c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="how" chip="How it works">From free check to fixed, <Accent>in three steps</Accent></SectionHead>
            <ol className="mt-14 grid gap-7 lg:grid-cols-3">
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

        {/* 6. Offers */}
        <section id="offers" aria-labelledby="offers-title" className="section-y">
          <div className="container-site">
            <SectionHead id="offers">Start small. <Accent>Keep going only if it&apos;s worth it.</Accent></SectionHead>
            <ul className="mt-14 grid gap-7 lg:grid-cols-3">
              {offerCards.map((o) => (
                <li key={o.name} className={`${card} !p-8`}>
                  <h3 className="text-title-m">{o.name}</h3>
                  <p className="font-display text-[1.05rem] font-bold text-ink">{o.price}</p>
                  <p className="text-body">{o.body}</p>
                  <p className="mt-auto pt-3">
                    <Link href={o.href} className="link font-semibold">{o.button} →</Link>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-[44rem] text-center text-body">
              For larger teams: a full audit and a fractional measurement lead.{" "}
              <Link href="/fractional" className="link font-semibold">See options for larger teams</Link>
            </p>
          </div>
        </section>

        {/* 7. Why you can check us first */}
        <section id="independent" aria-labelledby="independent-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="independent" chip="Why independent">Check us <Accent>before you trust us</Accent></SectionHead>
            <div className="card mx-auto mt-12 max-w-[52rem]">
              <TickList
                className="text-text-m"
                items={why.map(([lead, rest]) => (
                  <span key={lead}><strong className="font-semibold text-ink">{lead}</strong> {rest}</span>
                ))}
              />
              <p className="mt-6">
                <Link href="/access" className="link font-semibold">Read our access policy →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* 8. What a check looks like: not yet. A short walkthrough of one anonymized check ("What you get from a free check", with a
              "See the full example" button) goes here once a real, permitted or fully anonymized example exists. */}

        {/* 9. Who it's for */}
        <section id="for" aria-labelledby="for-title" className="section-y">
          <div className="container-site">
            <SectionHead id="for">Built for B2B teams <Accent>running Google Ads into HubSpot</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[52rem] space-y-3 text-text-l">
              <p>Usually SaaS or service businesses with a demo, consultation or sales-qualified lead, often just after a new marketing hire or a website rebuild.</p>
              <p className="text-body">Not a fit: ecommerce with a fixed order value, or teams that want media buying.</p>
            </div>
          </div>
        </section>

        {/* 10. The people */}
        <section id="people" aria-labelledby="people-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="people">Who does <Accent>the work</Accent></SectionHead>
            <div className="mx-auto mt-12 grid max-w-[52rem] gap-6 sm:grid-cols-2">
              {team.map((p) => (
                <div key={p.id} className="card flex flex-col gap-4 text-text-m">
                  <Headshot person={p} />
                  <h3 className="text-title-xs">{p.heading}</h3>
                  <p className="text-body">{p.short}</p>
                  {p.linkedin && (
                    <p>
                      <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                        {p.name} on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center"><Link href="/about" className="link font-semibold">About us →</Link></p>
          </div>
        </section>

        {/* 11. FAQ */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions">Questions we get.</SectionHead>
            <div className="mx-auto mt-12 max-w-[900px]">
              <Faq items={faqItems} />
            </div>
          </div>
        </section>

        {/* 12. Final call to action */}
        <section id="check" aria-labelledby="check-title" className="section-y band">
          <div className="container-site">
            <div className="mx-auto max-w-[36rem] text-center">
              <h2 id="check-title" className="heading-center text-title-l">See what your site is sending to Google Ads</h2>
              <p className="lead mx-auto mt-5">Free, no logins, and you keep the evidence either way.</p>
              <div className="card mt-10"><CheckForm email={site.email} /></div>
              <p className="mt-6 text-body">
                Prefer to talk?{" "}
                <a href={bookHref("home")} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer" className="link">
                  Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
