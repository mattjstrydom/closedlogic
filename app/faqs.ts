// FAQ rows: the home page has its own set; /free-check and /signal-fix share the check questions (visible text and FAQPage JSON-LD render from the same strings).
export type Faq = { q: string; a: string };

export const checkFaqs: Faq[] = [
  { q: "What do you need for the free check?", a: "Just your website address. We look from outside, the way any browser does. No logins and no form submissions." },
  { q: "Is it really free?", a: "Yes. There's no obligation and no follow-up sequence unless you reply." },
  { q: "Will you change anything without asking?", a: "No. Every change is agreed in writing first and recorded in a change log you keep." },
  { q: "What happens after I submit the form?", a: "We reply within 1 business day with what we found, or tell you if we couldn't find anything worth fixing." },
];

export const homeFaqs: Faq[] = [
  { q: "What does on-demand marketing ops mean?", a: "You get the ops work done without hiring for it: one fixed-scope job or a monthly plan." },
  { q: "Which tools do you work with?", a: "The CRM, analytics and ad platforms B2B teams commonly run on. Tell us your stack on the call, and if it's outside what we do well, we'll say so before any scope is agreed." },
  { q: "We have an agency. Do we need to switch?", a: "No. We work alongside your agency or hand our findings to them." },
  { q: "How much access do you need?", a: "Read-only where possible. Edit access only for the specific settings in scope." },
  { q: "Will you change anything without asking?", a: "No. Every change is agreed in writing and recorded in a change log you keep." },
  { q: "Do you take a percentage of ad spend?", a: "No. We sell no media and our prices are fixed." },
];
