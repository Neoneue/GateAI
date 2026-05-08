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
  # ─── shadcn semantic layer (src/index.css:164–222). Every component
  # references these — agent should bind to these, not to ramp atoms. ───
  primary: "oklch(0.090 0 0)"           # ← code-direct: index.css:174 → --color-ink-900
  primary-foreground: "#FFFFFF"          # ← code-direct: index.css:175 → --color-white
  background: "#FFFFFF"                  # ← code-direct: index.css:168
  foreground: "oklch(0.090 0 0)"         # ← code-direct: index.css:169 → ink-900
  card: "#FFFFFF"                        # ← code-direct: index.css:170
  card-foreground: "oklch(0.090 0 0)"    # ← code-direct: index.css:171
  popover: "#FFFFFF"                     # ← code-direct: index.css:172
  popover-foreground: "oklch(0.090 0 0)" # ← code-direct: index.css:173
  secondary: "oklch(0.960 0 0)"          # ← code-direct: index.css:180 → ink-100
  secondary-foreground: "oklch(0.090 0 0)" # ← code-direct: index.css:181 → ink-900
  muted: "oklch(0.960 0 0)"              # ← code-direct: index.css:182 → ink-100
  muted-foreground: "oklch(0.530 0 0)"   # ← code-direct: index.css:183 → ink-500
  accent: "oklch(0.960 0 0)"             # ← code-direct: index.css:184 → ink-100
  accent-foreground: "oklch(0.090 0 0)"  # ← code-direct: index.css:185 → ink-900
  destructive: "oklch(0.577 0.245 27.325)" # ← code-direct: index.css:186 → danger-600
  border: "oklch(0.910 0 0)"             # ← code-direct: index.css:187 → ink-200
  input: "oklch(0.910 0 0)"              # ← code-direct: index.css:188 → ink-200
  ring: "oklch(0.680 0 0)"               # ← code-direct: index.css:189 → ink-400
  canvas-bg: "#ECECE7"                   # ← code-direct: index.css:165, 102 → warm-paper

  # ─── Ink ramp (neutrals) — index.css:33–43. Pure neutral chroma. ───
  ink-50: "oklch(0.985 0 0)"             # ← code-direct: index.css:33
  ink-100: "oklch(0.960 0 0)"            # ← code-direct: index.css:34
  ink-200: "oklch(0.910 0 0)"            # ← code-direct: index.css:35
  ink-300: "oklch(0.820 0 0)"            # ← code-direct: index.css:36
  ink-400: "oklch(0.680 0 0)"            # ← code-direct: index.css:37
  ink-500: "oklch(0.530 0 0)"            # ← code-direct: index.css:38
  ink-600: "oklch(0.380 0 0)"            # ← code-direct: index.css:39
  ink-700: "oklch(0.260 0 0)"            # ← code-direct: index.css:40
  ink-800: "oklch(0.165 0 0)"            # ← code-direct: index.css:41
  ink-900: "oklch(0.090 0 0)"            # ← code-direct: index.css:42
  ink-950: "oklch(0.045 0 0)"            # ← code-direct: index.css:43

  # ─── Blue ramp (brand) — index.css:47–57. Anchored at blue-700 to logomark. ───
  blue-50: "oklch(0.970 0.020 268.85)"   # ← code-direct: index.css:47
  blue-100: "oklch(0.940 0.040 268.85)"  # ← code-direct: index.css:48
  blue-200: "oklch(0.890 0.075 268.85)"  # ← code-direct: index.css:49
  blue-300: "oklch(0.810 0.130 268.85)"  # ← code-direct: index.css:50
  blue-400: "oklch(0.700 0.180 268.85)"  # ← code-direct: index.css:51
  blue-500: "oklch(0.580 0.215 268.85)"  # ← code-direct: index.css:52
  blue-600: "oklch(0.470 0.232 268.85)"  # ← code-direct: index.css:53
  blue-700: "oklch(0.345 0.224 268.85)"  # ← code-direct: index.css:54 — brand mark, ≈#1F2FCE
  blue-800: "oklch(0.275 0.175 268.85)"  # ← code-direct: index.css:55
  blue-900: "oklch(0.215 0.130 268.85)"  # ← code-direct: index.css:56
  blue-950: "oklch(0.145 0.085 268.85)"  # ← code-direct: index.css:57

  # ─── Success / Warning / Danger ramps — index.css:60–96. Tailwind v4 OKLCH. ───
  # Roles per ramp: 100 wash · 200 border · 600 saturated mid · 700 saturated text on tinted bg.
  success-50: "oklch(0.982 0.018 155.826)"   # ← code-direct: index.css:60
  success-100: "oklch(0.962 0.044 156.743)"  # ← code-direct: index.css:61
  success-200: "oklch(0.925 0.084 155.995)"  # ← code-direct: index.css:62
  success-500: "oklch(0.723 0.219 149.579)"  # ← code-direct: index.css:65
  success-600: "oklch(0.627 0.194 149.214)"  # ← code-direct: index.css:66
  success-700: "oklch(0.527 0.154 150.069)"  # ← code-direct: index.css:67
  warning-50: "oklch(0.987 0.022 95.277)"    # ← code-direct: index.css:73
  warning-100: "oklch(0.962 0.059 95.617)"   # ← code-direct: index.css:74
  warning-200: "oklch(0.924 0.120 95.746)"   # ← code-direct: index.css:75
  warning-500: "oklch(0.769 0.188 70.080)"   # ← code-direct: index.css:78
  warning-600: "oklch(0.666 0.179 58.318)"   # ← code-direct: index.css:79
  warning-700: "oklch(0.555 0.163 48.998)"   # ← code-direct: index.css:80
  danger-50: "oklch(0.971 0.013 17.380)"     # ← code-direct: index.css:86
  danger-100: "oklch(0.936 0.032 17.717)"    # ← code-direct: index.css:87
  danger-200: "oklch(0.885 0.062 18.334)"    # ← code-direct: index.css:88
  danger-600: "oklch(0.577 0.245 27.325)"    # ← code-direct: index.css:92 — semantic --destructive
  danger-700: "oklch(0.505 0.213 27.518)"    # ← code-direct: index.css:93

  # ─── Atomic surfaces — index.css:101–102. ───
  white: "#FFFFFF"                       # ← code-direct: index.css:101
  canvas: "#ECECE7"                      # ← code-direct: index.css:102 — warm-paper canvas

  # ─── Categorical chart palette — index.css:205–212. Brand-decoupled.
  # Series pick a slot by INDEX, not by entity. 8 slots, all OKLCH at L 0.62–0.85,
  # C 0.13–0.20, hue spacing ≥85° between adjacent slots. No neutral slot. ───
  chart-1: "oklch(0.62 0.18 255)"        # ← code-direct: index.css:205 — blue
  chart-2: "oklch(0.72 0.17 50)"         # ← code-direct: index.css:206 — orange
  chart-3: "oklch(0.72 0.20 145)"        # ← code-direct: index.css:207 — green
  chart-4: "oklch(0.70 0.18 290)"        # ← code-direct: index.css:208 — purple
  chart-5: "oklch(0.65 0.20 18)"         # ← code-direct: index.css:209 — coral
  chart-6: "oklch(0.75 0.13 195)"        # ← code-direct: index.css:210 — teal
  chart-7: "oklch(0.85 0.16 88)"         # ← code-direct: index.css:211 — amber
  chart-8: "oklch(0.68 0.20 335)"        # ← code-direct: index.css:212 — magenta

  # ─── Syntax tokens (CodeBlock primitive only — index.css:106–109). Not part
  # of the semantic palette. Re-skinning code surfaces does not bleed into UI. ───
  syntax-keyword: "#B6491A"              # ← code-direct: index.css:106 — curl flags / orange-red
  syntax-variable: "#D69E2E"             # ← code-direct: index.css:107 — $KEY interpolations
  syntax-property: "#4165FF"             # ← code-direct: index.css:108 — JSON keys

  # ─── macOS traffic-light tokens (CMP-012 chrome strip — index.css:115–117).
  # Platform affordance, isolated from the danger/warning/success ramps. ───
  traffic-red: "#FF5F57"                 # ← code-direct: index.css:115
  traffic-amber: "#FEBC2E"               # ← code-direct: index.css:116
  traffic-green: "#28C840"               # ← code-direct: index.css:117

