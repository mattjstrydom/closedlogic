// The two guarantee FAQs, shown (and in the FAQPage JSON-LD) on /pricing. The wording of record is terms clauses 3.6 and 4.1
// (audit) and 5.7 (Signal Fix).
import { auditGuarantee, auditGuaranteeTest, fixGuarantee, fixRemedy } from "./offers";

export const guaranteeFaqs: { q: string; a: string }[] = [
  {
    q: "What does the audit guarantee cover?",
    a: `${auditGuarantee} We refund within 14 days of delivering the audit report, and you keep the report. ${auditGuaranteeTest}`,
  },
  {
    q: "What does the Signal Fix guarantee cover?",
    a: `${fixGuarantee} ${fixRemedy}`,
  },
];
