import StepBadge from "./step-badge";

// Four-step flow from form fill to bidding. Steps use the brief's wording; the chip is a plain <code>.
const steps: { title: React.ReactNode }[] = [
  { title: "Lead form submitted" },
  { title: "Sales qualifies SQL in HubSpot" },
  { title: <>Click ID matching (<code>_gcl_aw</code>)</> },
  { title: "Google Ads bids on SQL (Primary)" },
];

const arrow = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Pipeline() {
  return (
    <ol aria-label="How a lead reaches bidding" className="mt-8 grid grid-cols-1 items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
      {steps.map((s, i) => (
        <li key={i} className="contents">
          <div className="flex items-center gap-3 rounded-tile border border-solid border-[#1e293b] bg-[#0f1624] p-4">
            <StepBadge n={i + 1} />
            <span className="text-[0.9375rem] font-medium leading-[1.3] tracking-[-0.02em]">{s.title}</span>
          </div>
          {i < steps.length - 1 && <span className="flex justify-center max-lg:rotate-90 lg:items-center" aria-hidden="true">{arrow}</span>}
        </li>
      ))}
    </ol>
  );
}
