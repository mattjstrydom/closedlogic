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

const archivo = localFont({
  src: "./fonts/archivo-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const azeret = localFont({
  src: "./fonts/azeret-mono-latin-var.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-azeret",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} | Make Google Ads bid on pipeline`, template: `%s | ${site.brand}` },
  applicationName: site.brand,
  openGraph: { ...sharedOpenGraph, images: [ogImage] },
  twitter: { card: "summary_large_image", images: [twitterImage] },
  // Non-production builds (previews, local) are noindex; next.config.ts adds the matching X-Robots-Tag header.
  ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${archivo.variable} ${azeret.variable}`} suppressHydrationWarning>
      <body>
        {/* Marks JS as available before first paint, so the A1 loop only runs when its pause control can work (WCAG 2.2.2). */}
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
