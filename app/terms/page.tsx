import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { Slot } from "../components/ph";
import { site } from "../site.config";
import { pageMetadata } from "../seo";

// PE switch (app/flags.ts). While site.showPE is false, clause 6 (PE portfolio measurement) and the PE price in 2.3 are
// left out, and the numbers after them close up: cl() renumbers clauses 7 to 13, s2() renumbers 2.4 to 2.6, and every
// cross-reference below uses them, so the numbering stays right either way.
// The partner white-label offer (old 2.4 and old clause 10) was removed on 27 Oct 2026. Both helpers skip those numbers,
// so the clauses after them close up too. Its publicity and case-study promises moved to 5.7 for every client (redline of
// 27 Oct 2026, which also added 3.5 and 3.6). Sections 3 to 5 aren't renumbered, so "clause 3.x/4.1/5.x" text is fixed.
const pe = site.showPE;
const cl = (k: number) => (pe || k < 6 ? k : k - 1) - (k > 10 ? 1 : 0);
const s2 = (k: number) => (pe || k < 3 ? k : k - 1) - (k > 4 ? 1 : 0);

export const metadata = pageMetadata({
  title: "Terms of service",
  description: `Terms for ${site.brand} measurement work: the Pipeline Truth Audit, the Measurement Scorecard${pe ? ", the Fractional Measurement Lead and PE portfolio measurement" : " and the Fractional Measurement Lead"}. Prices, scope, refunds, access and liability.`,
  path: "/terms",
});

