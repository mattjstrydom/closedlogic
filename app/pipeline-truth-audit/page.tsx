import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero, { KICKER } from "../components/page-hero";
import SiblingServices from "../components/sibling-services";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import AuditChecks from "../components/audit-checks";
import { Accent, SectionHead, TickList } from "../components/ui";
import { bookUrl } from "../booking";
import { coreChecks } from "../checks-data";
import { faqNode, jsonLdScript, orgNode, serviceNode } from "../jsonld";
import { offers, auditCredit, auditGuarantee } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Pipeline Truth Audit: 10 Core Checks | Closed Logic",
  description: `Ten checks across Google Ads, your CRM and your reporting, with a 90-day baseline, a scorecard and a roadmap. ${offers.audit.price} fixed, delivered within ${offers.audit.days} business days of access.`,
  path: "/pipeline-truth-audit",
  absoluteTitle: true,
});

const gets = [
  "10 core checks across your Google Ads, HubSpot (or other CRM) and reporting",
  "A baseline of the last 90 days: where the numbers disagree, and why",
  "A one-page scorecard",
  "A 90-day roadmap",
  "A readout call, where we take you through the report",
  "Each finding with its evidence and the steps to reproduce it",
];

const faqs = [
  { q: "How long does the audit take?", a: `We deliver the written report within ${offers.audit.days} business days of receiving the read-only access we need.` },
  { q: "Do you change anything in our accounts?", a: "No. The audit uses read-only access. We don't change anything in your accounts as part of the audit." },
  { q: "What does the audit guarantee cover?", a: `${auditGuarantee} We refund within 14 days of delivering the audit report, and you keep the report. The full test is in clause 3.6 of our terms.` },
  { q: "What if we want you to keep going after the audit?", a: auditCredit },
  { q: "What if we don't continue?", a: "You keep the report, the baseline and the roadmap. No lock-in." },
  { q: "How quickly will you reply?", a: "Within 1 business day." },
];

export default function PipelineTruthAudit() {
  const book = bookUrl("audit-cta", "pipeline-truth-audit");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            orgNode,
            serviceNode("pipeline-truth-audit", offers.audit.name, "Marketing measurement audit", "10 core checks across Google Ads, the CRM and reporting, with a 90-day baseline, a one-page scorecard, a 90-day roadmap and a readout call.", offers.audit.amount, `${site.url}/pipeline-truth-audit`),
            faqNode(faqs),
          ]),
        }}
      />
      <Header path="/pipeline-truth-audit" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="pipeline-truth-audit" eyebrow="Pipeline Truth Audit" kicker={KICKER}
          title="Pipeline Truth Audit: do your numbers add up?"
          sub={`Ten checks across Google Ads, your CRM and your reporting. ${offers.audit.price} fixed, delivered within ${offers.audit.days} business days of access.`}
          micro="You keep your agency. We sell no media and take no cut of your ad spend."
        >
          <a href={book} data-cta="book" data-cta-page="pipeline-truth-audit" target="_blank" rel="noopener noreferrer" className="btn w-full sm:w-auto">
            Book an audit scoping call<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/free-check" className="link font-semibold">Or start with the free check</Link>
        </PageHero>
        <SiblingServices current="/pipeline-truth-audit" />

        <section id="get" aria-labelledby="get-title" className="section-y">
          <div className="container-site">
            <SectionHead id="get">What you <Accent>get.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[52rem]">
              <TickList items={gets} className="text-text-m" />
              <p className="mt-6 text-body">The audit is for larger accounts. For one defined tracking problem, <Link href="/signal-fix" className="link">Signal Fix</Link> is the faster route.</p>
            </div>
          </div>
        </section>

        <section id="checks" aria-labelledby="checks-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="checks">The 10 core <Accent>checks.</Accent></SectionHead>
            <div className="mx-auto mt-10 max-w-[56rem]">
              <AuditChecks items={coreChecks} />
            </div>
            <p className="mx-auto mt-6 max-w-[52rem] text-center text-body">
              Read how the checks work in our <Link href="/method#checks" className="link">method</Link>, and how we handle access in our <Link href="/access" className="link">access policy</Link>.
            </p>
          </div>
        </section>

        <section id="guarantee" aria-labelledby="guarantee-title" className="section-y">
          <div className="container-site">
            <SectionHead id="guarantee">The <Accent>guarantee.</Accent></SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">{auditGuarantee}</p>
            <p className="mx-auto mt-4 max-w-[44rem] text-center text-body">{auditCredit}</p>
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

        <CtaBand id="start" title="Book an audit scoping call." body={`${offers.audit.price}, fixed. We confirm what's in scope before any work starts.`}>
          <a href={book} data-cta="book" data-cta-page="pipeline-truth-audit" target="_blank" rel="noopener noreferrer" className="btn w-full sm:w-auto">
            Book an audit scoping call<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/pricing" className="link font-semibold">See every price</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
