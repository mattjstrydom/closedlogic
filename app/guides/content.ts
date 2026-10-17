// Guides content loader. Posts are markdown files in content/guides/ (see content/guides/README.md). Everything runs at
// build time (static export). A post is only built into the public site when `status: published` and its
// datePublished is not in the future. SHOW_DRAFTS=1 (local preview only) builds every status, with a DRAFT banner and noindex.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked, type Tokens } from "marked";
import { site } from "../site.config";

const DIR = join(process.cwd(), "content", "guides");
const PUBLIC = join(process.cwd(), "public", "guides");

export type Status = "draft" | "ready" | "published";
export type PillarKey = "A" | "B" | "C" | "D" | "E";

export const pillars: Record<PillarKey, { name: string; slug: string }> = {
  A: { name: "Bid on pipeline, not form fills", slug: "bid-on-pipeline-not-form-fills" },
  B: { name: "The HubSpot to Google Ads connection", slug: "hubspot-google-ads-conversion-tracking" },
  C: { name: "Click IDs, matching and consent", slug: "gclid-hubspot" },
  D: { name: "Troubleshooting and audits", slug: "hubspot-google-ads-audit-checklist" },
  E: { name: "For agencies", slug: "agencies-guides" },
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  targetKeyword: string;
  type: "pillar" | "post";
  pillar: PillarKey;
  cta: "direct" | "agency";
  status: Status;
  related: string[];
  lastChecked?: string;
  datePublished: string;
  dateModified: string;
  isDraft: boolean; // true when shown only because of SHOW_DRAFTS
  ogImage?: { url: string; width: number; height: number };
  twitterImage?: { url: string; width: number; height: number };
  ogAlt: string;
  readingMinutes: number;
  html: string;
};

export const showDrafts = process.env.SHOW_DRAFTS === "1";
if (showDrafts && site.indexable) throw new Error("SHOW_DRAFTS=1 is for local previews only: it cannot be used on an indexable (production) build.");

function parseFrontmatter(raw: string, file: string): { data: Record<string, string | string[]>; body: string } {
  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const data: Record<string, string | string[]> = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: cannot read frontmatter line "${line}"`);
    let v = kv[2].trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      data[kv[1]] = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      continue;
    }
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1).replace(/\\"/g, '"');
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

function pngSize(file: string): { width: number; height: number } | undefined {
  try {
    const b = readFileSync(file);
    if (b.length > 24 && b.toString("ascii", 1, 4) === "PNG") return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  } catch {}
  return undefined;
}

function render(body: string, known: Set<string>): string {
  const seen = new Map<string, number>();
  const md = new Marked({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(inner) || "section";
        const n = seen.get(id) ?? 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      table(token: Tokens.Table) {
        const head = token.header.map((c, i) => `<th scope="col"${token.align[i] ? ` style="text-align:${token.align[i]}"` : ""}>${this.parser.parseInline(c.tokens)}</th>`).join("");
        const rows = token.rows.map((r) => `<tr>${r.map((c, i) => `<td${token.align[i] ? ` style="text-align:${token.align[i]}"` : ""}>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`).join("");
        return `<div class="guide-table" tabindex="0" role="region" aria-label="Table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        // Links to guides this build does not contain (unwritten, draft or not yet published) show as plain text.
        const m = href.match(/^(?:https:\/\/www\.closedlogic\.com)?\/guides\/([^/#?]+)\/?(?:[#?].*)?$/);
        if (m && !known.has(m[1])) return inner;
        const esc = (x: string) => x.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
        return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ""}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        // A bare file name means public/guides/<file>.
        const src = /^(https?:)?\/\//.test(href) || href.startsWith("/") ? href : `/guides/${href.replace(/^\.?\//, "")}`;
        const dim = src.startsWith("/guides/") ? pngSize(join(PUBLIC, src.slice("/guides/".length))) : undefined;
        const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
        return `<img src="${esc(src)}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ""}${dim ? ` width="${dim.width}" height="${dim.height}"` : ""} loading="lazy" decoding="async">`;
      },
    },
  });
  // The page template renders the title as the H1, so drop the body's own first H1.
  const withoutH1 = body.split("<!-- editor-notes")[0].replace(/^\s*# .*\n/, "");
  return md.parse(withoutH1) as string;
}

