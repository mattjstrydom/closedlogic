import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import CheckForm from "../components/check-form";
import ReportTable from "../components/report-table";
import { Beams, EvidenceSample, FeatureCard, SignalReport } from "../components/cl";
import SiblingServices from "../components/sibling-services";
import { KICKER } from "../components/page-hero";
import { TickList, SectionHead, Accent, Chip } from "../components/ui";
import { bookHref } from "../booking";
import { checkFaqs } from "../faqs";
import { faqNode, jsonLdScript, orgNode, serviceNode } from "../jsonld";
import { offers, fixExamples, fixExtra, fixDeliverablesList, fixGuarantee } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

// The title is the old home page title: this page now carries that content.
export const metadata = pageMetadata({
  title: "Fix HubSpot and Google Ads Conversion Tracking",
  description: "One miscounted Google Ads conversion, fixed at a fixed price. Read-only access, a change log to undo every change, and a 30-day guarantee.",
  path: "/signal-fix",
  absoluteTitle: true,
});

const problems: [string, string, string, string][] = [
  ["01", "A page view counts as a demo", "If opening your demo page or clicking a link counts as a conversion, Google Ads learns to find visitors, not buyers.", "Your reported cost per demo looks lower than it is."],
  ["02", "The click ID never reaches HubSpot", "If the Google click ID isn't stored on the contact, the lead can't be matched back to the ad that brought it.", "You can't tell which campaigns produce pipeline."],
  ["03", "Bidding stops at the form fill", "If qualified stages never reach Google Ads, bidding can't tell a real lead from a form sales threw away.", "Budget keeps flowing to the leads you didn't want."],
];

const journey: [string, string, React.ReactNode, string][] = [
  ["01", "Free check", "Send your work email and website. We look at what your site sends to Google Ads from outside and send you the evidence, with steps you can check yourself.", "$0"],
  ["02", `Fix it for ${offers.fix.price}`, "If you want us to fix it, we agree the scope in writing, work with read-only access where possible, and hand back a before-and-after check and a change log.", `${offers.fix.price} one-time`],
  [
    "03",
    "Keep it running, if you want",
    <>
      Our <Link href="/ops-desk" className="link">Ops Desk</Link> plan handles your ongoing CRM, tracking and automation work each month.
    </>,
    `${offers.pilot.price} pilot, then ${offers.ops.per}`,
  ],
];

const steps: string[][] = [
  ["1. Scope", "We confirm the problem and the fix in writing", "15-minute call or email"],
  ["2. Access", "You grant read-only access, and edit access only to the settings in scope", "10 minutes"],
  ["3. Fix", "We make the change and test it", "None"],
  ["4. Handover", "You get the before-and-after check and change log", "20 minutes"],
  ["5. Access removed", "We confirm in writing that our access has been removed", "None"],
];

const faqs = [
  checkFaqs[0],
  checkFaqs[1],
  { q: "Do I need to change agencies?", a: "No. We can work alongside your agency, or hand them our findings." },
  { q: "Will this change my bidding?", a: "Only if you approve it. We'll tell you which conversion your volume can support for bidding, and why." },
  { q: "What if the problem is bigger than one fix?", a: "We'll tell you before starting, and quote each extra fix separately." },
  { q: "What if the fix doesn't work?", a: "If a conversion we set up doesn't fire as agreed within 30 days of handover, we fix it at no charge." },
  checkFaqs[3],
  { q: "How quickly will you reply?", a: "Within 1 business day." },
];

const mailFix = `mailto:${site.email}?subject=fix`;
const stripePay = "https://buy.stripe.com/14A00i2FP6dA3IN49fafS09";

