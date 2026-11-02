import { bookHref } from "../booking";
import Header from "../components/header";
import Footer from "../components/footer";
import RequestForm from "../components/request-form";
import { Accent, TickList } from "../components/ui";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Contact: a free check or a fit call",
  description: "Ask for a free outside-in check, or book a 20-minute fit call.",
  path: "/contact",
});

const bring = [
  "The Google Ads and HubSpot setup you want checked",
  "What you already think is miscounted, if anything",
  "Who looks after your site, tag manager and forms",
];

export default function Contact() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/contact" />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="contact-title" className="hero-grid">
          <div className="container-site pb-16 pt-20 max-lg:pb-10 max-lg:pt-12">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 id="contact-title" className="heading-center text-title-xl">
                Talk to <Accent>us.</Accent>
              </h1>
              <p className="lead max-w-[40rem]">Ask for a free outside-in check, or book a 20-minute fit call.</p>
            </div>
          </div>
        </section>

        <section aria-label="Contact form" className="section-y !pt-6">
          <div className="container-site grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-14">
            <div className="card">
              <RequestForm
                choose
                email={site.email}
                bookUrls={{ b2b: bookHref("contact"), ...(site.showPE ? { pe: bookHref("contact", "pe") } : {}) }}
              />
            </div>
            <div className="space-y-7">
              <div className="card">
                <h2 className="text-title-m">What to bring</h2>
                <TickList items={bring} className="mt-6 text-text-m" />
              </div>
              <div className="card">
                <h2 className="text-title-m">What happens next</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-6 text-text-m">
                  <li>A 20-minute call.</li>
                  <li>We tell you whether a check is worth doing.</li>
                  <li>If it is a fit, we start with the free outside-in check or scope the work. If it isn’t, we tell you.</li>
                </ol>
                <p className="mt-5 text-text-s text-muted">No NDA needed for the call. We sign one before data access.</p>
                <p className="mt-3 text-text-s text-muted">
                  Or email <a href={`mailto:${site.email}`} className="link">{site.email}</a>. {site.replyTime}.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
