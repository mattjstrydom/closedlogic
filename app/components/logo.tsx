import { useId } from "react";

// C+L monogram: an open C whose gap holds the stem of the L, so the two letters lock together.
export function LogoMark({ className = "size-7" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={id} x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <path stroke={`url(#${id})`} d="M18.1 8.7A9.5 9.5 0 1 0 18.1 23.3M22.5 6.5V25H30" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-[1.25rem] font-semibold tracking-tight text-black">Closed Logic</span>
    </span>
  );
}
