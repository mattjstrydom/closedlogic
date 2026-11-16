"use client";

import { useEffect, useSyncExternalStore } from "react";

// Motion layer (styles in app/fx.css). Does three things and nothing else:
//  1. cursor light: sets --mx/--my on the card under the pointer (fine pointers only);
//  2. scroll reveal: adds .is-in to [data-reveal] elements as they enter the viewport. Elements already on screen when this
//     runs are shown at once, and html.fx-on (which is what hides them) is only added after that, so nothing flashes or stays hidden;
//  3. restores the visitor's "pause motion" choice (footer toggle, stored in localStorage under cl-fx).
// Nothing here touches tracking, consent or the forms.
const SPOT = ".cl-card, .cl-tier, .cl-fit > div, .cl-person";
const KEY = "cl-fx";

export default function Fx() {
  useEffect(() => {
    const root = document.documentElement;
    try { if (localStorage.getItem(KEY) === "off") root.dataset.fx = "off"; } catch { /* storage blocked: motion stays on */ }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let onMove: ((e: PointerEvent) => void) | undefined;
    if (fine && !reduce) {
      onMove = (e) => {
        const el = (e.target as Element | null)?.closest?.<HTMLElement>(SPOT);
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      document.addEventListener("pointermove", onMove, { passive: true });
    }

    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      const items = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
      const vh = window.innerHeight;
      const later = items.filter((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) { el.classList.add("is-in"); return false; }
        return true;
      });
      root.classList.add("fx-on");
      io = new IntersectionObserver((entries) => {
        for (const en of entries) if (en.isIntersecting) { en.target.classList.add("is-in"); io?.unobserve(en.target); }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      later.forEach((el) => io!.observe(el));
    }

    return () => {
      if (onMove) document.removeEventListener("pointermove", onMove);
      io?.disconnect();
      root.classList.remove("fx-on");
    };
  }, []);
  return null;
}

// The pause choice lives in localStorage; useSyncExternalStore reads it without a setState-in-effect and stays hydration-safe.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const readOff = () => { try { return localStorage.getItem(KEY) === "off"; } catch { return false; } };

/** Footer control: pauses every decorative animation (WCAG 2.2.2 pause for motion that runs more than 5 seconds). */
export function MotionToggle({ className = "" }: { className?: string }) {
  const off = useSyncExternalStore(subscribe, readOff, () => false);
  return (
    <button
      type="button"
      className={`fx-toggle ${className}`}
      aria-pressed={off}
      onClick={() => {
        const next = !off;
        if (next) document.documentElement.dataset.fx = "off"; else delete document.documentElement.dataset.fx;
        try { localStorage.setItem(KEY, next ? "off" : "on"); } catch { /* ignore */ }
        listeners.forEach((cb) => cb());
      }}
    >
      {off ? "Play background motion" : "Pause background motion"}
    </button>
  );
}
