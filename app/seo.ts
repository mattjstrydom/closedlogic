import type { Metadata } from "next";
import { site } from "./site.config";

// Next replaces (does not merge) nested openGraph/twitter objects, so every page spreads the shared values.
export const sharedOpenGraph = { siteName: site.brand, locale: "en_US", type: "website" } as const;

// One share image for Open Graph and Twitter, named in metadata (not the app/opengraph-image.png file convention) so its
// alt text comes from here. Every page that sets its own openGraph/twitter object must list it again (shallow merge).
// 1200x630 for Open Graph, 1200x600 for X/Twitter. Rendered from scripts/og-v3.html with scripts/make-og.mjs; the
// text is baked into the PNGs, so re-render them when the positioning changes.
const ogAlt = `${site.brand}: independent pipeline measurement for B2B SaaS. Google Ads 42, HubSpot 31, board deck 18. One number is wrong. We find out which.`;
export const ogImage = { url: "/closedlogic-og-v3-1200x630.png", width: 1200, height: 630, alt: ogAlt, type: "image/png" };
export const twitterImage = { url: "/closedlogic-og-v3-x-1200x600.png", width: 1200, height: 600, alt: ogAlt, type: "image/png" };

/** Page metadata: title (the layout template adds " | <brand>"), description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path, absoluteTitle = false, ogImg = ogImage, twImg = twitterImage }: { title: string; description: string; path: string; absoluteTitle?: boolean; ogImg?: typeof ogImage; twImg?: typeof twitterImage }): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title, description, images: [ogImg] },
    twitter: { card: "summary_large_image", title, description, images: [twImg] },
  };
}
