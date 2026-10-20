export const SIZES = [
  "Under $5M ARR",
  "$5–10M ARR",
  "$10–25M ARR",
  "$25–50M ARR",
  "$50M+ ARR",
  "PE fund (5–20 portfolio companies)",
  "Other",
] as const;

export type FormType = "b2b" | "pe" | "partner";
export const FORM_TYPES: readonly FormType[] = ["b2b", "pe", "partner"];
export type Fields = { name: string; email: string; company: string; role: string; size: string; stack: string; note: string };
export type Errors = Partial<Record<keyof Fields, string>>;

// Shared by the form (inline messages) and the route handler (server-side check).
export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim() || f.name.length > 120) e.name = "Enter your name.";
  // No <, >, ", ,, ; or backslash: the worker interpolates this address into a Reply-To header, and those characters
  // are what make an address list or a malformed header. Apostrophes and + / . - are legal and stay allowed.
  if (!/^[^\s@<>",;\\]+@[^\s@<>",;\\]+\.[^\s@<>",;\\]{2,}$/.test(f.email.trim()) || f.email.length > 200)
    e.email = "Enter a work email like name@company.com.";
  if (!f.company.trim() || f.company.length > 200) e.company = "Enter your company.";
  if (f.role.length > 120) e.role = "Shorten your role to 120 characters or fewer.";
  if (!(SIZES as readonly string[]).includes(f.size)) e.size = "Choose your ARR or portfolio size.";
  if (f.stack.length > 300) e.stack = "Shorten your stack to 300 characters or fewer.";
  if (f.note.length > 2000) e.note = "Shorten your note to 2,000 characters or fewer.";
  return e;
}
