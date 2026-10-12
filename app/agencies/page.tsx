import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import Faq, { type FaqItem } from "../components/faq";
import { CalButton, TeardownButton } from "../components/cta";
import { Accent, SectionHead, TickList } from "../components/ui";
import C1Report from "../components/c1-report";
import { site } from "../site.config";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Closed Logic for agencies | HubSpot to Google Ads, under your name",
  description:
    "We check and fix how your client's HubSpot sends lifecycle stages to Google Ads, delivered under your agency's name. Paid pilot from $900.",
  path: "/agencies",
  absoluteTitle: true,
});

const pilot: React.ReactNode[] = [
  <>
    <strong className="font-medium">$900</strong> with a short case study and a 20-minute debrief, or <strong className="font-medium">$1,200</strong> without. The case study uses wording you approve.
  </>,
  "One HubSpot portal and one Google Ads account, the client's own account rather than a manager account.",
  "The seven checks, with fixes in HubSpot, Google Ads and Tag Manager settings.",
  "White-label report, change log with undo steps, recorded walkthrough and a 30-minute handover with your team.",
  "Free day 30 recheck. If you join the monthly plan within 14 days of the recheck, the pilot fee is credited against your monthly invoices until it's used up.",
];

const plans: [string, string][] = [
  ["1", "$500"],
  ["3", "$1,500"],
  ["5", "$2,400"],
  ["10", "$4,400"],
];

const monthly = [
  "Monthly checks of the HubSpot to Google Ads connection: sync errors, the gap between HubSpot and Google Ads counts, click ID coverage, changes to Primary conversions, and consent signals.",
  "A white-label monthly note on what changed and what needs a decision.",
  "Fixes for anything that breaks, up to 1.5 hours per account a month.",
];

const faqs: FaqItem[] = [
  {
    q: "Will our client know you're involved?",
    a: "Only if you tell them. Deliverables carry your logo, and our name appears nowhere. We never contact your client unless you invite us.",
  },
  {
    q: "Can we connect through our manager account?",
    a: "No. HubSpot can only connect individual Google Ads accounts, not manager accounts, so we work in the client's own account.",
  },
  { q: "What if a client uses Salesforce?", a: "That isn't covered. We work with HubSpot only." },
  { q: "How should we price this to our client?", a: "That's your call. We invoice you, and you invoice your client." },
  { q: "Will you sell to our clients directly?", a: "No. We don't sell directly to your clients for 12 months." },
  {
    q: "What access do you need?",
    a: "Admin on the client's individual Google Ads account, Publish access to HubSpot's ads tools at minimum, and Tag Manager only if a tag needs changing. Named invites only, and every change is logged with how to reverse it.",
  },
];

