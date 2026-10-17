import { TickPath } from "./ui";

// A1 lead to bid: four step cards, pure CSS loop (app/motion.css). The motion script only adds the pause control.
// The mockup shows the whole row as settled, so the tick badge marks the final card only.
type Card = { source: string; title: string; sub: string; hi?: boolean; icon: React.ReactNode };

const icon = (children: React.ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const cards: Card[] = [
  {
    source: "HubSpot",
    title: "Form submitted",
    sub: "Demo request, Example Co",
    icon: icon(
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M8 8.5h8M8 12h8M8 15.5h4.5" />
      </>,
    ),
  },
  {
    source: "HubSpot",
    title: "Lifecycle stage: SQL",
    sub: "Set by the sales team",
    icon: icon(
      <>
        <path d="M4 19h4.5v-4.5H13V10h4.5V5.5H20" />
        <path d="M15.5 5.5H20V10" />
      </>,
    ),
  },
  {
    source: "Google Ads",
    title: "HubSpot SQL received",
    sub: "Sent once, with the click ID",
    icon: icon(
      <>
        <path d="M3.5 12h11M11 8l4 4-4 4" />
        <path d="M14 4.5h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4" />
      </>,
    ),
  },
  {
    source: "Smart Bidding",
    title: "Counted for bidding",
    sub: "HubSpot SQL is a Primary action",
    hi: true,
    icon: icon(
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </>,
    ),
  },
];

export default function A1LeadToBid() {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div
        className="ltb w-full max-w-[1040px]"
        role="img"
        aria-label="Example: a form fill becomes an SQL in HubSpot, Google Ads receives HubSpot SQL once with the click ID, and it is counted for bidding as a Primary action."
      >
        <ol className="a1-grid relative items-stretch" aria-hidden="true">
          {cards.map((c, i) => (
            <li key={c.title} className="ltb-card h-full" data-i={i}>
              <div
                className={`ltb-card-in relative flex h-full flex-col gap-2 rounded-[16px] border-[1.5px] border-solid border-ink p-5 shadow-card ${
                  c.hi ? "bg-[linear-gradient(92deg,#FFE3DD,#EADFFF)]" : "bg-white"
                }`}
              >
                <span className="flex items-center gap-2 text-accent">{c.icon}</span>
                <span className="mt-1 block text-[0.75rem] font-semibold tracking-[0.06em] text-accent uppercase">{c.source}</span>
                <span className="block font-display text-[1.05rem] leading-[1.3] font-semibold text-ink">{c.title}</span>
                <span className="block text-[0.95rem] leading-[1.45] text-body">{c.sub}</span>
                {c.hi && (
                  <span className="ltb-check absolute -top-3 -right-2 grid size-8 place-items-center rounded-full border-2 border-solid border-ink bg-accent text-white">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
                      <TickPath />
                    </svg>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="ltb-foot mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <span className="tag">
            Bidding on: <span className="font-semibold text-ok">qualified stages</span>
          </span>
          <span className="tag">Example</span>
        </div>
      </div>
      {/* WCAG 2.2.2: pause control for the 9 s loop. Un-hidden by the motion script; hidden under reduced motion and without JS. */}
      <button type="button" className="btn-quiet motion-toggle mt-5" data-motion-toggle hidden>
        Pause animation
      </button>
    </div>
  );
}
