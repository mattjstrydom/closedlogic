// The 20 checks of the Pipeline Truth Audit, in the order the copy deck lists them. One source for /method.
export const checkItems: string[] = [
  "Tracking and conversion actions",
  "GCLID coverage",
  "Enhanced conversions",
  "Lifecycle stages",
  "Lead scoring",
  "Routing",
  "Deal stages",
  "Source data",
  "Consent",
  "CRM handoff",
  "Reporting reconciliation",
  "Dashboard definitions",
  "Data quality",
  "Integration health",
  "UTM discipline",
  "Offline conversions",
  "Attribution model",
  "Funnel conversion rates",
  "Pipeline velocity",
  "Data retention",
];

// The 10 metrics of the Measurement Standard: metric and the question it answers.
export const metricItems: [string, string][] = [
  ["CAC", "What does it cost to acquire a customer?"],
  ["CAC payback", "How long until the customer pays back?"],
  ["Marketing-sourced pipeline contribution", "How much pipeline did marketing create?"],
  ["Pipeline velocity", "How fast does pipeline move?"],
  ["MQL → SQL conversion", "Where does the handoff break?"],
  ["Win rate", "Are we closing the right deals?"],
  ["Sales-cycle length", "Is the cycle getting longer?"],
  ["Net revenue retention", "Does the base grow without new customers?"],
  ["Marketing-sourced revenue", "What revenue did marketing create?"],
  ["Data quality", "Can we trust the inputs?"],
];
