"use client";

import { useRef, useState } from "react";
import { track, readSource } from "@/app/analytics";
import { validateCheck, type CheckErrors } from "@/app/validate";

const input = "mt-1 block w-full rounded-[10px] border-2 border-solid border-ink bg-white px-4 py-3 text-[1rem] text-ink";

// Free outside-in check request: work email and company website. Posts to /api/request with type "check".
export default function CheckForm({ email }: { email: string }) {
  const [f, setF] = useState({ email: "", website: "" });
  const [errors, setErrors] = useState<CheckErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

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
      <div role="status" tabIndex={-1} ref={(el) => el?.focus()} className="card focus:outline-none">
        <p className="text-text-xl font-medium">Thanks. We&apos;ll reply with what we find.</p>
      </div>
    );

  const field = (k: "email" | "website", label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={`check-${k}`} className="block font-medium">{label}</label>
      {el}
      {errors[k] && <p id={`check-${k}-err`} className="mt-1 text-[1rem] text-error">{errors[k]}</p>}
    </div>
  );
  const aria = (k: "email" | "website") => ({ id: `check-${k}`, name: k, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `check-${k}-err` : undefined });

  return (
    <form ref={form} onSubmit={submit} noValidate className="space-y-5 text-left">
      {field("email", "Work email", <input {...aria("email")} required type="email" className={input} autoComplete="email" value={f.email} onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))} />)}
      {field("website", "Company website", <input {...aria("website")} required className={input} placeholder="example.com" autoComplete="url" value={f.website} onChange={(e) => setF((p) => ({ ...p, website: e.target.value }))} />)}
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
        Get a free outside-in check
      </button>
      <p className="text-body">No access needed. We look from outside and send you what we find.</p>
    </form>
  );
}
