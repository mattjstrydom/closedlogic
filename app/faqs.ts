// FAQ rows shared by the home page and /free-check (visible text and FAQPage JSON-LD render from the same strings).
export type Faq = { q: string; a: string };

export const checkFaqs: Faq[] = [
  { q: "What do you need for the free check?", a: "Just your website address. We look from outside, the way any browser does. No logins and no form submissions." },
  { q: "Is it really free?", a: "Yes. There's no obligation and no follow-up sequence unless you reply." },
  { q: "Will you change anything without asking?", a: "No. Every change is agreed in writing first and recorded in a change log you keep." },
  { q: "What happens after I submit the form?", a: "We reply within 1 business day with what we found, or tell you if we couldn't find anything worth fixing." },
];

export const homeFaqs: Faq[] = [
  checkFaqs[0],
  checkFaqs[1],
  checkFaqs[2],
  { q: "How much access do you need?", a: "For the check, none. For a fix, read-only access where possible, and edit access only for the specific settings in scope." },
  { q: "We have an agency. Do we need to switch?", a: "No. We can send our findings to your agency, or fix them alongside it." },
  { q: "What if the fix doesn't work?", a: "If a conversion we set up doesn't fire as agreed within 30 days of handover, we fix it at no charge." },
  { q: "Do you take a percentage of ad spend?", a: "No. We sell no media and our prices are fixed." },
  checkFaqs[3],
];
