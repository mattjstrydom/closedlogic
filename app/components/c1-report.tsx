import { Accent, Chip } from "./ui";
import webpLoader, { staticSrcSet } from "../image-loader";

// C1 white-label report: live heading plus the pages-only image (desktop three pages, mobile two stacked).
const alt =
  "Three pages of a sample report as an agency would send it: a cover page with a \"Your agency logo\" placeholder, a finding page about qualified stages not used for bidding, and the change log with how to reverse each change. Sample report, fictional account.";

const D = "/images/c1-pages@2x.png";
const M = "/images/c1-pages-mobile@2x.png";
const desktopSizes = "(min-width: 1440px) 1232px, (min-width: 1024px) calc(100vw - 208px), calc(100vw - 168px)";
const mobileSizes = "calc(100vw - 80px)";

export default function C1Report() {
  return (
    <figure aria-labelledby="c1-title" className="card mt-5 overflow-hidden px-5 py-8 sm:px-16 sm:py-16">
      <Chip>White-label report</Chip>
      <h3 id="c1-title" className="mt-4 max-w-[900px] text-title-l">
        Shown as your agency would send it: <Accent dark>your logo, our name nowhere.</Accent>
      </h3>
      {/* Pre-sized AVIF first, WebP fallback (scripts/build-images.mjs); mobile art direction below 768px. */}
      <picture>
        <source media="(max-width: 767px)" type="image/avif" srcSet={staticSrcSet(M, "avif")} sizes={mobileSizes} width={358} height={1049} />
        <source media="(max-width: 767px)" type="image/webp" srcSet={staticSrcSet(M, "webp")} sizes={mobileSizes} width={358} height={1049} />
        <source type="image/avif" srcSet={staticSrcSet(D, "avif")} sizes={desktopSizes} />
        <img
          src={webpLoader({ src: D, width: 1504 })}
          srcSet={staticSrcSet(D, "webp")}
          sizes={desktopSizes}
          width={1504}
          height={805}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="mt-10 h-auto w-full md:mt-14"
        />
      </picture>
      <figcaption className="img-label-dark mt-8">Sample report, fictional account</figcaption>
    </figure>
  );
}
