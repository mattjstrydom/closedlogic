import { checkItems } from "../checks-data";
import StepBadge from "./step-badge";

// The 20 checks as a numbered, two-column list. No JavaScript.
export default function AuditChecks() {
  return (
    <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {checkItems.map((label, i) => (
        <li key={label} className="flex items-center gap-3 border-b border-solid border-rule py-3">
          <StepBadge n={i + 1} pad />
          <span className="text-text-m font-medium text-ink">{label}</span>
        </li>
      ))}
    </ol>
  );
}
