// One source of truth for every offer name, price and term. Home, /pricing, /signal-fix, /ops-desk, /fractional, the
// FAQs and the JSON-LD render from here, so a change is made once. The wording of record is /terms; keep the two in step.
export const offers = {
  check: { name: "Free check", price: "Free" },
  fix: { name: "Signal Fix", price: "$750", guaranteeDays: 30 },
  pilot: { name: "Ops Desk pilot", price: "$1,250" },
  ops: { name: "Ops Desk", price: "$2,500", per: "$2,500/month", hours: 10, noticeDays: 30 },
  audit: { name: "Pipeline Truth Audit", price: "$1,500", days: 10 },
  fractional: { name: "Fractional Measurement Lead", price: "$5,000", per: "$5,000/month", hours: 25 },
} as const;

export const replyTime = "within 1 business day";
export const checkConfirmation = "Thanks. We'll reply within 1 business day.";

export const checkOfferText = "We look at what your site sends to Google Ads from outside, with no logins, and send you the evidence and steps you can check yourself.";

// Signal Fix: one defined defect.
export const fixExamples = [
  "A page view or link click counted as a Primary conversion",
  "Form submissions or bookings that don't reach Google Ads",
  "Click IDs or UTMs that aren't stored on the HubSpot contact",
  "A conversion firing twice, or on the wrong page",
];
export const fixDeliverablesList = [
  "A written scope you approve before we start",
  "The fix, made with the least access the job needs",
  "A before-and-after check your team can rerun",
  "A change log showing how to undo every change",
];
export const fixGuarantee = `If, within ${offers.fix.guaranteeDays} days of handover, a conversion we set up doesn't fire as agreed in the written scope, we fix it at no charge. This doesn't cover changes made to your site, tag manager, forms or accounts after handover.`;
export const fixExtra = "If we find more than one problem, we quote each extra fix before doing any work.";

// Ops Desk.
export const opsPilotLine = `One defined request, scoped, built, tested and documented. ${offers.pilot.price}.`;
export const opsLine = "Unused hours don't roll over. Larger projects are quoted separately before any work starts.";

// Pipeline Truth Audit.
export const auditGuarantee = "If the audit finds nothing that changes how Google Ads counts, bids on or attributes your leads, we refund the fee in full.";
export const auditCredit = `If you continue to the ${offers.fractional.name} within 30 days of the audit report, the audit fee is credited against Fractional's first month. No credit applies to other offers.`;
export const fractionalTerm = "Cancel in the first 30 days and pay only that month. Otherwise the 3-month term applies, then 30 days' notice.";
