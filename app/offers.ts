// One source of truth for every offer name, price and term. Home, /pricing, /for-b2b-saas, /terms, the FAQ and the
// JSON-LD render from here, so a change is made once. Legal wording of record is /terms; keep the two in step.
export const offers = {
  check: { name: "Free outside-in check", price: "Free" },
  fix: { name: "Signal Fix", price: "$750", guaranteeDays: 30 },
  watch: { name: "Signal Watch", price: "$750", per: "$750/month", allowanceHours: 2 },
  audit: { name: "Pipeline Truth Audit", price: "$1,500", days: 10 },
  fractional: { name: "Fractional Measurement Lead", price: "$5,000", per: "$5,000/month", hours: 25, foundingPer: "$4,000/month", foundingClients: 2 },
  foundingFix: { clients: 5 },
} as const;

export const fixScope = [
  "Clean up which conversion actions are Primary",
  "Fix the triggers",
  "Set up form-submit and booking events",
  "Capture click IDs and UTMs in HubSpot hidden fields",
  "Choose the bidding stage the account's volume can support",
  "Test and document",
];
export const fixDeliverables = "A before-and-after check you can rerun, and a change log with how to undo each change.";
export const fixGuarantee = `If, within ${offers.fix.guaranteeDays} days of handover, a conversion we set up doesn't fire as agreed in the written scope, we fix it at no charge. This doesn't cover changes made to the site, tag manager, forms or accounts after handover.`;

export const watchChecks = [
  "Conversions arriving in Google Ads compared with HubSpot submissions",
  "The share of paid contacts with a stored click ID",
  "Changes to Primary conversion actions",
  "Form embeds that stopped firing",
];
export const watchTerms = `Weekly checks, a short monthly note and ${offers.watch.allowanceHours} hours a month of fixes. Unused hours don't roll over, and larger work is quoted. Month to month.`;

export const checkOfferText = "We look at what your site sends to Google Ads from outside, with no access needed, and send you what we find.";
export const auditCredit = `The audit fee is credited in full against the first month of ${offers.fractional.name}. Against ${offers.watch.name}, the credit is ${offers.watch.price}, applied to the first month's fee. The remaining ${offers.watch.price} isn't carried forward.`;
export const foundingFixText = `The first ${offers.foundingFix.clients} ${offers.fix.name} clients get their first month of ${offers.watch.name} free, in exchange for a written case study.`;
export const foundingFractionalText = `Founding rate: ${offers.fractional.foundingPer} for the first ${offers.fractional.foundingClients} clients, for 3 months, with a case study required.`;
export const foundingRule = `Founding offers don't combine with each other or with the audit credit. A client gets at most one free first month of ${offers.watch.name}.`;
export const fractionalTerm = "Cancel in the first 30 days and pay only that month. Otherwise the 3-month term applies, then 30 days' notice.";

// Lists as running text: lower-case first letters only, so product names (Google Ads, HubSpot, Primary) keep their case.
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
export const fixScopeLine = fixScope.map(lowerFirst).join("; ");
export const watchLine = watchChecks.map(lowerFirst).join("; ");
