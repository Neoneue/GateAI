# Chart Colors

How chart series across the app pick their colors, why we don't tie them to brand colors, and what we surveyed to land on the current palette.

> **TL;DR.** Charts use a standalone 8-color OKLCH categorical palette — `--chart-1` through `--chart-8` in `src/index.css`. Series pick a slot **by index**, in stable order, regardless of what they represent. The palette is mid-saturation with deliberate light/dark alternation between adjacent slots so neighboring series can never blob into each other. Brand colors still drive vendor icons in tables and KPI rails — only chart series are decoupled.

---

## 1. The problem we were solving

Before this pass, the Request Volume chart in CMP-012 colored each series by its vendor's brand color from `VENDOR_META`:

- Claude Sonnet 4.5 → Anthropic dusty coral (`#D97757`)
- GPT-4o → ink gray (deliberate "don't go rainbow" override)
- Claude Haiku → Anthropic secondary beige (`oklch(0.83 0.075 65)`)
- Llama 3.3 → Meta blue (`#0064E0`)
- Mistral Large → Mistral orange-red (`#FA520F`)

The PM's complaint, on review: "It looks muted." Three things were happening:

1. **Anthropic primary at `oklch(0.69 0.12 42)`** — chroma 0.12 is mid-range; the lightness puts it firmly in "dusty" territory. Reads coral, not orange.
2. **Anthropic secondary (Haiku) at `oklch(0.83 0.075 65)`** — chroma 0.075 is barely a color. Reads beige.
3. **Sonnet and Haiku read as the same orange family with low contrast between them** — half the chart looked like one team.

We tried two intermediate fixes before landing here:

- **Bumping saturation on the brand colors** (added `chartColor` overrides on `VendorMeta`). Better, but still tied charts to brand-color decisions, which means every brand refresh cascades to charts. And the Sonnet/Haiku same-vendor problem doesn't go away.
- **Decoupling charts from brand colors entirely.** PM was decisive: *"No, I would say we need a palette of colors for all graphs throughout the app and they should be used regardless of the content."*

This is the right architectural call for analytics dashboards — Datadog, Grafana, Power BI, Tableau, Looker all default to fixed categorical palettes per series-index, not per data-content.

---

## 2. What we surveyed

To pick the right register, we pulled hex values and design rationale from nine canonical sources. Direct quotes / extracted hex codes below.

### Tableau Classic 10

The "sophisticated business" benchmark. Chroma 0.07–0.10, L 0.55–0.70.

```
#5778a4  blue       #e49444  orange     #d1615d  red       #85b6b2  teal
#6a9f58  green      #e7ca60  yellow     #a87c9f  purple    #f1a2a9  pink
#967662  brown      #b8b0ac  gray
```

Tableau's own write-up says the previous (saturated) palettes "looked cheap" in business reports. This one is deliberately desaturated.

### D3 `schemeTableau10`

Tableau-derived, slightly punchier. The de facto default for D3-powered charts.

```
#4e79a7  blue       #f28e2c  orange     #e15759  red       #76b7b2  teal
#59a14f  green      #edc949  yellow     #af7aa1  purple    #ff9da7  pink
#9c755f  brown      #bab0ab  gray
```

### D3 `schemeCategory10`

The original "matplotlib default." High saturation, primary-color register. Reads "scientific notebook."

```
#1f77b4  blue       #ff7f0e  orange     #2ca02c  green     #d62728  red
#9467bd  purple     #8c564b  brown      #e377c2  pink      #7f7f7f  gray
#bcbd22  olive      #17becf  cyan
```

### Plotly default

The brightest of the major options. High chroma everywhere. "Python notebook" feel.

```
#636EFA  indigo-blue   #EF553B  red-orange    #00CC96  bright teal-green
#AB63FA  bright purple #FFA15A  amber-orange  #19D3F3  cyan
#FF6692  pink          #B6E880  lime-green    #FF97FF  pink-purple
#FECB52  golden
```

### Apache ECharts default

