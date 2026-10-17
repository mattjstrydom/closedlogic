import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import "./motion.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import { CalButton, SampleButton, TeardownButton } from "./components/cta";
import { Accent, Chip, Numeral, SectionHead, Tick, TickList } from "./components/ui";
import { Slot } from "./components/ph";
import { ConsentMock, ConversionMock, CookieMock } from "./components/mocks";
import A1LeadToBid from "./components/a1-lead-to-bid";
import HeroTabs from "./components/hero-tabs";
import ChecksPreview from "./components/checks-preview";
import PipelineFlow from "./components/PipelineFlow";
import ComparisonGrid from "./components/comparison-grid";
import { PlatformPills } from "./components/trust";
import { checkItems } from "./checks-data";
import A2SecondaryToPrimary from "./components/a2-secondary-to-primary";
import A3ChangeLog from "./components/a3-change-log";
import C3Finding from "./components/c3-finding";
import C4Count from "./components/c4-count";
import { site } from "./site.config";
import { motionScript } from "./motion-script";
import { sharedOpenGraph, ogImage, twitterImage } from "./seo";

const homeTitle = `${site.brand} | Google Ads should bid on pipeline, not form fills`;
const description =
  "We fix the HubSpot to Google Ads connection so Smart Bidding learns from the leads your sales team qualifies, not form fills. $1,200, fixed.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description,
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, url: "/", title: homeTitle, description, images: [ogImage] },
  twitter: { card: "summary_large_image", title: homeTitle, description, images: [twitterImage] },
};

const checkMocks: Record<number, React.ReactNode> = { 0: <ConversionMock />, 3: <CookieMock />, 5: <ConsentMock /> };
const checks = checkItems.map(({ q }, i) => ({ q, mock: checkMocks[i] }));

const included = [
  "A written report, with a screenshot for every finding",
  "A change log of everything we touched, with how to reverse each change",
  "A recorded screen walkthrough of the findings",
  "A 30-minute handover call",
  "A free recheck of your counts and sync status at day 30",
];

const steps: [string, React.ReactNode][] = [
  ["Fit call, 20 minutes.", "Tell us your website and Marketing Hub tier. If it's not a fit, we'll say so on the call."],
  [
    "Kickoff.",
    <>
      You pay 50% by Stripe invoice and invite us to Google Ads, HubSpot and, if needed, Tag Manager (see “<Link href="#access" className="link">Access and security</Link>”).
    </>,
  ],
  ["Check and proposal.", "We run the seven checks and send the proposed changes for your approval."],
  ["Fix and report.", "We make the approved changes and deliver the report within 7 business days of access, not counting time waiting for your approval. The second 50% is due on delivery."],
  ["Handover.", "A 30-minute call and the recorded walkthrough."],
  ["Day 30 recheck, free.", "We check your counts and sync status again. On long B2B sales cycles, the full effect on bidding can take longer than 30 days."],
];

const priceTerms = [
  "Half when work starts, half when the report is delivered, by Stripe invoice.",
  "Covers everything on the check and fix lists. Anything outside them is quoted before any work starts.",
  "If none of the seven checks finds anything that needs changing, you pay only the first half and keep the report.",
  "Delivered within 7 business days of access, not counting time waiting for your approval.",
];

const monthlyDirect = [
  "Monthly checks of the HubSpot to Google Ads connection: sync errors, the gap between HubSpot and Google Ads counts, click ID coverage, changes to Primary conversions, and consent signals.",
  "A monthly note on what changed and what needs a decision.",
  "Fixes for anything that breaks, up to 1.5 hours a month.",
];

const working = [
  "HubSpot's sync status shows no error.",
  "Google Ads conversion diagnostics show it as active, with no error.",
  "It's set as Primary or Secondary, as agreed in the report.",
  "A test contact we move through that stage is recorded.",
];

const notIncluded = [
  "Code changes on your website outside Tag Manager",
  "Redesigning lifecycle stages or lead scoring (we'll flag problems and quote separately)",
  "Campaign management, keywords or ad copy",
  "Salesforce as your CRM",
  "Syncs run from a Google Ads manager account",
];

