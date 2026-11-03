import Link from "next/link";
import { bookHref } from "../booking";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckForm from "../components/check-form";
import { Accent } from "../components/ui";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "Contact Closed Logic: free check or 20-minute call",
  description: "Ask for a free check, book a 20-minute call, or email us. We reply within 1 business day.",
  path: "/contact",
  absoluteTitle: true,
});

const next = [
  "We reply within 1 business day.",
  "If we find something, you get the evidence and steps to check it yourself.",
  "If we don't, we say so. No follow-up sequence unless you reply.",
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
                Talk to <Accent>us</Accent>
              </h1>
              <p className="lead max-w-[40rem]">Ask for a free check, book a 20-minute call, or email us directly.</p>
            </div>
          </div>
        </section>

        <section aria-label="Contact form" className="section-y !pt-6">
          <div className="container-site grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-14">
            <div className="card">
              <CheckForm email={site.email} withNote />
            </div>
            <div className="space-y-7">
              <div className="card">
                <h2 className="text-title-m">What happens next</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-6 text-text-m">
                  {next.map((t) => <li key={t}>{t}</li>)}
                </ol>
              </div>
              <div className="card text-text-m">
                <p>
                  Email: <a href={`mailto:${site.email}`} className="link">{site.email}</a>
                </p>
                <p className="mt-3">
                  Call:{" "}
                  <a href={bookHref("contact")} data-cta="book" data-cta-page="contact" target="_blank" rel="noopener noreferrer" className="link">
                    Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
                <p className="mt-3 text-text-s text-muted">
                  Prices are on the <Link href="/pricing" className="link">pricing page</Link>.
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
