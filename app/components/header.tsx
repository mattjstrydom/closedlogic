import Link from "next/link";
import { site } from "../site.config";
import Logo from "./logo";
import { hasGuides } from "../guides/content";

const baseLinks: [string, string][] = [
  ["/for-b2b-saas", "For B2B SaaS"],
  ["/method", "Method"],
  ["/pricing", "Pricing"],
];

export default function Header({ path = "/" }: { path?: string }) {
  // Guides appears only once a guide is published (automatic, see app/guides/content.ts).
  const links: [string, string][] = [...baseLinks, ...(hasGuides() ? ([["/guides", "Guides"]] as [string, string][]) : []), ["/about", "About"]];
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  return (
    <header className="site-header">
      <div className="container-site flex h-[76px] items-center justify-between gap-6 max-md:h-16">
        {/* /#hero, not /: a plain "/" can keep the visitor's old scroll position (the browser restores it), while a fragment always scrolls to the top of the home page, from any page or #section. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#hero" aria-label={`${site.brand}, home`} className="inline-flex min-h-6 items-center no-underline">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-[30px] text-[1rem] font-medium lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={current(href)} className="inline-flex min-h-[26px] items-center text-ink no-underline hover:text-accent-text aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[0.35em]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.bookPath} target="_blank" rel="noopener noreferrer" className="btn btn-m"><span>Book a review</span><span className="sr-only"> (opens in a new tab)</span></a>
        </div>

        <button
          type="button"
          popoverTarget="site-menu"
          aria-label="Menu"
          className="inline-flex size-11 items-center justify-center justify-self-end rounded-[10px] border-2 border-solid border-ink bg-white text-ink lg:hidden"
        >
          <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden="true" focusable="false">
            <rect y="0" width="18" height="2" fill="currentColor" />
            <rect y="6" width="18" height="2" fill="currentColor" />
          </svg>
        </button>
      </div>

      <nav id="site-menu" popover="auto" aria-label="Main" className="site-menu lg:hidden">
        <ul className="flex flex-col gap-4">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href} aria-current={current(href)} className="font-display text-[1.25rem] leading-[1.3] font-medium text-ink no-underline aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[0.35em]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <a href={site.bookPath} target="_blank" rel="noopener noreferrer" className="btn w-full">Book a 20-minute pipeline review<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </nav>
    </header>
  );
}
