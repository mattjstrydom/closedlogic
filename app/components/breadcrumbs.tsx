import Link from "next/link";

export type Crumb = { name: string; href?: string };

/** Visible breadcrumb trail. The last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-text-s text-body">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.name} className="inline-flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-muted">/</span>}
            {c.href ? (
              <Link href={c.href} className="text-body no-underline hover:text-accent-text">{c.name}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className="text-ink">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
