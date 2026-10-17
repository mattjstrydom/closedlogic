import { AlertCircle, CheckCircle2, Database, Filter, Target } from "lucide-react";

// Flow from form fill to bidding, shown as the state after the fix. Facts only: no match rates or prevalence figures.
const step = "card flex flex-col gap-4 p-7 text-text-m";
const num = "grid size-[52px] place-items-center rounded-full bg-ink text-white font-display text-[1.1rem] font-bold";
const numLast = "grid size-[52px] place-items-center rounded-full bg-accent text-white font-display text-[1.1rem] font-bold";
const key = "font-display text-[0.8rem] font-semibold tracking-[0.08em] text-accent uppercase";
const meta = "grid gap-0.5 text-[0.88rem] text-body";

export function PipelineFlow() {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="text-center">
        <p className="chip">Pipeline, after the fix</p>
        <h2 className="heading-center text-title-l">How a qualified lead reaches bidding</h2>
        <p className="lead mx-auto mt-5">HubSpot to Google Ads</p>
      </div>

      <ol aria-label="How a lead reaches bidding" className="pipe-grid mt-16">
        <li className={step}>
          <div>
            <span className={num}>01</span>
            <p className={`${key} mt-5`}>Signal</p>
            <h3 className="mt-1.5 flex items-center gap-2 text-[1.15rem]">
              <Filter size={18} className="shrink-0 text-accent" aria-hidden="true" />
              Form submitted
            </h3>
            <p className="mt-3 text-body">A prospect submits a demo or contact form on your website.</p>
          </div>
          <div className="mt-auto border-t border-solid border-rule pt-4">
            <span className="pill">Secondary</span>
            <div className={`${meta} mt-3`}>
              <span>Goal: Secondary</span>
              <span>Reported only</span>
            </div>
          </div>
        </li>

        <li className={step}>
          <div>
            <span className={num}>02</span>
            <p className={`${key} mt-5`}>CRM</p>
            <h3 className="mt-1.5 flex items-center gap-2 text-[1.15rem]">
              <Database size={18} className="shrink-0 text-accent" aria-hidden="true" />
              Sales qualifies
            </h3>
            <p className="mt-3 text-body">Your sales team moves the contact to the qualified lifecycle stage in HubSpot.</p>
          </div>
          <div className="mt-auto border-t border-solid border-rule pt-4">
            <span className="pill tag-info">HubSpot SQL</span>
            <div className={`${meta} mt-3`}>
              <span>Stage: SQL</span>
              <span>Set by sales</span>
            </div>
          </div>
        </li>

        <li className={step}>
          <div>
            <span className={num}>03</span>
            <p className={`${key} mt-5`}>Match</p>
            <h3 className="mt-1.5 flex items-center gap-2 text-[1.15rem]">
              <CheckCircle2 size={18} className="shrink-0 text-accent" aria-hidden="true" />
              Click ID matched
            </h3>
            <p className="mt-3 text-body">
              The stage reaches Google with the click ID (<code>_gcl_aw</code>) or enhanced conversions for leads, so it ties back to the ad click.
            </p>
          </div>
          <div className="mt-auto border-t border-solid border-rule pt-4">
            <span className="pill tag-info">Data Manager</span>
            <div className={`${meta} mt-3`}>
              <span>Matched to the click</span>
              <span>Event sent</span>
            </div>
          </div>
        </li>

        <li className={step}>
          <div>
            <span className={numLast}>04</span>
            <p className={`${key} mt-5`}>Optimize</p>
            <h3 className="mt-1.5 flex items-center gap-2 text-[1.15rem]">
              <Target size={18} className="shrink-0 text-accent" aria-hidden="true" />
              Smart Bidding sets goal
            </h3>
            <p className="mt-3 text-body">Google Ads uses the qualified stage as a Primary goal, so bidding learns from it.</p>
          </div>
          <div className="mt-auto border-t border-solid border-rule pt-4">
            <span className="pill tag-ok">Primary</span>
            <div className={`${meta} mt-3`}>
              <span>Goal: Primary</span>
              <span className="font-semibold text-ok">Used for bidding</span>
            </div>
          </div>
        </li>
      </ol>

      <div className="mx-auto mt-12 flex max-w-[68rem] items-center gap-3 rounded-[16px] border-[1.5px] border-solid border-ink bg-white px-7 py-5 text-center font-display text-[1.15rem] font-medium shadow-card">
        <AlertCircle size={20} className="shrink-0 text-accent" aria-hidden="true" />
        <span>In our example before the fix, form fills are the only Primary action, so Smart Bidding looks for more form fills.</span>
      </div>
    </div>
  );
}

export default PipelineFlow;
