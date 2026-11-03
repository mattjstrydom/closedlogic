import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import PageHero from "../components/page-hero";
import CtaBand from "../components/cta-band";
import { jsonLdScript, orgNode } from "../jsonld";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "How we handle access to your accounts | Closed Logic",
  description: "How we handle access to your accounts: none for the free check, read-only first, every change logged, and access removed at the end.",
  path: "/access",
  absoluteTitle: true,
});

const points: [string, React.ReactNode][] = [
  ["The free check needs none.", "We only look at what your public website sends, as any browser would."],
  ["You invite us as a user.", "We never ask for your password or shared logins."],
  ["Least access first.", "Read-only by default. Edit access only for the settings in the written scope."],
  ["Everything is logged.", "Every change goes into a change log with how to undo it."],
  ["Access is removed at the end.", "We confirm in writing when our access has been removed, and you can remove it yourself at any time."],
  [
    "Your data stays yours.",
    <>
      How we process personal data is set out in our <Link href="/terms#clause-8" className="link">terms and data processing clause</Link>.
    </>,
  ],
];

export default function Access() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript([orgNode]) }} />
      <Header path="/access" />
      <main id="main" tabIndex={-1}>
        <PageHero id="access" title="How we handle access to your accounts" sub="Six rules we follow on every job." />

        <section id="rules" aria-labelledby="rules-title" className="section-y band">
          <div className="container-site">
            <h2 id="rules-title" className="sr-only">The six rules</h2>
            <ol className="mx-auto grid max-w-[52rem] gap-4 text-text-l">
              {points.map(([lead, rest], i) => (
                <li key={lead} className="card flex gap-4">
                  <span aria-hidden="true" className="font-display font-bold text-accent-text">{i + 1}</span>
                  <span><strong className="font-semibold text-ink">{lead}</strong> {rest}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CtaBand id="start" title="Start without giving us any access." body="The free check looks at your public site only.">
          <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
          <Link href="/signal-fix" className="link font-semibold">See Signal Fix</Link>
        </CtaBand>
      </main>
      <Footer />
    </>
  );
}
