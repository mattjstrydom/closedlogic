import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import CheckForm from "./components/check-form";
import Headshot from "./components/headshot";
import { EvidenceSample, FeatureCard, PricingTier, SignalReport, TrustStrip } from "./components/cl";
import { Chip } from "./components/ui";
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

const problems: [string, string, string, string][] = [
  ["01", "A page view counts as a demo", "If opening your demo page or clicking a link counts as a conversion, Google Ads learns to find visitors, not buyers.", "Your reported cost per demo looks lower than it is."],
  ["02", "The click ID never reaches HubSpot", "If the Google click ID isn't stored on the contact, the lead can't be matched back to the ad that brought it.", "You can't tell which campaigns produce pipeline."],
  ["03", "Bidding stops at the form fill", "If qualified stages never reach Google Ads, bidding can't tell a real lead from a form sales threw away.", "Budget keeps flowing to the leads you didn't want."],
];

const steps: [string, string, string, string][] = [
  ["01", "Free check", "Send your work email and website. We look at what your site sends to Google Ads from outside and send you the evidence, with steps you can check yourself.", "$0"],
  ["02", "Fix it for $750", "If you want us to fix it, we agree the scope in writing, work with read-only access where possible, and hand back a before-and-after check and a change log.", "$750 one-time"],
  ["03", "Keep it running, if you want", "Our Ops Desk plan handles your ongoing HubSpot, tracking and automation work each month.", `${offers.pilot.price} pilot, then ${offers.ops.per}`],
];

