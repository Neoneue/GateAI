# Constellation Gate AI — Brand Guidelines v0.2

> Last updated: 2026-05-07
> Status: Codifies the current state of `src/index.css` + `src/components/ui/*` + the artboards. This document and the code must agree; when they disagree, the code wins until this document is updated. **Update this file in the same change-set that touches a brand decision in code.**

This document supersedes v0.1 (2026-05-05). Major shifts since v0.1:

- Color: migrated from a 5-token-semantic + raw-hex ramp system to **5 OKLCH ramps × 11 steps (50–950)** with role-numbered conventions. Single-token semantics (`--color-warning`, `-2` variants) are gone — use ramp tokens (`text-warning-700`, `bg-success-100`).
- Materials: codified a **two-tier material ladder** (everyday 6px / modal 12px / sub-element 4px).
- Typography: split the four-voice mono/sans taxonomy into a **five-voice** system — hero summary numerics ≥24px now render sans tabular via the `<HeroNumeric>` primitive; data-tier numerics stay mono.
- Components: `Badge` defaults to `font-mono tabular-nums`. `PaginationLink` renders as `<button>`. `SelectTrigger` uses asymmetric padding (`pl-N pr-(N-1)`). `VendorAvatar` is a bare brand-colored icon — no chip wrapper. `<TablePaginationFooter>` primitive added as the canonical table-pagination chrome.
- Charts: 8-slot OKLCH categorical palette (`--chart-1..8`), brand-decoupled — series pick by index, not by entity.

Logo/wordmark/tagline marks remain partially TBD; primary logomark is in use.

---

## Quick reference

| Element | Value |
|---------|-------|
| Product name | **Constellation Gate AI** |
| Product category | AI gateway with audit anchoring |
| Color system | 5 OKLCH ramps × 11 steps (50–950) — `ink`, `blue`, `success`, `warning`, `danger` |
| Primary action color | `--color-ink-900` (`oklch(0.090 0 0)`) — *not* blue |
| Brand-accent color | `--color-blue-700` (`oklch(0.345 0.224 268.85)` ≈ `#1F2FCE`) — anchored to logomark |
| Sans typeface | Geist (variable, weights 300/400/500/600/700) |
| Mono typeface | Geist Mono (weights 400/500/600) |
| Voice | Precise, operational, dense, technically literate, no fluff |
| Spacing grid | 4px multiples only |
| Type scale | Tailwind named scale only — `text-3xl/4xl/6xl` overridden in `@theme` to Geist values 32/40/64 |
| Material ladder | 6px everyday surfaces / 12px modals / 4px sub-elements |
| No dark mode | `:root.dark` block intentionally absent; `@custom-variant dark` declared for future activation |

---

## 1. Color palette

The single source of truth is `src/index.css` `@theme {}`. All values are OKLCH; raw hex appears only on atomic surfaces (`#FFFFFF` white, `#ECECE7` canvas) and on a small set of non-semantic platform tokens (syntax + traffic lights). **No raw hex / oklch / rgba outside the `@theme` block.**

### Ramp architecture — 5 ramps × 11 steps

Every ramp follows Geist/Radix-inspired role conventions so step numbers carry the same meaning across colors:

| Step | Role |
|------|------|
| 50–100 | Subtle backgrounds (washes, hover-bg) |
| 200 | Borders, dividers |
| 300 | Strong borders, ghost-button hover-bg |
| 400 | Placeholder text, low-contrast accents |
| 500 | Secondary text, chart strokes (medium contrast) |
| 600 | Saturated mid (default solid surfaces, primary action color) |
| 700 | Saturated dark (hover state, primary text on tinted bg, brand-mark anchor) |
| 800–900 | Text on white (high-contrast) |
| 950 | Deepest (rare — extreme contrast, dark-mode anchors) |

### Ink ramp (neutrals — pure neutral chroma)

The full gray vocabulary. ink-900 is anchored near `#09090B` for primary-button identity.

| Token | OKLCH | Typical use |
|-------|-------|-------------|
| `--color-ink-50` | `oklch(0.985 0 0)` | Lightest wash. SegmentedPill background, code-card chrome, sub-tier surfaces |
| `--color-ink-100` | `oklch(0.960 0 0)` | `--muted`, `--secondary`, `--accent` resolve here. Card fills, message-bubble fills, hover-bg |
| `--color-ink-200` | `oklch(0.910 0 0)` | `--border`, `--input`, `--sidebar-border` resolve here. Default border on cards, modals, dialogs, tables |
| `--color-ink-300` | `oklch(0.820 0 0)` | Strong borders, ghost-button hover-bg, dashed gridlines |
| `--color-ink-400` | `oklch(0.680 0 0)` | `--ring`, `--sidebar-ring` resolve here. Placeholder text, missing-data dashes, breadcrumb separators |
| `--color-ink-500` | `oklch(0.530 0 0)` | `--muted-foreground`. Quiet metadata, eyebrow text, table context column (timestamps, sub-IDs), chart strokes |
| `--color-ink-600` | `oklch(0.380 0 0)` | Sans Title Case label color (table column heads), nav text. Saturated mid neutral |
| `--color-ink-700` | `oklch(0.260 0 0)` | Strong field labels. Note: avoid as table body-cell tone — middle-tier neutrals collide with the three-tier policy. |
| `--color-ink-800` | `oklch(0.165 0 0)` | Body default (set on `body { color: ... }`). Table body-data tone |
| `--color-ink-900` | `oklch(0.090 0 0)` | `--foreground`, `--primary`. Primary action color, headlines, table primary-identifier tone |
| `--color-ink-950` | `oklch(0.045 0 0)` | Reserved (extreme contrast / future dark-mode anchor) |