const accessNeeds: [string, string][] = [
  ["Google Ads:", "Admin on your individual Google Ads account. HubSpot needs Admin on the individual account to connect it, and it can't connect manager accounts."],
  ["HubSpot:", "Super Admin is easiest. At minimum we need Publish access to the ads tools (HubSpot's requirement for connecting ad accounts), plus edit access to properties, workflows and lifecycle settings."],
  ["Tag Manager:", "Publish on the container, only if the fix list touches tags."],
];

const accessOurs = [
  "Named user invites only, never shared passwords. Our accounts use two-step login.",
  "You can revoke our access at any time.",
  "We use only the access the work needs. We don't export or copy contact records, and screenshots blur personal data.",
  "Working files are deleted within 30 days of the work ending.",
  "We remove our access at handover unless you're on the monthly plan.",
];

const faqs: FaqItem[] = [
  {
    q: "Do I need Marketing Hub Professional?",
    a: "No. Marketing Hub Starter supports lifecycle stage conversion events too, up to five events. Professional allows up to 50 and Enterprise up to 100.",
  },
  {
    q: "Will this disrupt my campaigns?",
    a: "Changing primary conversions changes what Smart Bidding optimises for. That's the point of the work. Google says bidding takes 1 to 2 conversion cycles in most cases to relearn after a change, so we agree each change and its timing with you before we make it.",
  },
  {
    q: "Does lead volume matter?",
    a: "Yes. Google says the learning period depends on the number of conversions, and recommends judging results over a month or longer with at least 30 conversions (50 for Target ROAS). If a qualified stage only gets a handful a month, we'll tell you in the report.",
  },
  {
    q: "Will past leads be fixed too?",
    a: "HubSpot's own sync only counts stage changes that happen after an event is created. Results count from handover forward.",
  },
  {
    q: "Will my HubSpot and Google Ads counts match after the fix?",
    a: "Not necessarily. HubSpot says the totals may not match because Google calculates each metric differently. We explain the gap in the report and fix the parts that are errors.",
  },
  {
    q: "Do you work with agencies?",
    a: (
      <>
        Yes. Agencies can buy a check for a client and deliver it under their own name. <Link href="/agencies" className="link">See how we work with agencies</Link>.
      </>
    ),
  },
  {
    q: "What access do you need, and is it safe?",
    a: (
      <>
        Admin on your individual Google Ads account, Publish access to HubSpot&apos;s ads tools at minimum, and Tag Manager only if a tag needs changing. Named invites only, every change logged with how to reverse it. See “<Link href="#access" className="link">Access and security</Link>”.
      </>
    ),
  },
  {
    q: "Will you change our website?",
    a: "No. We work in Google Ads, HubSpot and Tag Manager settings. Code changes outside Tag Manager aren't included.",
  },
  {
    q: "What happens after handover?",
    a: "Every change is in the change log, and we recheck your counts for free at day 30. If you'd like us to keep watching the connection, that's the monthly plan. We remove our access at handover unless you're on the monthly plan.",
  },
  {
    q: "Where are you based, and how do we pay?",
    a: `We work from South Africa. ${site.legalLine}. We invoice in USD through Stripe.`,
  },
];

const ORG = `${site.url}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: site.brand,
      legalName: site.legalName,
      url: site.url,
      email: site.email,
      description: "A fixed-price check and fix of the HubSpot to Google Ads connection, so Smart Bidding learns from qualified leads.",
      founder: { "@type": "Person", "@id": `${site.url}/#matt`, name: "Matt Strydom", sameAs: [site.linkedin] },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.brand, inLanguage: "en-ZA", publisher: { "@id": ORG } },
    {
      "@type": "Service",
      "@id": `${site.url}/#check`,
      name: "HubSpot to Google Ads conversion check and fix",
      serviceType: "Conversion tracking audit and fix",
      provider: { "@id": ORG },
      description:
        "Seven checks of the HubSpot to Google Ads connection, fixes to the settings that need changing, a report, a change log with how to reverse each change, and a day 30 recheck.",
      offers: { "@type": "Offer", price: "1200", priceCurrency: "USD", url: `${site.url}/#pricing` },
    },
  ],
};

