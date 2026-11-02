import type { Check } from "../checks-data";
import StepBadge from "./step-badge";

// A numbered list of checks, each with what broken looks like and what it costs. No JavaScript.
export default function AuditChecks({ items, start = 1 }: { items: Check[]; start?: number }) {
  return (
    <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((c, i) => (
        <li key={c.name} className="flex items-start gap-3 border-b border-solid border-rule py-3">
          <StepBadge n={start + i} pad />
          <div>
            <p className="text-text-m font-medium text-ink">{c.name}</p>
            <p className="mt-1 text-body"><span className="font-medium text-ink">Broken: </span>{c.broken}</p>
            <p className="mt-1 text-body"><span className="font-medium text-ink">Costs: </span>{c.cost}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
