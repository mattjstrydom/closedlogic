import Header from "../components/header";
import Footer from "../components/footer";
import RequestForm from "../components/request-form";
import { Accent, TickList } from "../components/ui";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Contact: bring three numbers",
  description: "A 20-minute pipeline review. No pitch. A diagnosis. Bring your Google Ads conversions, your HubSpot pipeline and the number in your board deck.",
  path: "/contact",
});

const bring = [
  "Google Ads conversions for the last 90 days",
  "HubSpot pipeline for the same period",
  "The pipeline number in your board deck or investor update",
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
                Bring <Accent>three numbers.</Accent>
              </h1>
              <p className="lead max-w-[40rem]">A 20-minute pipeline review. No pitch. A diagnosis.</p>
            </div>
          </div>
        </section>

        <section aria-label="Request a review" className="section-y !pt-6">
          <div className="container-site grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-14">
            <div className="card">
              <RequestForm
                choose
                email={site.email}
                bookUrls={{ b2b: site.bookPath, partner: site.bookPartnerPath, ...(site.showPE ? { pe: site.bookPePath } : {}) }}
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
                  <li>We tell you which number is wrong and why.</li>
                  <li>If it is a fit, we scope the audit. If it isn’t, we tell you.</li>
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
