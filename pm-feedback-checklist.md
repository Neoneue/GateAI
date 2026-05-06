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
  Done: `tone="neutral"` in `vendor-meta.tsx` is now icon-only — chip background dropped (no `bg-*`, no `rounded-*`); the `size-5` flex slot stays as a column-alignment anchor. Icon bumped from `size-3` (12px) → `size-4` (16px) and tinted `text-ink-800` so the glyph carries the row at quiet but legible weight. `tone="brand"` (KPI cards, modal headers, top-key lists) intentionally untouched — brand colors still apply there.

- [x] **4. Lighten Tokens / Cost column text** (and Out / In on Requests) _(2026-05-05)_
  Context: Numerics in the conversation table currently use `text-ink-900`. PM says too dark/black. Drop to `text-ink-700` (or `text-ink-600`) for non-emphasized numerics; keep currency anchors readable. Apply consistently across `CMP013Requests.tsx` and `CMP014Conversations.tsx`.
  Done: numeric `TableCell`s in CMP-012 / CMP-013 / CMP-014 dropped from `text-ink-900` → `text-ink-800` (one step lighter; ink-700 felt too washed). Also lifted the `TableHead` default in `src/components/ui/table.tsx` from `text-ink-600` → `text-ink-500` so column titles sit a step quieter than body values — this fixes a hierarchy issue where headers were reading at body weight. Latency stays ink-800 default + warning-2 for slow rows; cost retained ink-800 weight (didn't split into a stronger anchor — left as a future polish if hierarchy needs it).

- [ ] **5. Make the KPI sparklines oscillate**
  Context: KPI rail in CMP-014 (`KpiRail` function, ~line 478) feeds CompactSpark monotonically increasing arrays (e.g. `[180,192,200,...,247]`). PM wants traffic-style oscillation since these are activity counters, not cumulative totals. Replace each `data` array with up/down series of similar magnitude. Same likely needed on CMP-012 / CMP-013 KPI rails.

- [ ] **6. Decide and apply sparkline color policy** (BLOCKING — see Open Questions)
  Context: Each `CompactKpi` currently passes a different `colorVar` (ink-400, warning-2, success-2, blue-500). PM is uneasy because in real production these tend to flatten to gray. Options: (a) all neutral, (b) all single brand color, (c) tied to metric semantics. Resolve before implementing #5.

- [ ] **7. Remove the KPI delta pill chips**
  Context: `DeltaTag` (`src/components/ui/compact-kpi.tsx`) wraps the up/down number in `bg-destructive/15` / `bg-success/15` rounded-full pill. PM doesn't like the pill chip. Replace with bare directional arrow + value (still color-coded by sign) but no pill wash + no full-radius. Used by every KPI rail across CMP-008b / 012 / 013 / 014.

- [ ] **8. Color the `completed` badge**
  Context: Conversations table's `completed` row uses `variant="info"` (currently neutral/black-ish). Active is green, failed is red — completed needs its own color so it doesn't read as the unstyled fallback. Suggest muted purple, ink-blue, or a desaturated success step. Update the `STATUS_BADGE` map in `CMP014Conversations.tsx` (~line 549).

- [ ] **9. Replace toolbar "More" button**
  Context: The conversation table toolbar (~line 588) ends with `<Button variant="outline">More</Button>` which has no clear job. PM wants it gone or recast as a Filter affordance. Easiest is delete; if converting to filter, mirror the existing `Select` triggers (User / Key) in shape.

- [ ] **10. Slim the Models column data**
  Context: `CONVERSATION_ROWS` (~line 568) currently lists 2–3 vendors per row. PM wants most rows to show a single model with only 1–2 example rows showing 2–3 stacked. Edit the seed data so the visual default is "one model per call".

- [ ] **11. Remove "New session" button**
  Context: `PageHeader` in CMP-014 (~line 448) renders `<Button variant="default">New session</Button>`. Delete the button and the surrounding flex slot if it becomes empty (the `<Download> Export` outline button stays).

- [ ] **12. Linkify the conversation title**
  Context: Conversation column cell renders the title as plain `<span>`. PM says it should be a link (since it's the row's primary action). Wrap the title in an `<a>` (or styled `<button>`) with hover underline. Mind the existing row-click drill-in — the link should not duplicate that affordance.

- [ ] **13. Drop the "Replay" button — Conversations**
  Context: Search the file for "Replay" — if any drill-in modal or row affordance includes it, remove. PM says it was a hallucinated feature.

---

## Request modal — `src/artboards/CMP013Requests.tsx` (drill-in dialog)

- [ ] **14. Less-rounded tabs**
  Context: PM prefers the squared tab style from the older mock. Edit `src/components/ui/tabs.tsx` `TabsTrigger` className — drop `rounded-md` / `rounded-lg` to `rounded-sm` (or compare to old design via screenshot in `~/.claude/image-cache/.../4.png`). Verify on every screen using Tabs.

- [ ] **15. Color `model` value + cache `miss` indicator**
  Context: In the modal Summary tab, the `Model` row value (`claude-sonnet-4.8`) and the cache `miss` text both render near-black. PM wants them tinted. `miss` should likely be a small dot + danger/warning text. Model name should match the model-icon color decision from #3.

- [ ] **16. Reorganize modal — surface message text**
  Context: The drill-in dialog has 4 tabs (Summary, Messages, Security, Audit). PM says the primary info is the **message that was sent** — currently buried in the "Messages" tab. Reorganize so the message body is visible on first open (either as the default tab content above metadata, or pull it out of tabs entirely). Reduce tab count if possible (consider folding Security + Audit, or dropping one). Find this in `CMP013Requests.tsx` — search for `<Dialog`.

- [ ] **17. Linkify the conversation reference in modal**
  Context: The modal header includes "part of conversation cnv_aurora_42". PM wants `cnv_aurora_42` rendered as a link (deep-link to the Conversations page in this prototype, or just styled as anchor). Same find in `CMP013Requests.tsx` Dialog.

- [ ] **18. Remove "Replay" button from modal footer**
  Context: `<Button variant="default">Replay</Button>` in the dialog footer — delete it. PM: hallucinated feature. Audit the rest of the file in case it's referenced elsewhere; same for CMP-012 / CMP-014.

---

## Cross-cutting

- [ ] **19. Audit "Replay" repo-wide**
  Context: After #13 and #18, grep `"Replay"` across `src/` to make sure no other screen, button, or doc still references it.

---

## Open questions / blocked

- **Q1. Spark color policy (blocks #6)** — confirm with PM: (a) all neutral gray, (b) single brand color across every KPI rail, or (c) semantic per metric. Decision drives #5 + every other surface that uses CompactSpark.

---

## Working notes

- Don't introduce hardcoded hex / oklch outside `src/index.css` token block.
- Each change should pass `npx tsc -b` and be visually verified at `localhost:3000` before checking the box.
- When a fix touches a shared primitive (`Badge`, `Tabs`, `CompactSpark`, `DeltaTag`, `VendorAvatar`), spot-check every artboard that uses it — not just the originating screen.
- Use `chrome-devtools` MCP for verification screenshots; keep the inner sidebar expanded state in mind (state is lifted to `App.tsx` and persists across CMP-012 / 013 / 014).
