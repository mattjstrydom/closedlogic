import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import AuditChecks from "../components/audit-checks";
import { BookButton } from "../components/cta";
import { Accent, SectionHead } from "../components/ui";
import { metricItems } from "../checks-data";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "The Measurement Standard: 10 metrics, 20 checks",
  description: "One definition, one formula, one data source, one cadence. The 10 metrics, the 20 checks and the cadence behind every Closed Logic engagement.",
  path: "/method",
});

const cadence: [string, string][] = [
  ["5 business days", "The audit."],
  ["30 days", "The baseline and the roadmap."],
  ["Monthly", "The scorecard and the review."],
  // The quarterly portfolio roll-up is a PE deliverable: shown only when site.showPE is true (app/flags.ts).
  ...(site.showPE ? ([["Quarterly", "The portfolio roll-up and the benchmark."]] as [string, string][]) : []),
];

export default function Method() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/method" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="method"
          title="The Measurement Standard."
          sub="One definition, one formula, one data source, one cadence. The same standard for one company or twenty."
        />

        <section id="metrics" aria-labelledby="metrics-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="metrics">
              The 10 <Accent>metrics.</Accent>
            </SectionHead>
            <div className="card mx-auto mt-10 max-w-[56rem]">
              <ReportTable caption="The 10 metrics and the question each answers" head={["Metric", "What it answers"]} rows={metricItems.map(([m, q]) => [m, q])} />
            </div>
          </div>
        </section>

        <section id="checks" aria-labelledby="checks-title" className="section-y">
          <div className="container-site">
            <SectionHead id="checks">
              The 20 <Accent>checks.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">The Pipeline Truth Audit runs these 20 checks across Google Ads, HubSpot and your reporting, before we take a retainer.</p>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <AuditChecks />
            </div>
          </div>
        </section>

        <section id="cadence" aria-labelledby="cadence-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="cadence">
              The <Accent>cadence.</Accent>
            </SectionHead>
            <div className="card mx-auto mt-10 max-w-[44rem]">
              <ReportTable caption="Delivery cadence" head={["When", "What you get"]} rows={cadence} />
            </div>
          </div>
        </section>

        <section id="principle" aria-labelledby="principle-title" className="section-y">
          <div className="container-site">
            <div className="mx-auto max-w-[44rem] text-center">
              <h2 id="principle-title" className="heading-center text-title-l">
                Standardize the engine. <Accent>Localize the story.</Accent>
              </h2>
              <p className="lead mt-6">One definition of pipeline, one scorecard, one cadence. The campaigns, the offers and the message stay local.</p>
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Want the checks run on your accounts?" body="The 20 checks we run before we take a retainer.">
          <BookButton className="w-full sm:w-auto" />
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
