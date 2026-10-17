"use client";

import Link from "next/link";
import { track } from "../analytics";

// A link that pushes a GA4 event (with the page path) when clicked. External links open in a new tab.
export default function TrackedLink({ href, event, params = {}, className, external = false, children }: { href: string; event: string; params?: Record<string, string>; className?: string; external?: boolean; children: React.ReactNode }) {
  const onClick = () => track(event, { page_path: window.location.pathname, ...params });
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