### Blue ramp (brand)

Anchored to the logomark at blue-700; the rest is derived around it.

| Token | OKLCH | Use |
|-------|-------|-----|
| `--color-blue-50` | `oklch(0.970 0.020 268.85)` | Wash (assistant-message bubble fill, focal-section accent in consolidated rows) |
| `--color-blue-100` | `oklch(0.940 0.040 268.85)` | Subtle bg (assistant-message bubble border, action-section icon chip bg) |
| `--color-blue-200` | `oklch(0.890 0.075 268.85)` | Borders, chart fills |
| `--color-blue-300` | `oklch(0.810 0.130 268.85)` | (chart fill / hover) |
| `--color-blue-400` | `oklch(0.700 0.180 268.85)` | (chart stroke / placeholder) |
| `--color-blue-500` | `oklch(0.580 0.215 268.85)` | (secondary text on tinted bg) |
| `--color-blue-600` | `oklch(0.470 0.232 268.85)` | (saturated mid) |
| `--color-blue-700` | `oklch(0.345 0.224 268.85)` ≈ `#1F2FCE` | **Brand mark — anchored to `public/logomark.svg`.** Brand-accent text on light bg, focus rings (where blue is wanted), info-state foreground |
| `--color-blue-800` | `oklch(0.275 0.175 268.85)` | (saturated dark) |
| `--color-blue-900` | `oklch(0.215 0.130 268.85)` | (high-contrast) |
| `--color-blue-950` | `oklch(0.145 0.085 268.85)` | (deepest) |

`info` aliases to the blue ramp — there is no separate `info-*` ramp. Active-tab indicators, completed states, focus rings, and "info" badges all consume blue-* tokens.

### Success ramp (Tailwind v4 green OKLCH)

| Token | OKLCH | Use |
|-------|-------|-----|
| `--color-success-50` | `oklch(0.982 0.018 155.826)` | Wash for success-tinted badge/pill backgrounds |
| `--color-success-100` | `oklch(0.962 0.044 156.743)` | Badge bg (`<Badge variant="success">` fills with this) |
| `--color-success-200` | `oklch(0.925 0.084 155.995)` | Badge border, divider on success-tinted surfaces |
| `--color-success-300` | `oklch(0.871 0.150 154.449)` | Strong border |
| `--color-success-400` | `oklch(0.792 0.209 151.711)` | Low-contrast accent |
| `--color-success-500` | `oklch(0.723 0.219 149.579)` | Chart stroke, secondary success indicator |
| `--color-success-600` | `oklch(0.627 0.194 149.214)` | Saturated mid (DeltaArrow positive, success solid fill) |
| `--color-success-700` | `oklch(0.527 0.154 150.069)` | **Saturated text color on tinted backgrounds — DeltaTag positive value text** |
| `--color-success-800` | `oklch(0.448 0.119 151.328)` | High-contrast text |
| `--color-success-900` | `oklch(0.393 0.095 152.535)` | Deeper text |
| `--color-success-950` | `oklch(0.266 0.065 152.934)` | Deepest |

### Warning ramp (Tailwind v4 amber OKLCH)

| Token | OKLCH | Use |
|-------|-------|-----|
| `--color-warning-50` | `oklch(0.987 0.022 95.277)` | Wash |
| `--color-warning-100` | `oklch(0.962 0.059 95.617)` | Badge bg (`<Badge variant="warning">`) |
| `--color-warning-200` | `oklch(0.924 0.120 95.746)` | Badge border |
| `--color-warning-300` | `oklch(0.879 0.169 91.605)` | Strong border |
| `--color-warning-400` | `oklch(0.828 0.189 84.429)` | Low-contrast accent |
| `--color-warning-500` | `oklch(0.769 0.188 70.080)` | Chart stroke |
| `--color-warning-600` | `oklch(0.666 0.179 58.318)` | Saturated mid (slow-row indicator icon `text-warning-600`) |
| `--color-warning-700` | `oklch(0.555 0.163 48.998)` | Saturated text on tinted bg |
| `--color-warning-800–950` | … | High-contrast tiers |

### Danger ramp (Tailwind v4 red OKLCH)

| Token | OKLCH | Use |
|-------|-------|-----|
| `--color-danger-50` | `oklch(0.971 0.013 17.380)` | Wash |
| `--color-danger-100` | `oklch(0.936 0.032 17.717)` | Badge bg (`<Badge variant="destructive">`) |
| `--color-danger-200` | `oklch(0.885 0.062 18.334)` | Badge border |
| `--color-danger-600` | `oklch(0.577 0.245 27.325)` | **`--destructive` semantic token resolves here.** DeltaArrow negative, danger badge text |
| `--color-danger-700` | `oklch(0.505 0.213 27.518)` | Saturated text |
| `--color-danger-800–950` | … | High-contrast tiers |

