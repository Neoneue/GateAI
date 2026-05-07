# CLAUDE.md

Guidance for Claude Code working in this repo.

## Session start — required reading

**Before any UI / design / frontend work in this session, read these in order:**

1. `front-end-developer/agent/front-end-developer.md` — the controlling design methodology for this repo. Quality bar ("The Standard"), no-hardcoded-values rule, source-data-before-target rule, "name your defaults" requirement, research requirement (every design recommendation cites a source), pre-ship quality checks (squint / signature / swap / mobile), and the skill routing table.
2. `docs/brand-guidelines.md` — project-side synthesis of brand decisions in code. Color palette (now 5 OKLCH ramps + Tailwind 50–950 naming as of 2026-05-05), typography (Geist + Geist Mono only, Tailwind type scale only with `text-3xl/4xl/6xl` overridden to Geist values 32/40/64, voice split with the four-voice taxonomy), logo + `<BrandMark />` component, voice traits + sample sentences + banned-phrases anti-list, layout grid policy, component conventions (16px card padding, 4px grid spacing, sliding-indicator selectors, primary = ink-900). **Note:** brand-guidelines.md may lag behind the code on the most recent decisions — the OKLCH migration, material ladder, and link affordance landed in `index.css` first; check the session memory logs (next item) for current state.
3. `data-model.md` (project root) — architecture map for this repo. Stack, app shell, artboard pattern, token contract chain (updated 2026-05-06 for the OKLCH 5-ramp system + material ladder), primitive reuse graph, Paper-to-code flow, file tree.
4. **Most-recent session decision logs** (read these for "what changed yesterday and why"):
   - `~/.claude/projects/-Users-cponticas-Documents-GitHub-mvp/memory/2026-05-06-session-chart-palette.md` — chart palette decoupled from brand colors + 8-slot categorical OKLCH palette + slot override mechanism + vendor brand visual refresh (bare-icon VendorAvatar, multi-color SVGs for Cohere/Mistral/Gemini)
   - `~/.claude/projects/-Users-cponticas-Documents-GitHub-mvp/memory/2026-05-06-session-audit-fixes.md` — Vercel Web Interface Guidelines audit + a11y icon pass + PaginationLink primitive flipped to button + numeric right-align convergence + table ink three-tier policy (PM-flagged)
   - `~/.claude/projects/-Users-cponticas-Documents-GitHub-mvp/memory/2026-05-06-session-continued.md` — make-interfaces-feel-better audit + 5-priority polish pass + subtitle width policy
   - `~/.claude/projects/-Users-cponticas-Documents-GitHub-mvp/memory/2026-05-05-session-design-pass.md` — Geist alignment: typescale + materials + heading hierarchy + vendor avatar + link affordance + OKLCH color migration
   - `~/.claude/projects/-Users-cponticas-Documents-GitHub-mvp/memory/MEMORY.md` — index of all feedback memories (chart palette decoupling, vendor avatar bare-icon, three-tier table ink density, no blue links, two-tier material ladder, color system structure)

The CLAUDE.md files (this one and `~/.claude/CLAUDE.md`) are auto-loaded into every session by the Claude Code harness, so they're already in context. The three files above are **not** auto-loaded — read them explicitly via the Read tool at session start.

If a task is purely mechanical (single-line className tweak, file rename, copy edit) per the "Working rule" section below, the reads can wait. For anything else — porting a Paper section, building a new component, design judgments, refactors — read them first.

## What this project is

A design-system showcase ("Constellation Gate AI") translated section-by-section from a Paper file (`app.paper.design/file/01KQ33WPFNCEZAER8FDFPVW5EP`, file name *Brilliant quartz*, artboard `v8 Geist-rounded · Showcase`, 1536×12674px). Each `§ CMP-###` block in Paper becomes one React "artboard" page. The app shell is a fixed left nav + scrollable main pane that swaps the active artboard. There is no router — page switching is `useState` in `src/App.tsx`.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind CSS v4** via `@tailwindcss/vite` (uses `@import "tailwindcss"`, `@theme {}` blocks — **not** v3 `tailwind.config.js`)
- **shadcn/ui** registry style `base-nova`, baseColor `neutral`, no prefix (`components.json`)
- **Base UI** (`@base-ui/react`) underneath shadcn primitives — note `Button` wraps `ButtonPrimitive` from Base UI, not Radix
- **Recharts**, **Sonner** (toast), **lucide-react** (icons), **next-themes**
- Fonts: Geist + Geist Mono (Google Fonts CDN + `@fontsource-variable/geist` fallback)

