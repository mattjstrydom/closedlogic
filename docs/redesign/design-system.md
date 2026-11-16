# Closed Logic design system: "Bright and crisp" (updated 16 Nov 2026)

Source of truth: `:root` in `app/globals.css`. Light theme only on the site; the `[data-theme="dark"]` block is reserved for reports and slides.

**Change in this version:** CTA buttons use white text on a darker red fill (`--brand-button`). White on the original brand red is 3.3:1 and fails WCAG AA; white on `#d92d20` is about 5:1. `--brand` is now used only for non-text fills.

## Colour tokens
| Token | Value | Use |
|---|---|---|
| `--bg` / `--surface` | `#ffffff` | Page, cards |
| `--bg-subtle` | `#f6f7f9` | Bands, hover on secondary |
| `--glow` | `#ffe3df` | Hero wash |
| `--border` | `#e7e8ec` | Structure only |
| `--border-input` | `#868c98` | Inputs, secondary buttons |
| `--fg` | `#0b0b0c` | Text, focus ring |
| `--fg-muted` | `#5b616e` | Body copy |
| `--fg-subtle` | `#6b7180` | Captions on bg, bg-subtle, surface only |
| `--brand` | `#ff4b3e` | Fill only: logo dot, eyebrow dots, bars, glow. No text on it |
| `--brand-hover` | `#f0392c` | Hover for `--brand` fills |
| `--brand-button` | `#d92d20` | **New.** Primary button fill |
| `--brand-button-hover` | `#b9231a` | **New.** Primary button hover |
| `--on-brand` | `#ffffff` | **Changed from `#0b0b0c`.** Text on `--brand-button` |
| `--status-bad / -warn / -good` | `#c8261b / #a34306 / #0e7490` | Product UI only (signal report, evidence, pills); each has a `-bg` tint |
| `--focus` | `#0b0b0c` | 2px solid ring, 2px offset |

Shadows: `--shadow-xs`, `--shadow-md`, `--shadow-panel`. Radii: 8 (buttons, inputs), 12, 16, pill. Spacing: 4, 8, 12, 16, 20, 24, 32, 48, 56, 96. Content max 1200px.

## Type
Inter (variable, self-hosted) for everything; JetBrains Mono for code and evidence. Display 64 (44 under 768px), title-xl 48 (36), title-l 36 (28). Weights 400 to 700; headings 600 with tight negative tracking.

## Buttons
| Variant | Class | Fill | Text | Border |
|---|---|---|---|---|
| Primary (one per view) | `.btn`, `.cl-btn--primary` | `--brand-button` | `--on-brand` (white) | none |
| Primary hover | | `--brand-button-hover` | white | none |
| Secondary | `.btn-outline`, `.cl-btn--secondary` | `--surface` | `--fg` | 1px `--border-input` |
| Ghost | `.cl-btn--ghost` | transparent | `--fg` | none |
| Small | `.btn-m`, `.cl-btn--sm` | 40px high, 14px text | | |

All: 44px min height, 15px / 600, 8px radius, 13px 20px padding, 120ms colour transition, disabled at 50% opacity, 2px focus ring.

```css
.btn, .cl-btn--primary { background: var(--brand-button); color: var(--on-brand); box-shadow: var(--shadow-xs); }
.btn:hover, .cl-btn--primary:hover { background: var(--brand-button-hover); }
```

## Rules
- `--brand` is never used for text and never carries text. It is a fill for dots, bars and glow. Buttons use `--brand-button`.
- WCAG 2.1 AA: any new text-on-fill pair must reach 4.5:1 (3:1 only for 24px+ or 19px+ bold).
- Copy: sentence case, second person, no exclamation marks, no emoji, no em dashes.

## Motion layer (added 16 Nov 2026, `app/fx.css`, `app/components/fx.tsx`)
Reference study: Stripe (flowing gradient mesh, product UI in bento frames, two-tone headlines), Linear (hairline grids, glow lines, product UI as the hero), Attio (soft gradient floor, bordered cells). Adapted to a light page and the brand red, with no borrowed assets.

| Part | What it does | Where |
|---|---|---|
| Hero ground | Hairline 64px grid, masked to fade out; an aurora (red, peach, faint teal) drifting under it; six hairline beams travelling along grid lines | Every hero (home and inner pages); beams on the home hero only |
| Brand orbit | The logo's ring and dot, large and faint behind the hero panel, the dot in slow orbit | Home hero |
| Dotted band | 20px dot field fading in and out at the section edges | Every `.band` section |
| Signal report | A light that runs around the border, a soft scan line, bars that grow, a ping on "bad" pills, two floating code chips | Home hero panel |
| Card diagrams | Small live diagrams on the three problem cards (page view firing a conversion, a click ID that stops short, leads that stop at the form fill) | Home problem section |
| Steps rail | A pulse running down the rail through the three steps; the flagged line in the evidence sample breathes | Home how it works |
| Pricing | The recommended tier carries the same moving border light | Home pricing |
| Cursor light | A soft red glow follows the pointer inside cards (fine pointers only) | Cards, tiers, fit and team cards |
| Two-tone headlines | First clause in ink, rest in `--fg-subtle` (`.soft`) | Home h1 and h2s |
| Split section heads | Heading left, standfirst right (`.cl-head--split`) | Problem, pricing |
| Reveal | Section heads, grids and steps rise 16px and fade in once as they enter view | Home |
| Closing block | Hairline grid and a drifting glow on the dark ground | Every closing block |

Rules: only transform and opacity animate (plus the border-light angle); everything moving sits inside `prefers-reduced-motion: no-preference` (under "reduce" the static patterns stay, no motion, nothing hidden); decorative parts are `aria-hidden` and never carry the only copy of a fact; a footer toggle ("Pause background motion", `aria-pressed`, remembered in `localStorage` key `cl-fx`) stops all of it (WCAG 2.2.2); no tilt, no scroll-jacking, no parallax on text.
