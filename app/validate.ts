export const SIZES: readonly string[] = ["Under $5M ARR", "$5M to $10M ARR", "$10M to $25M ARR", "$25M to $50M ARR", "$50M+ ARR", "Other"];

// The partner white-label offer was removed on 27 Oct 2026: there is no partner request type any more.
export type FormType = "b2b";
export const FORM_TYPES: readonly FormType[] = ["b2b"];
export type Fields = { name: string; email: string; company: string; role: string; size: string; stack: string; note: string };
export type Errors = Partial<Record<keyof Fields, string>>;

// Shared by the form (inline messages) and the route handler (server-side check).
const EMAIL_RE = /^[^\s@<>",;\\]+@[^\s@<>",;\\]+\.[^\s@<>",;\\]{2,}$/;

// The free outside-in check form: work email and company website only.
export type CheckFields = { email: string; website: string; note?: string };
export type CheckErrors = Partial<Record<keyof CheckFields, string>>;
export function validateCheck(f: CheckFields): CheckErrors {
  const e: CheckErrors = {};
  if (!EMAIL_RE.test(f.email.trim()) || f.email.length > 200) e.email = "Enter a work email like name@company.com.";
  // A domain or a URL: letters, numbers, dots and dashes, with an optional https:// and path.
  if (!/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(f.website.trim()) || f.website.length > 200) e.website = "Enter your company website, like example.com.";
  if ((f.note ?? "").length > 2000) e.note = "Shorten your note to 2,000 characters or fewer.";
  return e;
}

export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim() || f.name.length > 120) e.name = "Enter your name.";
  // No <, >, ", ,, ; or backslash: the worker interpolates this address into a Reply-To header, and those characters
  // are what make an address list or a malformed header. Apostrophes and + / . - are legal and stay allowed.
  if (!/^[^\s@<>",;\\]+@[^\s@<>",;\\]+\.[^\s@<>",;\\]{2,}$/.test(f.email.trim()) || f.email.length > 200)
    e.email = "Enter a work email like name@company.com.";
  if (!f.company.trim() || f.company.length > 200) e.company = "Enter your company.";
  if (f.role.length > 120) e.role = "Shorten your role to 120 characters or fewer.";
  if (!SIZES.includes(f.size)) e.size = "Choose your ARR.";
  if (f.stack.length > 300) e.stack = "Shorten your stack to 300 characters or fewer.";
  if (f.note.length > 2000) e.note = "Shorten your note to 2,000 characters or fewer.";
  return e;
}
