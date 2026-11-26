import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import CtaBand from "./components/cta-band";
import Headshot from "./components/headshot";
import HeroLoop from "./components/hero-loop";
import { Beams, FeatureCard, PricingTier, TrustStrip } from "./components/cl";
import { Chip } from "./components/ui";
import { agencyUrl, bookUrl } from "./booking";
import { homeFaqs } from "./faqs";
import { faqNode, jsonLdScript, MATT_ID, ORG_ID } from "./jsonld";
import { offers } from "./offers";
import { sharedOpenGraph, ogImage, twitterImage } from "./seo";
import { site } from "./site.config";
import { team } from "./team";

// Title is absolute (no brand suffix added) so it reads exactly as written.
const homeTitle = "Fractional marketing ops for B2B teams | Closed Logic";
const shareTitle = "Fractional marketing ops for B2B teams";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, url: "/", title: shareTitle, description: site.description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: shareTitle, description: site.description, images: [twitterImage] },
};

const reassurance = ["Prices on the site", "Read-only access by default", "Every change can be undone", "We sell no media"];

const handle: [string, string, string][] = [
  ["01", "CRM setup and cleanup", "Properties, lifecycle stages, duplicates and data your team can trust."],
  ["02", "Tracking and attribution", "What your site records, where it goes, and whether the numbers agree."],
  ["03", "Ad platform signals", "Making sure your ad platforms learn from qualified leads, not page views."],
  ["04", "Lead routing and handoff", "The right leads reach the right person, fast."],
  ["05", "Automation and integrations", "Workflows and connections between your tools that don't break silently."],
  ["06", "Reporting", "Dashboards built on data you've already checked."],
];

