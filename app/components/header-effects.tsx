"use client";

import { useEffect } from "react";

// Adds a soft shadow to the sticky header once the page has scrolled (shadow-xs, see .site-header.is-scrolled).
export default function HeaderEffects() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".site-header");
    if (!el) return;
    const update = () => el.classList.toggle("is-scrolled", window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
