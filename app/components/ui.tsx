// Small shared pieces for the v3 sections. Server components, no client JS.

// green-500 is only large text (3:1). In text-title-m headings that is 22px below 768px, under the 24px large-text
// size, so `small` switches to green-text (5.48:1 on white, 5.03:1 on gray-50) there.
export function Accent({ children, dark = false, small = false }: { children: React.ReactNode; dark?: boolean; small?: boolean }) {
  return <span className={dark ? "text-green-200" : small ? "text-green-text md:text-green-500" : "text-green-500"}>{children}</span>;
}

export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`chip ${className}`}>
      <span className="chip-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Chip, then h2, then optional lead. */
export function SectionHead({ id, chip, children, className = "" }: { id: string; chip?: string; children: React.ReactNode; className?: string }) {
  return (
    <>
      {chip && <Chip>{chip}</Chip>}
      <h2 id={`${id}-title`} className={`text-title-l max-w-[900px] ${chip ? "mt-4" : ""} ${className}`}>
        {children}
      </h2>
    </>
  );
}

/** Tick path shared with A1 (12 x 12 viewBox). */
export function TickPath({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <path className={className} style={style} pathLength={1} d="M2.5 6.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />;
}

/** Round green-text circle with a white tick. size 20 (lists) or 22 (notes). */
export function Tick({ size = 20, className = "" }: { size?: 20 | 22; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-green-text text-on-accent ${size === 22 ? "size-[22px]" : "size-5"} ${className}`}
    >
      <svg width={size === 22 ? 12 : 11} height={size === 22 ? 12 : 11} viewBox="0 0 12 12" fill="none" focusable="false">
        <TickPath />
      </svg>
    </span>
  );
}

/** A list with green ticks. */
export function TickList({ items, className = "", itemClassName = "" }: { items: React.ReactNode[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className={`flex gap-3 ${itemClassName}`}>
          <Tick className="mt-0.5" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
