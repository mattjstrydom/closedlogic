import { AlertCircle, CheckCircle2, Database, Filter, Target } from "lucide-react";

// Flow from form fill to bidding, shown as the state after the fix. Facts only: no match rates or prevalence figures.
const pill = "rounded border border-solid px-2 py-0.5 font-mono text-xs";
const slate = `${pill} border-[#334155] bg-[#1e293b] text-[#cbd5e1]`;
const blue = `${pill} border-[#3b82f6]/20 bg-[#3b82f6]/10 text-[#60a5fa]`;
const green = `${pill} border-[#10b981]/30 bg-[#10b981]/20 text-[#6ee7b7] font-semibold`;

const card = "flex flex-col justify-between rounded-xl border border-solid p-4 transition-colors";

export function PipelineFlow() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-solid border-[#1e293b] bg-[#0d121f] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,.6)] sm:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-solid border-[#1e293b] pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-gray-600">Pipeline, after the fix</p>
          <h3 className="mt-1 text-[1.125rem] font-semibold tracking-tight">How a qualified lead reaches bidding</h3>
        </div>
        <span className={`${blue} self-start`}>HubSpot to Google Ads</span>
      </div>

      <ol aria-label="How a lead reaches bidding" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <li className={`${card} border-[#1e293b] bg-[#0f1624] hover:border-[#334155]`}>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-gray-600">01 / Signal</span>
              <span className={slate}>Secondary</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Filter size={16} className="text-gray-600" aria-hidden="true" />
              <h4 className="text-[0.875rem] font-semibold">Form submitted</h4>
            </div>
            <p className="mb-4 text-[0.75rem] leading-relaxed text-gray-600">A prospect submits a demo or contact form on your website.</p>
          </div>
          <div className="flex items-center justify-between border-t border-solid border-[#1e293b] pt-3 font-mono text-[11px] text-gray-600">
            <span>Goal: Secondary</span>
            <span>Reported only</span>
          </div>
        </li>

        <li className={`${card} border-[#1e293b] bg-[#0f1624] hover:border-[#334155]`}>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-gray-600">02 / CRM</span>
              <span className={blue}>HubSpot SQL</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Database size={16} className="text-[#60a5fa]" aria-hidden="true" />
              <h4 className="text-[0.875rem] font-semibold">Sales qualifies</h4>
            </div>
            <p className="mb-4 text-[0.75rem] leading-relaxed text-gray-600">Your sales team moves the contact to the qualified lifecycle stage in HubSpot.</p>
          </div>
          <div className="flex items-center justify-between border-t border-solid border-[#1e293b] pt-3 font-mono text-[11px] text-gray-600">
            <span>Stage: SQL</span>
            <span>Set by sales</span>
          </div>
        </li>

        <li className={`${card} border-[#1e293b] bg-[#0f1624] hover:border-[#334155]`}>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-gray-600">03 / Match</span>
              <span className={slate}>Data Manager</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#60a5fa]" aria-hidden="true" />
              <h4 className="text-[0.875rem] font-semibold">Click ID matched</h4>
            </div>
            <p className="mb-4 text-[0.75rem] leading-relaxed text-gray-600">
              The stage reaches Google with the click ID (<code>_gcl_aw</code>) or enhanced conversions for leads, so it ties back to the ad click.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-solid border-[#1e293b] pt-3 font-mono text-[11px] text-gray-600">
            <span>Matched to the click</span>
            <span>Event sent</span>
          </div>
        </li>

        <li className={`${card} border-[#10b981]/30 bg-[#10b981]/5 hover:border-[#10b981]/50`}>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#34d399]">04 / Optimize</span>
              <span className={green}>Primary</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Target size={16} className="text-[#34d399]" aria-hidden="true" />
              <h4 className="text-[0.875rem] font-semibold">Smart Bidding sets goal</h4>
            </div>
            <p className="mb-4 text-[0.75rem] leading-relaxed text-gray-800">Google Ads uses the qualified stage as a Primary goal, so bidding learns from it.</p>
          </div>
          <div className="flex items-center justify-between border-t border-solid border-[#10b981]/20 pt-3 font-mono text-[11px] text-gray-600">
            <span>Goal: Primary</span>
            <span className="font-semibold text-[#34d399]">Used for bidding</span>
          </div>
        </li>
      </ol>

      <div className="mt-6 flex items-center gap-2 border-t border-solid border-[#1e293b] pt-4 font-mono text-xs text-gray-600">
        <AlertCircle size={16} className="shrink-0 text-[#fbbf24]" aria-hidden="true" />
        <span>In our example before the fix, form fills are the only Primary action, so Smart Bidding looks for more form fills.</span>
      </div>
    </div>
  );
}

export default PipelineFlow;