typography:
  # Tailwind named scale only. Three sizes overridden in @theme to Geist's even-numbered
  # heading scale (text-3xl: 32px, text-4xl: 40px, text-6xl: 64px — index.css:152–157).
  # Arbitrary text-[Npx] is banned. font-medium minimum on sans labels — font-normal
  # reads as ambient body, not structure.

  hero-numeric-lg:                       # ← code-direct: hero-numeric.tsx — text-3xl/9 + sans tabular
    fontFamily: "Geist"
    fontSize: 32                         # ← code-direct: index.css:152 — overridden text-3xl
    lineHeight: 36                       # ← code-direct: text-3xl/9 utility
    fontWeight: 500
    fontFeature: "tnum"

  hero-numeric-default:                  # ← code-direct: hero-numeric.tsx — text-2xl/8 + sans tabular
    fontFamily: "Geist"
    fontSize: 24
    lineHeight: 32
    fontWeight: 500
    fontFeature: "tnum"

  h1:                                    # ← code-direct: ArtboardHeader artboards use text-3xl
    fontFamily: "Geist"
    fontSize: 32
    lineHeight: 40
    fontWeight: 500

  h2:                                    # ← code-direct: SectionHeader uses text-2xl/8
    fontFamily: "Geist"
    fontSize: 24
    lineHeight: 32
    fontWeight: 500

  h3:                                    # ← code-direct: card titles, modal title
    fontFamily: "Geist"
    fontSize: 18                         # ← code-direct: text-lg
    lineHeight: 28
    fontWeight: 500

  body:                                  # ← code-direct: body { font-family: var(--font-sans) ... } index.css:235–236
    fontFamily: "Geist"
    fontSize: 16                         # ← code-direct: text-base
    lineHeight: 24
    fontWeight: 400

  body-sm:                               # ← code-direct: text-sm in compact surfaces
    fontFamily: "Geist"
    fontSize: 14
    lineHeight: 20
    fontWeight: 400

  body-xs:                               # ← code-direct: text-xs in dense chrome
    fontFamily: "Geist"
    fontSize: 12
    lineHeight: 16
    fontWeight: 400

  label:                                 # ← code-direct: label.tsx — text-sm font-medium
    fontFamily: "Geist"
    fontSize: 14
    lineHeight: 16                       # ← code-direct: leading-none
    fontWeight: 500

  eyebrow-sm:                            # ← code-direct: SectionHeader code prefix, KPI labels
    fontFamily: "Geist Mono"
    fontSize: 12
    lineHeight: 16
    fontWeight: 500
    letterSpacing: "0.1em"
    fontVariation: "uppercase"

  eyebrow-default:                       # ← code-direct: modal eyebrows, drawer headers
    fontFamily: "Geist Mono"
    fontSize: 14
    lineHeight: 20
    fontWeight: 500
    letterSpacing: "0.1em"
    fontVariation: "uppercase"

  badge:                                 # ← code-direct: badge.tsx:10 — base CVA
    fontFamily: "Geist Mono"
    fontSize: 12
    lineHeight: 16
    fontWeight: 500
    fontFeature: "tnum"

  data:                                  # ← code-direct: table cells, IDs, codes — mono tabular
    fontFamily: "Geist Mono"
    fontSize: 14
    lineHeight: 20
    fontWeight: 400
    fontFeature: "tnum"

