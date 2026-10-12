"use client";

import { useId, useRef, useState } from "react";

// Two-panel switcher for the hero visual. Both panels are rendered by the server and passed in, so this client
// component only owns which one is visible. Keyboard: arrow keys, Home and End move between tabs.
export default function HeroTabs({ tabs }: { tabs: { label: string; panel: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (active + 1) % tabs.length : e.key === "ArrowLeft" ? (active + last) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="flex min-w-0 flex-col items-center gap-5 lg:items-start">
      <div role="tablist" aria-label="Hero preview" className="seg" onKeyDown={onKeyDown}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className="seg-item"
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`${uid}-panel-${i}`} aria-labelledby={`${uid}-tab-${i}`} hidden={active !== i} className="w-full min-w-0 max-w-[460px]">
          {t.panel}
        </div>
      ))}
    </div>
  );
}
