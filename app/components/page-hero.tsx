import type { ReactNode } from "react";
import { Chip } from "./ui";

// Hero for the inner pages: an eyebrow pill, one h1, one sub-line, optional buttons and micro-line, on the hero wash.
export default function PageHero({ id, title, sub, micro, eyebrow, children }: { id: string; title: ReactNode; sub?: ReactNode; micro?: string | string[]; eyebrow?: string; children?: ReactNode }) {
  return (
    <section id="hero" aria-labelledby={`${id}-title`} className="hero-grid">
      <div className="container-site pb-20 pt-20 max-md:pb-14 max-md:pt-12">
        <div className="flex flex-col items-center gap-5 text-center">
          {eyebrow && <Chip className="!mb-0">{eyebrow}</Chip>}
          <h1 id={`${id}-title`} className="heading-center max-w-[22ch] text-title-xl">{title}</h1>
          {sub && <p className="lead mx-auto">{sub}</p>}
          {children && <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">{children}</div>}
          {micro && [micro].flat().map((m) => <p key={m} className="text-[15px] font-medium text-body">{m}</p>)}
        </div>
      </div>
    </section>
  );
}