### Atomic surfaces

| Token | Value | Use |
|-------|-------|-----|
| `--color-white` | `#FFFFFF` | Cards, dialogs, popovers, modal background, app body bg |
| `--color-canvas` | `#ECECE7` | Warm-paper canvas behind the app shell. Painted via `--canvas-bg` + `--canvas-grid` |
| `--canvas-grid` | `color-mix(in oklch, var(--color-ink-800) 6%, transparent)` | Grid lines on body bg (linear-gradient 40px) |

### Syntax tokens (code surfaces only)

Used by the `<CodeBlock />` primitive (CMP-008c, CMP-012 code cards). Not part of the semantic palette — kept isolated so re-skinning code surfaces doesn't bleed into UI tokens.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-syntax-keyword` | `#B6491A` | curl flags, export, terminal commands |
| `--color-syntax-variable` | `#D69E2E` | `$KEY` interpolations |
| `--color-syntax-property` | `#4165FF` | JSON keys / object props |
| `--color-syntax-terminal-blue` | aliased to `--color-blue-400` | Terminal numbers / status |

### Traffic-light tokens (CMP-012 dashboard chrome strip)

Platform affordances (macOS-style window controls), not semantic palette. Isolated so we can re-skin without touching the danger/warning/success ramps.

| Token | Hex |
|-------|-----|
| `--color-traffic-red` | `#FF5F57` |
| `--color-traffic-amber` | `#FEBC2E` |
| `--color-traffic-green` | `#28C840` |

### Chart palette (categorical, 8-slot)

Standalone OKLCH categorical palette in `src/index.css` `:root`. **Brand-decoupled** — chart series pick a slot by index, not by entity. Per PM call (2026-05-06): "we need a palette of colors for all graphs throughout the app and they should be used regardless of the content."

| Token | OKLCH | Hue label |
|-------|-------|-----------|
| `--chart-1` | `oklch(0.62 0.18 255)` | Blue |
| `--chart-2` | `oklch(0.72 0.17 50)` | Orange |
| `--chart-3` | `oklch(0.72 0.20 145)` | Green |
| `--chart-4` | `oklch(0.70 0.18 290)` | Purple |
| `--chart-5` | `oklch(0.65 0.20 18)` | Coral |
| `--chart-6` | `oklch(0.75 0.13 195)` | Teal |
| `--chart-7` | `oklch(0.85 0.16 88)` | Amber |
| `--chart-8` | `oklch(0.68 0.20 335)` | Magenta |

All eight slots sit at L 0.62–0.85, C 0.13–0.20 (uniformly bright, mid-saturation). Adjacent slots in palette order are ≥85° apart in hue. **No neutral as a categorical slot** — gray is reserved for "Other/Unknown" semantic states. Per-series `slot?: number` override on `VendorMeta` lets specific charts pin colors when there's a brand mnemonic worth honoring (Anthropic→orange slot 2, OpenAI→blue slot 1) — opt-in only. Full design rationale, surveys of comparison systems, and iteration history in `docs/chart-colors.md`.

**KPI rail sparklines** also consume chart palette tokens (`--color-chart-1` blue, `--color-chart-3` green, `--color-chart-7` amber, `--color-ink-500` neutral) — NOT semantic ramps. Mixing chart and semantic palettes makes rails read inconsistently.

### Vendor brand colors

External provider identity colors. Used only by `<VendorAvatar />` — a bare brand-colored icon at `size-4`, **no chip wrapper** (locked 2026-05-06, iteration 7).

| Vendor | Color |
|--------|-------|
| Anthropic | `#D97757` |
| OpenAI | `#10A37F` |
| Google (Gemini) | canonical Google gradient (multi-color SVG) |
| Meta | `#0064E0` |
| Mistral | five-band gradient (multi-color SVG) |
| DeepSeek | `#4D6BFE` |
| Cohere | three-blob multi-color SVG |
| xAI (Grok) | `#3D3D3D` |

Three vendors render multi-color via per-path fills inside the SVG (Cohere, Mistral, Gemini) — for those, the wrapper's `style.color` is ignored. API: `<VendorAvatar vendor={v} />` — that's the whole surface; iteration history in `vendor-meta.tsx`.

### Semantic-token cascade (`:root` layer)

Every semantic token resolves to a palette atom via `var(--color-*)`. No raw hex / oklch / rgba in this block — the `@theme` palette is the single source of truth.

| Semantic | Resolves to |
|----------|-------------|
| `--background` | `--color-white` |
| `--foreground` | `--color-ink-900` |
| `--card` / `--popover` | `--color-white` |
| `--primary` | `--color-ink-900` |
| `--primary-foreground` | `--color-white` |
| `--secondary`, `--muted`, `--accent` | `--color-ink-100` |
| `--secondary-foreground`, `--accent-foreground` | `--color-ink-900` |
| `--muted-foreground` | `--color-ink-500` |
| `--destructive` | `--color-danger-600` |
| `--border`, `--input` | `--color-ink-200` |
| `--ring` | `--color-ink-400` |

