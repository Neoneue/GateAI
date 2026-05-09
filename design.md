---
# DESIGN.md format — compatible with `npx @google/design.md lint`
# Stack: tailwind-shadcn (Tailwind v4 @theme + shadcn base-nova + Base UI primitives)
# Source: this repo (src/index.css + src/components/ui/*). Every value cites the
# source line. Confidence tags: `code-direct` = read from index.css or a
# primitive file in this repo (highest trust for this codebase since these
# files ARE the contract — no transpile loss). `decided` = locked policy from
# brand-guidelines.md or CLAUDE.md "Things to not change without asking".

version: alpha
name: "Constellation Gate AI"
description: "Operator dashboard for an AI gateway with audit anchoring — dense, technical, no-nonsense surface tuned for the human running it in production"

colors:
  primary: "oklch(0.090 0 0)"
  primary-foreground: "#FFFFFF"
  background: "#FFFFFF"
  foreground: "oklch(0.090 0 0)"
  card: "#FFFFFF"
  card-foreground: "oklch(0.090 0 0)"
  popover: "#FFFFFF"
  popover-foreground: "oklch(0.090 0 0)"
  secondary: "oklch(0.960 0 0)"
  secondary-foreground: "oklch(0.090 0 0)"
  muted: "oklch(0.960 0 0)"
  muted-foreground: "oklch(0.530 0 0)"
  accent: "oklch(0.960 0 0)"
  accent-foreground: "oklch(0.090 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.910 0 0)"
  input: "oklch(0.910 0 0)"
  ring: "oklch(0.680 0 0)"
  canvas-bg: "#ECECE7"

  ink-50: "oklch(0.985 0 0)"
  ink-100: "oklch(0.960 0 0)"
  ink-200: "oklch(0.910 0 0)"
  ink-300: "oklch(0.820 0 0)"
  ink-400: "oklch(0.680 0 0)"
  ink-500: "oklch(0.530 0 0)"
  ink-600: "oklch(0.380 0 0)"
  ink-700: "oklch(0.260 0 0)"
  ink-800: "oklch(0.165 0 0)"
  ink-900: "oklch(0.090 0 0)"
  ink-950: "oklch(0.045 0 0)"

  blue-50: "oklch(0.970 0.020 268.85)"
  blue-100: "oklch(0.940 0.040 268.85)"
  blue-200: "oklch(0.890 0.075 268.85)"
  blue-300: "oklch(0.810 0.130 268.85)"
  blue-400: "oklch(0.700 0.180 268.85)"
  blue-500: "oklch(0.580 0.215 268.85)"
  blue-600: "oklch(0.470 0.232 268.85)"
  blue-700: "oklch(0.345 0.224 268.85)"  # brand mark, ≈#1F2FCE
  blue-800: "oklch(0.275 0.175 268.85)"
  blue-900: "oklch(0.215 0.130 268.85)"
  blue-950: "oklch(0.145 0.085 268.85)"

  success-50: "oklch(0.982 0.018 155.826)"
  success-100: "oklch(0.962 0.044 156.743)"
  success-200: "oklch(0.925 0.084 155.995)"
  success-500: "oklch(0.723 0.219 149.579)"
  success-600: "oklch(0.627 0.194 149.214)"
  success-700: "oklch(0.527 0.154 150.069)"
  warning-50: "oklch(0.987 0.022 95.277)"
  warning-100: "oklch(0.962 0.059 95.617)"
  warning-200: "oklch(0.924 0.120 95.746)"
  warning-500: "oklch(0.769 0.188 70.080)"
  warning-600: "oklch(0.666 0.179 58.318)"
  warning-700: "oklch(0.555 0.163 48.998)"
  danger-50: "oklch(0.971 0.013 17.380)"
  danger-100: "oklch(0.936 0.032 17.717)"
  danger-200: "oklch(0.885 0.062 18.334)"
  danger-600: "oklch(0.577 0.245 27.325)"  # semantic --destructive
  danger-700: "oklch(0.505 0.213 27.518)"

  white: "#FFFFFF"
  canvas: "#ECECE7"  # warm-paper canvas

  chart-1: "oklch(0.62 0.18 255)"  # blue
  chart-2: "oklch(0.72 0.17 50)"  # orange
  chart-3: "oklch(0.72 0.20 145)"  # green
  chart-4: "oklch(0.70 0.18 290)"  # purple
  chart-5: "oklch(0.65 0.20 18)"  # coral
  chart-6: "oklch(0.75 0.13 195)"  # teal
  chart-7: "oklch(0.85 0.16 88)"  # amber
  chart-8: "oklch(0.68 0.20 335)"  # magenta

  syntax-keyword: "#B6491A"  # curl flags / orange-red
  syntax-variable: "#D69E2E"  # $KEY interpolations
  syntax-property: "#4165FF"  # JSON keys

  traffic-red: "#FF5F57"
  traffic-amber: "#FEBC2E"
  traffic-green: "#28C840"

typography:
  # Tailwind named scale only. Three sizes overridden in @theme to Geist's even-numbered
  # heading scale (text-3xl: 32px, text-4xl: 40px, text-6xl: 64px — index.css:152–157).
  # Arbitrary text-[Npx] is banned. font-medium minimum on sans labels — font-normal
  # reads as ambient body, not structure.

  hero-numeric-lg:  # text-3xl/9 + sans tabular
    fontFamily: "Geist"
    fontSize: 32  # overridden text-3xl
    lineHeight: 36
    fontWeight: 500
    fontFeature: "tnum"

  hero-numeric-default:  # text-2xl/8 + sans tabular
    fontFamily: "Geist"
    fontSize: 24
    lineHeight: 32
    fontWeight: 500
    fontFeature: "tnum"

  h1:
    fontFamily: "Geist"
    fontSize: 32
    lineHeight: 40
    fontWeight: 500

  h2:
    fontFamily: "Geist"
    fontSize: 24
    lineHeight: 32
    fontWeight: 500

  h3:
    fontFamily: "Geist"
    fontSize: 18
    lineHeight: 28
    fontWeight: 500

  body:
    fontFamily: "Geist"
    fontSize: 16
    lineHeight: 24
    fontWeight: 400

  body-sm:
    fontFamily: "Geist"
    fontSize: 14
    lineHeight: 20
    fontWeight: 400

  body-xs:
    fontFamily: "Geist"
    fontSize: 12
    lineHeight: 16
    fontWeight: 400

  label:  # text-sm font-medium
    fontFamily: "Geist"
    fontSize: 14
    lineHeight: 16
    fontWeight: 500

  eyebrow-sm:
    fontFamily: "Geist Mono"
    fontSize: 12
    lineHeight: 16
    fontWeight: 500
    letterSpacing: "0.1em"
    fontVariation: "uppercase"

  eyebrow-default:
    fontFamily: "Geist Mono"
    fontSize: 14
    lineHeight: 20
    fontWeight: 500
    letterSpacing: "0.1em"
    fontVariation: "uppercase"

  badge:  # base CVA
    fontFamily: "Geist Mono"
    fontSize: 12
    lineHeight: 16
    fontWeight: 500
    fontFeature: "tnum"

  data:  # mono tabular
    fontFamily: "Geist Mono"
    fontSize: 14
    lineHeight: 20
    fontWeight: 400
    fontFeature: "tnum"

