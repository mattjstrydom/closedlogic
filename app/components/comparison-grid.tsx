import { Check, Minus } from "lucide-react";

// Closed Logic against three other ways to get this done. We can only state what we do, so the other columns
// say "Depends" rather than make claims about companies we don't know. Read it as a checklist to ask any provider.
const cols = ["Closed Logic", "In-house ops", "PPC agency", "HubSpot Support"];
const rows = [
  "Fixes inside your accounts",
  "Logs undo steps",
  "Understands Smart Bidding",
  "Fixed $1,200 scope",
  "No ongoing retainer required",
];

export default function ComparisonGrid() {
  return (
    <div className="card mt-7 overflow-hidden !p-0">
      <div className="px-5 pt-5 sm:px-8 sm:pt-8">
        <h3 className="text-title-xs">What to ask any provider</h3>
        <p className="mt-2 max-w-[64ch] text-text-m text-body">We can only speak for ourselves. Other providers differ, so check each row with yours.</p>
      </div>
      <div className="mt-5 table-scroll">
        <table className="cmp w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">Comparison of Closed Logic with other ways to fix the HubSpot to Google Ads connection</caption>
          <thead>
            <tr className="border-y border-rule text-[0.8125rem] text-body">
              <th scope="col" className="py-3 pl-5 pr-2 font-normal sm:pl-8"><span className="sr-only">Criteria</span></th>
              {cols.map((c, i) => (
                <th key={c} scope="col" className={`px-3 py-3 font-medium ${i === 0 ? "text-ink" : "text-body"}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr]:border-t [&_tr]:border-rule">
            {rows.map((r) => (
              <tr key={r}>
                <th scope="row" className="py-3.5 pl-5 pr-2 font-medium sm:pl-8">{r}</th>
                <td className="px-3"><span className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-ok"><Check size={14} aria-hidden="true" />Yes</span></td>
                {cols.slice(1).map((c) => (
                  <td key={c} className="px-3"><span className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted"><Minus size={14} aria-hidden="true" />Depends</span></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
