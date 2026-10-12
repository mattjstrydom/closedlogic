import Link from "next/link";
import CookieSettings from "./cookie-settings";
import { site } from "../site.config";

// min-h-6: 24px targets (WCAG 2.5.8)
const link = "inline-flex min-h-6 items-center text-gray-800 underline underline-offset-[0.2em] hover:text-black hover:decoration-2";

export default function Footer({ teardownHref = "/teardown" }: { teardownHref?: string }) {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-10 text-text-s text-gray-600">
      <div className="container-site flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p>{site.legalLine}.</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/terms" className={link}>Terms</Link>
            <Link href="/privacy" className={link}>Privacy policy</Link>
            <CookieSettings className={`${link} cursor-pointer`} />
            <Link href={teardownHref} className={link}>Get a free teardown</Link>
          </nav>
        </div>
        <p className="max-w-[80ch]">
          HubSpot® and Google Ads are trademarks of their respective owners. {site.brand} is an independent service. We are not affiliated with, authorised by, endorsed by, sponsored by or otherwise approved by HubSpot, Inc. or Google LLC.
        </p>
        <p>© {new Date().getFullYear()} {site.legalName}</p>
      </div>
    </footer>
  );
}
