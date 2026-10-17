// Small shared pieces. Server components, no client JS.

// Highlighted words inside a heading or statement. `dark` and `small` are kept so existing call sites
// type-check; the accent now carries every size, and the navy panel recolours it via .panel-navy .accent.
export function Accent({ children }: { children: React.ReactNode; dark?: boolean; small?: boolean }) {
  return <span className="accent">{children}</span>;
}

/** Accent eyebrow above a heading. */
export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`chip ${className}`}>{children}</p>;
}

/** Eyebrow, then h2, then optional lead. */
export function SectionHead({ id, chip, children, className = "" }: { id: string; chip?: string; children: React.ReactNode; className?: string }) {
  return (
    <>
      {chip && <Chip>{chip}</Chip>}
      <h2 id={`${id}-title`} className={`heading-center text-title-l ${className}`}>
        {children}
      </h2>
    </>
  );
}

/** Tick path shared with A1 (12 x 12 viewBox). */
export function TickPath({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <path className={className} style={style} pathLength={1} d="M2.5 6.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />;
}

/** Accent circle with an ink ring and a white tick. */
export function Tick({ size = 20, className = "" }: { size?: 20 | 22; className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-solid border-ink bg-accent text-white ${className}`}
      style={{ width: 28, height: 28 }}>
      <svg width={size === 22 ? 13 : 12} height={size === 22 ? 13 : 12} viewBox="0 0 12 12" fill="none" focusable="false">
        <TickPath />
      </svg>
    </span>
  );
}

/** A list with accent ticks. */
export function TickList({ items, className = "", itemClassName = "" }: { items: React.ReactNode[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={`grid gap-[18px] ${className}`}>
      {items.map((t, i) => (
        <li key={i} className={`flex gap-4 text-text-l ${itemClassName}`}>
          <Tick className="mt-0.5" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Large accent numeral for the seven checks and the step cards. */
export function Numeral({ n, pad = false, className = "" }: { n: number; pad?: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={`block font-display text-[4.5rem] leading-none font-bold tracking-[-0.04em] text-accent max-lg:text-[3.4rem] ${className}`}>
      {pad ? String(n).padStart(2, "0") : n}
    </span>
  );
}