### Accessibility

- Body text on white: `text-ink-800` on `#FFFFFF` — WCAG AAA.
- Eyebrow text on dense chrome: `text-ink-500` on white — WCAG AA Large.
- Focus ring: `ring-ink-400/50` (ink-tinted, not blue) — meets visible-focus requirement.
- Status badge text on tinted bg (e.g. `text-success-700` on `bg-success-100`) — verified AA Small for shipped variants.

---

## 2. Typography

### Font stack

```css
--font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
--font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", monospace;
```

Loaded via Google Fonts CDN + `@fontsource-variable/geist` fallback. **No IBM Plex** — tokens removed 2026-05-05. **No `--font-heading` separate from `--font-sans`** — Geist serves both; aliased via `@theme inline`.

### Type scale (Tailwind named scale only)

Arbitrary `text-[Npx]` sizes are banned. Three Tailwind-named sizes are overridden in `@theme {}` to Geist's heading scale (even-numbered, larger increments at the top); all other sizes already match Geist values.

| Class | Size / line | Tailwind default → override | Use |
|-------|-------------|---------|-----|
| `text-xs` | 12px / 16px | (matches) | Eyebrow / sm, table column heads, breadcrumbs, dense metadata |
| `text-sm` | 14px / 20px | (matches) | Eyebrow / default, modal field labels, body in compact surfaces |
| `text-base` | 16px / 24px | (matches) | Card subtitles, button labels, body in spacious surfaces |
| `text-lg` | 18px / 28px | (matches) | Modal hero ID (`req_aurora_4200`), card titles in major surfaces, modal `KpiTile` value (mono — below sans-hero threshold) |
| `text-xl` | 20px / 28px | (matches) | Reserved |
| `text-2xl` | 24px / 32px | (matches) | **`<HeroNumeric>` default** — KPI rail values, panel hero (Top Keys total) |
| `text-3xl` | 30px → **32px / 40px** | overridden | Page titles (`h1`), **`<HeroNumeric size="lg">`** — full-page hero metrics (CMP-013 `8,241`) |
| `text-4xl` | 36px → **40px / 48px** | overridden | Reserved |
| `text-5xl` | 48px / 1 | (matches) | "Metric display" tier — landing/hero numerics. Not currently consumed |
| `text-6xl` | 60px → **64px / 1** | overridden | Reserved (escape hatch, not in active hierarchy) |

### Five-voice taxonomy (codified 2026-05-07)

The product expresses **five typographic voices**, each with a single job:

| Voice | Recipe | Use |
|-------|--------|-----|
| **Display headline / hero numeric** | `font-sans tabular-nums font-medium tracking-tight` (via `<HeroNumeric>`) | Page titles, KPI hero values (24px), full-page hero metrics (32px), panel heroes — *summary, look at this* |
| **Body / label** | `font-sans` (regular or `font-medium`) | Card titles, page subtitles, button labels, key/project names, table column headers — *human, read this* |
| **Eyebrow** | `font-mono uppercase tracking-[0.1em] font-medium` | Section eyebrows, KPI labels, segmented control labels, chrome strips — *what is this* |
| **Badge / pill** | `font-mono tabular-nums font-medium text-xs` (via `Badge` primitive default) | Status codes (`200`/`500`), counters, deltas, inline pills — *operational chrome* |
| **Data** | `font-mono tabular-nums` | Table cells, IDs, codes, hashes, model identifiers, modal sub-tier numerics, row values — *raw data* |

**The hero/data split is size-gated.** Hero summary numerics ≥24px render sans (sans + `tabular-nums` carries the cell-padding mono affordance while signaling "presented summary"). **Below ~20px, numerics revert to mono regardless of role** — modal `KpiTile` at text-lg, table cells, badge contents, row costs all stay mono. The cutoff is real: at ~18px the digit-shape differences between Geist Sans tabular and Geist Mono become more visible, and the mono-illusion breaks.

**Critical rule:** sans labels are `font-medium` minimum. `font-normal` reads as ambient body text, not a label. Color does the *quiet* work; weight does the *structural* work.

### `<HeroNumeric>` primitive

Single source of truth for the hero summary numeric tier. Lives at `src/components/ui/hero-numeric.tsx`. Two sizes:

| Variant | Class | Pixel | Use |
|---------|-------|-------|-----|
| `default` | `text-2xl/8` | 24px / 32px | KPI rail value (`<CompactKpi>`), panel hero (Top Keys `$1,147.82`) |
| `lg` | `text-3xl/9` | 32px / 36px | Full-page hero metric (CMP-013 `8,241`) |

Don't hand-roll the recipe. Don't extend below 20px without re-examining the size-gate boundary.

### Eyebrow size variants

Following the `sm | default` size convention used by Button, Input, Select, Segmented, SegmentedPill:

| Variant | Class | Pixel | Use |
|---------|-------|-------|-----|
| `sm` | `text-xs` | 12px / 16px | Inline / dense chrome: KPI labels, card section eyebrows, top-bar strips |
| `default` | `text-sm` | 14px / 20px | Standalone / focal: modal eyebrows, drawer headers, hero strips |

