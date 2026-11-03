import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import Faq from "../components/faq";
import ReportTable from "../components/report-table";
import { SectionHead, Accent } from "../components/ui";
import { bookHref } from "../booking";
import { faqNode, jsonLdScript, orgNode, serviceNode } from "../jsonld";
import { offers, opsLine } from "../offers";
import { pageMetadata } from "../seo";
import { site } from "../site.config";

export const metadata = pageMetadata({
  title: "HubSpot Operations Support, Monthly | Closed Logic",
  description: "HubSpot admin, tracking, routing and automation work on a monthly plan, with a request queue, fixed hours and weekly updates.",
  path: "/ops-desk",
  absoluteTitle: true,
});

const handle: string[][] = [
  ["Tracking and attribution", "Google Ads and HubSpot conversions, click IDs, UTMs, GA4 and Google Tag Manager"],
  ["HubSpot administration", "Properties, lifecycle stages, deal stages, data cleanup"],
  ["Routing and automation", "Lead routing, workflows, Make and Zapier automations"],
  ["Reporting", "Dashboards, report definitions, reconciling Google Ads and HubSpot counts"],
  ["Outbound setup", "Clay workflows, Apollo or Instantly setup, CRM sync for outbound"],
];

const steps = [
  ["Request.", "Add a request to a shared board. One person on your side decides priority."],
  ["Scope.", "We size it and confirm the plan before we start."],
  ["Build.", "We work on one main request at a time and test before release."],
  ["Update.", "Every week you get a short note: what's done, what's next, hours used."],
  ["Record.", "Every change goes into a change log with how to undo it."],
];

const pricing: string[][] = [
  [offers.pilot.name, offers.pilot.price, "One defined request, scoped, built, tested and documented"],
  [offers.ops.name, offers.ops.per, "Up to 10 hours a month, one active request, weekly updates. Month to month after the pilot, 30 days' notice"],
];

const faqs = [
  { q: "Who does the work?", a: "Matt and Jennifer, personally. We don't subcontract without your written approval." },
  { q: "How much access do you need?", a: "Only what each request needs, as set out in our access policy, and removed when we finish." },
  { q: "What if a request is bigger than the hours?", a: "We'll tell you before starting and offer to split it or quote it separately." },
  { q: "Can we stop?", a: "Yes. After the pilot it's month to month with 30 days' notice." },
  { q: "How quickly will you reply?", a: "Within 1 business day." },
];

export default function OpsDesk() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            orgNode,
            serviceNode("ops-desk", offers.ops.name, "HubSpot operations support", `HubSpot, tracking and automation work each month: up to ${offers.ops.hours} hours, one active request, weekly updates. Month to month after the pilot.`, "2500", `${site.url}/ops-desk`, true),
            serviceNode("ops-desk-pilot", offers.pilot.name, "HubSpot operations pilot", "One defined HubSpot, tracking or automation request, scoped, built, tested and documented.", "1250", `${site.url}/ops-desk`),
            faqNode(faqs),
          ]),
        }}
      />
      <Header path="/ops-desk" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="ops-desk"
          title="HubSpot operations support, handled each month"
          sub="Your HubSpot, tracking and automation backlog, worked through by two operators. Fixed hours, one request at a time, and a weekly update so you always know where things stand."
        >
          <a href="mailto:hello@closedlogic.com?subject=Ops%20Desk%20pilot" className="btn w-full sm:w-auto">Start with a one-task pilot</a>
          <a href={bookHref("ops-desk")} data-cta="book" data-cta-page="ops-desk" target="_blank" rel="noopener noreferrer" className="link font-semibold">
            Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </PageHero>

        <section id="handle" aria-labelledby="handle-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="handle">What we <Accent>handle.</Accent></SectionHead>
            <div className="card mx-auto mt-10 max-w-[60rem]">
              <ReportTable caption="The areas Ops Desk covers" head={["Area", "Examples"]} rows={handle} />
            </div>
            <h3 className="heading-center mt-14 text-center text-title-m">What we don&apos;t do</h3>
            <p className="mx-auto mt-4 max-w-[44rem] text-center text-text-l text-body">
              Media buying, creative or content, running outbound campaigns or booking meetings for you, large CRM migrations, and anything that guarantees a pipeline number.
            </p>
          </div>
        </section>

        <section id="how" aria-labelledby="how-title" className="section-y">
          <div className="container-site">
            <SectionHead id="how">How it <Accent>works.</Accent></SectionHead>
            <ol className="mx-auto mt-10 grid max-w-[52rem] gap-4 text-text-l">
              {steps.map(([lead, rest], i) => (
                <li key={lead} className="card flex gap-4">
                  <span aria-hidden="true" className="font-display font-bold text-accent-text">{i + 1}</span>
                  <span><strong className="font-semibold text-ink">{lead}</strong> {rest}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-title" className="section-y band">
          <div className="container-site">
            <SectionHead id="pricing">Pricing.</SectionHead>
            <div className="card mx-auto mt-10 max-w-[60rem]">
              <ReportTable caption="Ops Desk prices" head={["Option", "Price", "What you get"]} right={[1]} rows={pricing} />
            </div>
            <p className="mx-auto mt-5 max-w-[52rem] text-center text-body">{opsLine}</p>
            <h3 className="heading-center mt-14 text-center text-title-m">Why a pilot first</h3>
            <p className="mx-auto mt-4 max-w-[44rem] text-center text-text-l text-body">
              You shouldn&apos;t have to commit to a monthly plan with someone new. The pilot lets you see how we scope, build and document real work before deciding.
            </p>
          </div>
        </section>

        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions">Questions.</SectionHead>
            <div className="mx-auto mt-12 max-w-[900px]">
              <Faq items={faqs} />
            </div>
            <p className="mx-auto mt-6 max-w-[52rem] text-center text-body">
              Read how we handle access in our <Link href="/access" className="link">access policy</Link>.
            </p>
          </div>
        </section>

        <CtaBand id="start" title="Start with one task." body="A one-task pilot shows you how we work before you commit to a month.">
          <a href="mailto:hello@closedlogic.com?subject=Ops%20Desk%20pilot" className="btn w-full sm:w-auto">Start with a one-task pilot</a>
          <Link href="/pricing" className="link font-semibold">See every price</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
