import { ArrowDown, ArrowRight } from "lucide-react";
import StepBadge from "./step-badge";

// Four-step flow from form fill to bidding. Stacks vertically below lg, so there is no horizontal scroll at 375px.
const steps: { title: React.ReactNode; sub: string }[] = [
  { title: "Form submitted", sub: "Website form" },
  { title: "Sales qualifies SQL", sub: "HubSpot lifecycle stage" },
  { title: <>Click ID matched (<code>_gcl_aw</code>)</>, sub: "Data Manager" },
  { title: "Smart Bidding sets goal", sub: "Google Ads Primary goal" },
];

export default function Pipeline() {
  return (
    <ol aria-label="How a lead reaches bidding" className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch">
      {steps.map((s, i) => (
        <li key={i} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row">
          <div className="flex w-full flex-1 items-center gap-3 self-stretch rounded-tile border border-solid border-[#1e293b] bg-[#0f1624] p-4 shadow-lg sm:p-5">
            <StepBadge n={i + 1} />
            <span>
              <span className="block text-[0.9375rem] font-medium leading-[1.3] tracking-[-0.02em]">{s.title}</span>
              <span className="mt-0.5 block text-[0.8125rem] leading-[1.3] text-gray-600">{s.sub}</span>
            </span>
          </div>
          {i < steps.length - 1 && (
            <span className="shrink-0 text-[#3b82f6]" aria-hidden="true">
              <ArrowDown size={20} className="lg:hidden" />
              <ArrowRight size={20} className="max-lg:hidden" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
