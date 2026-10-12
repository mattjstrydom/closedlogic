// Bordered mono counter. Give the parent row class "group" (or a <details>) to get the hover and focus accent.
export default function StepBadge({ n, pad = false, large = false }: { n: number; pad?: boolean; large?: boolean }) {
  return (
    <span aria-hidden="true" className={`step-badge ${large ? "step-badge-lg" : ""}`}>
      {pad ? String(n).padStart(2, "0") : n}
    </span>
  );
}
