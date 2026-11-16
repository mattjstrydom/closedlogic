// Design-system components for the homepage and the pages that reuse its blocks. Class names (cl-*) and values are in
// app/globals.css; the tokens are in :root there. No icon set: only the text glyphs the CSS adds (tick, cross).
import type { CSSProperties, ReactNode } from "react";

export type PillTone = "bad" | "warn" | "good" | "neutral";

/** Status pill: always a dot plus a word. Status colours belong in product-style UI only. */
export function StatusPill({ tone = "neutral", children }: { tone?: PillTone; children: ReactNode }) {
  return <span className={`cl-pill ${tone === "neutral" ? "" : `cl-pill--${tone}`}`}>{children}</span>;
}

/** Hero product panel. The example data is deliberately fictional (acme.io). The bars are decorative. */
export function SignalReport({ host, healthy, total, bars, rows }: { host: string; healthy: number; total: number; bars: number[]; rows: { title: string; note: string; tone: PillTone; label: string }[] }) {
  return (
    <div className="cl-report">
      <div className="cl-report__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>Signal report · {host}</span>
      </div>
      <div className="cl-report__head">
        <div>
          <small>Signals healthy</small>
          <div className="cl-report__metric">
            {healthy}
            <span>/{total}</span>
          </div>
        </div>
        <div className="cl-report__bars" aria-hidden="true">
          {bars.map((h, i) => (
            <i key={i} className={i === bars.length - 1 ? "is-now" : ""} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      {rows.map((r) => (
        <div key={r.title} className="cl-report__row">
          <div>
            <b>{r.title}</b>
            <small>{r.note}</small>
          </div>
          <StatusPill tone={r.tone}>{r.label}</StatusPill>
        </div>
      ))}
    </div>
  );
}

/** White card with a mono index tile, an h3, text and an optional footer line. `visual` puts a small live diagram on top (decorative). */
export function FeatureCard({ index, title, children, foot, visual }: { index: string; title: string; children: ReactNode; foot?: ReactNode; visual?: "a" | "b" | "c" }) {
  const tile = <span className="cl-card__icon" aria-hidden="true">{index}</span>;
  return (
    <article className="cl-card" data-reveal>
      {visual ? <Viz kind={visual}>{tile}</Viz> : tile}
      <h3>{title}</h3>
      <p>{children}</p>
      {foot && <p className="cl-card__foot">{foot}</p>}
    </article>
  );
}

/** Decorative diagrams for the three problem cards. Labels are code tokens, not claims; the card text carries the meaning. */
function Viz({ kind, children }: { kind: "a" | "b" | "c"; children: ReactNode }) {
  return (
    <div className={`cl-viz cl-viz--${kind}`} aria-hidden="true">
      {children}
      {kind === "a" && (
        <>
          <span className="t t1">page_view</span>
          <i className="ln" />
          <i className="dot" />
          <span className="t t2">conversion</span>
        </>
      )}
      {kind === "b" && (
        <>
          <span className="t t1">gclid=EAIaIQ…</span>
          <i className="ln" />
          <i className="dot" />
          <span className="t t2 bad">hs_google_click_id<span className="caret" /></span>
        </>
      )}
      {kind === "c" && (
        <>
          <i className="ln" />
          <span className="t t1">form_fill</span>
          <span className="t t2 dim">sql</span>
          <span className="t t3 dim">closed_won</span>
          <i className="dot" />
          <i className="dot" />
          <i className="dot" />
        </>
      )}
    </div>
  );
}

/** Pricing tier. `recommended` gets the foreground border, shadow-md, a neutral pill and (by the caller) the one primary button. */
export function PricingTier({ name, price, per, desc, items, recommended, badge, children }: { name: string; price: string; per?: string; desc: string; items: string[]; recommended?: boolean; badge?: string; children: ReactNode }) {
  return (
    <section className={`cl-tier ${recommended ? "cl-tier--recommended" : ""}`}>
      <h3 className="cl-tier__name">
        {name}
        {badge && <StatusPill>{badge}</StatusPill>}
      </h3>
      <p className="cl-tier__price">
        {price}
        {per && <small>{per}</small>}
      </p>
      <p className="cl-tier__desc">{desc}</p>
      <ul>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {children}
    </section>
  );
}

/** Finding card: title, reference line, status pill, mono code block (offending line in status-bad) and a self-check line. */
export function Evidence({ title, reference, tone, label, code, check }: { title: string; reference: string; tone: PillTone; label: string; code: ReactNode; check: string }) {
  return (
    <article className="cl-evidence">
      <header className="cl-evidence__head">
        <div>
          <b>{title}</b>
          <small>{reference}</small>
        </div>
        <StatusPill tone={tone}>{label}</StatusPill>
      </header>
      <pre className="cl-evidence__code">{code}</pre>
      <p className="cl-evidence__fix">
        <b>Check it yourself:</b> {check}
      </p>
    </article>
  );
}

/** Full-width band of short promises with check marks. */
export function TrustStrip({ items }: { items: string[] }) {
  return (
    <section aria-label="What to expect" className="cl-strip">
      <ul className="container-site">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

/** The homepage's example finding. Fictional on purpose (a made-up tag id); the page labels it as an illustration. */
export function EvidenceSample() {
  return (
    <Evidence
      title="Book a demo fires on page view"
      reference="Evidence 1 of 4 · conversion_event"
      tone="bad"
      label="Miscounted"
      code={
        <>
          {"GET /demo\n"}
          <span className="bad">{"gtag('event','conversion',{send_to:'AW-…/book_demo'})"}</span>
          {"\nform_submitted: false"}
        </>
      }
      check="open /demo in a private window and watch the tag fire before you type anything."
    />
  );
}

/** Hairline beams that run along the hero's grid lines (decorative; the grid itself is CSS in app/fx.css). */
export function Beams() {
  const lines: [string, number, string, string][] = [["h", 3, "11s", "0s"], ["h", 6, "13s", "4s"], ["h", 9, "10s", "7s"], ["v", 5, "12s", "2s"], ["v", 14, "14s", "6s"], ["v", 19, "11s", "9s"]];
  return (
    <>
    <div className="fx-rings" aria-hidden="true">
      <span className="r1"><b /></span>
      <span className="r2"><b /></span>
    </div>
    <div className="fx-beams" aria-hidden="true">
      {lines.map(([d, n, t, delay]) => (
        <i key={`${d}${n}`} className={d} style={{ [d === "h" ? "--r" : "--c"]: n, "--t": t, "--d": delay } as CSSProperties} />
      ))}
    </div>
    </>
  );
}
