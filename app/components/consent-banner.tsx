"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CONSENT_KEY, OPEN_CONSENT_EVENT } from "../consent-key";

const KEY = CONSENT_KEY;
const SIGNALS = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"];
export const OPEN_EVENT = OPEN_CONSENT_EVENT;

declare global {
  interface Window {
    dataLayer: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export default function ConsentBanner() {
  const [done, setDone] = useState(false);
  const [reopened, setReopened] = useState(false);
  const box = useRef<HTMLElement>(null);
  // "ssr" on the server keeps the banner out of the static HTML; the client reads the saved choice.
  const saved = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(KEY);
      } catch {
        return null;
      }
    },
    () => "ssr",
  );
  const show = reopened || (saved === null && !done);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (reopened) box.current?.focus();
  }, [reopened]);

  const choose = (granted: boolean) => {
    const v = granted ? "granted" : "denied";
    let unchanged = false;
    try {
      unchanged = localStorage.getItem(KEY) === v;
      localStorage.setItem(KEY, v);
    } catch {}
    // Same choice again (for example Accept, reopen Cookie settings, Accept): nothing to tell GTM or Clarity, and re-sending
    // it would start the consent-gated tags a second time.
    if (unchanged) {
      setDone(true);
      setReopened(false);
      return;
    }
    // Defaults are already denied; an explicit update also covers someone who accepted earlier.
    // GTM acts on an Arguments object, not an array, so push this function's own `arguments`. The rest parameter
    // exists only so the three-value call type-checks; the values themselves are read from `arguments`.
    /* eslint-disable @typescript-eslint/no-unused-vars, prefer-rest-params */
    (function (..._args: unknown[]) {
      window.dataLayer.push(arguments);
    })("consent", "update", Object.fromEntries(SIGNALS.map((s) => [s, v])));
    /* eslint-enable @typescript-eslint/no-unused-vars, prefer-rest-params */
    // A plain event too, so a GTM Custom Event trigger can start consent-gated tags (Clarity) right after Accept.
    window.dataLayer.push({ event: granted ? "consent_granted" : "consent_denied" });
    // Microsoft Clarity (loaded from GTM) gets the same choice; withdrawing consent also erases its cookies.
    window.clarity?.("consentv2", { ad_Storage: v, analytics_Storage: v });
    if (!granted) window.clarity?.("consent", false);
    setDone(true);
    setReopened(false);
  };

  if (!show) return null;
  // Site button style (10 px radius, ink border, ink offset shadow), compact so the banner stays a short bar on a phone.
  const b =
    "inline-flex min-h-8 items-center justify-center rounded-[10px] border-2 border-solid border-ink bg-white px-4 py-1 font-display text-[0.9375rem] leading-[1.2] font-semibold text-ink shadow-[3px_3px_0_0_#0a0a0a] transition-colors duration-300 hover:bg-pale sm:min-h-10 sm:px-5 sm:text-[1rem]";
  return (
    <section
      ref={box}
      tabIndex={-1}
      aria-label="Cookie consent"
      className="fixed inset-x-2 bottom-2 z-30 rounded-[10px] border-2 border-solid border-ink bg-white px-3 py-2.5 shadow-card outline-none sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 sm:justify-between">
        <p className="min-w-0 flex-1 text-[0.8125rem] leading-[1.35] sm:text-[1rem]">
          This site uses cookies for analytics and advertising measurement.{" "}
          <a href="/privacy" className="link">Privacy policy</a>
        </p>
        <div className="flex shrink-0 flex-col gap-1.5 min-[480px]:flex-row min-[480px]:gap-2 sm:gap-3">
          <button type="button" className={b} onClick={() => choose(true)}>Accept</button>
          <button type="button" className={b} onClick={() => choose(false)}>Decline</button>
        </div>
      </div>
    </section>
  );
}