### Mono ratio

Operational surfaces target ~60% mono / 40% sans. Mono is the "machine voice" — IDs, codes, data numerics, badges, eyebrows. Sans is the "human voice" — titles, body, button labels, hero summary numerics. Taste-driven, not enforced.

---

## 3. Logo / wordmark

### Logomark

**Status:** primary logomark in use as of 2026-05-05. Wordmark and additional lockups still TBD.

- **Asset:** `public/logomark.svg` — 280×280 viewbox, 7-path constellation mark, fill `#1F2FCE` (matches `--color-blue-700` ≈ `oklch(0.345 0.224 268.85)`).
- **Component:** `<BrandMark />` in `src/components/icons/brand-mark.tsx`. Inlines the 7 paths with `fill="currentColor"` so consumers color via Tailwind.
- **Canonical usage:** `<BrandMark className="size-8 text-blue-700" />` — blue mark on white at 32px. Currently rendered in CMP-012 / CMP-013 / CMP-014 left rail.
- **Other tones:** `text-white` for inverted contexts, `text-ink-900` for monochrome lockups.

### Sizing guidance

- **Minimum digital size:** 16px wide. Below that the constellation paths lose detail.
- **Default sidebar / chrome size:** 32px (`size-8`).
- **Hero / standalone use:** 48–96px.
- **Favicon:** TBD — existing `public/favicon.svg` predates the current logomark and should be regenerated.

### Don'ts

- Don't rotate, skew, or distort the mark.
- Don't recolor outside the approved set: `text-blue-700` (canonical), `text-white` (inverted), `text-ink-900` (monochrome).
- Don't add shadows, glows, or effects to the mark itself. Container chrome can have shadows; the mark stays clean.
- Don't crop. The full 7-path silhouette is the mark.
- Don't place on busy photography backgrounds without a solid container.

### Wordmark — TBD

The string "Constellation Gate AI" currently appears with two provisional treatments (mono-uppercase tracked in the left nav; sans in the dashboard footer). Pick one when the wordmark spec lands.

### Lockups — TBD

Mark-only is the only finalized variant. Mark+wordmark horizontal and stacked lockups have not been specified.

---

## 4. Voice & messaging

### Brand personality

| Trait | We are | We are not |
|-------|--------|------------|
| **Precise** | Specific, accurate, name things by their real names ("audit anchor," "PEP watchlist," "tenant," "request firehose") | Vague, hedging, marketer-speak ("powerful," "best-in-class," "next-generation") |
| **Operational** | Implementation-aware — copy mentions the actual API path, the actual auth pattern, the actual gateway behavior | Aspirational — empty promises about what the product *will* do |
| **Dense** | Pack signal in every sentence; assume the reader is the operator running this in prod | Padded — no warm-up paragraphs, no introductory throat-clearing |
| **Confident** | Direct, declarative; verbs first ("Click a row to inspect", "Group by conversation", "Hit /v1/messages") | Apologetic, qualified, hedging |
| **Honest** | Visible TODOs; descriptions admit complexity; status badges show real state including failures | Smoothed-over — pretending the system is more polished than it is |

### Sample sentences (on-brand)

Pulled verbatim from current artboard descriptions:

- "Live request firehose. Hero metric + sparkline, filter bar, sortable log of every gateway call."
- "Every generation routed through the gateway. Click any row to see its message thread."
- "Hit /v1/messages with the bearer token. The gateway routes to the cheapest healthy provider for the model."
- "Geist for the UI, Geist Mono for the machine. ~60% mono / 40% sans on dense operational surfaces."
- "Sortable headers, mono numerics, status pills inline, row hover, selected row, action menu. The body of every list view."

### Banned phrases (anti-list)

| Phrase | Why |
|--------|-----|
| "powerful" | Vague claim; show, don't assert |
| "seamless" / "seamlessly" | Marketing filler — describes nothing |
| "best-in-class" | Unverifiable; sounds like a sales deck |
| "next-generation" | Time-anchored brag, ages instantly |
| "revolutionary" / "game-changing" | Empty intensifier |
| "AI-powered" | Tautological for an AI gateway |
| "leverage" | Use "use" |
| "enable" (when "let" works) | Corporate softener |
| "synergy" / "synergistic" | Pure jargon |
| "delight" (as a verb in product copy) | Reserved for moments that earn it |
| "world-class" | Hollow superlative |
| "easily" / "with ease" | If it's easy, the copy doesn't need to claim so |
| "unleash" / "unlock" | Marketing-speak |

### Tone by context

| Context | Tone | Example |
|---------|------|---------|
| In-app product UI | Operational, dense | "Live request firehose. Click any row to see its message thread." |
| Error state | Calm, action-oriented | (TBD — establish when an error UX ships) |
| Empty state | Onboarding-ish, action-oriented | "Create your first key to start sending requests through the gateway." |
| Documentation | Reference-style, instructional | "Hit /v1/messages with the bearer token." |
| Marketing / landing | TBD | (write only when needed) |

