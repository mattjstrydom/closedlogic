import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import Faq from "../components/faq";
import CheckForm from "../components/check-form";
import { SectionHead, Accent, TickList } from "../components/ui";
import { checkFaqs } from "../faqs";
import { faqNode, jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Free Google Ads Conversion Check for HubSpot Sites",
  description: "We look at what your site sends to Google Ads from outside, with no logins, and send you the evidence. Free, with no obligation.",
  path: "/free-check",
  absoluteTitle: true,
});

const get = [
  "What your site sends to Google Ads, as a browser sees it, with the evidence",
  "Steps your team can follow to check each finding without us",
  "A plain note if we couldn't find anything worth fixing",
];
const never = ["Ask for logins or passwords", "Submit your forms", "Change anything on your site or in your accounts"];

export default function FreeCheck() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode, faqNode(checkFaqs)]) }} />
      <Header path="/free-check" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="free-check"
          title="Free Google Ads conversion check for HubSpot sites"
          sub="We look at what your site sends to Google Ads from outside, with no logins, and send you the evidence."
        />

        <section id="request" aria-labelledby="request-title" className="section-y !pt-6">
          <div className="container-site">
            <div className="mx-auto max-w-[36rem] text-center">
              <h2 id="request-title" className="heading-center text-title-l">Get my free check</h2>
              {/* Where the example check goes later: a link to an anonymized example check, only once a real, permitted example exists. */}
              <div className="card mt-8"><CheckForm email={site.email} /></div>
            </div>
          </div>
        </section>

        <section id="get" aria-labelledby="get-title" className="section-y band">
          <div className="container-site grid gap-7 lg:grid-cols-2 lg:items-start">
            <div className="card">
              <h2 id="get-title" className="text-title-m">What you get</h2>
              <TickList items={get} className="mt-6 text-text-m" />
            </div>
            <div className="card">
              <h2 className="text-title-m">What we never do in a free check</h2>
              <ul className="dot-list text-text-m">
                {never.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="mt-5 text-body">
                Read how we handle access if you hire us in our <Link href="/access" className="link">access policy</Link>.
              </p>
            </div>
          </div>
        </section>

        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions">Questions.</SectionHead>
            <div className="mx-auto mt-12 max-w-[900px]">
              <Faq items={checkFaqs} />
            </div>
            <p className="mx-auto mt-8 max-w-[44rem] text-center text-text-l text-body">
              If we find something, <Link href="/signal-fix" className="link">Signal Fix</Link> is <Accent>$750</Accent> for one defined fix.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
