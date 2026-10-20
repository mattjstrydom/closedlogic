import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import { BookButton } from "../components/cta";
import { Accent, TickList } from "../components/ui";
import { jsonLdScript, mattNode, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "About: independent by design",
  description: "Closed Logic is an independent measurement practice. We don’t run media, sell CRM implementation or build dashboards. We make the numbers comparable.",
  path: "/about",
});

const beliefs = [
  "The number should reconcile to the CRM, not to the dashboard.",
  "Independence is a feature, not a positioning line.",
  "A standard is more useful than another tool.",
  "If we can’t find three material issues, we shouldn’t take the retainer.",
];

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode, mattNode]) }} />
      <Header path="/about" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="about"
          title="Independent by design."
          sub="Closed Logic is an independent measurement practice. We don’t run media, sell CRM implementation or build dashboards. We make the numbers comparable."
        />

        <section id="independent" aria-labelledby="independent-title" className="section-y band">
          <div className="container-site">
            <div className="mx-auto max-w-[48rem] text-center">
              <h2 id="independent-title" className="heading-center text-title-l">
                The number is only useful if the person measuring it <Accent>isn’t selling the thing being measured.</Accent>
              </h2>
              <p className="lead mt-6">Media agencies are paid to run media. CRM partners are paid to implement CRM. Dashboard tools are paid per seat. None of them is paid to tell you that the number is wrong. That is the gap Closed Logic fills.</p>
            </div>
          </div>
        </section>

        <section id="who" aria-labelledby="who-title" className="section-y">
          <div className="container-site">
            <div className="card mx-auto max-w-[52rem] text-text-l">
              <h2 id="who-title" className="text-title-m">Matt Strydom, founder.</h2>
              <p className="mt-4 text-body">Technical marketing ops background: HubSpot, Google Ads, tracking, attribution, Cloudflare and Stripe. I have built the systems and lived in the numbers. Closed Logic is the practice that came out of that work.</p>
              <p className="mt-4 text-text-s text-muted">Reubika LLC · US LLC · Built for B2B SaaS and PE-backed companies in the US, UK and Canada.</p>
            </div>
          </div>
        </section>

        <section id="beliefs" aria-labelledby="beliefs-title" className="section-y band">
          <div className="container-site">
            <div className="card mx-auto max-w-[52rem]">
              <h2 id="beliefs-title" className="text-title-m">What we believe</h2>
              <TickList items={beliefs} className="mt-6 text-text-m" />
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Bring three numbers." body="Google Ads conversions. HubSpot pipeline. The number in your board deck. We’ll tell you which one is wrong.">
          <BookButton className="w-full sm:w-auto">Book a 20-minute review</BookButton>
          <a href={`mailto:${site.email}`} className="btn-outline w-full sm:w-auto">Email us</a>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
