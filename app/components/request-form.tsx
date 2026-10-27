"use client";

import { useEffect, useRef, useState } from "react";
import { track, readSource } from "@/app/analytics";
import { FORM_TYPES, SIZES, SIZE_LABEL, validate, type Errors, type Fields, type FormType } from "@/app/validate";

const empty: Fields = { name: "", email: "", company: "", role: "", size: "", stack: "", note: "" };
const input =
  "mt-1 block w-full rounded-[10px] border-2 border-solid border-ink bg-white px-4 py-3 text-[1rem] text-ink";

const typeLabels: Record<FormType, string> = { b2b: "B2B SaaS company", pe: "PE fund" };

// email and bookUrls come from site.config through the (server) page, so this client bundle doesn't carry the whole config.
export default function RequestForm({ initialType = "b2b", choose = false, email, bookUrls }: { initialType?: FormType; choose?: boolean; email: string; bookUrls: Partial<Record<FormType, string>> }) {
  const [type, setType] = useState<FormType>(initialType);
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);
  // Hidden "source" field: the ?src= value on the page address, so each request shows its channel.
  const source = useRef("");
  useEffect(() => {
    source.current = readSource();
  }, []);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, type, source: source.current, company_fax: (form.current?.elements.namedItem("company_fax") as HTMLInputElement | null)?.value }),
      });
      if (res.status === 422) {
        setErrors((await res.json()).errors);
        setStatus("idle");
      } else {
        if (res.ok) track("request_submit", { requestType: type, source: source.current, page_path: window.location.pathname });
        setStatus(res.ok ? "ok" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok")
    return (
      // Focus moves here because the submit button that had it is gone; tabIndex -1 keeps it out of the tab order.
      <div role="status" tabIndex={-1} ref={(el) => el?.focus()} className="card focus:outline-none">
        <p className="text-text-xl font-medium">Thanks. We&apos;ll reply within one business day.</p>
      </div>
    );

  const field = (k: keyof Fields, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={k} className="block font-medium">{label}</label>
      {el}
      {errors[k] && (
        <p id={`${k}-err`} className="mt-1 text-[1rem] text-error">{errors[k]}</p>
      )}
    </div>
  );
  const aria = (k: keyof Fields) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <>
      <form ref={form} onSubmit={submit} noValidate className="space-y-5">
        {/* The "I am a" choice only shows when there is more than one request type to choose from. */}
        {choose && FORM_TYPES.length > 1 && (
          <fieldset>
            <legend className="mb-2 block font-medium">I am a</legend>
            <div className="seg">
              {FORM_TYPES.map((t) => (
                <span key={t}>
                  <input type="radio" name="type" id={`type-${t}`} value={t} checked={type === t} onChange={() => setType(t)} className="seg-input sr-only" />
                  <label htmlFor={`type-${t}`} className="seg-item">{typeLabels[t]}</label>
                </span>
              ))}
            </div>
          </fieldset>
        )}
        {field("name", "Name", <input {...aria("name")} required className={input} autoComplete="name" value={f.name} onChange={set("name")} />)}
        {field("email", "Work email", <input {...aria("email")} required type="email" className={input} autoComplete="email" value={f.email} onChange={set("email")} />)}
        {field("company", "Company", <input {...aria("company")} required className={input} autoComplete="organization" value={f.company} onChange={set("company")} />)}
        {field("role", "Role (optional)", <input {...aria("role")} className={input} autoComplete="organization-title" value={f.role} onChange={set("role")} />)}
        {field(
          "size",
          SIZE_LABEL,
          <select {...aria("size")} required className={input} value={f.size} onChange={set("size")}>
            <option value="">Select a size</option>
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>,
        )}
        {field("stack", "Stack (optional)", <input {...aria("stack")} className={input} placeholder="HubSpot, Salesforce, Pipedrive, Google Ads, GA4" value={f.stack} onChange={set("stack")} />)}
        {field("note", "The number you can’t defend (optional)", <textarea {...aria("note")} rows={4} className={input} value={f.note} onChange={set("note")} />)}

        {/* honeypot: hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>Leave this empty<input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div aria-live="assertive">
          {status === "error" && (
            <p className="text-[1rem] text-error">
              That didn&apos;t send. Check your connection and try again, or email <a href={`mailto:${email}`} className="link">{email}</a>.
            </p>
          )}
        </div>
        <button type="submit" className="btn w-full cursor-pointer disabled:cursor-wait disabled:opacity-70 sm:w-auto" disabled={status === "sending"}>
          Book the review
        </button>
        <p className="text-body">We reply within one business day.</p>
      </form>
      <p className="mt-6">
        Prefer to pick a time now?{" "}
        <a href={bookUrls[type] ?? bookUrls.b2b} target="_blank" rel="noopener noreferrer" className="link">
          Book a 20-minute pipeline review
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </>
  );
}
