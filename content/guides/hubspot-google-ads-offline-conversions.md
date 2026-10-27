---
title: "HubSpot Google Ads offline conversions in 2026: the three routes"
seoTitle: "HubSpot Google Ads offline conversions"
slug: hubspot-google-ads-offline-conversions
description: "Three ways to send HubSpot Google Ads offline conversions in 2026: HubSpot events, the Data Manager connector and Zapier. How to choose one route per stage."
targetKeyword: hubspot google ads offline conversions
pillar: B
cta: direct
ogImage: hubspot-google-ads-offline-conversions-og.png
lastChecked: 2026-10-17
status: published
datePublished: 2026-10-17
dateModified: 2026-10-17
---

# HubSpot Google Ads offline conversions in 2026: the three routes

There are three ways to set up HubSpot Google Ads offline conversions, so that a lifecycle stage your sales team sets in HubSpot reaches Google Ads as a conversion: HubSpot's own ad conversion events, the HubSpot connection in Google Ads Data Manager, and Zapier. Each works. The trouble starts when a portal uses two of them for the same stage, or when nobody remembers which one is live. This post sets out what each route needs, where it falls short, and how to pick one route per stage.

## Route 1: HubSpot's ad conversion events

**Where:** in HubSpot, Marketing > Ads > Create > Conversion event. The trigger is either a lifecycle stage change or a HubSpot form submission ([HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last updated 12 Oct 2026, last checked 17 Oct 2026).

What the KB says you get and need:

- Lifecycle stage changes sync to Google Ads as conversion actions using Google's Enhanced Conversions.
- Only stage changes after you create the event count. Nothing is backfilled.
- A contact syncs if it has a "Google Ad click id" value or contact data (email, phone or address) shared with Google. HubSpot hashes shared data with SHA-256 before sending it.
- The value is fixed per event. "Use the Deal amount" is no longer available; HubSpot suggests a representative amount such as your average deal size.
- "Included in account-level goals" must be Yes for each event, and there is a checkbox to set the event as Primary in Google Ads.
- Event limits: up to five on Marketing Hub Starter, 50 on Professional, 100 on Enterprise.
- With a Google Ads manager account (MCC), form submission and conversion events can't sync through Enhanced Conversions.
- Broken events show in a Needs Attention section on the Events tab. Deleting an event in HubSpot leaves the Google Ads action in place.

**Good for:** most HubSpot portals that connect an individual Google Ads account and are happy with a fixed value per stage.

**Watch for:** the MCC limit, the fixed value, and events created months ago with settings nobody has reviewed since.

## Route 2: the HubSpot connection in Google Ads Data Manager

**Where:** in Google Ads, Goals > Summary > New conversion action, then add a conversion action and choose HubSpot as the data source. You sign in to HubSpot, accept the customer data policy, pick a conversion category and add conditions ([Google Ads Help: HubSpot](https://support.google.com/google-ads/answer/15293735?hl=en), last checked 17 Oct 2026).

What Google's pages say:

- For HubSpot connections, all conditions must use the Lifecycle Stage field, unless combined with another condition using AND ([same page](https://support.google.com/google-ads/answer/15293735?hl=en)).
- Required fields are mapped from HubSpot automatically, with the option to edit.
- Google calls offline conversion import a legacy feature and recommends enhanced conversions for leads through Data Manager ([same page](https://support.google.com/google-ads/answer/15293735?hl=en)).
- For HubSpot, Data Manager imports the last 14 days of data on the first successful run, then all changes since the last successful run on each run after that ([Google Ads Help: set up offline conversions using GCLID](https://support.google.com/google-ads/answer/7012522?hl=en), last checked 17 Oct 2026).
- Existing connections are listed under Tools > Data manager ([Google Ads Help: HubSpot](https://support.google.com/google-ads/answer/15293735?hl=en)).

**Good for:** teams who manage conversions from the Google Ads side, or who want Data Manager's diagnostics in one place.

**Watch for:** it is set up in Google Ads, so a HubSpot admin may not know it exists. That is how stages end up sent twice.

## Route 3: Zapier

Google lists Zapier as a third-party import method for offline conversions and enhanced conversions for leads ([Google Ads Help: upgrade offline conversion import](https://support.google.com/google-ads/answer/14274408?hl=en), last checked 17 Oct 2026).

Zapier's own HubSpot walkthrough ([Zapier blog: track offline conversions in Google Ads](https://zapier.com/blog/track-offline-conversions-google-ads-zapier/), last checked 17 Oct 2026) uses:

1. A HubSpot trigger, "New Contact Property Change", on Lifecycle Stage, also pulling the click ID property and the property that records when the conversion happened.
2. A Filter step for the exact stage value, plus a check that the Google Click ID exists.
3. A Delay step of 24 hours if the conversion can happen within 24 hours of the click.
4. A Google Ads "Send Offline Conversion" action.

**Good for:** triggers HubSpot's events can't do, such as a deal property, or a value you calculate.

**Watch for:** the filter. If it doesn't match the stage exactly, the zap fires on other property changes. Zapier's tutorial says to enter the text exactly as it appears in your CRM.

## Pick one route per stage

Google deduplicates an offline conversion only when the GCLID, conversion name and conversion time combination is already in its system ([Google Ads Help: offline conversion imports FAQs](https://support.google.com/google-ads/answer/10029210?hl=en), last checked 17 Oct 2026). Two routes sending "SQL" usually write to two different conversion actions, or with different times, so that rule doesn't catch them and both can count. We cover how to spot this in a later post on duplicate conversions.

Our rule of thumb:

| Situation | Route we'd start with |
|---|---|
| Individual Google Ads account, fixed value per stage is fine | HubSpot's ad conversion events |
| Conversions managed from the Google Ads side, or you want Data Manager diagnostics | Data Manager HubSpot connection |
| Trigger or value HubSpot's events can't handle | Zapier, or a custom build through Google's Data Manager API |
| Manager account setup | Not HubSpot's Enhanced Conversions events, per the HubSpot KB limit; review the account structure first |

Whatever you choose, write it down: stage, route, Google Ads conversion action, Primary or Secondary.

## Find out what is live today

1. **HubSpot:** Marketing > Ads > Events. List each event, its stage and its status.
2. **Google Ads:** Tools > Data manager. Note any HubSpot connection and the conversion actions under Usage.
3. **Zapier:** search your zaps for the Google Ads "Send Offline Conversion" action.
4. **Google Ads:** Goals > Conversions > Summary. Match every imported action to one of the routes above. An action you can't match is either a leftover or a route someone forgot.
5. **Bidding:** check each action's Primary or Secondary status and goal. See [Google Ads primary vs secondary conversions](/guides/google-ads-primary-vs-secondary-conversions).

> **What we check**
>
> For the routes into Google Ads, we:
>
> 1. List every route in use: HubSpot events, Data Manager connections, Zapier zaps and any custom uploads.
> 2. Map each lifecycle stage to exactly one route and one conversion action.
> 3. Flag any stage sent through more than one route.
> 4. Check each HubSpot event's value, consent property, data sharing and sync status.
> 5. Look for legacy imports and manager account setups HubSpot can't connect.
>
> We change only what you approve and log how to reverse each change. The [sample report](/method) shows how this is written up.

## Not sure which routes you have?

Book a 20-minute fit call and we'll talk through what's connected and whether a check is worth it: https://cal.com/closedlogic/20min-fit

## Sources

All last checked 17 Oct 2026.

- HubSpot KB, create and sync ad conversion events (last updated 12 Oct 2026): https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account
- Google Ads Help, HubSpot (Data Manager): https://support.google.com/google-ads/answer/15293735?hl=en
- Google Ads Help, set up offline conversions using GCLID: https://support.google.com/google-ads/answer/7012522?hl=en
- Google Ads Help, upgrade offline conversion import to enhanced conversions for leads: https://support.google.com/google-ads/answer/14274408?hl=en
- Google Ads Help, offline conversion imports FAQs: https://support.google.com/google-ads/answer/10029210?hl=en
- Zapier blog, track offline conversions in Google Ads: https://zapier.com/blog/track-offline-conversions-google-ads-zapier/

<!-- editor-notes: everything below this line is for the team, not for publication -->

## Editor notes

**Suggested internal links in:** from pillar B (/guides/hubspot-google-ads-conversion-tracking, already linked); homepage "Seven questions" item 3 (duplicates) can point here until the duplicates post (post 5) ships.

**Links out:** /guides/google-ads-primary-vs-secondary-conversions (sibling), /sample-report (money page). Add /guides/hubspot-google-ads-conversion-tracking (pillar) in the intro if the layout has no breadcrumb. When post 5 ships, link "a later post on duplicate conversions" to it.

**Graphic brief for Nova:** use the existing files: hubspot-google-ads-offline-conversions-og.png, -twitter.png, and -diagram-1.png placed under the intro, alt text "Three routes from the CRM to Ads: native events, the Data Manager connector and Zapier." OG headline matches this title. Optional extra: a screenshot of the HubSpot Events tab or the Data Manager connection list, only with no client data and no vendor logos.
