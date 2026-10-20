import { Check, Minus, X } from "lucide-react";

// Closed Logic against three other kinds of provider, by role, not by name. "Depends" stands where the answer varies by
// provider; we make no claims about any named company. Read it as a checklist to ask anyone you hire.
const cols = ["Media agency", "CRM partner", "Dashboard", "Closed Logic"];
type V = "Yes" | "No" | "Depends";
const rows: [string, V, V, V, V][] = [
  ["Runs your ads", "Yes", "No", "No", "No"],
  ["Implements your CRM", "No", "Yes", "No", "No"],
  ["Paid on media spend", "Yes", "No", "No", "No"],
  ["Owns the monthly number", "No", "Depends", "No", "Yes"],
  ["Independent audit", "No", "No", "No", "Yes"],
];

const icon = { Yes: Check, No: X, Depends: Minus };

export default function ComparisonGrid() {
  return (
    <div className="card mt-10 overflow-hidden !p-0">
      <div className="table-scroll">
        <table className="cmp w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">Comparison of a media agency, a CRM partner, a dashboard and Closed Logic by role</caption>
          <thead>
            <tr className="border-b border-rule text-[0.8125rem] text-body">
              <th scope="col" className="py-3 pl-5 pr-2 font-normal sm:pl-8"><span className="sr-only">Role</span></th>
              {cols.map((c, i) => (
                <th key={c} scope="col" className={`px-3 py-3 font-medium ${i === 3 ? "text-ink" : "text-body"}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr]:border-t [&_tr]:border-rule">
            {rows.map(([label, ...vals]) => (
              <tr key={label}>
                <th scope="row" className="py-3.5 pl-5 pr-2 font-medium sm:pl-8">{label}</th>
                {vals.map((v, i) => {
                  const I = icon[v];
                  return (
                    <td key={cols[i]} className="px-3">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><I size={14} aria-hidden="true" />{v}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
