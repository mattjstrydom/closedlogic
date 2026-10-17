// Native <details name="faq"> accordion: zero JS, keyboard support built in, one open at a time.
// Styling (bordered rows, accent plus that turns into a minus) lives in app/globals.css under .faq.
export type FaqItem = { q: string; a: React.ReactNode };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map(({ q, a }) => (
        <details key={q} name="faq">
          <summary>
            {q}
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
