// Webflow native form (the Form Block; Webflow handles the submission).
//
// Sources, for anyone checking this snippet:
// - Webflow submits forms with AJAX, so the page doesn't reload and page-view conversion tags don't fire on submit;
//   Webflow's own guide recommends a thank-you page redirect or a success-state trigger:
//   https://webflow.com/integrations/google-ads
// - Webflow has no public JavaScript submit event. On success it shows the form's success message (.w-form-done,
//   display: block) and hides the form, so the listener watches for that:
//   https://help.webflow.com/hc/en-us/articles/33961347548563-Forms-overview (Success message "displays after a form is
//   successfully submitted"). The class names (.w-form, .w-form-done) are Webflow's published markup, not a documented API;
//   seen on aurasell.ai/schedule-a-demo on 31 Oct 2026. Re-check them on the prospect's page before rendering.
// - GTM Custom Event triggers: https://support.google.com/tagmanager/answer/7679219
// - GTM Preview mode: https://support.google.com/tagmanager/answer/6107056
//
// Don't use GTM's built-in Form Submission trigger on Webflow: it fires on the attempt, before Webflow accepts it.
// The listener only pushes an event name and the form's data-name: no form values go into the dataLayer.
// If the prospect's form redirects to a thank-you page instead, use a Page View trigger on that page and skip this.
export default {
  tool: "Webflow form",
  ready: true,
  docs: "https://webflow.com/integrations/google-ads",
  build({ formName, formPath = "/demo" } = {}) {
    if (!formName || !/^[\w .-]{1,60}$/.test(formName)) throw new Error("webflow fix needs the form's data-name");
    const snippet = `<script>
/* One Google Ads conversion per real demo request.
   Webflow forms submit with AJAX and show .w-form-done on success: https://webflow.com/integrations/google-ads */
(function () {
  var FORM_NAME = "${formName}"; // the demo form's data-name attribute
  function watch(wrapper) {
    var form = wrapper.querySelector("form");
    var done = wrapper.querySelector(".w-form-done");
    if (!form || !done || form.getAttribute("data-name") !== FORM_NAME) return;
    var sent = false;
    new MutationObserver(function () {
      if (sent || window.getComputedStyle(done).display === "none") return;
      sent = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "demo_form_submitted", form_id: FORM_NAME });
    }).observe(done, { attributes: true, attributeFilter: ["style", "class"] });
  }
  function init() { document.querySelectorAll(".w-form").forEach(watch); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
</script>`;
    return {
      snippet,
      gtm: {
        tag: `Custom HTML, named "CL - demo form listener", trigger: DOM Ready where Page Path contains ${formPath}`,
        triggers: ['Custom Event "demo_form_submitted" → use as the only trigger on the form-submit conversion tag'],
      },
      test: `Test it in 2 minutes: open GTM Preview on ${formPath}. Click Submit with a required field empty: nothing should fire. Then submit one test request: when the success message shows, demo_form_submitted should appear once, with the form-submit tag under Tags Fired. Delete the test submission in Webflow afterwards.`,
    };
  },
};
