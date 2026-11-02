// The checks, in two groups. Core checks are the Pipeline Truth Audit; extended checks are added by the Fractional
// Measurement Lead. "broken" and "cost" are generally true statements, not client results. One source for /method.
export type Check = { name: string; broken: string; cost: string };

export const coreChecks: Check[] = [
  { name: "Tracking and conversion actions", broken: "A page view or button click is set as a Primary conversion, so Google Ads counts visits as leads.", cost: "Bidding learns to find visitors, not buyers, and cost per lead looks lower than it is." },
  { name: "GCLID coverage", broken: "Paid contacts land in HubSpot with no stored Google click ID.", cost: "Those leads can't be matched back to the ad, and the channel looks like direct traffic." },
  { name: "Enhanced conversions", broken: "Enhanced conversions are on but send little or no matched customer data.", cost: "Google Ads matches fewer conversions to clicks, so bidding sees less than really happened." },
  { name: "Source data", broken: "Original source on contacts is blank, overwritten or wrong.", cost: "Reports credit the wrong channel, and budget follows the wrong numbers." },
  { name: "Consent", broken: "Tags fire, or contact data goes to Google, without the consent signal your own policy describes.", cost: "It is a compliance risk, and it can make conversion data less reliable." },
  { name: "CRM handoff", broken: "Form submissions reach HubSpot without the click ID or UTMs, or create duplicates.", cost: "Sales sees leads with no history, and a deal can't be tied back to its first touch." },
  { name: "Reporting reconciliation", broken: "Google Ads, HubSpot and the board report show different counts for the same period and nobody can say why.", cost: "Leaders stop trusting the numbers, and decisions wait on an argument about data." },
  { name: "Integration health", broken: "A sync between HubSpot and Google Ads has stopped or is erroring, and nobody was told.", cost: "Conversions stop reaching Google Ads, and bidding runs on stale signal." },
  { name: "UTM discipline", broken: "Campaign tags are missing, inconsistent or typed by hand.", cost: "One campaign splits into many rows, and channel results can't be compared." },
  { name: "Offline conversions", broken: "The CRM stages that matter, such as qualified lead or opportunity, never reach Google Ads.", cost: "Bidding keeps chasing form fills instead of the leads sales wants." },
];

export const extendedChecks: Check[] = [
  { name: "Lifecycle stages", broken: "Contacts skip stages or are moved by hand with no rule.", cost: "Stage counts lose their meaning, and any conversion built on them is noisy." },
  { name: "Lead scoring", broken: "Scores reward activity that doesn't predict a sale.", cost: "Sales chases the wrong leads while good ones wait." },
  { name: "Routing", broken: "New leads sit unassigned or go to the wrong owner.", cost: "Speed to lead drops, and some leads are never worked." },
  { name: "Deal stages", broken: "Deals sit in stages with no clear entry rule, or skip stages.", cost: "Pipeline value and forecasts can't be trusted." },
  { name: "Dashboard definitions", broken: "Two dashboards define the same metric in different ways.", cost: "Teams quote different numbers in the same meeting." },
  { name: "Data quality", broken: "Duplicates, blank required fields and mixed values pile up.", cost: "Every report built on that data carries the error." },
  { name: "Attribution model", broken: "The model in use isn't the one people think they are reading.", cost: "Credit lands on the wrong channels, and spend follows it." },
  { name: "Funnel conversion rates", broken: "Stage-to-stage rates swing with no change in the business, or can't be reproduced.", cost: "Teams fix the wrong stage." },
  { name: "Pipeline velocity", broken: "Cycle time is measured from different start points in different reports.", cost: "Slow deals hide, and forecasts slip." },
  { name: "Data retention", broken: "There is no rule for how long contact and tracking data is kept.", cost: "Old data adds risk and clutters reports." },
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
