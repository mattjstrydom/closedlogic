---
title: "HubSpot Google Ads conversion tracking: the 2026 guide"
seoTitle: "HubSpot Google Ads conversion tracking guide"
slug: hubspot-google-ads-conversion-tracking
description: "How HubSpot Google Ads conversion tracking works in 2026: click IDs, lifecycle stage events, Primary and Secondary actions, matching, consent and fixes."
targetKeyword: hubspot google ads conversion tracking
pillar: B
cta: direct
ogImage: hubspot-google-ads-conversion-tracking-og.png
lastChecked: 2026-10-17
status: published
datePublished: 2026-10-17
dateModified: 2026-10-17
---

# HubSpot Google Ads conversion tracking: the 2026 guide

HubSpot Google Ads conversion tracking has one job: tell Google Ads which ad clicks turned into leads your sales team actually wanted, so Smart Bidding can look for more of them. Getting a form fill into Google Ads is the easy part. The hard part is the chain behind it: the click ID has to survive until the form is submitted, the lifecycle stage has to reach Google Ads once, Google has to match it to a click, and the conversion action has to be one that bidding uses. A break at any link means Google Ads keeps learning from whatever it can still see, which is usually the form fill.

Want a quick read on your own setup first? Try our [two-minute stage check](/tools/stage-check).

This guide walks through each link, what changed in 2026, and how to check your own setup. Every Google and HubSpot fact links to the page it comes from, last checked 17 Oct 2026.

## How a qualified lead reaches bidding

There are four steps, and each one can fail on its own.

1. **The click.** Someone clicks your ad. With auto-tagging on, Google adds a GCLID (Google Click Identifier) to the landing page URL ([Google Ads Help: about auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en), last checked 17 Oct 2026).
2. **The form.** They submit a form. HubSpot sets the contact property "Google ad click ID" from the GCLID ([HubSpot KB: default contact properties](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties), last checked 17 Oct 2026).
3. **The stage change.** Your sales team moves the contact to a lifecycle stage such as SQL. HubSpot (or another route) sends that change to Google Ads as a conversion.
4. **The bid.** Google matches the conversion to the click and, if the conversion action is one bidding uses, Smart Bidding learns from it.

The rest of this guide takes the steps in turn.

## Step 1: the click ID

Google says auto-tagging is required if you want to track offline conversions, and that if your site uses redirects, the GCLID must still reach the final landing page ([Google Ads Help: about auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en), last checked 17 Oct 2026).

