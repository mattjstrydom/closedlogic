import Link from "next/link";
import { site } from "../site.config";
import Logo from "./logo";

const directLinks: [string, string][] = [
  ["/#how", "How it works"],
  ["/#pricing", "Pricing"],
  ["/agencies", "Agencies"],
  ["/#questions", "Questions"],
];

// On the agency pages, Pricing and Questions point at the agency page's own sections.
const agencyLinks: [string, string][] = [
  ["/#how", "How it works"],
  ["/agencies#pricing", "Pricing"],
  ["/agencies", "Agencies"],
  ["/agencies#questions", "Questions"],
];

export default function Header({ path = "/", agency = false }: { path?: string; agency?: boolean }) {
  const onSample = path === "/sample-report";
  const links = agency ? agencyLinks : directLinks;
  const bookHref = agency ? site.agencyBookingUrl : site.bookPath;
  return (
    <header className="site-header">
      <div className="container-site flex h-[76px] items-center justify-between gap-6 max-md:h-16">
        {/* /#hero, not /: a plain "/" can keep the visitor's old scroll position (the browser restores it), while a fragment always scrolls to the top of the home page, from any page or #section. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#hero" aria-label={`${site.brand}, home`} className="inline-flex min-h-6 items-center no-underline">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-[34px] text-[1rem] font-medium lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="inline-flex min-h-[26px] items-center text-ink no-underline hover:text-accent">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/sample-report" className="btn-outline btn-m-outline" aria-current={onSample ? "page" : undefined}>
            See a sample report
          </Link>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="btn btn-m"><span>Book a&nbsp;<span className="max-xl:hidden">20-minute&nbsp;</span>fit call</span><span className="sr-only"> (opens in a new tab)</span></a>
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
              <Link href={href} className="font-display text-[1.25rem] leading-[1.3] font-medium text-ink no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/sample-report" className="btn-outline w-full" aria-current={onSample ? "page" : undefined}>
            See a sample report
          </Link>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="btn w-full">Book a 20-minute fit call<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </nav>
    </header>
  );
}
