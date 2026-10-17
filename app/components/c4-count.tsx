import { Accent, Chip, Tick, TickPath } from "./ui";

// C4 annotated count. Port of the approved v3 graphic as live markup. Figures match /sample-report (fictional).
function OkTag() {
  return (
    <span className="tag-neutral">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
        <TickPath />
      </svg>
      <span className="max-md:hidden">Close</span>
      <span className="sr-only md:hidden">Close</span>
    </span>
  );
}

function BadTag({ n, kind = "bad", children }: { n: number; kind?: "warn" | "bad"; children: string }) {
  if (kind === "warn")
    return (
      <span className="tag-warn">
        <span className="status-dot status-dot-warn" aria-hidden="true" />
        <span className="sr-only">{n}. </span>
        <span className="max-md:hidden">{children}</span>
        <span className="sr-only md:hidden">{children}</span>
      </span>
    );
  return (
    <span className="tag-bad">
      <span className="tag-num">{n}</span>{" "}<span className="max-md:hidden">{children}</span>
    </span>
  );
}

const rows: [string, string, React.ReactNode, React.ReactNode][] = [
  ["MQL", "142", "131", <OkTag key="a" />],
  ["SQL", "61", <span key="b" className="anno-box inline-flex px-1.5">118</span>, <BadTag key="c" n={1} kind="warn">Sent twice</BadTag>],
  ["Opportunity", "24", "22", <OkTag key="d" />],
  ["Customer", "9", <span key="e" className="anno-box inline-flex px-1.5">0</span>, <BadTag key="f" n={2}>Not recording</BadTag>],
];

/** The count fragment on its own; reused by /sample-report (same figures and tags). */
export function CountTable({ className = "" }: { className?: string }) {
  return (
    // overflow-x-auto, not hidden: below about 360px the table is wider than the card, so it scrolls sideways instead of
    // being clipped (WCAG 1.4.10 allows this for data tables). Chrome and Firefox make such scrollers keyboard-focusable.
    <div className={`frag overflow-x-auto ${className}`}>
      <div className="flex items-center gap-3 border-b border-rule px-4 py-3.5 sm:px-5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-gray-100" />
          <i className="size-2.5 rounded-full bg-gray-100" />
          <i className="size-2.5 rounded-full bg-gray-100" />
        </span>
        <p className="text-[0.9375rem] tracking-[-0.01em]">Same 30 days. Stage changes in HubSpot against conversions recorded in Google Ads.</p>
      </div>
      <table className="w-full border-collapse text-left text-[0.875rem] leading-snug sm:text-[0.9375rem]">
        <caption className="sr-only">Example: HubSpot stage changes against Google Ads conversions, same 30 days</caption>
        <thead>
          <tr className="text-[0.75rem] tracking-[0.06em] text-muted uppercase sm:text-[0.8125rem]">
            <th scope="col" className="py-3 pl-4 pr-2 font-normal sm:pl-5">Stage</th>
            <th scope="col" className="px-2 py-3 text-right font-normal max-sm:px-0.5">
              <span className="max-sm:sr-only">HubSpot, from Google Ads contacts</span>
              <span className="sm:hidden" aria-hidden="true">HubSpot</span>
            </th>
            <th scope="col" className="px-2 py-3 text-right font-normal max-sm:px-0.5">
              <span className="max-sm:sr-only">Google Ads recorded</span>
              <span className="sm:hidden" aria-hidden="true">Google Ads</span>
            </th>
            <th scope="col" className="py-3 pl-2 pr-4 font-normal sm:pr-5"><span className="sr-only">Notes</span></th>
          </tr>
        </thead>
        <tbody className="font-mono [&_td]:h-[60px] [&_tr]:border-t [&_tr]:border-rule">
          {rows.map(([stage, hs, ga, tag]) => (
            <tr key={stage}>
              <td className="pl-4 pr-2 font-sans sm:pl-5">{stage}</td>
              <td className="px-2 text-right max-sm:px-0.5">{hs}</td>
              <td className="px-2 text-right max-sm:px-0.5">{ga}</td>
              <td className="pl-2 pr-4 text-right sm:pr-5">{tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function C4Count() {
  return (
    <figure
      aria-labelledby="c4-title"
      className="card mt-7 grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[5fr_7fr] lg:grid-rows-[1fr_auto] lg:gap-x-12"
    >
      <div className="flex min-w-0 flex-col lg:col-start-1 lg:row-start-1">
        <Chip>Side-by-side count</Chip>
        <h3 id="c4-title" className="mt-4 text-title-m">
          Which gaps are faults, <Accent small>and which are normal</Accent>
        </h3>
        <p className="mt-4 text-text-l text-body">Some difference between the two counts is normal. These ones are explained.</p>

        <ol className="mt-7 space-y-4 text-text-m">
          <li className="flex gap-3 text-green-text">
            <Tick size={22} />
            <span><span className="font-medium">MQL.</span> Close. Differences alone aren&apos;t a fault.</span>
          </li>
          <li className="flex gap-3">
            <span className="note-num !bg-amber-text" aria-hidden="true">1</span>
            <span><span className="font-medium">SQL.</span> Sent twice: HubSpot integration and a Zapier automation.</span>
          </li>
          <li className="flex gap-3 text-green-text">
            <Tick size={22} />
            <span><span className="font-medium">Opportunity.</span> Close, so not a fault.</span>
          </li>
          <li className="flex gap-3">
            <span className="note-num" aria-hidden="true">2</span>
            <span><span className="font-medium">Customer.</span> Zero: legacy upload isn&apos;t recording.</span>
          </li>
        </ol>
      </div>

      <div className="tile min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <CountTable />
      </div>

      <figcaption className="img-label-quiet justify-self-start self-start lg:col-start-1 lg:row-start-2 lg:self-end">Example data, fictional account</figcaption>
    </figure>
  );
}
