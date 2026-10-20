// A table that reads like a page of a report: thin rules, left labels, no zebra stripes. Columns listed in `right`
// are right aligned (numbers, prices). Cell content may be text or nodes. Styles: .report-table in app/globals.css.
export default function ReportTable({ caption, head, rows, right = [], className = "" }: { caption: string; head: string[]; rows: React.ReactNode[][]; right?: number[]; className?: string }) {
  return (
    <div className={`table-scroll ${className}`}>
      <table className="report-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h || i} scope="col" className={right.includes(i) ? "r" : undefined}>{h || <span className="sr-only">Item</span>}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row">{c}</th>
                ) : (
                  <td key={ci} className={right.includes(ci) ? "r" : undefined}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
