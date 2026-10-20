import type { ReactNode } from "react";

// Hero for the inner pages: one h1, one sub-line, optional buttons and micro-line.
export default function PageHero({ id, title, sub, micro, children }: { id: string; title: ReactNode; sub?: ReactNode; micro?: string | string[]; children?: ReactNode }) {
  return (
    <section id="hero" aria-labelledby={`${id}-title`} className="hero-grid">
      <div className="container-site pb-24 pt-20 max-lg:pb-14 max-lg:pt-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 id={`${id}-title`} className="heading-center max-w-[20ch] text-title-xl">{title}</h1>
          {sub && <p className="lead max-w-[46rem]">{sub}</p>}
          {children && <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">{children}</div>}
          {micro && [micro].flat().map((m) => <p key={m} className="font-display text-[0.95rem] font-semibold text-ink">{m}</p>)}
        </div>
      </div>
    </section>
  );
}
