// Signal v3 brand mark and wordmark.
// The mark is an open ring closed by a coral dot. The wordmark is live Poppins text rather than outlined
// paths, so it inherits the loaded webfont and stays crisp at any size. It is decorative here: the header
// link carries its own accessible name, and the footer repeats the brand in its legal line.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[10px] text-ink ${className}`}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
        className="h-9 w-9 shrink-0 max-md:h-[30px] max-md:w-[30px]"
      >
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
        <circle cx="53" cy="32" r="7" fill="#FF4B3E" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span className="font-display text-[1.45rem] leading-none tracking-[-0.03em] whitespace-nowrap max-md:text-[1.2rem]">
        <span className="font-bold">Closed</span> <span className="font-normal">Logic</span>
      </span>
    </span>
  );
}
