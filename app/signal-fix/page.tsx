import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import { BookButton } from "../components/cta";
import { TickList } from "../components/ui";
import { jsonLdScript, orgNode } from "../jsonld";
import { offers, fixScope, fixDeliverables, fixGuarantee } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: `${offers.fix.name}: ${offers.fix.price}, fixed scope`,
  description: `We fix which conversions Google Ads counts, set up form-submit and booking events and capture click IDs in HubSpot. ${offers.fix.price}, fixed scope, with a ${offers.fix.guaranteeDays}-day guarantee.`,
  path: "/signal-fix",
});

export default function SignalFix() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/signal-fix" />
      <main id="main" tabIndex={-1}>
        <PageHero id="signal-fix" title={`${offers.fix.name}: ${offers.fix.price}.`} sub="A fixed-scope fix for what your Google Ads and HubSpot setup is miscounting. You can check every change without us." />

        <section id="scope" aria-labelledby="scope-title" className="section-y band">
          <div className="container-site grid gap-7 lg:grid-cols-2 lg:items-start">
            <div className="card">
              <h2 id="scope-title" className="text-title-m">Fixed scope</h2>
              <TickList items={fixScope} className="mt-6 text-text-m" />
              <p className="mt-5 text-body">{fixDeliverables}</p>
            </div>
            <div className="card">
              <h2 className="text-title-m">Guarantee</h2>
              <p className="mt-4 text-body">{fixGuarantee}</p>
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Reply “fix”, or get the free check first." body={`${offers.fix.price}, fixed scope. We confirm the written scope before any work starts.`}>
          <a href={`mailto:${site.email}?subject=fix`} className="btn w-full sm:w-auto">Reply “fix”</a>
          <BookButton campaign="signal-fix" className="w-full sm:w-auto" />
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