rounded:
  # Driven by --radius (0.625rem = 10px) in @theme inline (index.css:213, 280–290).
  # Modal radius locked to 12px regardless of base scaling.
  xs: "4px"  # sub-elements (tabs item, segmented, SelectItem, badge)
  sm: "6px"  # everyday surfaces (Card, Input, Select trigger, Button)
  md: "8px"  # intermediate
  lg: "10px"  # base radius (10px)
  xl: "12px"  # modal lock (Dialog, Sheet, AlertDialog)
  2xl: "18px"  # calc(--radius * 1.8)
  full: "9999px"

spacing:
  # 4px grid only. Half-step Tailwind classes (gap-0.5/1.5/2.5/3.5) and arbitrary
  # values (gap-[18px]) are banned. Locked 2026-05-04. (decided)
  "1": "4px"  # gap-1, p-1 (rare)
  "2": "8px"
  "3": "12px"
  "4": "16px"  # most-frequent step)
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"

components:
  button-default:  # primary action, ink-900 fill
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-sm}"   # text-sm font-medium
    rounded: "{rounded.sm}"
    height: 36                           # h-9 (default)
    padding: "0 16"                      # px-4 — pr-3 with icon (asymmetric)
  button-outline:    { backgroundColor: "{colors.background}", textColor: "{colors.foreground}", rounded: "{rounded.sm}" }
  button-secondary:  { backgroundColor: "{colors.secondary}", textColor: "{colors.secondary-foreground}" }
  button-ghost:      { backgroundColor: "transparent", textColor: "{colors.foreground}" }
  button-destructive:{ backgroundColor: "{colors.destructive}", textColor: "{colors.primary-foreground}" }

  input:
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.sm}"
    height: 36
    padding: "0 16"  # px-4 (default), px-3 at sm/xs; focus = border-ring + ring-3/50; disabled = bg-ink-100 text-ink-500

  textarea:    { backgroundColor: "{colors.ink-50}", textColor: "{colors.ink-800}", rounded: "{rounded.sm}", padding: "12 16" }
  input-group: { backgroundColor: "{colors.ink-50}", textColor: "{colors.ink-800}", rounded: "{rounded.sm}", height: 36 }

  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.sm}"
    padding: 16
    elevation: "shadow-border"  # CardFooter: bg-ink-50 + border-t border-ink-200 + p-4

  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.badge}"
    rounded: "{rounded.xs}"
    height: 20
    padding: "0 6"  # pl-2.5 pr-1.5
  badge-secondary:   { backgroundColor: "{colors.secondary}", textColor: "{colors.secondary-foreground}" }
  badge-destructive: { backgroundColor: "{colors.danger-100}", textColor: "{colors.danger-700}" }
  badge-outline:     { textColor: "{colors.foreground}" }
  badge-success:     { backgroundColor: "{colors.success-100}", textColor: "{colors.success-700}" }
  badge-warning:     { backgroundColor: "{colors.warning-100}", textColor: "{colors.warning-700}" }
  badge-info:        { backgroundColor: "{colors.blue-100}", textColor: "{colors.blue-700}" }

  select-trigger:
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.sm}"
    height: 36
    padding: "0 12 0 16"  # pl-4 pr-3 default; pl-3 pr-2 at sm/xs (asymmetric for chevron)

  tabs-list: { backgroundColor: "{colors.muted}", rounded: "{rounded.sm}", height: 32, padding: 4 }  # active trigger: bg-background rounded-xs
  segmented: { backgroundColor: "{colors.muted}", rounded: "{rounded.sm}", height: 32 }              # active item: bg-background rounded-xs

  dialog:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.xl}"  # 12px LOCKED
    padding: 16
    elevation: "shadow-modal"  # overlay: bg-ink-900/40 + backdrop-blur-xs
  sheet: { backgroundColor: "{colors.background}", rounded: "{rounded.none}", elevation: "shadow-modal" }  # right-docked drawer

  table-header:    { backgroundColor: "{colors.ink-50}", textColor: "{colors.ink-600}", typography: "{typography.body-sm}" }  # row hover: bg-ink-50
  pagination-link: { textColor: "{colors.ink-600}", typography: "{typography.data}" }  # rendered as <button>, not <a>

  hero-numeric: { textColor: "{colors.ink-900}", typography: "{typography.hero-numeric-default}" }  # also: hero-numeric-lg variant
  toast:        { backgroundColor: "{colors.background}", textColor: "{colors.ink-900}", rounded: 8, elevation: "shadow-popup" }
  status-dot:   { rounded: "{rounded.full}" }  # tones: success-600, warning-600, destructive, blue-600, ink-500
  tag:          { backgroundColor: "{colors.ink-100}", textColor: "{colors.ink-900}", rounded: "{rounded.full}", height: 24, typography: "{typography.body-xs}" }

  switch:   { backgroundColor: "{colors.primary}" }  # checked = primary, unchecked = input (ink-200); thumb rounded-full
  checkbox: { backgroundColor: "{colors.primary}", textColor: "{colors.primary-foreground}", rounded: "{rounded.xs}" }  # checked state
  radio:    { backgroundColor: "{colors.primary}", rounded: "{rounded.full}" }  # checked state

  delta-tag:    { textColor: "{colors.success-700}" }  # default: positive=success-700, negative=destructive; inverted flips (rate metrics only)
  vendor-avatar:{ rounded: "{rounded.none}" }  # bare icon, no chip wrapper
  brand-mark:   { textColor: "{colors.blue-700}" }  # logomark.svg fill #1F2FCE
---

# Design System — Constellation Gate AI

