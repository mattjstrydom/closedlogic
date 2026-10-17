import type { Metadata } from "next";
import { site } from "./site.config";

// Next replaces (does not merge) nested openGraph/twitter objects, so every page spreads the shared values.
export const sharedOpenGraph = { siteName: site.brand, locale: "en_ZA", type: "website" } as const;

// One share image for Open Graph and Twitter, named in metadata (not the app/opengraph-image.png file convention) so its
// alt text comes from site.config. Every page that sets its own openGraph/twitter object must list it again (shallow merge).
// Nova's share images (outreach/design/brand-closedlogic/): 1200x630 for Open Graph, 1200x600 for X/Twitter. The brand
// name is baked into the PNGs: replace them after a rename.
const ogAlt = `${site.brand}: Google Ads should bid on pipeline, not form fills.`;
export const ogImage = { url: "/closedlogic-og-v2-1200x630.png", width: 1200, height: 630, alt: ogAlt, type: "image/png" };
export const twitterImage = { url: "/closedlogic-og-v2-x-1200x600.png", width: 1200, height: 600, alt: ogAlt, type: "image/png" };

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

const agenciesAlt = `${site.brand} for agencies: we fix your clients' HubSpot to Google Ads tracking, under your agency's name.`;
export const agenciesOgImage = { url: "/closedlogic-og-agencies-1200x630.png", width: 1200, height: 630, alt: agenciesAlt, type: "image/png" };
// X/Twitter large card: the 1200x630 agencies art is within the 1.91:1 ratio X accepts.
export const agenciesTwitterImage = { ...agenciesOgImage };
