import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "./components/consent-banner";
import { site } from "./site.config";
import { CONSENT_KEY } from "./consent-key";
import { sharedOpenGraph, ogImage, twitterImage } from "./seo";

const GTM = "GTM-M7JTCXDW";
// Consent defaults are set first, then any saved choice is applied. GTM itself loads once, after the load event
// and an idle callback (max 2 s), so it does not compete with the page for LCP and TBT (open item O11).
const head = `window.dataLayer=window.dataLayer||[];function dl(){dataLayer.push(arguments)}
dl("consent","default",{ad_storage:"denied",analytics_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
try{if(localStorage.getItem("${CONSENT_KEY}")==="granted")dl("consent","update",{ad_storage:"granted",analytics_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"})}catch(e){}
window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
try{var cc=localStorage.getItem("${CONSENT_KEY}")==="granted"?"granted":"denied";clarity("consentv2",{ad_Storage:cc,analytics_Storage:cc})}catch(e){}
dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
function loadGtm(){var j=document.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=${GTM}";document.head.appendChild(j)}
function queueGtm(){window.requestIdleCallback?requestIdleCallback(loadGtm,{timeout:2000}):setTimeout(loadGtm,1)}
document.readyState==="complete"?queueGtm():addEventListener("load",queueGtm,{once:true});`;

const jsFlag = `document.documentElement.classList.add("js")`;

// Closes the mobile menu popover when a link inside it is clicked (in-page anchors do not close popovers on their own).
const menu = `document.getElementById("site-menu")?.addEventListener("click",function(e){if(e.target.closest("a"))e.currentTarget.hidePopover()});`;

// Fonts are self-hosted from app/fonts (the Google Fonts latin subset, woff2), so the build never fetches Google Fonts.
// A failed fetch broke the Cloudflare build on 30 Oct 2026. Same weights, variables and settings as the old
// next/font/google setup. Characters outside the latin subset (e.g. the arrow) fall back exactly as before.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const fira = localFont({
  src: [
    { path: "./fonts/firasans-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/firasans-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/firasans-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-fira",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const jetbrains = localFont({
  src: [{ path: "./fonts/jetbrainsmono-latin-var.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} | ${site.positioning}`, template: `%s | ${site.brand}` },
  description: site.description,
  applicationName: site.brand,
  openGraph: { ...sharedOpenGraph, images: [ogImage] },
  twitter: { card: "summary_large_image", images: [twitterImage] },
  // Non-production builds (previews, local) are noindex; scripts/cf-postbuild.mjs adds the matching X-Robots-Tag
  // header to out/_headers from the same site.indexable value.
  ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} ${fira.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body>
        {/* Marks JS as available before first paint (the .js class). */}
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <Script id="gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: head }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        {children}
        <ConsentBanner />
        <Script id="menu" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: menu }} />
      </body>
    </html>
  );
}
