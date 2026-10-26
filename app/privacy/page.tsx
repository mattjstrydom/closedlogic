import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { Slot } from "../components/ph";
import { site } from "../site.config";
import { CONSENT_KEY } from "../consent-key";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `What ${site.domain} collects, why, who sees it, how long we keep it, and how to use your rights. ${site.legalLine}.`,
  path: "/privacy",
});

const h = "pt-8 text-title-s";

export default function Privacy() {
  return (
    <>
      <Header path="/privacy" />
    <main id="main" tabIndex={-1} className="container-site pb-20 pt-12 sm:pt-16">
      <div className="max-w-[64ch] space-y-5 text-text-l [&_code]:font-mono [&_code]:text-[0.9em]">
        <h1 className="text-title-l">Privacy policy</h1>
        <p className="text-body">
          Last updated <Slot value={site.privacyLastUpdated} />
        </p>

        <p>
          This policy explains what personal data {site.domain} collects, why, who sees it and what
          your choices are. {site.legalLine} (&quot;we&quot;,
          &quot;us&quot;). We are the controller of the data described here. Contact us at{" "}
          <a href={`mailto:${site.email}`} className="link">{site.email}</a>.
        </p>

        <h2 className={h}>What we collect</h2>
        <p>
          <strong>When you book a call or send a request.</strong> If you book a pipeline review through Cal.com,
          we receive the details you enter when booking. If you send a request through the contact form, we receive your name, work
          email, company, role, {site.showPE ? "ARR or portfolio size" : "ARR"}, stack and any note you choose to write. We use it to reply to you, to
          decide whether the service is a fit, and to prepare for a call if we have one. If the link you followed carried a source tag (for example from a LinkedIn post), we also record that tag, so we can see which channel the request came from.
        </p>
        <p>
          <strong>When you email us.</strong> Your email address and whatever you send.
        </p>
        <p>
          <strong>When you visit the site, and only if you accept cookies.</strong> Google Analytics 4 measures
          pages viewed, referrer, approximate location, device and browser details, and cookie identifiers.
          It&apos;s loaded through Google Tag Manager and switched off until you press Accept. Tag Manager itself
          loads on every visit so it can apply your choice. Google says it keeps only standard request logs
          from it, deleted within 14 days.
        </p>
        <p>
          <strong>When you visit the site, and only if you accept cookies: session replays and heatmaps.</strong>{" "}
          Microsoft Clarity records how visitors use the site: clicks, scrolling and mouse movement, shown as session
          replays and heatmaps, with the page, referrer, device, browser and approximate location. It sets cookies to
          recognise your browser across pages. What you type into form fields is always masked. It&apos;s loaded
          through Tag Manager and switched off until you press Accept. Clarity keeps recordings for up to 30 days.
        </p>
        <p>
          <strong>Cookie-free visit statistics, whether or not you accept cookies.</strong> Cloudflare Web
          Analytics counts page views and measures how fast pages load, using the page address, referrer,
          country, device type and browser. It sets no cookies and uses no local storage, and it does not
          follow you from one site to another.
        </p>
        <p>
          <strong>Technical logs.</strong> Our host records standard request data, such as IP address and
          user agent, to deliver the site and keep it secure. This happens whether or not you accept cookies.
        </p>
        <p>We do not ask for payment details on this site and we do not knowingly collect data from children.</p>

        <h2 className={h}>Why we use it, and our legal basis</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Replying to your request and taking steps you ask for before any agreement: legitimate interests, and steps at your request before entering a contract.</li>
          <li>Running a service you have bought, including access to your accounts: performance of a contract.</li>
          <li>Analytics and session replay cookies: your consent, which you can withdraw at any time.</li>
          <li>Keeping the site secure and preventing spam, and cookie-free visit statistics from Cloudflare Web Analytics: legitimate interests.</li>
          <li>Keeping records we are legally required to keep, such as invoices: legal obligation.</li>
        </ul>

        <h2 className={h}>Cookies and consent</h2>
        <p>
          Until you choose, every Google consent signal (<code>ad_storage</code>,{" "}
          <code>analytics_storage</code>, <code>ad_user_data</code> and <code>ad_personalization</code>) is
          set to denied. If you press Accept they are set to granted. If you press Decline they stay denied.
          We store your choice in your browser&apos;s local storage under the key <code>{CONSENT_KEY}</code> so
          we do not ask again. To change your mind, use the Cookie settings link at the bottom of any page.
        </p>

        <h2 className={h}>Who we share it with</h2>
        <p>We do not sell your personal data. We use these providers to run the site and the service:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Cloudflare</strong>: hosts the site, protects it from abuse and, through Web Analytics, counts visits without cookies. (<a href="https://www.cloudflare.com/privacypolicy/" className="link">privacy policy</a>,{" "}
            <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" className="link">DPA</a>)
          </li>
          <li>
            <strong>Sequenzy (Nic Tech Solutions, LLC)</strong>: stores the requests you send through the contact form, and lets us email you about them. (
            <a href="https://www.sequenzy.com/privacy" className="link">privacy policy</a>, <a href="https://www.sequenzy.com/dpa" className="link">DPA</a>)
          </li>
          <li>
            <strong>Google (Tag Manager, and Google Analytics 4 loaded through it)</strong>: measures how the site is used, only after you accept
            cookies. Google Analytics 4 and Microsoft Clarity are the only tags we load. We&apos;ll update this policy before we add any advertising tags. (<a href="https://policies.google.com/privacy" className="link">privacy policy</a>,{" "}
            <a href="https://policies.google.com/technologies/partner-sites" className="link">how Google uses data from sites that use its services</a>)
          </li>
          <li>
            <strong>Microsoft (Clarity)</strong>: records how the site is used, as session replays and heatmaps, only after you accept
            cookies. (<a href="https://www.microsoft.com/privacy/privacystatement" className="link">privacy statement</a>)
          </li>
          <li>
            <strong>Cal.com</strong>: books fit calls and receives the details you enter when you book. (
            <a href="https://cal.com/privacy" className="link">privacy policy</a>, <a href="https://trust.cal.com/subprocessors" className="link">subprocessors</a>)
          </li>
          <li>
            <strong>Stripe</strong>: sends our invoices and takes payments. Card details go to Stripe, not to us. (
            <a href="https://stripe.com/privacy" className="link">privacy policy</a>, <a href="https://stripe.com/legal/dpa" className="link">DPA</a>)
          </li>
          <li>
            <strong>MXroute</strong>: hosts our email inbox ({site.email}). (<a href="https://mxroute.com/terms" className="link">terms</a>,{" "}
            <a href="https://docs.mxroute.com/docs/general/gdpr.html" className="link">GDPR statement</a>)
          </li>
          <li>
            <strong>Google Workspace</strong>: our work email for outreach, and where we keep client working files (only if you become a client). (
            <a href="https://cloud.google.com/terms/cloud-privacy-notice" className="link">Google Cloud privacy notice</a>,{" "}
            <a href="https://cloud.google.com/terms/data-processing-addendum" className="link">data processing addendum</a>)
          </li>
        </ul>
        <p>
          If you become a client, you will give us access to your Google Ads, HubSpot or other CRM, analytics and reporting
          accounts, usually read-only, or exports from them if you prefer. We use that access only to perform the work, and we
          remove our access when the engagement ends. We may also disclose data where the law requires it.
        </p>

        <h2 className={h}>International transfers</h2>
        <p>
          We work from South Africa and our company is based in the United States, and our providers
          process data in the United States and elsewhere. Where data about people in the UK or EEA is
          transferred to a country without an adequacy decision, we rely on safeguards such as the standard
          contractual clauses our providers offer.
        </p>

        <h2 className={h}>How long we keep it</h2>
        <p>
          Contact form requests and booking details that don&apos;t lead to an engagement are deleted within 24 months. Details of
          people we emailed about our service are deleted within 12 months of our last email, apart from do-not-contact entries. If you become a client we
          keep the work records for the length of the engagement and then for as long as tax and accounting
          rules require. Analytics data follows the retention settings of the analytics tool, and Clarity keeps
          recordings for up to 30 days. Google Analytics and Clarity data is not collected if you decline cookies. You can ask us to delete your data sooner.
        </p>

        <h2 className={h}>Your rights</h2>
        <p>
          Depending on where you live (including the UK, EEA, California and South Africa) you may have the
          right to access your data, correct it, delete it, restrict or object to its use, receive a copy in
          a portable format, withdraw consent, and not be discriminated against for using these rights.
          Email{" "}
          <a href={`mailto:${site.email}`} className="link">{site.email}</a> and we will
          respond within one month. You can also complain to your local data protection authority.
        </p>
        <p>We do not sell or share personal information for cross-context behavioural advertising as those terms are defined in California law.</p>

        <h2 className={h}>Security</h2>
        <p>
          The site is served over HTTPS. Access to the systems that hold your data is limited to the people
          who need it and protected by their own sign-in controls. No system is perfectly secure, and we
          will tell you and the relevant authority where the law requires us to if there is a breach that
          affects you.
        </p>

        <h2 className={h}>Changes to this policy</h2>
        <p>When we change this policy we will update the date at the top. If a change is significant we will make that clear on the site.</p>

        <p className="pt-8">
          <Link href="/" className="link">Back to {site.brand}</Link>
        </p>
      </div>
    </main>
      <Footer />
    </>
  );
}
