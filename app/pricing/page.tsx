import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import Faq from "../components/faq";
import { faqNode, jsonLdScript, orgNode } from "../jsonld";
import { guaranteeFaqs } from "../guarantee";
import { offers, auditCredit, auditGuarantee } from "../offers";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Pricing: Conversion Fix and HubSpot Ops | Closed Logic",
  description: "Published prices: free check, $750 Signal Fix, a monthly HubSpot ops plan, and options for larger teams. No percentage of ad spend.",
  path: "/pricing",
  absoluteTitle: true,
});

const rows: React.ReactNode[][] = [
  [offers.check.name, offers.check.price, "What your site sends to Google Ads, with evidence and self-check steps"],
  [<Link key="fix" href="/signal-fix" className="link">{offers.fix.name}</Link>, offers.fix.price, "One defined fix, before-and-after check, change log, 30-day guarantee"],
  [<Link key="pilot" href="/ops-desk" className="link">{offers.pilot.name}</Link>, offers.pilot.price, "One defined request, scoped, built, tested and documented"],
  [<Link key="ops" href="/ops-desk" className="link">{offers.ops.name}</Link>, offers.ops.per, "Up to 10 hours, one active request, weekly updates, 30 days' notice"],
  [<Link key="audit" href="/method#checks" className="link">{offers.audit.name}</Link>, offers.audit.price, "For larger teams: 10 core checks, a 90-day baseline, a roadmap and a readout call"],
  [<Link key="frac" href="/fractional" className="link">{offers.fractional.name}</Link>, offers.fractional.per, "For larger teams: 25 hours a month; cancel in the first 30 days and pay only that month"],
];

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode, faqNode(guaranteeFaqs)]) }} />
      <Header path="/pricing" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="pricing"
          title="Every price, in full"
          sub="No percentage of ad spend, no hidden setup fees. If something isn't listed here, we quote it before any work starts."
        />

        <section id="table" aria-labelledby="table-title" className="section-y band">
          <div className="container-site">
            <h2 id="table-title" className="sr-only">Offers and prices</h2>
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
