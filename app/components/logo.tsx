// Brand kit logo, used as supplied (closed-logic-logo.svg, 268 x 64). It is drawn for dark backgrounds, so it sits on the kit's #0B0F17.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex rounded-[10px] bg-[#0b0f17] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/closed-logic-logo.svg" alt="" width={268} height={64} className="h-10 w-auto max-md:h-9" />
    </span>
  );
}
