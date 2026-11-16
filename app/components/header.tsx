import Link from "next/link";
import { site } from "../site.config";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import HeaderEffects from "./header-effects";
import { hasGuides } from "../guides/content";

const baseLinks: [string, string][] = [
  ["/signal-fix", "Signal Fix"],
  ["/ops-desk", "Ops Desk"],
  ["/method", "Method"],
  ["/pricing", "Pricing"],
];

// Navbar: 64px, white, 1px bottom border (soft shadow once scrolled). Logo left, links in small muted type, one small
// primary button right. Under 1024px the links move into the menu toggle.
export default function Header({ path = "/" }: { path?: string }) {
  // Guides appears only once a guide is published (automatic, see app/guides/content.ts).
  const links: [string, string][] = [...baseLinks, ...(hasGuides() ? ([["/guides", "Guides"]] as [string, string][]) : []), ["/about", "About"]];
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  const active = links.find(([href]) => current(href))?.[0];
  return (
    <header className="site-header">
      <HeaderEffects />
      <div className="container-site flex h-16 items-center gap-3 lg:gap-8">
        {/* /#hero, not /: a plain "/" can keep the visitor's old scroll position (the browser restores it), while a fragment always scrolls to the top of the home page, from any page or #section. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#hero" aria-label={`${site.brand}, home`} className="inline-flex min-h-6 items-center no-underline">
          <Logo />
        </a>

        <nav aria-label="Main" className="cl-nav__links ml-auto hidden items-center gap-6 lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={current(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link href="/free-check" className="btn btn-m">Get a free check</Link>
          <MobileMenu links={links} current={active} />
        </div>
      </div>
    </header>
  );
}