## Commands

```bash
npm run dev              # Vite dev — defaults to :5173, but the user wants :3000
npm run dev -- --port 3000 --strictPort
npm run build            # tsc -b && vite build
npm run lint             # eslint .
```

User preference: dev server runs on **port 3000**. Kill any stale node listeners on 3000/5173 before restarting (`lsof -nP -iTCP:3000 -sTCP:LISTEN`).

## Layout

```
src/
  App.tsx                       # left nav + main pane; PAGES[] registers each artboard
  main.tsx                      # StrictMode root
  index.css                     # Tailwind v4 imports + @theme tokens (ink/blue ramps, fonts)
  artboards/
    _shared/ArtboardHeader.tsx  # <ArtboardHeader> + <SectionHeader> spec-sheet chrome
    CMP000Typography.tsx        # ...one file per section, named export matching filename
    CMP001Buttons.tsx
    ...CMP009DataTable.tsx
  components/
    ui/                         # shadcn primitives — Button, Input, Tabs, Table, Dialog, etc.
    canvas/Artboard.tsx         # absolute-positioned wrapper (used by zoomable canvas mode, not the current shell)
    icons/model-providers.tsx
  lib/
    utils.ts                    # cn() = twMerge(clsx(...))
    portal-target.tsx
public/
  favicon.svg, icons.svg
front-end-developer/            # bundled design-methodology agent — see "Design methodology" below
```

Path alias: `@/*` → `src/*` (configured in `vite.config.ts` and `tsconfig.json`).

## Working rule — agent for craft, main thread for mechanical, no ceremony either way

The `front-end-developer` subagent (installed at `.claude/agents/front-end-developer.md`, project-scoped, Opus) exists to enforce craft on substantive design decisions. It is NOT a manifest pipeline that every diff has to pass through. Use it when there's a real design call to make. Skip it when the answer is already determined.

### Dispatch the agent for these (and only these):

- New primitive design or extraction (e.g. lifting `CompactKpi` out of CMP-007, building a `CodeCard` family)
- Picking which existing primitive applies to a Paper subtree, or judging whether to extract a new one
- Color, typography, spacing, motion decisions where the contract chain (`system.md` → `globals.md` → `index.css`) needs to be applied
- Paper-to-code translation (anything involving `get_jsx`, `get_computed_styles`, vendor-meta mapping)
- Cross-surface refactors where coherence across multiple artboards matters
- Visual review (`critique`, `polish`, `rams`) when the user asks for an opinion on what's wrong

### Edit directly in the main thread for these:

- Single-line className tweaks (padding, font, color swap)
- Removing one entry from an array, deleting one line, dropping one prop
- File renames with a known target name + corresponding internal updates
- Copy edits (changing a string, updating a label, re-numbering codes)
- Adding one row to existing data
- Reverting a change you just made
- Fixing a typo or unused import

For these, open the file, edit, confirm in one sentence. No agent. The user is paying time and tokens for ceremony when there's no craft decision to enforce.

### When you do dispatch, brief is tight:

- File path
- Exact change (paste the before/after className or line, or describe the structural swap in one paragraph)
- 1–3 hard rules ("don't touch X", "no hardcoded hex")
- "Verify with tsc + a screenshot, report"

That's the whole brief. ~8–15 lines. Do NOT re-state the agent contract — the agent has it loaded. Do NOT re-explain the project conventions — they're in this file. Do NOT request a multi-section structured deliverable for a single-line fix. Do NOT prepend `Operate as the front-end-developer agent` boilerplate when the agent is registered as `subagent_type: "front-end-developer"` (only needed for `general-purpose` fallback).

### Around the dispatch:

- **No "Got it, dispatching" pre-message.** Just dispatch.
- **No post-dispatch paraphrase** of the agent's deliverable. One sentence confirming the change is live, then move on. The user reads tool output directly.
- **No "Option A or Option B" prompts** unless the user has signaled the answer matters. Pick the cleaner option, document it in the brief, ship.
- **Pre-reads are minimal.** Don't read files to "surface line numbers" the agent can grep on its own. Read only when the answer changes the brief.

### Model:

- Implementation dispatches: NO `model` override (gets the agent's default, Opus). Includes work that ends with chrome-devtools verification.
- `model: "sonnet"`: ONLY for dispatches whose entire scope is mechanical verification — screenshots, clicks, snapshot reads, no code changes.

### Parallelize independent work:

One tool message with multiple `Agent` calls when slices don't overlap (e.g. file renames in disjoint groups). Skip per-agent verification when the intermediate state would fail it; do one final verification dispatch after all parallel agents land.

### The orchestration test:

Before dispatching, ask: "Is there a design judgment in this change that the agent's craft methodology would catch and I wouldn't?" If no — edit directly. If yes — dispatch lean.

## Design methodology — the `front-end-developer/` bundle

The agent at `.claude/agents/front-end-developer.md` (sourced from `front-end-developer/agent/front-end-developer.md`) is the controlling design methodology for this repo — not optional reference material.

**Active design contract (chain of authority):**

1. **`system.md`** (host-level Theme + Project) — does **not** exist yet in this repo. If/when one is added, it wins for anything it defines.
2. **`front-end-developer/contract/globals.md`** — Layer 1 stable token/layout boilerplate (Tailwind v4 + shadcn architecture).
3. **`src/index.css`** — this repo's actual `@theme` token block (ink/blue ramps, fonts, semantic vars). This is the host's `globals.css` equivalent.

When a decision isn't covered by a higher layer, fall through. Don't invent orphan values — every color/spacing/radius/type choice traces back to this chain.

**Skill routing — load just-in-time, not upfront.** The bundle has `skills/`, `knowledge/core/`, `knowledge/paper/`, `knowledge/shadcn/`. Don't read all of them. Load at the moment that phase of work begins:

| When | Read |
|------|------|
| Starting any UI work | `front-end-developer/skills/web-design-guidelines/SKILL.md` + `knowledge/core/craft-methodology.md` |
| Porting a Paper section to code (this repo's main activity) | `skills/paper-to-code/SKILL.md` + `knowledge/paper/mcp-workflow.md` |
| Pushing existing React back to Paper for iteration | `skills/code-to-paper/SKILL.md` |
| Building/auditing OKLCH palettes (the `ink-*` / `blue-*` ramps in `index.css`) | `knowledge/oklch-skill/` (if present) — otherwise reason from `contract/globals.md` |
| Writing animation or transitions | `knowledge/core/motion-patterns.md` |
| Pre-ship review | `knowledge/core/pre-ship-quality-checklist.md` + `skills/polish/SKILL.md` |
| Holistic "what's wrong with this" review | `skills/critique/SKILL.md` |
| WCAG + visual review on touched files | `skills/rams/SKILL.md` |

The full skill table is in `agent/front-end-developer.md`. When unsure which skill applies, run `critique` first — it points at the right verb.

**Source-data rule (always):** Before writing or changing code to match Paper, call `get_jsx(format="tailwind")` + `get_computed_styles` on the source node. Never trace from screenshots — they're for visual verification only. The Paper output IS production HTML/CSS; adapt to repo conventions (component imports, `cn()` from `@/lib/utils`).

**Hooks (optional, not installed):** `front-end-developer/hooks/` ships `post-edit-typecheck.sh`, `pre-paper-check.sh`, `post-paper-verify.sh`, `pre-figma-check.sh`, `post-figma-verify.sh`. Install by copying into `.claude/hooks/` and wiring matchers in `.claude/settings.json` if/when desired.

## Conventions specific to this repo

- **Artboard files** are named `CMP{NNN}{PascalName}.tsx` and export a function with the same name. Each one is a single page wrapped in `<div className="flex flex-col w-[1440px]">` — fixed 1440px to mirror Paper.
- **Every artboard starts with `<ArtboardHeader />`** (code · title · description · parts · status), then groups its content as `<SectionHeader code="CMP-XXX.N — TITLE" hint="…" />` blocks. SectionHeader parses the `code` prop on " — " separator: prefix renders as a small mono uppercase eyebrow, title as an `<h2 class="text-2xl/8">` sans-medium ink-800. Three-step page hierarchy: artboard h1 = 32px (text-3xl/9) → section h2 = 24px (text-2xl/8) → card title = 16–20px. Spec-sheet chrome — **not** shipped to apps.
- **Adding a new artboard:** create the file in `src/artboards/`, then register it in the `NAV[]` array in `src/App.tsx` (also extend the `PageId` union).
- **Color tokens (rewritten 2026-05-05, OKLCH migration):** Five OKLCH ramps in `src/index.css` `@theme {}`, all 11 steps (50–950): `ink-*` (neutral), `blue-*` (brand, blue-700 anchored to logomark), `success-*` (Tailwind v4 green), `warning-*` (Tailwind v4 amber), `danger-*` (Tailwind v4 red). Step roles stable across ramps — 50/100 washes, 200 borders, 500 secondary text/chart strokes, 600 saturated mid, 700 saturated text, 800/900 high-contrast. Single-token semantics (`text-warning`, `bg-success`, `-2` brighter variants) **were removed** during the migration — use ramp tokens (`text-warning-700`, `bg-success-100`). `info` aliases to blue (no separate ramp). `--destructive` shadcn semantic still works (points at `danger-600`). Use via Tailwind utilities (`bg-ink-200`, `text-warning-700`) — **never hard-code hex**.
- **Material ladder (codified 2026-05-05):** Two-tier elevation. Everyday surfaces use `rounded-sm` (6px) + `shadow-(--shadow-border)` — Card primitive, KpiRail, table containers, etc. Modal surfaces use `rounded-xl` (overridden in `@theme inline` to 12px) + `shadow-(--shadow-modal)`. Sub-elements inside tracks use `rounded-xs` (4px) — Tabs trigger/indicator, Segmented item/indicator, SelectItem. Item radius < container radius (concentric rule).
- **Body has a canvas grid background** painted in `index.css` (`linear-gradient` 40px). Anything that should sit on white needs an explicit `bg-white` or `bg-ink-50`.
- **Button icons:** put `data-icon="inline-start"` (or `inline-end`) on the SVG inside `<Button>` to get the variant-aware padding adjustment from `button.tsx`'s CVA. Plain icons work but won't get the trim.
- **Mono vs sans:** Geist Mono is the "machine voice" (codes, IDs, numerics, eyebrow labels). Geist Sans is the "human voice" (titles, body, button labels). Roughly 60/40 mono/sans on operational surfaces — see Paper §CMP-000.2.
- **Numerics in tables** should be Geist Mono and tabular AND **right-aligned** (`text-right` on TableHead + TableCell). `tabular-nums` alone only fixes intra-row digit width — it does not fix inter-row drift when `4,051` sits above `52,810`. Right-edge anchoring places the ones-place at a fixed x across rows. Codified 2026-05-06 across CMP-012/013/014. The earlier CMP-011 left-align comment was wrong reasoning and has been retired. When a numeric column carries a conditional row-state indicator (slow-row icon, etc.), reserve a fixed-width slot in the **leading** position on every row — slow renders the icon, non-slow renders an invisible placeholder — so the digit column doesn't drift between states.
- **Table body-cell tone — three tiers only** (codified 2026-05-06): `text-ink-500` for context (timestamps, sub-IDs under titles), `text-ink-800` for body data (IDs, keys, numerics, initiators, secondary text), `text-ink-900` for the row's primary identifier (model name with VendorAvatar, row title button). Plus `text-ink-400` for missing-data dashes. **No `ink-600` / `ink-700` middle tones** without explicit reason — PM caught the drift on CMP-013 (~15-pt OKLCH lightness gap between IDs and numerics). See `feedback_table-ink-tiers.md`.
- **Pagination renders as `<button>`, not `<a>`** (codified 2026-05-06). The `PaginationLink` primitive in `src/components/ui/pagination.tsx` was patched to render `<button type="button">` — original shadcn used Base UI's `render={<a>}` override which is wrong for this codebase (no router → cmd/middle-click was never navigating anywhere). Same conversion applies to inline anchors in composed surfaces — modal subtitle conversation refs, row-title links: `<a href="#" onClick={preventDefault}>` → `<button type="button">` with the link affordance (ink + permanent faint underline) preserved. **Visual contract = link styling, semantics = button.**
- **Inline links** use ink + permanent faint underline: `underline decoration-ink-200 underline-offset-2 hover:decoration-ink-500 focus-visible:decoration-ink-500 outline-none`. **No blue link color** — blue is reserved for info/completed/active-tab/focus.
- **VendorAvatar** is one treatment everywhere: bare brand-colored icon at `size-4`, **no chip wrapper** (revised 2026-05-06, iteration 7). SVGs use `fill="currentColor"`; setting `style.color` on the icon paints it in `VENDOR_META[vendor].color`. Three vendors render multi-color via per-path fills inside the SVG (Cohere three-blob, Mistral five-band gradient, Gemini canonical Google gradient) — for those, the wrapper's `style.color` is ignored. `<VendorAvatar vendor={v} />` — that's the API; iteration history captured in the `vendor-meta.tsx` file comment so it doesn't re-prosecute.
- **Chart palette** (codified 2026-05-06): standalone 8-slot categorical OKLCH palette in `--chart-1..8` (`src/index.css`, exposed as `--color-chart-1..8` Tailwind utilities). **Brand-decoupled** — chart series pick a slot by index, not by what each series represents. Per PM call: "we need a palette of colors for all graphs throughout the app and they should be used regardless of the content." All eight slots sit at L 0.62–0.85, C 0.13–0.20 (uniformly bright, mid-saturation). Adjacent slots in palette order are ≥85° apart in hue. **No neutrals as categorical slots.** Per-series `slot?: number` override on the series type lets specific charts pin colors when there's a brand mnemonic worth honoring (Anthropic series → orange slot 2, OpenAI series → blue slot 1) — opt-in only when the series ARE entities readers have prior color associations with. Full design rationale, survey of other systems (Tableau / D3 / Carbon / Atlassian / GitLab Pajamas / Plotly / ECharts / Datadog), and iteration history in `docs/chart-colors.md`.
- **KPI rail sparklines** use chart palette tokens (`--color-chart-1` blue, `--color-chart-3` green, `--color-chart-7` amber, `--color-ink-500` neutral) — NOT semantic ramps. Earlier they used success/warning/blue semantic tokens, which mixed coloring systems and made the rail read inconsistently.
- **Page-header subtitle width** is capped at `max-w-1/2` on the WRAPPER column (not the `<p>` directly — fractional max-w on a leaf inside a content-sized column won't behave). Cap = 50% of the page-header flex parent.

## Source of truth: Paper

The Paper MCP server is available. Useful starting points:

- `mcp__paper__get_basic_info` — confirms which file is open
- `mcp__paper__get_tree_summary({ nodeId: "100V-0", depth: 5 })` — full artboard outline
- `mcp__paper__get_jsx({ nodeId, format: "tailwind" })` — production-ready component output
- `mcp__paper__get_computed_styles` — exact CSS values when needed

Section catalog (current code state — Paper nodeIds where known; the React file is the source of truth):

| Code | File | Shipped |
|---|---|---|
| CMP-000 | `CMP000Typography.tsx` | ✓ |
| CMP-001 | `CMP001Colors.tsx` | ✓ |
| CMP-002 | `CMP002Buttons.tsx` | ✓ |
| CMP-003 | `CMP003BadgesAndTags.tsx` (incl. CMP-003.3 DeltaTag specimen) | ✓ |
| CMP-004 | `CMP004FormFields.tsx` | ✓ |
| CMP-005 | `CMP005FilterBar.tsx` | ✓ |
| CMP-006 | `CMP006TabsPagination.tsx` | ✓ |
| CMP-007 | `CMP007ModalEmptyState.tsx` | ✓ |
| CMP-008a | `CMP008aCards.tsx` | ✓ |
| CMP-008b | `CMP008bStatCards.tsx` | ✓ |
| CMP-008c | `CMP008cCodeCards.tsx` | ✓ |
| CMP-009 | `CMP009Toast.tsx` | ✓ |
| CMP-010 | `CMP010Charts.tsx` | ✓ |
| CMP-011 | `CMP011DataTable.tsx` (sortable list / activity feed / drill-down panel) | ✓ |
| CMP-012 | `CMP012ComposedDashboard.tsx` (consolidated KPI rail + Quick Actions section) | ✓ |
| CMP-013 | `CMP013Requests.tsx` (Requests / Observability — hero card + table + drill-in modal) | ✓ |
| CMP-014 | `CMP014Conversations.tsx` (Conversations — KPI rail + filtered conversations table) | ✓ |

Masthead and Hero from the original Paper file are intentionally not ported — the React app uses its own left-nav shell instead.

## Workflow when porting a Paper section to React

1. Load `skills/paper-to-code/SKILL.md` + `knowledge/paper/mcp-workflow.md` from the bundle.
2. `get_tree_summary` on the section's nodeId to understand structure.
3. Identify which existing shadcn primitive in `src/components/ui/` covers each piece. Reuse, don't rebuild.
4. Pull exact code via `get_jsx(format="tailwind")` + `get_computed_styles` for any bespoke layouts. Adapt to project conventions (named export, `@/` import alias, `cn()` helper, `ink-*` / `blue-*` tokens — not hex).
5. Wrap the page in `<ArtboardHeader />` + `<SectionHeader />`s matching Paper's `§ CMP-### · …` labels.
6. Register in `src/App.tsx` `PAGES[]` (extend `PageId` union too).
7. Verify in the browser at `http://localhost:3000` — chrome-devtools MCP is available for screenshots.
8. Apply `skills/web-design-guidelines/SKILL.md` checks while building (a11y, focus, semantics) — not as a post-pass.

## Things to not change without asking

- The `front-end-developer/` directory (the design-methodology agent + skills + knowledge + hooks).
- The Tailwind v4 `@theme` token block and the body canvas-grid background in `src/index.css` — many components depend on them.
- The fixed 1440px artboard width.
- `components.json` shadcn config (`style: "base-nova"`).
- The `ArtboardHeader` / `SectionHeader` API — every artboard depends on it.
- **The 5-ramp OKLCH color system + step role conventions** — locked 2026-05-05 (see `feedback_color-system-oklch.md`). Don't reintroduce single-token semantics (`text-warning`, etc.) or `-2` brighter variants. Don't switch to hex.
- **The two-tier material ladder** — 6px everyday / 12px modal / 4px sub-element. Don't collapse to single radius or soften the tier discipline (see `feedback_geist-material-ladder.md`).
- **VendorAvatar's bare-icon treatment** — locked 2026-05-06 after iteration 7. Don't reintroduce a chip wrapper, a `tone` prop, or split treatment without explicit ask (see `feedback_vendor-avatar-treatment.md` for prior iterations and `vendor-meta.tsx` file comment for current rationale).
- **Link affordance — ink + permanent faint underline.** Blue is overloaded with 4 other meanings; adding "link" to it was rejected after research. Don't switch links to blue (see `feedback_link-affordance.md`).
- **Brand-mark blue** (`#1F2FCE` ≈ `oklch(0.345 0.224 268.85)` at blue-700). Anchored to `public/logomark.svg`. The blue ramp is derived around it.
- **No dark mode** — `:root.dark` block intentionally absent. `@custom-variant dark` is declared in `index.css` for future activation; redefine `:root` semantic tokens in a `.dark` block when shipping. The OKLCH ramp values stay constant across modes.
- **The three-tier table ink-density policy** — `ink-500` / `ink-800` / `ink-900` for body cells; `ink-400` for missing dashes; never `ink-600` or `ink-700` middle tones. Locked 2026-05-06 after PM-flagged tone drift. See `feedback_table-ink-tiers.md`.
- **Numeric column right-alignment** in composed-surface tables. CMP-013's earlier left-align reasoning was wrong; cross-surface convergence locked 2026-05-06. Don't revert without acknowledging the digit-drift problem.
- **`PaginationLink` rendering as `<button>`** — patched in the primitive 2026-05-06 to align with this app's no-router architecture. Don't restore the Base UI `render={<a>}` override.
- **DeltaTag sentiment coloring (rate metrics only), no qualifier** — default is sign-based (positive=green up-right, negative=red down-right). `deltaInverted` on `CompactKpi` flips the tone — positive paints red, negative paints green, arrow still tracks sign. **`deltaInverted` only applies to rate metrics where lower is unambiguously better** — latency, error rate, cost-per-call, cost-per-conv, time-to-first-token. **Volume metrics like Total Cost stay sign-based** because rising correlates with usage growth (not unambiguously bad). When picking, ask "is rising in this metric *unambiguously* bad?" If no, don't invert. **No textual qualifier accompanies the inverted color** — a "Lower is better" sub-line was tried 2026-05-06 and rejected as bad UI. Don't reintroduce it. Don't invent a third coloring mode. The `+`/`-` prefix on the displayed delta value is preserved (restored 2026-05-06 after a brief experiment with stripping it). See `feedback_delta-coloring.md`.
- **Chart palette decoupled from brand** — series colors come from `--chart-1..8` by index, not from `VENDOR_META[vendor].color`. Don't reintroduce vendor-coupled chart series (the previous `chartColor` field on `VendorMeta` and `VENDOR_CHART_COLOR_SECONDARY` were removed 2026-05-06). Per-series `slot?: number` override exists for brand-mnemonic exceptions (Anthropic→orange, OpenAI→blue) — opt-in only, default to positional. See `docs/chart-colors.md` for the full design rationale and survey.