rounded:
  # Driven by --radius (0.625rem = 10px) in @theme inline (index.css:213, 280–290).
  # Modal radius locked to 12px regardless of base scaling.
  xs: "4px"                              # ← code-direct: index.css:280 — sub-elements (tabs item, segmented, SelectItem, badge)
  sm: "6px"                              # ← code-direct: index.css:281 — everyday surfaces (Card, Input, Select trigger, Button)
  md: "8px"                              # ← code-direct: index.css:282 — intermediate
  lg: "10px"                             # ← code-direct: index.css:283 — base radius (10px)
  xl: "12px"                             # ← code-direct: index.css:287 — modal lock (Dialog, Sheet, AlertDialog)
  2xl: "18px"                            # ← code-direct: index.css:288 — calc(--radius * 1.8)
  full: "9999px"                         # ← code-direct: pills (status dots, Tag, Switch thumb track)

spacing:
  # 4px grid only. Half-step Tailwind classes (gap-0.5/1.5/2.5/3.5) and arbitrary
  # values (gap-[18px]) are banned. Locked 2026-05-04. (decided)
  "1": "4px"                             # ← code-direct: Tailwind v4 default — gap-1, p-1 (rare)
  "2": "8px"                             # ← code-direct: badge inline gap, button icon gap
  "3": "12px"                            # ← code-direct: button px-3, input px-3 (sm), inner table cells, compact toolbar py-3
  "4": "16px"                            # ← code-direct: Card p-4, table outer cells px-4, page gutter, section gap (DEFAULT — most-frequent step)
  "5": "20px"                            # ← code-direct: rare; legacy 20px overrides retired 2026-05-05 in favor of 16
  "6": "24px"                            # ← code-direct: lg/xl/2xl outer page margins (lg:p-6)
  "8": "32px"                            # ← code-direct: section spacing in spec sheets
  "12": "48px"                           # ← code-direct: page-bottom rhythm
  "16": "64px"                           # ← code-direct: hero strip spacing (rare)
  "24": "96px"                           # ← code-direct: extra-spacious dividers (rare)

