---
title: "Google Data Manager API offline conversions: what the 15 June 2026 change means for HubSpot users"
seoTitle: "Data Manager API change for HubSpot users"
slug: google-data-manager-api-change-hubspot
description: "Google Data Manager API offline conversions replaced Google Ads API uploads on 15 June 2026. Who it affects if you use HubSpot, and what to check."
targetKeyword: google data manager api offline conversions
pillar: B
cta: direct
ogImage: google-data-manager-api-change-hubspot-og.png
lastChecked: 2026-10-17
status: published
datePublished: 2026-10-17
dateModified: 2026-10-17
---

# Google Data Manager API offline conversions: what the 15 June 2026 change means for HubSpot users

On 15 June 2026, Google moved offline conversion and enhanced conversions for leads uploads from the Google Ads API to the Data Manager API. If your HubSpot stages reach Google Ads through HubSpot's own events or the Data Manager HubSpot connection, the change is on the vendor side and there is nothing for you to migrate. If anything in your setup uploads Google Data Manager API offline conversions, or used to upload through the Google Ads API with custom code, it is the part to check. This post sets out what Google says changed, who it touches, and how to find out whether your setup is one of them.

## What Google says changed

Google's help centre: "Starting June 15, 2026, offline conversions import and enhanced conversions for leads uploads will be migrated to the Data Manager API and blocked in the Google Ads API." The same notice says developer tokens that hadn't sent a request between January 2026 and June 2026 would not be allowlisted for legacy access ([Google Ads Help: upgrade offline conversion import to enhanced conversions for leads](https://support.google.com/google-ads/answer/14274408?hl=en), last checked 17 Oct 2026).

The Google Ads API deprecations page gives a slightly different window. Its 15 June 2026 entry says developer tokens with no offline conversion upload requests between 17 December 2025 and 15 June 2026 are restricted from using the Google Ads API for offline conversions, and that UploadClickConversions requests from those tokens return a CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE error ([Google Ads API: feature deprecations](https://developers.google.com/google-ads/api/docs/deprecations), last checked 17 Oct 2026). Both pages tell you to move to the Data Manager API.

If you see that error in a log, this change is the reason.

## Who it affects

**Probably not you, directly, if:**

- You use HubSpot's ad conversion events (Marketing > Ads > Events). Google's help page lists HubSpot and Zapier among supported third-party import methods ([Google Ads Help](https://support.google.com/google-ads/answer/14274408?hl=en), last checked 17 Oct 2026). How a vendor sends the data behind the scenes is the vendor's job.
- You use the HubSpot connection in Google Ads Data Manager, set up from Google Ads ([Google Ads Help: HubSpot](https://support.google.com/google-ads/answer/15293735?hl=en), last checked 17 Oct 2026).

**Check carefully if:**

- A developer built a custom upload. HubSpot's KB says that to use actual deal amounts for Google bidding, a developer can build a custom setup using HubSpot workflows and Google's Offline Conversions API, because native lifecycle events now use a fixed value ([HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026). If that build calls the Google Ads API for uploads, it is exactly what Google blocked.
- You use a server, script, middleware tool or agency system that uploads conversions on your behalf. Ask whoever runs it which API it uses.
- Conversions stopped arriving around June 2026 and nobody changed anything in HubSpot.

## What is different for developers

From Google's own comparison ([Data Manager API: upgrade from the Google Ads API](https://developers.google.com/data-manager/api/devguides/events/google-ads/offline/upgrade), last updated 7 Oct 2026, last checked 17 Oct 2026):

- **Developer token:** not required for the Data Manager API; required for the Google Ads API.
- **Account:** in the Data Manager API, the destination's operating_account must be the Google Ads account that owns the conversion action. The Google Ads API also accepted a parent or child account of that owner; the Data Manager API doesn't. Setups that uploaded through a manager account need changing.
- **Adjustments:** uploads and adjustments both go through one IngestEvents endpoint. Sending an event with an existing transaction_id for the same conversion action is handled as an adjustment, not rejected as a duplicate.
- **No retractions:** the Data Manager API doesn't support retracting a conversion to zero. You can restate the value, but the count stays.
- **Errors:** the Data Manager API uses a fast-fail model; the Google Ads API used partial failure.

The account rule is the one most likely to trip up agency setups that upload for many clients through one manager account.

## Find out whether you're affected

1. **List your routes.** HubSpot Marketing > Ads > Events; Google Ads Tools > Data manager; Zapier zaps with a Google Ads offline conversion action; anything else that uploads. Our post on [the three routes](/guides/hubspot-google-ads-offline-conversions) explains each.
2. **For anything custom, ask one question:** does it call the Google Ads API or the Data Manager API for uploads? Ask for the endpoint name. UploadClickConversions is the Google Ads API.
3. **Check the conversion actions.** In Google Ads, Goals > Conversions > Summary, look at each imported action's status and diagnostics. Google's "No recent data" label means no events received in the last 28 days ([Google Ads Help: offline data diagnostics](https://support.google.com/google-ads/answer/13812240?hl=en), last checked 17 Oct 2026). An action that went quiet in June 2026 is a strong hint.
4. **Check ownership.** For any custom build, confirm uploads target the account that owns the conversion action, not a manager account above it.
5. **Use the move to tidy up.** Google recommends enhanced conversions for leads over plain offline import and calls offline import a legacy feature ([Google Ads Help: HubSpot](https://support.google.com/google-ads/answer/15293735?hl=en), last checked 17 Oct 2026). If you are rebuilding an upload anyway, include consented contact data alongside the GCLID.

> **What we check**
>
> On legacy and custom uploads, we:
>
> 1. List every route that sends conversions to Google Ads, including custom code and vendor tools.
> 2. Identify anything still on legacy offline import or a custom API upload.
> 3. Check each imported action's status and diagnostics for gaps that line up with the June 2026 change.
> 4. Check that uploads go to the account that owns the conversion action, and flag manager account setups HubSpot can't connect.
> 5. Note what needs a developer, since we work in settings, not code, and say so plainly in the report.
>
> We make only the changes you approve, with a note on how to reverse each one. See the [sample report](/method).

## Want us to check your routes?

Book a 20-minute fit call and we'll tell you whether your setup is touched by the change: https://cal.com/closedlogic/20min-fit

## Sources

All last checked 17 Oct 2026.

- Google Ads Help, upgrade offline conversion import to enhanced conversions for leads: https://support.google.com/google-ads/answer/14274408?hl=en
- Google Ads API, feature deprecations and unversioned changes: https://developers.google.com/google-ads/api/docs/deprecations
- Data Manager API, upgrade from the Google Ads API (last updated 7 Oct 2026): https://developers.google.com/data-manager/api/devguides/events/google-ads/offline/upgrade
- Google Ads Help, HubSpot (Data Manager): https://support.google.com/google-ads/answer/15293735?hl=en
- Google Ads Help, offline data diagnostics: https://support.google.com/google-ads/answer/13812240?hl=en
- HubSpot KB, create and sync ad conversion events (last updated 12 Oct 2026): https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account

<!-- editor-notes: everything below this line is for the team, not for publication -->

## Editor notes

**Check with Matt before publishing:** "What we check" item 5 says we work in settings, not code. That matches the site ("We fix everything on the list that lives in Google Ads, HubSpot or Tag Manager settings") but confirm the wording is wanted here.

**Suggested internal links in:** homepage "Seven questions" item 5 (legacy imports); /sample-report finding "Customer conversions still use legacy offline import"; pillar B (already linked).

**Links out:** /guides/hubspot-google-ads-offline-conversions (sibling), /sample-report (money page). Add /guides/hubspot-google-ads-conversion-tracking (pillar) via breadcrumb or in step 1.

**Slug:** Nova's slug google-data-manager-api-change-hubspot is used. It does not contain the target keyword exactly; that's fine for ranking but noted in the README.

**Graphic brief for Nova:** use the existing files: google-data-manager-api-change-hubspot-og.png, -twitter.png, and -diagram-1.png placed under "What Google says changed", alt text "Timeline with a single marker at 15 June 2026." OG headline matches the second half of this title. Optional extra: none; a screenshot of an error log would risk showing client data.
