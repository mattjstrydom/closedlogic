import { Accent, Chip, TickPath } from "./ui";

// A3 change log ticks. Plays once when its top reaches 65% of the viewport. Default markup is the final state.
const v = (vars: Record<string, string>) => Object.fromEntries(Object.entries(vars).map(([k, val]) => [`--${k}`, val])) as React.CSSProperties;

type Final = "scheduled" | "done" | "waiting";
const rows: { n: string; text: string; final: Final }[] = [
  { n: "01", text: "Set “HubSpot SQL” to Primary; “Lead form submit” to Secondary", final: "scheduled" },
  { n: "02", text: "Pause the Zapier automation", final: "done" },
  { n: "03", text: "Tag Manager tag to fill the hidden click ID field", final: "done" },
  { n: "04", text: "Move Customer to the HubSpot integration; retire CSV upload", final: "waiting" },
  { n: "05", text: "Consent default tag in Tag Manager", final: "done" },
  { n: "06", text: "Remove “Test conversion” from the goal", final: "done" },
];

const finalStart = [3.2, 3.5, 3.8, 4.1, 4.4, 4.7];

function FinalTag({ final, draw }: { final: Final; draw: string }) {
  if (final === "scheduled") return <span className="tag-info">Approved, scheduled</span>;
  if (final === "waiting") return <span className="tag-wait max-sm:whitespace-normal">Approved, waiting on first conversions</span>;
  return (
    <span className="tag-ok">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
        <TickPath className="m-draw" style={v({ d: draw })} />
      </svg>
      Approved, done
    </span>
  );
}

export default function A3ChangeLog() {
  return (
    <figure data-motion aria-labelledby="a3-title" className="card grid grid-cols-1 gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-9">
      <div className="flex flex-col gap-4 sm:col-start-1 sm:row-start-1">
        <Chip>Change log</Chip>
        <h3 id="a3-title" className="max-w-[560px] text-title-m">
          We make only the changes <Accent dark>you approve</Accent>
        </h3>
      </div>

      <div className="m-rise frag col-span-full mt-4 overflow-hidden text-ink max-sm:row-start-3 sm:row-start-2" style={v({ d: "0s" })}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <p className="text-[1rem] font-medium tracking-[-0.02em]">Changes made, with status</p>
          <div className="flex items-center gap-3">
            <span className="relative block h-1.5 w-28 overflow-hidden rounded-pill bg-pale" aria-hidden="true">
              <span className="m-grow absolute inset-y-0 left-0 w-2/3 rounded-pill bg-accent" style={v({ d: "3.2s", t: "1.8s" })} />
            </span>
            <span className="sw font-mono text-[12px] tracking-normal text-body">
              <span className="m-out" style={v({ d: "3.1s" })} aria-hidden="true">6 proposed</span>
              <span className="m-in" style={v({ d: "3.2s" })}>4 of 6 done</span>
            </span>
          </div>
        </div>
        <ol>
          {rows.map((r, i) => (
            <li
              key={r.n}
              className="m-rise grid grid-cols-1 items-center gap-2 border-t border-solid border-rule px-4 py-3.5 sm:grid-cols-[1fr_auto] sm:gap-6 sm:px-5"
              style={v({ d: `${(0.3 + 0.15 * i).toFixed(2)}s`, t: ".9s", y: "24px" })}
            >
              <span className="text-[0.875rem] leading-[1.4] tracking-[-0.01em] sm:text-[0.9375rem]">
                <span className="mr-2 font-mono text-[11px] tracking-normal text-body">{r.n}</span>
                {r.text}
              </span>
              <span className="sw sm:justify-items-end">
                <span className="m-out tag-grey sm:justify-self-end" style={v({ d: `${(1.6 + 0.2 * i).toFixed(2)}s` })} aria-hidden="true">Proposed</span>
                <span className="m-blip tag-info sm:justify-self-end" style={v({ d: `${(1.65 + 0.2 * i).toFixed(2)}s`, t: `${(1.6 + 0.1 * i).toFixed(2)}s` })} aria-hidden="true">Approved</span>
                <span className="m-in sm:justify-self-end" style={v({ d: `${finalStart[i].toFixed(2)}s` })}>
                  <FinalTag final={r.final} draw={`${(finalStart[i] + 0.15).toFixed(2)}s`} />
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className="m-fade border-t border-solid border-rule bg-pale px-4 py-3 text-[0.8125rem] leading-[1.45] tracking-[-0.01em] text-body sm:px-5" style={v({ d: "5.1s" })}>
          Each change has its reversal in the findings. The bidding change goes live on the date you choose.
        </p>
      </div>

      <figcaption className="img-label-dark justify-self-start self-start max-sm:row-start-2 sm:col-start-2 sm:row-start-1 sm:self-end">Sample report, fictional account</figcaption>
    </figure>
  );
}
