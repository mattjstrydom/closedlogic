"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track, readSource } from "../analytics";
import TrackedLink from "./tracked-link";

type Answer = "yes" | "no" | "unsure";
type Band = 1 | 2 | 3;

// One question per check. "Yes" is the answer that needs no follow-up; "no" and "not sure" are counted.
const questions = [
  "Have you checked which conversions your campaigns bid on, and removed duplicates, tests and leftovers?",
  "Is a lifecycle stage (MQL, SQL or opportunity) set as a Primary goal for the campaign, and does it fire?",
  "Are you sure no stage is sent to Google Ads more than once, for example through HubSpot, Data Manager and an automation?",
  "Do your contacts reach Google with a click ID or contact data (email, phone or address), and is Google's combined enhanced conversions setting on?",
  "Have you ruled out legacy offline imports, custom API uploads and manager-account routing that HubSpot can't connect?",
  "Are consent signals set correctly for visitors from the EEA?",
  "Have you compared HubSpot's stage changes with Google Ads conversions for the same period, and can you explain any gap?",
];

/** Bands by the number of answers that were "no" or "not sure": 0 to 1, 2 to 4, 5 to 7. */
export function bandFor(flagged: number): Band {
  return flagged <= 1 ? 1 : flagged <= 4 ? 2 : 3;
}

const bands: Record<Band, { name: string; img: string; alt: string }> = {
  1: { name: "Looks aligned", img: "/tools/stage-check-band-1.png", alt: "Result: looks aligned. Your answers suggest the main pieces line up. Still check that the stage you care about is the one bidding uses. Next step: read the guide." },
  2: { name: "A few things to check", img: "/tools/stage-check-band-2.png", alt: "Result: a few things to check. Some answers were no or not sure. Check which stages are Primary, and whether click IDs reach HubSpot. Next step: request a teardown." },
  3: { name: "Worth a closer look", img: "/tools/stage-check-band-3.png", alt: "Result: worth a closer look. Several answers were no or not sure. A closer look at what bidding counts will show where to start. Next step: book a call." },
};

const choices: [Answer, string][] = [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]];
const input = "mt-1 block w-full rounded-[10px] border-2 border-solid border-ink bg-white px-4 py-3 text-[1rem] text-ink";