components:
  # ─── Buttons (button.tsx:6–43) — h-7/8/9/10 sizes; rounded-sm; medium weight. ───
  button-default:                        # ← code-direct: button.tsx:15 — primary action, ink-900 fill
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-sm}"   # text-sm font-medium
    rounded: "{rounded.sm}"
    height: 36                           # h-9 (default)
    padding: "0 16"                      # px-4 — pr-3 with icon (asymmetric)
  button-default-hover:
    backgroundColor: "{colors.primary}"  # primary/85 — opacity adjustment, not a separate token
  button-outline:                        # ← code-direct: button.tsx:16
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
  button-secondary:                      # ← code-direct: button.tsx:18
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
  button-ghost:                          # ← code-direct: button.tsx:20 — transparent until hover
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
  button-destructive:                    # ← code-direct: button.tsx:22
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.primary-foreground}"
  button-link:                           # ← code-direct: button.tsx:24 — note: NOT used for inline links (see Components §7 Links)
    textColor: "{colors.primary}"

  # ─── Inputs (input.tsx:6–20). bg-ink-50 is the contract — sits flush in filter rows. ───
  input:                                 # ← code-direct: input.tsx:8 — default
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.sm}"
    height: 36                           # h-9
    padding: "0 16"                      # px-4 (default), px-3 at sm/xs
  input-focused:                         # ← code-direct: input.tsx:8 — focus-visible:border-ring + ring/50
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
  input-disabled:
    backgroundColor: "{colors.ink-100}"
    textColor: "{colors.ink-500}"

  textarea:                              # ← code-direct: textarea.tsx — same surface as Input, p-3/p-4
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.sm}"
    padding: "12 16"                     # py-3 px-4

  input-group:                           # ← code-direct: input-group.tsx — h-9 wrapper for inputs with addons
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.sm}"
    height: 36

  # ─── Cards (card.tsx:14–96). Flat surface with shadow-as-border, NOT solid borders. ───
  card:                                  # ← code-direct: card.tsx:19
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.sm}"
    padding: 16                          # py-4 + content px-4
    elevation: "shadow-border"           # 1px ring + 1px lift + 2px ambient (index.css:124–127)
  card-footer:                           # ← code-direct: card.tsx:94 — divider strip with bg-ink-50
    backgroundColor: "{colors.ink-50}"
    padding: 16

  # ─── Badges (badge.tsx:10–30). Mono tabular default — codified 2026-05-07 (decided). ───
  badge-default:                         # ← code-direct: badge.tsx:14
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.badge}"
    rounded: "{rounded.xs}"
    height: 20                           # h-5
    padding: "0 6"                       # pl-2.5 pr-1.5
  badge-secondary:                       # ← code-direct: badge.tsx:15
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
  badge-destructive:                     # ← code-direct: badge.tsx:17
    backgroundColor: "{colors.danger-100}"
    textColor: "{colors.danger-700}"
  badge-outline:                         # ← code-direct: badge.tsx:19
    textColor: "{colors.foreground}"
  badge-success:                         # ← code-direct: badge.tsx:26
    backgroundColor: "{colors.success-100}"
    textColor: "{colors.success-700}"
  badge-warning:                         # ← code-direct: badge.tsx:28
    backgroundColor: "{colors.warning-100}"
    textColor: "{colors.warning-700}"
  badge-info:                            # ← code-direct: badge.tsx:30
    backgroundColor: "{colors.blue-100}"
    textColor: "{colors.blue-700}"

  # ─── Select trigger (select.tsx) — asymmetric padding pl-N pr-(N-1) for chevron balance (decided 2026-05-07). ───
  select-trigger:
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.sm}"
    height: 36                           # h-9 default
    padding: "0 12 0 16"                 # pl-4 pr-3 default; pl-3 pr-2 at sm/xs

  # ─── Tabs (tabs.tsx) — sliding white indicator on selection. ───
  tabs-list:                             # ← code-direct: tabs.tsx — bg-muted track
    backgroundColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    height: 32                           # h-8
    padding: 4                           # p-1
  tabs-trigger-active:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xs}"

  # ─── Segmented (segmented.tsx) — pill-style selector with sliding indicator. ───
  segmented:
    backgroundColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    height: 32                           # h-8 default; h-7 at sm
  segmented-item-active:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xs}"

  # ─── Dialog / AlertDialog (dialog.tsx, alert-dialog.tsx). Modal tier — 12px radius + shadow-modal. ───
  dialog:                                # ← code-direct: dialog.tsx
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.xl}"              # 12px LOCKED override
    padding: 16                          # p-4
    elevation: "shadow-modal"            # 16px lift + 1px ring (index.css:142–144)
  dialog-overlay:
    backgroundColor: "{colors.ink-900}"  # @ 40% with backdrop-blur-xs

  # ─── Sheet (sheet.tsx) — right-docked drawer for inspection workflows. ───
  sheet:                                 # ← code-direct: sheet.tsx
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.none}"            # flush against viewport edge
    elevation: "shadow-modal"

  # ─── Table (table.tsx) — header bg-ink-50, three-tier body cell tone (decided). ───
  table-header:                          # ← code-direct: table.tsx — bg-ink-50 with top border
    backgroundColor: "{colors.ink-50}"
    textColor: "{colors.ink-600}"        # column heads = sans Title Case font-medium ink-600
    typography: "{typography.body-sm}"
  table-row:
    backgroundColor: "{colors.background}"
  table-row-hover:
    backgroundColor: "{colors.ink-50}"

  # ─── Pagination (pagination.tsx). PaginationLink renders <button>, not <a> (decided 2026-05-06). ───
  pagination-link:
    textColor: "{colors.ink-600}"
    typography: "{typography.data}"      # tabular-nums

  # ─── HeroNumeric (hero-numeric.tsx). Single source for sans-tabular hero numerics ≥24px (decided 2026-05-07). ───
  hero-numeric:
    textColor: "{colors.ink-900}"
    typography: "{typography.hero-numeric-default}"
  hero-numeric-lg:
    textColor: "{colors.ink-900}"
    typography: "{typography.hero-numeric-lg}"

  # ─── Toast / sonner (sonner.tsx). ───
  toast:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-900}"
    rounded: 8                           # 0.5rem — sonner-specific, not @theme rounded scale
    elevation: "shadow-popup"

  # ─── StatusDot (status-dot.tsx). 6px dot, full radius. ───
  status-dot-success:
    backgroundColor: "{colors.success-600}"
    rounded: "{rounded.full}"
  status-dot-warning:
    backgroundColor: "{colors.warning-600}"
    rounded: "{rounded.full}"
  status-dot-danger:
    backgroundColor: "{colors.destructive}"
    rounded: "{rounded.full}"
  status-dot-info:
    backgroundColor: "{colors.blue-600}"
    rounded: "{rounded.full}"
  status-dot-neutral:
    backgroundColor: "{colors.ink-500}"
    rounded: "{rounded.full}"

  # ─── Tag (tag.tsx). Removable filter pill — separate from Badge. ───
  tag:
    backgroundColor: "{colors.ink-100}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.full}"            # rounded-full — pill shape
    height: 24                           # h-6
    typography: "{typography.body-xs}"

  # ─── Switch (switch.tsx). ink-200 unchecked / ink-900 checked. ───
  switch-checked:
    backgroundColor: "{colors.primary}"
  switch-unchecked:
    backgroundColor: "{colors.input}"    # ink-200

  # ─── Checkbox / Radio. Minimum hit-target via after:-inset padding. ───
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.xs}"              # 4px
  radio-checked:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"

  # ─── DeltaTag (specimen in CMP003BadgesAndTags.tsx CMP-003.3) — directional pill. ───
  # NOT a Badge. Inline-flex with arrow icon + mono tabular medium 12px value text.
  # `inverted` flag for rate metrics where lower=better (latency, error-rate, cost-per-x).
  # Volume metrics stay sign-based (Total Cost rises = usage growth, not bad).
  delta-tag-positive:                    # default sentiment: positive = green
    textColor: "{colors.success-700}"
  delta-tag-negative:                    # default sentiment: negative = red
    textColor: "{colors.destructive}"

  # ─── VendorAvatar (icons/vendor-meta.tsx). Bare brand-colored icon at size-4 — NO chip wrapper (decided 2026-05-06 iter 7). ───
  vendor-avatar:
    rounded: "{rounded.none}"            # bare icon, no container chrome

  # ─── BrandMark (icons/brand-mark.tsx). 7-path constellation, 280×280 viewbox. ───
  brand-mark:
    textColor: "{colors.blue-700}"       # canonical mark color — anchored to logomark.svg #1F2FCE
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