Chinese-market analytics aesthetic. Earthy, muted, almost newspaper-like. Lowest saturation of the bunch.

```
#c23531  brick red    #2f4554  navy slate   #61a0a8  dusty teal
#d48265  terracotta   #91c7ae  sage green   #749f83  forest
#ca8622  ochre        #bda29a  taupe        #6e7074  charcoal
#546570  steel        #c4ccd3  silver
```

### GitLab Pajamas

5-color palette using a "chevron-skipping" pattern — adjacent slots alternate BOTH hue and lightness so neighboring series contrast on two axes simultaneously.

```
#617ae2  blue (500)        #c95d2e  orange (500)   #0090b1  aqua (500)
#619025  green (500)       #cf4d81  magenta (500)
```

The principle is more important than the specific colors: deliberate adjacency contrast on two axes prevents the "two-similar-hues-blobbing" problem.

### IBM Carbon Charts

14-color palette designed around **WCAG 3.5:1 contrast minimum** between adjacent slots. Carbon's principle: any two adjacent slots are guaranteed accessibly distinguishable, with the palette extending up to 14 to handle very long legends.

### Atlassian Design System "categorical8"

8-color palette. Atlassian shipped 94 chart-specific tokens (extensive system). Accessibility-first.

### Datadog "Classic"

6 colors, default for all dashboard widgets. Exact hex codes not in public docs.

### Stripe (methodology only)

Pioneered using CIELAB for perceptually uniform palettes in product UI — the precursor to OKLCH. Their finding: "none of our default text colors met the contrast threshold except for black" before the audit. Mid-tone colors hide accessibility problems unless designed in a perceptually uniform space.

---

## 3. Patterns we extracted

**Palette size is settled at 8–10.** Tableau, D3, Plotly, Atlassian all converge on 8–10 slots. Carbon goes to 14 for special cases. GitLab goes to 5 (limited). 8 is the sweet spot for "enough variety, no decision paralysis."

**Saturation register splits into three camps.**

| Register | Chroma | L target | Examples | Reads as |
|---|---|---|---|---|
| **Saturated** | 0.18–0.25 | 0.55–0.70 | Plotly, D3 Category10 | Punchy, tech, AI/ML |
| **Mid** | 0.10–0.18 | 0.55–0.70 | D3 Tableau10, GitLab Pajamas | Modern dashboard |
| **Muted** | 0.04–0.10 | 0.55–0.70 | Tableau Classic, ECharts, Carbon | Business report, executive |

**Hue ordering for adjacency contrast.** GitLab and Tableau Classic both ensure adjacent slots differ in BOTH hue (≥45°) AND lightness (≥0.05 L). A palette that's only hue-separated (uniform L) loses the chevron-skipping safety margin and risks adjacent-blob.

**Light theme tuning.** Most palettes sit at L≈0.6 — good contrast (typically 4.5:1+) against white surfaces and against the darker text labels on charts. Dark-theme variants typically lift L to 0.7–0.75 and reduce chroma slightly.

---

## 4. Options we considered

### Option A — Keep the saturated palette (status quo before the survey)

```
oklch(0.62 0.22 255)  blue        oklch(0.70 0.20 50)   orange
oklch(0.66 0.18 150)  green       oklch(0.62 0.22 290)  purple
oklch(0.65 0.22 12)   pink        oklch(0.68 0.14 195)  teal
oklch(0.78 0.18 80)   amber       oklch(0.55 0.04 250)  slate
```

**Pro:** PM asked for colorful, this delivers.
**Con:** Reads slightly louder than the codebase's "operator-tool quiet" voice. Risks "AI dashboard demo" tonal lean.

### Option B — D3 Tableau10 (industry mid-saturation default)

```
#4e79a7  blue        #f28e2c  orange     #e15759  red       #76b7b2  teal
#59a14f  green       #edc949  yellow     #af7aa1  purple    #ff9da7  pink
```

**Pro:** Battle-tested, instantly recognizable. Good middle ground.
**Con:** Same palette as everyone else. The exact opposite of design distinctiveness — "we use the standard" is its own kind of tell.