export default function SignalFix() {
  const book = bookHref("signal-fix");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            orgNode,
            serviceNode("signal-fix", offers.fix.name, "Conversion tracking fix", "One defined Google Ads and HubSpot conversion defect, fixed, tested and documented, with a before-and-after check and a change log.", offers.fix.amount, `${site.url}/signal-fix`),
            faqNode(faqs),
          ]),
        }}
      />
      <Header path="/signal-fix" />
      <main id="main" tabIndex={-1}>
        {/* Hero: the old home page hero */}
        <section id="hero" aria-labelledby="signal-fix-title" className="cl-hero cl-hero-glow">
          <Beams />
          <div className="container-site">
            <div className="cl-hero__grid">
              <div>
                <p className="mb-3 text-[13px] font-medium tracking-wide text-muted">{KICKER}</p>
                <Chip className="!mx-0 !mb-0">HubSpot and Google Ads conversion tracking</Chip>
                <h1 id="signal-fix-title" className="display">Make sure Google Ads learns from real leads, <span className="soft">not page views.</span></h1>
                <p className="lead">We check what your site sends to Google Ads and HubSpot, show you the evidence before you share any access, and fix what&apos;s miscounted for {offers.fix.price}.</p>
                <div className="max-w-[560px]">
                  <CheckForm email={site.email} idPrefix="hero" variant="inline" />
                </div>
                <div className="cl-hero__trust">
                  <a href={book} data-cta="book" data-cta-page="signal-fix" target="_blank" rel="noopener noreferrer" className="cl-btn cl-btn--ghost cl-btn--sm !px-0 hover:!bg-transparent">
                    Or book a 20-minute call →<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
              <div className="cl-hero__panel">
                <span className="fx-chip fx-chip--a" aria-hidden="true">gclid: empty</span>
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
        <SiblingServices current="/signal-fix" />

        {/* The problem (moved from the old home page) */}
        <section id="problem" aria-labelledby="problem-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--split" data-reveal>
              <Chip>The problem</Chip>
              <h2 id="problem-title">Three ways Google Ads <span className="soft">ends up chasing the wrong people</span></h2>
              <p>Smart Bidding optimizes for whatever you tell it is a conversion. If that signal is wrong, so is every bid.</p>
            </div>
            <div className="cl-grid3">
              {problems.map(([i, t, b, c], n) => (
                <FeatureCard key={t} index={i} title={t} visual={(["a", "b", "c"] as const)[n]} foot={<><b>What it costs:</b> {c}</>}>
                  {b}
                </FeatureCard>
              ))}
            </div>
          </div>
        </section>

        {/* From free check to fixed (moved from the old home page) */}
        <section id="from-check" aria-labelledby="from-check-title" className="section-y band">
          <div className="container-site">
            <div className="cl-steps">
              <div>
                <div className="cl-head" data-reveal>
                  <Chip>How it works</Chip>
                  <h2 id="from-check-title">From free check to fixed, <span className="soft">in three steps</span></h2>
                  <p>You see the evidence before you share any access. Every change is documented and can be undone.</p>
                </div>
                <div className="mt-8"><EvidenceSample /></div>
                <p className="cl-help mt-3">Illustrative example, not a client result.</p>
              </div>
              <ol className="m-0 list-none p-0">
                {journey.map(([n, t, b, meta]) => (
                  <li key={t} className="cl-step" data-reveal>
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

        <section id="covers" aria-labelledby="covers-title" className="section-y">
          <div className="container-site">
            <SectionHead id="covers">What one fix <Accent>covers.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[52rem]">
              <p className="text-text-l">We fix one defined problem between Google Ads and HubSpot, for example:</p>
              <TickList items={fixExamples} className="mt-6 text-text-m" />
              <p className="mt-6 text-body">{fixExtra}</p>
              <p className="mt-4"><Link href="/method#checks" className="link font-semibold">See the checks we run</Link></p>
            </div>
          </div>
        </section>

        <section id="get" aria-labelledby="get-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="get">What you <Accent>get.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[52rem]">
              <TickList items={fixDeliverablesList} className="text-text-m" />
            </div>
            <p className="mx-auto mt-6 max-w-[52rem] text-center text-body">
              <strong className="font-semibold text-ink">What happens after the fix.</strong> If you want the connection watched or more ops work done, <Link href="/ops-desk" className="link">Ops Desk</Link> picks it up each month.
            </p>
          </div>
        </section>

        <section id="how" aria-labelledby="how-title" className="section-y">
          <div className="container-site">
            <SectionHead id="how">How a fix <Accent>works.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[60rem]">
              <ReportTable caption="The five steps of a Signal Fix" head={["Step", "What happens", "Your time"]} rows={steps} />
            </div>
            <p className="mx-auto mt-6 max-w-[52rem] text-center text-body">
              Read how we handle access in our <Link href="/access" className="link">access policy</Link>.
            </p>
          </div>
        </section>

        <section id="guarantee" aria-labelledby="guarantee-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="guarantee">The <Accent>guarantee.</Accent></SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">{fixGuarantee}</p>
          </div>
        </section>

        {/* Who it's for (moved from the old home page) */}
        <section id="for" aria-labelledby="for-title" className="section-y">
          <div className="container-site">
            <div className="cl-head cl-head--split" data-reveal>
              <Chip>Who it&apos;s for</Chip>
              <h2 id="for-title">Built for B2B teams <span className="soft">running Google Ads into HubSpot</span></h2>
            </div>
            <div className="cl-fit" data-reveal>
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

        <section id="questions" aria-labelledby="questions-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="questions">Questions.</SectionHead>
            <div className="mx-auto mt-12 max-w-[900px]">
              <Faq items={faqs} />
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Ready to fix it?" body={`${offers.fix.price}, one defined fix. We confirm the written scope before any work starts.`}>
          <a href={book} data-cta="book" data-cta-page="signal-fix" target="_blank" rel="noopener noreferrer" className="btn w-full sm:w-auto">
            Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={stripePay} target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto">
            Pay for Signal Fix<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={mailFix} className="link font-semibold">Or email us “fix”</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
