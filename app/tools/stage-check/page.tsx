import Header from "../../components/header";
import Footer from "../../components/footer";
import StageCheck from "../../components/stage-check";
import { site } from "../../site.config";
import { pageMetadata } from "../../seo";

const alt = "Which stage is Google bidding on? A free 2-minute check from Closed Logic.";
const og = { url: "/stage-check-og-1200x630.png", width: 1200, height: 630, alt, type: "image/png" };
const tw = { url: "/stage-check-twitter-1200x600.png", width: 1200, height: 600, alt, type: "image/png" };

export const metadata = pageMetadata({
  title: "HubSpot to Google Ads stage check",
  description: "Seven yes or no questions about how HubSpot sends lifecycle stages to Google Ads. It takes two minutes, needs no login and connects to nothing.",
  path: "/tools/stage-check",
  ogImg: og,
  twImg: tw,
});

export default function StageCheckPage() {
  return (
    <>
      <Header path="/tools/stage-check" />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="sc-title" className="container-site pb-10 pt-14 sm:pt-20">
          <h1 id="sc-title" className="max-w-[20ch] text-title-l">Which stage is Google bidding on?</h1>
          <div className="mt-8 max-w-[62ch] space-y-5 text-text-xl">
            <p>
              Answer seven yes, no or not sure questions about how HubSpot sends lifecycle stages to Google Ads. You get a short list of what to check next. It takes about two minutes.
            </p>
            <p className="text-body">
              We don&apos;t connect to HubSpot or Google Ads, and we don&apos;t ask for any account data. Your answers stay in your browser unless you choose to email us the result.
            </p>
          </div>
        </section>
        <section aria-label="Stage check questions" className="container-site pb-20 sm:pb-28">
          <div className="max-w-[48rem]">
            <StageCheck calUrl={site.bookPath} guideUrl="/guides/bid-on-pipeline-not-form-fills" email={site.email} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
