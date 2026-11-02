import { AuditButton, BookButton, BookPeButton } from "./cta";
import { SHOW_PE } from "../flags";

// cta: direct sends B2B SaaS readers to the audit and the fractional offer; cta: agency (the frontmatter value kept
// from the old site) sends PE readers to the portfolio offer. Both book Cal.com directly, tagged with the guide slug.
export default function GuideCta({ cta, campaign }: { cta: "direct" | "agency"; campaign: string }) {
  // While SHOW_PE is false (app/flags.ts) every guide gets the B2B SaaS fit-call CTA (the 20min-fit event).
  const pe = SHOW_PE && cta === "agency";
  return (
    <aside aria-labelledby="guide-cta-title" className="bento mt-14">
      <h2 id="guide-cta-title" className="text-title-m">
        {pe ? "Want one measurement standard across your portfolio?" : "Want the number checked on your accounts?"}
      </h2>
      <p className="mt-3 max-w-[56ch] text-text-l text-body">
        {pe
          ? "We work alongside your CRM partner to make every portfolio company’s pipeline numbers comparable, without migrating CRMs."
          : "We check Google Ads, HubSpot and your reporting against each other, and tell you which number is wrong. Independent of your media agency and your CRM partner."}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {pe ? <BookPeButton campaign={campaign} className="w-full sm:w-auto" /> : <BookButton campaign={campaign} className="w-full sm:w-auto" />}
        <AuditButton className="w-full sm:w-auto" />
      </div>
    </aside>
  );
}
