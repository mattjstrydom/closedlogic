import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import Faq, { type FaqItem } from "../components/faq";
import { CalButton, TeardownButton } from "../components/cta";
import { Accent, SectionHead, TickList } from "../components/ui";
import C1Report from "../components/c1-report";
import { site } from "../site.config";
import { pageMetadata, agenciesOgImage, agenciesTwitterImage } from "../seo";

export const metadata = pageMetadata({
  title: "Closed Logic for agencies | HubSpot to Google Ads, under your name",
  description:
    "We check and fix how your client's HubSpot sends lifecycle stages to Google Ads, delivered under your agency's name. Paid pilot from $900.",
  path: "/agencies",
  absoluteTitle: true, ogImg: agenciesOgImage, twImg: agenciesTwitterImage,
});

const pilot: React.ReactNode[] = [
  <>
    <strong className="font-medium">$900</strong> with a short case study and a 20-minute debrief, or <strong className="font-medium">$1,200</strong> without. The case study uses wording you approve.
  </>,
  "One HubSpot portal and one Google Ads account, the client's own account rather than a manager account.",
  "The seven checks, with fixes in HubSpot, Google Ads and Tag Manager settings.",
  "White-label report, change log with undo steps, recorded walkthrough and a 30-minute handover with your team.",
  "A free recheck of your counts and sync status at day 30.",
  <>
    <strong className="font-medium">What happens after the pilot.</strong> At day 30 we recheck the connection and you decide whether you want us to keep watching it. If you join the monthly plan (3 accounts for $1,500 a month, or 5 accounts for $2,400 a month) within 14 days of the recheck, the pilot fee is credited against your monthly invoices until it&apos;s used up. If you don&apos;t, you keep the report, the change log and the fixes, and we remove our access at handover.
  </>,
];

// The 1 and 10 account tiers carry over unchanged from the live page; 3 and 5 are the approved plan rows.
const plans: [string, string, string][] = [
  ["1 account", "Up to 1", "$500"],
  ["3 accounts", "Up to 3", "$1,500"],
  ["5 accounts", "Up to 5", "$2,400"],
  ["10 accounts", "Up to 10", "$4,400"],
];

const monthly: React.ReactNode[] = [
  <>
    <strong className="font-medium">Check the connection.</strong> We look at sync errors, the gap between HubSpot and Google Ads counts, click ID coverage, changes to Primary conversions, and consent signals.
  </>,
  <>
    <strong className="font-medium">Send a white-label note.</strong> It says what changed and what needs a decision, and it carries your logo, not ours.
  </>,
  <>
    <strong className="font-medium">Fix what breaks.</strong> We fix anything that breaks, up to 1.5 hours per account a month, and we make each change with your sign-off.
  </>,
];