> **Format:** [DESIGN.md](https://github.com/google-labs-code/design.md) (Google) — YAML front matter + prose rationale.
> Validate with `npx @google/design.md lint design.md`. Export with `npx @google/design.md export --format dtcg` (preserves `components.*` references) or `--format tailwind` (Tailwind-v3-shape JSON; primitives only).
> **Authoring discipline:** every value cites a source. Confidence tags as YAML comments and prose citations. **This document supersedes `docs/brand-guidelines.md`** — when the two disagree, this file wins.

**Source:** this repository (`src/index.css` + `src/components/ui/*` + locked policy from CLAUDE.md and brand-guidelines.md v0.2)
**Stack:** tailwind-shadcn (Tailwind v4 `@theme` + shadcn `base-nova` registry + Base UI primitives via `@base-ui/react`)
**Extraction mode:** code-direct (read from the source files in this repo — these files ARE the contract; no transpile loss)
**Confidence summary:** 14 sections strong, 0 partial, 1 TBD (wordmark + lockups not finalized)
**Captured states:** light mode @ 1440×900 default; modal (Dialog), drawer (Sheet), toast, segmented selectors, tabs, pagination, table sortable + drill-in
**Not yet captured (TBD):** wordmark + horizontal/stacked lockups (logomark only, finalized); dark mode (intentionally absent — `:root.dark` block omitted; `@custom-variant dark` declared for future activation)

---

## 0. Direction *(our extension)*

**Who:** human operator running an AI gateway in production. **Verb:** inspect — read-heavy; filter, sort, drill in, copy. **Feel:** Vercel Geist meets operator tooling — flat, dense, mono numerics, ink-900 primary, warm-paper canvas under white cards.

### Defaults being rejected

1. **Blue primary action** → ink-900 primary. Blue reserved for info/completed/active-tab/focus only.
2. **Blue underlined links** → ink + permanent faint underline (`decoration-ink-200` → `decoration-ink-500` on hover/focus). Blue is overloaded with 4 other meanings.
3. **24px gutters (Bootstrap/Material default)** → 12-column grid with **16px gutters**. Denser, more on-genre for an operator tool.
4. **Brand colors as chart series colors** → 8-slot OKLCH categorical palette picked by series index. Per-series `slot?: number` override only for brand-mnemonic exceptions (Anthropic→orange, OpenAI→blue).
5. **Solid 1px card borders** → three-layer `shadow-as-border` (1px ring + 1px lift + 2px ambient, `color-mix` from ink-800).
6. **All numerics mono** → five-voice taxonomy. Hero summary numerics ≥24px sans tabular via `<HeroNumeric>`; data numerics <20px stay mono.

---

## 1. Overview *(Google canonical §1)*

Operator dashboard for an AI gateway. Read-heavy interaction (filter, sort, drill in, copy). Information density is high: three-tier table ink (500/800/900), right-aligned mono-tabular numerics, KPI rails with sparklines + delta tags, modals as drill-ins (not splash dialogs). Warm-paper canvas (`#ECECE7`) under white cards painted with shadow-as-border.

**Key characteristics:** 5 OKLCH ramps × 11 steps · two-tier material ladder (6/12/4px) · five-voice typography · no dark mode · ink-900 primary, not blue · shadow-as-border, not solid borders.

---

## 2. Colors *(Google canonical §2)*

Two layers: **palette atoms** (5 OKLCH ramps × 11 steps + atomic surfaces + 8-slot chart palette) in `@theme {}`, and **semantic layer** (shadcn vocab: `--background`, `--primary`, etc.) in `:root {}`. Semantic tokens always resolve to a palette atom via `var(--color-*)`. **No raw hex/oklch/rgba outside `@theme`.**

### Primary & brand accent

- **Ink** `oklch(0.090 0 0)` ← `{colors.ink-900}` — primary action, foreground, headlines. **Not blue.**
- **Blue** `oklch(0.345 0.224 268.85)` ≈ `#1F2FCE` ← `{colors.blue-700}` — brand accent (anchored to `public/logomark.svg`). Info / completed / active-tab / focus only. Never primary CTA. Never inline links.

### Step roles (apply across all 5 ramps)

| Step | Role |
|---|---|
| 50–100 | Subtle backgrounds, washes, hover-bg |
| 200 | Borders, dividers (`--border`, `--input` resolve to ink-200) |
| 300 | Strong borders, ghost-button hover-bg, dashed gridlines |
| 400 | Placeholder text, missing-data dashes, breadcrumb separators (`--ring` resolves to ink-400) |
| 500 | Secondary text, eyebrow, chart strokes (`--muted-foreground` resolves to ink-500) |
| 600 | Saturated mid (default solid surfaces, `--destructive` resolves to danger-600) |
| 700 | Saturated text on tinted bg, brand-mark anchor (blue-700 = logomark) |
| 800–900 | High-contrast text on white. ink-800 = body default; ink-900 = `--primary`, `--foreground`, headlines |
| 950 | Reserved (extreme contrast, future dark-mode anchor) |

**Note:** `--ink-700` is intentionally avoided as a table body-cell tone — middle-tier neutrals collide with the three-tier table policy (see §7 Tables).

### Status semantics

`success-100` bg + `success-700` text (success-600 for solid mid). `warning-100` bg + `warning-700` text (warning-600 for slow-row icons). `danger-100` bg + `danger-700` text; `--destructive` resolves to `danger-600`. `info` aliases to the blue ramp — no separate `info-*` ramp.

### Chart palette (categorical, 8-slot)

**Brand-decoupled.** Series pick a slot **by index, not by entity**. Per PM call (2026-05-06): "we need a palette of colors for all graphs throughout the app and they should be used regardless of the content."

All eight slots sit at L 0.62–0.85, C 0.13–0.20 (uniformly bright, mid-saturation). Adjacent slots in palette order are ≥85° apart in hue. **No neutral as a categorical slot** — gray is reserved for "Other/Unknown" semantic states. Per-series `slot?: number` override on `VendorMeta` lets specific charts pin colors when there's a brand mnemonic worth honoring (Anthropic→orange slot 2, OpenAI→blue slot 1) — opt-in only.

Slots: `chart-1` blue · `chart-2` orange · `chart-3` green · `chart-4` purple · `chart-5` coral · `chart-6` teal · `chart-7` amber · `chart-8` magenta. ← code-direct: `src/index.css:205–212`

KPI rail sparklines also consume chart palette tokens (`--color-chart-1` blue, `--color-chart-3` green, `--color-chart-7` amber, `--color-ink-500` neutral) — **NOT** semantic ramps. Mixing systems makes rails read inconsistently.

### Vendor brand colors

Used only by `<VendorAvatar />` (bare icon at `size-4`, no chip wrapper). Anthropic `#D97757` · OpenAI `#10A37F` · Meta `#0064E0` · DeepSeek `#4D6BFE` · xAI `#3D3D3D` · Google/Mistral/Cohere multi-color SVG fills (wrapper `style.color` ignored). Source: `src/components/icons/vendor-meta.tsx`.

### Do not use

- Raw hex/oklch/rgba outside `@theme`.
- Single-token semantics (`--color-warning`, `-2` variants) — use ramp steps (`text-warning-700`, `bg-success-100`).
- Blue for primary action — `--primary` resolves to ink-900.
- Blue for inline links — use ink + faint underline (see §7).
- `text-ink-600`/`text-ink-700` as table body-cell tones — collides with three-tier policy.
- Vendor colors as chart series colors by default — charts use `--chart-1..8` by index.

---

## 3. Typography *(Google canonical §3)*

### Font Family

- **Sans:** `"Geist", ui-sans-serif, system-ui, sans-serif`
- **Mono:** `"Geist Mono", ui-monospace, "SFMono-Regular", monospace`

Loaded via Google Fonts CDN + `@fontsource-variable/geist` fallback. Geist serves headings too — `--font-heading` aliased to `--font-sans`. No IBM Plex.

### Hierarchy

Tailwind named scale only. Three sizes overridden in `@theme` to Geist's heading scale (even-numbered, larger increments at top); other sizes match Geist defaults. **Arbitrary `text-[Npx]` is banned.**

| Role (YAML key) | Font | Size | Weight | Line Height | Letter Spacing | Rule | Notes |
|---|---|---|---|---|---|---|---|
| `hero-numeric-lg` | Geist | 32 | 500 | 36 | tight | Full-page hero metric only (CMP-013 `8,241`). One per page. | sans + `tabular-nums` — presentation tier. |
| `hero-numeric-default` | Geist | 24 | 500 | 32 | tight | KPI rail value, panel hero (Top Keys total). | sans + `tabular-nums`. |
| `h1` | Geist | 32 | 500 | 40 | tight | Page title (artboard h1). | overridden text-3xl (Geist 32). |
| `h2` | Geist | 24 | 500 | 32 | normal | Section title (SectionHeader). | text-2xl/8. |
| `h3` | Geist | 18 | 500 | 28 | normal | Card title, modal hero ID, modal `KpiTile` value (mono — below sans-hero threshold). | text-lg. |
| `body` | Geist | 16 | 400 | 24 | normal | Card subtitles, button labels, body in spacious surfaces. | text-base. |
| `body-sm` | Geist | 14 | 400 | 20 | normal | Modal field labels, body in compact surfaces, eyebrow default. | text-sm. |
| `body-xs` | Geist | 12 | 400 | 16 | normal | Eyebrow sm, table column heads, breadcrumbs, dense metadata. | text-xs. |
| `label` | Geist | 14 | 500 | 16 | normal | Form labels (Label primitive). | leading-none. |
| `eyebrow-sm` | Geist Mono | 12 | 500 | 16 | 0.1em | KPI labels, card section eyebrows, top-bar strips. | UPPERCASE TRACKED. |
| `eyebrow-default` | Geist Mono | 14 | 500 | 20 | 0.1em | Modal eyebrows, drawer headers, hero strips. | UPPERCASE TRACKED. |
| `badge` | Geist Mono | 12 | 500 | 16 | normal | Status codes, counters, deltas, pills. | tabular-nums (Badge default). |
| `data` | Geist Mono | 14 | 400 | 20 | normal | Table cells, IDs, codes, hashes, model identifiers, row values. | tabular-nums. |

### Five-voice taxonomy (codified 2026-05-07)

Each voice has a single job; mixing them is the drift surface. **Critical rule:** sans labels are `font-medium` minimum. `font-normal` reads as ambient body, not a label. Color does the *quiet* work; weight does the *structural* work.

| Voice | Recipe | Use |
|-------|--------|-----|
| **Display headline / hero numeric** | `font-sans tabular-nums font-medium tracking-tight` (via `<HeroNumeric>`) | Page titles, KPI hero values (24px), full-page hero metrics (32px), panel heroes — *summary, look at this* |
| **Body / label** | `font-sans` (regular or `font-medium`) | Card titles, page subtitles, button labels, key/project names, table column headers — *human, read this* |
| **Eyebrow** | `font-mono uppercase tracking-[0.1em] font-medium` | Section eyebrows, KPI labels, segmented control labels, chrome strips — *what is this* |
| **Badge / pill** | `font-mono tabular-nums font-medium text-xs` (via Badge default) | Status codes (`200`/`500`), counters, deltas, inline pills — *operational chrome* |
| **Data** | `font-mono tabular-nums` | Table cells, IDs, codes, hashes, model identifiers, modal sub-tier numerics — *raw data* |

**Hero/data split is size-gated.** Hero summary numerics ≥24px render sans (sans + `tabular-nums` carries the cell-padding mono affordance while signaling "presented summary"). **Below ~20px, numerics revert to mono regardless of role** — modal `KpiTile` at text-lg, table cells, badge contents, row costs all stay mono. The cutoff is real: at ~18px the digit-shape differences between Geist Sans tabular and Geist Mono become more visible, and the mono-illusion breaks.

### Principles

Operational surfaces ~60% mono / 40% sans. Weight ceiling 500 (don't reach for 600/700 — size carries hierarchy). Hierarchy from size + weight + voice change, not color (color is for state).

---

## 4. Layout *(also: "Layout & Spacing" — Google canonical §4)*

### Spacing System

**4px grid only.** Every `gap`, `padding`, `margin`, `space-y/x`, `top/right/bottom/left` value is a multiple of 4px. Half-step Tailwind classes (`gap-0.5`, `gap-1.5`, `gap-2.5`, `gap-3.5`) and arbitrary values (`gap-[18px]`) are **banned**. Locked 2026-05-04.

| Token (YAML key) | Value | Uses | Role |
|---|---|---|---|
| `spacing.1` | 4px | rare | Micro gap (icon adjacency) |
| `spacing.2` | 8px | common | Badge gap, button icon gap, segmented item gap |
| `spacing.3` | 12px | common | Button px-3 (sm/xs), Input px-3, inner table cells, compact toolbar py-3 |
| **`spacing.4`** | **16px** | **dominant** | **Default. Card padding, table outer cells, page gutter, section gap, toolbar padding** |
| `spacing.6` | 24px | common | Outer page margins at lg/xl/2xl breakpoints (`lg:p-6`) |
| `spacing.8` | 32px | rare | Section spacing in spec sheets |
| `spacing.12` | 48px | rare | Page-bottom rhythm |
| `spacing.16` | 64px | very rare | Hero strip spacing |

**Rule:** Start at **16px** for any card padding, page gutter, section gap. Drop to 12px inside dense rows (button sm, input sm, table inner cells, compact toolbar). Use 24px only for outer page margins on large screens. Above 24px, justify with a specific use case — there are very few in this system.

### Grid & Container

- **Composed pages:** 12-column grid + 16px gutters (`grid grid-cols-12 gap-4`). Asymmetric layouts via `col-span-N` (row sums to 12).
- **Outer page margins:** 24px (`lg:p-6`) at `lg`/`xl`/`2xl`; less below.
- **Spec-sheet artboards** (CMP-000–CMP-009) use fixed 1440px column (`w-[1440px]`) to mirror Paper; composed pages (CMP-012/013/014/016) are responsive.
- **Page-header subtitle width:** `max-w-1/2` on the *wrapper column* (not the `<p>` — fractional max-w on a leaf doesn't behave).

Whitespace carries hierarchy. Cards never touch — shadow-as-border does the separation. Body has a 40px linear-gradient grid on `--canvas-bg`; anything sitting on white needs explicit `bg-white` or `bg-ink-50`.

---

## 5. Elevation & Depth *(Google canonical §5)*

Three shadow tokens, all `color-mix(in oklch, var(--color-ink-800) X%, transparent)` — shadow family tracks the ink ramp, never inline `rgba()`.

| Tier | Token | Composition | Radius | Surfaces |
|---|---|---|---|---|
| Everyday | `--shadow-border` | 1px ring 6% + 1px lift 6% + 2px ambient 4% | `rounded-sm` (6px) | Card, KpiRail, table containers, hero card |
| Hover | `--shadow-border-hover` | 1px ring 8% + 1px lift 8% + 2px ambient 6% | (same as everyday) | Hovered card variant |
| Menu | `--shadow-popup` | 4px lift 8% + 1px ring 4% | `rounded-sm` (6px) | Select content, popovers, tooltips, dropdowns |
| Modal | `--shadow-modal` | 16px lift 12% + 1px ring 6% | `rounded-xl` (12px LOCKED) | Dialog, AlertDialog, Sheet |
| Sub-element | none | none | `rounded-xs` (4px) | Tabs trigger, Segmented item, SelectItem, Badge |

**Rule:** shadow-first, never `border` class. **Concentric rule:** item radius < container radius (4px badge in 6px card in 12px modal). Don't override `rounded-xl` on modals — locked.

### Motion

`transition-[colors,box-shadow] duration-150 ease-out motion-reduce:transition-none` everywhere — NOT `transition-all`. Button press: + `active:translate-y-px`. Sliding indicator (Tabs/Segmented/SegmentedPill): 200ms ease-out, transform + width animated. Sheet enter: 300ms slide from right. Dialog enter: 200ms fade + zoom-in-95. Toast: sonner default (200ms enter + 4s hold + 200ms exit).

---

## 6. Shapes *(Google canonical §6)*

Driven by `--radius` (0.625rem = 10px base). **Modal radius is a locked override** at 12px regardless of base scaling.

| Token | Value | Use |
|---|---|---|
| `rounded.xs` | 4px | Sub-elements: Tabs trigger, Segmented item, SelectItem, Badge |
| **`rounded.sm`** | **6px** | **Default for everyday surfaces — Card, Input, Select trigger, Button, Tabs list, table containers** |
| `rounded.md` | 8px | Intermediate (sonner toast) |
| `rounded.lg` | 10px | Intermediate / base radius |
| `rounded.xl` | **12px LOCKED** | Modals only — Dialog, AlertDialog, Sheet |
| `rounded.full` | 9999 | Pills — StatusDot, Tag, Switch thumb |

Iconography: `lucide-react` stroke `1.75`. Sizes: `size-3` (12px) / `size-3.5` / `size-4` (16px) / `size-5` (20px). In Buttons, set `data-icon="inline-start"` or `"inline-end"` for variant-aware padding trim.

---

## 7. Components *(Google canonical §7)*

The full primitive library is `src/components/ui/*.tsx` (35 primitives). Highlights below — every component block maps to a `components.*` entry in YAML. Composed pages (CMP-012/013/014/016) live in `src/artboards/` and are compositions of these primitives, not components themselves.

### Buttons — `{components.button-default}` and variants

`src/components/ui/button.tsx` (Base UI under shadcn — wraps `ButtonPrimitive` from `@base-ui/react`, **not Radix**). CVA with 4 size variants (xs/sm/default/lg) and 6 style variants (default/outline/secondary/ghost/destructive/link).

- **Default:** `bg-primary text-primary-foreground` (ink-900 / white). 36px tall (`h-9`), `px-4` (`pr-3` with icon). `rounded-sm`. `text-sm font-medium`. `active:translate-y-px` for tactile press. ← `button.tsx:15, 32`
- **Sizes:** xs h-7 px-3 text-xs · sm h-8 px-3 text-xs · default h-9 px-4 text-sm · lg h-10 px-6 text-sm
- **Asymmetric icon padding:** `has-data-[icon=inline-start]:pl-3` / `has-data-[icon=inline-end]:pr-3` (default size). Mirrors `SelectTrigger` rule (see below).

**Rule:** Primary action = `default` (ink-900). Use `outline` for secondary, `ghost` for tertiary in toolbars/menus. `link` variant is for standalone link-buttons; **inline body-text links** use `<button>` with the underline affordance (see Inline links below).

### Inputs & Forms

- **Input** (`input.tsx`) — `bg-ink-50 border-ink-200 rounded-sm h-9 px-4 text-sm text-ink-800`. **`bg-ink-50` is the contract** — sits flush in filter rows. Sizes: xs h-7 px-3 · sm h-8 px-3 · default h-9 px-4 · lg h-10 px-4. Focus: `border-ring ring-3 ring-ring/50` (ink-tinted, not blue). Disabled: `bg-ink-100 text-ink-500`. Invalid: `border-destructive ring-destructive/20`.
- **Textarea** (`textarea.tsx`) — same surface as Input. `min-h-16`, `field-sizing-content`, `py-3 px-4`.
- **InputGroup** (`input-group.tsx`) — wrapper for inputs with addons (icon, kbd, button). `h-9`, same surface as Input.
- **Field** (`field.tsx`) — composes `<FieldLabel>` + `<FieldDescription>` + `<FieldError>` + control. Default gap-y between fields = 16px. No surface chrome.
- **Label** (`label.tsx`) — `text-sm leading-none font-medium`. **`font-medium` minimum** — `font-normal` reads as ambient body, not a label.
- **Checkbox** (`checkbox.tsx`) — `size-4 rounded-[4px]`, `border-input` unchecked / `bg-primary` checked. Hit-target via `after:-inset-x-3 after:-inset-y-2`.
- **Radio** (`radio-group.tsx`) — `size-4 rounded-full`, same color treatment as Checkbox.
- **Switch** (`switch.tsx`) — `h-[18.4px] w-[32px]` default / `h-[14px] w-[24px]` sm. Thumb `rounded-full size-4`. `data-checked:bg-primary` / `data-unchecked:bg-input`.

**Rule:** Group related fields with `<FieldSet>` + `<FieldLegend>` (text-base font-medium). Validation state via ring + `border-destructive`, never background tint.

### Cards & Containers

- **Card** (`card.tsx`) — `rounded-sm bg-white py-4 text-sm text-ink-900 shadow-(--shadow-border)`. **Shadow-as-border, NOT solid 1px borders.** Composition: `<Card>` (gap-4 col) → `<CardHeader>` (px-4 grid) → `<CardTitle>` (text-base font-medium leading-snug) → `<CardDescription>` (text-sm/5 text-ink-500) → `<CardContent>` (px-4) → `<CardFooter>` (p-4 border-t border-ink-200 bg-ink-50). **Padding: 16px (`p-4`) on all sides** (locked 2026-05-05; legacy 20px overrides retired). Compact: `data-[size=sm]` → `gap-3 py-3 px-3`.
- **CodeCard** (`code-card.tsx`) — code-preview card with header strip + syntax-highlighted body. Uses `<CodeBlock>` driving `--color-syntax-*` tokens. Top-right copy affordance via `<CopyButton>`.

**Rule:** Cards never touch — they sit on the warm-paper canvas with shadow doing separation. The ring inside `--shadow-border` IS the border; don't add a `border` class on top.

### Selectors

- **Tabs** (`tabs.tsx`) — sliding white indicator on active trigger (200ms ease-out, transform+width). Track: `bg-muted rounded-sm h-8 p-1`. Active trigger: `bg-background rounded-xs text-foreground`. Vertical orientation supported.
- **Segmented** (`segmented.tsx`) — pill-style selector, same sliding-indicator idiom as Tabs. `bg-muted rounded-sm overflow-clip`. Sizes: default `h-8`, sm `h-7`. Variants: `pill` (default) and `group` (adjacent borders, ink-900 fill on selected — rare).
- **SegmentedPill** (`segmented-pill.tsx`) — view-scope toggles in toolbars. **Don't add as an extra row** — view-scope controls live in the existing toolbar.
- **Select** (`select.tsx`) — Base UI. Trigger: `bg-ink-50 border-ink-200 rounded-sm h-9 text-sm`. Content: `rounded-sm shadow-(--shadow-popup) bg-popover`. Item: `rounded-xs px-3 py-1.5 text-sm`. **Asymmetric padding** `pl-N pr-(N-1)` across all sizes (`pl-3 pr-2` xs/sm, `pl-4 pr-3` default/lg) — optical balance: text side wants more air, chevron has built-in bounding-box whitespace. Long lists use `<SelectGroup>` + `<SelectLabel>` + `<SelectSeparator>` to group (e.g. First-party vs Marketplace).
- **Toggle** (`toggle.tsx`) — `rounded-sm h-8 px-3 text-sm font-medium`, `data-[state=on]:bg-muted`. Wrap with `<ToggleGroup>` for multi-select.

**Rule (filter-pill toolbar):** `<SelectTrigger size="sm">` filter pills in dense table toolbars render **chevron only, no leading category icon**. Generic filter glyphs are noise next to the chevron-down. Exception: dropdowns where a leading icon carries category-specific info AND is used consistently across 4+ filters in the same surface.

**Rule (toolbar layout):** Search fixed-width on left; Select filters clustered right; Sort dropdowns anchored far right via `ml-auto` to differentiate from narrowing filters.

### Lists / Tables

- **Table** (`table.tsx`) — body of every list view. Container: `rounded-sm shadow-(--shadow-border) overflow-hidden bg-white`. Header: `bg-ink-50` + `border-t border-ink-200`. **Header cell: sans Title Case `font-medium text-ink-600`** — NOT mono UPPERCASE eyebrow. Outer cell padding `px-4` (first/last col), inner `px-3`. Row hover: `bg-ink-50`.
- **Pagination** (`pagination.tsx`) — **renders as `<button type="button">`, not `<a>`** (no router in this app; visual = link styling, semantics = button). Same conversion applies to inline anchors in composed surfaces (modal subtitle refs, row-title links).
- **TablePaginationFooter** (`table-pagination-footer.tsx`) — **single source of truth for table pagination chrome.** Composes count summary + rows-per-page Select + windowed page links. State (page + rowsPerPage) lives in parent; primitive is controlled. `buildPageWindow` helper exported. **Don't hand-roll** — extend the primitive.

**Three-tier body-cell ink density** (locked):

| Tone | Use |
|---|---|
| `text-ink-500` | Context (timestamps, sub-IDs) |
| `text-ink-800` | Body data (IDs, keys, numerics, initiators) |
| `text-ink-900` | Row's primary identifier (model name with VendorAvatar, row title) |
| `text-ink-400` | Missing-data dashes (`—`) |

**No `ink-600` / `ink-700` body-cell tones** — middle-tier neutrals collide with the three-tier policy.

**Numeric column right-alignment**: numerics are mono tabular AND `text-right` on TableHead + TableCell. `tabular-nums` alone fixes intra-row digit width but not inter-row drift when `4,051` sits above `52,810` — right-edge anchoring places the ones-place at a fixed x across rows.

**Row-state indicator slot:** when a numeric column carries a conditional indicator (slow-row icon, etc.), reserve a fixed-width slot in the **leading** position on every row — slow renders the icon, non-slow renders an invisible placeholder — so the digit column doesn't drift between states.

### Modal / Drawer

- **Dialog** (`dialog.tsx`) — centered modal. **Modal tier:** `rounded-xl` (12px LOCKED) + `shadow-(--shadow-modal)`. Overlay: `bg-ink-900/40 backdrop-blur-xs`. Content: `bg-white rounded-xl border border-ink-200 shadow-(--shadow-modal) p-4 max-w-sm`. Header: title text-base font-medium / description text-sm text-ink-500.
- **AlertDialog** (`alert-dialog.tsx`) — same modal-tier surface; used for destructive confirmations.
- **Sheet** (`sheet.tsx`) — right-docked drawer. Flush against viewport edge (`rounded-none`), only a left border + modal-tier shadow.

**Rule:** Sheet for **inspection** (drill into a row, persist while reading). Dialog for **confirmation** or **paired-panel cross-link inspection** (selection state shared via single `activeRequestId`, auto-scroll-into-view on counterpart).

### Badges, Pills, Tags

- **Badge** (`badge.tsx`) — base: `h-5 rounded-xs border border-transparent pl-2.5 pr-1.5 font-mono text-xs font-medium tabular-nums`. **`font-mono tabular-nums` lives in the base CVA** — status codes, counters, deltas, word-labels all render mono by default. Variants: `default` (ink-900/white) · `secondary` · `destructive` (danger-100/700) · `outline` · `ghost` · `link` · `success` (success-100/700) · `warning` (warning-100/700) · `info` (blue-100/700).
- **Tag** (`tag.tsx`) — removable filter pill (NOT a Badge). `inline-flex h-6 rounded-full bg-ink-100 border border-ink-200 text-ink-900 font-sans text-xs gap-2`. With remove: `pr-1 pl-2`; without: `px-3`. **Use Tag for filter chips, Badge for status/counter/code.**
- **StatusDot** (`status-dot.tsx`) — 6px `rounded-full` inline-state dot. Tones: success (success-600), warning (warning-600), danger (destructive), info (blue-600), neutral (ink-500).
- **DeltaTag** (specimen in `CMP003BadgesAndTags.tsx`) — directional pill for KPI deltas. NOT a Badge. Inline-flex arrow icon (`size-3.5`) + value text at mono medium 12px tabular. API: `<DeltaTag delta="+8.2%" note="vs last hour" inverted={false} />`.
  - **Default sentiment** (sign-based): positive = `text-success-700` + up-right; negative = `text-destructive` + down-right.
  - **`inverted` flag** flips the tone: positive paints red, negative paints green; arrow still tracks the literal sign.
  - **`inverted` ONLY applies to rate metrics where lower is unambiguously better** — latency, error rate, cost-per-X, time-to-first-token. **Volume metrics (Total Cost, Total Tokens) stay sign-based** — rising correlates with usage growth, not badness.
  - **`+`/`-` sign preserved** on the displayed value (icon + color + sign together — redundant by design).
  - **No textual qualifier** ("Lower is better") accompanies inverted color — tried 2026-05-06 and rejected.

**Rule:** Pick `inverted` by asking "is rising in this metric *unambiguously* bad?" If no, don't invert.

### Hero Numerics & KPIs

- **HeroNumeric** (`hero-numeric.tsx`) — **single source of truth for sans-tabular hero numerics ≥24px.** Recipe: `font-sans font-medium tabular-nums tracking-tight text-ink-900`. Sizes: `default` (text-2xl/8, 24px — KPI rail, Top Keys hero) and `lg` (text-3xl/9, 32px — CMP-013 page hero). **Don't hand-roll.** **Don't extend below 20px** — mono digit-shape tells become visible at ~18px.
- **CompactKpi** (`compact-kpi.tsx`) — eyebrow + `<HeroNumeric>` value + optional `<DeltaTag>`. Two variants: standalone (own card chrome) / `flat` (chrome stripped, used inside divided rows).
- **Sparkline** (`sparkline.tsx`) — lightweight inline sparkline (5–14 points, ~24px). Lower visual weight than `<CompactSpark>` (h-9, recharts-based) used in dashboard hero cards. **KPI rail sparkline colors come from chart palette** (`--color-chart-1` blue, `--color-chart-3` green, `--color-chart-7` amber, `--color-ink-500` neutral) — NOT semantic ramps.
- **MessageBlock** (`message-block.tsx`) — CMP-014 conversation bubble. **Bubble border-only, no fill** (earlier tone-tinted fills `bg-ink-100`/`bg-blue-50` read as chat-app aesthetic). Outline gets `border-blue-100` to separate model output from user/tool input. `warn` state: `bg-warning-50` + `border-warning-200` — **narrowed to data carriers**, does NOT wash the surrounding row or header.

### Toast — `{components.toast}`

`sonner.tsx`. Sonner-based, hardcoded `light` theme. Border `--color-ink-200`, radius `0.5rem` (sonner-specific), `--shadow-popup` elevation. Status icons from lucide-react at `size-4`.

### Brand

- **BrandMark** (`icons/brand-mark.tsx`) — 7-path constellation, 280×280 viewbox. Paths inline `fill="currentColor"`. Asset `public/logomark.svg` fill `#1F2FCE` = `--color-blue-700`. Canonical: `<BrandMark className="size-8 text-blue-700" />`. Other tones: `text-white` (inverted), `text-ink-900` (monochrome). Sizing: min 16px, default 32px (sidebar), 48–96px hero. **Don't rotate/skew/distort/crop. Don't recolor outside the approved set. Don't add shadows or glows to the mark itself.**
- **VendorAvatar** (`icons/vendor-meta.tsx`) — **bare brand-colored icon at `size-4`. NO chip wrapper** (locked iter 7). API: `<VendorAvatar vendor={v} />`. Vendors: anthropic, openai, google, meta, mistral, deepseek, cohere, xai + marketplace providers (`marketplace-providers.tsx`). Three vendors (Cohere/Mistral/Gemini) render multi-color via per-path SVG fills — for those, wrapper `style.color` is ignored. **Don't reintroduce a chip wrapper, `tone` prop, or split treatment.**

### Inline links

**Not a primitive — a className convention.** Inline links in body text use **ink + permanent faint underline**:

```
underline decoration-ink-200 underline-offset-2
hover:decoration-ink-500
focus-visible:decoration-ink-500
outline-none
```

Rendered as `<button type="button">` (no router in this codebase — no `<a href>`). **Visual contract = link styling, semantics = button.** (decided — see `feedback_link-affordance.md`)

**No blue link color.** Blue is reserved for info / completed / active-tab / focus. Link affordance is permanent underline, not color.

### Composed-row patterns

#### Consolidated row pattern — KpiRail / QuickActionsRow (CMP-012)

Multi-section rows live in **one bordered card** with internal sections divided by **inset hairline `before:` pseudo-elements**:

```
relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-200
```

The hairline doesn't reach the rounded corners or section edges — reads lighter than a full-height `divide-x`. Sections are flat (no individual borders/shadows); the parent owns the chrome (`rounded-sm shadow-(--shadow-border) overflow-hidden`).

When one section is the focal action, accent it with `bg-blue-50` (and the icon chip with `bg-blue-100 text-blue-700`) — matches the assistant-message bubble fill in CMP-013. **Don't invert** (white text on solid blue) — too marketing-loud for the operator-tool register.

#### Section header capitalization

- Card titles: **Title Case** (`Recent Requests`, `Top Keys`, `Request Volume`, `Quick Actions`).
- Field/column labels: **sentence case** for technical terms (`Leaf hash`, `Anchor root`, `Anchored`).
- Single-word labels: unaffected.
- Eyebrows: **MONO UPPERCASE TRACKED** (`REQUESTS / 1H`, `TOTAL COST`).

---

## 8. Do's and Don'ts *(Google canonical §8 — cross-cutting only)*

### Do

- **Bind every value to a token.** Color, spacing, radius, shadow, type — all flow palette → semantic → component. No raw hex/oklch/rgba outside `@theme`.
- **Pick a 4px-multiple** for every `gap`, `padding`, `margin`, `space-y/x`. Half-step Tailwind classes are banned.
- **Use ramp tokens** (`text-warning-700`, `bg-success-100`) — not legacy single-token semantics.
- **Pair items with concentric radii**: 4px badge inside 6px card inside 12px modal.
- **Right-align numeric columns** in tables. `tabular-nums` alone doesn't fix inter-row drift.
- **Use `font-medium` on sans labels** (minimum). `font-normal` reads as ambient body.
- **Wrap hero summary numerics ≥24px in `<HeroNumeric>`.** Don't hand-roll the recipe.
- **Render pagination/inline links as `<button>`**, not `<a>`. No router in this app.
- **Use the chart palette by index**, not by entity. Brand-decoupled by default.

### Don't

- **Don't introduce blue as primary action color.** Primary is ink-900.
- **Don't introduce blue as inline-link color.** Links are ink + permanent faint underline.
- **Don't use `text-ink-600` or `text-ink-700` for table body cells.** Three-tier policy is 500 / 800 / 900 only.
- **Don't introduce solid 1px borders on cards** when `shadow-(--shadow-border)` provides the ring.
- **Don't inline `rgba()` shadows** — token discipline applies.
- **Don't extend `<HeroNumeric>` below 20px** — mono digit-shape tells become visible.
- **Don't strip `font-mono` from `<Badge>`** — base CVA carries it intentionally.
- **Don't symmetrize `<SelectTrigger>` padding** without re-litigating the optical-balance discussion.
- **Don't reintroduce the `VendorAvatar` chip wrapper** — locked at iteration 7.
- **Don't add a "Lower is better" qualifier sub-line** to inverted DeltaTags — tried and rejected.
- **Don't reintroduce dark-mode raw values** — when activated, redefine semantic tokens in a `:root.dark` block, not by re-introducing oklch values inline.

---

## Responsive Behavior *(our extension — preserved)*

The product targets desktop-first operator workflows; no mobile-shipped state today. Spec-sheet artboards use a fixed 1440px column to mirror the source Paper file; composed pages (CMP-012/013/014/016) are responsive but tuned for ≥1280px. **Mobile not observed in the current state — flagged TBD.**

### Breakpoints (Tailwind v4 defaults — no overrides in `@theme`)

| Name | Width | Key Changes |
|---|---|---|
| sm | 640px | (no specific overrides) |
| md | 768px | (no specific overrides) |
| lg | 1024px | Outer page padding `lg:p-6` (24px) |
| xl | 1280px | Composed-page target |
| 2xl | 1536px | Composed-page comfortable |

### Touch Targets

- Buttons: 36px minimum height (`h-9` default). 32px (`h-8`) sm only in dense toolbars.
- Inputs / Selects: same 36px minimum.
- Icon-only buttons: `size-9` (36×36) hit area; the icon itself is 16px (`size-4`).
- Checkbox / Radio: `size-4` (16px) visual + `after:-inset-x-3 after:-inset-y-2` hit-target padding.

### Collapsing Strategy

- **Sidebar** (left nav): no collapse spec today. Currently fixed at 256px (`w-64`) in DashboardChrome.
- **KPI rail:** four sections side-by-side at composed widths. Mobile collapse strategy TBD.
- **Tables:** horizontal scroll within container (`overflow-x-auto` on Table wrapper). Column priority not codified.

---

## Drift to Normalize *(our extension)*

None outstanding (2026-05-07). If unbound hex appears outside `@theme`, bind to the closest ramp atom.

## Open Questions *(our extension)*

1. **Wordmark + lockups.** Logomark finalized; wordmark + horizontal/stacked lockups TBD.
2. **Tagline.** Closest in-codebase one-liner is the CMP-012 subtitle ("Traffic, spend and latency across every model on the gateway.") — that's a subtitle, not a tagline.
3. **Favicon refresh.** `public/favicon.svg` predates the current logomark.
4. **Mobile.** No mobile state today. Sidebar/KPI-rail collapse and table column-priority not codified.
5. **Dark mode.** `:root.dark` intentionally absent. When activated, redefine semantic tokens against a dark palette in a `.dark` block — OKLCH ramp values stay constant across modes; only semantic mappings shift.
6. **Error / marketing voice.** Empty-state tone is set; error-state tone TBD. Marketing voice TBD until marketing surfaces ship.

---

## States Checklist *(our extension)*

| Surface | States |
|---|---|
| Forms (Input/Select/Switch/Checkbox/Radio) | Default · Focused · Hovered · Disabled · Invalid · Read-only |
| Tables (CMP-011/013/014) | Default · Hover · Selected · Sorted · Filtered · Empty · Loading (TBD) · Slow-row |
| Conversations (CMP-014) | User · Assistant · Tool call · Tool result (default + warn) |
| Modal / Sheet | Closed · Opening · Open · Closing · Backdrop-blur |
| Buttons | Default · Hover · Active · Focus · Disabled · Loading (TBD) |
| Toast | success · info · warning · error · loading |

**Rule:** every new screen in request/conversation/security ships with Default + Hover + Focus + Empty + Filtered in the same PR.

---

## Sources & Composed-page References

Tokens cite `src/index.css:LINE` inline. Components cite `src/components/ui/<file>.tsx`. Locked policy comes from `feedback_*.md` memories and `CLAUDE.md` "Things to not change without asking". Composed pages — compositions of the primitives above, not components themselves:

| Code | File | Pattern |
|---|---|---|
| CMP-012 | `src/artboards/CMP012ComposedDashboard.tsx` | KPI rail (consolidated row), Quick Actions (focal accent), dashboard chrome with traffic lights |
| CMP-013 | `src/artboards/CMP013Requests.tsx` | Hero card with `<HeroNumeric size="lg">`, request firehose table, Dialog drill-in with cross-link |
| CMP-014 | `src/artboards/CMP014Conversations.tsx` | KPI rail, conversations table, Dialog detail with `<MessageBlock>` flat-list thread |
| CMP-016 | `src/artboards/CMP016Models.tsx` | Models registry, 3×2 Quick Start integration cards, First-party + Marketplace `<SelectGroup>`s |

---

## Validation & Export

`npx @google/design.md lint design.md` validates. `--format dtcg` exports DTCG tokens (preserves `components.*`); `--format tailwind` exports Tailwind-v3 JSON (primitives only — for v4, translate each into `@theme inline { --color-*: ...; }`).
