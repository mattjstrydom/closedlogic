// HubSpot embedded form (v2 embed in an iframe, hs-form-iframe-*) plus an optional RevenueHero / ScheduleHero booking.
//
// Sources, for anyone checking this snippet:
// - HubSpot global form events: embedded forms post window messages {type: "hsFormCallback", eventName:
//   "onFormSubmitted", id: <form GUID>, data: {...}}. https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms
// - RevenueHero JavaScript events (MEETING_BOOKED, sent from the scheduler popup, which is served from
//   popup.schedulehero.io): https://help.revenuehero.io/integrations/javascript-events
// - GTM Custom Event triggers: https://support.google.com/tagmanager/answer/7679219
// - GTM Preview mode: https://support.google.com/tagmanager/answer/6107056
//
// The listener only pushes an event name and the form ID: no form values go into the dataLayer.
export default {
  tool: "HubSpot embedded form",
  ready: true,
  docs: "https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms",
  build({ formId }) {
    if (!/^[0-9a-f-]{36}$/.test(formId || "")) throw new Error("hubspot fix needs the form GUID");
    const snippet = `<script>
/* One Google Ads conversion per real demo request.
   HubSpot form events: https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms
   RevenueHero events:  https://help.revenuehero.io/integrations/javascript-events */
(function () {
  var FORM_ID = "${formId}";
  var sent = {};
  function push(name) {
    if (sent[name]) return; // the form is embedded twice on /demo: count it once
    sent[name] = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, form_id: FORM_ID });
  }
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (typeof d === "string") { try { d = JSON.parse(d); } catch (err) { return; } }
    if (!d || typeof d !== "object") return;
    if (d.type === "hsFormCallback" && d.eventName === "onFormSubmitted" &&
        (d.id === FORM_ID || (d.data && d.data.formGuid === FORM_ID))) push("demo_form_submitted");
    if (d.type === "MEETING_BOOKED" &&
        /^https:\\/\\/([a-z0-9-]+\\.)?(schedulehero|revenuehero)\\.io$/.test(e.origin)) push("demo_meeting_booked");
  });
})();
</script>`;
    return {
      snippet,
      gtm: {
        tag: "Custom HTML, named \"CL - demo form listener\", trigger: Page View where Page Path contains /demo",
        triggers: [
          "Custom Event \"demo_form_submitted\" → use as the only trigger on the form-submit conversion tag",
          "Custom Event \"demo_meeting_booked\" → use as the only trigger on the booking conversion tag",
        ],
      },
    };
  },
};
