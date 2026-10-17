import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { CalButton } from "../components/cta";
import { Chip, TickPath } from "../components/ui";
import { CountTable } from "../components/c4-count";
import { ConsentMock, ConversionMock, CookieMock } from "../components/mocks";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Sample report: HubSpot to Google Ads check",
  description:
    "See what you receive before you pay: six findings, a side-by-side count, and a change log with how to reverse each change. Built on a fictional account.",
  path: "/sample-report",
});

// No motion on this page: static final states only.
// Later: link each finding to its guide once guides are published (see content/guides/README.md). No links yet, because no guide is live.
const findings: { t: string; saw: React.ReactNode; why: string; change: string; undo: string; evidence?: React.ReactNode }[] = [
  {
    t: "Qualified stages are imported but not used for bidding",
    saw: "“Lead form submit” is the only Primary conversion action. “HubSpot MQL” and “HubSpot SQL” are syncing, but they are set to Secondary and sit outside the account-level goal.",
    why: "Smart Bidding optimises toward Primary actions in the goal. With form fills as the only Primary action, it looks for more form fills and cannot tell which leads sales later qualified.",
    change: "Set “HubSpot SQL” to Primary and include it in the account-level goal. Move “Lead form submit” to Secondary. You decide the date, because bidding will relearn.",
    undo: "Set “Lead form submit” back to Primary and “HubSpot SQL” back to Secondary.",
    evidence: <ConversionMock />,
  },
  {
    t: "The same stage is sent twice",
    saw: "“HubSpot SQL” reaches Google Ads through the HubSpot integration and through a Zapier automation that fires on the same lifecycle stage change.",
    why: "Google Ads counts both. SQL conversions read about twice as high as the stage changes recorded in HubSpot, which inflates the value Smart Bidding assigns to those clicks.",
    change: "Pause the Zapier automation and keep the HubSpot integration.",
    undo: "Turn the Zapier automation back on.",
  },
  {
    t: "Click IDs are on the page but not reaching HubSpot",
    saw: (
      <>
        The <code>_gcl_aw</code> cookie is set after an ad click. The demo form is built in Webflow, not HubSpot, and its hidden click ID field is empty on submit.
      </>
    ),
    why: "Without the click ID, HubSpot cannot match the contact to the ad click, so later stages cannot be attributed to the campaign that produced them.",
    change: "Add a Tag Manager tag that reads the cookie and fills the hidden field before the form is submitted. This stays inside Tag Manager, so no website code changes.",
    undo: "Pause or delete the new tag. The form keeps working without it.",
    evidence: <CookieMock />,
  },
  {
    t: "Customer conversions still use legacy offline import",
    saw: "“Customer” is uploaded from a weekly CSV through offline conversion import. No customer conversions were recorded in Google Ads in the period.",
    why: "Google calls offline conversion import a legacy method and recommends enhanced conversions for leads. The weekly upload also arrives late and is easy to miss.",
    change: "Send the Customer stage through the HubSpot integration and retire the CSV upload once the first conversions appear.",
    undo: "Re-enable the CSV upload. Nothing is deleted.",
  },
  {
    t: "Consent defaults load after the Google tags",
    saw: "On pages served to EEA visitors, the consent defaults are set after the first Google tag fires, and ad_user_data is not set at all.",
    why: "Google says to set the default consent state first, before the visitor interacts with the page. Here the tags run before it is set.",
    change: "Add a consent default tag that fires first and sets all four signals to denied until the visitor accepts.",
    undo: "Pause the consent default tag.",
    evidence: <ConsentMock />,
  },
  // MATT TO CONFIRM: Test conversion set to Secondary (brief 4.4.1)
  {
    t: "A leftover test conversion sits in the goal",
    saw: "“Test conversion” is a leftover from setup. It is set to Secondary, so it isn't used for bidding today, but it is still active and sits in the account-level goal.",
    why: "It adds noise to conversion reporting, and if anyone switches it to Primary, test traffic would feed straight into what bidding learns from.",
    change: "Remove it from the goal. It stays Secondary.",
    undo: "Add it back to the goal as a Secondary action.",
  },
];

type Status = "scheduled" | "done" | "waiting";
const changeLog: [string, Status][] = [
  ["Set “HubSpot SQL” to Primary; “Lead form submit” to Secondary", "scheduled"],
  ["Pause the Zapier automation", "done"],
  ["Tag Manager tag to fill the hidden click ID field", "done"],
  ["Move Customer to the HubSpot integration; retire CSV upload", "waiting"],
  ["Consent default tag in Tag Manager", "done"],
  ["Remove “Test conversion” from the goal", "done"],
];

function StatusTag({ s }: { s: Status }) {
  if (s === "scheduled") return <span className="tag-info">Approved, scheduled</span>;
  if (s === "waiting") return <span className="tag-wait max-sm:whitespace-normal">Approved, waiting on first conversions</span>;
  return (
    <span className="tag-ok">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
        <TickPath />
      </svg>
      Approved, done
    </span>
  );
}

const h2 = "text-title-m";
const sectionGap = "mt-16 sm:mt-20";

