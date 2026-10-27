import Faq from "../components/faq";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import { BookPeButton } from "../components/cta";
import { Accent, SectionHead } from "../components/ui";
import { metricItems } from "../checks-data";
import { faqNode, jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";
import Link from "next/link";

// Hidden (Matt, 26 Oct 2026): unlinked from the nav, footer and home page, out of the sitemap and noindex. The page still builds and returns 200.
export const metadata = {
  ...pageMetadata({
    title: "Portfolio measurement for private equity",
    description: "One measurement standard across your portfolio companies. Comparable pipeline numbers without migrating CRMs. Built for operating partners.",
    path: "/for-pe",
  }),
  robots: { index: false, follow: false },
};

const offers: [string, string, string][] = [
  ["Portfolio Measurement Pilot", "$10k–$15k · 3 weeks", "One portfolio company. KPI dictionary, 20-point audit, baseline, 90-day roadmap and a one-page scorecard. The pilot is the proof."],
  ["Portfolio Rollout", "$40k–$75k · 8–12 weeks", "4–6 portfolio companies. One standard, one scorecard, one fund-level roll-up. Each company gets a baseline, a benchmark and a 90-day plan."],
  ["Measurement Retainer", "$5k–$7.5k per portfolio company per month", "Monthly scorecard, variance review, fix list and a quarterly portfolio roll-up. The fund gets one comparable number every quarter."],
  ["PE Advisory", "$3k–$5k per month", "Define the standard, select vendors, run the quarterly review. For funds that want the operating partner to own the model, not the agency."],
];

// Illustrative sample: invented figures, shown only to make the format concrete.
const sample: [string, string, string, string][] = [
  ["CAC", "$21,400", "Up", "Needs attention"],
  ["CAC payback", "19 months", "Flat", ""],
  ["Marketing-sourced pipeline contribution", "34%", "Down", "Needs attention"],
  ["Pipeline velocity", "$118k per day", "Up", ""],
  ["MQL → SQL conversion", "17%", "Down", "Needs attention"],
  ["Win rate", "22%", "Flat", ""],
  ["Sales-cycle length", "91 days", "Up", ""],
  ["Net revenue retention", "104%", "Flat", ""],
  ["Marketing-sourced revenue", "$1.9M", "Up", ""],
  ["Data quality", "88%", "Up", ""],
];

const faqs = [
  { q: "Do you replace our CRM partner?", a: "No. We work alongside them. They implement the standard; we measure whether the numbers are true and comparable." },
  { q: "Do you need to migrate our CRMs?", a: "No. We map definitions and data into one KPI dictionary. If a migration is the right answer, your CRM partner owns it." },
  { q: "How long does a pilot take?", a: "Three weeks. One portfolio company. One scorecard. One readout." },
  { q: "How do you handle data access?", a: "Read-only access, NDA, least-privilege. We can work from exports if the fund prefers." },
  { q: "What does the fund get that it doesn’t have today?", a: "One definition of pipeline, one scorecard and one independent read across companies. Comparability, not another dashboard." },
  { q: "What if the portfolio companies use different CRMs?", a: "That is the normal case. We map the definitions; we don’t force a migration." },
];

const graph = [orgNode, faqNode(faqs)];
const card = "card flex flex-col gap-3 text-text-m";

export default function ForPe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/for-pe" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="pe"
          title="One measurement standard across your portfolio."
          sub="We make every portfolio company’s pipeline numbers comparable — without migrating their CRMs. For operating partners who need one number, not six definitions."
          micro="Your CRM partner implements. We measure. No migration required."
        >
          <BookPeButton className="w-full sm:w-auto" />
          <Link href="#sample" className="btn-outline w-full sm:w-auto">See a sample portfolio scorecard</Link>
        </PageHero>

        <section id="problem" aria-labelledby="problem-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="problem">
              Four portfolio companies. Four agencies. Four definitions. <Accent>Nothing rolls up.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 max-w-[44rem] space-y-5 text-center text-text-xl text-body">
              <p>Each portfolio company has its own CRM, its own agency and its own definition of a qualified lead. The operating partner can compare the financials. The marketing numbers do not compare.</p>
              <p>The default fix is a CRM standardization project. That is the right answer for the CRM. It is not the whole answer for measurement. You still need one definition of pipeline, one scorecard and one independent read on whether the numbers are true.</p>
            </div>
          </div>
        </section>

        <section id="offer" aria-labelledby="offer-title" className="section-y">
          <div className="container-site">
            <SectionHead id="offer">
              A pilot, a rollout, <Accent>a retainer.</Accent>
            </SectionHead>
            <ul className="mt-14 grid gap-7 sm:grid-cols-2">
              {offers.map(([name, price, body]) => (
                <li key={name} className={card}>
                  <h3 className="text-title-m">{name}</h3>
                  <p className="font-display text-[1.05rem] font-bold text-ink">{price}</p>
                  <p className="text-body">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="crm-partner" aria-labelledby="crm-partner-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="crm-partner" chip="How we work with your CRM partner">
              Your CRM partner implements. <Accent>We measure.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 max-w-[44rem] space-y-5 text-center text-text-xl text-body">
              <p>We are not a CRM implementer. We don’t migrate HubSpot to Salesforce or Salesforce to HubSpot. We work alongside the partner who does.</p>
              <p>Your CRM/RevOps partner owns the data model, the migration and the workflows. We own the measurement layer: the KPI dictionary, the audit, the benchmark and the scorecard. The fund gets one standard; the partner gets a cleaner project; the portfolio companies get a number they can defend.</p>
            </div>
          </div>
        </section>

        <section id="metrics" aria-labelledby="metrics-title" className="section-y">
          <div className="container-site">
            <SectionHead id="metrics">
              The 10 <Accent>metrics.</Accent>
            </SectionHead>
            <ol className="card mx-auto mt-10 grid max-w-[52rem] gap-x-10 text-text-m sm:grid-cols-2">
              {metricItems.map(([m]) => (
                <li key={m} className="border-b border-solid border-rule py-3 font-medium text-ink">{m}</li>
              ))}
            </ol>
            <p className="lead lead-center mt-8 max-w-[44rem]">One definition, one formula, one data source, one cadence — across every portfolio company.</p>
          </div>
        </section>

        <section id="sample" aria-labelledby="sample-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="sample" chip="Sample portfolio scorecard">
              One page per company. <Accent>One roll-up for the fund.</Accent>
            </SectionHead>
            <p className="lead lead-center mt-6 max-w-[48rem]">Each portfolio company gets a one-page scorecard: the 10 metrics, the benchmark, the trend and the three issues that need attention. The fund gets a roll-up that compares companies on the same definitions.</p>
            <div className="card mx-auto mt-10 max-w-[56rem]">
              <p className="img-label">Illustrative, not a client result</p>
              <ReportTable
                className="mt-4"
                caption="Sample scorecard for one portfolio company, illustrative figures"
                head={["Metric", "Value", "Trend", "Status"]}
                right={[1]}
                rows={sample.map(([m, v, t, s]) => [m, v, t, s || "In range"])}
              />
            </div>
          </div>
        </section>

        <section id="for" aria-labelledby="for-title" className="section-y">
          <div className="container-site">
            <SectionHead id="for">Who it’s for.</SectionHead>
            <div className="mt-14 grid gap-7 lg:grid-cols-2">
              <div className={card}>
                <h3 className="text-title-m">For funds</h3>
                <p>5 to 20 B2B software portfolio companies · mixed CRMs · quarterly portfolio reviews · an operating partner who needs one number.</p>
              </div>
              <div className={card}>
                <h3 className="text-title-m">For portfolio companies</h3>
                <p>$10M to $50M revenue · 20 to 200 employees · HubSpot, Salesforce or Pipedrive · a marketing team of 2 to 15 · a board or investor asking for pipeline.</p>
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

        <CtaBand id="start" title="Start with one portfolio company." body="A three-week pilot. One standard. One scorecard. If it doesn’t produce a comparable number, you don’t roll it out.">
          <BookPeButton className="w-full sm:w-auto" />
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
