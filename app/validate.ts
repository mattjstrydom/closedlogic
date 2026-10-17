export const TIERS = ["Starter", "Professional", "Enterprise", "Not sure"] as const;

export type FormType = "check" | "teardown" | "stagecheck";
export type Fields = { name: string; email: string; website: string; tier: string; note: string };
export type Errors = Partial<Record<keyof Fields, string>>;

// Shared by the forms (inline messages) and the route handler (server-side check).
// For a teardown, `website` holds the page the ads point to and `tier` is unused.
export function validate(f: Fields, type: FormType = "check"): Errors {
  const e: Errors = {};
  // The stage check form asks for an email address only.
  if (type !== "stagecheck" && (!f.name.trim() || f.name.length > 120)) e.name = "Enter your name.";
  // No <, >, ", ,, ; or backslash: the worker interpolates this address into a Reply-To header, and those characters
  // are what make an address list or a malformed header. Apostrophes and + / . - are legal and stay allowed.
  if (!/^[^\s@<>",;\\]+@[^\s@<>",;\\]+\.[^\s@<>",;\\]{2,}$/.test(f.email.trim()) || f.email.length > 200)
    e.email = "Enter a work email like name@company.com.";
  if (type !== "stagecheck" && !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(f.website.trim()) || f.website.length > 300)
    e.website =
      type === "teardown"
        ? "Enter the page your ads point to, like example.com/landing."
        : "Enter your company website, like example.com.";
  if (type === "check" && !(TIERS as readonly string[]).includes(f.tier)) e.tier = "Choose a Marketing Hub tier.";
  if (f.note.length > 2000) e.note = "Shorten your note to 2,000 characters or fewer.";
  return e;
}
