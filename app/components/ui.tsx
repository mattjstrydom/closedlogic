// Small shared pieces. Server components, no client JS.

// Highlighted words inside a heading or statement. In this system the brand red is a fill, not a text colour, so the
// words keep the heading colour; `dark` and `small` are kept so existing call sites type-check.
export function Accent({ children }: { children: React.ReactNode; dark?: boolean; small?: boolean }) {
  return <span className="accent">{children}</span>;
}

/** Eyebrow pill (with the brand dot) above a heading. */
export function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`chip ${className}`}>{children}</p>;
}

/** Eyebrow, then h2. */
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

/** Check mark tile: brand fill, near-black tick (never white on the brand red). */
export function Tick({ className = "" }: { size?: 20 | 22; className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink ${className}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" focusable="false">
        <path d="M2.5 6.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** A list with check marks. */
export function TickList({ items, className = "", itemClassName = "" }: { items: React.ReactNode[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={`grid gap-4 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className={`flex gap-3 text-text-m ${itemClassName}`}>
          <Tick className="mt-0.5" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Mono index tile (01, 02, 03) for the step cards. */
export function Numeral({ n, pad = false }: { n: number; pad?: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className="step-badge">
      {pad ? String(n).padStart(2, "0") : n}
    </span>
  );
}