const rowLine = "border-t border-rule first:border-0";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main" tabIndex={-1}>
        {/* 1. Hero */}
        <section id="hero" aria-labelledby="hero-title" className="hero-grid">
          <div className="container-site pb-[110px] pt-24 max-lg:pb-16 max-lg:pt-14">
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="chip">HubSpot to Google Ads conversion fix</p>
              <h1 id="hero-title" className="heading-center max-w-[17ch] text-title-xl">
                Google Ads should bid on <Accent>pipeline, not form fills.</Accent>
              </h1>
              <p className="lead max-w-[46rem]">
                We check how HubSpot sends lifecycle stages to Google Ads and fix it inside your own accounts, with your sign-off, so Smart Bidding learns from the stages your sales team qualifies. Fixed $1,200 scope, delivered within 7 business days of access.
              </p>
              <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
                <CalButton className="w-full sm:w-auto" />
                <TeardownButton className="w-full sm:w-auto" />
              </div>
              <p className="max-w-[40rem] text-[1.05rem] text-body">
                <span className="font-semibold text-ink">$1,200 fixed.</span> If none of our seven checks finds anything that needs changing, you pay only the first half and keep the report.
              </p>
              <p className="tag">A named lead on every check</p>
            </div>
            <div className="mt-14 flex flex-col items-center gap-8">
              <HeroTabs
                tabs={[
                  { label: "Lead to bid", panel: <A1LeadToBid /> },
                  { label: "The seven checks", panel: <ChecksPreview /> },
                ]}
              />
              <PlatformPills names={["HubSpot Marketing Hub", "Google Ads Data Manager", "Enhanced conversions for leads"]} className="max-w-[640px] justify-center" />
            </div>
          </div>
        </section>

        <section aria-label="How a lead reaches bidding" className="section-y band">
          <div className="container-site">
            <PipelineFlow />
          </div>
        </section>

        {/* 1b. Who this is for */}
        <section id="for" aria-labelledby="for-title" className="section-y">
          <div className="container-site">
            <SectionHead id="for">Built for B2B teams on HubSpot and Google Ads</SectionHead>
            <div className="bento mx-auto mt-14 max-w-[58rem] space-y-6 text-text-l">
              <p className="lead">This check fits if all of these are true:</p>
              <TickList
                items={[
                  "You run Google Ads with Smart Bidding, such as Maximize conversions or Maximize conversion value.",
                  "Your leads go into HubSpot, and your sales team moves them through lifecycle stages there.",
                  "You have Marketing Hub Starter, Professional or Enterprise.",
                  "Enough leads reach a qualified stage each month for bidding to learn from. We check this on the fit call, and if the volume isn't there, we'll tell you.",
                ]}
              />
              <p className="border-t border-solid border-rule pt-5 text-body">It isn&apos;t a fit if your CRM is Salesforce, or your HubSpot sync runs from a Google Ads manager account.</p>
            </div>
          </div>
        </section>

        {/* 2. The problem */}
        <section id="problem" aria-labelledby="problem-title">
          <div className="panel-navy">
            <div className="container-site">
              <SectionHead id="problem" chip="The problem" className="on-navy-text">
                Syncing a stage <Accent>isn&apos;t the same as bidding on it</Accent>
              </SectionHead>
              <p className="big-statement on-navy-text mx-auto mt-8 max-w-[34ch] text-center">HubSpot can show MQLs and SQLs in Google Ads while Smart Bidding ignores them.</p>
              <div className="mt-14 grid gap-7 lg:grid-cols-3">
                <div className="card text-text-l">
                  <p>If HubSpot already sends your lifecycle stages to Google Ads, the question is whether Smart Bidding uses them. A stage set as Secondary is reported but not bid on, unless a custom goal includes it. A Primary stage outside the goal your campaigns bid on isn&apos;t bid on either.</p>
                </div>
                <div className="card space-y-4 text-text-m">
                  <p>
                    The fix exists. HubSpot can send lifecycle stages to Google Ads as conversions, and Google Ads can pull them in through Data Manager. But Google only bids on a conversion that is set as Primary and sits in a goal your campaigns use. So a connection can sync without those stages ever being used for bidding.
                  </p>
                  <p>And when the numbers disagree, HubSpot Support won&apos;t investigate the gap unless there&apos;s a sync error.</p>
                </div>
                <div className="card text-text-m">
                  <p>
                    If your setup still uses offline conversion import, there&apos;s one more reason to look. Google calls it a legacy feature and recommends enhanced conversions for leads. Since 15 June 2026, Google has moved offline conversion uploads to its Data Manager API and blocks them in the Google Ads API for developer tokens that weren&apos;t already active.
                  </p>
                </div>
              </div>
              <C4Count />
            </div>
          </div>
          <div className="ctaband mt-20">
            <div className="container-site flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-[26ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] font-bold tracking-[-0.02em]">Not sure if your SQLs are set to Secondary or ignored by Smart Bidding?</p>
              <CalButton className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 3. Seven questions */}
        <section id="checks" aria-labelledby="checks-title" className="section-y">
          <div className="container-site">
            <SectionHead id="checks" chip="The check">
              Seven questions we answer <Accent>in every check</Accent>
            </SectionHead>
            <ol className="mt-14 grid gap-7 lg:grid-cols-2">
              {checks.map(({ q, mock }, i) => (
                <li key={q} className={`group card ${mock && i === 0 ? "lg:col-span-2" : ""}`}>
                  <div className={mock && i === 0 ? "grid gap-8 lg:grid-cols-2 lg:items-center" : ""}>
                    <div>
                      <Numeral n={i + 1} pad />
                      <p className="mt-4 text-[1.2rem] leading-[1.5] font-medium text-ink">{q}</p>
                    </div>
                    {mock && <div className="min-w-0">{mock}</div>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. We fix it */}
        <section id="fix" aria-labelledby="fix-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="fix" chip="Sign-off">
              Seven checks. One clean setup. <Accent>Your sign-off on every change.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 grid max-w-[46rem] gap-5 text-center text-text-xl text-body">
              <p>We fix everything on the list that lives in Google Ads, HubSpot or Tag Manager settings. You see every proposed change before we make it, and nothing changes without your approval.</p>
              <p>You also choose when bidding changes go live. Google says Smart Bidding takes some time to relearn after a change to conversion goals or actions (1 to 2 conversion cycles in most cases).</p>
            </div>
            <C3Finding label={site.c3Label} />
            <A2SecondaryToPrimary />
          </div>
        </section>

        {/* 5. What you get */}
        <section id="what-you-get" aria-labelledby="what-you-get-title" className="section-y">
          <div className="container-site">
            <SectionHead id="what-you-get" chip="What you get">
              See exactly what you&apos;ll get <Accent>before you pay</Accent>
            </SectionHead>
            <div className="mt-14 grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
              <div>
                <p className="lead">Our sample report is built on a fictional account, finding by finding: what we saw, why it matters, the change, and how to reverse it.</p>
                <SampleButton className="mt-8 w-full sm:w-auto">Read the sample report</SampleButton>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {included.map((t) => (
                  <li key={t} className="card flex items-start gap-3 p-6 text-text-m">
                    <Tick className="mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="how" chip="How it works">How it works</SectionHead>
            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
              <ol className="grid gap-5">
                {steps.map(([lead, rest], i) => (
                  <li key={lead} className="group card p-6">
                    <Numeral n={i + 1} pad className="!text-[3.6rem]" />
                    <p className="mt-3 text-text-l">
                      <span className="font-semibold text-ink">{lead}</span> {rest}
                    </p>
                  </li>
                ))}
              </ol>
              <A3ChangeLog />
            </div>
          </div>
        </section>

        {/* 7. Pricing (C2) and monthly plan */}
        <section id="pricing" aria-labelledby="pricing-title" className="section-y">
          <span id="price" aria-hidden="true" />
          <div className="container-site">
            <Chip>Pricing</Chip>
            <h2 id="pricing-title" className="heading-center text-title-l">
              One price.
              <br className="max-lg:hidden" /> <Accent>A named lead on every check.</Accent>
            </h2>
            <div className="mx-auto mt-14 grid max-w-[68rem] grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1fr] lg:items-start">
              {/* Check and fix */}
              <div className="card bento-lift flex flex-col gap-5 p-8 sm:p-11">
                <p className="font-display text-[1.05rem] font-semibold text-ink">Check and fix</p>
                <p className="amt">
                  $1,200<small>, fixed</small>
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {["Seven checks", "Google Ads", "HubSpot", "Tag Manager", "7 business days of access"].map((t) => (
                    <li key={t} className="pill-scope">{t}</li>
                  ))}
                </ul>
                <TickList items={[priceTerms[0], priceTerms[1], priceTerms[3]]} className="text-text-m" />
                <p className="guar flex gap-3 text-text-m">
                  <Tick size={22} className="mt-0.5" />
                  <span><strong className="block font-medium">The pay-half guarantee</strong>{priceTerms[2]}</span>
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-4">
                  <CalButton className="w-full sm:w-auto" />
                </div>
                <p className="text-text-s text-muted">If it&apos;s not a fit, we&apos;ll say so on the call.</p>
              </div>

              {/* Monthly plan */}
              <div className="card flex flex-col gap-5 p-8 sm:p-11">
                <h3 className="text-title-m">
                  Monthly plan: <Accent small>we keep the connection fixed</Accent>
                </h3>
                <p className="amt">
                  $750<small> a month</small>
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {["One HubSpot portal", "One Google Ads account", "Up to 1.5 hours a month"].map((t) => (
                    <li key={t} className="pill-scope">{t}</li>
                  ))}
                </ul>
                <p className="text-text-l">A monitored-account plan, not an hours bank. $750 a month for one HubSpot portal and one Google Ads account.</p>
                <p className="font-display font-semibold text-ink">Every month:</p>
                <TickList items={monthlyDirect} className="text-text-m" />
                <p className="text-text-s text-muted">Other ops work (routing, clean-up, reporting, new builds) is quoted separately in blocks at $150 an hour, 5-hour minimum.</p>
                <p className="text-text-s text-muted">3-month minimum, then month to month with 30 days&apos; notice. Billed monthly in advance by Stripe subscription.</p>
                <div className="mt-2 lg:mt-auto lg:pt-4">
                  <CalButton className="w-full sm:w-auto" />
                </div>
              </div>
            </div>

            <ComparisonGrid />
            {/* Company details */}
            <div className="card mt-7 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div className="min-w-0">
                <p className="font-display text-title-m">{site.brand}</p>
                <p className="mt-3 text-text-l text-body">Every check has a named lead from our team who joins your fit call and stays on your account through handover, so nothing gets handed off mid-check.</p>
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-text-m sm:grid-cols-[120px_1fr] sm:gap-y-3">
                <dt className="text-muted">Company</dt>
                <dd className="mb-3 [text-wrap:balance] sm:mb-0">{site.legalLine}.</dd>
                <dt className="text-muted">Billing</dt>
                <dd className="mb-3 sm:mb-0">Invoices in USD through Stripe.</dd>
                <dt className="text-muted">Reply time</dt>
                <dd className="mb-3 sm:mb-0">
                  <Slot value={site.replyTime} />
                </dd>
                <dt className="text-muted">Booking</dt>
                <dd>
                  <a href={site.bookPath} target="_blank" rel="noopener noreferrer" className="link">Book a 20-minute fit call<span className="sr-only"> (opens in a new tab)</span></a>. If it&apos;s not a fit, we&apos;ll say so on the call.
                </dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 8. Agencies: one line, the rest lives on /agencies */}
        <section id="agencies" aria-label="Agencies" className="pb-14">
          <div className="container-site">
            <p className="text-text-l">
              <Link href="/agencies" className="link inline-flex min-h-6 items-center">Agency? See how we work under your name.</Link>
            </p>
          </div>
        </section>

        {/* 9. The fix cap */}
        <section id="promise" aria-labelledby="promise-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="promise" chip="The fix cap">
              If it isn&apos;t working at handover, <Accent>we keep going (within limits)</Accent>
            </SectionHead>
            <div className="mx-auto mt-14 max-w-[68rem]">
              <p className="lead text-center">For each conversion action on the fix list, “working” means all four of these:</p>
              <ol className="cap-grid mt-10">
                {working.map((t, i) => (
                  <li key={t} className="card flex flex-col gap-3 p-6 text-text-m">
                    <span className="note-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <div className="card mt-7 grid gap-5 text-text-m lg:grid-cols-2 lg:gap-10">
                <p>Working doesn&apos;t mean the HubSpot and Google Ads counts match. HubSpot&apos;s own documentation says the totals may not match.</p>
                <p>If something on the fix list isn&apos;t working at handover, we put in up to 10 extra hours within 30 days of handover at no extra cost. If an in-scope item still isn&apos;t working at that cap, we refund the second payment.</p>
                <p className="text-muted lg:col-span-2">
                  This doesn&apos;t cover causes outside our scope (such as website code outside Tag Manager), changes made by you or your agency after handover, Google or HubSpot outages, or low lead volume. Full details are in our{" "}
                  <Link href="/terms" className="link">terms</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Not included, and Access and security */}
        <section aria-label="Scope and access" className="section-y">
          <div className="container-site grid gap-7 lg:grid-cols-[5fr_7fr] lg:items-start">
            <div id="not-included" className="card">
              <h2 className="text-title-m">Not included</h2>
              <ul className="mt-6 text-text-m">
                {notIncluded.map((t) => (
                  <li key={t} className={`py-3 first:pt-0 ${rowLine}`}>{t}</li>
                ))}
              </ul>
            </div>
            <div id="access" className="card">
              <h2 className="text-title-m">Access and security</h2>
              <dl className="mt-6 space-y-3 text-text-m">
                {accessNeeds.map(([dt, dd]) => (
                  <div key={dt}>
                    <dt className="inline font-semibold text-ink">{dt}</dt> <dd className="inline">{dd}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-display font-semibold text-ink">How we handle it:</p>
              <TickList items={accessOurs} className="mt-4 text-text-m" />
            </div>
          </div>
        </section>

        {/* 11. Proof */}
        <section id="proof" aria-labelledby="proof-title" className="section-y band">
          <div className="container-site">
            <div className="card mx-auto max-w-[68rem]">
              <h2 id="proof-title" className="heading-center text-title-l">
                Proof
              </h2>
              {site.caseStudy && (
                <div className="mt-6 max-w-[64ch] text-text-l">
                  <h3 className="text-title-xs">{site.caseStudy.title}</h3>
                  <p className="mt-2">{site.caseStudy.body}</p>
                  <p className="mt-2 text-muted">{site.caseStudy.attribution}</p>
                </div>
              )}
              <p className="mt-6 max-w-[64ch] text-text-l text-body">
                {site.caseStudy ? "Until then, our " : "Our "}
                <Link href="/sample-report" className="link">sample report</Link> shows exactly what you receive. It&apos;s built on a fictional account: the company, figures and screenshots are illustrative, not a client result.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <p className="text-text-m text-muted">Inside your own accounts</p>
                <PlatformPills />
              </div>
            </div>
          </div>
        </section>

        {/* 12. Questions */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions" chip="Questions">Questions</SectionHead>
            <div className="mx-auto mt-12 max-w-[900px]">
              <Faq items={faqs} />
            </div>
          </div>
        </section>

        {/* 13. Final call to action */}
        <section id="request" aria-labelledby="request-title" className="section-y band">
          <div className="container-site">
            <div className="mx-auto max-w-[64rem] text-center">
              <h2 id="request-title" className="heading-center text-title-l">
                See whether your stages are <Accent dark>being used for bidding</Accent>
              </h2>
              <CalButton className="mt-10 w-full sm:w-auto" />
              <p className="mt-8 text-muted">
                Prefer email? <a href={`mailto:${site.email}`} className="link">{site.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Script id="motion" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: motionScript }} />
    </>
  );
}