HubSpot adds its own tracking parameters through a campaign-level tracking template. HubSpot's KB says any redirect, including HTTP to HTTPS redirects and third-party click trackers, removes HubSpot's tracking parameters, and link shorteners (other than hubs.ly) strip parameters too ([HubSpot KB: track and report on Google ads](https://knowledge.hubspot.com/ads/track-and-report-on-google-ads-in-hubspot), last checked 17 Oct 2026). If you use any other tool that writes a tracking template, the two can overwrite each other.

Google's own setup guide for click ID imports tells you to add a hidden GCLID field to every lead form and a script on every page that stores the GCLID in a cookie or local storage, so it is still available when the form is submitted ([Google Ads Help: set up offline conversions using GCLID](https://support.google.com/google-ads/answer/7012522?hl=en), last checked 17 Oct 2026). The same page reminds you to follow local rules on cookie consent.

More on this in our guide to [click IDs and HubSpot](/guides/gclid-hubspot) and the post on [why some contacts arrive without a click ID](/guides/hubspot-gclid-missing-click-id).

## Step 2 and 3: getting the stage into Google Ads

You have three ways to send a HubSpot lifecycle stage to Google Ads. We compare them in detail in [HubSpot Google Ads offline conversions: the three routes](/guides/hubspot-google-ads-offline-conversions). In short:

- **HubSpot's own ad conversion events.** Created in HubSpot under Marketing > Ads > Create > Conversion event, using either a lifecycle stage change or a form submission as the trigger ([HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026).
- **The HubSpot connection in Google Ads Data Manager.** Set up from the Google Ads side. For HubSpot, all import conditions must use the Lifecycle Stage field unless combined with another condition using AND ([Google Ads Help: HubSpot](https://support.google.com/google-ads/answer/15293735?hl=en), last checked 17 Oct 2026).
- **Zapier.** Google lists Zapier as a third-party import method ([Google Ads Help: upgrade offline conversion import](https://support.google.com/google-ads/answer/14274408?hl=en), last checked 17 Oct 2026).

What HubSpot's KB says about its own lifecycle stage events (all from [HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last updated 12 Oct 2026, last checked 17 Oct 2026):

- Only stage changes that happen after you create the event are counted.
- The "Included in account-level goals" setting must be Yes for each event.
- To sync, a contact needs a value in "Google Ad click id" or contact data (email, phone or address) shared with Google.
- If you have events for several stages, each stage change syncs separately.
- Native lifecycle stage events use a fixed value. The "Use the Deal amount" option is no longer available. Actual deal amounts need a custom build using HubSpot workflows and Google's API.
- There is a checkbox to set the event as a primary action in Google Ads.
- With a Google Ads manager account (MCC), you can't sync form submission and conversion events using Enhanced Conversions; the event can be created but the form data won't sync.
- If an event stops syncing, a Needs Attention section appears at the top of the Events tab.
- Deleting an event in HubSpot does not delete the conversion action in Google Ads.

## Step 3, continued: matching the conversion to a click

Google matches an imported conversion to a click by GCLID, by hashed contact data, or both. Two limits from Google's offline import FAQ matter for B2B sales cycles: a conversion with a GCLID can be uploaded up to 90 days after the click, and a conversion matched on personal information for enhanced conversions up to 63 days ([Google Ads Help: offline conversion imports FAQs](https://support.google.com/google-ads/answer/10029210?hl=en), last checked 17 Oct 2026). A stage that usually takes longer than that to reach will not attribute.

Enhanced conversions for leads (ECL) uses contact data alongside the GCLID. Google now combines enhanced conversions for web and for leads into one on and off setting, from April 2026, with existing users migrated automatically ([Google Ads Help: ECL implementation checklist](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026). The same checklist asks whether you upload all conversions for the event, including those not attributed to Google Ads, and calls this required for ECL to work correctly. That matters if you chose HubSpot's option to sync only contacts who interacted with your ads; HubSpot itself strongly recommends syncing all contacts who reach the stage ([HubSpot KB](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026).

**Consent.** Google says that to keep using measurement, ad personalisation and remarketing features, you must collect consent for the use of personal data from users in the EEA and share consent signals with Google ([Google Ads Help: obtain user consent](https://support.google.com/google-ads/answer/14009343?hl=en), last checked 17 Oct 2026). HubSpot's events have an optional "Consent to share data" setting; if you send consent data, Google only uses consented contacts ([HubSpot KB](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026). Pick the one property that really holds consent, not an old one.

## Step 4: will bidding use it?

This is the step most setups miss. Google groups conversion actions into goals. A **Primary** action is reported in the "Conversions" column and used for bidding as long as the standard goal it belongs to is used for bidding. A **Secondary** action is for observation only: it shows in "All conversions" and is not used for bidding, unless it is part of a custom goal ([Google Ads Help: primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796?hl=en), last checked 17 Oct 2026).

So a stage can sync perfectly and still be ignored by bidding. We cover the four ways this happens in [Google Ads primary vs secondary conversions](/guides/google-ads-primary-vs-secondary-conversions), and how to choose which stage to bid on in [Bid on pipeline, not form fills](/guides/bid-on-pipeline-not-form-fills).

## What changed in 2026

- **April 2026:** enhanced conversions for web and leads became one setting ([Google Ads Help](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026).
- **15 June 2026:** offline conversion imports and ECL uploads moved to the Data Manager API and were blocked in the Google Ads API ([Google Ads Help](https://support.google.com/google-ads/answer/14274408?hl=en), last checked 17 Oct 2026). The change is to the APIs, so it matters most if you or a vendor upload conversions through code. See [what the change means for HubSpot users](/guides/google-data-manager-api-change-hubspot).
- **HubSpot lifecycle event values:** fixed value only; the deal amount option is gone ([HubSpot KB](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026). Older guides, including some still ranking well, tell you to pick the deal amount.

## Common errors and what Google says they mean

From [Google Ads Help: offline conversion imports FAQs](https://support.google.com/google-ads/answer/10029210?hl=en) (last checked 17 Oct 2026):

| Error | What Google says to do |
|---|---|
| Conversion date precedes click date | The conversion can't happen before the click. Check the time zone, or move the conversion time later. |
| This click is too old for its conversion to be imported | GCLIDs are kept for 90 days only. Upload more often, or use a stage that happens within 90 days. |
| We cannot find this conversion name in the target account | Confirm the click came from the account you are uploading to. With an MCC, the child account needs cross-account conversion tracking. |
| Still processing this click's information | The click hasn't been processed yet. Google suggests waiting 6 hours with scheduled uploads. |

Google's offline data diagnostics label "No recent data" means no events have been received in the last 28 days, or that there are other issues with the data being imported ([Google Ads Help: offline data diagnostics](https://support.google.com/google-ads/answer/13812240?hl=en), last checked 17 Oct 2026).

## Check it yourself in an hour

1. In Google Ads, open Goals > Conversions > Summary and list every conversion action, its source, whether it is Primary or Secondary, and which goal it sits in.
2. Add the "Conversion goals" column to your Campaigns table to see which goals each campaign actually bids on ([Google Ads Help: campaign-specific goals](https://support.google.com/google-ads/answer/9143218?hl=en), last checked 17 Oct 2026).
3. In HubSpot, open Marketing > Ads > Events. Note each event's stage, value, consent property, data sharing and whether it is set as primary. Check for a Needs Attention section.
4. In Google Ads, open Tools > Data manager and check for a HubSpot connection. Check Zapier for any zap that sends offline conversions. Write down which route sends which stage.
5. In HubSpot, pull last month's contacts from paid search and check how many have a Google ad click ID.
6. Compare HubSpot's count of stage changes for a period with Google Ads' "All conv." for the matching conversion action over the same period, and explain the gap. Imported conversions are reported against the conversion time, so use the "All conv. (by conv. time)" column where you can ([Google Ads Help: ECL checklist](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026).

> **What we check**
>
> When we check a HubSpot to Google Ads connection, we work through the same seven questions every time, inside your own accounts:
>
> 1. **Which conversions bidding uses.** We list every conversion action, its goal, Primary or Secondary, and which goals each campaign bids on.
> 2. **Lifecycle stages set up and firing.** We check each stage event in HubSpot: trigger, value, consent property, data sharing and sync status.
> 3. **Duplicates.** We look for any stage sent more than once, through HubSpot, Data Manager or Zapier.
> 4. **Click ID and contact data matching.** We check that paid contacts carry a click ID or shared contact data, and that the combined enhanced conversions setting is on.
> 5. **Legacy imports.** We look for old offline imports, custom API uploads and manager account setups that HubSpot can't connect.
> 6. **EEA consent signals.** We check consent is set where Google requires it.
> 7. **Side-by-side count.** We compare HubSpot stage changes with Google Ads conversions for the same period and explain the gap.
>
> We make only the changes you approve and log how to reverse each one. See a [sample report](/sample-report) built on a fictional account.

## Where to go next

- [Bid on pipeline, not form fills](/guides/bid-on-pipeline-not-form-fills): choosing the stage and value bidding should learn from.
- [Click IDs and HubSpot](/guides/gclid-hubspot): keeping the GCLID attached to the contact.
- [HubSpot to Google Ads audit checklist](/guides/hubspot-google-ads-audit-checklist): the seven checks as a checklist.

## Want us to look at yours?

If you would rather we checked the connection for you, book a 20-minute fit call and we'll tell you whether it's worth doing: https://cal.com/closedlogic/20min-fit

## Sources

All last checked 17 Oct 2026.

- HubSpot KB, create and sync ad conversion events with your Google Ads account (last updated 12 Oct 2026): https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account
- HubSpot KB, track and report on your Google ads in HubSpot: https://knowledge.hubspot.com/ads/track-and-report-on-google-ads-in-hubspot
- HubSpot KB, HubSpot's default contact properties: https://knowledge.hubspot.com/properties/hubspots-default-contact-properties
- Google Ads Help, about auto-tagging: https://support.google.com/google-ads/answer/3095550?hl=en
- Google Ads Help, set up offline conversions using GCLID: https://support.google.com/google-ads/answer/7012522?hl=en
- Google Ads Help, HubSpot (Data Manager): https://support.google.com/google-ads/answer/15293735?hl=en
- Google Ads Help, upgrade offline conversion import to enhanced conversions for leads: https://support.google.com/google-ads/answer/14274408?hl=en
- Google Ads Help, offline conversion imports FAQs: https://support.google.com/google-ads/answer/10029210?hl=en
- Google Ads Help, ECL implementation checklist: https://support.google.com/google-ads/answer/16782203?hl=en
- Google Ads Help, obtain user consent: https://support.google.com/google-ads/answer/14009343?hl=en
- Google Ads Help, primary and secondary conversion actions: https://support.google.com/google-ads/answer/11461796?hl=en
- Google Ads Help, campaign-specific conversion goals: https://support.google.com/google-ads/answer/9143218?hl=en
- Google Ads Help, offline data diagnostics: https://support.google.com/google-ads/answer/13812240?hl=en

<!-- editor-notes: everything below this line is for the team, not for publication -->

## Editor notes

**Suggested internal links in (from plan.md linking table):** homepage Questions section to this page with anchor "HubSpot to Google Ads conversion tracking guide". Pillar pages A, C and D link back here.

**Links out from this page:** /guides/bid-on-pipeline-not-form-fills, /guides/gclid-hubspot, /guides/hubspot-google-ads-audit-checklist, /guides/hubspot-google-ads-offline-conversions, /guides/google-ads-primary-vs-secondary-conversions, /guides/google-data-manager-api-change-hubspot, /guides/hubspot-gclid-missing-click-id, /sample-report. Pillar C and D pages do not exist yet; hold those links until they ship.

**Graphic brief for Nova:** use the existing files in /workspace/seo/graphics/: hubspot-google-ads-conversion-tracking-og.png (OG), hubspot-google-ads-conversion-tracking-twitter.png (Twitter), and hubspot-google-ads-conversion-tracking-diagram-1.png placed under "How a qualified lead reaches bidding", alt text "Flow from form to stage to click ID to bidding." The article's four steps are Click, Form, Stage change, Bid; the diagram starts at the form, which still works, but if Nova re-renders, adding a "Click" step at the start would match the text exactly. Optional extra: a screenshot of the Google Ads goal edit screen showing "Primary" and "Secondary (observe only)" for the Step 4 section, only if it shows no client data and no vendor logos. OG headline "HubSpot to Google Ads conversion tracking, 2026" suits this title.