## 0. Direction *(our extension — preserved as unknown section by the linter)*

- **Who:** the human running an AI gateway in production. Engineer or platform operator. Reads stack traces. Cares about p95 latency, error rate, token-spend per tenant, and audit anchors. Has Datadog, Splunk, and Grafana open in adjacent tabs.
- **Verb:** **inspect** — every page is a lens onto traffic, spend, latency, conversation history, or security posture. Read-heavy. Interaction is filter, sort, drill-in, copy.
- **Feel:** Vercel Geist meets Stripe Atlas — flat surfaces, dense rhythm, mono numerics, ink-900 primary (not blue), warm-paper canvas behind crisp white cards. Operational, not marketing.

### Defaults being rejected

1. **Blue primary action** → ink-900 primary. Blue reserved for info/completed/active-tab/focus only.
2. **Blue underlined links** → ink + permanent faint underline (`decoration-ink-200` → `decoration-ink-500` on hover/focus). Blue is overloaded with 4 other meanings.
3. **24px gutters (Bootstrap/Material default)** → 12-column grid with **16px gutters**. Denser, more on-genre for an operator tool.
4. **Brand colors as chart series colors** → 8-slot OKLCH categorical palette picked by series index. Per-series `slot?: number` override only for brand-mnemonic exceptions (Anthropic→orange, OpenAI→blue).
5. **Solid 1px card borders** → three-layer `shadow-as-border` (1px ring + 1px lift + 2px ambient, `color-mix` from ink-800).
6. **All numerics mono** → five-voice taxonomy. Hero summary numerics ≥24px sans tabular via `<HeroNumeric>`; data numerics <20px stay mono.

---

## 1. Overview *(also: "Brand & Style" — Google canonical §1)*

