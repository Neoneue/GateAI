# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this project is

A design-system showcase ("Constellation Gateway") translated section-by-section from a Paper file (`app.paper.design/file/01KQ33WPFNCEZAER8FDFPVW5EP`, file name *Brilliant quartz*, artboard `v8 Geist-rounded · Showcase`, 1536×12674px). Each `§ CMP-###` block in Paper becomes one React "artboard" page. The app shell is a fixed left nav + scrollable main pane that swaps the active artboard. There is no router — page switching is `useState` in `src/App.tsx`.

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
- **Every artboard starts with `<ArtboardHeader />`** (code · title · description · parts · status), then groups its content as `<SectionHeader code="CMP-XXX.N — TITLE" hint="…" />` blocks. The `ArtboardHeader.tsx` comment is explicit: this header chrome is the spec-sheet wrapper, **not** part of the design system shipped to apps.
- **Adding a new artboard:** create the file in `src/artboards/`, then register it in the `PAGES[]` array in `src/App.tsx` (also extend the `PageId` union).
- **Color tokens** live in `src/index.css` under `@theme {}`: `ink-25..900` (neutrals), `blue-50..950` (brand), plus semantic `--color-primary/success/warning/danger`. Use these via Tailwind utilities (`bg-ink-25`, `text-ink-800`) — never hard-code hex. This is the no-hardcoded-values rule from the contract.
- **Body has a canvas grid background** painted in `index.css` (`linear-gradient` 40px). Anything that should sit on white needs an explicit `bg-white` or `bg-ink-25`.
- **Button icons:** put `data-icon="inline-start"` (or `inline-end`) on the SVG inside `<Button>` to get the variant-aware padding adjustment from `button.tsx`'s CVA. Plain icons work but won't get the trim.
- **Mono vs sans:** Geist Mono is the "machine voice" (codes, IDs, numerics, eyebrow labels). Geist Sans is the "human voice" (titles, body, button labels). Roughly 60/40 mono/sans on operational surfaces — see Paper §CMP-000.2.
- **Numerics in tables** should be Geist Mono and tabular. The data-table artboard is the reference.

## Source of truth: Paper

The Paper MCP server is available. Useful starting points:

- `mcp__paper__get_basic_info` — confirms which file is open
- `mcp__paper__get_tree_summary({ nodeId: "100V-0", depth: 5 })` — full artboard outline
- `mcp__paper__get_jsx({ nodeId, format: "tailwind" })` — production-ready component output
- `mcp__paper__get_computed_styles` — exact CSS values when needed

Section IDs (top-level frames inside `cmp-page` `102P-0`):

| § | nodeId | shipped? |
|---|---|---|
| CMP-000 Typography | `102Q-0` | ✓ |
| CMP-001 Buttons | `106M-0` | ✓ |
| CMP-002 Badges & tags | `10A0-0` | ✓ |
| CMP-003 Form fields | `10CI-0` | ✓ |
| CMP-004 Filter bar | `10FH-0` | ✓ |
| CMP-005 Tabs · pagination | `10HY-0` | ✓ |
| CMP-006 Modal · empty | `10K8-0` | ✓ |
| CMP-007 Stat cards | `10NM-0` | ✓ |
| CMP-007b Toast | `10UI-0` | ✓ |
| CMP-008 Charts | `10WC-0` | ✓ |
| CMP-009 Data table | `113H-0` | ✓ |
| CMP-011 Composed · Dashboard | `118W-0` | **TODO** |
| CMP-012 Code cards | `11MF-0` | **TODO** |

Masthead (`100W-0`) and Hero (`101K-0`) are intentionally not ported — the React app uses its own left-nav shell instead.

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
