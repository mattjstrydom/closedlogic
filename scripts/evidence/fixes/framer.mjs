// Framer native form (Framer's own form component, submissions handled by Framer).
//
// Sources, for anyone checking this snippet:
// - Framer custom events: when a form that has a Tracking ID set is submitted, Framer dispatches
//   `framer:formsubmit` on document with event.detail = { trackingId }. Forms without a Tracking ID send nothing.
//   https://www.framer.com/help/articles/how-to-track-links-and-forms-in-framer/
// - GTM Custom Event triggers: https://support.google.com/tagmanager/answer/7679219
// - GTM Preview mode: https://support.google.com/tagmanager/answer/6107056
//
// Framer fires the event after a successful submit, so failed or invalid submits aren't counted. The listener only
// pushes an event name and the Tracking ID: no form values go into the dataLayer.
// Before rendering for a prospect: confirm on their page that the demo form is a Framer form (not an embedded HubSpot,
// Default or Chili Piper form) and read the Tracking ID they should set, e.g. "demo".
export default {
  tool: "Framer form",
  ready: true,
  docs: "https://www.framer.com/help/articles/how-to-track-links-and-forms-in-framer/",
  build({ trackingId = "demo", formPath = "/demo" } = {}) {
    if (!/^[\w-]{1,40}$/.test(trackingId)) throw new Error("framer fix needs a simple Tracking ID");
    const snippet = `<script>
/* One Google Ads conversion per real demo request.
   Framer form events: https://www.framer.com/help/articles/how-to-track-links-and-forms-in-framer/ */
(function () {
  var TRACKING_ID = "${trackingId}"; // set this as the Tracking ID on the demo form in Framer
  var sent = false;
  document.addEventListener("framer:formsubmit", function (e) {
    if (sent || !e.detail || e.detail.trackingId !== TRACKING_ID) return;
    sent = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "demo_form_submitted", form_id: TRACKING_ID });
  });
})();
</script>`;
    return {
      snippet,
      gtm: {
        tag: `Custom HTML, named "CL - demo form listener", trigger: Page View where Page Path contains ${formPath}`,
        triggers: ['Custom Event "demo_form_submitted" → use as the only trigger on the form-submit conversion tag'],
      },
      setup: `In Framer, select the demo form and set its Tracking ID to "${trackingId}", then publish. Without a Tracking ID Framer sends no event.`,
      test: `Test it in 2 minutes: open GTM Preview on ${formPath}. Load the page and click around: no form-submit conversion should fire. Submit one test request: demo_form_submitted should appear once, with the form-submit tag under Tags Fired. Delete the test lead afterwards.`,
    };
  },
};
