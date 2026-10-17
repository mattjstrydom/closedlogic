import Link from "next/link";
import { CalButton, SampleButton } from "./cta";
import { site } from "../site.config";

// cta: direct books through /book (the redirect to the direct Cal.com link); cta: agency links straight to the agency link.
export default function GuideCta({ cta }: { cta: "direct" | "agency" }) {
  const agency = cta === "agency";
  return (
    <aside aria-labelledby="guide-cta-title" className="bento mt-14">
      <h2 id="guide-cta-title" className="text-title-m">
        {agency ? "Want this checked on a client account?" : "Want us to check yours?"}
      </h2>
      <p className="mt-3 max-w-[56ch] text-text-l text-body">
        {agency
          ? "We run the same check and fix on your client's HubSpot and Google Ads accounts, delivered under your agency's name."
          : "We check how HubSpot sends lifecycle stages to Google Ads and fix it inside your own accounts, with your sign-off."}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <CalButton href={agency ? site.agencyBookingUrl : site.bookPath} className="w-full sm:w-auto">
          {agency ? "Book a 20-minute agency fit call" : "Book a 20-minute fit call"}
        </CalButton>
        <SampleButton className="w-full sm:w-auto" />
      </div>
      <p className="mt-4 text-body">
        Not ready for a call? <Link href="/teardown" className="link">Request a free teardown</Link>.
      </p>
    </aside>
  );
}
