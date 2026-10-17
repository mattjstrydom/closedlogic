import { Accent, Chip } from "./ui";

// A2 secondary to primary. Plays once when its top reaches 65% of the viewport (motion script adds .m-ready / .m-play).
// Default markup is the final state (reduced motion and no JS). Outgoing swap items are aria-hidden.
type Vars = { d?: string; t?: string; y?: string; tint?: string };
const v = ({ d, t, y, tint }: Vars) =>
  ({ ...(d && { "--d": d }), ...(t && { "--t": t }), ...(y && { "--y": y }), ...(tint && { "--tint": tint }) }) as React.CSSProperties;

// Goal pills: the shared .goal-primary / .goal-secondary classes in app/globals.css, not copies of them.
const primary = "goal-primary";
const secondary = "goal-secondary";
const row = "m-rise border-t border-solid border-rule";
const rowVars = (d: string) => v({ d, t: ".9s", y: "16px" });

export default function A2SecondaryToPrimary() {
  return (
    <figure
      data-motion
      aria-labelledby="a2-title"
      className="bento mt-5 grid grid-cols-1 gap-y-5 lg:grid-cols-[1fr_1.7fr] lg:grid-rows-[1fr_auto] lg:gap-x-12 lg:gap-y-5"
    >
      <div className="flex min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-1">
        <Chip>The fix, step by step</Chip>
        <h3 id="a2-title" className="text-title-m">
          One setting decides <Accent small>what Google Ads learns from</Accent>
        </h3>
        <p className="text-text-l text-body">Set “HubSpot SQL” to Primary and include it in the account-level goal. Move “Lead form submit” to Secondary. You choose the date, because bidding relearns.</p>
      </div>

      <div className="m-rise min-w-0 rounded-tile bg-pale p-3 max-lg:row-start-3 max-lg:mt-3 sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1" style={v({ d: "0s" })}>
        <div className="frag overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
            <p className="text-[1rem] font-medium tracking-[-0.02em]">Conversion actions</p>
            <p className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] tracking-normal text-body">
              Account ID <span className="inline-block h-[12px] w-[88px] rounded-[3px] bg-gray-100" role="img" aria-label="Account ID hidden" />
            </p>
          </div>
          <table className="w-full border-collapse whitespace-nowrap text-left text-[0.875rem] leading-snug tracking-[-0.01em] sm:text-[0.9375rem]">
            <caption className="sr-only">Example conversion actions after the change</caption>
            <thead>
              <tr className="text-[0.75rem] text-body sm:text-[0.8125rem]">
                <th scope="col" className="py-2.5 pl-4 pr-2 font-normal sm:pl-5">Conversion action</th>
                <th scope="col" className="px-2 py-2.5 font-normal max-sm:hidden">Source</th>
                <th scope="col" className="px-2 py-2.5 font-normal">Goal</th>
                <th scope="col" className="py-2.5 pl-2 pr-4 font-normal max-sm:p-0 sm:pr-5"><span className="sr-only">Note</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className={row} style={rowVars("0.25s")}>
                <td className="h-14 pl-4 pr-2 sm:pl-5">Lead form submit</td>
                <td className="px-2 max-sm:hidden"><span className="text-body">Website form</span></td>
                <td className="px-2">
                  <span className="sw">
                    <span className="m-out" style={v({ d: "2.6s" })} aria-hidden="true"><span className={primary}>Primary</span></span>
                    <span className="m-in" style={v({ d: "2.70s" })}><span className={secondary}>Secondary</span></span>
                  </span>
                </td>
                <td className="pl-2 pr-4 text-right max-sm:p-0 sm:pr-5" />
              </tr>
              <tr className={row} style={rowVars("0.37s")}>
                <td className="h-14 pl-4 pr-2 sm:pl-5">HubSpot MQL</td>
                <td className="px-2 max-sm:hidden"><span className="font-mono text-[0.75rem] tracking-normal sm:text-[0.8125rem]">HubSpot, synced</span></td>
                <td className="px-2"><span className={secondary}>Secondary</span></td>
                <td className="pl-2 pr-4 text-right max-sm:p-0 sm:pr-5" />
              </tr>
              <tr className={`${row} s2p-row`} style={rowVars("0.49s")}>
                <td className="h-14 pl-4 pr-2 sm:pl-5">HubSpot SQL</td>
                <td className="px-2 max-sm:hidden"><span className="font-mono text-[0.75rem] tracking-normal sm:text-[0.8125rem]">HubSpot, synced</span></td>
                <td className="px-2">
                  <span className="sw">
                    <span className="m-out" style={v({ d: "2.9s" })} aria-hidden="true"><span className={secondary}>Secondary</span></span>
                    <span className="m-in" style={v({ d: "3.00s" })}><span className={primary}>Primary</span></span>
                  </span>
                </td>
                {/* Hidden on mobile with visibility, not display: Chrome skipped painting animated tags under an ancestor with a responsive display:none rule. */}
                <td className="pl-2 pr-4 text-right max-sm:p-0 sm:pr-5">
                  <span className="sw justify-items-end max-sm:invisible max-sm:absolute">
                    <span className="m-blip tag-bad justify-self-end" style={v({ d: "1.3s", t: "1.5s" })} aria-hidden="true">Ignored by bidding</span>
                    <span className="m-fade tag-ok justify-self-end" style={v({ d: "3.2s" })}>Used for bidding</span>
                  </span>
                </td>
              </tr>
              <tr className={row} style={rowVars("0.61s")}>
                <td className="h-14 pl-4 pr-2 sm:pl-5">Test conversion</td>
                <td className="px-2 max-sm:hidden"><span className="text-body">Website</span></td>
                <td className="px-2"><span className={secondary}>Secondary</span></td>
                <td className="pl-2 pr-4 text-right max-sm:p-0 sm:pr-5" />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
          <span className="text-[0.875rem] font-medium tracking-[-0.02em] text-body">Smart Bidding learns from:</span>
          <span className="sw">
            <span className="m-out tag-bad" style={v({ d: "3.6s" })} aria-hidden="true">Form fills only</span>
            <span className="m-in tag-ok" style={v({ d: "3.7s" })}>Qualified stages</span>
          </span>
        </div>
        <div className="m-rise frag relative mt-4 p-4 sm:ml-10 sm:p-5" style={v({ d: "4.2s" })}>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-body">Change log row</p>
          <dl className="mt-3 grid grid-cols-1 gap-x-5 gap-y-3 text-[0.875rem] leading-[1.45] tracking-[-0.01em] md:grid-cols-[1.2fr_1.2fr_0.9fr]">
            <div>
              <dt className="text-[0.8125rem] text-body">Change</dt>
              <dd className="mt-1">Set “HubSpot SQL” to Primary and add it to the goal. Move “Lead form submit” to Secondary.</dd>
            </div>
            <div className="rounded-chip bg-green-100 px-3 py-2">
              <dt className="text-[0.8125rem] text-green-deep">To reverse</dt>
              <dd className="mt-1">Set “Lead form submit” back to Primary and “HubSpot SQL” back to Secondary.</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] text-body">Status</dt>
              <dd className="mt-1"><span className="tag-info">Approved, scheduled</span></dd>
            </div>
          </dl>
        </div>
      </div>

      <figcaption className="img-label-quiet justify-self-start self-start max-lg:row-start-2 lg:col-start-1 lg:row-start-2 lg:self-end">Example data, fictional account</figcaption>
    </figure>
  );
}
