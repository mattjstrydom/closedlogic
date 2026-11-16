import Link from "next/link";
import CookieSettings from "./cookie-settings";
import { MotionToggle } from "./fx";
import Logo from "./logo";
import { site } from "../site.config";
import { hasGuides } from "../guides/content";

// Footer: logo and one-line description, three link columns (Services, Learn, Company), then the legal line.
// Every link the old footer had is kept; Cookie settings sits in Company.
const link = "block min-h-6 py-0.5 text-[14px] text-body no-underline hover:text-ink";
const h4 = "mb-3 text-[13px] font-semibold text-ink";

export default function Footer() {
  return (
    <footer className="mt-[var(--space-24)] border-t border-solid border-rule bg-white pt-16 pb-10 text-body">
      <div className="container-site">
        <div className="cl-fgrid">
          <div>
            <Link href="/" aria-label={`${site.brand}, home`} className="inline-flex no-underline">
              <Logo />
            </Link>
            <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.55]">We sell no media, resell no software and take no cut of ad spend.</p>
          </div>
          <nav aria-label="Services">
            <p className={h4}>Services</p>
            <Link href="/signal-fix" className={link}>Signal Fix</Link>
            <Link href="/ops-desk" className={link}>Ops Desk</Link>
            <Link href="/fractional" className={link}>Fractional</Link>
            <Link href="/pricing" className={link}>Pricing</Link>
          </nav>
          <nav aria-label="Learn">
            <p className={h4}>Learn</p>
            <Link href="/method" className={link}>Method</Link>
            {hasGuides() && <Link href="/guides" className={link}>Guides</Link>}
            <Link href="/about" className={link}>About</Link>
          </nav>
          <nav aria-label="Company">
            <p className={h4}>Company</p>
            <Link href="/contact" className={link}>Contact</Link>
            <Link href="/access" className={link}>Access policy</Link>
            <Link href="/privacy" className={link}>Privacy</Link>
            <Link href="/terms" className={link}>Terms</Link>
            <a href={`mailto:${site.email}`} className={link}>Email us</a>
            <CookieSettings className={`${link} cursor-pointer text-left`} />
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-solid border-rule pt-5 text-[12.5px] leading-[1.5] text-muted">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <p>{site.legalLine}, 530-B Harkle Road, STE 100, Santa Fe, NM 87505, USA.</p>
            <a href={`mailto:${site.email}`} className="text-muted no-underline hover:text-ink">{site.email}</a>
          </div>
          <p className="max-w-[80ch]">
            HubSpot® and Google Ads are trademarks of their respective owners. {site.brand} is an independent service. We are not affiliated with, authorized by, endorsed by, sponsored by or otherwise approved by HubSpot, Inc. or Google LLC.
          </p>
          <p className="flex flex-wrap items-center gap-x-4">
            <span>© {new Date().getFullYear()} {site.legalName}</span>
            <MotionToggle />
          </p>
        </div>
      </div>
    </footer>
  );
}
