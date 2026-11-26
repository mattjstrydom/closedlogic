import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PageHero from "../../components/page-hero";
import PurchaseEvent from "./purchase-event";
import { bookHref } from "../../booking";
import { offers, replyTime } from "../../offers";

// Where the Stripe payment link sends people after paying. Not linked from the site, not indexed, not in the sitemap.
export const metadata: Metadata = {
  title: "Thanks",
  robots: { index: false, follow: false },
  alternates: { canonical: "/signal-fix/thanks" },
};

export default function SignalFixThanks() {
  return (
    <>
      <Header path="/signal-fix/thanks" />
      <main id="main" tabIndex={-1}>
        <PageHero
          id="thanks" eyebrow={offers.fix.name}
          title="Thanks. Here's what happens next."
          sub={`We reply ${replyTime} to confirm the written scope. Nothing changes in your accounts until you approve it, and you can ask us to undo any change.`}
        >
          <a href={bookHref("signal-fix-thanks")} data-cta="book" data-cta-page="signal-fix-thanks" target="_blank" rel="noopener noreferrer" className="btn w-full sm:w-auto">
            Book a 20-minute call<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/access" className="link font-semibold">How we handle access</Link>
        </PageHero>
      </main>
      <PurchaseEvent value={Number(offers.fix.amount)} />
      <Footer />
    </>
  );
}
