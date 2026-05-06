# Constellation Gate AI — Brand Guidelines v0.1

> Last updated: 2026-05-05
> Status: Draft (extracted from current implicit decisions in code)

This document codifies what already exists in the codebase as of 2026-05-05. It is the canonical reference for color, typography, voice, and component conventions. Logo and wordmark specs are intentionally **TBD** — placeholder mark only ships in-app today; final marks are pending.

When this document and the code disagree, the code wins until this document is updated; do not let drift compound. Update this file the same change-set that touches a brand decision in code.

---

## Quick reference

| Element | Value |
|---------|-------|
| Product name | **Constellation Gate AI** |
| Product category | AI gateway with audit anchoring |
| Primary action color | `--color-ink-900` (#09090B) — *not* blue |
| Brand-accent color | `--color-blue-700` (#1F2FCE) — anchored to the logomark; brand mark, focus rings, charts, links-that-need-to-stand-out |
| Sans typeface | Geist (variable, weights 300/400/500/600/700) |
| Mono typeface | Geist Mono (weights 400/500/600) |
| Voice | Precise, operational, dense, technically literate, no fluff |
| Spacing grid | 4px multiples only |
| Type scale | Tailwind named scale only (`text-xs` through `text-6xl`) |

---

## 1. Color palette

The single source of truth lives in `src/index.css`. Palette atoms are the only place raw hex values appear; every semantic token references atoms via `var()`. **No raw hex / oklch / rgba outside palette atoms** (rule codified 2026-05-05).

### Ink ramp (neutrals)

The full gray vocabulary. Every gray surface, border, and muted text color traces here.

| Token | Hex | Typical use |
|-------|-----|-------------|
| `--color-ink-25` | `#F8F9FB` | Lightest surface; ink-25 wells inside cards (Status well, code-card chrome) |
| `--color-ink-50` | `#F1F4F6` | `--muted`, `--secondary`, `--accent` resolve here. SegmentedPill background, message bubble fill, KPI card fills |
| `--color-ink-75` | `#E9EBEE` | SegmentedPill border, code-card border |
| `--color-ink-100` | `#E4E4E7` | `--border`, `--input` resolve here. Default border on cards, modals, dialogs, tables |
| `--color-ink-200` | `#D1D5D9` | (sparingly) |
| `--color-ink-300` | `#9FA5AC` | `--ring` resolves here. Tooltip cursor stroke, dashed gridlines |
| `--color-ink-400` | `#71717B` | StatusDot neutral, breadcrumb separator dots |
| `--color-ink-500` | `#6E757D` | `--muted-foreground`. Quiet metadata, eyebrow text on dense chrome |
| `--color-ink-600` | `#50565D` | Field labels (font-medium), nav text, body-secondary |
| `--color-ink-700` | `#1F2328` | Strong field labels, mono code-identifier within an label line |
| `--color-ink-800` | `#111417` | Body default (set on `body { color: ... }`) |
| `--color-ink-900` | `#09090B` | `--foreground`, `--primary`. Primary action color, headlines, body-emphasis |

### Brand-accent ramp (blue)

Used **only** for brand-accent moments. Primary actions are ink, not blue.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-blue-50` | `#EBF0FF` | Assistant message bubble fill |
| `--color-blue-100` | `#E1E9FE` | Assistant message bubble border |
| `--color-blue-200` | `#C2D3FF` | (chart series fill) |
| `--color-blue-300` | `#9DB8FF` | (chart series fill) |
| `--color-blue-400` | `#6A8EFB` | Chart series stroke (lighter) |
| `--color-blue-500` | `#4064FF` | (reserved) |
| `--color-blue-600` | `#2942D6` | (reserved) |
| `--color-blue-700` | `#1F2FCE` | **Primary brand-accent — anchored to logomark color.** Brand mark fill, hero chart stroke, links-that-must-stand-out |
| `--color-blue-800` | `#13225F` | (reserved) |
| `--color-blue-900` | `#0C1638` | (reserved) |
| `--color-blue-950` | `#060B1D` | (reserved) |

### Status palette (semantic)

Saturated; intended to read at a glance against a 15% bg wash via the Badge variant system.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-success` | `#16A34A` | Pass / 200 / on-track. Tailwind green-600 family. (Bumped from #2A904B on 2026-05-05 for saturation parity with danger/warning.) |
| `--color-success-2` | `#22C55E` | Brighter step — KPI delta arrows, chart strings |
| `--color-warning` | `#B45309` | Slow / degraded / 4xx / amber-tier. Tailwind amber-700. (Bumped from #DC8900 on 2026-05-05 for contrast on `bg-warning/15`.) |
| `--color-warning-2` | `#F97316` | Brighter step — chart strokes / spark lines. Tailwind orange-500. Use when warning at full opacity reads too dark at small stroke widths. |
| `--color-danger` | `#DC2626` | Critical / failed / 5xx. Tailwind red-600. |
| `--color-danger-2` | `#D33A3C` | Brighter step — KPI delta arrows when down |

### Atomic surfaces

| Token | Hex | Use |
|-------|-----|-----|
| `--color-white` | `#FFFFFF` | Cards, dialogs, popovers, modal background |
| `--color-canvas` | `#ECECE7` | App background. Grid-painted via `--canvas-grid` |

### Syntax tokens (code surfaces only)

Used by the `<CodeBlock />` primitive (CMP-008c, CMP-012 code cards). Not part of the semantic palette.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-syntax-keyword` | `#B6491A` | curl flags, export, terminal commands |
| `--color-syntax-variable` | `#D69E2E` | `$KEY` interpolations |
| `--color-syntax-property` | `#4165FF` | JSON keys / object props |
| `--color-syntax-terminal-blue` | `#6A8EFB` | Terminal numbers / status (note: same hex as `--color-blue-400`; dedupe TBD) |

### Vendor brand colors

External provider identity colors. Used only by `<VendorAvatar tone="brand" />`. Not part of the contract — they exist purely to identify external services.

| Vendor | Color |
|--------|-------|
| Anthropic | `#D97757` |
| OpenAI | `#10A37F` |
| Google (Gemini) | `#9B72CB` |
| Meta | `#0064E0` |
| Mistral | `#FA520F` |
| DeepSeek | `#4D6BFE` |
| Cohere | `#FF7759` |
| xAI (Grok) | `#3D3D3D` (light icon) |

### Platform chrome (macOS traffic lights)

Used in dashboard "browser chrome" simulation (CMP-012 ScreenHead). Not part of the semantic palette.

| Token | Hex |
|-------|-----|
| `--color-traffic-red` | `#FF5F57` |
| `--color-traffic-amber` | `#FEBC2E` |
| `--color-traffic-green` | `#28C840` |

### Accessibility

Body text on white: `text-ink-800` (#111417) on `#FFFFFF` — WCAG AAA.
Eyebrow text on dense chrome: `text-ink-500` (#6E757D) on white — WCAG AA Large.
Link / focus ring: `text-blue-700` on white — WCAG AA Large.
Status badge text on 15% bg wash — **untested, likely AA Small for some pairs**. To verify when shipping public surfaces.

---

## 2. Typography

### Font stack

```css
--font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
--font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", monospace;
```

Loaded via Google Fonts CDN + `@fontsource-variable/geist` fallback. **No IBM Plex** — tokens removed 2026-05-05 because they were dead. **No `--font-heading` separate from `--font-sans`** — Geist serves both; aliased via `@theme inline` block.

### Type scale (Tailwind named scale only)

Arbitrary `text-[Npx]` sizes are banned (rule codified 2026-05-04). All sizes resolve to one of these.

| Class | Size | Line | Typical use |
|-------|------|------|-------------|
| `text-xs` | 12px | 16px | Eyebrow / sm, table column heads, breadcrumbs, dense metadata |
| `text-sm` | 14px | 20px | Eyebrow / default, modal field labels, body-default in compact surfaces |
| `text-base` | 16px | 24px | Card subtitles, button labels, body-default in spacious surfaces |
| `text-lg` | 18px | 28px | Modal hero ID (`req_aurora_4200`), card titles in major surfaces |
| `text-xl` | 20px | 28px | (sparingly — reserved for promotional moments not yet shipped) |
| `text-2xl` | 24px | 32px | KPI hero numerics in compact rails |
| `text-3xl` | 30px | 36px | Page titles (set on `h1`), KPI hero numerics in primary cards |
| `text-4xl` | 36px | 40px | (reserved) |
| `text-5xl` | 48px | — | (reserved — Display / metric-display variants in CMP-000) |
| `text-6xl` | 60px | — | (reserved — Display in CMP-000) |

### Voice split (codified 2026-05-05)

Four typographic voices, each with a single job:

| Voice | Recipe | Use |
|-------|--------|-----|
| **Mono uppercase** (eyebrow) | `font-mono uppercase tracking-[0.1em] font-medium` | Section-level eyebrows. Calls attention to a section/card's purpose. |
| **Sans Title Case** (label) | `font-sans font-medium` (no uppercase, no tracking) | Field/column labels — table column heads, detail-row labels. Names *what* a column or row is. |
| **Mono normal** (value/ID) | `font-mono tabular-nums` | The actual data — IDs (`req_aurora_4200`), codes (`200`), numerics (`8,241`), hashes (`0xa1b8c3d7`), model names (`claude-sonnet-4.8`). |
| **Sans body** | `font-sans` | Human-readable content — descriptions, message bodies, button labels. |

**Critical rule:** sans labels are `font-medium` minimum. `font-normal` reads as ambient body text, not a label. Color does the *quiet* work; weight does the *structural* work.

### Eyebrow size variants (codified 2026-05-05)

Following the `sm | default` size convention used by Button, Input, Select, Segmented, SegmentedPill (explicitly *not* `sm | md`):

| Variant | Class | Pixel | Use |
|---------|-------|-------|-----|
| **`sm`** | `text-xs` | 12px / 16px | Inline / dense chrome: KPI labels, card section eyebrows, top-bar strips |
| **`default`** | `text-sm` | 14px / 20px | Standalone / focal: modal eyebrows, drawer headers, hero strips |

### Mono ratio

Operational surfaces target ~60% mono / 40% sans. Mono is the "machine voice" — IDs, codes, numerics, eyebrows. Sans is the "human voice" — titles, body, button labels. This is taste-driven, not enforced; track in CMP-000 if you want to formalize.

---

## 3. Logo / wordmark

### Logomark

**Status:** primary logomark in use as of 2026-05-05. Wordmark and additional lockups still TBD.

- **Asset:** `public/logomark.svg` — 280×280 viewbox, 7-path constellation mark, fill `#1F2FCE` (matches `--color-blue-700`).
- **Component:** `<BrandMark />` in `src/components/icons/brand-mark.tsx`. Inlines the 7 paths with `fill="currentColor"` so consumers color via Tailwind.
- **Canonical usage:** `<BrandMark className="size-8 text-blue-700" />` — blue mark on white at 32px. Currently rendered in CMP-012 and CMP-013 left rail.
- **Other tones:** `text-white` for inverted contexts (mark on dark surfaces), `text-ink-900` for monochrome lockups when blue is unavailable.

### Sizing guidance

- **Minimum digital size:** 16px wide. Below that the constellation paths lose detail.
- **Default sidebar / chrome size:** 32px (`size-8`).
- **Hero / standalone use:** 48–96px.
- **Favicon:** TBD — the existing `public/favicon.svg` predates this logomark and should be regenerated from the new mark.

### Don'ts

- Don't rotate, skew, or distort the mark.
- Don't recolor outside the approved set: `text-blue-700` (canonical), `text-white` (inverted), `text-ink-900` (monochrome).
- Don't add shadows, glows, or effects to the mark itself. Container chrome (cards, chips) can have shadows; the mark stays clean.
- Don't crop. The full 7-path silhouette is the mark.
- Don't place on busy photography backgrounds without a solid container.

### Wordmark — TBD

The string "Constellation Gate AI" currently appears in two places with two different treatments:
- `src/App.tsx:58` — `font-mono text-xs uppercase tracking-[0.12em] text-ink-500`
- `CMP-012/013` footer — `font-sans text-xs text-ink-500` (no uppercase, no tracking)

Pick one when the wordmark spec lands. Until then, both treatments coexist as provisional.

### Lockups — TBD

Mark-only is the only finalized variant. Mark+wordmark horizontal and stacked lockups have not been specified. Add when needed.

---

## 4. Voice & messaging

### Brand personality

| Trait | We are | We are not |
|-------|--------|------------|
| **Precise** | Specific, accurate, name things by their real names ("audit anchor," "PEP watchlist," "tenant," "request firehose") | Vague, hedging, marketer-speak ("powerful," "best-in-class," "next-generation") |
| **Operational** | Implementation-aware — copy mentions the actual API path, the actual auth pattern, the actual gateway behavior | Aspirational — empty promises about what the product *will* do or how *amazing* it is |
| **Dense** | Pack signal in every sentence; assume the reader is the operator who's running this in prod | Padded — no warm-up paragraphs, no introductory throat-clearing |
| **Confident** | Direct, declarative; verbs first ("Click a row to inspect", "Group by conversation", "Hit /v1/messages") | Apologetic, qualified, hedging |
| **Honest** | Visible TODOs; descriptions admit complexity; status badges show real state including failures | Smoothed-over — pretending the system is more polished than it is |

### Sample sentences (on-brand)

These are pulled verbatim from current artboard descriptions and code comments:

- "Live request firehose. Hero metric + sparkline, filter bar, sortable log of every gateway call."
- "Every generation routed through the gateway. Click a row to inspect prompts, security scans and the audit anchor. Group by conversation to follow a chain of calls."
- "Hit /v1/messages with the bearer token. The gateway routes to the cheapest healthy provider for the model."
- "Geist for the UI, Geist Mono for the machine. ~60% mono / 40% sans on dense operational surfaces."
- "Status badges (running, ok, warn, danger), counters, tags with close affordance, rev marks. All 20px tall, mono micro-type."
- "Sortable headers, mono numerics, status pills inline, row hover, selected row, action menu. The body of every list view."

### Banned phrases (anti-list)

These should never appear in product copy, descriptions, marketing, docs, or commit messages:

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
| "delight" | Reserved for moments that earn it; not as a verb in product copy |
| "world-class" | Hollow superlative |
| "easily" / "with ease" | If it's easy, the copy doesn't need to claim so |
| "unleash" / "unlock" | Marketing-speak |

### Tone by context

Currently every surface uses the same dense operational tone. If marketing or onboarding surfaces are added later, those rows extend this table:

| Context | Tone | Example |
|---------|------|---------|
| In-app product UI | Operational, dense | "Live request firehose. Click a row to inspect prompts." |
| Error state | Calm, action-oriented | (TBD — establish when an error UX ships) |
| Empty state | Onboarding-ish, action-oriented | "Create your first key to start sending requests through the gateway." |
| Documentation | Reference-style, instructional | "Hit /v1/messages with the bearer token." |
| Marketing / landing | TBD | (write only when needed; do not extrapolate from in-app voice) |

### Product-name usage

- **First reference** in any doc / page / surface: full name "Constellation Gate AI"
- **Subsequent references** in the same context: "the gateway" (lowercase) is acceptable when scope is clear
- **Never:** "CGAI," "Constellation," or other abbreviations
- **In code identifiers:** `constellation` lowercase (e.g., `acme-prod.constellation.io`, `@constellation/gateway`)

### Tagline

**TBD.** The closest in-codebase one-liner is the CMP-012 page subtitle: *"Traffic, spend and latency across every model on the gateway."* That is a page subtitle, not a tagline. A canonical "Constellation Gate AI is X" sentence has not been written.

---

## 5. Imagery

### Icons

- Library: `lucide-react`
- Default stroke weight: `1.75`
- Default sizes: `size-3` (12px), `size-3.5` (14px), `size-4` (16px), `size-5` (20px) — pick by surface density
- Icons within `<Button>` use the `data-icon="inline-start"` / `inline-end"` attribute so the button CVA applies the variant-aware padding adjustment
- Inline SVG attributes (`fill`, `stroke`) reference palette tokens: `fill="var(--color-white)"`, `stroke="var(--color-ink-100)"`. Never raw hex.

### Vendor logos

- Custom SVG components in `src/components/icons/vendor-meta.tsx`
- Used only by `<VendorAvatar />` — a 20×20 colored chip with the vendor mark inside
- Two tone variants: `tone="brand"` (vendor color background) for standalone signals (KPI cards, modals); `tone="neutral"` (ink-600 background) for table rows where colored chips would create rainbow noise

### Photography / illustrations

**None today.** The product surface is functional UI only. When marketing surfaces ship, those need their own imagery rules — establish them at that point, do not extrapolate from in-app conventions.

---

## 6. Component conventions

The full primitive library is `src/components/ui/*.tsx`. Highlights of the brand-relevant decisions:

### Primary action

`bg-primary text-primary-foreground` resolves to ink-900 / white. Primary buttons are dark, not blue. (Codified 2026-05-05.)

### Card padding

All cards use **16px** (`p-4`) on all sides. (Codified 2026-05-05.) `Card` primitive default; `CardHeader` / `CardContent` use `px-4`; `CardFooter` uses `p-4`. Don't override with `p-5` / `px-5` — the original 20px overrides were normalized down today.

### Table padding

- Outer cells: `px-4` (16px) on first/last column
- Inner cells: `px-3` (12px) default
- Header cell text: sans Title Case `font-medium text-ink-600` — *not* mono uppercase eyebrow
- Body cell text: mono for IDs/values, sans for human-readable, `text-ink-900`

### Toolbar padding

Toolbar rows above tables use **16px** all sides (`p-4`) or `py-3 px-4` (12px vertical, 16px horizontal) for compact toolbars.

### Selectors with sliding indicators

`Tabs` (default variant), `Segmented` (pill variant), `SegmentedPill` all use a sliding white indicator on selection — 200ms ease-out, transform/width animated. Single visual idiom across every pill-style selector. (Codified 2026-05-05.)

### DeltaTag (delta pill)

`<DeltaTag delta="+8.2%" note="vs last hour" />` — pill-style badge for percentage / numeric deltas in KPI cards.

- Pill chrome: `bg-success/15 text-success` (positive) or `bg-destructive/15 text-destructive` (negative). Pill-only height `h-5` (20px) with `pl-1 pr-2` padding.
- Icon: filled-disc `<DeltaArrowUp />` / `<DeltaArrowDown />` (custom — `src/components/icons/delta-arrow.tsx`) at `size-3.5` (14px). The arrow is an `evenodd` knockout — on the tinted pill, it shows the wash through, giving a 3-tier color stack (wash → solid disc → pale arrow).
- Value text: mono medium `text-xs/4 tabular-nums`, leading `+`/`-` stripped (icon and color carry direction).
- Note (optional): `text-xs text-ink-500` to the right of the pill, `gap-2` (8px) separator.
- Specimen: `src/artboards/CMP003BadgesAndTags.tsx` (CMP-003.3).

### Consolidated row pattern

Multi-section rows (KPI rail, Quick Actions) live in **one bordered card** with internal sections divided by **inset hairline** `before:` pseudo-elements:

```
relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-100
```

The hairline doesn't reach the rounded corners or section edges — reads lighter than a full-height `divide-x`. Sections are flat (no individual borders/shadows); the parent owns the chrome (`rounded-md border border-ink-100 shadow-xs overflow-hidden`).

When one section is the focal action, accent it with `bg-blue-50` (and the icon chip with `bg-blue-100 text-blue-700`) — matches the assistant message bubble fill in CMP-013. Do *not* invert (white text on solid blue) — too marketing-loud for the operator-tool register.

Used by:
- `KpiRail` in CMP-012 (4 metric sections side-by-side)
- `QuickActionsRow` in CMP-012 (titled card with 4 action sections, Upgrade highlighted)

### Section header capitalization

Section card titles use **Title Case**: `Recent Requests`, `Top Keys`, `Request Volume`, `Quick Actions`. Field/column labels use **sentence case** for technical terms: `Leaf hash`, `Anchor root`, `Anchored`. Single-word labels are unaffected.

### Layout grid (composed pages)

Composed pages — dashboards, multi-panel surfaces, full-bleed feature pages — use a **12-column grid with 16px gutters** (`grid grid-cols-12 gap-4`). Section widths are expressed as `col-span-N` where the row sums to 12. Asymmetric layouts (hero + sidebar, e.g. `col-span-8 + col-span-4`) live here naturally.

**Outer page margins** at the `lg`, `xl`, `2xl` breakpoints are **24px on all sides** (`lg:p-6` or equivalent split). Smaller breakpoints can use less.

The 16px gutter is intentionally tighter than the conventional Bootstrap / Material default (24px) — denser surface, more on-genre for an operator tool. 16 and 24 are 4px multiples, so this coexists with the 4px-grid spacing rule below. (Codified 2026-05-05.)

### Spacing

**4px grid only.** Every `gap`, `padding`, `margin`, `space-y/x`, `top/right/bottom/left` value is a multiple of 4px. Half-step Tailwind classes (`gap-0.5`, `gap-1.5`, `gap-2.5`, `gap-3.5`) and arbitrary values (`gap-[18px]`) are banned. (Codified 2026-05-04.)

### Radii

Tailwind named scale via `--radius` token (0.625rem = 10px base):
- `rounded-sm` = 6px
- `rounded-md` = 8px (cards, tables, inputs, buttons, modals)
- `rounded-lg` = 10px (some primitives)
- `rounded-xl` = 14px (large cards in some contexts)
- `rounded-full` = pills (badges, status dots)

### Shadows

Three canonical shadow tokens, all derived from `color-mix(in oklch, var(--color-ink-800) X%, transparent)`:

- `--shadow-popup` — selects, dropdowns, popovers, tooltips
- `--shadow-modal` — dialogs, alert dialogs
- `shadow-xs` (Tailwind built-in, 1px @ 5%) — cards, KPI shells, segmented active pill

Avoid inlining `rgba()` shadows — token discipline (codified 2026-05-05).

---

## 7. Documentation hygiene

When updating any brand decision in code, update this file **in the same change-set**. The implicit-brand-only state we lived in pre-2026-05-05 produces drift you don't catch until a contributor without context joins.

The skill's scripts in `front-end-developer/skills/brand/scripts/` (e.g., `inject-brand-context.cjs`, `extract-colors.cjs --palette`, `sync-brand-to-tokens.cjs`) read this file as their source of truth.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2026-05-05 | Initial extraction from current implicit brand decisions in code. Logo / wordmark / tagline marked TBD. |
