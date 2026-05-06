# PM feedback — actionable checklist

PM review captured 2026-05-05 against `CMP-013` (Requests + drill-in modal) and `CMP-014` (Conversations).
Reference screenshots: `~/.claude/image-cache/35f80783-dac2-4f8e-813b-61582669b959/2.png` (Conversations old vs new), `4.png` (Request modal old vs new), `6.png` (Conversations old vs new — second pass).

Repo conventions a fresh agent should know before touching these:
- Color tokens in `src/index.css` `@theme {}`: `ink-25..900` (neutrals), `blue-50..950` (brand), semantic vars `--color-success/warning/danger` plus `-2` saturated steps. **No hex literals** outside that block.
- Status pills use `<Badge variant="…" />` (`src/components/ui/badge.tsx`) + `<StatusDot kind="…" />` (`src/components/ui/status-dot.tsx`).
- KPI rail / spark uses `CompactKpi` + `CompactSpark` + `DeltaTag` in `src/components/ui/compact-kpi.tsx`.
- Tabs primitive: `src/components/ui/tabs.tsx`.
- Each artboard is `src/artboards/CMP{nnn}{name}.tsx` — page chrome (DashboardSurface, SidebarShell, DashSidebar, DashSidebarExpanded, DashTopBar) is currently duplicated across CMP-012 / 013 / 014.
- After edits run `npx tsc -b` (ignore the pre-existing `TS5101 baseUrl deprecation` line). Browser at `http://localhost:3000`; chrome-devtools MCP is available for verification screenshots.

---

## Conversations — `src/artboards/CMP014Conversations.tsx`

- [x] **1. Flatten status pill shape** _(2026-05-05)_
  Context: The conversation table's status badges (`active` / `completed` / `failed`) currently render as a fully rounded pill. PM wants the darker green/red kept, but the rounded-full container softened to something less pill-y. Touch the `Badge` primitive (`src/components/ui/badge.tsx`) — likely change `rounded-full` → `rounded-sm` or `rounded-md`. Verify all artboards still look correct since `Badge` is shared.
  Done: added `--radius-xs: calc(var(--radius) * 0.4)` (= 4px) to `src/index.css` `@theme inline` block, swapped Badge CVA `rounded-full` → `rounded-xs`. Padding tightened to `pl-3 pr-2` (12px / 8px) per follow-up.

