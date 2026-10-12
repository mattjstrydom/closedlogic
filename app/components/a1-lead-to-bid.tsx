import { TickPath } from "./ui";

// A1 lead to bid: hero card cascade. Pure CSS loop (app/motion.css); the motion script only adds the pause control.
type Card = { tile: string; source: string; sourceColour: string; title: string; sub: string; offset: string; icon: React.ReactNode };

const icon = (children: React.ReactNode, extra: React.SVGProps<SVGSVGElement> = {}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false" {...extra}>
    {children}
  </svg>
);

const cards: Card[] = [
  {
    tile: "bg-green-100",
    source: "HubSpot",
    sourceColour: "text-green-text",
    title: "Form submitted",
    sub: "Demo request, Example Co",
    offset: "xl:ml-12",
    icon: icon(
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M8 8.5h8M8 12h8M8 15.5h4.5" />
      </>,
    ),
  },
  {
    tile: "bg-blue-100",
    source: "HubSpot",
    sourceColour: "text-blue-600",
    title: "Lifecycle stage: SQL",
    sub: "Set by the sales team",
    offset: "xl:ml-4",
    icon: icon(
      <>
        <path d="M4 19h4.5v-4.5H13V10h4.5V5.5H20" />
        <path d="M15.5 5.5H20V10" />
      </>,
      { strokeLinejoin: "round" },
    ),
  },
  {
    tile: "bg-coral-100",
    source: "Google Ads",
    sourceColour: "text-coral-text",
    title: "HubSpot SQL received",
    sub: "Sent once, with the click ID",
    offset: "xl:ml-16",
    icon: icon(
      <>
        <path d="M3.5 12h11M11 8l4 4-4 4" />
        <path d="M14 4.5h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4" />
      </>,
      { strokeLinejoin: "round" },
    ),
  },
  {
    tile: "bg-purple-100",
    source: "Smart Bidding",
    sourceColour: "text-purple-text",
    title: "Counted for bidding",
    sub: "HubSpot SQL is a Primary action",
    offset: "xl:ml-28",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </>,
      { strokeLinecap: undefined },
    ),
  },
];

export default function A1LeadToBid() {
  return (
    <div className="flex min-w-0 flex-col items-center lg:items-start">
      <div
        className="ltb relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-[460px]"
        role="img"
        aria-label="Example: a form fill becomes an SQL in HubSpot, Google Ads receives HubSpot SQL once with the click ID, and it is counted for bidding as a Primary action."
      >
        <svg className="pointer-events-none absolute left-0 top-0 hidden h-[420px] w-[260px] lg:block" viewBox="0 0 260 420" fill="none" aria-hidden="true" focusable="false">
          <path
            className="ltb-line stroke-gray-200"
            pathLength={1}
            d="M92 44 C92 98 60 98 60 152 C60 206 108 206 108 260 C108 314 156 314 156 368"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <ol className="relative flex flex-col gap-2.5 sm:gap-4 lg:gap-5" aria-hidden="true">
          {cards.map((c, i) => (
            <li key={c.title} className={`ltb-card ${c.offset}`} data-i={i}>
              <div className="ltb-card-in frag flex w-full items-center gap-3 p-3 pr-4 sm:gap-4 sm:p-4 sm:pr-5 xl:w-[360px]">
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-chip ${c.tile} text-blue-700 max-sm:size-10 lg:size-14`}>{c.icon}</span>
                <span className="min-w-0 flex-1 text-left">
                  <span className={`block font-mono text-[11px] leading-[1.3] tracking-normal ${c.sourceColour}`}>{c.source}</span>
                  <span className="mt-1 block text-[1.0625rem] leading-[1.2] font-medium tracking-[-0.02em] text-blue-700">{c.title}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-[1.3] tracking-normal text-gray-600">{c.sub}</span>
                </span>
                <span className="ltb-check flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
                    <TickPath />
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ol>
        <div className="ltb-foot mt-3 flex flex-wrap items-center gap-2 sm:mt-5 xl:ml-28" aria-hidden="true">
          <span className="inline-flex items-center gap-2 rounded-pill bg-blue-700 px-4 py-2 text-[0.875rem] leading-[1.3] font-medium tracking-[-0.02em] text-white">
            Bidding on: <span className="text-green-200">qualified stages</span>
          </span>
        </div>
        <p className="img-label mt-3 sm:mt-4 xl:ml-28">Example</p>
      </div>
      {/* WCAG 2.2.2: pause control for the 9 s loop. Un-hidden by the motion script; hidden under reduced motion and without JS. */}
      <button type="button" className="btn-quiet motion-toggle mt-3 xl:ml-28" data-motion-toggle hidden>
        Pause animation
      </button>
    </div>
  );
}
