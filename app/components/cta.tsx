import Link from "next/link";
import { site } from "../site.config";

// Booking buttons go to /book, /book-pe or /book-partner (redirects to Cal.com, see site.config.ts). They open in a
// new tab, no embed. Secondary buttons are internal links.
type P = { className?: string; href?: string; children?: React.ReactNode };

export function BookButton({ className = "", href = site.bookPath, children = "Book a 20-minute pipeline review" }: P) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${className}`}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function BookPeButton({ className = "", children = "Book a portfolio measurement call" }: P) {
  return <BookButton href={site.bookPePath} className={className}>{children}</BookButton>;
}

export function AuditButton({ className = "", href = "/method#checks", children = "See the 20-point audit" }: P) {
  return (
    <Link href={href} className={`btn-outline ${className}`}>
      {children}
    </Link>
  );
}

export function MethodButton({ className = "", href = "/method", children = "See the method" }: P) {
  return (
    <Link href={href} className={`btn-outline ${className}`}>
      {children}
    </Link>
  );
}
