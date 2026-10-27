// The two guarantee FAQs from the terms redline of 27 Oct 2026 (change 1e). Shared by home, /for-b2b-saas and /pricing,
// in the visible FAQ and the FAQPage JSON-LD, so the schema matches the visible text word for word. The full test is
// terms clause 3.6 and the readout is clause 3.5: if those clause numbers change, update the first answer.
export const guaranteeFaqs: { q: string; a: string }[] = [
  {
    q: "What counts as a material issue?",
    a: "A problem in your Google Ads, CRM or reporting that we show with evidence you can check, that has its own cause, and that does one of five things over the last 90 days: moves a number in your board reporting by at least 10%, makes 10% or more of your Google Ads conversions count something that isn’t a new lead, stops a pipeline stage you want to bid on reaching Google Ads for 28 days or more, loses the source of at least 10% of your paid search contacts, or sends contact data to Google without the consent your own policy requires. The full test is in clause 3.6 of our terms. The readout is the video call where we take you through the audit report.",
  },
  {
    q: "What if we disagree with a finding?",
    a: "Email us within 7 days of the readout, naming the finding and the test you think it fails. Within 3 business days we re-run the steps with you. If that leaves fewer than three material issues, we refund the full $1,500 within the same 14 days of the readout.",
  },
];
