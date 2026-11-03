import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import { TickList } from "../components/ui";
import { jenniferNode, jsonLdScript, mattNode, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";
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

// Team cards. To add a headshot: put a square JPG in public/team/, list it in images.manifest.json with [96, 192],
// run `node scripts/build-images.mjs`, then set photo below. Without a photo the card shows the initials in the same circle.
// Jennifer has no LinkedIn link on the site yet; add `linkedin` to her entry when she wants one shown.
type Person = { id: string; name: string; initials: string; heading: string; bio: string; photo?: string; alt?: string; linkedin?: string };
const team: Person[] = [
  {
    id: "matt",
    name: "Matt Strydom",
    initials: "MS",
    heading: "Matt Strydom, founder.",
    bio: "Matt has spent 7 years in marketing and revenue operations. He runs HubSpot and Google Tag Manager in production for B2B SaaS, and has built CRM architecture, lead scoring and attribution across HubSpot, GA4, Google Ads, Clay and Amplitude.",
    photo: "/team/matt.jpg",
    alt: "Matt Strydom, founder of Closed Logic",
    linkedin: site.linkedin,
  },
  {
    id: "jennifer",
    name: "Jennifer Taylor",
    initials: "JT",
    heading: "Jennifer Taylor, revenue operations and MarTech.",
    bio: "Revenue operations and MarTech background: CRM resets, pipeline upgrades, lead routing and workflow automation, outbound systems, and reporting and attribution for sales and marketing leaders. She starts with clean data and consistent pipelines, so the reporting is something a team can trust.",
    photo: "/team/jennifer.jpg",
    alt: "Jennifer Taylor, Closed Logic",
  },
];

const headshot = "size-24 shrink-0 rounded-full border-2 border-solid border-ink";

function Headshot({ person }: { person: Person }) {
  if (person.photo) {
    return <Image src={person.photo} alt={person.alt ?? person.name} width={96} height={96} sizes="96px" className={`${headshot} object-cover`} />;
  }
  return (
    <div role="img" aria-label={person.name} className={`${headshot} flex items-center justify-center bg-band font-display text-[1.75rem] font-bold tracking-[-0.03em] text-ink`}>
      <span aria-hidden="true">{person.initials}</span>
    </div>
  );
}

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
