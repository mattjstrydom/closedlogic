import Header from "../components/header";
import Footer from "../components/footer";
import RequestForm from "../components/request-form";
import { site } from "../site.config";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Free landing page teardown",
  description:
    "Send us the page your ads point to. We record a five-minute look at what Google can see from outside: tags, click IDs, HubSpot tracking and consent.",
  path: "/teardown",
});

const looks = [
  "whether the Google tag and Tag Manager load",
  "whether click IDs from your ads get stored",
  "whether HubSpot's tracking code is on the page",
  "how consent is set up for EEA visitors",
];

export default function Teardown() {
  return (
    <>
      <Header path="/teardown" />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="teardown-title" className="container-site pb-12 pt-14 sm:pt-20">
          <h1 id="teardown-title" className="max-w-[20ch] text-title-l">
            See what Google can see on your landing page
          </h1>
          <div className="mt-8 max-w-[62ch] space-y-5 text-text-xl">
            <p>
              Send us the page your ads point to. We&apos;ll record a five-minute look at what&apos;s visible from outside, the way any visitor&apos;s browser sees it:
            </p>
            <ul className="list-disc space-y-1 pl-6 marker:text-green-500">
              {looks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>
              These are the things behind most HubSpot Google Ads conversion tracking problems: a missing click ID, HubSpot tracking code that isn&apos;t on the page, and consent mode settings that are set up wrongly or too late.
            </p>
            <p>No access, no call. We only look at what your page shows any visitor. We do a limited number each week.</p>
          </div>
        </section>

        <section aria-label="Request a teardown" className="container-site pb-20 sm:pb-28">
          <div className="grid items-start gap-5 lg:grid-cols-[5fr_7fr]">
            <div className="tile max-w-[64ch] border border-solid border-rule p-6 text-text-l sm:p-8">
              <p>
                What a teardown can&apos;t show: which conversions you bid on, whether your lifecycle stages reach Google Ads, and how the counts compare. That&apos;s what the full check covers.
              </p>
            </div>
            <div className="bento">
              <div className="max-w-[36rem]">
                <RequestForm type="teardown" email={site.email} calUrl={site.bookPath} />
                <p className="mt-4 text-body">We reply within 3 business days. We take 3 a week.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="what-you-get-title" className="container-site pb-20 sm:pb-28">
          <h2 id="what-you-get-title" className="text-title-m">What you get</h2>
          <p className="mt-3 max-w-[62ch] text-text-l text-body">A short note with what we saw, for example this sample for a made-up site.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/teardown-what-you-get.png" alt="Sample teardown note for a fictional site, with four findings: tags OK, click ID check, HubSpot tracking missing, consent check." width={1600} height={1000} loading="lazy" className="mt-6 h-auto w-full max-w-[900px] rounded-[10px]" />
        </section>
      </main>
      <Footer />
    </>
  );
}
