import Link from "next/link";

// End-of-guide box: the free check first, then Signal Fix (the guide bodies are left as written).
export default function GuideCta() {
  return (
    <aside aria-labelledby="guide-cta-title" className="bento mt-14">
      <h2 id="guide-cta-title" className="text-title-m">Want to know what your setup is sending?</h2>
      <p className="mt-3 max-w-[56ch] text-text-l text-body">
        We check what your site sends to Google Ads from outside, for free, with no logins. If we find something, Signal Fix is $750 for one defined fix.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/free-check" className="btn w-full sm:w-auto">Get my free check</Link>
        <Link href="/signal-fix" className="btn-outline w-full sm:w-auto">See Signal Fix</Link>
      </div>
    </aside>
  );
}
