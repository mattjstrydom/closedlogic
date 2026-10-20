import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import { AuditButton, BookButton } from "./components/cta";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header path="/404" />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="nf-title" className="section-y">
          <div className="container-site">
            <h1 id="nf-title" className="text-title-l max-w-[20ch]">That page doesn’t exist.</h1>
            <p className="mt-6 max-w-[33.75rem] text-text-l">Start with the 20-point audit or book a 20-minute review.</p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <AuditButton className="w-full sm:w-auto" />
              <BookButton className="w-full sm:w-auto" />
            </div>
            <p className="mt-8">
              <Link href="/" className="link">Go to the home page</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
