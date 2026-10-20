import Faq from "../components/faq";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import { AuditButton, BookButton } from "../components/cta";
import { Accent, Numeral, SectionHead, TickList } from "../components/ui";
import { faqNode, jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Fractional measurement leadership for B2B SaaS",
  description: "We own the tracking, attribution, HubSpot lifecycle and reporting layer. 25 hours a month, $5,000, independent of your media agency.",
  path: "/for-b2b-saas",
});

const included = [
  "Tracking and attribution QA",
  "Google Ads offline and enhanced conversions",
  "HubSpot lifecycle stages, lead scoring and routing",
  "Reporting and dashboard definitions",
  "A monthly scorecard and a 60-minute review",
  "Vendor management for measurement tools",
  "Documentation and team training",
];
const notIncluded = ["Media buying", "Creative, content or web development", "CRM migration", "A new dashboard", "A full-time hire"];

const weeks: [string, string, string][] = [
  ["Week 1", "Access and definitions.", "Read-only access to Google Ads, HubSpot and your reporting. One KPI dictionary. One definition of a lead, an opportunity and pipeline."],
  ["Week 2", "The audit.", "20 checks. GCLID coverage, lifecycle, scoring, routing, attribution, reporting reconciliation."],
  ["Week 3", "The baseline.", "Last 90 days. Where the numbers disagree, why, and what it costs."],
  ["Week 4", "The scorecard and the roadmap.", "One page. Three material issues. A 90-day plan. A readout with your team."],
];

const faqs = [
  { q: "Do you replace our agency?", a: "No. We make the agency’s numbers auditable." },
  { q: "Do you replace our CRM admin?", a: "No. We define what the CRM should measure and test whether it does." },
  { q: "How much of our time will this take?", a: "Two hours in week one, one hour in week four, then 60 minutes a month." },
  { q: "What happens after the audit if we don’t continue?", a: "You keep the report, the baseline and the roadmap. No lock-in." },
  { q: "Can you work with our stack?", a: "HubSpot and Google Ads are the core. If your stack is different, we’ll tell you before you buy." },
];

const graph = [orgNode, faqNode(faqs)];

export default function ForB2bSaas() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <Header path="/for-b2b-saas" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="b2b"
          title="Fractional measurement leadership for B2B SaaS."
          sub="We own the tracking, attribution, HubSpot lifecycle and reporting layer — 25 hours a month, $5,000, independent of your media agency."
          micro={["You keep your agency. We keep the number true.", "No media-buying incentive. No CRM implementation. Just the number."]}
        >
          <BookButton className="w-full sm:w-auto" />
          <AuditButton className="w-full sm:w-auto" />
        </PageHero>

        <section id="problem" aria-labelledby="problem-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="problem">
              Your Head of Marketing <Accent>can’t defend the pipeline number.</Accent>
            </SectionHead>
            <div className="mx-auto mt-8 max-w-[44rem] space-y-5 text-center text-text-xl text-body">
              <p>The agency reports ROAS. The CRM reports leads. The board asks for pipeline. Nobody can reconcile the three.</p>
              <p>The usual fix is another dashboard. That gives you a fourth number, not a defensible one. The real fix is someone who owns the definitions, reconciles the sources and signs the monthly scorecard.</p>
            </div>
          </div>
        </section>

        <section id="offer" aria-labelledby="offer-title" className="section-y">
          <div className="container-site">
            <SectionHead id="offer">Two ways to start.</SectionHead>
            <div className="mt-14 grid gap-7 lg:grid-cols-2">
              <div className="card flex flex-col gap-3 text-text-m">
                <h3 className="text-title-m">Pipeline Truth Audit</h3>
                <p className="font-display text-[1.05rem] font-bold text-ink">$1,500 · 5 business days</p>
                <p className="text-body">20 checks. A baseline of the last 90 days. A one-page scorecard. A 90-day roadmap. The three material issues, ranked by revenue impact. Credited against the first month if you continue.</p>
              </div>
              <div className="card flex flex-col gap-3 text-text-m">
                <h3 className="text-title-m">Fractional Measurement Lead</h3>
                <p className="font-display text-[1.05rem] font-bold text-ink">$5,000/month · 25 hours · 3-month initial</p>
                <p className="text-body">Month 1: audit, definitions and roadmap. Months 2–3: monthly scorecard, fixes and a 60-minute review. You keep your agency; we keep the number true.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="scope" aria-labelledby="scope-title" className="section-y band">
          <div className="container-site grid gap-7 lg:grid-cols-[7fr_5fr] lg:items-start">
            <div className="card">
              <h2 id="scope-title" className="text-title-m">What’s included</h2>
              <TickList items={included} className="mt-6 text-text-m" />
            </div>
            <div className="card">
              <h2 className="text-title-m">What’s not included</h2>
              <ul className="dot-list text-text-m">
                {notIncluded.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="first-30-days" aria-labelledby="first-30-days-title" className="section-y">
          <div className="container-site">
            <SectionHead id="first-30-days">
              The first <Accent>30 days.</Accent>
            </SectionHead>
            <ol className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {weeks.map(([w, lead, rest], i) => (
                <li key={w} className="card group flex flex-col gap-3 p-6 text-text-m">
                  <Numeral n={i + 1} pad className="!text-[3.2rem]" />
                  <h3 className="text-title-xs"><span className="text-muted">{w}. </span>{lead}</h3>
                  <p className="text-body">{rest}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="for" aria-labelledby="for-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="for">Who it’s for.</SectionHead>
            <p className="card mx-auto mt-10 max-w-[52rem] text-text-l">
              $10–50M ARR · 20–200 employees · HubSpot Professional or Enterprise · Google Ads $10k+/month · sales-led or hybrid · 2–15 marketing staff · US, UK or Canada.
            </p>
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-title" className="section-y">
          <div className="container-site">
            <SectionHead id="pricing">Pricing.</SectionHead>
            <div className="card mx-auto mt-10 max-w-[60rem]">
              <ReportTable
                caption="B2B SaaS offers and prices"
                head={["Offer", "Price", "Scope"]}
                right={[1]}
                rows={[
                  ["Pipeline Truth Audit", "$1,500", "5 business days; 20 checks; baseline; roadmap"],
                  ["Fractional Measurement Lead", "$5,000/month", "25 hours; 3-month initial; monthly scorecard"],
                  ["Founding-client rate", "$4,000/month", "First 2 clients; 3 months; case study required"],
                ]}
              />
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

        <CtaBand id="start" title="Start with the audit." body="Five business days. 20 checks. If we don’t find three material issues, you don’t continue.">
          <BookButton className="w-full sm:w-auto">Book the audit</BookButton>
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