const why: [string, string][] = [
  ["Evidence first", "You see what we found on your own site before you pay or share access."],
  ["Steps you can rerun", "Every finding comes with steps your team can repeat without us."],
  ["Published prices", "What you see on this site is what you pay."],
  ["Read-only by default", "We ask for the least access the job needs, and remove it when we're done."],
  ["Every change can be undone", "You get a change log with how to reverse each change."],
  ["No reason to inflate your spend", "We sell no media, resell no software and take no cut of ad spend."],
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

const roles: Record<string, string> = { matt: "Founder", jennifer: "Revenue operations and MarTech" };

export default function Home() {
  const book = bookHref("home");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/" />
      <main id="main" tabIndex={-1}>
        {/* 2. Hero */}
        <section id="hero" aria-labelledby="hero-title" className="cl-hero cl-hero-glow">
          <div className="container-site">
            <div className="cl-hero__grid">
              <div>
                <Chip className="!mx-0 !mb-0">HubSpot and Google Ads conversion tracking</Chip>
                <h1 id="hero-title" className="display">Make sure Google Ads learns from real leads, not page views.</h1>
                <p className="lead">We check what your site sends to Google Ads and HubSpot, show you the evidence before you share any access, and fix what&apos;s miscounted for $750.</p>
                <div className="max-w-[560px]">
                  <CheckForm email={site.email} idPrefix="hero" variant="inline" />
                </div>
                <div className="cl-hero__trust">
                  <a href={book} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer" className="cl-btn cl-btn--ghost cl-btn--sm !px-0 hover:!bg-transparent">
                    Or book a 20-minute call →<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
                {/* Not yet: a "See an example check" link. It waits for a real, permitted or fully anonymized example check. */}
              </div>
              <div className="cl-hero__panel">
                <SignalReport
                  host="acme.io"
                  healthy={2}
                  total={5}
                  bars={[30, 45, 38, 70, 88]}
                  rows={[
                    { title: "Book a demo", note: "Fires on page view, no form", tone: "bad", label: "Miscounted" },
                    { title: "gclid → HubSpot contact", note: "hs_google_click_id is empty", tone: "bad", label: "Missing" },
                    { title: "Offline conversions", note: "SQL stage not sent to Google Ads", tone: "warn", label: "Not sent" },
                    { title: "Enhanced conversions", note: "Hashed email matched", tone: "good", label: "Healthy" },
                  ]}
                />
                <p className="cl-help">Illustrative example, not a client result.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trust strip */}
        <TrustStrip items={reassurance} />

        {/* 4. The problem */}
        <section id="problem" aria-labelledby="problem-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--c">
              <Chip>The problem</Chip>
              <h2 id="problem-title">Three ways Google Ads ends up chasing the wrong people</h2>
              <p>Smart bidding optimizes for whatever you tell it is a conversion. If that signal is wrong, so is every bid.</p>
            </div>
            <div className="cl-grid3">
              {problems.map(([i, t, b, c]) => (
                <FeatureCard key={t} index={i} title={t} foot={<><b>What it costs:</b> {c}</>}>
                  {b}
                </FeatureCard>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y band">
          <div className="container-site">
            <div className="cl-steps">
              <div>
                <div className="cl-head">
                  <Chip>How it works</Chip>
                  <h2 id="how-title">From free check to fixed, in three steps</h2>
                  <p>You see the evidence before you share any access. Every change is documented and can be undone.</p>
                </div>
                <div className="mt-8"><EvidenceSample /></div>
                <p className="cl-help mt-3">Illustrative example, not a client result.</p>
              </div>
              <ol className="m-0 list-none p-0">
                {steps.map(([n, t, b, meta]) => (
                  <li key={t} className="cl-step">
                    <span className="step-badge" aria-hidden="true">{n}</span>
                    <div>
                      <h3>{t}</h3>
                      <p>{b}</p>
                      <div className="meta">{meta}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 6. Pricing */}
        <section id="offers" aria-labelledby="offers-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--c">
              <Chip>Pricing</Chip>
              <h2 id="offers-title">Start small. Keep going only if it&apos;s worth it.</h2>
              <p>Start free. Pay only when you&apos;ve seen what&apos;s wrong.</p>
            </div>
            <div className="cl-pricing">
              <PricingTier name={offers.check.name} price="$0" desc="What your site sends to Google Ads, with the evidence." items={["No logins or access", "Evidence you can rerun", "Steps you can check yourself"]}>
                <Link href="/free-check" className="btn-outline">Get my free check</Link>
              </PricingTier>
              <PricingTier recommended badge="Most teams start here" name={offers.fix.name} price={offers.fix.price} per="one-time" desc="One miscounted conversion, fixed and documented, with a 30-day guarantee." items={["Read-only access by default", "Every change can be undone", "30-day guarantee"]}>
                <Link href="/signal-fix" className="btn">See what&apos;s included</Link>
              </PricingTier>
              <PricingTier name={offers.ops.name} price={offers.ops.price} per="/month" desc={`Your HubSpot, tracking and automation backlog, handled each month. Starts with a ${offers.pilot.price} pilot.`} items={["HubSpot, tracking and automation", "One active request at a time", "Weekly updates"]}>
                <Link href="/ops-desk" className="btn-outline">See the plan</Link>
              </PricingTier>
            </div>
            <div className="cl-fract">
              <div>
                <b>Fractional</b>
                <p>
                  A full audit and a fractional measurement lead for larger teams. <Link href="/fractional" className="link">See options for larger teams</Link>
                </p>
              </div>
              <Link href="/contact" className="btn-outline">Talk to us</Link>
            </div>
          </div>
        </section>

        {/* 7. Why you can check us first */}
        <section id="independent" aria-labelledby="independent-title" className="section-y band">
          <div className="container-site">
            <div className="cl-trust2">
              <div className="cl-head">
                <Chip>Why independent</Chip>
                <h2 id="independent-title">Check us before you trust us</h2>
                <p>Everything about how we work is built so you can verify it before you pay, and undo it if you change your mind.</p>
                <p className="mt-5">
                  <Link href="/access" className="link font-semibold">Read our access policy →</Link>
                </p>
              </div>
              <ul className="cl-checks">
                {why.map(([lead, rest]) => (
                  <li key={lead}>
                    <b>{lead}</b>
                    <span>{rest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. What a check looks like: not yet. A short walkthrough of one anonymized check ("What you get from a free check", with a
              "See the full example" button) goes here once a real, permitted or fully anonymized example exists. */}

        {/* 9. Who it's for */}
        <section id="for" aria-labelledby="for-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--c">
              <Chip>Who it&apos;s for</Chip>
              <h2 id="for-title">Built for B2B teams running Google Ads into HubSpot</h2>
            </div>
            <div className="cl-fit">
              <div className="yes">
                <span className="cl-pill cl-pill--good">Good fit</span>
                <h3>You&apos;re likely a fit if</h3>
                <ul>
                  <li>You sell with a demo, consultation or sales-qualified lead</li>
                  <li>You&apos;re a SaaS or service business running Google Ads into HubSpot</li>
                  <li>You often just hired a marketing lead or rebuilt your site</li>
                </ul>
              </div>
              <div className="no">
                <span className="cl-pill cl-pill--bad">Not a fit</span>
                <h3>We&apos;re not the right team if</h3>
                <ul>
                  <li>You run ecommerce with a fixed order value</li>
                  <li>You want someone to buy media for you</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 10. The people */}
        <section id="people" aria-labelledby="people-title" className="section-y band">
          <div className="container-site">
            <div className="cl-head cl-head--c">
              <Chip>Team</Chip>
              <h2 id="people-title">Who does the work</h2>
            </div>
            <div className="cl-team">
              {team.map((p) => (
                <div key={p.id} className="cl-person">
                  <Headshot person={p} size={72} />
                  <div>
                    <b>{p.name}</b>
                    <small>{roles[p.id]}</small>
                    <p>{p.short}</p>
                    {p.linkedin && (
                      <p className="mt-2">
                        <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                          {p.name} on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center"><Link href="/about" className="link font-semibold">About us →</Link></p>
          </div>
        </section>

        {/* 11. FAQ */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--c">
              <Chip>FAQ</Chip>
              <h2 id="questions-title">Questions we get</h2>
            </div>
            <div className="cl-faqwrap">
              <Faq items={faqItems} />
            </div>
          </div>
        </section>

        {/* 12. Closing call to action */}
        <section id="check" aria-labelledby="check-title" className="pb-0">
          <div className="container-site">
            <div className="cl-cta">
              <div>
                <h2 id="check-title">See what your site is sending to Google Ads</h2>
                <p>Free, no logins, and you keep the evidence either way.</p>
              </div>
              <div>
                <CheckForm email={site.email} />
                <p className="cl-help mt-4">
                  Prefer to talk?{" "}
                  <a href={book} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer">
                    Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
