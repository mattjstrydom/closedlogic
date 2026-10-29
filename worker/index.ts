// The site's only server code: POST /api/request, the contact form (B2B SaaS requests, and PE requests when SHOW_PE is on),
// and byte ranges for the unlisted video files (/v/*.mp4, see serveVideo). Everything else is a static file served by Workers
// static assets without running this Worker (wrangler.jsonc: run_worker_first ["/api/*", "/v/*.mp4"]).
// Free plan budget: 10 ms CPU per request and 100,000 Worker requests a day; this handler does a JSON parse, the
// shared validation, and two fetches to Sequenzy (waiting on fetch is not CPU time). See the dev report for measurements.
// Abuse: the honeypot and the Sec-Fetch-Site check below are speed bumps only. The rate limit is the FORM_LIMITER
// binding (wrangler.jsonc): more than 5 posts from one IP in 60 seconds get a 429 before anything is parsed or sent.
// It is approximate and per Cloudflare location, which is enough for a contact form.
import { validate, FORM_TYPES, type FormType, type Fields } from "../app/validate";
import { site } from "../app/site.config";

// The Workers Rate Limiting binding (wrangler.jsonc "ratelimits"; free on every Workers plan). Typed here because the
// project doesn't pull in @cloudflare/workers-types.
interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  ASSETS?: { fetch(req: Request): Promise<Response> }; // static assets binding (wrangler.jsonc "assets")
  FORM_LIMITER?: RateLimiter; // 5 form posts per IP per 60 s in each Cloudflare location (wrangler.jsonc)
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

  // Pages post b2b (or pe when SHOW_PE is on). Anything else (a cached page from the old site posting check, teardown or
  // partner) is a B2B request.
  const type: FormType = FORM_TYPES.includes(body.type as FormType) ? (body.type as FormType) : "b2b";
  // Where the visitor came from (?src= on the page): letters, numbers, dot, dash and underscore only.
  const source = str(body.source).replace(/[^\w.-]/g, "").slice(0, 40);
  const f: Fields = {
    name: str(body.name).trim(),
    email: str(body.email).trim(),
    company: str(body.company).trim(),
    role: str(body.role).trim(),
    size: str(body.size),
    stack: str(body.stack).trim(),
    note: str(body.note).trim(),
  };
  const errors = validate(f);
  if (Object.keys(errors).length) return json({ errors }, 422);

  const dryRun = env.FORM_DRY_RUN === "1";
  const key = env.SEQUENZY_API_KEY;
  if (!key && !dryRun) return json({ error: "Form is not configured." }, 500);

  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const label = { b2b: "B2B SaaS request", pe: "PE request" }[type];
  const tag = { b2b: "b2b-saas-request", pe: "pe-request" }[type];
  const rows: [string, string][] = [
    ["Type", label],
    ["Name", f.name],
    ["Email", f.email],
    ["Company", f.company],
    ["Role", f.role || "(none)"],
    ["Size", f.size],
    ["Stack", f.stack || "(none)"],
    ...(source ? ([["Source", source]] as [string, string][]) : []),
    ["Note", f.note || "(none)"],
  ];

  // 1) Store the lead. "overwrite" so a repeat submitter's latest details land
  //    (the default, "skip", leaves existing subscribers untouched).
  const subscriberBody = JSON.stringify({
    email: f.email,
    firstName: f.name.split(/\s+/)[0],
    tags: [tag],
    customAttributes: {
      fullName: f.name,
      company: f.company,
      role: f.role,
      size: f.size,
      stack: f.stack,
      note: f.note,
      requestType: type,
      source: site.domain,
      ...(source ? { campaignSource: source } : {}),
    },
    duplicateStrategy: "overwrite",
    enrollInSequences: false,
  });

  // 2) Email the submission to us. Replying goes to the submitter.
  const notifyBody = JSON.stringify({
    to: site.notifyTo,
    replyTo: `${oneLine(f.name) || "Lead"} <${oneLine(f.email)}>`,
    subject: `${label}: ${oneLine(f.name)} (${oneLine(f.company)})`,
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

// Workers static assets answer a Range request with the whole file (200), and Safari on iPhone and Mac won't play an MP4
// that way. The video pages' files are about 1.3 MB, so this reads the file from ASSETS and returns the asked-for slice
// as a 206. One Worker request per range; free plan.
async function serveVideo(req: Request, env: Env): Promise<Response> {
  if (!env.ASSETS) return new Response("Not found.", { status: 404 });
  if (req.method !== "GET" && req.method !== "HEAD") return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  const url = new URL(req.url);
  const asset = await env.ASSETS.fetch(new Request(url.toString(), { method: "GET" }));
  if (!asset.ok) return asset;
  const buf = await asset.arrayBuffer();
  const size = buf.byteLength;
  const headers = new Headers({
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600, no-transform",
    "X-Robots-Tag": "noindex, nofollow",
    "X-Content-Type-Options": "nosniff",
  });
  const etag = asset.headers.get("ETag");
  if (etag) headers.set("ETag", etag);
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get("Range")?.trim() ?? "");
  if (!m || (m[1] === "" && m[2] === "")) {
    headers.set("Content-Length", String(size));
    return new Response(req.method === "HEAD" ? null : buf, { status: 200, headers });
  }
  let start: number, end: number;
  if (m[1] === "") { start = Math.max(0, size - Number(m[2])); end = size - 1; } // suffix range: the last N bytes
  else { start = Number(m[1]); end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1); }
  if (start >= size || start > end) {
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(req.method === "HEAD" ? null : buf.slice(start, end + 1), { status: 206, headers });
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith("/v/") && pathname.endsWith(".mp4")) return serveVideo(req, env);
    if (pathname !== "/api/request") return json({ error: "Not found." }, 404);
    if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
    // Rate limit first, so a flood costs no parsing and never reaches Sequenzy.
    const ip = req.headers.get("cf-connecting-ip");
    if (env.FORM_LIMITER && ip) {
      const { success } = await env.FORM_LIMITER.limit({ key: `request:${ip}` });
      if (!success) return json({ error: "Too many requests. Wait a minute and try again." }, 429, { "Retry-After": "60" });
    }
    return handleRequest(req, env);
  },
};

export default worker;
