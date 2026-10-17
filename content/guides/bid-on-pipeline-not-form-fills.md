---
title: "Bid on pipeline, not form fills: a HubSpot lifecycle stage as your Google Ads conversion"
seoTitle: "Lifecycle stage as a Google Ads conversion"
slug: bid-on-pipeline-not-form-fills
description: "How to make a HubSpot lifecycle stage your Google Ads conversion: choose the stage, set its value and move Smart Bidding off form fills safely."
targetKeyword: hubspot lifecycle stage google ads conversion
pillar: A
cta: direct
ogImage: bid-on-pipeline-not-form-fills-og.png
lastChecked: 2026-10-17
status: published
datePublished: 2026-10-17
dateModified: 2026-10-17
---

# Bid on pipeline, not form fills: a HubSpot lifecycle stage as your Google Ads conversion

If the only conversion Google Ads bids on is a form fill, Smart Bidding gets very good at finding form fills. It has no way to tell the demo request your sales team wanted from the student, the competitor or the spam. Using a HubSpot lifecycle stage as your Google Ads conversion, such as SQL or opportunity, changes what bidding learns from. This guide covers why that works, how to choose the stage, what value to give it, and how to switch without throwing your campaigns off balance.

## Why bidding on form fills goes wrong

Smart Bidding, including target CPA and target ROAS, considers only conversions reported in the "Conversions" column ([Google Ads Help: campaign-specific conversion goals](https://support.google.com/google-ads/answer/9143218?hl=en), last checked 17 Oct 2026). Only Primary actions in a goal used for bidding, or actions in a custom goal, land in that column ([Google Ads Help: primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796?hl=en), last checked 17 Oct 2026).

So whatever sits there is what bidding chases. If that is a form fill, every form fill is a success to Google, including the ones your sales team throws away. Google's own lead generation guidance points the other way: optimise towards lead generation goals such as "qualified lead" or "converted lead", and avoid selecting goals from more than one stage of your lead journey ([Google Ads Help: best practices for generating high-quality leads](https://support.google.com/google-ads/answer/13489421?hl=en), last checked 17 Oct 2026).

Google Ads has "qualified lead" and "converted lead" goal types for exactly this. Google describes a qualified lead as a Google-generated lead that has been further qualified offline in your CRM, and a converted lead as one that completed a step you define as conversion, typically a sale ([Google Ads Help: about qualified leads and converted leads](https://support.google.com/google-ads/answer/11459091?hl=en), last checked 17 Oct 2026).

## Step 1: get the stage into Google Ads

Your lifecycle stages need to reach Google Ads, matched to clicks, before any of this matters. HubSpot's ad conversion events sync lifecycle stage changes as conversion actions, but only changes made after the event exists, and only for contacts with a Google ad click ID or shared contact data ([HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026).

If you haven't set this up, start with our [HubSpot Google Ads conversion tracking guide](/guides/hubspot-google-ads-conversion-tracking) and the comparison of [the three routes into Google Ads](/guides/hubspot-google-ads-offline-conversions). Create one event per stage you care about. You'll choose which one bids in step 2; the rest stay as Secondary for reporting.

## Step 2: choose the stage bidding learns from

Google gives three tests for the conversion you bid on ([Google Ads Help: best practices for generating high-quality leads](https://support.google.com/google-ads/answer/13489421?hl=en), last checked 17 Oct 2026):

- **Volume:** at least 15 conversions in the last 30 days at account level.
- **Freshness:** for offline imports and ECL, upload regularly, ideally daily.
- **Delay:** ideally, a conversion that happens within 7 days of the ad interaction.

Google's value-based bidding guide repeats the idea: pick a single stage of your lead-to-sale funnel, with a relatively short conversion delay and at least 15 monthly conversions ([Google Ads Help: value-based bidding best practices](https://support.google.com/google-ads/answer/14792795?hl=en), last checked 17 Oct 2026).

In HubSpot terms, the trade-off usually looks like this:

| Stage | Signal quality | Volume and delay |
|---|---|---|
| Lead or form fill | Weakest: anyone who submitted a form | Highest volume, no delay |
| MQL | Better, if your MQL rules are strict and stable | Lower volume, short delay |
| SQL | Strong: your sales team accepted it | Lower again, delay depends on how fast sales qualifies |
| Opportunity | Stronger | Often too few, too late |
| Customer | Strongest | Usually far too few and far too late for bidding |

**How to choose, with your own numbers:**

1. In HubSpot, count how many contacts from paid search reached each stage in each of the last three months.
2. For a sample of them, work out the days between the first paid visit and the date they reached each stage.
3. Pick the deepest stage that still clears Google's volume guidance and usually happens within about a week. For many B2B teams that turns out to be SQL, but your numbers decide.
4. If no stage clears the bar, consider the stage just above it, or tighten the definition of an earlier stage so it means more, rather than bidding on a stage with too little data.

Also check that the stage is set consistently. If some reps skip SQL and go straight to opportunity, those contacts never send an SQL conversion.

## Step 3: give it a value

HubSpot's native lifecycle stage events now use a fixed value. "Use the Deal amount" is no longer available; HubSpot suggests a representative amount such as your average deal size. To send actual deal amounts, HubSpot says a developer can build a custom setup with HubSpot workflows and Google's API ([HubSpot KB](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026).

What Google says about values for lead generation:

- If you can assign different values to your leads, use value-based bidding such as Maximize conversion value, with or without a target ROAS. If lead quality matters but you can't assign distinct values, Google recommends target CPA bidding on qualified or converted leads ([Google Ads Help: best practices for generating high-quality leads](https://support.google.com/google-ads/answer/13489421?hl=en), last checked 17 Oct 2026).
- If exact values are hard to set, use proxy values that match your priorities, and avoid conversions with a value of 0 ([Google Ads Help: value-based bidding best practices](https://support.google.com/google-ads/answer/14792795?hl=en), last checked 17 Oct 2026).

A fixed value per stage works well with target CPA on one stage. Value-based bidding only earns its keep once different leads carry genuinely different values.

## Step 4: switch bidding over carefully

1. **Keep the new action Secondary first.** Google's ECL checklist recommends keeping a new ECL conversion action Secondary for the first 2 to 3 weeks ([Google Ads Help: ECL implementation checklist](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026). Use that time to check its counts against HubSpot.
2. **Make one change.** Set the chosen stage to Primary and the form fill to Secondary in the same goal, or put the stage in the goal your campaigns use. Our post on [primary vs secondary conversions](/guides/google-ads-primary-vs-secondary-conversions) shows how to check which goals each campaign bids on.
3. **Expect a learning phase.** Google says Smart Bidding needs a standard 7 to 14 day learning phase, and that changing goals or targets during it resets the window ([Google Ads Help: primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796?hl=en), last checked 17 Oct 2026).
4. **Move targets gradually.** Your cost per conversion will go up because SQLs are rarer than form fills. Google advises adjusting targets gradually to keep spend stable while bidding adapts ([Google Ads Help: campaign-specific conversion goals](https://support.google.com/google-ads/answer/9143218?hl=en), last checked 17 Oct 2026).
5. **If you move to value-based bidding,** Google suggests allowing a ramp-up of at least 2 weeks or 3 conversion cycles before judging performance ([Google Ads Help: value-based bidding best practices](https://support.google.com/google-ads/answer/14792795?hl=en), last checked 17 Oct 2026).

## Mistakes we look for

- The stage is synced but Secondary, so bidding never sees it.
- The form fill and the stage are both Primary in the same goal.
- A campaign uses a campaign-specific or custom goal that leaves the stage out.
- The stage is sent twice, through HubSpot and through Data Manager or Zapier.
- Sales sets the stage days or weeks later, or not at all for some reps.
- HubSpot is set to sync only contacts who interacted with ads, while Google's ECL checklist says to upload all conversions, including those not attributed to Google Ads ([Google Ads Help](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026).

> **What we check**
>
> When we set up bidding on a qualified stage, we:
>
> 1. List which conversions each campaign bids on today.
> 2. Check each lifecycle stage event: trigger, value, consent property, data sharing and sync status.
> 3. Look at stage volume and timing from paid search in HubSpot, so the stage you bid on has enough data.
> 4. Check the stage reaches Google Ads once, matched by click ID or contact data.
> 5. With your sign-off, set the chosen stage as the bidding conversion and the form fill as Secondary, and log how to reverse it.
> 6. Compare HubSpot's stage count with Google Ads' count for the same period, then recheck at day 30.
>
> See the [sample report](/sample-report) built on a fictional account.

## Want help choosing the stage?

Book a 20-minute fit call and we'll look at which stage your bidding could learn from: https://cal.com/closedlogic/20min-fit

## Sources

All last checked 17 Oct 2026.

- Google Ads Help, about campaign-specific conversion goals: https://support.google.com/google-ads/answer/9143218?hl=en
- Google Ads Help, about primary and secondary conversion actions: https://support.google.com/google-ads/answer/11461796?hl=en
- Google Ads Help, best practices for generating high-quality leads: https://support.google.com/google-ads/answer/13489421?hl=en
- Google Ads Help, about qualified leads and converted leads: https://support.google.com/google-ads/answer/11459091?hl=en
- Google Ads Help, value-based bidding best practices: https://support.google.com/google-ads/answer/14792795?hl=en
- Google Ads Help, ECL implementation checklist: https://support.google.com/google-ads/answer/16782203?hl=en
- HubSpot KB, create and sync ad conversion events (last updated 12 Oct 2026): https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account

<!-- editor-notes: everything below this line is for the team, not for publication -->

## Editor notes

**Suggested internal links in:** /agencies with anchor "when a client says the leads are poor" (per plan.md; until post 8 ships, link to this page); pillar B (already linked); post 1 (already linked).

**Links out:** /guides/hubspot-google-ads-conversion-tracking (pillar B), /guides/hubspot-google-ads-offline-conversions, /guides/google-ads-primary-vs-secondary-conversions, /sample-report. Later cluster posts (7, 9, 10, 20) should link back here.

**Title:** plan.md gives only the slug and the theme "Bid on pipeline, not form fills". The title adds the target keyword (in the form "HubSpot lifecycle stage as your Google Ads conversion"). It is 88 characters; see the README note on SEO titles.


**Graphic brief for Nova:** use the existing files: bid-on-pipeline-not-form-fills-og.png, -twitter.png, and -diagram-1.png placed under "Why bidding on form fills goes wrong", alt text "Comparison of bidding on form fills with bidding on qualified stages." OG headline ("bid on pipeline, not form fills") matches the first half of the title. Optional second diagram if Nova has time: the stage table in step 2 as a simple ladder (Lead, MQL, SQL, Opportunity, Customer) with arrows for "signal quality" going up and "volume" going down, no figures.
