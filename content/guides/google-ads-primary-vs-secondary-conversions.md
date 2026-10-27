---
title: "Google Ads primary vs secondary conversions: is bidding using your HubSpot stages?"
seoTitle: "Google Ads primary vs secondary conversions"
slug: google-ads-primary-vs-secondary-conversions
description: "Google Ads primary vs secondary conversions decide whether your HubSpot stages are bid on or only reported. Four ways a stage gets ignored, and checks."
targetKeyword: google ads primary vs secondary conversions
pillar: A
cta: direct
ogImage: google-ads-primary-vs-secondary-conversions-og.png
lastChecked: 2026-10-17
status: published
datePublished: 2026-10-17
dateModified: 2026-10-17
---

# Google Ads primary vs secondary conversions: is bidding using your HubSpot stages?

Your HubSpot lifecycle stages can arrive in Google Ads every day and still have no effect on bidding. The setting that decides this is Google Ads primary vs secondary conversions, plus the goals those actions sit in. A Secondary action is reported but not bid on. A Primary action in a goal your campaigns don't use isn't bid on either. This post explains the rules from Google's own help pages, the four ways a synced HubSpot stage ends up ignored, and how to check your account in about 20 minutes.

## The rules, from Google

Google groups conversion actions into goals. From [Google Ads Help: about primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796?hl=en) (last checked 17 Oct 2026):

- **Primary actions** are reported in the "Conversions" column and used for bidding, as long as the standard goal they are part of is used for bidding.
- **Secondary actions** are for observation only. They are reported in "All conversions" and are not used for bidding, even if their goal is used for bidding.
- **The exception:** a Secondary action that is part of a custom goal is used for bidding. Any action in a custom goal is used for reporting and bidding, whether it is Primary or Secondary.