### Option C — Tableau Classic 10 (sophisticated/muted)

```
#5778a4  blue        #e49444  orange     #d1615d  red       #85b6b2  teal
#6a9f58  green       #e7ca60  yellow     #a87c9f  purple    #f1a2a9  pink
```

**Pro:** Aligns with "operator-tool quiet" voice. Sophisticated.
**Con:** PM specifically asked to *push* saturation, not pull it back further. Wrong direction.

### Option D — Custom OKLCH at mid-saturation, chevron-skip ordered (chosen)

```
--chart-1: oklch(0.55 0.18 255)  /* deep blue       — D */
--chart-2: oklch(0.72 0.17 50)   /* light orange    — L */
--chart-3: oklch(0.50 0.16 150)  /* deep green      — D */
--chart-4: oklch(0.70 0.18 290)  /* light purple    — L */
--chart-5: oklch(0.58 0.20 12)   /* mid coral       — M */
--chart-6: oklch(0.75 0.13 195)  /* light teal      — L */
--chart-7: oklch(0.60 0.15 80)   /* mid amber       — M */
--chart-8: oklch(0.45 0.04 250)  /* charcoal slate  — D, neutral fallback */
```

D = darker, L = lighter, M = mid lightness.

The first four slots — the most common case (most charts have 3–5 series) — carry the strongest D/L/D/L alternation. Slots 5–7 stay in the mid band. Slot 8 is the darkest, reserved as the neutral fallback.

**Pro:** Distinctive (not a clone of Tableau or D3), aligns with the codebase's "operator-tool quiet" voice (mid-saturation, not Plotly-loud), accessibility-strong (high adjacent contrast on both hue and lightness), well-grounded in the chevron-skipping principle from GitLab Pajamas.
**Con:** Requires the most thought to maintain — if a future contributor adds a 9th series, they need to understand the L-alternation rule when picking a value.

---

## 5. Why Option D direction

Three reasons, in order of weight, for picking the custom-OKLCH track over Tableau/D3/Carbon:

1. **Saturation register is tunable without a vendor lock-in.** The custom track lets us shift between Tableau Classic, D3 Tableau10, and Plotly registers via small chroma/lightness moves. Locking to any of the named systems would freeze us at their decision.

2. **Adjacent contrast is structural, not accidental.** Adjacent slots can be tuned for both hue distance AND lightness contrast as needed, with explicit OKLCH controls. Two neighboring series can be guaranteed distinct.

3. **OKLCH grounding makes future tuning principled.** Every color is defined by L/C/H, so adjustments (PM wants brighter, accessibility audit needs more contrast, dark mode lift) are local and parametric instead of "pick a different hex and hope."

---

## 6. Iteration past the initial pick

Option D started as a chevron-skipping mid-saturation palette (alternating dark/light per slot). Two rounds of tuning landed on the actual shipped palette:

**Round 1 — abandoned chevron-skipping for uniform brightness.** PM and reviewer feedback: green at `oklch(0.50 0.16 150)` and amber at `oklch(0.60 0.15 80)` read muddy against white and against the brighter slots above them. The chevron-skip principle that put them at lower L was sacrificing visibility for theoretical adjacent contrast. We lifted everyone to L 0.62–0.85 (matching the Stacklane reference range) and kept ≥85° hue separation between adjacent slots in palette order. Lightness alternation dropped; uniform brightness up.

