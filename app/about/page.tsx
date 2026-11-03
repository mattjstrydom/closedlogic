import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import Headshot from "../components/headshot";
import { TickList } from "../components/ui";
import { jenniferNode, jsonLdScript, mattNode, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
import { team } from "../team";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "About Closed Logic: Matt Strydom and Jennifer Taylor",
  description: "Who does the work, how we handle access to your accounts, and what we will never do.",
  path: "/about",
  absoluteTitle: true,
});

const never = [
  "Sell media or take a cut of your ad spend",
  "Change anything without your written approval",
  "Keep access after a job is finished",
  "Ask for your passwords or payment details",
  "Name you as a client without your written permission",
];

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode, mattNode, jenniferNode]) }} />
      <Header path="/about" />
      <main id="main" tabIndex={-1}>
        <PageHero id="about" title="Two operators. No account managers." sub="The people you talk to are the people who do the work." />

        <section id="who" aria-labelledby="who-title" className="section-y band">
          <div className="container-site">
            <div className="mx-auto flex max-w-[52rem] flex-col gap-6">
              {team.map((p, i) => {
                const Heading = i === 0 ? "h2" : "h3";
                return (
                  <div key={p.id} id={p.id} className="card flex flex-col gap-5 text-text-l sm:flex-row sm:items-start sm:gap-7">
                    <Headshot person={p} />
                    <div className="min-w-0">
                      <Heading id={i === 0 ? "who-title" : undefined} className="text-title-m">{p.heading}</Heading>
                      <p className="mt-4 text-body">{p.bio}</p>
                      {p.linkedin && (
                        <p className="mt-3">
                          <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                            {p.name} on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="never" aria-labelledby="never-title" className="section-y">
          <div className="container-site">
            <div className="card mx-auto max-w-[52rem]">
              <h2 id="never-title" className="text-title-m">What we&apos;ll never do</h2>
              <TickList items={never} className="mt-6 text-text-m" />
              <p className="mt-6 text-body">
                Read how we handle access in our <Link href="/access" className="link">access policy</Link>.
              </p>
            </div>
          </div>
        </section>

        <section id="company" aria-labelledby="company-title" className="section-y band">
          <div className="container-site">
            <div className="mx-auto max-w-[52rem] text-text-m text-body">
              <h2 id="company-title" className="text-title-s text-ink">Company details</h2>
              <p className="mt-3">{site.legalLine}, 530-B Harkle Road, STE 100, Santa Fe, NM 87505, USA.</p>
            </div>
          </div>
        </section>

        <CtaBand id="start" title="Start with a free check." body="We look at what your site sends to Google Ads, with no logins, and send you the evidence.">
          <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
          <Link href="/contact" className="btn-outline w-full sm:w-auto">Talk to us</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
