---
title: "HubSpot GCLID: why some Google Ads contacts arrive without a click ID"
seoTitle: "HubSpot GCLID missing from Google Ads leads"
slug: hubspot-gclid-missing-click-id
description: "Why HubSpot GCLID values go missing on some Google Ads contacts: auto-tagging, redirects, multi-page visits and embedded forms, and how to test each."
targetKeyword: hubspot gclid
pillar: C
cta: direct
ogImage: hubspot-gclid-missing-click-id-og.png
lastChecked: 2026-10-17
status: published
datePublished: 2026-10-17
dateModified: 2026-10-17
---

# HubSpot GCLID: why some Google Ads contacts arrive without a click ID

When a contact from a Google ad reaches HubSpot without a HubSpot GCLID value, Google Ads has one less way to match that lead back to the click. If the contact also has no shared email or phone, its lifecycle stage can't sync to Google Ads at all. This post covers the four places a click ID usually gets lost on the way from the ad to the form, how to test each one, and what to fall back on when the GCLID can't be saved.

## Why the click ID matters

With auto-tagging on, Google adds a GCLID parameter to the landing page URL when someone clicks your ad ([Google Ads Help: about auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en), last checked 17 Oct 2026). HubSpot sets the "Google ad click ID" contact property from that GCLID ([HubSpot KB: default contact properties](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties), last checked 17 Oct 2026).

For HubSpot's lifecycle stage events to sync, a contact needs either a "Google Ad click id" value or contact data (email, phone or address) shared with Google ([HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026). So a missing click ID is not always fatal, but it removes the most direct match.

## Measure the gap first

Before fixing anything, find out how big the gap is.

1. In HubSpot, build a contact view of contacts created in the last 30 days whose original source is paid search.
2. Add a filter for "Google ad click ID" is unknown.
3. Compare the two counts. Then open a sample of the contacts without a click ID and look at their first page seen and the form they converted on. Patterns show up quickly: one landing page, one form, one campaign type.

## The four places a click ID gets lost

### 1. Auto-tagging is off, or blocked

Google says auto-tagging is required to track offline conversions and is on by default for new accounts. It also says a small share of sites serve an error page when given URL parameters they don't expect ([Google Ads Help: about auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en), last checked 17 Oct 2026).

