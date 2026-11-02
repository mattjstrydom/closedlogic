// HubSpot embedded form plus an optional RevenueHero / ScheduleHero booking. Handles both HubSpot embeds:
// - legacy forms (v2 embed: forms/embed/v2.js with hbspt.forms.create, in the page or in an hs-form-iframe-*), and
// - forms built in HubSpot's updated forms editor (v4 embed: forms/embed/<portal>.js with a .hs-form-frame div).
//
// Sources, for anyone checking this snippet:
// - Legacy forms: embedded forms post window messages {type: "hsFormCallback", eventName: "onFormSubmitted",
//   id: <form GUID>, data: {...}}. https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms
// - Updated forms editor: the form dispatches a window event "hs-form-event:on-submission:success" whose
//   event.detail holds { formId, instanceId }.
//   https://developers.hubspot.com/docs/api-reference/latest/marketing/forms/global-form-events
// - RevenueHero JavaScript events (MEETING_BOOKED, sent from the scheduler popup, which is served from
//   popup.schedulehero.io): https://help.revenuehero.io/integrations/javascript-events
// - GTM Custom Event triggers: https://support.google.com/tagmanager/answer/7679219
// - GTM Preview mode: https://support.google.com/tagmanager/answer/6107056
//
// One guard per event name, shared by both form paths: a page load counts at most one demo_form_submitted, however
// many embeds or event types report the same submit. The listener only pushes an event name and the form ID: no form
// values go into the dataLayer.
const EMBEDS = {
  "v2-embed": "HubSpot\u2019s legacy embed (<code>embed/v2.js</code> with <code>hbspt.forms.create</code>)",
  "v4-embed": "HubSpot\u2019s updated forms editor embed (a <code>hs-form-frame</code> div)",
};
export default {
  tool: "HubSpot embedded form",
  ready: true,
  docs: "https://developers.hubspot.com/docs/api-reference/latest/marketing/forms/global-form-events",
  build({ formId, variant }) {
    if (!/^[0-9a-f-]{36}$/.test(formId || "")) throw new Error("hubspot fix needs the form GUID");
    const snippet = `<script>
/* One Google Ads conversion per real demo request.
   HubSpot legacy forms:  https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms
   HubSpot new editor:    https://developers.hubspot.com/docs/api-reference/latest/marketing/forms/global-form-events
   RevenueHero events:    https://help.revenuehero.io/integrations/javascript-events */
(function () {
  var FORM_ID = "${formId}"; // if the form is rebuilt in HubSpot's new editor, check this ID still matches
  var sent = {};
  function push(name) {
    if (sent[name]) return; // one per page load, whichever embed or event reports it
    sent[name] = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, form_id: FORM_ID });
  }
  // HubSpot forms from the updated editor
  window.addEventListener("hs-form-event:on-submission:success", function (e) {
    if (e.detail && e.detail.formId === FORM_ID) push("demo_form_submitted");
  });
  // HubSpot legacy forms, and RevenueHero bookings
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (typeof d === "string") { try { d = JSON.parse(d); } catch (err) { return; } }
    if (!d || typeof d !== "object") return;
    if (d.type === "hsFormCallback" && d.eventName === "onFormSubmitted" &&
        (d.id === FORM_ID || (d.data && d.data.formGuid === FORM_ID))) push("demo_form_submitted");
    // RevenueHero's booking popup is served from popup.schedulehero.io, so keep schedulehero.io; revenuehero.io is allowed too.
    if (d.type === "MEETING_BOOKED" &&
        /^https:\\/\\/([a-z0-9-]+\\.)?(schedulehero|revenuehero)\\.io$/.test(e.origin)) push("demo_meeting_booked");
  });
})();
</script>`;
    // One plain sentence for the page, only when capture.mjs could tell which embed the form uses (never guessed).
    const embedNote = EMBEDS[variant]
      ? `Your demo form uses ${EMBEDS[variant]}, and the listener handles both that and forms built in HubSpot\u2019s updated forms editor, so it still works if the form is moved over.`
      : null;
    return {
      snippet,
      embedNote,
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
