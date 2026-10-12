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
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    // Defaults are already denied; an explicit update also covers someone who accepted earlier.
    // GTM only reads Arguments objects pushed to dataLayer.
    (function dl(..._cmd: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    })("consent", "update", Object.fromEntries(SIGNALS.map((s) => [s, v])));
    // A plain event too, so a GTM Custom Event trigger can start consent-gated tags (Clarity) right after Accept.
    window.dataLayer.push({ event: granted ? "consent_granted" : "consent_denied" });
    // Microsoft Clarity (loaded from GTM) gets the same choice; withdrawing consent also erases its cookies.
    window.clarity?.("consentv2", { ad_Storage: v, analytics_Storage: v });
    if (!granted) window.clarity?.("consent", false);
    setDone(true);
    setReopened(false);
  };

  if (!show) return null;
  const b =
    "inline-flex min-h-10 items-center justify-center rounded-pill border-[1.5px] border-solid border-black bg-white px-6 py-2 text-[1rem] leading-[1.3] font-medium text-black transition-colors duration-300 hover:bg-gray-50";
  return (
    <section
      ref={box}
      tabIndex={-1}
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-100 bg-white py-4 shadow-float outline-none"
    >
      <div className="container-site flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[1rem]">
          This site uses cookies for analytics and advertising measurement.{" "}
          <a href="/privacy" className="link">Privacy policy</a>
        </p>
        <div className="flex gap-3">
          <button type="button" className={b} onClick={() => choose(true)}>Accept</button>
          <button type="button" className={b} onClick={() => choose(false)}>Decline</button>
        </div>
      </div>
    </section>
  );
}
