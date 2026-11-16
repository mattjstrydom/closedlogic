"use client";

import { useRef, useState } from "react";
import { track, readSource } from "@/app/analytics";
import { validateCheck, type CheckErrors } from "@/app/validate";
import { checkConfirmation } from "@/app/offers";

// Free check request: work email and company website, plus an optional note on /contact. Posts to /api/request with type "check".
// variant "inline" is the compact hero form (field labels visually hidden, fields and button on one row);
// "stack" is the default (visible labels). Field names, ids, the honeypot and the tracking event are the same in both.
export default function CheckForm({ email, withNote = false, idPrefix = "check", variant = "stack" }: { email: string; withNote?: boolean; idPrefix?: string; variant?: "stack" | "inline" }) {
  const [f, setF] = useState({ email: "", website: "", note: "" });
  const [errors, setErrors] = useState<CheckErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);
  const inline = variant === "inline";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateCheck(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const source = readSource();
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, type: "check", source, company_fax: (form.current?.elements.namedItem("company_fax") as HTMLInputElement | null)?.value }),
      });
      if (res.status === 422) {
        setErrors((await res.json()).errors);
        setStatus("idle");
      } else {
        if (res.ok) track("check_request_submit", { source, page_path: window.location.pathname });
        setStatus(res.ok ? "ok" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok")
    return (
      <div role="status" tabIndex={-1} ref={(el) => el?.focus()} className="card !p-6 text-ink focus:outline-none">
        <p className="text-text-xl font-medium">{checkConfirmation}</p>
      </div>
    );

  const field = (k: "email" | "website" | "note", label: string, el: React.ReactNode) => (
    <div className={inline ? "cl-capture-field grid content-start gap-1" : "grid gap-2"}>
      <label htmlFor={`${idPrefix}-${k}`} className={inline ? "sr-only" : "cl-label"}>{label}</label>
      {el}
      {errors[k] && <p id={`${idPrefix}-${k}-err`} className="cl-error">{errors[k]}</p>}
    </div>
  );
  const aria = (k: "email" | "website" | "note") => ({ id: `${idPrefix}-${k}`, name: k, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${idPrefix}-${k}-err` : undefined });
  const input = "cl-input";

  const fields = (
    <>
      {field("email", "Work email", <input {...aria("email")} required type="email" className={input} placeholder={inline ? "you@company.com" : undefined} autoComplete="email" value={f.email} onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))} />)}
      {field("website", "Company website", <input {...aria("website")} required className={input} placeholder="example.com" autoComplete="url" value={f.website} onChange={(e) => setF((p) => ({ ...p, website: e.target.value }))} />)}
      {withNote && field("note", "What you'd like checked (optional)", <textarea {...aria("note")} rows={4} className={input} value={f.note} onChange={(e) => setF((p) => ({ ...p, note: e.target.value }))} />)}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Leave this empty<input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
      </div>
    </>
  );
  const alert = (
    <div aria-live="assertive">
      {status === "error" && (
        <p className="cl-error">
          That didn&apos;t send. Check your connection and try again, or email <a href={`mailto:${email}`} className="link">{email}</a>.
        </p>
      )}
    </div>
  );
  const button = (
    <button type="submit" className={`btn cursor-pointer disabled:cursor-wait disabled:opacity-70 ${inline ? "max-[519px]:w-full" : "w-full sm:w-auto"}`} disabled={status === "sending"}>
      Get my free check
    </button>
  );
  const help = <p className="cl-help">No logins. No obligation. We reply within 1 business day.</p>;

  return inline ? (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-3 text-left">
      <div className="cl-capture items-start">
        {fields}
        {button}
      </div>
      {alert}
      {help}
    </form>
  ) : (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-5 text-left">
      {fields}
      {alert}
      {button}
      {help}
    </form>
  );
}
