import Link from "next/link";
import Faq from "../components/faq";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import AuditChecks from "../components/audit-checks";
import { BookButton } from "../components/cta";
import { Accent, Numeral, SectionHead, TickList } from "../components/ui";
import { extendedChecks, coreChecks } from "../checks-data";
import { faqNode, jsonLdScript, orgNode, serviceNode } from "../jsonld";
import { guaranteeFaqs } from "../guarantee";
import { offers, auditCredit, auditGuarantee, fractionalTerm } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Fractional Marketing Operations for HubSpot Teams",
  description: "The step after the audit: 25 hours a month on tracking, attribution, HubSpot lifecycle and reporting. Cancel in the first 30 days and pay only that month.",
  path: "/fractional",
  absoluteTitle: true,
});

const included = [
  "The 10 core checks and the 10 extended checks",
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
  ["Week 2", "The audit and the baseline.", "The 10 core checks, plus the last 90 days: where the numbers disagree and why."],
  ["Week 3", "The report and the roadmap.", ""],
  ["Week 4", "The first scorecard, and the first fixes you approve.", ""],
];

const faqs = [
  { q: "Do you replace our agency?", a: "No. You keep your agency. We give you steps to check its numbers without us." },
  { q: "Do you replace our CRM admin?", a: "No. We define what the CRM should measure and test whether it does." },
  { q: "How much of our time will this take?", a: "Two hours in week one, one hour in week four, then 60 minutes a month." },
  { q: "What happens after the audit if we don’t continue?", a: "You keep the report, the baseline and the roadmap. No lock-in." },
  ...guaranteeFaqs.slice(0, 1),
  { q: "Can you work with our stack?", a: "HubSpot and Google Ads are the core. If your stack is different, we’ll tell you before you buy." },
  { q: "How quickly will you reply?", a: "Within 1 business day." },
];

export default function Fractional() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            orgNode,
            serviceNode("fractional", offers.fractional.name, "Fractional marketing operations", "25 hours a month on tracking, attribution, HubSpot lifecycle and reporting, with a monthly scorecard. 3-month term; cancel in the first 30 days and pay only that month.", "5000", `${site.url}/fractional`, true),
            faqNode(faqs),
          ]),
        }}
      />
      <Header path="/fractional" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="fractional"
          title="Fractional marketing operations for larger accounts"
          sub="The step after the audit. We take over the tracking, attribution, HubSpot lifecycle and reporting checks: 25 hours a month, $5,000, with a 30-day exit."
          micro={["You keep your agency.", "We sell no media, resell no software and take no cut of your ad spend."]}
        >
          <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
          <Link href="/method#checks" className="btn-outline w-full sm:w-auto">See the 10 core checks</Link>
        </PageHero>

        <section id="offer" aria-labelledby="offer-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="offer">How larger accounts <Accent>start.</Accent></SectionHead>
            <div className="mt-14 grid gap-7 lg:grid-cols-2">
              <div className="card flex flex-col gap-3 text-text-m">
                <h3 className="text-title-m">{offers.audit.name}</h3>
                <p className="font-display text-[1.05rem] font-bold text-ink">{offers.audit.price} · {offers.audit.days} business days</p>
                <p className="text-body">The 10 core checks. A baseline of the last 90 days. A one-page scorecard. A 90-day roadmap. A readout call. {auditGuarantee} {auditCredit}</p>
              </div>
              <div className="card flex flex-col gap-3 text-text-m">
                <h3 className="text-title-m">{offers.fractional.name}</h3>
                <p className="font-display text-[1.05rem] font-bold text-ink">{offers.fractional.per} · {offers.fractional.hours} hours · 3-month term</p>
                <p className="text-body">Month 1: audit, definitions and roadmap. Months 2 and 3: monthly scorecard, fixes and a 60-minute review. Adds the 10 extended checks. {fractionalTerm} You keep your agency.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="scope" aria-labelledby="scope-title" className="section-y">
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

        <section id="extended" aria-labelledby="extended-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="extended">Extended checks <Accent>(Fractional).</Accent></SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">On top of the 10 <Link href="/method#checks" className="link">core checks</Link> in the audit, Fractional adds these 10.</p>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <AuditChecks items={extendedChecks} start={coreChecks.length + 1} />
            </div>
          </div>
        </section>

        <section id="first-30-days" aria-labelledby="first-30-days-title" className="section-y">
          <div className="container-site">
            <SectionHead id="first-30-days">The first <Accent>30 days.</Accent></SectionHead>
            <ol className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {weeks.map(([w, lead, rest], i) => (
                <li key={w} className="card group flex flex-col gap-3 p-6 text-text-m">
                  <Numeral n={i + 1} pad className="!text-[3.2rem]" />
                  <h3 className="text-title-xs"><span className="text-muted">{w}. </span>{lead}</h3>
                  {rest && <p className="text-body">{rest}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="for" aria-labelledby="for-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="for">Who it’s for.</SectionHead>
            <p className="card mx-auto mt-10 max-w-[52rem] text-text-l">
              For B2B companies running Google Ads into HubSpot, usually seed to Series B, and often just after hiring a marketing lead.
            </p>
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-title" className="section-y">
          <div className="container-site">
            <SectionHead id="pricing">Pricing.</SectionHead>
            <div className="card mx-auto mt-10 max-w-[60rem]">
              <ReportTable
                caption="Offers for larger accounts and their prices"
                head={["Offer", "Price", "Scope"]}
                right={[1]}
                rows={[
                  [offers.audit.name, offers.audit.price, `${offers.audit.days} business days from read access; 10 core checks; baseline; roadmap; readout call. ${auditCredit}`],
                  [offers.fractional.name, offers.fractional.per, `${offers.fractional.hours} hours; 10 core and 10 extended checks; monthly scorecard. ${fractionalTerm}`],
                ]}
              />
            </div>
            <p className="mx-auto mt-5 max-w-[60rem] text-center text-body">
              See <Link href="/pricing" className="link">every price</Link>.
            </p>
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

        <CtaBand id="start" title="Start with the free check." body="No logins, no obligation. We reply within 1 business day.">
          <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
          <BookButton campaign="fractional" className="w-full sm:w-auto" />
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
