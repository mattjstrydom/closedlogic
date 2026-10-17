import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import TrackedLink from "../components/tracked-link";
import { site } from "../site.config";
import { checkItems } from "../checks-data";

// Unlisted: no link from anywhere, not in the sitemap, noindex and nofollow here, and an X-Robots-Tag header written by
// scripts/cf-postbuild.mjs. No canonical or share tags, because it is only shared in outreach emails.
export const metadata: Metadata = {
  title: "Referral partners",
  description: "How a referral to Closed Logic works.",
  robots: { index: false, follow: false },
};

const conditions = [
  "New clients only, introduced by name in an email or on a call.",
  "No fee on existing clients or on work we win separately.",
  "The client is told about the fee.",
  "We may decline any client.",
];

export default function Partners() {
  return (
    <>
      <Header path="/partners" />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="partners-title" className="container-site pb-12 pt-14 sm:pt-20">
          <h1 id="partners-title" className="max-w-[22ch] text-title-l">Know a client whose HubSpot and Google Ads numbers don&apos;t add up?</h1>
          <p className="mt-8 max-w-[62ch] text-text-xl">
            Introduce them. We check and fix how HubSpot sends lifecycle stages to Google Ads, and you get 20% of the first fixed-fee payment we receive.
          </p>
        </section>

        <section aria-labelledby="how-title" className="container-site pb-12">
          <h2 id="how-title" className="text-title-m">How a referral works</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/partners/partners-how-it-works.png" alt="Three steps: you introduce a client by name, we run the fix, you get a one-time fee of 20% of the first fixed-fee payment we receive." width={1600} height={700} loading="lazy" className="mt-6 h-auto w-full max-w-[900px] rounded-[10px]" />
          <p className="mt-6 max-w-[62ch] text-text-l">
            The fee is 20% of the first fixed-fee payment we actually receive from a client you introduce, paid within 14 days of that payment clearing. It&apos;s paid once per client.
          </p>
          <h3 className="mt-8 text-title-xs">Conditions, agreed in writing before any sale</h3>
          <ul className="mt-3 max-w-[62ch] list-disc space-y-1 pl-6 text-text-l marker:text-green-500">
            {conditions.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        <section aria-labelledby="options-title" className="container-site pb-12">
          <h2 id="options-title" className="text-title-m">Two ways to work with us</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/partners/partners-two-options.png" alt="Two options: referral, or white-label under your agency's name." width={1600} height={700} loading="lazy" className="mt-6 h-auto w-full max-w-[900px] rounded-[10px]" />
          <div className="mt-6 grid max-w-[900px] gap-5 sm:grid-cols-2">
            <div className="tile border border-solid border-rule p-5">
              <h3 className="text-title-xs">Referral</h3>
              <p className="mt-2 text-body">You introduce the client and we work with them directly.</p>
            </div>
            <div className="tile border border-solid border-rule p-5">
              <h3 className="text-title-xs">White-label</h3>
              <p className="mt-2 text-body">We do the work under your agency&apos;s name and you keep the client relationship, at agency prices.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="checks-title" className="container-site pb-12">
          <h2 id="checks-title" className="text-title-m">What we check</h2>
          <ol className="mt-4 max-w-[62ch] list-decimal space-y-1 pl-6 text-text-l marker:text-accent">
            {checkItems.map((c) => <li key={c.label}>{c.label}</li>)}
          </ol>
        </section>

        <section aria-labelledby="next-title" className="container-site pb-20 sm:pb-28">
          <div className="bento max-w-[900px]">
            <h2 id="next-title" className="text-title-m">Talk to us</h2>
            <p className="mt-3 max-w-[56ch] text-text-l text-body">
              Book a 20-minute call, or email <a href={`mailto:${site.email}`} className="link">{site.email}</a>.
            </p>
            <div className="mt-6">
              <TrackedLink href={site.agencyBookingUrl} external event="cal_click" params={{ audience: "partner" }} className="btn w-full sm:w-auto">
                Book a 20-minute agency fit call
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