export default function Agencies() {
  const book = site.agencyBookingUrl;
  return (
    <>
      <Header path="/agencies" agency />
      <main id="main" tabIndex={-1}>
        {/* 1. Hero */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="container-site flex flex-col items-center gap-6 pb-16 pt-14 text-center lg:items-start lg:py-24 lg:text-left">
            <h1 id="hero-title" className="text-title-xl max-w-[900px]">
              Your client&apos;s Google Ads bids on form fills. <Accent>Their sales team qualifies in HubSpot.</Accent>
            </h1>
            <p className="text-text-l max-w-[40rem]">
              Nobody owns the handoff between the two. We check it and fix it inside your client&apos;s own accounts, with sign-off on every change, and you deliver it under your agency&apos;s name.
            </p>
            <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <CalButton href={book} className="w-full sm:w-auto" />
              <TeardownButton href="/agencies/teardown" className="w-full sm:w-auto">
                Get a free white-label teardown
              </TeardownButton>
            </div>
            <p className="text-text-m text-gray-600 max-w-[40rem]">
              <span className="font-medium text-black">Paid pilot from $900.</span> Our name appears nowhere in what your client sees.
            </p>
          </div>
        </section>

        {/* 2. Whether you run the ads or the CRM */}
        <section id="roles" aria-labelledby="roles-title" className="section-y">
          <div className="container-site">
            <SectionHead id="roles">Whether you run the ads or the CRM</SectionHead>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="bento">
                <h3 className="text-title-m">If you run your client&apos;s Google Ads</h3>
                <p className="mt-4 text-text-l">
                  When a client says the leads are poor, check what bidding is counting. If form fills are the only Primary conversion, Smart Bidding looks for more form fills. We make it count the stages your client&apos;s sales team qualifies.
                </p>
              </div>
              <div className="bento">
                <h3 className="text-title-m">If you run your client&apos;s HubSpot</h3>
                <p className="mt-4 text-text-l">
                  Lifecycle stages can sync to Google Ads and still be ignored by bidding. A stage set as Secondary, or outside the goal the campaigns bid on, is reported but never bid on. We make sure the stages you built are the ones Google Ads bids on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What's in a check */}
        <section id="check" aria-labelledby="check-title" className="section-y">
          <div className="container-site">
            <SectionHead id="check">What&apos;s in a check</SectionHead>
            <div className="mt-6 max-w-[64ch] space-y-4 text-text-l">
              <p>
                Every check covers the same seven questions as our standard check: which conversions bidding uses, whether lifecycle stages are set up and firing, duplicates, click ID and contact data matching, legacy imports, EEA consent signals, and a side-by-side count. We fix everything on the list that lives in Google Ads, HubSpot or Tag Manager settings, with your sign-off on each change.
              </p>
              <p>
                <Link href="/#checks" className="link inline-flex min-h-6 items-center">See the seven checks in detail</Link>
              </p>
            </div>
          </div>
        </section>

        {/* 4. White-label */}
        <section id="white-label" aria-label="White-label" className="section-y">
          <div className="container-site">
            <C1Report />
            <p className="bento mt-5 max-w-[64rem] text-text-l">
              White-label means our name appears nowhere in the deliverables. We never contact your client unless you invite us, and we don&apos;t sell directly to your clients for 12 months.
            </p>
          </div>
        </section>

        {/* 5. The pilot */}
        <section id="pilot" aria-labelledby="pilot-title" className="section-y">
          <div className="container-site">
            <SectionHead id="pilot">Start with a paid pilot</SectionHead>
            <div className="bento mt-10 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <p className="text-text-l max-w-[33.75rem]">One check and fix on one client account, delivered under your agency&apos;s name.</p>
                <CalButton href={book} className="mt-6 w-full sm:w-auto" />
              </div>
              <TickList items={pilot} />
            </div>
          </div>
        </section>

        {/* 6. Pricing after the pilot */}
        <section id="pricing" aria-labelledby="pricing-title" className="section-y">
          <div className="container-site">
            <SectionHead id="pricing">Pricing after the pilot</SectionHead>
            <div className="mt-10 grid gap-5 lg:grid-cols-[5fr_7fr]">
              <div className="bento">
                <h3 className="text-title-m">Check and fix</h3>
                <p className="mt-4 text-text-l">
                  $1,200 per client account, fixed. Half when work starts, half when the report is delivered, by Stripe invoice. You set your own price to your client.
                </p>
              </div>
              <div className="bento">
                <h3 className="text-title-m">
                  Monthly plan: <Accent small>we keep your clients&apos; connections fixed</Accent>
                </h3>
                <p className="mt-4 text-text-l">A monitored-account plan, not an hours bank. Start with one account and add more as you go.</p>
                <table className="mt-6 w-full border-collapse text-left text-text-m">
                  <caption className="sr-only">Monthly plan prices</caption>
                  <thead>
                    <tr className="text-gray-600">
                      <th scope="col" className="py-3 pr-3 font-normal">Client accounts</th>
                      <th scope="col" className="py-3 pl-3 font-normal">Price a month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map(([n, price]) => (
                      <tr key={n} className="border-t border-gray-100 align-top">
                        <th scope="row" className="py-3 pr-3 font-normal">{n}</th>
                        <td className="py-3 pl-3 font-medium">{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-text-m text-gray-600">$500 a month per account for your first four accounts, then $400 a month for each account from the fifth.</p>
                <p className="mt-6 font-medium">On each account, every month:</p>
                <TickList items={monthly} className="mt-3" />
                <p className="mt-4 text-text-m text-gray-600">Other ops work (routing, clean-up, reporting, new builds) is quoted separately in blocks at $150 an hour, 5-hour minimum.</p>
                <p className="mt-4 text-text-m text-gray-600">3-month minimum, then month to month with 30 days&apos; notice. Billed monthly in advance by Stripe subscription.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Access and security */}
        <section id="access" aria-label="Access and security" className="section-y">
          <div className="container-site">
            <div className="bento max-w-[64rem]">
              <h2 className="text-title-m">Access and security</h2>
              <p className="mt-4 text-text-l">
                Access works the same way as for direct clients: named invites only, every change logged with how to reverse it, and access removed at handover unless you&apos;re on the monthly plan.
              </p>
              <p className="mt-4">
                <Link href="/#access" className="link inline-flex min-h-6 items-center">See access and security</Link>
              </p>
            </div>
          </div>
        </section>

        {/* 8. Questions */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions">Questions</SectionHead>
            <div className="bento mt-10 py-3 sm:py-4">
              <Faq items={faqs} />
            </div>
          </div>
        </section>

        {/* 9. Closing call to action */}
        <section id="request" aria-labelledby="request-title" className="section-y">
          <div className="container-site">
            <div className="bento-dark on-dark mx-auto max-w-[64rem] px-6 py-14 text-center sm:px-16 sm:py-20">
              <h2 id="request-title" className="text-title-l">
                Try it on <Accent dark>one client account</Accent>
              </h2>
              <CalButton href={book} className="mt-8 w-full sm:w-auto" />
              <p className="mt-6 text-white/90">
                Prefer email? <a href={`mailto:${site.email}`} className="link">{site.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer teardownHref="/agencies/teardown" />
    </>
  );
}
