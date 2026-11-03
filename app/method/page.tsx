import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import AuditChecks from "../components/audit-checks";
import { BookButton } from "../components/cta";
import { Accent, SectionHead } from "../components/ui";
import { coreChecks, extendedChecks, metricItems } from "../checks-data";
import { offers } from "../offers";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Method: the checks behind every engagement",
  description: "The 10 core checks in the audit, the 10 extended checks in Fractional, and how we choose the bidding stage. Each check says what broken looks like and what it costs.",
  path: "/method",
});

const cadence: [string, string][] = [
  [`${offers.audit.days} business days from read access`, "The audit: 10 core checks, the 90-day baseline and the roadmap."],
  ["Weekly", `${offers.watch.name}: weekly checks of conversions, click IDs, Primary actions and form embeds.`],
  ["Monthly", `${offers.watch.name}: a short note. ${offers.fractional.name}: the scorecard and the review.`],
];

export default function Method() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/method" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="method"
          title="How we check your setup."
          sub="We find what your Google Ads and HubSpot setup is miscounting. Every finding comes with steps you can check without us."
        />

        <section id="checks" aria-labelledby="checks-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="checks">
              Core checks <Accent>(audit).</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">The {offers.audit.name} runs these 10 checks across Google Ads, HubSpot and your reporting.</p>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <AuditChecks items={coreChecks} />
            </div>
          </div>
        </section>

        <section id="extended" aria-labelledby="extended-title" className="section-y">
          <div className="container-site">
            <SectionHead id="extended">
              Extended checks <Accent>(Fractional).</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">The {offers.fractional.name} adds these 10 on top of the core checks.</p>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <AuditChecks items={extendedChecks} start={coreChecks.length + 1} />
            </div>
          </div>
        </section>

        <section id="bidding-stage" aria-labelledby="bidding-stage-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="bidding-stage">
              Choosing the <Accent>bidding stage.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 max-w-[44rem] space-y-5 text-text-l text-body">
              <p>We bid on the deepest funnel stage the account has enough monthly volume for. A qualified stage tells Google Ads more than a form fill, but only if enough of them happen each month for bidding to learn from.</p>
              <p>
                Google&apos;s lead generation guidance says to make sure the action generated at least 15 conversions in the last 30 days at the account level (
                <a className="link" href="https://support.google.com/google-ads/answer/13489421?hl=en">Google Ads Help: best practices for generating high-quality leads</a>, last checked 2 November 2026).
              </p>
              <p>If the stage is too rare, form submit or booking stays Primary until it isn&apos;t.</p>
            </div>
          </div>
        </section>

        <section id="cadence" aria-labelledby="cadence-title" className="section-y">
          <div className="container-site">
            <SectionHead id="cadence">
              The <Accent>cadence.</Accent>
            </SectionHead>
            <div className="card mx-auto mt-10 max-w-[44rem]">
              <ReportTable caption="Delivery cadence" head={["When", "What you get"]} rows={cadence} />
            </div>
          </div>
        </section>

        <section id="metrics" aria-labelledby="metrics-title" className="section-y band">
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

        <CtaBand id="start" title="Want to see what your setup is sending?" body="Start with the free outside-in check. No access needed.">
          <BookButton campaign="method" className="w-full sm:w-auto" />
          <Link href="/#check" className="btn-outline w-full sm:w-auto">Get a free outside-in check</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
