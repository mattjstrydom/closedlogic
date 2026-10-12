import { checkItems } from "../checks-data";
import StepBadge from "./step-badge";

// Hero preview of the seven checks: native <details> (one open at a time), so it needs no JavaScript.
export default function ChecksPreview() {
  return (
    <div className="faq frag w-full max-w-[460px] overflow-hidden text-left">
      <p className="border-b border-gray-100 px-4 py-3.5 text-[1rem] font-medium tracking-[-0.02em]">Seven questions we answer in every check</p>
      <ol>
        {checkItems.map(({ label, q }, i) => (
          <li key={label} className="border-t border-gray-100 first:border-0">
            <details name="hero-checks" className="group" open={i === 0}>
              <summary className="flex min-h-14 items-center gap-3 px-4 py-2.5">
                <StepBadge n={i + 1} pad />
                <span className="text-[0.9375rem] font-medium tracking-[-0.02em]">{label}</span>
                <span className="faq-icon ml-auto" aria-hidden="true" />
              </summary>
              <p className="px-4 pb-4 pl-[60px] text-[0.875rem] leading-[1.45] tracking-[-0.01em] text-gray-600">{q}</p>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