export default function StageCheck({ calUrl, guideUrl, email }: { calUrl: string; guideUrl: string; email: string }) {
  const [a, setA] = useState<(Answer | "")[]>(() => questions.map(() => ""));
  const [band, setBand] = useState<Band | null>(null);
  const [error, setError] = useState("");
  const [src, setSrc] = useState("");
  const started = useRef(false);
  const source = useRef("");
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    source.current = readSource();
  }, []);

  function pick(i: number, v: Answer) {
    if (!started.current) {
      started.current = true;
      track("stage_check_start", { source: source.current });
    }
    setA((p) => p.map((x, j) => (j === i ? v : x)));
    setError("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const missing = a.findIndex((x) => !x);
    if (missing >= 0) {
      setError(`Answer question ${missing + 1} to see your result.`);
      document.getElementById(`q${missing + 1}`)?.focus();
      return;
    }
    const b = bandFor(a.filter((x) => x !== "yes").length);
    setBand(b);
    setSrc(source.current);
    track("stage_check_complete", { band: b, source: source.current });
    requestAnimationFrame(() => result.current?.focus());
  }

  if (band) return <Result band={band} answers={a as Answer[]} source={src} calUrl={calUrl} guideUrl={guideUrl} email={email} box={result} onRestart={() => { setBand(null); setA(questions.map(() => "")); started.current = false; window.scrollTo({ top: 0 }); }} />;

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {questions.map((q, i) => (
        <fieldset key={q} className="tile border border-solid border-rule p-5">
          <legend id={`q${i + 1}`} tabIndex={-1} className="float-left w-full text-text-l font-medium">
            <span className="text-accent">{i + 1}.</span> {q}
          </legend>
          <div className="clear-both flex flex-wrap gap-3 pt-3">
            {choices.map(([v, label]) => (
              <label key={v} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[10px] border-2 border-solid border-ink bg-white px-4 py-2 has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
                <input type="radio" name={`q${i + 1}`} value={v} checked={a[i] === v} onChange={() => pick(i, v)} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div aria-live="assertive">{error && <p className="text-[1rem] text-error">{error}</p>}</div>
      <button type="submit" className="btn w-full cursor-pointer sm:w-auto">See my result</button>
      <p className="text-body">Your answers stay in your browser unless you choose to email us the result.</p>
    </form>
  );
}

function Result({ band, answers, source, calUrl, guideUrl, email, box, onRestart }: { band: Band; answers: Answer[]; source: string; calUrl: string; guideUrl: string; email: string; box: React.RefObject<HTMLDivElement | null>; onRestart: () => void }) {
  const b = bands[band];
  const [addr, setAddr] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");
  const flagged = answers.filter((x) => x !== "yes").length;

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@<>",;\\]+@[^\s@<>",;\\]+\.[^\s@<>",;\\]{2,}$/.test(addr.trim())) return setStatus("invalid");
    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "stagecheck",
          email: addr.trim(),
          source,
          note: `Band ${band}: ${b.name}. ${flagged} of ${answers.length} answers were no or not sure. Answers: ${answers.map((x, i) => `${i + 1} ${x}`).join(", ")}.`,
          company_fax: (document.querySelector('[name="company_fax"]') as HTMLInputElement | null)?.value,
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  const click = (event: string) => ({ event, params: { band: String(band), source } });
  return (
    <div ref={box} tabIndex={-1} className="space-y-8 focus:outline-none" aria-live="polite">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.img} alt={b.alt} width={1024} height={597} className="h-auto w-full max-w-[640px] rounded-[10px]" />
      <p className="max-w-[60ch] text-text-l">
        {flagged} of {answers.length} answers were no or not sure. This is a quick self-check from your own answers. It doesn&apos;t look at your accounts, so it can&apos;t tell you what is wrong, only what to check.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {band === 1 && <TrackedLink href={guideUrl} event="stage_check_click_guide" params={click("").params} className="btn w-full sm:w-auto">Read the guide</TrackedLink>}
        {band === 2 && <TrackedLink href="/teardown" event="stage_check_click_teardown" params={click("").params} className="btn w-full sm:w-auto">Request a free teardown</TrackedLink>}
        {band === 3 && <TrackedLink href={calUrl} external event="stage_check_click_cal" params={click("").params} className="btn w-full sm:w-auto">Book a 20-minute fit call</TrackedLink>}
        {band !== 2 && <TrackedLink href="/teardown" event="stage_check_click_teardown" params={click("").params} className="btn-outline w-full sm:w-auto">Request a free teardown</TrackedLink>}
        {band === 2 && <TrackedLink href={calUrl} external event="stage_check_click_cal" params={click("").params} className="btn-outline w-full sm:w-auto">Book a 20-minute fit call</TrackedLink>}
        {band === 3 && <TrackedLink href={guideUrl} event="stage_check_click_guide" params={click("").params} className="btn-outline w-full sm:w-auto">Read the guide</TrackedLink>}
      </div>

      <form onSubmit={send} noValidate className="tile max-w-[36rem] border border-solid border-rule p-5 sm:p-6">
        {status === "ok" ? (
          <p role="status" className="font-medium">Thanks. We&apos;ll email you within 3 business days.</p>
        ) : (
          <>
            <label htmlFor="sc-email" className="block font-medium">Want us to email you about this result? (optional)</label>
            <input id="sc-email" name="email" type="email" autoComplete="email" value={addr} onChange={(e) => { setAddr(e.target.value); setStatus("idle"); }} className={input} aria-invalid={status === "invalid" ? true : undefined} />
            {/* honeypot: hidden from people and assistive tech */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>Leave this empty<input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <div aria-live="assertive">
              {status === "invalid" && <p className="mt-1 text-[1rem] text-error">Enter an email like name@company.com.</p>}
              {status === "error" && <p className="mt-1 text-[1rem] text-error">That didn&apos;t send. Try again, or email <a href={`mailto:${email}`} className="link">{email}</a>.</p>}
            </div>
            <button type="submit" className="btn mt-4 cursor-pointer disabled:cursor-wait disabled:opacity-70" disabled={status === "sending"}>Email me about my result</button>
            <p className="mt-3 text-body">We receive your email, your result and your answers to the seven questions, and nothing else. See our <Link href="/privacy" className="link">privacy policy</Link>.</p>
          </>
        )}
      </form>
      <button type="button" onClick={onRestart} className="link cursor-pointer">Start again</button>
    </div>
  );
}
