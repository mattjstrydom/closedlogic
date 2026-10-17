import Header from "../../components/header";
import Footer from "../../components/footer";
import RequestForm from "../../components/request-form";
import { site } from "../../site.config";
import { pageMetadata, agenciesOgImage, agenciesTwitterImage } from "../../seo";

export const metadata = pageMetadata({
  title: "Free white-label teardown for agencies | Closed Logic",
  description:
    "Send us a client's or prospect's landing page. We record a five-minute look at what Google can see from outside, unbranded, so you can forward it.",
  path: "/agencies/teardown",
  absoluteTitle: true,
  ogImg: agenciesOgImage,
  twImg: agenciesTwitterImage,
});

const looks = [
  "whether the Google tag and Tag Manager load",
  "whether click IDs from your ads get stored",
  "whether HubSpot's tracking code is on the page",
  "how consent is set up for EEA visitors",
];

export default function AgencyTeardown() {
  return (
    <>
      <Header path="/agencies/teardown" agency />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="teardown-title" className="container-site pb-12 pt-14 sm:pt-20">
          <h1 id="teardown-title" className="max-w-[20ch] text-title-l">
            A teardown you can forward to your client
          </h1>
          <div className="mt-8 max-w-[62ch] space-y-5 text-text-xl">
            <p>
              Send us the page a client&apos;s ads point to, or a prospect&apos;s. We&apos;ll record a five-minute look at what&apos;s visible from outside, with no Closed Logic branding, so you can forward it as your own.
            </p>
            <ul className="list-disc space-y-1 pl-6 marker:text-green-500">
              {looks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>No access, no call. We only look at what your page shows any visitor. We do a limited number each week.</p>
          </div>
        </section>

        <section aria-label="Request a teardown" className="container-site pb-20 sm:pb-28">
          <div className="grid items-start gap-5 lg:grid-cols-[5fr_7fr]">
            <div className="tile max-w-[64ch] border border-solid border-rule p-6 text-text-l sm:p-8">
              <p>
                What a teardown can&apos;t show: which conversions you bid on, whether your lifecycle stages reach Google Ads, and how the counts compare. That&apos;s what the pilot covers.
              </p>
            </div>
            <div className="bento">
              <div className="max-w-[36rem]">
                <RequestForm type="teardown" email={site.email} calUrl={site.agencyBookingUrl} agency />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer teardownHref="/agencies/teardown" />
    </>
  );
}