### Product-name usage

- **First reference** in any doc / page / surface: full name "Constellation Gate AI"
- **Subsequent references** in the same context: "the gateway" (lowercase) is acceptable when scope is clear
- **Never:** "CGAI," "Constellation," or other abbreviations
- **In code identifiers:** `constellation` lowercase (e.g., `acme-prod.constellation.io`, `@constellation/gateway`)

### Tagline

**TBD.** The closest in-codebase one-liner is the CMP-012 page subtitle: *"Traffic, spend and latency across every model on the gateway."* That is a page subtitle, not a tagline.

---

## 5. Imagery

### Icons

- Library: `lucide-react`
- Default stroke weight: `1.75`
- Default sizes: `size-3` (12px), `size-3.5` (14px), `size-4` (16px), `size-5` (20px) — pick by surface density
- Icons within `<Button>` use the `data-icon="inline-start"` / `inline-end"` attribute so the button CVA applies the variant-aware padding adjustment
- Inline SVG attributes reference palette tokens: `fill="var(--color-white)"`, `stroke="var(--color-ink-100)"`. Never raw hex.

### Vendor logos — `<VendorAvatar />`

**Locked 2026-05-06, iteration 7.** Bare brand-colored icon at `size-4`. **No chip wrapper.** No `tone` prop. Three vendors render multi-color via per-path SVG fills (Cohere three-blob, Mistral five-band gradient, Gemini canonical Google gradient) — for those, the wrapper's `style.color` is ignored.

API: `<VendorAvatar vendor={v} />`. Iteration history in `vendor-meta.tsx`. Don't reintroduce a chip wrapper or split treatment without explicit ask.

### Photography / illustrations

**None today.** The product surface is functional UI only. When marketing surfaces ship, those need their own imagery rules — establish them at that point, do not extrapolate from in-app conventions.

---

## 6. Component conventions

The full primitive library is `src/components/ui/*.tsx`. Highlights of the brand-relevant decisions below.

### Primary action

`bg-primary text-primary-foreground` resolves to ink-900 / white. Primary buttons are dark, not blue. Codified 2026-05-05.

### Material ladder (codified 2026-05-05)

Two-tier elevation, plus a sub-element radius for items inside tracks:

| Tier | Radius | Shadow token | Use |
|------|--------|--------------|-----|
| Everyday surface | `rounded-sm` (6px) | `--shadow-border` (1px ring + subtle lift) | Card primitive, KpiRail, table containers, `RecentRequestsCard`, hero card chrome |
| Modal surface | `rounded-xl` (12px, overridden in `@theme inline`) | `--shadow-modal` (16px lift + 1px ring) | Dialog, AlertDialog, Sheet — drill-in panels |
| Sub-element | `rounded-xs` (4px) | n/a | Tabs trigger/indicator, Segmented item/indicator, SelectItem, Badge |
| Menu / popover | `rounded-sm` (6px) | `--shadow-popup` (4px lift + 1px ring) | Select content, dropdown menus, tooltips |

**Concentric rule:** item radius < container radius. A 4px-radius badge inside a 6px-radius card inside a 12px-radius modal reads correct; the reverse looks wrong.

### Card padding

All cards use **16px** (`p-4`) on all sides. `Card` primitive default; `CardHeader` / `CardContent` use `px-4`; `CardFooter` uses `p-4`. Don't override with `p-5` / `px-5` — the original 20px overrides were normalized down 2026-05-05.

### Table padding

- Outer cells: `px-4` (16px) on first/last column
- Inner cells: `px-3` (12px) default
- Header cell text: sans Title Case `font-medium text-ink-600` — *not* mono uppercase eyebrow
- Body cell tone follows the **three-tier policy** (below)

### Toolbar padding

Toolbar rows above tables use **16px** all sides (`p-4`) or `py-3 px-4` (12px vertical, 16px horizontal) for compact toolbars.

### Three-tier table ink density (codified 2026-05-06)

Body cells use only three ink tones:

| Tone | Use |
|------|-----|
| `text-ink-500` | Context (timestamps, sub-IDs under titles) |
| `text-ink-800` | Body data (IDs, keys, numerics, initiators, secondary text) |
| `text-ink-900` | Row's primary identifier (model name with VendorAvatar, row title button) |
| `text-ink-400` | Missing-data dashes (`—`) |

**No `ink-600` / `ink-700` middle tones in body cells without explicit reason** — PM caught a 600-vs-800 drift in CMP-013 on 2026-05-06 (~15-pt OKLCH lightness gap between IDs and numerics). See `feedback_table-ink-tiers.md`.

### Numeric column right-alignment (codified 2026-05-06)

Numerics in table cells are mono tabular AND **right-aligned** (`text-right` on TableHead + TableCell). `tabular-nums` alone only fixes intra-row digit width — it does not fix inter-row drift when `4,051` sits above `52,810`. Right-edge anchoring places the ones-place at a fixed x across rows.

When a numeric column carries a conditional row-state indicator (slow-row icon, etc.), reserve a fixed-width slot in the **leading** position on every row — slow renders the icon, non-slow renders an invisible placeholder — so the digit column doesn't drift between states.

