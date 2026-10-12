"use client";

import { useRef, useState } from "react";
import { TIERS, validate, type Errors, type Fields, type FormType } from "@/app/validate";

const empty: Fields = { name: "", email: "", website: "", tier: "", note: "" };
const input =
  "mt-1 block w-full rounded-chip border border-solid border-[#7b8a86] bg-gray-50 px-3 py-2.5 text-[1rem] text-black transition-colors duration-300 hover:border-black";

// email and calUrl come from site.config through the (server) page, so this client bundle doesn't carry the whole config.
export default function RequestForm({ type = "check", email, calUrl, agency = false }: { type?: FormType; email: string; calUrl: string; agency?: boolean }) {
  const teardown = type === "teardown";
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(f, type);
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
        body: JSON.stringify({ ...f, type, company_fax: (form.current?.elements.namedItem("company_fax") as HTMLInputElement | null)?.value }),
      });
      if (res.status === 422) {
        setErrors((await res.json()).errors);
        setStatus("idle");
      } else setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok")
    return (
      // Focus moves here because the submit button that had it is gone; tabIndex -1 keeps it out of the tab order.
      <div role="status" tabIndex={-1} ref={(el) => el?.focus()} className="rounded-chip border border-gray-100 bg-white p-6 focus:outline-none">
        <p className="text-text-xl font-medium">
          {teardown ? "Thanks. We'll email you the recording." : "Thanks. We'll reply within one business day."}
        </p>
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
        {field("name", "Name", <input {...aria("name")} required className={input} autoComplete="name" value={f.name} onChange={set("name")} />)}
        {field("email", "Work email", <input {...aria("email")} required type="email" className={input} autoComplete="email" value={f.email} onChange={set("email")} />)}
        {field(
          "website",
          teardown ? (agency ? "The landing page to review" : "The page your ads point to") : "Company website",
          <input {...aria("website")} required className={input} autoComplete="url" inputMode="url" value={f.website} onChange={set("website")} />,
        )}
        {!teardown &&
          field(
            "tier",
            "Marketing Hub tier",
            <select {...aria("tier")} required className={input} value={f.tier} onChange={set("tier")}>
              <option value="">Select a tier</option>
              {TIERS.map((t) => <option key={t}>{t}</option>)}
            </select>,
          )}
        {field("note", "Note (optional)", <textarea {...aria("note")} rows={4} className={input} value={f.note} onChange={set("note")} />)}

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
          {teardown ? "Request a teardown" : "Request a check"}
        </button>
        <p className="text-gray-600">
          {teardown ? (agency ? "We'll email you the recording, unbranded." : "We'll email you the recording.") : "We reply within one business day."}
        </p>
      </form>
      {teardown ? (
        <p className="mt-6">
          {agency ? "Ready for a pilot?" : "Ready for the full check?"} <a href={calUrl} target="_blank" rel="noopener noreferrer" className="link">Book a 20-minute fit call<span className="sr-only"> (opens in a new tab)</span></a>
        </p>
      ) : (
        calUrl && (
          <p className="mt-6">
            Prefer to talk first?{" "}
            <a href={calUrl} target="_blank" rel="noopener noreferrer" className="link">
              Book a 20-minute fit call
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        )
      )}
    </>
  );
}
