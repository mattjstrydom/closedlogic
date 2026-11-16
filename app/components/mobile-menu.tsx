"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Mobile menu: a toggle button (aria-expanded, aria-controls) and the panel #site-menu. Esc closes and returns focus to
// the toggle, Tab is trapped inside the panel and the toggle while it is open, a click on a link closes it, and a
// resize to desktop width closes it. Replaces the old native-popover menu.
export default function MobileMenu({ links, current }: { links: [string, string][]; current: string | undefined }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const items = () => [button.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(Boolean) as HTMLElement[];
    items()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const list = items();
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-input)] bg-white text-ink shadow-[var(--shadow-xs)] lg:hidden"
      >
        <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true" focusable="false">
          {open ? (
            <path d="M3 1l12 8M15 1L3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <>
              <rect y="1" width="18" height="1.8" rx="0.9" fill="currentColor" />
              <rect y="7.2" width="18" height="1.8" rx="0.9" fill="currentColor" />
            </>
          )}
        </svg>
      </button>
      <nav ref={panel} id="site-menu" aria-label="Main" hidden={!open} className="site-menu lg:hidden" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
        <ul className="flex flex-col gap-1">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={href === current ? "page" : undefined}
                className="block rounded-[var(--radius-sm)] px-3 py-3 text-[17px] font-medium text-body no-underline hover:bg-band hover:text-ink aria-[current=page]:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link href="/free-check" className="btn w-full">Get a free check</Link>
        </div>
      </nav>
    </>
  );
}