### Inline links — ink + faint underline

Inline links use ink + permanent faint underline:
```
underline decoration-ink-200 underline-offset-2
hover:decoration-ink-500
focus-visible:decoration-ink-500
outline-none
```

**No blue link color.** Blue is reserved for info / completed / active-tab / focus. Link affordance is permanent underline, not color.

### `PaginationLink` renders as `<button>` (codified 2026-05-06)

The `PaginationLink` primitive in `src/components/ui/pagination.tsx` was patched to render `<button type="button">` — original shadcn used Base UI's `render={<a>}` override which is wrong for this codebase (no router → cmd/middle-click was never navigating anywhere).

Same conversion applies to inline anchors in composed surfaces — modal subtitle conversation refs, row-title links: `<a href="#" onClick={preventDefault}>` → `<button type="button">` with the link affordance preserved. **Visual contract = link styling, semantics = button.**

### `Badge` primitive defaults (codified 2026-05-07)

The Badge base CVA includes `font-mono tabular-nums`. Status codes (`200`, `500`), counters, and any numeric content render mono automatically. Per-instance `font-mono` overrides are redundant. Word-label badges ("clean", "info") also render mono — appropriate for the operator-tool register.

### `SelectTrigger` asymmetric padding (codified 2026-05-07)

Every size variant uses `pl-N pr-(N-1)`:
- `xs` / `sm`: `pl-3 pr-2` (12px text / 8px chevron)
- `default` / `lg`: `pl-4 pr-3` (16px text / 12px chevron)

Optical balance rule: any trigger or button with a leading/trailing icon has more padding on the text side. Letterforms have crisp left edges that want air; chevrons/arrows have built-in whitespace inside their bounding box. Mirrors the Button primitive's `data-icon` idiom.

### Filter-pill toolbar pattern (codified 2026-05-07)

`<SelectTrigger size="sm">` filter pills in dense table toolbars render with **chevron only — no leading category icon**. Generic filter glyphs (funnel, key, eye) are decorative noise next to the chevron-down — the chevron signals "this opens" and the label disambiguates. CMP-013 + CMP-014 follow this rule.

Exception: dropdowns where a leading icon carries category-specific information AND is used consistently across 4+ filters in the same surface.

### `<HeroNumeric>` primitive (codified 2026-05-07)

Sans-tabular display tier for summary numerics ≥24px. Two sizes (`default` 24px, `lg` 32px). Recipe: `font-sans font-medium tabular-nums tracking-tight text-ink-900`. Used by `CompactKpi`, Top Keys hero, CMP-013 page hero. **Don't hand-roll the recipe** — every hero summary numeric consumes the primitive.

### `<TablePaginationFooter>` primitive (codified 2026-05-07)

Single source of truth for table pagination chrome. Composes count summary ("Showing 1–25 of 8,241") + rows-per-page select + windowed page links. Used by CMP-011 sortable, CMP-013 requests, CMP-014 conversations. State (page + rowsPerPage) stays in the parent; the primitive is controlled. The `buildPageWindow` helper is exported for callers that need the truncation pattern outside the footer.

### Selectors with sliding indicators

`Tabs` (default variant), `Segmented` (pill variant), `SegmentedPill` all use a sliding white indicator on selection — 200ms ease-out, transform/width animated. Single visual idiom across every pill-style selector. Codified 2026-05-05.

### `DeltaTag` (delta pill)

`<DeltaTag delta="+8.2%" note="vs last hour" inverted={false} />` — directional pill for percentage / numeric deltas in KPI cards.

- **Default sentiment** (sign-based): positive = `text-success-700`, negative = `text-destructive`. Up-right arrow for positive, down-right for negative.
- **`inverted` flag** flips the tone: positive paints red, negative paints green. Arrow still tracks the literal sign.
- **`inverted` only applies to rate metrics where lower is unambiguously better** — latency, error rate, cost-per-call, cost-per-conv, time-to-first-token. **Volume metrics (Total Cost, Total Tokens) stay sign-based** because rising correlates with usage growth, not with badness.
- **No textual qualifier** ("Lower is better") accompanies the inverted color — tried 2026-05-06 and rejected as bad UI.
- **`+`/`-` sign on the displayed delta value is preserved** (icon + color + sign together — redundant by design, since sign is the convention readers expect for tabular deltas).
- Pill chrome: not a `<Badge>`. Inline-flex with arrow icon at `size-3.5` + value text at mono medium 12px tabular.
- Specimen: `src/artboards/CMP003BadgesAndTags.tsx` (CMP-003.3).

### Consolidated row pattern

Multi-section rows (KPI rail, Quick Actions) live in **one bordered card** with internal sections divided by **inset hairline** `before:` pseudo-elements:

```
relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-200
```

The hairline doesn't reach the rounded corners or section edges — reads lighter than a full-height `divide-x`. Sections are flat (no individual borders/shadows); the parent owns the chrome (`rounded-sm shadow-(--shadow-border) overflow-hidden`).

When one section is the focal action, accent it with `bg-blue-50` (and the icon chip with `bg-blue-100 text-blue-700`) — matches the assistant-message bubble fill in CMP-013. **Don't invert** (white text on solid blue) — too marketing-loud for the operator-tool register.