export default function SampleReport() {
  return (
    <>
      <Header path="/sample-report" />
      <main id="main" tabIndex={-1}>
        <div className="container-site pb-16 pt-12 sm:pb-24 sm:pt-16">
          <section aria-labelledby="report-title">
            <Chip>{site.brand} report</Chip>
            <h1 id="report-title" className="mt-4 text-title-l">Sample report: HubSpot to Google Ads conversion check</h1>
            <p className="mt-6 max-w-[62ch] text-text-l">
              This is an example of what you receive, built on a fictional account. The company, the figures and the screenshots are illustrative. They are not a client result.
            </p>
            <dl className="bento mt-8 grid max-w-[48rem] grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-[auto_1fr] sm:gap-y-2">
              <dt className="text-body">Account</dt>
              <dd className="mb-2 sm:mb-0">Example Co (fictional), B2B software</dd>
              <dt className="text-body">Stack</dt>
              <dd className="mb-2 sm:mb-0">HubSpot Marketing Hub Professional, Google Ads, Google Tag Manager</dd>
              <dt className="text-body">Period compared</dt>
              <dd>The last 30 days</dd>
            </dl>
          </section>

          <section aria-labelledby="summary-title" className={sectionGap}>
            <div className="bento grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
              <h2 id="summary-title" className={h2}>Summary</h2>
              <div className="max-w-[64ch] space-y-4 text-text-l">
                <p>
                  Google Ads is bidding on form fills. The qualified stages exist in the account, but they are Secondary, one of them is sent twice, and Customer arrives through a legacy upload that records nothing. Click IDs are not reaching HubSpot, so later stages cannot be tied back to ad clicks.
                </p>
                <p>Six changes are proposed. All of them live in Google Ads, HubSpot or Tag Manager settings. None touches the website outside Tag Manager.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="findings-title" className={sectionGap}>
            <h2 id="findings-title" className={h2}>Findings</h2>
            <p className="mt-3 max-w-[62ch] text-body">
              Each finding comes with what we saw, why it matters, the change we propose and how to reverse it. In a real report every finding also has a screenshot.
            </p>
            <ol className="mt-8 grid gap-5">
              {findings.map((f) => (
                <li key={f.t} className="bento grid gap-6 lg:grid-cols-[1fr_22rem] lg:gap-12">
                  <div className="max-w-[64ch] space-y-4 text-text-m">
                    <h3 className="text-title-s">{f.t}</h3>
                    <p><span className="font-medium">What we saw.</span> {f.saw}</p>
                    <p><span className="font-medium">Why it matters.</span> {f.why}</p>
                    <p><span className="font-medium">Proposed change.</span> {f.change}</p>
                    <p><span className="font-medium">To reverse.</span> {f.undo}</p>
                  </div>
                  {f.evidence && <div>{f.evidence}</div>}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="count-title" className={sectionGap}>
            <div className="bento grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <h2 id="count-title" className={h2}>Side-by-side count</h2>
                <p className="mt-3 text-body">Same 30 days. Example data.</p>
                <p className="mt-6 max-w-[64ch] text-text-m">
                  HubSpot says the two counts may not match, so differences alone are not a fault. These ones are explained. SQL in Google Ads is about double because it is sent twice. Customer is zero because the legacy upload is not recording. MQL and Opportunity are close.
                </p>
              </div>
              <div className="tile min-w-0">
                <CountTable />
              </div>
            </div>
          </section>

          <section aria-labelledby="log-title" className={sectionGap}>
            <div className="bento grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <h2 id="log-title" className={h2}>Change log</h2>
                <p className="mt-3 max-w-[62ch] text-body">
                  We send the proposed changes first and make only the ones you approve. This log lists what we touched. Each change has its reversal in the findings above.
                </p>
              </div>
              <div className="tile min-w-0">
                <div className="frag overflow-hidden">
                  <table className="w-full border-collapse text-left text-[0.875rem] leading-[1.4] sm:text-[0.9375rem]">
                    <caption className="sr-only">Changes made, with status</caption>
                    <thead>
                      <tr className="text-[0.75rem] text-body sm:text-[0.8125rem]">
                        <th scope="col" className="py-3 pl-4 pr-2 font-normal sm:pl-5">Change</th>
                        <th scope="col" className="py-3 pl-2 pr-4 font-normal sm:pr-5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changeLog.map(([c, s]) => (
                        <tr key={c} className="border-t border-rule align-top">
                          <td className="py-3.5 pl-4 pr-2 sm:pl-5">{c}</td>
                          <td className="py-3.5 pl-2 pr-4 sm:pr-5"><StatusTag s={s} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="handover-title" className={sectionGap}>
            <div className="bento grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
              <h2 id="handover-title" className={h2}>Handover</h2>
              <div className="max-w-[64ch] space-y-4 text-text-l">
                <p>
                  The report comes with a recorded screen walkthrough of the findings and a 30-minute handover call. If something on the fix list isn&apos;t working at handover, we put in up to 10 extra hours within 30 days, as set out in our{" "}
                  <Link href="/terms" className="link">terms</Link>.
                </p>
                <p>HubSpot only syncs stage changes that happen after an event is created, so results count from handover forward.</p>
                <p className="pt-4">
                  <CalButton className="w-full sm:w-auto" />
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