- [x] **2. Recolor latency cell — drop the brown** _(2026-05-05)_
  Context: In the Requests log (and any latency display), the value uses warning/orange tones that read as brown. PM wants a non-warm hue. Likely a conditional in `CMP013Requests.tsx` around the latency `TableCell`'s className (search `latency` or `text-warning`). Replace warning-tone with neutral ink or blue.
  Done: swapped `text-warning` (#B45309 — the brown amber-700) → `text-warning-2` (#F97316 — Tailwind orange-500) in the slow-row `latencyCls` ternary in `CMP013Requests.tsx`. Other `text-warning` uses (toast bell, security `Elevated` score, Badge warning variant) intentionally untouched — PM only flagged latency.

- [x] **3. Model-column icon treatment** _(2026-05-05)_
  Context: `<VendorAvatar />` (`src/components/icons/vendor-meta.tsx`) currently renders multi-colored brand glyphs. PM wants a uniform color that's distinct from row text (so they read as icons not as content). Don't use the multi-color brand fill, but don't use the same color as cell text either — try `text-ink-500` or `text-blue-700` mono-color. Check `tone="neutral"` / other tones already wired into VendorAvatar.
  Done (final, after four iterations): Brand chip everywhere — white provider glyph on saturated brand-color chip, `size-3` glyph in `size-5` rounded square. No `tone` prop, no variants. Path: (1) brand chip everywhere → user said too much rainbow. (2) mono ink-800 icon-only everywhere → user said brand colors should come back. (3) brand-tinted bare icon everywhere → user disliked the lower contrast. (4) split treatment (neutral default for tables, brand for standalone) → user reverted: "too much black in tables." Final state collapses back to (1). Trade-off accepted: vendor-stacked tables read as a multi-hue grid, but cross-surface consistency wins.

- [x] **4. Lighten Tokens / Cost column text** (and Out / In on Requests) _(2026-05-05)_
  Context: Numerics in the conversation table currently use `text-ink-900`. PM says too dark/black. Drop to `text-ink-700` (or `text-ink-600`) for non-emphasized numerics; keep currency anchors readable. Apply consistently across `CMP013Requests.tsx` and `CMP014Conversations.tsx`.
  Done: numeric `TableCell`s in CMP-012 / CMP-013 / CMP-014 dropped from `text-ink-900` → `text-ink-800` (one step lighter; ink-700 felt too washed). Also lifted the `TableHead` default in `src/components/ui/table.tsx` from `text-ink-600` → `text-ink-500` so column titles sit a step quieter than body values — this fixes a hierarchy issue where headers were reading at body weight. Latency stays ink-800 default + warning-2 for slow rows; cost retained ink-800 weight (didn't split into a stronger anchor — left as a future polish if hierarchy needs it).

- [x] **5. Make the Requests hero chart oscillate** _(2026-05-05)_
  Context: KPI rail in CMP-014 (`KpiRail` function, ~line 478) feeds CompactSpark monotonically increasing arrays (e.g. `[180,192,200,...,247]`). PM wants traffic-style oscillation since these are activity counters, not cumulative totals. Replace each `data` array with up/down series of similar magnitude. Same likely needed on CMP-012 / CMP-013 KPI rails.
  Done: PM clarified scope — only the Requests hero chart in `CMP013Requests.tsx`. Switched `HERO_INCREMENTS` from cumulative running-total scaling to per-minute counts. Shape: rising baseline (50/min → 220/min across the hour) with quadratic-growth oscillation amplitude (`t^1.5 * 35`) so the first quarter reads near-smooth and the last quarter has visible 4-minute peaks/dips. Curve type changed `monotone` → `linear` for sharp angular peaks. Y-axis rescaled to domain `[0, 300]` with ticks `[0, 100, 200, 300]` and `horizontalPoints={[4, 27, 49, 72]}`. Sum tuned to 8,241 so headline + breakdown rows still reconcile. KPI-rail sparkline oscillation deferred — depends on #6 color policy.

- [ ] **6. Decide and apply sparkline color policy** (BLOCKING — see Open Questions)
  Context: Each `CompactKpi` currently passes a different `colorVar` (ink-400, warning-2, success-2, blue-500). PM is uneasy because in real production these tend to flatten to gray. Options: (a) all neutral, (b) all single brand color, (c) tied to metric semantics. Resolve before implementing #5.

- [x] **7. Remove the KPI delta pill chips** _(2026-05-05)_
  Context: `DeltaTag` (`src/components/ui/compact-kpi.tsx`) wraps the up/down number in `bg-destructive/15` / `bg-success/15` rounded-full pill. PM doesn't like the pill chip. Replace with bare directional arrow + value (still color-coded by sign) but no pill wash + no full-radius. Used by every KPI rail across CMP-008b / 012 / 013 / 014.
  Done: Stripped `DeltaTag` wrapper — dropped `bg-{success,destructive}/15`, `rounded-full`, `h-5`, and `pl-1 pr-2`. Color now applied via plain `text-success` / `text-destructive` on an inline-flex span containing arrow + mono value. Also swapped the custom filled-disc `DeltaArrowUp`/`DeltaArrowDown` SVGs for lucide `ArrowUpRight`/`ArrowDownLeft` per follow-up — cleaner standard glyphs, deleted `src/components/icons/delta-arrow.tsx` since it had no other consumers. Verified across CMP-012 KPI rail (4 deltas) and CMP-013 hero metric — all reads as bare colored arrow + number, no chip.

- [x] **8. Color the `completed` badge** _(2026-05-05)_
  Context: Conversations table's `completed` row uses `variant="info"` (currently neutral/black-ish). Active is green, failed is red — completed needs its own color so it doesn't read as the unstyled fallback. Suggest muted purple, ink-blue, or a desaturated success step. Update the `STATUS_BADGE` map in `CMP014Conversations.tsx` (~line 549).
  Done: Repointed the shared `info` Badge variant from `bg-primary/15 text-primary` (= ink-900, reading as black) to `bg-blue-700/10 text-blue-600` and `StatusDot kind="info"` from `bg-primary` to `bg-blue-600`. `completed` now reads as a soft blue chip — complementary to green `active` and red `failed`, all three sit at matched visual weight. CMP-011 (`normal` security score) and CMP-013 (`miss` cache row) inherit the same blue treatment, which is correct semantically (`info` should be blue, not black). Also tightened badge horizontal padding by 2px each side (`pl-3 pr-2` → `pl-2.5 pr-1.5`, icon-overrides `pr-2`/`pl-2` → `pr-1.5`/`pl-1.5`) and dropped neutral-tone vendor avatar tint from `text-ink-800` → `text-ink-700` per follow-up polish.

- [x] **9. Replace toolbar "More" button** _(2026-05-05)_
  Context: The conversation table toolbar (~line 588) ends with `<Button variant="outline">More</Button>` which has no clear job. PM wants it gone or recast as a Filter affordance. Easiest is delete; if converting to filter, mirror the existing `Select` triggers (User / Key) in shape.
  Done: Removed `<Button>More</Button>` and the adjacent `7 of 18,210` mono pagination text. Briefly tried a `ListFilter`-icon "Filter" button per follow-up but the user opted to drop it entirely once the User / Key selects were regrouped to the right edge — they read as the filter affordance on their own. Toolbar is now: search input + scope pill on the left, `grow` spacer, then `All users` and `All keys` selects on the right. `ListFilter` import dropped from the lucide barrel.

- [x] **10. Slim the Models column data** _(2026-05-05)_
  Context: `CONVERSATION_ROWS` (~line 568) currently lists 2–3 vendors per row. PM wants most rows to show a single model with only 1–2 example rows showing 2–3 stacked. Edit the seed data so the visual default is "one model per call".
  Done: Trimmed `CONVERSATION_ROWS` so 5/7 rows render a single vendor. Kept `cnv_skylark_18` at 2 stacked (anthropic + openai — drafting + fact-check shape) and `cnv_orion_70` at 3 stacked (anthropic + openai + mistral — the long 18-turn / 38-req investigation, where multi-model fan-out reads naturally). Stripped: aurora_42 → anthropic only, lyra_92 → openai only, vela_21 → anthropic only. Default visual is now one model per call with two intentional multi-model exemplars.

- [x] **11. Remove "New session" button** _(2026-05-05)_
  Context: `PageHeader` in CMP-014 (~line 448) renders `<Button variant="default">New session</Button>`. Delete the button and the surrounding flex slot if it becomes empty (the `<Download> Export` outline button stays).
  Done: Deleted the `<Button variant="default">New session</Button>` (with its `<Plus>` icon) from `PageHeader` in `CMP014Conversations.tsx`. Kept the surrounding `<div className="flex items-center gap-2 shrink-0">` since the Export button still occupies it. Dropped the now-unused `Plus` import from the lucide barrel.

- [x] **12. Linkify the conversation title** _(2026-05-05)_
  Context: Conversation column cell renders the title as plain `<span>`. PM says it should be a link (since it's the row's primary action). Wrap the title in an `<a>` (or styled `<button>`) with hover underline. Mind the existing row-click drill-in — the link should not duplicate that affordance.
  Done: Swapped the title `<span>` in `CMP014Conversations.tsx` table cell (~line 665) for `<a href="#" onClick={(e) => e.preventDefault()}>`. Kept the existing `font-sans text-sm text-ink-900 -tracking-[0.14px] truncate` typography unchanged so the title still anchors the row at full ink weight; layered on `hover:underline underline-offset-2 decoration-ink-400 focus-visible:underline outline-none` so the link affordance only surfaces on hover/keyboard focus (no permanent underline = no visual duplication of the row's existing `cursor-pointer` chrome). Note: `TableRow` carries `cursor-pointer` but no real `onClick` — the drill-in is implied, not wired, so the anchor isn't competing with a real handler.

- [x] **13. Drop the "Replay" button — Conversations** _(2026-05-05, no-op)_
  Context: Search the file for "Replay" — if any drill-in modal or row affordance includes it, remove. PM says it was a hallucinated feature.
  Done: `grep -n "Replay\|replay" CMP014Conversations.tsx` returned zero matches. CMP-014 has no drill-in modal yet (row carries `cursor-pointer` but no actual `onClick`), so there was no Replay affordance to remove. No-op for this file. The cross-cutting Replay audit (#19) will catch any other surfaces.

---

## Request modal — `src/artboards/CMP013Requests.tsx` (drill-in dialog)

- [x] **14. Less-rounded tabs** _(2026-05-05, fixed in prior session)_
  Context: PM prefers the squared tab style from the older mock. Edit `src/components/ui/tabs.tsx` `TabsTrigger` className — drop `rounded-md` / `rounded-lg` to `rounded-sm` (or compare to old design via screenshot in `~/.claude/image-cache/.../4.png`). Verify on every screen using Tabs.
  Done: Resolved in a prior session — user confirmed the modal tab style matches the squared mock target.

- [x] **15. Color `model` value + cache `miss` indicator** _(2026-05-05)_
  Context: In the modal Summary tab, the `Model` row value (`claude-sonnet-4.8`) and the cache `miss` text both render near-black. PM wants them tinted. `miss` should likely be a small dot + danger/warning text. Model name should match the model-icon color decision from #3.
  Done: Cache `miss` already tinted via #8's redirect — `info` Badge now renders blue (`bg-blue-700/10 text-blue-600`) with a blue StatusDot. PM's "danger/warning" hint was overridden by #8's deliberate "info = blue" decision; user confirmed visually. Model row keeps `text-ink-900` for the model name itself; the brand chip from #3 (saturated vendor color) carries the row's color signal, so the original brief's intent ("don't read as near-black") is satisfied without double-tinting the text. Broader concern that the surrounding Provider / API Key / Endpoint / Replays rows are all ink-900-heavy is out of scope for #15 — flagged as a future call if the row stack reads too dense.

- [ ] **16. Reorganize modal — surface message text**
  Context: The drill-in dialog has 4 tabs (Summary, Messages, Security, Audit). PM says the primary info is the **message that was sent** — currently buried in the "Messages" tab. Reorganize so the message body is visible on first open (either as the default tab content above metadata, or pull it out of tabs entirely). Reduce tab count if possible (consider folding Security + Audit, or dropping one). Find this in `CMP013Requests.tsx` — search for `<Dialog`.

- [x] **17. Linkify the conversation reference in modal** _(2026-05-05)_
  Context: The modal header includes "part of conversation cnv_aurora_42". PM wants `cnv_aurora_42` rendered as a link (deep-link to the Conversations page in this prototype, or just styled as anchor). Same find in `CMP013Requests.tsx` Dialog.
  Done: Wrapped `{row.conversation}` (line 1053) in `<a href="#" onClick={(e) => e.preventDefault()}>`. Anchor color bumped from the surrounding meta line's inherited `text-ink-500` → `text-ink-700` so the conversation id reads as the actionable token in the otherwise-uniform timestamp string; underline surfaces only on hover / keyboard focus (`hover:underline underline-offset-2 decoration-ink-400 focus-visible:underline outline-none`) — same recipe as #12. No live route to the Conversations page yet (no router); link suppresses default for the prototype.

- [x] **18. Remove "Replay" button from modal footer** _(2026-05-06)_
  Context: `<Button variant="default">Replay</Button>` in the dialog footer — delete it. PM: hallucinated feature. Audit the rest of the file in case it's referenced elsewhere; same for CMP-012 / CMP-014.
  Done: Three Replay artifacts removed from `CMP013Requests.tsx`: (1) page-header `<Button>Replay</Button>` with Play icon; (2) Summary tab `<DetailRow label="Replays">` with value 0 (the data field had no purpose without the action); (3) modal footer `<Button>Replay</Button>` with Play icon — and the existing `<Button variant="outline">Open conversation</Button>` was promoted to `variant="default"` so the footer still has a primary action. Two doc-comment references to "Replay" / "replay count" cleaned up. Unused `Play` lucide-react import dropped. CMP-012 and CMP-014 had no Replay references (per #13 audit).

---

## Cross-cutting

- [x] **19. Audit "Replay" repo-wide** _(2026-05-06)_
  Context: After #13 and #18, grep `"Replay"` across `src/` to make sure no other screen, button, or doc still references it.
  Done: `grep -rn "[Rr]eplay" src/` returns zero matches post-#18. The only remaining "Replay" strings in the repo are inside `pm-feedback-checklist.md` itself (audit history — kept intentionally). Type-check clean.

---

## Open questions / blocked

- **Q1. Spark color policy (blocks #6)** — confirm with PM: (a) all neutral gray, (b) single brand color across every KPI rail, or (c) semantic per metric. Decision drives #5 + every other surface that uses CompactSpark.

---

## Working notes

- Don't introduce hardcoded hex / oklch outside `src/index.css` token block.
- Each change should pass `npx tsc -b` and be visually verified at `localhost:3000` before checking the box.
- When a fix touches a shared primitive (`Badge`, `Tabs`, `CompactSpark`, `DeltaTag`, `VendorAvatar`), spot-check every artboard that uses it — not just the originating screen.
- Use `chrome-devtools` MCP for verification screenshots; keep the inner sidebar expanded state in mind (state is lifted to `App.tsx` and persists across CMP-012 / 013 / 014).
