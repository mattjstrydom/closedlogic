import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import { BookButton } from "../components/cta";
import { TickList } from "../components/ui";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Pricing: fixed scope, fixed price, no media percentage",
  description: "Audit $1,500. Measurement Scorecard $1,500 a month. Fractional $5,000 a month. PE pilots $10k–$15k per portfolio company. Fixed scope, and no percentage of ad spend.",
  path: "/pricing",
});

const rows: React.ReactNode[][] = [
  ["Pipeline Truth Audit", "$1,500", "5 business days; 20 checks; baseline; 90-day roadmap", "B2B SaaS teams that need a diagnosis"],
  ["Measurement Scorecard", "$1,500/month", "Month to month; monthly reconciliation of pipeline and revenue across CRM, ads and finance; one-page scorecard of what moved and what doesn’t agree; no fix hours (fixes quoted separately or covered by Fractional)", "B2B SaaS teams that need the numbers checked every month"],
  ["Fractional Measurement Lead", "$5,000/month", "25 hours; 3-month initial; monthly scorecard; fixes", "B2B SaaS teams that need an owner"],
  ["Founding-client rate", "$4,000/month", "First 2 clients; 3 months; case study required", "Early clients who will be references"],
  ["PE Portfolio Pilot", "$10k–$15k", "One portfolio company; 3 weeks; scorecard; readout", "Funds testing the standard"],
  ["PE Portfolio Rollout", "$40k–$75k", "4–6 portfolio companies; 8–12 weeks; fund roll-up", "Funds standardizing the portfolio"],
  ["PE Measurement Retainer", "$5k–$7.5k/portco/month", "Monthly scorecard; quarterly roll-up; benchmark", "Funds keeping the standard true"],
  ["Partner white-label", "Custom", "60–70% of end fee; your brand; your relationship", "CRM/RevOps partners"],
];

const always = ["A named owner", "A written scope", "A baseline", "A monthly scorecard", "Fractional: either side can end it in writing during the first 30 days, and you pay only for that first month."];
const never = ["Media buying", "Creative or content", "CRM migration", "A new dashboard", "A percentage of ad spend"];

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/pricing" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="pricing"
          title="Fixed scope. Fixed price. No media percentage."
          sub="You should know what the work costs before you start. You should also know what it doesn’t include."
        />

        <section id="table" aria-labelledby="table-title" className="section-y band">
          <div className="container-site">
            <h2 id="table-title" className="sr-only">Offers and prices</h2>
            <div className="card mx-auto max-w-[72rem]">
              <ReportTable caption="Offers, prices, scope and who each is best for" head={["Offer", "Price", "Scope", "Best for"]} right={[1]} rows={rows} />
            </div>
          </div>
        </section>

        <section id="included" aria-labelledby="included-title" className="section-y">
          <div className="container-site grid gap-7 lg:grid-cols-2 lg:items-start">
            <div className="card">
              <h2 id="included-title" className="text-title-m">What’s always included</h2>
              <TickList items={always} className="mt-6 text-text-m" />
            </div>
            <div className="card">
              <h2 className="text-title-m">What’s never included</h2>
              <ul className="dot-list text-text-m">
                {never.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Not sure which one?" body="Start with the audit. It is the cheapest way to find out whether the bigger engagement is justified.">
          <BookButton className="w-full sm:w-auto">Book the audit</BookButton>
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
