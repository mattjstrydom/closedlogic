import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import AuditChecks from "../components/audit-checks";
import { Accent, SectionHead } from "../components/ui";
import { coreChecks, metricItems } from "../checks-data";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "How We Check Google Ads and HubSpot Tracking",
  description: "The 10 core checks we run, what broken looks like, what it costs, and how we choose the conversion Google Ads should bid on.",
  path: "/method",
  absoluteTitle: true,
});

// Every source below was opened and read on 3 November 2026. Statements from the rewrite doc that the pages did not support
// (HubSpot "records when the contact was created", HubSpot "only counts records") were dropped or reworded.
const sources = {
  clickTime: "https://support.google.com/google-ads/answer/6270625?hl=en",
  modeled: "https://support.google.com/google-ads/answer/10081327?hl=en",
  hubspot: "https://knowledge.hubspot.com/ads/data-in-hubspot-ads-doesnt-match-external-ad-networks",
  leads: "https://support.google.com/google-ads/answer/13489421?hl=en",
};

export default function Method() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/method" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="method"
          title="How we check Google Ads and HubSpot tracking"
          sub="The 10 core checks, what broken looks like, and what it costs. Use them yourself; that's the point."
        />

        <section id="checks" aria-labelledby="checks-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="checks">
              Core checks <Accent>(audit).</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">The Pipeline Truth Audit runs these 10 checks across Google Ads, HubSpot and your reporting, then takes you through the report on a readout call. The extended checks are on the <Link href="/fractional#extended" className="link">Fractional page</Link>.</p>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <AuditChecks items={coreChecks} />
            </div>
          </div>
        </section>

        <section id="differ" aria-labelledby="differ-title" className="section-y">
          <div className="container-site">
            <SectionHead id="differ">
              Why the numbers can <Accent>legitimately differ.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 max-w-[44rem] space-y-5 text-text-l text-body">
              <p>
                Google Ads and HubSpot count different things on different clocks.
              </p>
              <ul className="dot-list text-text-l">
                <li>
                  Google Ads reports a conversion on the date of the click, not the date it happened. It also has columns that report by conversion time (
                  <a className="link" href={sources.clickTime}>Google Ads Help: understand your conversion tracking data</a>).
                </li>
                <li>
                  Google&apos;s Conversions column includes modeled conversions as well as observed ones, and modeled conversions can take up to 5 days to settle (
                  <a className="link" href={sources.modeled}>Google Ads Help: about modeled online conversions</a>).
                </li>
                <li>
                  Ad networks count actions, and HubSpot counts tracked visitors who took an action. One visitor who submits a form 10 times can be 10 conversions in Google Ads and one contact in HubSpot (
                  <a className="link" href={sources.hubspot}>HubSpot Knowledge Base: ads contact attribution and ad network conversions</a>).
                </li>
                <li>
                  HubSpot attributes a contact to an ad only when a tracking cookie links that visitor to the ad. Contacts from lead ad forms are the exception (same HubSpot page).
                </li>
              </ul>
              <p>Some gap is normal. The checks look for gaps that come from setup errors, not from these differences. Sources last checked 3 November 2026.</p>
            </div>
          </div>
        </section>

        <section id="bidding-stage" aria-labelledby="bidding-stage-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="bidding-stage">
              Choosing the <Accent>bidding stage.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 max-w-[44rem] space-y-5 text-text-l text-body">
              <p>We set the bidding goal to the deepest funnel stage the account has enough monthly volume for, keeping Google&apos;s own guidance on conversion volume, delay and data freshness in view.</p>
              <p>
                For volume, Google&apos;s lead generation guidance says to make sure the action generated at least 15 conversions in the last 30 days at the account level (
                <a className="link" href={sources.leads}>Google Ads Help: best practices for generating high-quality leads</a>, last checked 2 November 2026).
              </p>
              <p>If the stage is too rare, form submit or booking stays Primary until it isn&apos;t.</p>
            </div>
          </div>
        </section>

        <section id="metrics" aria-labelledby="metrics-title" className="section-y">
          <div className="container-site">
            <SectionHead id="metrics">
              For larger accounts: <Accent>the 10 metrics.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">When the board needs one number, we agree a definition, a formula and a data source for each of these.</p>
            <div className="card mx-auto mt-10 max-w-[56rem]">
              <ReportTable caption="The 10 metrics and the question each answers" head={["Metric", "What it answers"]} rows={metricItems.map(([m, q]) => [m, q])} />
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Want to see what your setup is sending?" body="Start with the free check. No logins, and we reply within 1 business day.">
          <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
          <Link href="/signal-fix" className="btn-outline w-full sm:w-auto">See Signal Fix</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
