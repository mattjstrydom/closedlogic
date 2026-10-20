import Link from "next/link";
import CookieSettings from "./cookie-settings";
import Logo from "./logo";
import { site } from "../site.config";
import { hasGuides } from "../guides/content";

// min-h-6: 24px targets (WCAG 2.5.8). No underline, per the design.
const link = "inline-flex min-h-6 items-center text-body no-underline hover:text-accent";

export default function Footer() {
  return (
    <footer className="border-t border-solid border-rule bg-white py-10 text-text-s text-body">
      <div className="container-site flex flex-col gap-4">
        <Logo />
        <p className="font-medium text-ink">We don&apos;t run media. We don&apos;t sell CRM. We own the number.</p>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p>{site.legalLine}.</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/for-b2b-saas" className={link}>For B2B SaaS</Link>
            <Link href="/for-pe" className={link}>For PE</Link>
            <Link href="/method" className={link}>Method</Link>
            <Link href="/pricing" className={link}>Pricing</Link>
            {hasGuides() && <Link href="/guides" className={link}>Guides</Link>}
            <Link href="/about" className={link}>About</Link>
            <Link href="/contact" className={link}>Contact</Link>
            <Link href="/privacy" className={link}>Privacy</Link>
            <Link href="/terms" className={link}>Terms</Link>
            <CookieSettings className={`${link} cursor-pointer`} />
          </nav>
        </div>
        <p className="max-w-[80ch] text-muted">
          HubSpot® and Google Ads are trademarks of their respective owners. {site.brand} is an independent service. We are not affiliated with, authorized by, endorsed by, sponsored by or otherwise approved by HubSpot, Inc. or Google LLC.
        </p>
        <p className="text-muted">© {new Date().getFullYear()} {site.legalName}</p>
      </div>
    </footer>
  );
}
