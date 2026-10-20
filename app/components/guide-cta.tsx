import { AuditButton, BookButton, BookPeButton } from "./cta";

// cta: direct sends B2B SaaS readers to the audit and the fractional offer; cta: agency (the frontmatter value kept
// from the old site) sends PE readers to the portfolio offer. Both book through the /book redirects.
export default function GuideCta({ cta }: { cta: "direct" | "agency" }) {
  const pe = cta === "agency";
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
        {pe ? <BookPeButton className="w-full sm:w-auto" /> : <BookButton className="w-full sm:w-auto" />}
        <AuditButton className="w-full sm:w-auto" />
      </div>
    </aside>
  );
}
