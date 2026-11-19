import type { ReactNode } from "react";

// Closing call to action on every inner page: a dark block with a heading, one line and the button(s) (children).
export default function CtaBand({ id, title, body, children }: { id: string; title: string; body?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y !pb-0">
      <div className="container-site">
        <div className="cl-cta">
          <div>
            <h2 id={`${id}-title`}>{title}</h2>
            {body && <p>{body}</p>}
          </div>
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">{children}</div>
        </div>
      </div>
    </section>
  );
}
