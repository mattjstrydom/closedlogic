import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import { BookButton } from "../components/cta";
import { Accent, TickList } from "../components/ui";
import { jenniferNode, jsonLdScript, mattNode, orgNode } from "../jsonld";
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
  "If the audit doesn’t find at least three material issues, we refund the full $1,500 within 14 days.",
];

// Team cards. To add a headshot: put a square JPG in public/team/, list it in images.manifest.json with [96, 192],
// run `node scripts/build-images.mjs`, then set photo below. Without a photo the card shows the initials in the same circle.
type Person = { id: string; name: string; initials: string; heading: string; bio: string; photo?: string; alt?: string };
const team: Person[] = [
  {
    id: "matt",
    name: "Matt Strydom",
    initials: "MS",
    heading: "Matt Strydom, founder.",
    bio: "Technical marketing ops background: HubSpot, Google Ads, tracking, attribution, Cloudflare and Stripe. I have built the systems and lived in the numbers. Closed Logic is the practice that came out of that work.",
    photo: "/team/matt.jpg",
    alt: "Matt Strydom, founder of Closed Logic",
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
            <div className="mx-auto flex max-w-[52rem] flex-col gap-6">
              {team.map((p, i) => {
                const Heading = i === 0 ? "h2" : "h3";
                return (
                  <div key={p.id} id={p.id} className="card flex flex-col gap-5 text-text-l sm:flex-row sm:items-start sm:gap-7">
                    <Headshot person={p} />
                    <div className="min-w-0">
                      <Heading id={i === 0 ? "who-title" : undefined} className="text-title-m">{p.heading}</Heading>
                      <p className="mt-4 text-body">{p.bio}</p>
                    </div>
                  </div>
                );
              })}
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