let cache: Guide[] | undefined;

/** Every guide that this build is allowed to show: published and not future dated, plus all others when SHOW_DRAFTS=1. */
export function allGuides(): Guide[] {
  if (cache) return cache;
  const out: Guide[] = [];
  const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f.toLowerCase() !== "readme.md") : [];
  const now = Date.now();
  for (const f of files) {
    const { data, body } = parseFrontmatter(readFileSync(join(DIR, f), "utf8"), f);
    const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : undefined);
    const slug = s("slug");
    const title = s("title");
    const description = s("description");
    if (!slug || !title || !description) throw new Error(`${f}: slug, title and description are required`);
    if (slug !== f.replace(/\.md$/, "")) throw new Error(`${f}: file name must match slug "${slug}"`);
    const status = (s("status") ?? "draft") as Status;
    if (!["draft", "ready", "published"].includes(status)) throw new Error(`${f}: status must be draft, ready or published`);
    const pillar = (s("pillar") ?? "A") as PillarKey;
    if (!(pillar in pillars)) throw new Error(`${f}: pillar must be one of A, B, C, D, E`);
    const cta = (s("cta") ?? "direct") as "direct" | "agency";
    if (cta !== "direct" && cta !== "agency") throw new Error(`${f}: cta must be direct or agency`);
    const datePublished = s("datePublished");
    const published = status === "published";
    if (published && !datePublished) throw new Error(`${f}: datePublished (YYYY-MM-DD) is required when status is published`);
    for (const k of ["datePublished", "dateModified", "lastChecked"]) {
      const v = s(k);
      if (v && (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(v)))) throw new Error(`${f}: ${k} must be YYYY-MM-DD`);
    }
    const live = published && Date.parse(datePublished!) <= now;
    if (!live && !showDrafts) continue;
    const pub = datePublished ?? s("lastChecked") ?? new Date().toISOString().slice(0, 10);
    const ogName = s("ogImage");
    const twName = `${slug}-twitter.png`;
    const ogFile = ogName && existsSync(join(PUBLIC, ogName)) ? ogName : undefined;
    const twFile = existsSync(join(PUBLIC, twName)) ? twName : undefined;
    const words = body.split("<!-- editor-notes")[0].replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
    const metaTitle = s("seoTitle") ?? s("metaTitle") ?? title;
    if (metaTitle.length + site.brand.length + 3 > 60) console.warn(`guides: "${slug}" page title is ${metaTitle.length + site.brand.length + 3} characters (aim for 60 or fewer). Add a shorter seoTitle in the frontmatter.`);
    const type = (s("type") ?? (slug === pillars[pillar].slug ? "pillar" : "post")) as "pillar" | "post";
    out.push({
      slug, title, metaTitle, description, targetKeyword: s("targetKeyword") ?? "", type, pillar, cta, status,
      related: (data.related as string[] | undefined) ?? [],
      lastChecked: s("lastChecked"), datePublished: pub, dateModified: s("dateModified") ?? pub,
      isDraft: !live,
      ogImage: ogFile ? { url: `/guides/${ogFile}`, width: 1200, height: 630 } : undefined,
      twitterImage: twFile ? { url: `/guides/${twFile}`, width: 1200, height: 600 } : undefined,
      ogAlt: s("ogAlt") ?? `${site.brand} guide: ${title}`,
      readingMinutes: Math.max(1, Math.ceil(words / 220)),
      html: body,
    });
  }
  const known = new Set(out.map((g) => g.slug));
  for (const g of out) g.html = render(g.html, known);
  cache = out.sort((a, b) => b.dateModified.localeCompare(a.dateModified) || a.slug.localeCompare(b.slug));
  return cache;
}

export const getGuide = (slug: string) => allGuides().find((g) => g.slug === slug);
/** True when the Guides link, the index and the sitemap entry should appear. */
export const hasGuides = () => allGuides().length > 0;
export const hasLiveGuides = () => allGuides().some((g) => !g.isDraft);
export const formatDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
