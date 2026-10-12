import Link from "next/link";
import { site } from "../site.config";
import Wordmark from "./wordmark";

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
    <header className="glass sticky top-0 z-20">
      <div className="container-site grid h-16 grid-cols-[1fr_auto] items-center gap-4 max-md:h-[60px] lg:grid-cols-[1fr_auto_1fr]">
        {/* /#hero, not /: a plain "/" can keep the visitor's old scroll position (the browser restores it), while a fragment always scrolls to the top of the home page, from any page or #section. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#hero" aria-label={`${site.brand}, home`} className="inline-flex min-h-6 items-center justify-self-start no-underline">
          <Wordmark decorative className="h-[22px] w-auto md:h-6" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 rounded-pill bg-white px-7 py-2 text-[0.875rem] leading-[1.3] font-medium tracking-[-0.03em] lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="inline-flex min-h-[26px] items-center text-black no-underline underline-offset-[0.2em] hover:underline">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <Link href="/sample-report" className="btn-m-outline" aria-current={onSample ? "page" : undefined}>
            See a sample report
          </Link>
          <a href={bookHref} target="_blank" rel="noopener noreferrer" className="btn-m">Book a fit call<span className="sr-only"> (opens in a new tab)</span></a>
        </div>

        <button
          type="button"
          popoverTarget="site-menu"
          aria-label="Menu"
          className="inline-flex size-11 items-center justify-center justify-self-end rounded-pill bg-white text-black lg:hidden"
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
              <Link href={href} className="text-[1.25rem] leading-[1.3] font-medium text-black no-underline">
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