Constellation Gate AI is an operator dashboard for an AI gateway. Every model API call routes through the gateway; this dashboard is the lens onto that traffic — request firehose, conversation reconstruction, KPI rails, security posture, audit anchoring. The audience is the human running it in production, not a product manager evaluating a demo.

The visual register is **Vercel Geist meets operator tooling** — flat surfaces, dense rhythm, ink-900 primary, mono numerics dominant on data surfaces, sans for human-read content. A warm-paper canvas (`#ECECE7`) sits behind crisp white cards painted with shadow-as-border. Information density is high: tables follow a three-tier body-cell ink policy (500/800/900); numerics are right-aligned and mono tabular; KPI rails carry sparklines + delta tags; modals are drill-ins. The interaction model is read-heavy — filter, sort, drill in, copy.

**Key characteristics:** 5 OKLCH ramps × 11 steps (`src/index.css:33–96`) · two-tier material ladder 6/12/4px (`src/index.css:280–290`) · five-voice typography (decided 2026-05-07) · no dark mode (`:root.dark` block intentionally absent) · ink-900 primary, not blue · shadow-as-border, not solid borders (`src/index.css:124–144`).

---

## 2. Colors *(Google canonical §2)*

The single source of truth is `src/index.css` `@theme {}`. **All values are OKLCH**; raw hex appears only on atomic surfaces (`#FFFFFF`, `#ECECE7` canvas) and on a small set of non-semantic platform tokens (syntax + macOS traffic lights). **No raw hex / oklch / rgba outside the `@theme` block.**

The system has two layers:
1. **Palette atoms** (5 ramps × 11 steps + atomic surfaces + chart palette) — `@theme {}` in `src/index.css:11–158`
2. **Semantic layer** (shadcn vocabulary: `--background`, `--foreground`, `--primary`, etc.) — `:root {}` in `src/index.css:164–222`. Every semantic token resolves to a palette atom via `var(--color-*)`. **Never inline raw hex/oklch/rgba in this layer.**

### Primary & Brand Accent

- **Ink** (`#0E0E0E` ≈ `oklch(0.090 0 0)` ← `{colors.ink-900}`) — Primary action color. Buttons, foreground, headlines, table primary identifier. **Not blue.** ← code-direct: `src/index.css:42, 174`
- **Blue** (`#1F2FCE` ≈ `oklch(0.345 0.224 268.85)` ← `{colors.blue-700}`) — Brand accent. Anchored to `public/logomark.svg`; the rest of the blue ramp is derived around it. Used for info / completed / active-tab / focus. **Never for primary CTAs. Never for inline links.** ← code-direct: `src/index.css:54`

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

External provider identity colors. Used only by `<VendorAvatar />` — **bare brand-colored icon at `size-4`, no chip wrapper** (locked 2026-05-06, iteration 7).

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

Three vendors render multi-color via per-path SVG fills (Cohere, Mistral, Gemini) — for those, the wrapper's `style.color` is ignored. ← code-direct: `src/components/icons/vendor-meta.tsx`

### Do not use

- **Raw hex / oklch / rgba outside the `@theme` block.** Every color value flows through the palette → semantic → component chain.
- **Single-token semantics** like `--color-warning` or `-2` brighter variants — removed in the OKLCH migration. Use ramp tokens (`text-warning-700`, `bg-success-100`).
- **Blue for primary action.** `--primary` resolves to ink-900. Don't reintroduce `bg-blue-600` as primary fill.
- **Blue for inline links.** Links are ink + permanent faint underline (see Components §7 Inline links).
- **`text-ink-600` or `text-ink-700` as table body-cell tones** without explicit reason — middle-tier neutrals collide with the three-tier policy (see Components §7 Tables).
- **Vendor colors as chart series colors** by default. Charts use `--chart-1..8` from palette index. (decided 2026-05-06)

---

## 3. Typography *(Google canonical §3)*

### Font Family

- **Sans (UI):** `"Geist", ui-sans-serif, system-ui, sans-serif` ← code-direct: `src/index.css:13`
- **Mono (machine voice):** `"Geist Mono", ui-monospace, "SFMono-Regular", monospace` ← code-direct: `src/index.css:14`

Loaded via Google Fonts CDN (`src/index.css:2`) + `@fontsource-variable/geist` fallback (`src/index.css:6`). **No IBM Plex** — tokens removed 2026-05-05. **No `--font-heading` separate from `--font-sans`** — Geist serves both; aliased via `@theme inline` (`src/index.css:244–245`).

### Hierarchy

Tailwind named scale only. Three sizes overridden in `@theme {}` (`src/index.css:152–157`) to Geist's heading scale (even-numbered, larger increments at the top); all other sizes already match Geist values. **Arbitrary `text-[Npx]` is banned.**

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

### Mono ratio

Operational surfaces target ~60% mono / 40% sans. Mono is the "machine voice"; sans is the "human voice." Taste-driven, not enforced.

### Principles

