// Closed Logic mark and wordmark ("Bright and crisp" system). The mark geometry is unchanged: an open ring (currentColor)
// closed by a brand dot with a currentColor keyline. The wordmark is live Inter text, "Closed" 700 and "Logic" 400, 19px.
// It is decorative here: the header link carries its own accessible name, and the footer repeats the brand in its legal line.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[9px] text-ink ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="h-[26px] w-[26px] shrink-0">
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeDasharray="104 34"
          strokeDashoffset="-10"
          transform="rotate(-20 32 32)"
        />
        <circle cx="53" cy="32" r="7" fill="var(--brand)" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span className="text-[19px] leading-none tracking-[-0.02em] whitespace-nowrap">
        <span className="font-bold">Closed</span> <span className="font-normal">Logic</span>
      </span>
    </span>
  );
}
