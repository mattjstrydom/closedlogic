import Link from "next/link";
import { bookHref } from "../booking";

// Booking buttons go straight to Cal.com with UTM tags for the page they're on (app/booking.ts). They open in a
// new tab, no embed; data-cta="book" lets public/cta.js record the click. Secondary buttons are internal links.
type P = { className?: string; href?: string; children?: React.ReactNode };
type B = { className?: string; campaign: string; pe?: boolean; children?: React.ReactNode };

export function BookButton({ className = "", campaign, pe = false, children = "Book a 20-minute call" }: B) {
  return (
    <a href={bookHref(campaign, pe ? "pe" : "direct")} data-cta="book" data-cta-page={campaign} target="_blank" rel="noopener noreferrer" className={`btn ${className}`}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function BookPeButton({ className = "", campaign, children = "Book a portfolio measurement call" }: Omit<B, "pe">) {
  return <BookButton pe campaign={campaign} className={className}>{children}</BookButton>;
}

export function AuditButton({ className = "", href = "/method#checks", children = "See the 10 core checks" }: P) {
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
