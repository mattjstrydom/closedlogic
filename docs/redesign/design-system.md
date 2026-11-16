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
