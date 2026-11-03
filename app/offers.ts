// One source of truth for every offer name, price and term. Home, /pricing, /signal-fix, /ops-desk, /fractional, the
// FAQs and the JSON-LD render from here, so a change is made once. The wording of record is /terms; keep the two in step.
export const offers = {
  check: { name: "Free check", price: "Free" },
  fix: { name: "Signal Fix", price: "$750", guaranteeDays: 30 },
  pilot: { name: "Ops Desk pilot", price: "$1,250" },
  ops: { name: "Ops Desk", price: "$2,500", per: "$2,500/month", hours: 10, noticeDays: 30 },
  audit: { name: "Pipeline Truth Audit", price: "$1,500", days: 10 },
  fractional: { name: "Fractional Measurement Lead", price: "$5,000", per: "$5,000/month", hours: 25, foundingPer: "$4,000/month", foundingClients: 2 },
  watch: { name: "Signal Watch", price: "$750", per: "$750/month", allowanceHours: 2 },
  foundingFix: { clients: 5 },
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
export const opsLine = `Up to ${offers.ops.hours} hours a month, one active request, weekly updates. Month to month after the pilot, with ${offers.ops.noticeDays} days' notice. Unused hours don't roll over. Larger projects are quoted separately before any work starts.`;

// Pipeline Truth Audit.
export const auditGuarantee = "If the audit finds nothing that changes how Google Ads counts or bids, we refund the fee in full.";
export const auditCredit = `If you continue to the ${offers.fractional.name} within 30 days of the audit report, the audit fee is credited against Fractional's first month. No credit applies to other offers.`;
export const fractionalTerm = "Cancel in the first 30 days and pay only that month. Otherwise the 3-month term applies, then 30 days' notice.";

// ---- Legacy exports: still used by pages not yet rewritten. Removed in the cleanup commit. ----
export const legacy = {
  watch: { name: "Signal Watch", price: "$750", per: "$750/month", allowanceHours: 2 },
  fractionalFounding: { per: "$4,000/month", clients: 2 },
  foundingFix: { clients: 5 },
};
export const fixScope = [
  "Clean up which conversion actions are Primary",
  "Fix the triggers",
  "Set up form-submit and booking events",
  "Capture click IDs and UTMs in HubSpot hidden fields",
  "Choose the bidding stage the account's volume can support",
  "Test and document",
];
export const fixDeliverables = "A before-and-after check you can rerun, and a change log with how to undo each change.";
export const watchChecks = [
  "Conversions arriving in Google Ads compared with HubSpot submissions",
  "The share of paid contacts with a stored click ID",
  "Changes to Primary conversion actions",
  "Form embeds that stopped firing",
];
export const watchTerms = `Weekly checks, a short monthly note and ${legacy.watch.allowanceHours} hours a month of fixes. Unused hours don't roll over, and larger work is quoted. Month to month.`;
export const foundingFixText = `The first ${legacy.foundingFix.clients} ${offers.fix.name} clients get their first month of ${legacy.watch.name} free, in exchange for a written case study.`;
export const foundingFractionalText = `Founding rate: ${legacy.fractionalFounding.per} for the first ${legacy.fractionalFounding.clients} clients, for 3 months, with a case study required.`;
export const foundingRule = `Founding offers don't combine with each other or with the audit credit. A client gets at most one free first month of ${legacy.watch.name}.`;
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
export const fixScopeLine = fixScope.map(lowerFirst).join("; ");
export const watchLine = watchChecks.map(lowerFirst).join("; ");