const h2 = "pt-8 text-title-s scroll-mt-24";
const list = "list-disc space-y-2 pl-6";

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
            &quot;We&quot; and &quot;us&quot; means {site.legalEntity}, trading as {site.brand}. &quot;You&quot; means the business that buys from us.{pe ? " That can be a B2B SaaS company or a private equity fund." : ""}
          </C>
          <C n="1.2">These terms apply to the Pipeline Truth Audit, the Measurement Scorecard{pe ? ", the Fractional Measurement Lead and PE portfolio measurement (pilot, rollout, retainer and advisory)" : " and the Fractional Measurement Lead"}. They also apply to any extra work we quote in writing. A written scope sets out which of these you are buying.</C>

          <h2 id="clause-2" className={h2}>2. Prices and payment</h2>
          <C n="2.1">All prices are in US dollars and paid through Stripe.</C>
          <C n="2.2">
            <strong className="font-medium">B2B SaaS:</strong> Pipeline Truth Audit, $1,500. Measurement Scorecard, $1,500 a month, month to month, with no minimum term and no notice period (clause 5.6). Fractional Measurement Lead, $5,000 a month for 25 hours, with a 3-month initial term that either side can end in writing during the first 30 days (clause 5.4). Founding-client rate, $4,000 a month for 3 months, for the first 2 clients, with a case study required and the same 30-day exit.
          </C>
          {pe && (
            <C n="2.3">
              <strong className="font-medium">PE funds:</strong> Portfolio Measurement Pilot, $10k–$15k for one portfolio company. Portfolio Rollout, $40k–$75k for 4–6 portfolio companies. Measurement Retainer, $5k–$7.5k per portfolio company per month. PE Advisory, $3k–$5k per month. The exact fee is in your written scope.
            </C>
          )}
          <C n={`2.${s2(5)}`}>Prices are fixed for the scope in writing. We never charge a percentage of ad spend. Anything outside the written scope is quoted before any work starts. Your written scope sets out when each invoice is due.</C>
          <C n={`2.${s2(6)}`}>If you continue from the Pipeline Truth Audit to the Fractional Measurement Lead, we credit the audit fee against the first month.</C>

          <h2 id="clause-3" className={h2}>3. What the Pipeline Truth Audit includes</h2>
          <C n="3.1">20 checks across your Google Ads, HubSpot (or other CRM) and reporting, delivered within 10 business days of receiving the read-only access we need.</C>
          <C n="3.2">A baseline of the last 90 days, a one-page scorecard, a 90-day roadmap, and the material issues we find, with the top three ranked by revenue impact.</C>
          <C n="3.3">The audit uses read-only access. We don&apos;t change anything in your accounts as part of the audit.</C>
          <C n="3.4">
            <strong className="font-medium">Not included in any engagement:</strong> media buying, creative, content or web development, CRM migration, a new dashboard, a full-time hire, and a percentage of ad spend.
          </C>
          <C n="3.5">
            <strong className="font-medium">Audit readout.</strong> The audit readout is the video call where we take you through the written audit report. We offer you a readout time within 5 business days of delivering the report. If the readout hasn&apos;t taken place within 10 business days of delivery for a reason on your side, the 10th business day after delivery counts as the date of the audit readout.
          </C>
          <C n="3.6">
            <strong className="font-medium">Material issue.</strong> A material issue is a problem we find in your Google Ads, HubSpot (or other CRM) or reporting that passes all three tests in (a) to (c). In the audit report we mark every finding as material or not material and, for each material one, name the test in (b) that it passes.
          </C>
          <div className="space-y-3 pl-6">
            <p>
              <strong className="font-medium">(a) Evidence.</strong> We show it with evidence from your accounts that you can check yourself: the setting, the report with its filters and date range, or the record count, plus the steps to reproduce it. It must reproduce on the day we deliver the report.
            </p>
            <p>
              <strong className="font-medium">(b) Impact.</strong> Measured over the 90-day baseline period (the last 90 full days before kickoff), it does at least one of these:
            </p>
            <div className="space-y-3 pl-6">
              <p>
                (i) <strong className="font-medium">Reported number.</strong> It changes a lead, opportunity, pipeline or revenue number, or a rate built from them, that appears in the board or leadership reporting you gave us at kickoff, by at least 10% of the reported value. For a count, the change must also be at least 5 records.
              </p>
              <p>
                (ii) <strong className="font-medium">Bidding signal.</strong> In a Google Ads account that uses automated bidding, Primary conversion actions count things that aren&apos;t new leads or pipeline stages, or count the same lead more than once, and those conversions make up at least 10% of the account&apos;s conversions in the &quot;Conversions&quot; column.
              </p>
              <p>
                (iii) <strong className="font-medium">Missing pipeline signal.</strong> A lifecycle or deal stage that you told us in writing at kickoff you want Google Ads to optimise towards recorded no conversions in Google Ads for at least 28 days in a row during the baseline period.
              </p>
              <p>
                (iv) <strong className="font-medium">Lost source.</strong> At least 10% of new contacts from paid search in the baseline period (identified by click ID, UTM parameters or ad landing page) have no stored click ID, or have the wrong original source, in your CRM.
              </p>
              <p>
                (v) <strong className="font-medium">Consent.</strong> Contact data is sent to Google without the consent signal or consent property that your own privacy notice or consent settings say is required.
              </p>
            </div>
            <p>
              <strong className="font-medium">(c) Separate cause.</strong> It has its own root cause. Several findings that share one root cause count as one material issue.
            </p>
            <p>
              <strong className="font-medium">Not material:</strong> a best-practice suggestion that doesn&apos;t pass (b); a problem you told us about in writing before kickoff, naming its cause; a problem caused by a change made in your accounts after we receive access; and anything outside the systems in clause 3.1. If access we asked for in writing isn&apos;t given, the checks it affects are reported as not run and count neither way.
            </p>
            <p>
              <strong className="font-medium">Counting and checking.</strong> The report states how many material issues we found. We can&apos;t add findings or change a finding&apos;s status after we deliver the report. If the count is fewer than three, we refund under clause 4.1 without you needing to ask. If you think a finding we marked material doesn&apos;t pass these tests, email us within 7 days of the audit readout (clause 3.5), naming the finding and the test. Within 3 business days we re-run the steps in (a) with you, on a call or in writing. If the finding doesn&apos;t reproduce, or its numbers don&apos;t meet the threshold in (b), it doesn&apos;t count. If that leaves fewer than three, we refund within the 14 days in clause 4.1. Only the documented steps and the numbers decide a challenge, not a view on how important a finding is.
            </p>
          </div>

          <h2 id="clause-4" className={h2}>4. If the audit doesn&apos;t find three material issues</h2>
          <C n="4.1">If the audit doesn&apos;t find at least three material issues (clause 3.6), we refund the full $1,500 within 14 days of the audit readout (clause 3.5). You keep the report, the baseline and the roadmap. You don&apos;t need to ask for the refund, and a refund that follows a challenge under clause 3.6 is paid within the same 14 days.</C>
          <C n="4.2">If you don&apos;t continue after the audit, there is no lock-in.</C>

          <h2 id="clause-5" className={h2}>5. Fractional Measurement Lead and Measurement Scorecard</h2>
          <C n="5.1">Fractional Measurement Lead covers 25 hours a month. Month 1 is the audit, definitions and roadmap. Months 2 and 3 are the monthly scorecard, fixes and a 60-minute review. Either side can end it in writing during the first 30 days (clause 5.4).</C>
          <C n="5.2">Any change we make to your accounts is agreed with you first.</C>
          <C n="5.3">The Fractional Measurement Lead has an initial term of 3 months, subject to the 30-day exit in clause 5.4. After that, it runs month to month until either of us gives 30 days&apos; written notice. This clause doesn&apos;t apply to the Measurement Scorecard.</C>
          <C n="5.4">Fractional: either side can end it in writing during the first 30 days, and you pay only for that first month. This overrides the 3-month initial term in clause 5.3.</C>
          <C n="5.5">We don&apos;t guarantee ad performance, pipeline or revenue. We promise a defensible number and a documented method, not perfect attribution.</C>
          <C n="5.6">The Measurement Scorecard is $1,500 a month, month to month. It covers a monthly reconciliation of your pipeline and revenue numbers across your CRM, ads and finance, plus a one-page scorecard showing what moved and what doesn&apos;t agree. It includes no fix hours: fixes are quoted separately or covered by Fractional. It has no minimum term and no notice period. Either of us can cancel it by email at any time. To stop the next monthly charge, a cancellation must reach us before your next billing date. The Scorecard then ends at the end of the month you&apos;ve already paid for. Clause 5.3 doesn&apos;t apply to it.</C>
          <C n="5.7">We don&apos;t publicise the work without your written consent. A case study only applies where we agree it in writing, for example under the founding-client rate, and it uses wording you approve.</C>

          {pe && (
            <>
              <h2 id="clause-6" className={h2}>6. PE portfolio measurement</h2>
              <C n="6.1">A Portfolio Measurement Pilot covers one portfolio company over about 3 weeks: KPI dictionary, 20-point audit, baseline, 90-day roadmap and a one-page scorecard.</C>
              <C n="6.2">A Portfolio Rollout covers 4–6 portfolio companies over 8–12 weeks, with one standard, one scorecard and one fund-level roll-up. A Measurement Retainer covers the monthly scorecard, variance review, fix list and a quarterly portfolio roll-up.</C>
              <C n="6.3">We work alongside the fund&apos;s CRM or RevOps partner. We don&apos;t implement CRMs or migrate them. The partner owns the data model, the migration and the workflows. We own the measurement layer: the KPI dictionary, the audit, the benchmark and the scorecard.</C>
              <C n="6.4">Other work is quoted separately under clause {`2.${s2(5)}`}.</C>
            </>
          )}

          <h2 id={`clause-${cl(7)}`} className={h2}>{cl(7)}. Refunds</h2>
          <C n={`${cl(7)}.1`}>Once work starts, fees for it are non-refundable, except for the audit refund in clause 4.1 and as set out in your written scope.</C>
          <C n={`${cl(7)}.2`}>There are no refunds for part months on a monthly engagement.</C>

          <h2 id={`clause-${cl(8)}`} className={h2}>{cl(8)}. Your responsibilities</h2>
          <C n={`${cl(8)}.1`}>You&apos;re responsible for having a lawful basis, consent and privacy notices for the contact data that is synced to Google.</C>
          <C n={`${cl(8)}.2`}>
            You keep the access we need in place while the work is under way. Delays caused by missing access or late approvals pause the delivery clock. If the access we need is still missing 30 days after kickoff, either of us can end the work by email, and we invoice for the work done to that point.
          </C>

          <h2 id={`clause-${cl(9)}`} className={h2}>{cl(9)}. Access and data</h2>
          <C n={`${cl(9)}.1`}>We ask only for the access the work needs, read-only where we can, through named user invites. We never use shared passwords, and our accounts use two-step login.</C>
          <C n={`${cl(9)}.2`}>You can revoke our access at any time. We remove our access when the engagement ends.</C>
          <C n={`${cl(9)}.3`}>We don&apos;t export or copy contact records from your accounts. We can work from exports you give us. Screenshots blur personal data.</C>
          <C n={`${cl(9)}.4`}>We delete working files within 30 days of the work ending.</C>
          <C n={`${cl(9)}.5`}>For personal data in your accounts, we act only on your instructions, as a processor.</C>
          <C n={`${cl(9)}.6`}>
            <strong className="font-medium">Data processing terms.</strong> When we process personal data for you under these terms, this clause is our data processing agreement, including for article 28 of the UK GDPR and the EU GDPR.
          </C>
          <div className="space-y-3 pl-6">
            <p>
              <strong className="font-medium">(a) Subject matter and duration:</strong> the work in these terms, for as long as we have access to your accounts, plus the 30 days in clause {cl(9)}.4.
            </p>
            <p>
              <strong className="font-medium">(b) Nature and purpose:</strong> reviewing your Google Ads, HubSpot or other CRM, analytics and reporting setup, testing conversions, and preparing the audit report, scorecards and roadmap. We don&apos;t record calls with you unless you agree in writing beforehand.
            </p>
            <p>
              <strong className="font-medium">(c) Types of personal data:</strong> contact and lead data in your accounts that we see while doing the work, such as names, work email addresses, lifecycle stages, form submissions and click IDs, and the names and email addresses of your account users. We don&apos;t export or copy contact records from your accounts (clause {cl(9)}.3).
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
              <strong className="font-medium">(g) Security:</strong> we keep the measures in clauses {cl(9)}.1 to {cl(9)}.4: named user invites, two-step login, only the access the work needs, no exports from your accounts, blurred screenshots, and deletion of working files within 30 days of the work ending.
            </p>
            <p>
              <strong className="font-medium">(h) Sub-processors:</strong>
            </p>
            <ul className={list}>
              <li>You authorise us to use the providers listed in our <Link href="/privacy" className="link">privacy policy</Link> as sub-processors.</li>
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
              <strong className="font-medium">(k) End of the work:</strong> we delete your personal data as set out in clause {cl(9)}.4, unless the law requires us to keep it. We&apos;ll confirm the deletion if you ask.
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

          <h2 id={`clause-${cl(11)}`} className={h2}>{cl(11)}. Liability</h2>
          <C n={`${cl(11)}.1`}>Our total liability is capped. For {pe ? "an audit, pilot or rollout" : "an audit"}, the cap is the fees you paid for it. For a monthly engagement, it&apos;s the fees you paid in the last 3 months.</C>
          <C n={`${cl(11)}.2`}>We&apos;re not liable for ad spend, bidding results, lost revenue, or any indirect or consequential loss.</C>
          <C n={`${cl(11)}.3`}>We don&apos;t guarantee ad performance, and bidding decisions are Google&apos;s.</C>
          <C n={`${cl(11)}.4`}>Google and HubSpot change their products, features and documentation, and that&apos;s outside our control.</C>

          <h2 id={`clause-${cl(12)}`} className={h2}>{cl(12)}. Governing law and venue</h2>
          {site.governingLaw.map((t, i) => (
            <C key={i} n={`${cl(12)}.${i + 1}`}>
              {t}
            </C>
          ))}

          <h2 id={`clause-${cl(13)}`} className={h2}>{cl(13)}. Changes to these terms</h2>
          <C n={`${cl(13)}.1`}>We may update these terms. We&apos;ll publish the new version on this page with a new &quot;last updated&quot; date.</C>
          <C n={`${cl(13)}.2`}>{pe ? "An audit, pilot or rollout" : "An audit"} stays under the version in force when you agreed its written scope.</C>
          <C n={`${cl(13)}.3`}>
            For a monthly engagement, we&apos;ll email you at least 30 days before a change applies to you. If you don&apos;t accept a change, you can cancel by email before it takes effect. For the Fractional Measurement Lead, a change doesn&apos;t apply during your 3-month initial term unless the law, or a change that Google or HubSpot makes, requires it. If you cancel the Fractional Measurement Lead because of a change, you won&apos;t need to give the 30-day notice in clause 5.3, and if the change applies during your 3-month initial term, you won&apos;t pay for the rest of it. The Measurement Scorecard can be cancelled at any time under clause 5.6.
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
