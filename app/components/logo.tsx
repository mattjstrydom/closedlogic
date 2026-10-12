import { useId } from "react";

// Signal Gate mark (brand kit). The kit is drawn for dark backgrounds; here the gate takes currentColor so it reads on the light header.
export function LogoMark({ className = "size-8" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={`text-[#0b0f17] ${className}`}>
      <defs>
        <linearGradient id={id} x1="15" y1="16" x2="29" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path fill="#64748b" d="M4 7h8v3H4zm0 16h8v3H4z" />
      <path fill="currentColor" d="M15 4h6v8h-6zm0 17h6v7h-6zM4 15h11v3H4z" />
      <path fill={`url(#${id})`} d="M15 15h9v-3l5 4.5-5 4.5v-3h-9z" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[1.25rem] font-semibold tracking-tight text-black">Closed Logic</span>
    </span>
  );
}