Used by:
- `KpiRail` in CMP-012 (4 metric sections side-by-side)
- `QuickActionsRow` in CMP-012 (titled card with 4 action sections, Upgrade highlighted)

### Section header capitalization

- Card titles use **Title Case**: `Recent Requests`, `Top Keys`, `Request Volume`, `Quick Actions`.
- Field/column labels use **sentence case** for technical terms: `Leaf hash`, `Anchor root`, `Anchored`.
- Single-word labels are unaffected.
- Eyebrows use **MONO UPPERCASE TRACKED**: `REQUESTS / 1H`, `TOTAL COST`.

### Layout grid (composed pages)

Composed pages use a **12-column grid with 16px gutters** (`grid grid-cols-12 gap-4`). Section widths are expressed as `col-span-N` where the row sums to 12. Asymmetric layouts (hero + sidebar, e.g. `col-span-8 + col-span-4`) live here naturally.

**Outer page margins** at the `lg`, `xl`, `2xl` breakpoints are **24px on all sides** (`lg:p-6` or equivalent split). Smaller breakpoints can use less.

The 16px gutter is intentionally tighter than the conventional Bootstrap / Material default (24px) — denser surface, more on-genre for an operator tool. 16 and 24 are 4px multiples, so this coexists with the 4px-grid spacing rule.

### Page-header subtitle width

Capped at `max-w-1/2` on the **wrapper column** (not the `<p>` directly — fractional max-w on a leaf inside a content-sized column won't behave). Cap = 50% of the page-header flex parent.

### Spacing

**4px grid only.** Every `gap`, `padding`, `margin`, `space-y/x`, `top/right/bottom/left` value is a multiple of 4px. Half-step Tailwind classes (`gap-0.5`, `gap-1.5`, `gap-2.5`, `gap-3.5`) and arbitrary values (`gap-[18px]`) are banned. Codified 2026-05-04.

### Radii (Tailwind named scale)

Driven by `--radius` token (0.625rem = 10px base) in `@theme inline`:
- `rounded-xs` = 4px (sub-elements: tabs / segmented item / SelectItem / badge)
- `rounded-sm` = 6px (everyday surfaces — cards, tables, popovers)
- `rounded-md` = 8px (intermediate)
- `rounded-lg` = 10px (intermediate)
- `rounded-xl` = **12px** (modal — locked override regardless of base scaling)
- `rounded-full` = pills (status dots, vendor avatar containers if any)

### Shadows

Three canonical shadow tokens, all derived from `color-mix(in oklch, var(--color-ink-800) X%, transparent)` so the shadow family tracks the ink ramp:

| Token | Composition | Use |
|-------|-------------|-----|
| `--shadow-border` | 1px ring (6%) + 1px lift (6%) + 2px ambient (4%) | Everyday surfaces — Card primitive, KpiRail container, table containers, hero card |
| `--shadow-popup` | 4px lift (8%) + 1px ring (4%) | Menu tier — selects, popovers, tooltips |
| `--shadow-modal` | 16px lift (12%) + 1px ring (6%) | Modal tier — Dialog, AlertDialog, Sheet |

A `--shadow-border-hover` (8%/8%/6%) variant exists for interactive surfaces.

**Avoid inlining `rgba()` shadows** — token discipline applies.

---

## 7. Documentation hygiene

When updating any brand decision in code, update this file **in the same change-set**. The implicit-brand-only state we lived in pre-2026-05-05 produced drift you don't catch until a contributor without context joins.

The skill's scripts in `front-end-developer/skills/brand/scripts/` (e.g., `inject-brand-context.cjs`, `extract-colors.cjs --palette`, `sync-brand-to-tokens.cjs`) read this file as their source of truth.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2026-05-05 | Initial extraction from current implicit brand decisions in code. Logo / wordmark / tagline marked TBD. |
| 0.2 | 2026-05-07 | Major refresh — catches up two days of code drift. **Color:** migrated to 5 OKLCH ramps × 11 steps with role-numbered conventions; removed single-token semantics; documented chart palette decoupling + 8-slot categorical palette; vendor avatars now bare-icon (no chip wrapper) with multi-color SVG support for Cohere/Mistral/Gemini. **Materials:** codified two-tier ladder (6/12/4) + three shadow tokens (`--shadow-border` / `--shadow-popup` / `--shadow-modal`). **Typography:** four-voice taxonomy split into five-voice — hero summary numerics ≥24px now sans tabular via `<HeroNumeric>` primitive; data numerics <20px stay mono. **Components:** `Badge` primitive defaults to `font-mono tabular-nums`; `SelectTrigger` uses asymmetric `pl-N pr-(N-1)` padding; `PaginationLink` renders as `<button>` (no-router architecture); `<TablePaginationFooter>` primitive added; filter-pill toolbar drops leading category icons; inline links use ink + permanent faint underline (no blue); table body cells follow three-tier ink density (500/800/900 only); table numerics right-aligned; `DeltaTag` `inverted` flag for rate metrics where lower=better, no qualifier text. |
