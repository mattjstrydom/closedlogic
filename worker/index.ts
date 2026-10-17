// The site's only server code: POST /api/request. Only the teardown form is rendered today (the two /teardown pages);
// the handler also accepts type: "check", which no page posts yet. Everything else is a static file served by Workers
// static assets without running this Worker (wrangler.jsonc: run_worker_first ["/api/*"]).
// Free plan budget: 10 ms CPU per request and 100,000 Worker requests a day; this handler does a JSON parse, the
// shared validation, and two fetches to Sequenzy (waiting on fetch is not CPU time). See the dev report for measurements.
// Abuse: the honeypot and the Sec-Fetch-Site check below are speed bumps only. Real rate limiting needs a Cloudflare
// Rate Limiting rule on /api/request or Turnstile (see README, "Before the domain goes public").
import { validate, type FormType, type Fields } from "../app/validate";
import { site } from "../app/site.config";

interface Env {
  SEQUENZY_API_KEY?: string; // runtime secret (never in wrangler.jsonc or the repo)
  FORM_DRY_RUN?: string; // "1" builds both Sequenzy requests but sends nothing. Local testing only; never set in production.
}

const API = "https://api.sequenzy.com/api/v1";
const MAX_BODY = 16 * 1024; // the form sends well under 4 KB

const str = (v: unknown) => (typeof v === "string" ? v : "");
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
// keep header values (subject, reply-to name) on one line and free of address punctuation
const oneLine = (s: string) => s.replace(/[\r\n<>",;]+/g, " ").trim();

const json = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Robots-Tag": "noindex",
      ...extra,
    },
  });

// Read at most `cap` bytes and stop as soon as the cap is passed. Reading the whole body first (req.text()) and
// measuring it afterwards would buffer whatever a client sends, cap or not, so the cap would not protect memory.
async function readCapped(req: Request, cap: number): Promise<string | null> {
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > cap) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) {
    bytes.set(c, at);
    at += c.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

async function handleRequest(req: Request, env: Env): Promise<Response> {
  // Browsers label a fetch from our own page "same-origin"; a cross-site scripted post is refused. A direct client
  // can omit or forge the header, so this is a speed bump, not authentication (see "Abuse" above).
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return json({ error: "Forbidden." }, 403);

  if (Number(req.headers.get("content-length") || 0) > MAX_BODY) return json({ error: "Too large." }, 413);

  let body: Record<string, unknown>;
  try {
    const text = await readCapped(req, MAX_BODY);
    if (text === null) return json({ error: "Too large." }, 413);
    body = JSON.parse(text);
    if (!body || typeof body !== "object") throw new Error();
  } catch {
    return json({ error: "Bad request." }, 400);
  }

  // Honeypot: real visitors never fill it. Pretend success so bots don't retry.
  if (str(body.company_fax)) return json({ ok: true });

  const type: FormType = body.type === "teardown" ? "teardown" : body.type === "stagecheck" ? "stagecheck" : "check";
  // Where the visitor came from (?src= on the page): letters, numbers, dot, dash and underscore only.
  const source = str(body.source).replace(/[^\w.-]/g, "").slice(0, 40);
  const f: Fields = {
    name: str(body.name).trim(),
    email: str(body.email).trim(),
    website: str(body.website).trim(),
    tier: type === "check" ? str(body.tier) : "",
    note: str(body.note).trim(),
  };
  const errors = validate(f, type);
  if (Object.keys(errors).length) return json({ errors }, 422);

  const dryRun = env.FORM_DRY_RUN === "1";
  const key = env.SEQUENZY_API_KEY;
  if (!key && !dryRun) return json({ error: "Form is not configured." }, 500);

  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const label = type === "teardown" ? "Free teardown" : type === "stagecheck" ? "Stage check result" : "Check request";
  const rows: [string, string][] = [
    ["Type", label],
    ...(type === "stagecheck" ? [] : ([["Name", f.name]] as [string, string][])),
    ["Email", f.email],
    ...(type === "stagecheck" ? [] : ([[type === "teardown" ? "Page your ads point to" : "Company website", f.website]] as [string, string][])),
    ...(source ? ([["Source", source]] as [string, string][]) : []),
    ...(type === "check" ? ([["Marketing Hub tier", f.tier]] as [string, string][]) : []),
    ["Note", f.note || "(none)"],
  ];

  // 1) Store the lead. "overwrite" so a repeat submitter's latest details land
  //    (the default, "skip", leaves existing subscribers untouched).
  const subscriberBody = JSON.stringify({
    email: f.email,
    ...(type === "stagecheck" ? {} : { firstName: f.name.split(/\s+/)[0] }),
    tags: [type === "teardown" ? "teardown" : type === "stagecheck" ? "stage-check" : "check-request"],
    customAttributes: {
      fullName: f.name,
      note: f.note,
      requestType: type,
      source: type === "teardown" ? `${site.domain}/teardown` : type === "stagecheck" ? `${site.domain}/tools/stage-check` : site.domain,
      ...(source ? { campaignSource: source } : {}),
      website: f.website,
      ...(type === "check" ? { marketingHubTier: f.tier } : {}),
    },
    duplicateStrategy: "overwrite",
    enrollInSequences: false,
  });

  // 2) Email the submission to us. Replying goes to the submitter.
  const notifyBody = JSON.stringify({
    to: site.notifyTo,
    replyTo: `${oneLine(f.name) || "Lead"} <${oneLine(f.email)}>`,
    subject: `${label}: ${oneLine(type === "stagecheck" ? f.email : f.name)}`,
    html: `<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 sans-serif">${rows
      .map(([k, v]) => `<tr><td style="color:#5c6764;vertical-align:top"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
      .join("")}</table>`,
  });

  // Dry run: everything above ran, nothing leaves the Worker.
  if (dryRun) return json({ ok: true, dryRun: true, bytes: subscriberBody.length + notifyBody.length });

  const subscriber = fetch(`${API}/subscribers`, { method: "POST", headers, body: subscriberBody }).catch(() => null);
  const notify = fetch(`${API}/transactional/send`, {
    method: "POST",
    headers: { ...headers, "Idempotency-Key": crypto.randomUUID() },
    body: notifyBody,
  }).catch(() => null);

  const [s, n] = await Promise.all([subscriber, notify]);
  if (!s?.ok) console.error("sequenzy subscriber failed", s?.status);
  if (!n?.ok) console.error("sequenzy notify failed", n?.status);

  // the lead is safe if either went through
  if (!s?.ok && !n?.ok) return json({ error: "Upstream failed." }, 502);
  return json({ ok: true });
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(req.url);
    if (pathname !== "/api/request") return json({ error: "Not found." }, 404);
    if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
    return handleRequest(req, env);
  },
};

export default worker;