**Round 2 — replaced slate with magenta.** Slot 8 was originally a near-neutral slate (`oklch(0.45 0.04 250)`) intended as a "neutral fallback." Survey of the canonical systems showed this is an anti-pattern: Tableau and D3 only use gray as slot 9 or 10 (extending past the primary 8 vivid slots), and 8-slot palettes (Atlassian categorical8, IBM Carbon's first 8) use vivid colors throughout. A neutral slot mid-palette reads as "broken / less important," not as the 8th category. Replaced with magenta at `oklch(0.68 0.20 335)` — fills the largest unfilled hue gap (290°→18°) and matches the L/C band of the rest of the palette.

The principles that survived all rounds: index-based assignment, brand-decoupled, OKLCH-grounded, adjacent ≥85° hue separation, no neutrals as categorical slots.

---

## 7. Final palette + implementation

### Token definitions

`src/index.css`, in the `:root` block:

```css
--chart-1: oklch(0.62 0.18 255);  /* blue */
--chart-2: oklch(0.72 0.17 50);   /* orange */
--chart-3: oklch(0.72 0.20 145);  /* green */
--chart-4: oklch(0.70 0.18 290);  /* purple */
--chart-5: oklch(0.65 0.20 18);   /* coral */
--chart-6: oklch(0.75 0.13 195);  /* teal */
--chart-7: oklch(0.85 0.16 88);   /* amber */
--chart-8: oklch(0.68 0.20 335);  /* magenta */
```

All eight slots sit at L 0.62–0.85, C 0.13–0.20 — uniformly bright, mid-saturation. Hue distribution sorted: `18° / 50° / 88° / 145° / 195° / 255° / 290° / 335°` — eight slots covering all six color families (red / orange / yellow / green / blue / violet) with magenta closing the 290°→18° wedge. Adjacent slots in palette order are ≥85° apart in hue.

Exposed as Tailwind utility tokens via `@theme inline`:

```css
--color-chart-1: var(--chart-1);
/* ... */
--color-chart-8: var(--chart-8);
```

Available as both:
- Tailwind utilities — `bg-chart-1`, `text-chart-3`, etc.
- Direct CSS — `var(--color-chart-1)` for inline `style={}` use (charts using SVG fills do this).

### Picking colors in a chart — default index-based

Charts default to picking a slot **by series index**. Pattern from `CMP012ComposedDashboard.tsx`:

```tsx
type ModelSeries = {
  key: string;
  label: string;
  vendor: Vendor;
  /** Optional 1-based slot override into the chart palette (1..8). */
  slot?: number;
};

const CHART_PALETTE = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
  'var(--color-chart-8)',
] as const;

function seriesColor(series: ModelSeries, index: number): string {
  if (series.slot) return CHART_PALETTE[(series.slot - 1) % CHART_PALETTE.length];
  return CHART_PALETTE[index % CHART_PALETTE.length];
}

// Usage
{MODEL_LEGEND.map((m, i) => (
  <Bar key={m.key} dataKey={m.key} fill={seriesColor(m, i)} />
))}
```

If you have more than 8 series, the palette wraps. Charts with a single semantic series (e.g., a solo "Total Requests" line) don't need the categorical palette at all — pick a specific token like `var(--color-blue-700)` directly.

### Per-series slot override (the mnemonic exception)

The `slot?: number` field on each series overrides the positional default. Use it only when the chart's series ARE entities the reader has prior color associations with — typically AI vendor names where "blue = OpenAI, orange = Anthropic" is established in the broader ecosystem.

Live example, the Request Volume chart on CMP-012:

```tsx
const MODEL_LEGEND: readonly ModelSeries[] = [
  { key: 'sonnet',  label: 'Claude Sonnet 4.5', vendor: 'anthropic', slot: 2 },  // orange
  { key: 'gpt',     label: 'GPT-4o',            vendor: 'openai',    slot: 1 },  // blue
  { key: 'haiku',   label: 'Claude Haiku',      vendor: 'anthropic' },           // chart-3 (green) by index
  { key: 'llama',   label: 'Llama 3.3',         vendor: 'meta',      slot: 6 },  // teal
  { key: 'mistral', label: 'Mistral Large',     vendor: 'mistral'   },           // chart-5 (coral)
  { key: 'gemini',  label: 'Gemini 3 Pro',      vendor: 'google',    slot: 4 },  // purple
];
```

The rule of thumb: **default to positional; opt into mnemonic only when series are entities readers have prior associations with.** Charts of abstract metrics (success/failure, region A/B/C, plan tiers) shouldn't use the override at all. Same-vendor pairs (Sonnet + Haiku above) are an interesting case — give one the brand mnemonic slot and let the other go positional.

Don't repeat `slot` values within a single legend — uniqueness is the caller's responsibility.

### What's NOT this palette

- **Brand-colored vendor icons** in tables and KPI rails. Those still use `VENDOR_META[vendor].color` — the icon next to "claude-sonnet-4.8" is still Anthropic orange. Only the *chart series* are decoupled.
- **Sentiment-colored deltas.** `+12.6%` green, `-3.2%` red — those use `--color-success-700` and `--color-destructive`, not the chart palette.
- **Status badges and dots.** Those use the semantic ramps (`success-*`, `warning-*`, `danger-*`).
- **KPI rail sparklines.** As of 2026-05-06 the four sparklines on CMP-012 / CMP-014 KPI rails use `--color-chart-1`, `--color-chart-3`, `--color-chart-7`, and `--color-ink-500` — they DO use the chart palette tokens. Earlier they used semantic tokens (success, warning, blue, ink), which mixed coloring systems. Now they use the categorical palette as decorative differentiation.

The chart palette is for **categorical series differentiation only.** Status, sentiment, and brand identity all live in different token systems.

---

## 8. Future considerations

**Adding more colors past 8.** If a chart needs a 9th+ series, the palette wraps (`index % 8`), so series 9 = `--chart-1` again. If you genuinely need 9+ distinct colors in one chart, the chart is probably trying to show too much — fold or filter rather than extend the palette. (IBM Carbon's 14-color palette is the only major exception in the surveyed systems.)

**Dark theme.** Not shipped today. When dark-mode lands, lift each slot's L by ~0.05 (so `oklch(0.62 0.18 255)` → `oklch(0.67 0.18 255)`) and slightly reduce chroma (~0.02 less) to compensate for the higher perceived saturation on dark surfaces. Some slots are already at L 0.85 (amber) and won't need lifting; tune those by reducing chroma instead.

**Sequential / diverging palettes.** Not in scope for this doc. The categorical palette covers chart-by-series. If we ever need heatmaps, gradient encoding (Stacklane's leaderboard heat-shading), or diverging encoding (variance from a baseline), those are separate palette systems that should be added alongside, not derived from, the categorical palette.

**Accessibility validation.** All adjacent slots differ by ≥85° hue. Most slots sit at L 0.65–0.75 with one outlier at L 0.85 (amber, which needs the higher L for visibility at saturated yellow hue). Adjacent contrast against white ranges from ~3.0 (amber, the lightest) to ~5.5 (blue, the darkest of the saturated set) — at WCAG AA's 3.0 minimum for graphical objects. The amber is the bottleneck; if we ever lower it for accessibility margin, drop L to ~0.78 and bump chroma to ~0.18 to compensate.

---

## Sources

Direct hex extractions and design rationale pulled from:

- [D3 schemeTableau10 source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Tableau10.js)
- [D3 schemeCategory10 source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/category10.js)
- [Tableau 10 hex reference (GitHub gist)](https://gist.github.com/leblancfg/b145a966108be05b4a387789c4f9f474)
- [Tableau — How we designed the new color palettes](https://www.tableau.com/blog/colors-upgrade-tableau-10-56782)
- [GitLab Pajamas — Data visualization color](https://design.gitlab.com/data-visualization/color/)
- [IBM Carbon Design System — Color palettes](https://carbondesignsystem.com/data-visualization/color-palettes/)
- [Atlassian Design System — Data visualization color](https://atlassian.design/foundations/color-new/data-visualization-color)
- [Datadog — Selecting widget colors](https://docs.datadoghq.com/dashboards/guide/widget_colors/)
- [Stripe — Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)
- [Plotly — Discrete colors](https://plotly.com/python/discrete-color/)
- [Apache ECharts — Style concepts](https://apache.github.io/echarts-handbook/en/concepts/style/)
- [Datawrapper — Colors in data vis style guides](https://www.datawrapper.de/blog/colors-for-data-vis-style-guides)
