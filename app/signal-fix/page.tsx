import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import ReportTable from "../components/report-table";
import { TickList, SectionHead, Accent } from "../components/ui";
import { faqNode, jsonLdScript, orgNode, serviceNode } from "../jsonld";
import { offers, fixExamples, fixExtra, fixDeliverablesList, fixGuarantee } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Google Ads Conversion Fix for HubSpot: $750 | Closed Logic",
  description: "One miscounted Google Ads conversion, fixed at a fixed price. Read-only access, a change log to undo every change, and a 30-day guarantee.",
  path: "/signal-fix",
  absoluteTitle: true,
});

const steps: string[][] = [
  ["1. Scope", "We confirm the problem and the fix in writing", "15-minute call or email"],
  ["2. Access", "You grant read-only access, and edit access only to the settings in scope", "10 minutes"],
  ["3. Fix", "We make the change and test it", "None"],
  ["4. Handover", "You get the before-and-after check and change log", "20 minutes"],
  ["5. Access removed", "We confirm in writing that our access has been removed", "None"],
];

const faqs = [
  { q: "Do I need to change agencies?", a: "No. We can work alongside your agency, or hand them our findings." },
  { q: "Will this change my bidding?", a: "Only if you approve it. We'll tell you which conversion your volume can support for bidding, and why." },
  { q: "What if the problem is bigger than one fix?", a: "We'll tell you before starting, and quote each extra fix separately." },
  { q: "How quickly will you reply?", a: "Within 1 business day." },
];

const mailFix = `mailto:matt@closedlogic.co?subject=fix`;

export default function SignalFix() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            orgNode,
            serviceNode("signal-fix", offers.fix.name, "Conversion tracking fix", "One defined Google Ads and HubSpot conversion defect, fixed, tested and documented, with a before-and-after check and a change log.", "750", `${site.url}/signal-fix`),
            faqNode(faqs),
          ]),
        }}
      />
      <Header path="/signal-fix" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="signal-fix"
          title="Google Ads conversion tracking fix for HubSpot: $750"
          sub="One miscounted conversion, fixed, tested and documented. You see the scope and the price before we start."
        >
          <a href={mailFix} className="btn w-full sm:w-auto">Email us “fix”</a>
          <Link href="/free-check" className="link font-semibold">Get the free check first</Link>
        </PageHero>

        <section id="covers" aria-labelledby="covers-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="covers">What one fix <Accent>covers.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[52rem]">
              <p className="text-text-l">We fix one defined problem between Google Ads and HubSpot, for example:</p>
              <TickList items={fixExamples} className="mt-6 text-text-m" />
              <p className="mt-6 text-body">{fixExtra}</p>
            </div>
          </div>
        </section>

        <section id="get" aria-labelledby="get-title" className="section-y">
          <div className="container-site">
            <SectionHead id="get">What you <Accent>get.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[52rem]">
              <TickList items={fixDeliverablesList} className="text-text-m" />
            </div>
          </div>
        </section>

        <section id="how" aria-labelledby="how-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="how">How it <Accent>works.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[60rem]">
              <ReportTable caption="The five steps of a Signal Fix" head={["Step", "What happens", "Your time"]} rows={steps} />
            </div>
            <p className="mx-auto mt-6 max-w-[52rem] text-center text-body">
              Read how we handle access in our <Link href="/access" className="link">access policy</Link>.
            </p>
          </div>
        </section>

        <section id="guarantee" aria-labelledby="guarantee-title" className="section-y">
          <div className="container-site">
            <SectionHead id="guarantee">The <Accent>guarantee.</Accent></SectionHead>
            <p className="lead lead-center mt-6 max-w-[44rem]">{fixGuarantee}</p>
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

        <CtaBand id="start" title="Ready to fix it?" body={`${offers.fix.price}, one defined fix. We confirm the written scope before any work starts.`}>
          <a href={mailFix} className="btn w-full sm:w-auto">Email us “fix”</a>
          <Link href="/free-check" className="link font-semibold">Not sure yet? Get the free check</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
