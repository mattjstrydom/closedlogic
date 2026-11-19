import Link from "next/link";
import { offers } from "../offers";

// Strip below a service page's hero that links the other services, so the umbrella shows on every page.
const services: { href: string; name: string; line: string }[] = [
  { href: "/signal-fix", name: offers.fix.name, line: `${offers.fix.price} fixed` },
  { href: "/pipeline-truth-audit", name: offers.audit.name, line: `${offers.audit.price}` },
  { href: "/ops-desk", name: offers.ops.name, line: `${offers.pilot.price} pilot, then ${offers.ops.per}` },
  { href: "/measurement-lead", name: offers.measurement.name, line: offers.measurement.per },
];

export default function SiblingServices({ current }: { current: string }) {
  return (
    <nav aria-label="Other Closed Logic services" className="border-y border-solid border-[var(--border)] bg-[var(--bg-subtle)] py-5">
      <div className="container-site flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
        <p className="shrink-0 text-[13px] font-medium text-muted">Also from Closed Logic</p>
        <ul className="m-0 grid list-none gap-x-8 gap-y-2 p-0 sm:grid-cols-2 lg:flex lg:flex-wrap">
          {services
            .filter((s) => s.href !== current)
            .map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="link font-semibold">{s.name}</Link>
                <span className="ml-2 text-[13px] text-muted">{s.line}</span>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
