import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import ReportTable from "../components/report-table";
import { BookButton } from "../components/cta";
import { TickList } from "../components/ui";
import Faq from "../components/faq";
import { faqNode, jsonLdScript, orgNode } from "../jsonld";
import { guaranteeFaqs } from "../guarantee";
import { offers, fixScope, fixScopeLine, fixDeliverables, fixGuarantee, watchChecks, watchTerms, checkOfferText, auditCredit, foundingFixText, foundingFractionalText, foundingRule, fractionalTerm } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Pricing: fixed scope, fixed price, no media percentage",
  description: `Free outside-in check. ${offers.fix.name} ${offers.fix.price}. ${offers.watch.name} ${offers.watch.per}. For larger accounts: audit ${offers.audit.price}, Fractional ${offers.fractional.per}. No percentage of ad spend.`,
  path: "/pricing",
});

const rows: React.ReactNode[][] = [
  [offers.check.name, offers.check.price, checkOfferText, "Anyone running Google Ads into HubSpot"],
  [offers.fix.name, offers.fix.price, `Fixed scope: ${fixScopeLine}. ${fixDeliverables}`, "Teams that know something is miscounted"],
  [offers.watch.name, offers.watch.per, `Weekly checks. ${watchTerms}`, "Teams that want it checked every week"],
  [offers.audit.name, offers.audit.price, `For larger accounts. ${offers.audit.days} business days from read access; 10 core checks; 90-day baseline; roadmap. ${auditCredit}`, "Larger accounts that need a diagnosis"],
  [offers.fractional.name, offers.fractional.per, `For larger accounts, after the audit. ${offers.fractional.hours} hours; the 10 core checks plus 10 extended checks; scorecard; fixes. ${fractionalTerm}`, "Larger accounts that need an owner"],
];

const always = ["A named owner", "A written scope", "Steps you can check without us for every finding"];
const never = ["Media buying", "Creative or content", "CRM migration", "A new dashboard", "A percentage of ad spend"];

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode, faqNode(guaranteeFaqs)]) }} />
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
            <div id="founding" className="card mx-auto mt-7 max-w-[72rem]">
              <h2 className="text-title-m">Founding clients</h2>
              <ul className="dot-list mt-4 text-text-m">
                <li>{foundingFixText}</li>
                <li>{foundingFractionalText}</li>
              </ul>
              <p className="mt-4 text-body">{foundingRule}</p>
            </div>
          </div>
        </section>

        <section id="fix" aria-labelledby="fix-title" className="section-y">
          <div className="container-site grid gap-7 lg:grid-cols-2 lg:items-start">
            <div className="card">
              <h2 id="fix-title" className="text-title-m">{offers.fix.name}: {offers.fix.price}, fixed scope</h2>
              <TickList items={fixScope} className="mt-6 text-text-m" />
              <p className="mt-5 text-body">{fixDeliverables}</p>
            </div>
            <div className="card">
              <h2 className="text-title-m">The {offers.fix.name} guarantee</h2>
              <p className="mt-4 text-body">{fixGuarantee}</p>
              <p className="mt-4 text-body">{offers.fix.name} has no credit toward {offers.watch.name}.</p>
            </div>
          </div>
        </section>

        <section id="watch" aria-labelledby="watch-title" className="section-y band">
          <div className="container-site grid gap-7 lg:grid-cols-2 lg:items-start">
            <div className="card">
              <h2 id="watch-title" className="text-title-m">{offers.watch.name}: {offers.watch.per}</h2>
              <p className="mt-4 text-body">Weekly checks of:</p>
              <TickList items={watchChecks} className="mt-4 text-text-m" />
              <p className="mt-5 text-body">{watchTerms}</p>
            </div>
            <div className="card">
              <h2 className="text-title-m">What’s always included</h2>
              <TickList items={always} className="mt-6 text-text-m" />
              <h2 className="mt-8 text-title-m">What’s never included</h2>
              <ul className="dot-list text-text-m">
                {never.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Not sure which one?" body="Start with the free outside-in check. For larger accounts, the audit is the way in. If it doesn’t find at least three material issues, we refund the full $1,500 within 14 days of the audit readout. You keep the report, the baseline and the roadmap.">
          <Link href="/#check" className="btn w-full sm:w-auto">Get a free outside-in check</Link>
          <BookButton campaign="pricing" className="w-full sm:w-auto" />
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>

        <section id="guarantee-questions" aria-labelledby="guarantee-questions-title" className="section-y">
          <div className="container-site">
            <h2 id="guarantee-questions-title" className="heading-center text-center text-title-m">How the audit guarantee works</h2>
            <div className="mx-auto mt-10 max-w-[900px]">
              <Faq items={guaranteeFaqs} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
