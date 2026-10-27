// A table that reads like a page of a report: thin rules, left labels, no zebra stripes. Columns listed in `right`
// are right aligned (numbers, prices). Cell content may be text or nodes. Styles: .report-table in app/globals.css.
// Below 640 px each row stacks into a card and every cell shows its column name (data-label), so nothing is crushed.
// The explicit roles keep the table semantics when the stacked layout changes the CSS display values.
// The scroll box is a labelled, focusable region, so keyboard users can scroll it when the table is wider than the page.
export default function ReportTable({ caption, head, rows, right = [], className = "" }: { caption: string; head: string[]; rows: React.ReactNode[][]; right?: number[]; className?: string }) {
  return (
    <div className={`table-scroll ${className}`} tabIndex={0} role="region" aria-label={caption}>
      <table className="report-table report-stack" role="table">
        <caption className="sr-only">{caption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {head.map((h, i) => (
              <th key={h || i} scope="col" role="columnheader" className={right.includes(i) ? "r" : undefined}>{h || <span className="sr-only">Item</span>}</th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((r, ri) => (
            <tr key={ri} role="row">
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" role="rowheader">{c}</th>
                ) : (
                  <td key={ci} role="cell" data-label={head[ci]} className={right.includes(ci) ? "r" : undefined}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
