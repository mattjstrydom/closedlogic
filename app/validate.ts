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