**Test:** in Google Ads, check that auto-tagging is on in account settings. If you use cross-account conversion tracking, Google notes auto-tagging has to be turned on in each child account manually ([same page](https://support.google.com/google-ads/answer/3095550?hl=en)). Then click one of your live ads and confirm the landing page URL contains gclid=.

### 2. A redirect strips it

Google says that if your site uses redirects, the GCLID must still be passed to the final landing page ([Google Ads Help: about auto-tagging](https://support.google.com/google-ads/answer/3095550?hl=en), last checked 17 Oct 2026). HubSpot's KB goes further for its own parameters: any redirect, including HTTP to HTTPS, and third-party click-tracking services remove HubSpot's tracking parameters; link shorteners strip them too, except hubs.ly ([HubSpot KB: track and report on Google ads](https://knowledge.hubspot.com/ads/track-and-report-on-google-ads-in-hubspot), last checked 17 Oct 2026).

**Test:** for each final URL in your ads, load it in a browser with ?gclid=test added and watch where you land. If the address bar loses the parameter, a redirect is stripping it. Common culprits: http to https, non-www to www (or the reverse), trailing slash rules, and old URLs redirected to new ones.

### 3. The visitor converts on a different page, or on a later visit

Google's own setup guide for click ID imports assumes the GCLID won't still be in the URL when the form is submitted. It tells you to add a hidden GCLID field to every lead form, and a script on every page that stores the GCLID in a cookie or local storage, with a 90-day expiry in its example script ([Google Ads Help: set up offline conversions using GCLID](https://support.google.com/google-ads/answer/7012522?hl=en), last checked 17 Oct 2026). The same page reminds you to follow local cookie consent rules.

**Test:** land on a page with ?gclid=test123, then click through to a different page with a form and submit a test entry with a test email address. Check whether the new test contact has "Google ad click ID" filled. Repeat in a new session the next day if your buyers tend to come back before converting. Delete the test contact afterwards.

If it fails, store the GCLID on landing and write it into a hidden form field, as Google's guide describes.

### 4. The form isn't a HubSpot form on the page

Embedded forms inside an iframe, forms from another tool, and custom forms that post to HubSpot through the API all depend on someone passing the click ID across. Google's ECL checklist treats iframe forms as a special case for capturing contact data and suggests modifying the iframe or using postMessage() to pass the data to the parent page ([Google Ads Help: ECL implementation checklist](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026). The same problem applies to the click ID.

**Test:** run the same test as in point 3 on every form type you use. For a custom form, check the code sends the stored GCLID to the "Google ad click ID" property; find its internal name in HubSpot's property settings rather than guessing it.

## When the GCLID can't be saved: contact data as the backup

Enhanced conversions for leads lets Google match on hashed contact data as well as the GCLID. HubSpot hashes shared data with SHA-256 before sending it and recommends sharing at least the default email property ([HubSpot KB](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026).

Two limits from Google's offline import FAQ: a conversion with a GCLID can be uploaded up to 90 days after the click, and one matched on personal information for enhanced conversions up to 63 days ([Google Ads Help: offline conversion imports FAQs](https://support.google.com/google-ads/answer/10029210?hl=en), last checked 17 Oct 2026). Contact data helps when the click ID is missing, but it has the shorter window.

For traffic from the EEA, Google requires consent for the use of personal data and consent signals shared with Google ([Google Ads Help: obtain user consent](https://support.google.com/google-ads/answer/14009343?hl=en), last checked 17 Oct 2026). Check your consent setup before relying on contact data alone.

> **What we check**
>
> For click IDs and matching, we:
>
> 1. Confirm auto-tagging is on in every account that runs ads.
> 2. Load each ad's final URL with a test click ID and check it survives any redirects.
> 3. Submit test entries on each form type, on the landing page and after browsing, and confirm the click ID reaches the contact.
> 4. Measure how many recent paid search contacts have a click ID or shared contact data.
> 5. Check the combined enhanced conversions setting and the consent property used for syncing.
>
> We change only what you approve and log how to reverse it. See the [sample report](/method) for an example finding on click IDs.

## Want us to run these tests?

Book a 20-minute fit call and we'll tell you whether a full check makes sense: https://cal.com/closedlogic/20min-fit

## Sources

All last checked 17 Oct 2026.

- Google Ads Help, about auto-tagging: https://support.google.com/google-ads/answer/3095550?hl=en
- Google Ads Help, set up offline conversions using GCLID: https://support.google.com/google-ads/answer/7012522?hl=en
- Google Ads Help, ECL implementation checklist: https://support.google.com/google-ads/answer/16782203?hl=en
- Google Ads Help, offline conversion imports FAQs: https://support.google.com/google-ads/answer/10029210?hl=en
- Google Ads Help, obtain user consent: https://support.google.com/google-ads/answer/14009343?hl=en
- HubSpot KB, HubSpot's default contact properties: https://knowledge.hubspot.com/properties/hubspots-default-contact-properties
- HubSpot KB, track and report on your Google ads in HubSpot: https://knowledge.hubspot.com/ads/track-and-report-on-google-ads-in-hubspot
- HubSpot KB, create and sync ad conversion events (last updated 12 Oct 2026): https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account

<!-- editor-notes: everything below this line is for the team, not for publication -->

## Editor notes

**Suggested internal links in:** homepage "Seven questions" item 4 (click ID and contact data matching); /sample-report finding "Click IDs are on the page but not reaching HubSpot"; pillar B (already linked).

**Links out:** /sample-report (money page). Pillar C (/guides/gclid-hubspot) is not written yet; add a link to it in the intro once it ships. Sibling: /guides/hubspot-google-ads-conversion-tracking in "Why the click ID matters".

**Cannibalisation flag:** plan.md maps "hubspot gclid" to both pillar C (/guides/gclid-hubspot) and this post. Give pillar C a broader keyword (for example "gclid capture") when it is written.

**Dropped claim:** community threads say HubSpot only captures the GCLID if the form is on the landing page itself. HubSpot's docs don't say this, so the post tells readers to test it instead.

**Graphic brief for Nova:** use the existing files: hubspot-gclid-missing-click-id-og.png, -twitter.png; -diagram-1.png under "Why the click ID matters" (alt: "A click ID tag falls off the path between the landing page and the form."); -diagram-2.png under "The four places a click ID gets lost" (alt: "Checklist of four places a click ID gets lost."). Diagram-2 currently lists: visitor browses before converting, form sits in an iframe, a redirect strips the parameter, custom form skips the tracking field. The post's four headings are: auto-tagging is off or blocked, a redirect strips it, the visitor converts on a different page or later visit, the form isn't a HubSpot form on the page (iframes and custom forms together). Suggest Nova re-renders diagram-2 with the post's four items, in that order; until then the current version is close enough to publish, but it leaves out auto-tagging. Optional extra: a screenshot of a contact record's "Google ad click ID" field with a test value, only with no client data and no vendor logos.
