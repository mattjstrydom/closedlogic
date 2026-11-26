import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import { PricingTier } from "../components/cl";
import Faq from "../components/faq";
import { faqNode, jsonLdScript, orgNode } from "../jsonld";
import { guaranteeFaqs } from "../guarantee";
import { offers, auditCredit, auditGuarantee } from "../offers";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Pricing: Fractional Marketing Ops | Closed Logic",
  description: "Published prices: free check, Signal Fix, a monthly CRM ops plan, and options for larger teams. No percentage of ad spend.",
  path: "/pricing",
  absoluteTitle: true,
});

const rows: React.ReactNode[][] = [
  [offers.check.name, offers.check.price, "What your site sends to Google Ads, with evidence and self-check steps"],
  [<Link key="fix" href="/signal-fix" className="link">{offers.fix.name}</Link>, offers.fix.price, `One defined fix, before-and-after check, change log, ${offers.fix.guaranteeDays}-day guarantee`],
  [<Link key="pilot" href="/ops-desk" className="link">{offers.pilot.name}</Link>, offers.pilot.price, `One defined request, up to ${offers.pilot.hours} hours, scoped, built, tested and documented`],
  [<Link key="ops" href="/ops-desk" className="link">{offers.ops.name}</Link>, offers.ops.per, `Up to ${offers.ops.hours} hours, one active request, weekly updates, ${offers.ops.noticeDays} days' notice`],
  [<Link key="audit" href="/pipeline-truth-audit" className="link">{offers.audit.name}</Link>, offers.audit.price, "For larger accounts: 10 core checks, a 90-day baseline, a roadmap and a readout call"],
  [<Link key="frac" href="/measurement-lead" className="link">{offers.measurement.name}</Link>, offers.measurement.per, `For larger accounts: ${offers.measurement.hours} hours a month, 3-month term. Cancel in the first 30 days and pay only that month.`],
];

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode, faqNode(guaranteeFaqs)]) }} />
      <Header path="/pricing" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="pricing" eyebrow="Pricing"
          title="Every price, in full"
          sub="No percentage of ad spend, no hidden setup fees. If something isn't listed here, we quote it before any work starts."
        />

        <section id="plans" aria-labelledby="plans-title" className="section-y">
          <div className="container-site">
            <h2 id="plans-title" className="sr-only">The four paid offers</h2>
            <div className="cl-pricing cl-pricing--4">
              <PricingTier name={offers.fix.name} price={offers.fix.price} per="one-time" desc="For one defined tracking problem between Google Ads and your CRM."
                items={["One defined fix, tested and documented", "Before-and-after check and a change log with undo steps", `${offers.fix.guaranteeDays}-day guarantee: the remedy is the free fix`]}>
                <Link href="/signal-fix" className="btn">See Signal Fix</Link>
              </PricingTier>
              <PricingTier name={offers.audit.name} price={offers.audit.price} per="one-time" desc="For larger accounts that need the whole setup checked."
                items={["10 core checks across Google Ads, your CRM and reporting", "A 90-day baseline, a scorecard and a roadmap", "Full refund if it finds nothing that changes how Google Ads counts, bids on or attributes your leads"]}>
                <Link href="/pipeline-truth-audit" className="btn-outline">See the audit</Link>
              </PricingTier>
              <PricingTier name={offers.ops.name} price={offers.ops.price} per="/month" desc="For teams with a standing backlog of marketing ops work."
                items={[`Start with a ${offers.pilot.price} pilot: one request, up to ${offers.pilot.hours} hours`, `Up to ${offers.ops.hours} hours a month, one active request, weekly updates`, `Month to month after the pilot, ${offers.ops.noticeDays} days' notice`]}>
                <Link href="/ops-desk" className="btn-outline">See the plan</Link>
              </PricingTier>
              <PricingTier name={offers.measurement.name} price={offers.measurement.price} per="/month" desc="For larger accounts that want a measurement lead each month."
                items={[`${offers.measurement.hours} hours a month, with a monthly scorecard`, "3-month term. Cancel in the first 30 days and pay only that month", "The audit fee is credited if you continue within 30 days of the report"]}>
                <Link href="/measurement-lead" className="btn-outline">See the Measurement Lead</Link>
              </PricingTier>
            </div>
            <p className="mt-8 text-center text-text-m text-body">
              On every offer: read-only access where possible, a written scope before work starts, a change log with how to undo each change, and no percentage of ad spend.{" "}
              Want the free check first? <Link href="/free-check" className="link font-semibold">Get a free check</Link>, or <Link href="/contact" className="link font-semibold">talk to us</Link>.
            </p>
          </div>
        </section>

        <section id="table" aria-labelledby="table-title" className="section-y band">
          <div className="container-site">
            <h2 id="table-title" className="heading-center mb-8 text-center text-title-m">Every price in one table</h2>
            <div className="card mx-auto max-w-[72rem]">
              <ReportTable caption="Offers, prices and what each includes" head={["Offer", "Price", "What's included"]} right={[1]} rows={rows} />
            </div>
            <p className="mx-auto mt-5 max-w-[72rem] text-text-m text-body">{auditCredit}</p>
            <p className="mx-auto mt-3 max-w-[72rem] text-text-m text-body">{auditGuarantee}</p>
            <p className="mx-auto mt-3 max-w-[72rem] text-text-m text-body">
              Read how we handle access in our <Link href="/access" className="link">access policy</Link>, and the full <Link href="/terms" className="link">terms</Link>.
            </p>
          </div>
        </section>

        <section id="guarantees" aria-labelledby="guarantees-title" className="section-y">
          <div className="container-site">
            <h2 id="guarantees-title" className="heading-center text-center text-title-m">How the guarantees work</h2>
            <div className="mx-auto mt-10 max-w-[900px]">
              <Faq items={guaranteeFaqs} />
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Not sure which one?" body="Start with the free check. We reply within 1 business day.">
          <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
          <Link href="/contact" className="btn-outline w-full sm:w-auto">Talk to us</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
