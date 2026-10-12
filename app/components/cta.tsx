import Link from "next/link";
import { site } from "../site.config";

// Direct booking buttons go to /book (a redirect to the direct Cal.com link, see site.config.ts). Agency pages pass
// href={site.agencyBookingUrl}. Opens in a new tab, no embed.
export function CalButton({ className = "", href = site.bookPath, children = "Book a 20-minute fit call" }: { className?: string; href?: string; children?: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${className}`}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function TeardownButton({ className = "", href = "/teardown", children = "Get a free teardown" }: { className?: string; href?: string; children?: React.ReactNode }) {
  return (
    <Link href={href} className={`btn-outline ${className}`}>
      {children}
    </Link>
  );
}

export function SampleButton({ className = "", children = "See a sample report" }: { className?: string; children?: React.ReactNode }) {
  return (
    <Link href="/sample-report" className={`btn-outline ${className}`}>
      {children}
    </Link>
  );
}
