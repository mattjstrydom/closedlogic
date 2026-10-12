// The seven checks: one source for the checks list and the hero preview. Labels are the phrases from the
// /agencies "What's in a check" sentence; questions are the homepage questions, word for word.
export const checkItems: { label: string; q: string }[] = [
  { label: "Which conversions bidding uses", q: "Which conversions is Smart Bidding actually optimising for, and which are duplicates, tests or leftovers?" },
  { label: "Lifecycle stages set up and firing", q: "Are your lifecycle stages (MQL, SQL, opportunity, customer) set up as conversions, included in your goals, firing, and carrying the right value?" },
  { label: "Duplicates", q: "Is any stage sent more than once, through HubSpot, Data Manager or a Zapier automation?" },
  { label: "Click ID and contact data matching", q: "Does each contact reach Google with a click ID or contact data (email, phone or address), so it can be matched to an ad click? And is Google's combined enhanced conversions setting switched on?" },
  { label: "Legacy imports", q: "Is anything still on legacy offline import or a custom API upload, or routed through a manager account that HubSpot can't connect?" },
  { label: "EEA consent signals", q: "Are consent signals set correctly for traffic from the EEA, where Google requires them?" },
  { label: "Side-by-side count", q: "For the same period, how do HubSpot's stage changes and Google Ads' conversions compare, and what explains the gap?" },
];
