import type { ReactNode } from "react";

// Closing call to action on every page: a heading, one line, one button. Children are the button(s).
export default function CtaBand({ id, title, body, children }: { id: string; title: string; body: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y band">
      <div className="container-site">
        <div className="mx-auto max-w-[56rem] text-center">
          <h2 id={`${id}-title`} className="heading-center text-title-l">
            {title}
          </h2>
          <p className="lead mx-auto mt-5 max-w-[40rem]">{body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">{children}</div>
        </div>
      </div>
    </section>
  );
}