// Sources quoted in the clean-click section, numbered as they appear in the copy.
const sources = [
  {
    n: 1,
    title: "About invalid traffic",
    detail: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/11182074",
  },
  {
    n: 2,
    title: "About primary and secondary conversion actions",
    detail: "Google Ads Help",
    url: "https://support.google.com/google-ads/answer/11461796",
  },
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
        <section id="hero" aria-labelledby="hero-title" className="glow-bg">
          <div className="container-site flex flex-col items-center gap-6 pb-16 pt-14 text-center lg:items-start lg:py-24 lg:text-left">
            <h1 id="hero-title" className="text-title-xl max-w-[900px]">
              Your client&apos;s Google Ads bids on form fills. <Accent>Their sales team qualifies in HubSpot.</Accent>
            </h1>
            <p className="text-text-l max-w-[40rem]">
              Nobody owns the handoff between the two. We check it and fix it inside your client&apos;s own accounts, with sign-off on every change, and you deliver it under your agency&apos;s name.
            </p>
            <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <CalButton href={book} className="w-full sm:w-auto">Book a 20-minute agency fit call</CalButton>
              <TeardownButton href="/agencies/teardown" className="w-full sm:w-auto">
                Get a free white-label teardown
              </TeardownButton>
            </div>
            <p className="text-text-m text-body max-w-[40rem]">
              <span className="font-medium text-ink">Paid pilot from $900.</span> Our name appears nowhere in what your client sees.
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
                  Lifecycle stages can sync to Google Ads and still be ignored by bidding. A stage set as Secondary is reported but not bid on, unless a custom goal includes it. A Primary stage outside the goal the campaigns bid on isn&apos;t bid on either. We make sure the stages you built are the ones Google Ads bids on.
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
                <CalButton href={book} className="mt-6 w-full sm:w-auto">Book a 20-minute agency fit call</CalButton>
              </div>
              <TickList items={pilot} />
            </div>
          </div>
        </section>

        {/* 6. Pricing after the pilot */}
        <section id="pricing" aria-labelledby="pricing-title" className="glow-bg section-y">
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
                <p className="mt-4 text-text-l">A monitored-account plan, not an hours bank. Pick the number of client accounts you want us to watch.</p>
                <div className="mt-6 overflow-x-auto rounded-tile border border-solid border-rule">
                  <table className="w-full border-collapse text-left text-[0.875rem] leading-snug sm:text-[0.9375rem]">
                    <caption className="sr-only">Monthly plan prices by number of client accounts</caption>
                    <thead>
                      <tr className="text-[0.75rem] text-body sm:text-[0.8125rem]">
                        <th scope="col" className="py-3 pl-4 pr-2 font-normal sm:pl-5">Plan</th>
                        <th scope="col" className="px-2 py-3 font-normal">Client accounts</th>
                        <th scope="col" className="py-3 pl-2 pr-4 text-right font-normal sm:pr-5">Price a month</th>
                      </tr>
                    </thead>
                    <tbody className="[&_td]:h-[52px] [&_tr]:border-t [&_tr]:border-rule">
                      {plans.map(([plan, accounts, price]) => (
                        <tr key={plan}>
                          <td className="pl-4 pr-2 font-medium sm:pl-5">{plan}</td>
                          <td className="px-2 text-body">{accounts}</td>
                          <td className="pl-2 pr-4 text-right font-mono sm:pr-5">{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-text-m text-body">$500 a month per account for your first four accounts, then $400 a month for each account from the fifth.</p>
                <p className="mt-4 text-text-m text-body">Each account needs its own HubSpot portal and its own Google Ads account. We can&apos;t connect through a manager account, because HubSpot can only connect individual Google Ads accounts.</p>
                <p className="mt-6 font-medium">On each account, every month we do three things:</p>
                <TickList items={monthly} className="mt-3" />
                <p className="mt-4 text-text-m text-body">Other ops work (routing, clean-up, reporting, new builds) is quoted separately in blocks at $150 an hour, 5-hour minimum.</p>
                <p className="mt-4 text-text-m text-body">The plan has a 3-month minimum, then runs month to month with 30 days&apos; notice. It is billed monthly in advance by Stripe subscription, in USD. You set your own price to your clients. We invoice you, and you invoice them.</p>
                <p className="mt-6 text-text-m">Want to see whether it fits your client list?</p>
                <div className="mt-3">
                  <CalButton href={book} className="w-full sm:w-auto">Book a 20-minute agency fit call</CalButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Clean clicks and Primary conversions */}
        <section id="clean-clicks" aria-labelledby="clean-clicks-title" className="section-y">
          <div className="container-site">
            <SectionHead id="clean-clicks">A clean click still bids on a form fill</SectionHead>
            <div className="bento mt-10 max-w-[64rem] space-y-4 text-text-l">
              <p>
                Google says it “actively detects and filters invalid traffic”, and that traffic found before billing is removed from your campaign metrics and billing.<a href={sources[0].url} className="link">[1]</a> That cleans the clicks. It doesn&apos;t change which conversions Smart Bidding learns from.
              </p>
              <p>
                Bidding follows what you mark as Primary. Google says secondary actions are “for observation only” and are used “for reporting in the ‘All conversions’ column in your reports, but not for bidding”, unless the action is part of a custom goal.<a href={sources[1].url} className="link">[2]</a> So if your lead form submit is the only Primary action and your HubSpot SQL stage is set as Secondary, Smart Bidding still looks for more form fills, however clean the traffic is.
              </p>
              <p>
                Google also says lead quality is “a shared effort” and suggests focusing campaigns on goals “such as ‘qualified lead,’ ‘converted lead,’ ‘book appointment,’ or ‘request quote.’”<a href={sources[0].url} className="link">[1]</a> That is the part we check and fix: whether the stages your client&apos;s sales team qualifies in HubSpot reach Google Ads and are the ones bidding uses.
              </p>
            </div>
            <div className="mt-6">
              <CalButton href={book} className="w-full sm:w-auto">Book a 20-minute agency fit call</CalButton>
            </div>
            <ol className="mt-8 max-w-[64rem] space-y-2 text-text-s text-body">
              {sources.map((s) => (
                <li key={s.n}>
                  [{s.n}] {s.title}, {s.detail}:{" "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="link break-words">
                    {s.url}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. Access and security */}
        <section id="access" aria-label="Access and security" className="section-y">
          <div className="container-site">
            <div className="bento max-w-[64rem]">
              <h2 className="text-title-m">Access and security</h2>
              <p className="mt-4 text-text-l">
                Access works the same way as for direct clients: named invites only, every change logged with how to reverse it. We remove our access at handover unless you&apos;re on the monthly plan, which needs us to keep it so we can run the monthly checks. You can revoke it at any time.
              </p>
              <p className="mt-4">
                <Link href="/#access" className="link inline-flex min-h-6 items-center">See access and security</Link>
              </p>
            </div>
          </div>
        </section>

        {/* 9. Questions */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions">Questions</SectionHead>
            <div className="bento mt-10 py-3 sm:py-4">
              <Faq items={faqs} />
            </div>
          </div>
        </section>

        {/* 10. Closing call to action */}
        <section id="request" aria-labelledby="request-title" className="section-y">
          <div className="container-site">
            <div className="bento-dark on-dark mx-auto max-w-[64rem] px-6 py-14 text-center sm:px-16 sm:py-20">
              <h2 id="request-title" className="text-title-l">
                Try it on <Accent dark>one client account</Accent>
              </h2>
              <CalButton href={book} className="mt-8 w-full sm:w-auto" />
              <p className="mt-6 text-body">
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
