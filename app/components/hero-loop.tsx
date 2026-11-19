"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Homepage hero animation: "the gap between your tools" (source: motion/hero-loop, a HyperFrames project; render with
// its npm run render and copy the files into public/motion/). Shown in a card like the site's other cards, so the white
// video ground never clashes with the hero gradient.
//  - prefers-reduced-motion: the poster only, no video.
//  - the footer's "Pause background motion" toggle (html[data-fx="off"], see fx.tsx) pauses the video too.
const subscribeReduce = (cb: () => void) => {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const readReduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const description =
  "Animation: a lead moves from a website form to a CRM and an ad platform. A broken connection is fixed, logged, and the lead reaches the ad platform.";

export default function HeroLoop() {
  const reduce = useSyncExternalStore(subscribeReduce, readReduce, () => false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const root = document.documentElement;
    const sync = () => {
      if (root.dataset.fx === "off") v.pause();
      else v.play().catch(() => { /* autoplay blocked: the poster stays */ });
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-fx"] });
    return () => mo.disconnect();
  }, [reduce]);

  return (
    <figure className="mx-auto mt-10 w-full max-w-[640px] overflow-hidden rounded-[var(--radius-md)] border border-solid border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]" aria-label="How a lead reaches an ad platform">
      <div className="aspect-video w-full">
        {reduce ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/motion/hero-loop-poster.png" alt="" width={1280} height={720} className="block h-full w-full" />
        ) : (
          <video ref={video} className="block h-full w-full" autoPlay muted loop playsInline preload="metadata" poster="/motion/hero-loop-poster.png" aria-hidden="true" width={1280} height={720}>
            <source src="/motion/hero-loop.webm" type="video/webm" />
            <source src="/motion/hero-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
