import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { Slot } from "../components/ph";
import { site } from "../site.config";
import { pageMetadata } from "../seo";
import { auditCredit, checkOfferText, fixDeliverablesList, fixExamples, fixGuarantee, offers } from "../offers";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: `Terms for ${site.brand} work: the free check, Signal Fix, Ops Desk, the audit and Fractional. Prices, scope, refunds, access and liability.`,
  path: "/terms",
});

const h2 = "pt-8 text-title-s scroll-mt-24";
const list = "list-disc space-y-2 pl-6";
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function C({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium">{n}</span> {children}
    </p>
  );
}

export default function Terms() {
  return (
    <>
      <Header path="/terms" />
      <main id="main" tabIndex={-1} className="container-site pb-20 pt-12 sm:pt-16">
        <article className="max-w-[64ch] space-y-5 text-text-l">
          <h1 className="text-title-l">Terms of service</h1>
          <p className="text-body">
            Last updated <Slot value={site.termsLastUpdated} />
          </p>

          <h2 id="clause-1" className={h2}>1. Who we are</h2>
          <C n="1.1">
            &quot;We&quot; and &quot;us&quot; means {site.legalEntity}, trading as {site.brand}. &quot;You&quot; means the business that buys from us.
          </C>
          <C n="1.2">These terms apply to the free check, Signal Fix, Ops Desk, the Pipeline Truth Audit and the Fractional Measurement Lead. They also apply to any extra work we quote in writing. A written scope sets out which of these you are buying.</C>

          <h2 id="clause-2" className={h2}>2. Prices and payment</h2>
          <C n="2.1">All prices are in US dollars and paid through Stripe.</C>
          <C n="2.2">
            Free check, free. {offers.fix.name}, {offers.fix.price} for one defined defect (clause 5.6). {offers.pilot.name}, {offers.pilot.price} (clause 5.8). {offers.ops.name}, {offers.ops.per} (clause 5.9). For larger accounts: {offers.audit.name}, {offers.audit.price}. {offers.fractional.name}, {offers.fractional.per} for 25 hours, with a 3-month initial term that either side can end in writing during the first 30 days (clause 5.4).
          </C>
          <C n="2.3">Prices are fixed for the scope in writing. We never charge a percentage of ad spend. Anything outside the written scope is quoted before any work starts. Your written scope sets out when each invoice is due.</C>
          <C n="2.4">{auditCredit}</C>

          <h2 id="clause-3" className={h2}>3. What the Pipeline Truth Audit includes</h2>
          <C n="3.1">10 core checks across your Google Ads, HubSpot (or other CRM) and reporting, delivered within 10 business days of receiving the read-only access we need.</C>
          <C n="3.2">A baseline of the last 90 days, a one-page scorecard, a 90-day roadmap, and the findings, each with its evidence and the steps to reproduce it.</C>
          <C n="3.3">The audit uses read-only access. We don&apos;t change anything in your accounts as part of the audit.</C>
          <C n="3.4">
            <strong className="font-medium">Not included in any engagement:</strong> media buying, creative, content or web development, CRM migration, a new dashboard, a full-time hire, and a percentage of ad spend.
          </C>
          <C n="3.5">
            <strong className="font-medium">Audit report.</strong> We deliver the audit report in writing. For each finding it shows the evidence, the steps to reproduce it, and whether the finding changes how Google Ads counts or bids (clause 3.6).
          </C>
          <C n="3.6">
            <strong className="font-medium">Audit guarantee.</strong> If the audit finds nothing that changes how Google Ads counts or bids, we refund the fee in full (clause 4.1). A finding changes how Google Ads counts or bids if it passes all three tests in (a) to (c).
          </C>
          <div className="space-y-3 pl-6">
            <p>
              <strong className="font-medium">(a) Evidence.</strong> We show it with evidence from your accounts that you can check yourself: the setting, the report with its filters and date range, or the record count, plus the steps to reproduce it. It must reproduce on the day we deliver the report.
            </p>
            <p>
              <strong className="font-medium">(b) Effect.</strong> It does at least one of these:
            </p>
            <div className="space-y-3 pl-6">
              <p>
                (i) A conversion action that is Primary, or used for bidding, counts something that isn&apos;t a new lead or a pipeline stage, or counts the same lead more than once.
              </p>
              <p>
                (ii) A conversion that you told us in writing at kickoff you want Google Ads to bid on, such as a form submit, a booking or a pipeline stage, doesn&apos;t reach Google Ads.
              </p>
              <p>
                (iii) The click ID or source that ties a lead to its ad is missing or wrong in your CRM, so the lead can&apos;t be matched to the ad.
              </p>
              <p>
                (iv) Contact data is sent to Google without the consent signal or consent property that your own privacy notice or consent settings say is required.
              </p>
            </div>
            <p>
              <strong className="font-medium">(c) Separate cause.</strong> It has its own root cause. Several findings that share one root cause count as one finding.
            </p>
            <p>
              <strong className="font-medium">Not counted:</strong> a best-practice suggestion that doesn&apos;t pass (b); a problem you told us about in writing before kickoff, naming its cause; a problem caused by a change made in your accounts after we receive access; and anything outside Google Ads, your CRM and your reporting. If access we asked for in writing isn&apos;t given, the checks it affects are reported as not run and count neither way.
            </p>
            <p>
              <strong className="font-medium">Checking a finding.</strong> If the report lists a finding that you think doesn&apos;t pass these tests, email us within 7 days of the report, naming the finding and the test. Within 3 business days we re-run the steps in (a) with you, on a call or in writing. If the finding doesn&apos;t reproduce, or doesn&apos;t pass (b) or (c), it doesn&apos;t count. If that leaves no finding that passes, we refund under clause 4.1. Only the documented steps decide a challenge, not a view on how important a finding is.
            </p>
          </div>

          <h2 id="clause-4" className={h2}>4. Audit refund</h2>
          <C n="4.1">If the audit report has no finding that passes the tests in clause 3.6, we refund the full {offers.audit.price} within 14 days of delivering the report. If you challenge a finding under clause 3.6, we pay the refund within 14 days of the day the challenge is settled. You keep the report and the roadmap. You don&apos;t need to ask for the refund.</C>
          <C n="4.2">If you don&apos;t continue after the audit, there is no lock-in.</C>

          <h2 id="clause-5" className={h2}>5. Signal Fix, Ops Desk and Fractional Measurement Lead</h2>
          <C n="5.1">Fractional Measurement Lead covers 25 hours a month. Month 1 is the audit, definitions and roadmap. Months 2 and 3 are the monthly scorecard, fixes and a 60-minute review. Either side can end it in writing during the first 30 days (clause 5.4).</C>
          <C n="5.2">Any change we make to your accounts is agreed with you first.</C>
          <C n="5.3">The Fractional Measurement Lead has an initial term of 3 months, subject to the 30-day exit in clause 5.4. After that, it runs month to month until either of us gives 30 days&apos; written notice.</C>
          <C n="5.4">Fractional: either side can end it in writing during the first 30 days, and you pay only for that first month. This overrides the 3-month initial term in clause 5.3.</C>
          <C n="5.5">We don&apos;t guarantee ad performance, pipeline or revenue. We promise a defensible number and a documented method, not perfect attribution.</C>
          <C n="5.6">
            Signal Fix is {offers.fix.price} for one defined defect, named in the written scope. For example: {fixExamples.map(lowerFirst).join("; ")}. We deliver: {fixDeliverablesList.map(lowerFirst).join("; ")}. If we find more than one problem, we quote each extra fix before doing any work. When the work is done, we confirm in writing that our access has been removed.
          </C>
          <C n="5.7">{fixGuarantee} The remedy is the free fix. It is not a refund.</C>
          <C n="5.8">The Ops Desk pilot is {offers.pilot.price} for one defined request, named in the written scope. We scope, build, test and document it. The pilot ends when we hand the request over. Any further work needs a new written scope or the Ops Desk plan.</C>
          <C n="5.9">
            Ops Desk is {offers.ops.per}. It covers up to {offers.ops.hours} hours of work a month on one active request at a time, with a weekly update showing what is done, what is next and the hours used. After the pilot it is month to month, and either of us can end it with {offers.ops.noticeDays} days&apos; written notice. Unused hours don&apos;t roll over. Larger projects are quoted separately before any work starts. Ops Desk doesn&apos;t include media buying, creative or content, running outbound campaigns or booking meetings for you, large CRM migrations, or any guarantee of a pipeline number. Matt and Jennifer do the work, and we don&apos;t subcontract it without your written approval.
          </C>
          <C n="5.10">{checkOfferText} It is free, creates no obligation to buy, and doesn&apos;t promise that we will find every problem.</C>
          <C n="5.11">We don&apos;t publicize the work without your written consent. We may ask any client for a case study. It only goes ahead with your written approval of the wording.</C>

          <h2 id="clause-6" className={h2}>6. Refunds</h2>
          <C n="6.1">Once work starts, fees for it are non-refundable, except for the audit refund in clause 4.1 and as set out in your written scope.</C>
          <C n="6.2">There are no refunds for part months on a monthly engagement.</C>

          <h2 id="clause-7" className={h2}>7. Your responsibilities</h2>
          <C n="7.1">You&apos;re responsible for having a lawful basis, consent and privacy notices for the contact data that is synced to Google.</C>
          <C n="7.2">
            You keep the access we need in place while the work is under way. Delays caused by missing access or late approvals pause the delivery clock. If the access we need is still missing 30 days after kickoff, either of us can end the work by email, and we invoice for the work done to that point.
          </C>

          <h2 id="clause-8" className={h2}>8. Access and data</h2>
          <C n="8.1">We ask only for the access the work needs, read-only where we can, through named user invites. We never use shared passwords, and our accounts use two-step login.</C>
          <C n="8.2">You can revoke our access at any time. We remove our access when the engagement ends, and we confirm in writing that we have.</C>
          <C n="8.3">We don&apos;t export or copy contact records from your accounts. We can work from exports you give us. Screenshots blur personal data.</C>
          <C n="8.4">We delete working files within 30 days of the work ending.</C>
          <C n="8.5">For personal data in your accounts, we act only on your instructions, as a processor.</C>
          <C n="8.6">
            <strong className="font-medium">Data processing terms.</strong> When we process personal data for you under these terms, this clause is our data processing agreement, including for article 28 of the UK GDPR and the EU GDPR.
          </C>
          <div className="space-y-3 pl-6">
            <p>
              <strong className="font-medium">(a) Subject matter and duration:</strong> the work in these terms, for as long as we have access to your accounts, plus the 30 days in clause 8.4.
            </p>
            <p>
              <strong className="font-medium">(b) Nature and purpose:</strong> reviewing your Google Ads, HubSpot or other CRM, analytics and reporting setup, testing conversions, and the work set out in your written scope, including audit reports, scorecards and roadmaps. We don&apos;t record calls with you unless you agree in writing beforehand.
            </p>
            <p>
              <strong className="font-medium">(c) Types of personal data:</strong> contact and lead data in your accounts that we see while doing the work, such as names, work email addresses, lifecycle stages, form submissions and click IDs, and the names and email addresses of your account users. We don&apos;t export or copy contact records from your accounts (clause 8.3).
            </p>
            <p>
              <strong className="font-medium">(d) Data subjects:</strong> your contacts and leads, and the users of your accounts.
            </p>
            <p>
              <strong className="font-medium">(e) Instructions:</strong> we process personal data only on your documented instructions. Those are these terms, your written scope, and your written instructions by email. We&apos;ll tell you if we think an instruction breaks data protection law.
            </p>
            <p>
              <strong className="font-medium">(f) Confidentiality:</strong> anyone who works on your accounts is bound by confidentiality.
            </p>
            <p>
              <strong className="font-medium">(g) Security:</strong> we keep the measures in clauses 8.1 to 8.4: named user invites, two-step login, only the access the work needs, no exports from your accounts, blurred screenshots, and deletion of working files within 30 days of the work ending.
            </p>
            <p>
              <strong className="font-medium">(h) Sub-processors:</strong>
            </p>
            <ul className={list}>
              <li>You authorize us to use the providers listed in our <Link href="/privacy" className="link">privacy policy</Link> as sub-processors.</li>
              <li>We keep working files, including screenshots and any call recording you agreed to, only in accounts that {site.legalName} holds with those providers.</li>
              <li>We&apos;ll email you at least 14 days before we add or replace a sub-processor. You can object in that time.</li>
              <li>If we can&apos;t resolve your objection, you can end the work, and we&apos;ll refund fees for work we haven&apos;t done.</li>
            </ul>
            <p>
              <strong className="font-medium">(i) Assistance:</strong> as far as we reasonably can, we help you answer requests from people using their data protection rights. We also help with security, breach notifications, impact assessments and consultations with regulators.
            </p>
            <p>
              <strong className="font-medium">(j) Breaches:</strong> we tell you without undue delay after we become aware of a personal data breach affecting your data.
            </p>
            <p>
              <strong className="font-medium">(k) End of the work:</strong> we delete your personal data as set out in clause 8.4, unless the law requires us to keep it. We&apos;ll confirm the deletion if you ask.
            </p>
            <p>
              <strong className="font-medium">(l) Audits:</strong> we give you the information you need to show compliance with this clause. We also allow audits by you, or by an auditor you appoint, on reasonable notice and at your cost, no more than once a year unless a regulator requires it.
            </p>
            <p>
              <strong className="font-medium">(m) International transfers:</strong>
            </p>
            <ul className={list}>
              <li>We work from South Africa, and our company is in the United States.</li>
              <li>
                Where data protection law requires a safeguard for a transfer, these apply and form part of these terms:
                <ul className="mt-2 list-[circle] space-y-2 pl-6">
                  <li>the EU standard contractual clauses (Commission Implementing Decision (EU) 2021/914, module two, controller to processor);</li>
                  <li>for UK data, the UK International Data Transfer Addendum.</li>
                </ul>
              </li>
              <li>The details those clauses need are in (a) to (d), and the security measures are in (g).</li>
            </ul>
            <p>
              <strong className="font-medium">(n) Signed copy:</strong> if you need a signed copy of these data processing terms, ask before kickoff and we&apos;ll sign one.
            </p>
          </div>

          <h2 id="clause-9" className={h2}>9. Liability</h2>
          <C n="9.1">Our total liability is capped. For an audit, a Signal Fix or an Ops Desk pilot, the cap is the fees you paid for it. For a monthly engagement, it&apos;s the fees you paid in the last 3 months.</C>
          <C n="9.2">We&apos;re not liable for ad spend, bidding results, lost revenue, or any indirect or consequential loss.</C>
          <C n="9.3">We don&apos;t guarantee ad performance, and bidding decisions are Google&apos;s.</C>
          <C n="9.4">Google and HubSpot change their products, features and documentation, and that&apos;s outside our control.</C>

          <h2 id="clause-10" className={h2}>10. Governing law and venue</h2>
          {site.governingLaw.map((t, i) => (
            <C key={i} n={`10.${i + 1}`}>
              {t}
            </C>
          ))}

          <h2 id="clause-11" className={h2}>11. Changes to these terms</h2>
          <C n="11.1">We may update these terms. We&apos;ll publish the new version on this page with a new &quot;last updated&quot; date.</C>
          <C n="11.2">An audit, a Signal Fix or an Ops Desk pilot stays under the version in force when you agreed its written scope.</C>
          <C n="11.3">
            For a monthly engagement, we&apos;ll email you at least 30 days before a change applies to you. If you don&apos;t accept a change, you can cancel by email before it takes effect. For the Fractional Measurement Lead, a change doesn&apos;t apply during your 3-month initial term unless the law, or a change that Google or HubSpot makes, requires it. If you cancel the Fractional Measurement Lead because of a change, you won&apos;t need to give the 30-day notice in clause 5.3, and if the change applies during your 3-month initial term, you won&apos;t pay for the rest of it. Ops Desk can be ended with 30 days&apos; written notice under clause 5.9.
          </C>

          <h2 id="contact" className={h2}>Contact</h2>
          <p>
            <a href={`mailto:${site.email}`} className="link">{site.email}</a>
          </p>

          <p className="pt-8">
            <Link href="/" className="link">Back to {site.brand}</Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