Two more rules from [Google Ads Help: about campaign-specific conversion goals](https://support.google.com/google-ads/answer/9143218?hl=en) (last checked 17 Oct 2026):

- A campaign can override the account-default goals with campaign-specific goals, and can use only one custom goal.
- Smart Bidding, including target CPA and target ROAS, considers only conversions reported in the "Conversions" column.

## Where HubSpot comes in

When you create a lifecycle stage conversion event in HubSpot, there is a checkbox to set it as a primary action in Google Ads, which HubSpot describes as reporting the event in the Conversions column and using it for bidding. HubSpot also says the "Included in account-level goals" setting must be Yes for each event ([HubSpot KB: create and sync ad conversion events](https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account), last checked 17 Oct 2026).

That checkbox is set once, when the event is created. Anyone can change the action to Secondary later in Google Ads, and campaign settings can stop using the goal altogether. HubSpot keeps syncing either way.

## Four ways a synced stage gets ignored

**1. The stage is Secondary and not in a custom goal.** It shows in "All conv." and nowhere in bidding. This is common when someone followed Google's advice to keep a new ECL action Secondary for the first 2 to 3 weeks ([Google Ads Help: ECL implementation checklist](https://support.google.com/google-ads/answer/16782203?hl=en), last checked 17 Oct 2026) and nobody switched it back.

**2. The stage is Primary, but its goal isn't the one the campaign bids on.** If a campaign uses campaign-specific goals, only those goals count for that campaign. A Primary SQL action in the "Qualified lead" goal does nothing for a campaign set to bid on "Submit lead form" only.

**3. The campaign uses a custom goal that leaves the stage out.** One custom goal per campaign, and only its actions count.

**4. The stage is Primary, but so is the form fill.** Both count in "Conversions", and form fills usually outnumber SQLs, so the cheaper, more frequent action dominates what bidding chases. Google's lead generation guidance is to avoid selecting goals from multiple stages of your lead journey for optimisation ([Google Ads Help: best practices for generating high-quality leads](https://support.google.com/google-ads/answer/13489421?hl=en), last checked 17 Oct 2026).

## Check your account

1. **List every action.** In Google Ads, go to Goals > Conversions > Summary. For each conversion action, write down its goal, whether it is Primary or Secondary, and its source (website, import, HubSpot and so on).
2. **See what each campaign bids on.** In the Campaigns table, add the "Conversion goals" column: Columns > Modify columns > Attributes > Conversion goals ([Google Ads Help: campaign-specific goals](https://support.google.com/google-ads/answer/9143218?hl=en), last checked 17 Oct 2026). Campaigns showing a campaign-specific goal are not using the account defaults.
3. **Check custom goals.** On the conversions Summary page, scroll to the bottom and expand Custom goals. Note which actions each one contains and which campaigns use it.
4. **Compare columns.** Segment "All conv." by conversion action for the last 30 days. If your SQL action has numbers in "All conv." and zero in "Conversions", bidding isn't using it. Google says "All conversions" includes actions you've chosen not to include in "Conversions" ([Google Ads Help: about All conversions](https://support.google.com/google-ads/answer/3419678?hl=en), last checked 17 Oct 2026).
5. **Check HubSpot.** In HubSpot, Marketing > Ads > Events, confirm which stages have events and whether each was set as primary. Compare with what you found in Google Ads.

You now know, per campaign, which conversions Smart Bidding is learning from.

## Changing it safely

To change an action, Google's steps are: Goals > Conversions > Summary, find the goal, Edit goal, and choose Primary or Secondary (observe only) under "Conversion action optimisation" ([Google Ads Help](https://support.google.com/google-ads/answer/11461796?hl=en), last checked 17 Oct 2026).

Before you do:

- Google says Smart Bidding needs a standard 7 to 14 day learning phase and that changing conversion goals during it resets the learning window ([same page](https://support.google.com/google-ads/answer/11461796?hl=en)). Make the change once, deliberately.
- If you move from form fills to SQLs, your cost per conversion will rise because SQLs are rarer. Google's advice is to adjust targets gradually as the bidding models adjust, to avoid swings in spend ([Google Ads Help: campaign-specific goals](https://support.google.com/google-ads/answer/9143218?hl=en), last checked 17 Oct 2026).
- Check the stage has enough volume first. Google's lead generation guidance asks for at least 15 conversions in the last 30 days at account level ([Google Ads Help](https://support.google.com/google-ads/answer/13489421?hl=en), last checked 17 Oct 2026). We cover choosing the stage in [Bid on pipeline, not form fills](/guides/bid-on-pipeline-not-form-fills).

> **What we check**
>
> For this part of the connection, we:
>
> 1. List every conversion action with its goal, Primary or Secondary status and source.
> 2. Record which goals each campaign bids on, including campaign-specific and custom goals.
> 3. Match each HubSpot stage event to its Google Ads action and confirm it is counted for bidding where you want it to be.
> 4. Flag duplicates, tests and leftovers sitting in a bidding goal.
> 5. Compare "Conversions" and "All conv." per action for the same period.
>
> Any change is made only with your sign-off, with a note on how to reverse it. See the [sample report](/method) for how this is written up.

## Want a second pair of eyes?

If you'd like us to check which of your HubSpot stages Google Ads is actually bidding on, book a 20-minute fit call: https://cal.com/closedlogic/20min-fit

## Sources

All last checked 17 Oct 2026.

- Google Ads Help, about primary and secondary conversion actions: https://support.google.com/google-ads/answer/11461796?hl=en
- Google Ads Help, about campaign-specific conversion goals: https://support.google.com/google-ads/answer/9143218?hl=en
- Google Ads Help, about "All conversions": https://support.google.com/google-ads/answer/3419678?hl=en
- Google Ads Help, best practices for generating high-quality leads: https://support.google.com/google-ads/answer/13489421?hl=en
- Google Ads Help, ECL implementation checklist: https://support.google.com/google-ads/answer/16782203?hl=en
- HubSpot KB, create and sync ad conversion events (last updated 12 Oct 2026): https://knowledge.hubspot.com/ads/create-and-sync-ad-conversion-events-with-your-google-ads-account

<!-- editor-notes: everything below this line is for the team, not for publication -->

## Editor notes

**Suggested internal links in:** homepage section "Syncing a stage isn't the same as bidding on it" with anchor "Primary vs Secondary conversion actions"; /sample-report finding "Qualified stages are imported but not used for bidding".

**Links out:** /guides/bid-on-pipeline-not-form-fills (pillar), /sample-report (money page). Sibling: add a link to /guides/hubspot-google-ads-offline-conversions in the "Where HubSpot comes in" section if the editor wants one.

**Title change from plan.md:** plan title "Your HubSpot stages sync to Google Ads. Is bidding using them?" changed so the target keyword is in the title and H1.

**Graphic brief for Nova:** use the existing files: google-ads-primary-vs-secondary-conversions-og.png, -twitter.png, and -diagram-1.png placed under "Four ways a synced stage gets ignored", alt text "Two lanes, Bid on and Reported. A qualified stage sits in Reported and should move to Bid on." Nova's OG headline ("HubSpot stages sync to Google Ads, but is bidding using them?") follows the plan's working title; it still suits the new title, so no re-render is needed. Optional extra: a screenshot of the Google Ads "Edit goal" panel showing "Primary" and "Secondary (observe only)" for the "Changing it safely" section, only with no client data and no vendor logos.