const steps: [string, string, string][] = [
  ["01", "Talk to us", "A 20-minute call about what's broken or what's piling up."],
  ["02", "Agree the scope in writing", "Fixed price, clear deliverables, the least access the job needs."],
  ["03", "We do the work", "You get a change log with how to reverse every change."],
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
  const book = bookUrl("home-umbrella", "home");
  const bookFooter = bookUrl("home-umbrella-footer", "home");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/" />
      <main id="main" tabIndex={-1}>
        {/* Hero */}
        <section id="hero" aria-labelledby="hero-title" className="cl-hero cl-hero-glow">
          <Beams />
          <div className="container-site">
            <div className="mx-auto flex max-w-[48rem] flex-col items-center text-center">
              <Chip className="!mx-auto !mb-0">Marketing operations</Chip>
              <h1 id="hero-title" className="display">Fractional marketing ops <span className="soft">for B2B teams.</span></h1>
              <p className="lead">Without hiring for it. Fixed-scope jobs and monthly plans, at published prices. We set up, fix and run the systems between your website, CRM and ad platforms.</p>
              <div className="mt-2 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
                <a href={book} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer" className="btn w-full sm:w-auto">
                  Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <Link href="/free-check" className="link font-semibold">Or get a free check of what your site sends to Google Ads</Link>
              </div>
              <p className="mt-4 text-[15px] text-body">
                Backlog piling up? <Link href="/ops-desk" className="link font-semibold">Start with a one-request Ops Desk pilot ({offers.pilot.price}).</Link>
              </p>
              <p className="cl-help mt-2">No obligation. We reply within 1 business day.</p>
              <HeroLoop />
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <TrustStrip items={reassurance} />

        {/* What we handle */}
        <section id="handle" aria-labelledby="handle-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--split" data-reveal>
              <Chip>What we do</Chip>
              <h2 id="handle-title">The work that falls <span className="soft">between marketing, sales and engineering</span></h2>
              <p>Most B2B teams don&apos;t need a full-time ops hire. They need someone who can fix things properly and keep them running.</p>
            </div>
            <div className="cl-grid3">
              {handle.map(([i, t, b]) => (
                <FeatureCard key={t} index={i} title={t}>
                  {b}
                </FeatureCard>
              ))}
            </div>
          </div>
        </section>

        {/* How we work together: the ladder */}
        <section id="ladder" aria-labelledby="ladder-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--split" data-reveal>
              <Chip>The ladder</Chip>
              <h2 id="ladder-title">How we <span className="soft">work together</span></h2>
              <p>Start free, fix one thing, then keep us on if it makes sense.</p>
            </div>
            <div className="cl-grid3">
              <FeatureCard index="01" title="Free check" foot={<><b>Price:</b> Free</>}>
                For anyone who suspects their Google Ads tracking is off. We look from outside, with no logins, and send you the evidence.
              </FeatureCard>
              <FeatureCard index="02" title="A fixed job" foot={<><b>Price:</b> {offers.fix.name} {offers.fix.price}, or the {offers.audit.name} {offers.audit.price}</>}>
                For one defined problem. Signal Fix repairs a tracking defect. The audit checks a larger setup end to end.
              </FeatureCard>
              <FeatureCard index="03" title="Monthly" foot={<><b>Price:</b> {offers.ops.name} {offers.ops.per}, or {offers.measurement.name} {offers.measurement.per}</>}>
                For ongoing work. Ops Desk handles your backlog one request at a time. The Measurement Lead is for larger accounts.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* Ways to work with us */}
        <section id="offers" aria-labelledby="offers-title" className="section-y band">
          <div className="container-site">
            <div className="cl-head cl-head--split" data-reveal>
              <Chip>Pricing</Chip>
              <h2 id="offers-title">Start with one fix, <span className="soft">or hand us the backlog</span></h2>
            </div>
            <div className="cl-pricing cl-pricing--4" data-reveal>
              <PricingTier name={offers.fix.name} price={offers.fix.price} per="one-time" desc={`One miscounted Google Ads conversion fixed and documented, with a ${offers.fix.guaranteeDays}-day guarantee. Starts with a free check.`}>
                <Link href="/signal-fix" className="btn">See Signal Fix</Link>
              </PricingTier>
              <PricingTier name={offers.audit.name} price={offers.audit.price} per="one-time" desc="Ten checks across Google Ads, your CRM and your reporting, with a 90-day baseline and a roadmap. For larger accounts.">
                <Link href="/pipeline-truth-audit" className="btn-outline">See the audit</Link>
              </PricingTier>
              <PricingTier name={offers.ops.name} price={offers.pilot.price} per={`pilot, then ${offers.ops.per}`} desc="Your ongoing marketing ops backlog, handled each month. One active request at a time, weekly updates.">
                <Link href="/ops-desk" className="btn-outline">See the plan</Link>
              </PricingTier>
              <PricingTier name={offers.measurement.name} price={offers.measurement.price} per="/month" desc={`A senior ops and measurement lead for larger accounts. ${offers.measurement.hours} hours a month, 3-month term.`}>
                <Link href="/measurement-lead" className="btn-outline">See the Measurement Lead</Link>
              </PricingTier>
            </div>
            <p className="mt-8 text-center text-text-m text-body">
              Not sure which fits? <Link href="/contact" className="link font-semibold">Talk to us</Link>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y">
          <div className="container-site">
            <div className="cl-steps">
              <div className="cl-head" data-reveal>
                <Chip>How it works</Chip>
                <h2 id="how-title">From first call to done, <span className="soft">in three steps</span></h2>
                <p>You agree the scope before any work starts. Every change is documented and can be undone.</p>
              </div>
              <ol className="m-0 list-none p-0">
                {steps.map(([n, t, b]) => (
                  <li key={t} className="cl-step" data-reveal>
                    <span className="step-badge" aria-hidden="true">{n}</span>
                    <div>
                      <h3>{t}</h3>
                      <p>{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Why independent (unchanged) */}
        <section id="independent" aria-labelledby="independent-title" className="section-y band">
          <div className="container-site">
            <div className="cl-trust2">
              <div className="cl-head" data-reveal>
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

        {/* Who it's for */}
        <section id="for" aria-labelledby="for-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--split" data-reveal>
              <Chip>Who it&apos;s for</Chip>
              <h2 id="for-title">Built for B2B teams <span className="soft">without a full-time ops person</span></h2>
            </div>
            <div className="cl-fit" data-reveal>
              <div className="yes">
                <span className="cl-pill cl-pill--good">Good fit</span>
                <h3>You&apos;re likely a fit if</h3>
                <ul>
                  <li>You sell through demos, consultations or a sales process</li>
                  <li>You don&apos;t have a dedicated ops person, or yours is stretched</li>
                  <li>You&apos;ve just hired a marketing lead, changed tools or rebuilt your site</li>
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

        {/* For agencies */}
        <section id="agencies" aria-labelledby="agencies-title" className="section-y">
          <div className="container-site">
            <div className="cl-fract">
              <div>
                <b id="agencies-title">For agencies</b>
                <p>Agencies: we fix tracking and HubSpot ops for your clients, under your name or ours. Same published prices.</p>
              </div>
              <a href={agencyUrl("agencies-cta", "home")} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Book an agency call<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>

        {/* The people (unchanged) */}
        <section id="people" aria-labelledby="people-title" className="section-y band">
          <div className="container-site">
            <div className="cl-head cl-head--c" data-reveal>
              <Chip>Team</Chip>
              <h2 id="people-title">Who does the work</h2>
            </div>
            <div className="cl-team" data-reveal>
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

        {/* FAQ */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--c" data-reveal>
              <Chip>FAQ</Chip>
              <h2 id="questions-title">Questions we get</h2>
            </div>
            <div className="cl-faqwrap" data-reveal>
              <Faq items={faqItems} />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CtaBand id="check" title="Tell us what's broken, or what's piling up.">
          <a href={bookFooter} data-cta="book" data-cta-page="home" target="_blank" rel="noopener noreferrer" className="btn w-full sm:w-auto">
            Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/free-check" className="link font-semibold">Or start with a free Google Ads check</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