- **Weight ceiling:** 500 on display + headlines. Don't reach for 600/700 — the type scale + size carries hierarchy.
- **Size floor for sans heroes:** 24px. Below that, numerics revert to mono.
- **Letter spacing:** `tracking-tight` on sans heroes; `0.1em` on mono eyebrows; default elsewhere.
- **Hierarchy comes from size + weight + voice change**, not color. Color is for state (active, error, muted), not structural rank.

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

- **Composed pages use a 12-column grid with 16px gutters:** `grid grid-cols-12 gap-4`. Section widths are expressed as `col-span-N` where the row sums to 12. Asymmetric layouts (hero + sidebar, e.g. `col-span-8` + `col-span-4`) live here naturally. ← decided
- **Outer page margins** at `lg`, `xl`, `2xl` breakpoints: **24px on all sides** (`lg:p-6` or equivalent split). Smaller breakpoints can use less.
- **The 16px gutter is intentionally tighter than the conventional Bootstrap / Material default (24px)** — denser surface, more on-genre for an operator tool. 16 and 24 are 4px multiples, so this coexists with the 4px-grid spacing rule.
- **Spec-sheet artboards (CMP-000 through CMP-009)** use a fixed 1440px column (`<div className="flex flex-col w-[1440px]">`) to mirror the source Paper file. Real composed pages (CMP-012/013/014/016) are responsive. ← code-direct
- **Page-header subtitle width** is capped at `max-w-1/2` on the **wrapper column** (not the `<p>` directly — fractional max-w on a leaf inside a content-sized column won't behave). ← decided

### Whitespace Philosophy

Whitespace carries hierarchy more than weight does. The 4px grid is non-negotiable; you express hierarchy by escalating from 4 → 8 → 12 → 16 → 24 in `gap` and `padding`, not by changing alignment or adding rules. A KPI rail uses `gap-4` between sections and `gap-1.5` inside; a section block uses `gap-6` from its neighbor. Cards never touch — they sit on the warm-paper canvas with their shadow-as-border doing the separation work.

The body has a 40px linear-gradient grid on `--canvas-bg` (`src/index.css:306–311`). Anything that should sit on white needs an explicit `bg-white` or `bg-ink-50`.

---

## 5. Elevation & Depth *(Google canonical §5)*

Three canonical shadow tokens, all derived from `color-mix(in oklch, var(--color-ink-800) X%, transparent)` so the shadow family **tracks the ink ramp** instead of inlining `rgba()`.

| Level | Treatment | Use | Source |
|---|---|---|---|
| 0 – Flat | none | Body text on canvas; inline content | implicit |
| 1 – Raised | `--shadow-border` (1px ring 6% + 1px lift 6% + 2px ambient 4%) | **Everyday surfaces** — Card primitive, KpiRail, table containers, hero card chrome | `src/index.css:124–127` |
| 1.5 – Hover | `--shadow-border-hover` (1px ring 8% + 1px lift 8% + 2px ambient 6%) | Hovered card variant | `src/index.css:128–131` |
| 2 – Menu / Popover | `--shadow-popup` (4px lift 8% + 1px ring 4%) | Selects, popovers, tooltips, dropdown menus | `src/index.css:139–141` |
| 3 – Modal | `--shadow-modal` (16px lift 12% + 1px ring 6%) | Dialog, AlertDialog, Sheet (right-docked drawer) | `src/index.css:142–144` |

**Rule:** shadow-first, **not** border-first. Card chrome is `rounded-sm bg-white shadow-(--shadow-border)` — no `border` class. Adapts to any background (warm-paper canvas or white) without reading harsh.

**Material ladder pairing** (codified 2026-05-05):

| Tier | Radius | Shadow | Surfaces |
|------|--------|--------|----------|
| Everyday | `rounded-sm` (6px) | `--shadow-border` | Card, KpiRail, table containers, hero card |
| Modal | `rounded-xl` (12px LOCKED) | `--shadow-modal` | Dialog, AlertDialog, Sheet |
| Sub-element | `rounded-xs` (4px) | none | Tabs trigger, Segmented item, SelectItem, Badge |
| Menu / popover | `rounded-sm` (6px) | `--shadow-popup` | Select content, dropdowns, tooltips |

**Concentric rule:** item radius < container radius. A 4px badge inside a 6px card inside a 12px modal reads correct; the reverse looks wrong.

### Motion defaults

All motion derived from the codebase. `transition-[colors,box-shadow]` (NOT `transition-all`), `duration-150 ease-out`, `motion-reduce:transition-none` everywhere.

- **Button press:** 150ms ease-out, color + shadow + `active:translate-y-px` ← code-direct: `src/components/ui/button.tsx:11`
- **Hover (pointer only):** 150ms ease-out on color/shadow only — no opacity ramp
- **Sliding indicator (Tabs / Segmented / SegmentedPill):** 200ms ease-out, transform + width animated. Single visual idiom across every pill-style selector. ← decided
- **Sheet enter:** 300ms ease-out, slide from right ← code-direct: `src/components/ui/sheet.tsx`
- **Dialog enter:** 200ms ease-out, fade + zoom-in-95 ← code-direct: `src/components/ui/dialog.tsx`
- **Toast:** sonner default (200ms enter + 4s hold + 200ms exit)
- **Tab / icon swap:** 150ms ease-out

---

## 6. Shapes *(Google canonical §6)*

### Border Radius Scale

Driven by `--radius` token (`0.625rem` = 10px base) in `@theme inline` (`src/index.css:213, 280–290`). **Modal radius is a locked override** — `--radius-xl: 0.75rem` (12px) regardless of base scaling.

| Token (YAML key) | Value | Uses | Context |
|---|---|---|---|
| `rounded.xs` | 4px | sub-elements | Tabs trigger, Segmented item, SelectItem, Badge |
| **`rounded.sm`** | **6px** | **dominant** | **Default for everyday surfaces — Card, Input, Select trigger, Button, Tabs list, Segmented track, table containers** |
| `rounded.md` | 8px | rare | Intermediate — sonner toast |
| `rounded.lg` | 10px | rare | Intermediate — base radius value |
| `rounded.xl` | **12px LOCKED** | modals only | Dialog, AlertDialog, Sheet — locked override |
| `rounded.full` | 9999 | pills | Status dots, Tag, VendorAvatar (when wrapped in chip elsewhere — n/a today), Switch thumb track |

**Rule:** sub-elements 4px · everyday surfaces 6px · modals 12px. Items inside containers always smaller radius than container (concentric rule). Don't mix radii on a single element. Don't override `rounded-xl` on modals — the 12px is intentional and load-bearing.

### Shape Language

Sharp-cornered isn't a thing here — every surface is rounded. But the curvature is tight, not soft: at 6px on a 36px-tall input, the radius reads as deliberate, not pillowy. Iconography from `lucide-react` at default stroke weight `1.75`; sizes step `size-3` (12px) / `size-3.5` (14px) / `size-4` (16px) / `size-5` (20px) chosen by surface density. Buttons trim icon-side padding via `data-icon="inline-start" | "inline-end"` so the icon doesn't visually shove the label.

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

## Agent Prompt Guide *(our extension — preserved)*

### Quick Color Reference

- **Primary CTA:** `{colors.primary}` background → `{colors.primary-foreground}` text (ink-900 on white)
- **Page background (cards / dialogs):** `{colors.background}` (white); body bg is `{colors.canvas-bg}` (warm paper)
- **Card surface:** `{colors.card}` with `shadow-(--shadow-border)` — no border class
- **Heading text:** `{colors.foreground}` (ink-900)
- **Body text:** `{colors.ink-800}`
- **Secondary / muted text:** `{colors.muted-foreground}` (ink-500)
- **Input placeholder:** `{colors.ink-400}`
- **Input border (default):** `{colors.input}` (ink-200)
- **Input border (focused):** `{colors.ring}` (ink-400)
- **Label text:** `{colors.foreground}` (ink-900) — `font-medium`
- **Semantic / required indicator:** `{colors.destructive}` (danger-600)
- **Brand accent (info, focus, completed, active tab):** `{colors.blue-700}`
- **Inline link:** ink + `decoration-ink-200` underline (NO blue, render as `<button>`)

### Iteration Guide

- **Type:** `{typography.body}` default; escalate h3 (card) → h2 (section) → h1 (page) → `{typography.hero-numeric-lg}` (full-page hero metric). Sans labels `font-medium` minimum.
- **Surfaces:** `{components.card}` (`rounded-sm bg-white py-4 shadow-(--shadow-border)`, content `px-4`); modal `rounded-xl shadow-(--shadow-modal)`; menu `rounded-sm shadow-(--shadow-popup)`.
- **Controls:** `{components.button-default}` for primary, `outline`/`ghost` for secondary/tertiary. `{components.input}` `bg-ink-50 border-ink-200 rounded-sm h-9`.
- **Spacing:** default gap `{spacing.4}` (16px); dense rows `{spacing.3}` (12px); outer page margins `{spacing.6}` (24px) at `lg`/`xl`/`2xl`. 4px-grid only.
- **Layout:** 12-column grid + 16px gutters on composed pages; target ≥1280px.
- **Charts:** series colors from `--chart-1..8` by index, NOT from `VENDOR_META[v].color`.
- **Icons:** lucide-react stroke `1.75`; sizes `size-3` / `size-3.5` / `size-4` / `size-5` by density. In Buttons, set `data-icon="inline-start"`/`inline-end"` for variant-aware padding.
- **Links:** `<button type="button">` + ink + `decoration-ink-200` underline (→ `decoration-ink-500` on hover/focus). NOT blue.

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
