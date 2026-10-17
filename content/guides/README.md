# Guides content

Each file here is one guide (a pillar page or a post). The site builds them into `/guides/<slug>` at build time.
Nothing goes live unless its status is `published`.

## Add a post

1. Copy an existing file to `content/guides/<slug>.md`. The file name must equal the `slug`.
2. Fill in the frontmatter (below). Write the body in markdown. The first `# Heading` is dropped, because the page
   shows `title` as the H1. Everything from `<!-- editor-notes` down is stripped and never rendered.
3. Put the images in `public/guides/` (see Images).
4. Preview it (see Preview), then publish (see Publish).

## Frontmatter

| Key | Required | Notes |
|---|---|---|
| `title` | yes | The H1 |
| `slug` | yes | Last path segment, same as the file name. To rename a post, change this and the file name together, then fix links to it |
| `description` | yes | Meta description, about 155 characters or fewer |
| `status` | yes | `draft`, `ready` or `published` (see Statuses) |
| `datePublished` | when published | `YYYY-MM-DD`. A future date keeps the post hidden until a build on or after that day |
| `dateModified` | no | `YYYY-MM-DD`. Defaults to `datePublished`. Sets `lastmod` in the sitemap |
| `lastChecked` | no | `YYYY-MM-DD`. Shown as "Last checked" |
| `pillar` | yes | `A` to `E` (names are in `app/guides/content.ts`) |
| `type` | no | `pillar` or `post`. Defaults to `pillar` when the slug is the pillar's page slug, otherwise `post` |
| `cta` | yes | `direct` (books through `/book`) or `agency` (the agency Cal.com link) |
| `seoTitle` | no | Shorter text for the browser title and share cards. The H1 stays `title`. The brand is added after it, aim for 60 characters or fewer in total |
| `targetKeyword` | no | For the team, not shown |
| `ogImage` | no | File name in `public/guides/`, normally `<slug>-og.png` (1200x630) |
| `ogAlt` | no | Alt text for the share images. Defaults to "Closed Logic guide: <title>" |
| `related` | no | List of slugs, for example `related: [other-slug, another-slug]` |

The X/Twitter image is found from the slug: `public/guides/<slug>-twitter.png` (1200x600). If an image file is missing, the site's default share images are used.

## Statuses

- `draft` and `ready`: never built, listed, linked or put in the sitemap on the live site.
- `published`: built, listed on `/guides`, added to the sitemap with `lastmod`, and linked from the nav and footer
  (the Guides link and the sitemap entry for `/guides` appear automatically once one guide is live; until then `/guides` says
  "Guides coming soon" and is noindex).
- Links in a guide to another `/guides/<slug>` that this build does not contain show as plain text, and become links
  automatically once that guide is published.

## Images

Put files in `public/guides/`. In the body use `![alt text](file-name.png)`: a bare file name resolves to `/guides/file-name.png`.
Width and height are read from PNG files to avoid layout shift. Always write alt text.

## Preview drafts

```bash
SHOW_DRAFTS=1 npm run dev        # PowerShell: $env:SHOW_DRAFTS=1; npm run dev
```

Drafts and ready posts render with a DRAFT banner and a noindex tag. The build refuses `SHOW_DRAFTS=1` on a production
(indexable) build, and do not leave drafts in `out/`: rebuild with plain `npm run build` before deploying.

## Publish

1. Set `status: published` and `datePublished: YYYY-MM-DD` (and `dateModified` when you update it).
2. Check there are no em or en dashes in the text.
3. `npm run lint` and `npm run build`, then commit and push to `main`.
