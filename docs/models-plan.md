# Models page (CMP-016) — comprehensive PRD

Self-contained handoff document. A fresh session reading this should be able to start building immediately without re-asking the user any open questions.

---

## 0. TL;DR

Build a **Models** artboard at `src/artboards/CMP016Models.tsx` that lets a Constellation Gate AI customer browse all models routable through the gateway, see which providers serve each model, see capabilities + pricing + context length, and drill in for a detail view (description + per-provider price table + code sample). Wire it into `src/App.tsx` as page `cmp-016` and link the existing `models` nav entry in `src/artboards/_shared/nav-sections.ts`. No left filter sidebar. No status column. Multi-provider per model. Capabilities required.

The page mirrors the layout/typography/material conventions of the existing composed surfaces (CMP-012, CMP-013, CMP-014, CMP-015). It is **not** a port of any single competitor — it synthesizes the best parts of OpenRouter, Helicone, and Vercel AI Gateway.

---

## 1. Context

### 1.1 Project

- Constellation Gate AI (codename **Chad**) — an AI gateway product that sits in front of LLMs and routes traffic.
- Repo: `/Users/cponticas/Documents/GitHub/mvp`
- Stack: Vite 8 + React 19 + TypeScript 6 + Tailwind v4 (`@theme` block in `src/index.css`) + shadcn/ui (style `base-nova`) + Base UI primitives + Recharts + Sonner + lucide-react. Fonts: Geist + Geist Mono.
- The repo is a **design-system showcase** translated section-by-section from a Paper file. Each `§ CMP-###` block in Paper becomes one React "artboard" page. App shell is fixed left nav + scrollable main pane swapping artboards via `useState` in `src/App.tsx` (no router).
- Page registration: `PAGES[]` in `src/App.tsx` + extending the `PageId` union + `pageId` field on a nav item in `src/artboards/_shared/nav-sections.ts`.

### 1.2 Why a Models page exists in this product

**The page is operational, not a public catalog.** The Constellation Gate AI customer is configuring routing — "which models is my app calling, what are they capable of, who serves them, how much do they cost, which one should I use." It is **not** a marketplace where users discover unfamiliar models to try.

This reframe drives every design decision below. Don't add KPI rails (that's analytics). Don't add a "popularity" badge (that's a marketplace cue). Do show pricing per provider and capabilities clearly.

### 1.3 Required reading before coding

These are NOT auto-loaded. Read them via the Read tool at session start:

1. `front-end-developer/agent/front-end-developer.md` — controlling design methodology
2. `docs/brand-guidelines.md` — brand decisions in code
3. `data-model.md` (project root) — architecture map, app shell, artboard pattern, token contract
4. The most recent session memory logs in `~/.claude/projects/-Users-cponticas-Documents-GitHub-mvp/memory/` (start with `MEMORY.md` for the index)
5. **`CLAUDE.md` is auto-loaded** — locked policies live there

### 1.4 Existing primitives to reuse (do NOT rebuild)

| Primitive | File | Use for |
|---|---|---|
| `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`, `CardAction` | `src/components/ui/card.tsx` | Surface scaffolding |
| `Button` | `src/components/ui/button.tsx` | All buttons; use `data-icon="inline-start"` for leading icons |
| `Badge` (with `font-mono tabular-nums` default) | `src/components/ui/badge.tsx` | Capability chips, count chips on tabs |
| `Input` | `src/components/ui/input.tsx` | Search input |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` | `src/components/ui/select.tsx` | Filter pills (use `size="sm"`, no leading icons — locked rule) |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `src/components/ui/tabs.tsx` | Modality tabs (use `variant="line"` for the underline pattern) and Code-sample tabs |
| `Table`, `TableHeader`, `TableHead`, `TableBody`, `TableRow`, `TableCell` | `src/components/ui/table.tsx` | The models table |
| `TablePaginationFooter` | `src/components/ui/table-pagination-footer.tsx` | Locked primitive — pagination footer |
| `Dialog`, `DialogContent`, `DialogTitle` | `src/components/ui/dialog.tsx` | Detail modal (NOT Sheet — CMP-013 was migrated this session) |
| `CompactKpi`, `CompactSpark`, `DeltaTag` | `src/components/ui/compact-kpi.tsx` | KPI tiles inside the detail modal |
| `HeroNumeric` | `src/components/ui/hero-numeric.tsx` | Hero summary numerics ≥24px (sans tabular) |
| `Sparkline` | `src/components/ui/sparkline.tsx` | In-row sparklines if added (smooth opt-in for jagged data) |
| `StatusDot` | `src/components/ui/status-dot.tsx` | Inside Badge as leading dot |
| `VendorAvatar` (auto-emits sr-only label; `decorative` opts out) | `src/components/icons/vendor-meta.tsx` | Vendor identity in rows + modal hero |
| `MessageBlock` | `src/components/ui/message-block.tsx` | Not needed here, but exists |
| `ArtboardHeader`, `SectionHeader` | `src/artboards/_shared/ArtboardHeader.tsx` | Spec-sheet chrome around the artboard |
| `DashboardChrome` | `src/artboards/_shared/DashboardChrome.tsx` | Production frame (sidebar + breadcrumb wrapper) |
| `SIDEBAR_SECTIONS` | `src/artboards/_shared/nav-sections.ts` | Sidebar config — wire `models` nav id to `pageId: 'cmp-016'` |

`VENDOR_META` exports the 8 vendor brand colors + icons + labels. Vendors: `anthropic`, `openai`, `google`, `meta`, `mistral`, `xai`, `deepseek`, `cohere`. Use `VendorAvatar` (bare brand-colored icon, size-4) — locked treatment, do not wrap in a chip.

---

## 2. Locked policies (CLAUDE.md) that MUST hold

Quick excerpt — full list in `CLAUDE.md`. These cannot drift:

- **5-ramp OKLCH color system** (ink, blue, success, warning, danger). No raw hex outside `vendor-meta.tsx` brand colors. Use Tailwind utilities (`bg-ink-200`, `text-warning-700`).
- **Two-tier material ladder**: 6px (`rounded-sm`) for everyday surfaces; 12px (`rounded-xl` overridden in `@theme`) for modals; 4px (`rounded-xs`) for sub-elements inside tracks. Item radius < container radius (concentric).
- **Fonts**: Geist Sans (human voice — titles, body, button labels) + Geist Mono (machine voice — codes, IDs, data-tier numerics, eyebrow labels). No third font.
- **Tailwind type scale only** — `text-3xl`/`text-4xl`/`text-6xl` overridden in `@theme` to Geist values 32/40/64.
- **Heading hierarchy on artboards**: ArtboardHeader emits the outer h1; in-surface page title is `<h2>` `text-3xl/9 -tracking-[1px] font-medium`; section/card title is `<h3>` ~16-20px.
- **PageHeader pattern**: `flex items-start justify-between gap-6` (NOT `items-end` — fixed this session). Title block has `max-w-1/2`. CTAs aligned at title baseline, not subtitle.
- **Three-tier table ink-density policy**: body cells use `text-ink-500` (context), `text-ink-800` (data), `text-ink-900` (row primary identifier). Plus `text-ink-400` for missing-data dashes. **No 600/700 middle tones.**
- **Numeric column right-alignment**: `text-right` on `<TableHead>` AND `<TableCell>`. Numerics are `font-mono tabular-nums`.
- **`<Badge>` defaults to `font-mono tabular-nums`** — don't strip it.
- **No leading category icons on filter-pill `<SelectTrigger size="sm">`** in dense toolbars. Chevron only. Locked 2026-05-07.
- **Link affordance** = ink + permanent faint underline (`underline decoration-ink-200 underline-offset-2 hover:decoration-ink-500 focus-visible:decoration-ink-500 outline-none`). **No blue links.** Blue is reserved for info/completed/active-tab/focus.
- **Pagination renders `<button>`, not `<a>`** — already patched in `PaginationLink` primitive. Use `TablePaginationFooter`.
- **Whole table row is the click target** for drill-in (`role="button"`, `tabIndex={0}`, `aria-label`, `onClick`, `onKeyDown` for Enter/Space). Title is just truncated text with `title={...}` attribute — NOT a link.
- **VendorAvatar self-labels** for screen readers. Use `decorative` prop only when the surrounding chrome already aggregates a label (rare).
- **HeroNumeric primitive** is the canonical sans-hero numeric (≥24px). `default` = 24px, `lg` = 32px. Recipe: `font-sans font-medium tabular-nums tracking-tight text-ink-900`. Don't hand-roll.
- **`SelectTrigger` asymmetric padding rule**: `pl-N pr-(N-1)` across all sizes — don't symmetrize.
- **No `transition-all`** — name properties explicitly. Always include `motion-reduce:transition-none`.
- **No comments explaining WHAT** — only WHY-comments when non-obvious. Don't write multi-paragraph docstrings or multi-line comment blocks (one short line max).
- **No new motion-library deps**. CSS-only animations. If `framer-motion`/`motion` aren't already in `package.json`, use cross-fade fallback.
- **Chart palette decoupled from brand**: chart series colors come from `--color-chart-1..8` by index. Brand-mnemonic slot overrides exist (`Anthropic→2`, `OpenAI→1`) for surfaces where the entity has prior color associations. Default to positional. CTO confirmed brand-coupling charts is NOT required.
- **Sparkline tones use chart palette only** (chart-5 critical, chart-2 elevated, ink-500 normal, chart-1 default). No semantic ramps inside sparkline branches — fixed this session.

---

## 3. Functional requirements (from user spec, 2026-05-08)

Direct asks from the user during the discovery conversation:

1. **Need full design** — build the whole page polished, not a stub.
2. **Models need a detail view** — drill-in modal with content (description, per-provider prices, code sample). Inspiration: OpenRouter detail content.
3. **Need provider filter** — toolbar SelectTrigger filtering by which provider hosts the model.
4. **Models should be shown to be at multiple providers if they are** — Claude Sonnet 4.5 is on Anthropic + Bedrock + Vertex; surface all of them.
5. **No status column** — all models are "available." Drop the active/paused/deprecated concept.
6. **Need to show capabilities** — required column with capability icons.
7. **No second sidebar** — the existing `DashboardChrome` outer sidebar is enough. Don't add a left filter accordion.
8. **A way to sort through all the models available** — search + filter + sort in a top toolbar.

---

## 4. Competitor synthesis (cumulative read across OpenRouter, Helicone, Vercel)

### 4.1 What each competitor does

**OpenRouter** (`openrouter.ai/models`):
- Modality tabs at top with counts: Text 366 / Image 20 / Embeddings 25 / Audio 5 / Video 13 / Rerank 9 / Speech 8 / Transcription 6
- Card list (full-width rows). Per-row: vendor avatar + model name + 1-line blurb + `by [vendor] · context · $in/$out` + total tokens used (volume metric on the right).
- Top toolbar: search, Compare, Newest sort, view-mode toggle.
- Detail page: description, providers list with per-provider prices.

**Helicone** (`helicone.ai/models/...`):
- List page: **left filter sidebar** (Providers / Price Range slider / Context Size slider / Special Capabilities / Input Modalities). Card list (Pinned/Credits badges).
- Detail page: hero with `vendor: Model Name` + handle chip + key stats (Context, Max Output, Input, Output) inline. Description. Input/Output modality chips. **Providers section** with per-provider expandable rows showing Context / Max Output / Input / Output / Cache Read / Cache Write. **Quick Start** section with TypeScript / Python / cURL tabbed code blocks. "Get API Key" button.

**Vercel AI Gateway** (`vercel.com/ai-gateway`):
- List page: search at top. Modality tabs: All / Text / Code / Image / Video / Embed / Rerank + "All Providers" dropdown. Sort by Release Date, Columns control. **Dense table** (handle with avatar / Context / Latency / Throughput / Input / Output / Cache (Read/Write) / Web Search / Per Query / Capabilities / Providers avatar stack).
- Detail page: breadcrumb (Models / Vendor / Model). Hero with title + handle copy + View Status button + a code snippet on the right. Description paragraph. Capability chips (Reasoning / Tool Use / Implicit Caching / File Input / Vision / Web Search). **Playground** section. **Providers** section (per-provider row with Legal/Terms/Privacy small links). **Metrics** section: Throughput / Latency tabs + multi-line chart over time + 1W/1D toggle. **Uptime** stacked colored-bars per provider with 1W/1D/1H toggle. **More models by [vendor]** related-models table.

### 4.2 Pattern overlap matrix

| Pattern | OpenRouter | Helicone | Vercel | Adopt? |
|---|---|---|---|---|
| Filter sidebar | ✗ | ✓ | ✗ | **Skip** (user said no) |
| Modality tabs | ✓ | ✗ | ✓ | **Adopt** |
| Card vs table | Card | Card | **Table** | **Table** (matches our routing-config intent) |
| Search | ✓ | ✓ | ✓ | Adopt |
| Compare CTA | ✓ | ✓ | ✗ | Adopt (opinionated) |
| Sort dropdown | ✓ | ✓ | ✓ | Adopt |
| Multi-provider per model | inferred | explicit | avatar stack | **Required** |
| Capabilities icons | ✗ | ✗ | ✓ | **Required** |
| Cache pricing | ✗ | ✓ Read/Write | ✓ Read/Write | Add — table column or modal |
| Throughput/Latency in row | ✗ | ✗ | ✓ | Defer (requires perf telemetry) |
| Detail: code sample tabs | ✓ | ✓ | ✓ | **Adopt** |
| Detail: providers table | ✓ | ✓ | ✓ | **Required** |
| Detail: throughput/latency line chart | ✓ | ✗ | ✓ | **Defer** (needs multi-series line primitive — separate task) |
| Detail: uptime bar | ✗ | ✗ | ✓ | Defer (low priority) |
| Detail: "More models by vendor" | ✗ | ✗ | ✓ | Defer (cross-sell, low priority) |

### 4.3 Verdicts on each area

- **List page density**: Vercel wins. Dense table reads as professional ops tool.
- **Filter scaffolding**: OpenRouter wins. Modality tabs + 2-3 dropdowns is enough; Helicone's left sidebar is overkill.
- **Detail page completeness**: Vercel wins. Description + capability chips + providers + metrics is the full operational story.
- **Code sample affordance**: Helicone wins. Three-language tabs (TS/Python/cURL) is the right shape.

---

## 5. Final architecture (CMP-016)

### 5.1 Page outline

```
┌─ ArtboardHeader (spec-sheet chrome — code, title, description, parts) ─┐
│ Section: CMP-016.1 — MODELS SURFACE                                     │
│                                                                          │
│ DashboardChrome (production frame — sidebar + breadcrumb + content)     │
│   PageHeader        — h2 + subtitle + [Compare] [Add provider]          │
│   ModalityTabs      — All / Text / Embeddings / Audio / Rerank          │
│   Toolbar           — Search · Vendor · Provider · Sort                  │
│   ModelsTable       — 7 columns + click-row drill-in                     │
│   PaginationFooter  — TablePaginationFooter primitive                    │
│   Footer hint       — "Pass {handle} to use the preferred provider..."   │
│                                                                          │
│ ModelDetailDialog   — opens on row click (Dialog modal)                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 5.2 PageHeader

- Wrapper: `flex items-start justify-between gap-6` (locked rule — title baseline).
- Title block: `flex flex-col gap-2 max-w-1/2`
  - `<h2 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">Models</h2>`
  - `<p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">Browse and route to {N} models across {M} providers.</p>`
- Actions block: `flex items-center gap-3 shrink-0`
  - `<Button variant="outline" size="default">Compare</Button>` — leading icon: lucide `GitCompareArrows` with `data-icon="inline-start"`
  - `<Button variant="default" size="default">Add provider</Button>` — leading icon: lucide `Plus`

Drop "New policy" / "Export report" — wrong page for those.

### 5.3 ModalityTabs

- Use `Tabs` primitive with `variant="line"` (the existing underline-pattern variant).
- Five triggers: `All` · `Text` · `Embeddings` · `Audio` · `Rerank`.
- Each trigger: label + count `<Badge variant="neutral" size="sm">{count}</Badge>` (use the neutral variant — ink-100/ink-700).
- Wired to local state: `const [modality, setModality] = useState<Modality | 'all'>('all')`.
- Filtering the table is real — not a deferred mock. Filter `MODELS` by `m.modality === modality` (or pass-through if 'all').

If we don't have Image/Video/Code/Speech/Transcription models, **omit those tabs**. Tabs need to do real work; an empty `Image 0` tab is noise. Start with what we have.

### 5.4 Toolbar

- Wrapper: `flex items-center gap-2`
- Left: `<Input>` with leading magnifier icon, `placeholder="Search by name or handle..."`, `name="model-search"`, `autoComplete="off"`, `spellCheck={false}`, `type="search"`, `aria-label="Search models"`.
- Middle: two `<Select>`s with `<SelectTrigger size="sm" aria-label="Vendor filter">`, no leading icons (locked rule):
  - **Vendor** — All vendors / Anthropic / OpenAI / Google / Meta / Mistral / xAI / DeepSeek / Cohere
  - **Provider** — All providers / Anthropic Direct / OpenAI Direct / Google Direct / AWS Bedrock / Azure OpenAI / Google Vertex / Together AI / Fireworks / Groq / Cohere Direct / Mistral Direct / Meta Direct / xAI Direct / DeepSeek Direct
- Right (`ml-auto`): `<Select>` `<SelectTrigger size="sm" aria-label="Sort">`:
  - Sort: Newest / Most popular / Cheapest input / Largest context

State: only modality is wired to actual filtering. Search/vendor/provider/sort are visual-only (deferred wiring matches CMP-013/014 pattern). Document this in a code comment.

### 5.5 ModelsTable

Columns at 1440px wrapper width:

| # | Column | Width | Type | Notes |
|---|---|---|---|---|
| 1 | **Model** | grow | sans + VendorAvatar | `<VendorAvatar />` (size-4) + `<span className="font-sans text-sm text-ink-900 truncate">{model.name}</span>` |
| 2 | **Use in code** | auto | mono code-style | `<code className="font-mono text-xs text-ink-800 bg-ink-100 rounded-xs px-1.5 py-0.5 -tracking-[0.14px]">{handle}</code>` |
| 3 | **Context** | right | mono numeric | `text-right whitespace-nowrap font-mono tabular-nums text-sm text-ink-800` — render as `200K` / `1M` / `8K` |
| 4 | **Input** | right | mono numeric | `text-right whitespace-nowrap font-mono tabular-nums text-sm text-ink-800` — `$3.00/M` |
| 5 | **Output** | right | mono numeric | Same — `$15.00/M` |
| 6 | **Capabilities** | auto | icon strip | `<div className="flex items-center gap-1.5">{capabilities.map(c => <CapabilityIcon kind={c} />)}</div>` |
| 7 | **Providers** | auto | avatar stack | First 3 `<VendorAvatar decorative />` overlapping (`-ml-1` after the first) + `<span className="font-mono text-xs text-ink-500">+{n}</span>` if more |

No status column (per spec). No actions column (whole row is the click target).

`TableHead` text uses CMP-013/014 conventions: `font-mono uppercase tracking-[0.1em] font-medium text-ink-500 text-xs`. Right-aligned numeric heads get `text-right whitespace-nowrap`.

`TableRow` per row:
```tsx
<TableRow
  key={model.id}
  role="button"
  tabIndex={0}
  aria-label={`Inspect ${model.name}`}
  onClick={() => setSelectedModel(model)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedModel(model);
    }
  }}
  className="cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-ink-50 focus-visible:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
>
```

Pagination via `TablePaginationFooter` — 10 rows per page default.

Footer hint below the table (small mono text, `text-ink-500`):
> Pass `claude-haiku-4-5` to use the preferred provider, or `bedrock/claude-haiku-4-5` to pin a specific one.
Inline-code styling on the example identifiers: `font-mono bg-ink-100 rounded-xs px-1`.

### 5.6 ModelDetailDialog (drill-in modal)

Mirror CMP-014's `ConversationDetailDialog` pattern. Wrapper:

```tsx
<Dialog open={!!model} onOpenChange={(open) => { if (!open) setSelectedModel(null); }}>
  <DialogContent className="sm:max-w-3xl max-h-[90vh] gap-0 p-0 overflow-hidden flex flex-col">
    {model ? <ModelDetailBody model={model} /> : null}
  </DialogContent>
</Dialog>
```

Body sections (top → bottom):

**1. Header** (`px-5 pt-5`):
- Eyebrow: `<span className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">MODEL</span>`
- DialogTitle: `<DialogTitle className="font-sans text-lg/6 font-medium text-ink-900 m-0 pr-12">{vendor.label}: {model.name}</DialogTitle>` (the `pr-12` clears the absolute Close button)
- Identity row: VendorAvatar + handle chip (mono inline-code style) with a Copy icon button + capability chips (`Eye` Vision / `Wrench` Tool Use / `Braces` JSON / `Zap` Streaming / `Database` Cache / `Globe` Web Search — each as `<Badge variant="neutral" size="sm">` with the icon as `data-icon="inline-start"`).

**2. Description** (`px-5 pt-3`):
- 1-2 sentences. `<p className="font-sans text-sm text-ink-800 text-pretty m-0">{model.description}</p>`

**3. KPI strip** (`px-5 pt-4`):
- 4 tiles via `CompactKpi` (or a local `ModelDetailKpiTile` if we want a thinner variant):
  - Context · Max Output · Input price · Output price
- Same divider pattern as CMP-014's KpiRail (`grid grid-cols-4 rounded-sm shadow-(--shadow-border)` with `before:` pseudo-element hairlines between tiles).
- Numerics use `<HeroNumeric>` `default` size (24px sans tabular).

**4. Providers section** (scrollable, `flex-1 min-h-0 overflow-y-auto px-5 pt-4`):
- Eyebrow: `<h3 className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500 m-0">Providers</h3>`
- Table inside the modal:
  - Columns: Provider · Context · Latency (P50) · Throughput · Input · Output · Cache Read · Cache Write
  - Provider cell: provider label + tiny `Legal · Terms · Privacy` links beneath in `text-ink-400` (Vercel pattern). Use ink+underline link affordance.
  - Each row fully populated from the offering data. Missing values render as `<span className="text-ink-400">—</span>`.
- Use existing `Table` primitive. Container: `rounded-sm border border-ink-200 overflow-hidden`.

**5. Code sample** (`px-5 pt-4`):
- Eyebrow: `Quick start`
- `<Tabs value={lang} onValueChange={setLang}>` with three triggers: TypeScript / Python / cURL.
- Code block: `<pre className="font-mono text-xs text-ink-100 bg-ink-900 rounded-sm p-3 overflow-x-auto"><code>{snippet}</code></pre>`
- Snippets are static templates with the model handle interpolated. See §6.4 for templates.

**6. Footer** (`flex items-center justify-end gap-2 px-5 py-3 border-t border-ink-200`):
- `<Button variant="outline" size="sm">` Copy default handle (lucide `Copy` icon)
- `<Button variant="default" size="sm">` Set as default

Skip for now: Playground · Throughput/Latency multi-line chart · Uptime · "More models by vendor" — these are deferred (see §9).

---

## 6. Mock data spec

### 6.1 Type model

```ts
import type { Vendor } from '@/components/icons/vendor-meta';

type Modality = 'text' | 'embeddings' | 'audio' | 'rerank';

type Capability =
  | 'vision'      // accepts image input
  | 'tools'       // function calling / tool use
  | 'json'        // JSON mode / structured output
  | 'streaming'   // streaming responses
  | 'cache'       // prompt caching
  | 'webSearch';  // web search tool

// "Provider" = who serves the model. A vendor is also a provider when they sell direct.
// Marketplace providers (Bedrock, Vertex, Azure, Together, Fireworks, Groq) don't have VENDOR_META entries.
type ProviderId =
  | 'anthropic' | 'openai' | 'google' | 'meta' | 'mistral' | 'xai' | 'deepseek' | 'cohere'  // direct
  | 'bedrock' | 'azure' | 'vertex' | 'together' | 'fireworks' | 'groq';                       // marketplace

type ProviderOffering = {
  provider: ProviderId;
  handle: string;            // e.g. "anthropic/claude-sonnet-4-5", "bedrock/claude-sonnet-4-5"
  contextK: number;          // 200 = 200K, 1000 = 1M
  maxOutputK: number;        // 8 = 8K
  latencyP50Ms?: number;
  throughputTps?: number;
  inputPricePerM: number;    // $ per 1M input tokens
  outputPricePerM: number;   // 0 if N/A (embeddings, rerank)
  cacheReadPerM?: number;
  cacheWritePerM?: number;
};

type Model = {
  id: string;                // stable key, kebab-case
  vendor: Vendor;            // who CREATED the model
  name: string;              // "Claude Sonnet 4.5"
  description: string;       // 1-2 sentences from vendor
  modality: Modality;
  capabilities: Capability[];
  defaultHandle: string;     // canonical handle for "Use in code" column
  offerings: ProviderOffering[];
};
```

### 6.2 Provider labels (no VENDOR_META entries for marketplace providers — render as text)

```ts
const PROVIDER_LABELS: Record<ProviderId, string> = {
  anthropic: 'Anthropic',
  openai:    'OpenAI',
  google:    'Google',
  meta:      'Meta',
  mistral:   'Mistral',
  xai:       'xAI',
  deepseek:  'DeepSeek',
  cohere:    'Cohere',
  bedrock:   'AWS Bedrock',
  azure:     'Azure OpenAI',
  vertex:    'Google Vertex',
  together:  'Together AI',
  fireworks: 'Fireworks AI',
  groq:      'Groq',
};
```

### 6.3 Capability metadata

```ts
import { Eye, Wrench, Braces, Zap, Database, Globe } from 'lucide-react';

const CAPABILITY_META: Record<Capability, { label: string; icon: ComponentType }> = {
  vision:    { label: 'Vision (image input)', icon: Eye },
  tools:     { label: 'Tool use',             icon: Wrench },
  json:      { label: 'JSON mode',            icon: Braces },
  streaming: { label: 'Streaming',            icon: Zap },
  cache:     { label: 'Prompt caching',       icon: Database },
  webSearch: { label: 'Web search',           icon: Globe },
};
```

In the table, render each as a 14×14 lucide icon with `aria-label={CAPABILITY_META[c].label}` and `text-ink-500`. In the modal hero, render as `<Badge variant="neutral" size="sm">` with leading icon + label text.

### 6.4 Code-sample templates

Three snippets keyed by language. Use the model's `defaultHandle` for `MODEL_HANDLE`.

**TypeScript** (matches Helicone's reference):
```ts
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://gateway.constellationgate.ai/v1',
  apiKey: process.env.CONSTELLATION_API_KEY,
});

const completion = await client.chat.completions.create({
  model: '${MODEL_HANDLE}',
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

**Python**:
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://gateway.constellationgate.ai/v1",
    api_key=os.environ["CONSTELLATION_API_KEY"],
)

completion = client.chat.completions.create(
    model="${MODEL_HANDLE}",
    messages=[{"role": "user", "content": "Hello!"}],
)
```

**cURL**:
```bash
curl https://gateway.constellationgate.ai/v1/chat/completions \
  -H "Authorization: Bearer $CONSTELLATION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "${MODEL_HANDLE}",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

For embeddings / audio / rerank modalities, the snippet should swap the endpoint (`/embeddings`, `/audio/transcriptions`, `/rerank`). For embeddings, the body uses `input` instead of `messages`. Implementer can ship text-only initially and expand if there's time.

### 6.5 Model catalog (~22 entries — covers all 8 vendors, 4 modalities)

Default scope. Implementer may extend. Pricing here is illustrative — match real pricing where known, fabricate plausibly otherwise.

**Text models with vision (mostly)** — 14 entries:

1. **Anthropic Claude Opus 4.7** — vendor `anthropic`, handle `anthropic/claude-opus-4-7`, context 200K, max output 16K, in $15/M, out $75/M. Capabilities: vision, tools, json, streaming, cache. Offerings: Anthropic Direct + AWS Bedrock + Google Vertex.
2. **Anthropic Claude Sonnet 4.5** — `anthropic/claude-sonnet-4-5`, 200K, 8K, $3/M, $15/M. vision/tools/json/streaming/cache. Anthropic + Bedrock + Vertex.
3. **Anthropic Claude Haiku 4.5** — `anthropic/claude-haiku-4-5`, 200K, 8K, $0.80/M, $4/M. vision/tools/json/streaming/cache. Anthropic + Bedrock + Vertex.
4. **OpenAI GPT-5** — `openai/gpt-5`, 256K, 16K, $5/M, $20/M. vision/tools/json/streaming/cache/webSearch. OpenAI + Azure.
5. **OpenAI GPT-4o** — `openai/gpt-4o`, 128K, 16K, $2.50/M, $10/M. vision/tools/json/streaming/cache. OpenAI + Azure.
6. **OpenAI GPT-4o-mini** — `openai/gpt-4o-mini`, 128K, 16K, $0.15/M, $0.60/M. vision/tools/json/streaming. OpenAI + Azure.
7. **Google Gemini 3 Pro** — `google/gemini-3-pro`, 1M (1000K), 8K, $1.25/M, $5/M. vision/tools/json/streaming/cache/webSearch. Google + Vertex.
8. **Google Gemini 3 Flash** — `google/gemini-3-flash`, 1M, 8K, $0.10/M, $0.40/M. vision/tools/json/streaming/cache. Google + Vertex.
9. **Google Gemini 3 Flash Lite** — `google/gemini-3-flash-lite`, 1M, 8K, $0.05/M, $0.20/M. vision/tools/streaming. Google + Vertex.
10. **Meta Llama 3.3 70B** — `meta/llama-3.3-70b`, 128K, 8K, $0.65/M, $2.65/M. tools/json/streaming. Bedrock + Together + Groq + Fireworks.
11. **Meta Llama 3.3 405B** — `meta/llama-3.3-405b`, 128K, 8K, $2/M, $6/M. tools/json/streaming. Bedrock + Together + Fireworks.
12. **Mistral Large** — `mistral/mistral-large`, 128K, 8K, $2/M, $6/M. tools/json/streaming. Mistral + Bedrock + Together.
13. **Mistral Medium** — `mistral/mistral-medium`, 128K, 8K, $0.40/M, $2/M. tools/json/streaming. Mistral.
14. **xAI Grok 2** — `xai/grok-2`, 128K, 8K, $2/M, $10/M. vision/tools/json/streaming. xAI Direct.
15. **DeepSeek R1** — `deepseek/deepseek-r1`, 64K, 8K, $0.55/M, $2.19/M. tools/json/streaming. DeepSeek + Together + Fireworks.
16. **Cohere Command R+** — `cohere/command-r-plus`, 128K, 4K, $2.50/M, $10/M. tools/json/streaming/webSearch. Cohere + Bedrock.
17. **Cohere Command R** — `cohere/command-r`, 128K, 4K, $0.50/M, $1.50/M. tools/json/streaming/webSearch. Cohere + Bedrock.

**Embeddings** — 4 entries:

18. **OpenAI text-embedding-3-large** — `openai/text-embedding-3-large`, 8K, in $0.13/M, out 0. (no capabilities). OpenAI + Azure.
19. **OpenAI text-embedding-3-small** — `openai/text-embedding-3-small`, 8K, in $0.02/M, out 0. OpenAI + Azure.
20. **Cohere Embed v3** — `cohere/embed-v3`, 0.5K (512), in $0.10/M, out 0. Cohere + Bedrock.
21. **Google Gemini Embedding** — `google/gemini-embedding`, 2K, in $0.025/M, out 0. Google + Vertex.

**Audio (transcription)** — 1 entry:

22. **OpenAI Whisper Large v3** — `openai/whisper-large-v3`, 0K (30-min audio), in $0.006/min, out 0. OpenAI + Azure. Capabilities: streaming.

**Rerank** — 1 entry:

23. **Cohere Rerank v3** — `cohere/rerank-v3`, in $2/1k searches, out 0. Cohere + Bedrock.

**Modality counts for tabs**: Text 17 / Embeddings 4 / Audio 1 / Rerank 1.

Implementer may simplify pricing (e.g. round to one decimal, drop cache prices on a few), but multi-provider offerings are required for top-tier text models — that's the whole point of the spec.

---

## 7. Build order

1. **Read required context** (§ 1.3). Read CLAUDE.md, brand-guidelines.md, data-model.md, MEMORY.md, plus the most recent session memories.
2. **Create `src/artboards/CMP016Models.tsx`** with the data model from §6 and a stub component that just renders `<ArtboardHeader>` + `<SectionHeader>` + `<DashboardChrome>` with placeholder children. Verify it compiles + renders.
3. **Wire into `src/App.tsx`**:
   - Add `'cmp-016'` to the `PageId` union.
   - Add lazy import: `const CMP016Models = lazy(() => import('@/artboards/CMP016Models').then(m => ({ default: m.CMP016Models })));`
   - Add to `PAGES[]`: `{ id: 'cmp-016', code: 'CMP-016', name: 'Models', Component: CMP016Models }`.
4. **Wire into `src/artboards/_shared/nav-sections.ts`**: change `{ id: 'models', icon: Box, label: 'Models' }` to `{ id: 'models', icon: Box, label: 'Models', pageId: 'cmp-016' }`.
5. **Build `PageHeader`** (§5.2). Verify visually at `http://localhost:3000` (port 3000 is the user's preference).
6. **Build `ModalityTabs`** (§5.3) wired to local state, with real filtering applied to the table data.
7. **Build `Toolbar`** (§5.4) — visual-only filters except modality.
8. **Build `ModelsTable`** (§5.5) with all 7 columns and real data.
9. **Wire `TablePaginationFooter`** at the bottom of the table.
10. **Build `ModelDetailDialog`** (§5.6) opening on row click. Includes hero + description + capability chips + KPI strip + providers table + code sample tabs + footer.
11. **Pre-ship review** — run the `make-interfaces-feel-better` skill at `front-end-developer/skills/make-interfaces-feel-better/SKILL.md` against the final artboard. Apply the 16-principle checklist.
12. **Type-check**: `npx tsc -b`. Expected: clean (the only allowed pre-existing error is the `baseUrl` deprecation warning in `tsconfig.app.json`).

---

## 8. Files to create / modify

| File | Action |
|---|---|
| `src/artboards/CMP016Models.tsx` | **Create** — main artboard file |
| `src/App.tsx` | **Modify** — add `'cmp-016'` to PageId union + lazy import + PAGES entry |
| `src/artboards/_shared/nav-sections.ts` | **Modify** — add `pageId: 'cmp-016'` to the `models` nav entry |
| `models-plan.md` (this file) | **Reference** — once shipped, can be deleted or moved to `docs/` |

No primitive mutations. If the implementer thinks a primitive needs to change, **flag it and stop** — don't ripple through `src/components/ui/` silently.

---

## 9. Deferred / out of scope

These were considered and explicitly deferred:

- **Throughput / Latency multi-line chart over time** in the detail modal — needs a multi-series line chart primitive in `src/components/ui/` first. Build that primitive separately (see "next moves" in CLAUDE.md or session memories — it was teed up as the unblocker for several future surfaces).
- **Uptime stacked horizontal bars** (Vercel pattern). Low priority, rare visualization.
- **"More models by [vendor]"** cross-sell table at the bottom of the detail modal. Not load-bearing for routing-config use case.
- **Playground** (Vercel pattern — try-it-now input in the detail). Out of scope for a design-system showcase.
- **Compare mode** (multi-select rows → side-by-side comparison page). The Compare CTA exists in the header but the comparison view itself is a follow-up artboard.
- **Real filter wiring** for search / vendor / provider / sort. Modality is the only filter wired to actual filtering (matches CMP-013/014 deferred-wiring pattern).
- **URL state sync** for filters / pagination. Deferred per session memory.
- **Internationalized number formatting**. Deferred per session memory (`2026-05-06-session-audit-fixes.md`).

---

## 10. Open questions — RESOLVED with implementer's defaults

These were the questions outstanding at the end of the discovery conversation. Defaults below are what the implementer should ship; user can push back on any of them in a follow-up:

1. **Detail modal scope** — ship hero + description + capability chips + KPI strip + providers table + code sample tabs + footer. Skip metrics chart + uptime + more-models. ✅ Resolved.
2. **Capabilities to support** — Vision · Tools · JSON · Streaming · Cache · Web Search (six). ✅ Resolved.
3. **Modality tabs** — All / Text / Embeddings / Audio / Rerank (skip Image / Video / Code / Speech / Transcription — empty tabs are noise). Add later if we add models in those modalities. ✅ Resolved.
4. **Total models in mock data** — 22 (per §6.5). ✅ Resolved.

---

## 11. Verification checklist

Before declaring done:

- [ ] `npx tsc -b` is clean (only `baseUrl` deprecation warning allowed).
- [ ] Page renders at `http://localhost:3000` when `models` is selected in the nav.
- [ ] Modality tabs filter the table correctly. Switching between All / Text / Embeddings / Audio / Rerank shows the right row count.
- [ ] Row click opens the detail modal. Modal closes on backdrop click / Escape / X / Close button.
- [ ] Modal contains: eyebrow + DialogTitle + handle chip + capability badges + description + 4-tile KPI strip + providers table + code sample tabs (TS/Python/cURL) + footer.
- [ ] Code sample switches language on tab change.
- [ ] All numerics in the table are right-aligned + mono tabular.
- [ ] All capability icons have `aria-label`.
- [ ] All decorative icons (chevrons, etc.) have `aria-hidden="true"` (string form, not boolean — matches CMP-015 audit fix).
- [ ] No `transition-all` anywhere. All transitions name explicit properties + include `motion-reduce:transition-none`.
- [ ] No raw hex colors. All colors trace to `--color-ink-*` / `--color-blue-*` / `--color-chart-*` / `--color-success-*` / `--color-warning-*` / `--color-danger-*` / `--destructive` / vendor brand colors via `VendorAvatar`.
- [ ] PageHeader uses `flex items-start justify-between gap-6` (NOT `items-end`).
- [ ] Title block has `max-w-1/2`.
- [ ] PaginationFooter uses the `TablePaginationFooter` primitive.
- [ ] Whole row is the click target with `role="button"` + tabIndex + `aria-label` + Enter/Space handler. Title is plain text with `title={...}`.
- [ ] No status column.
- [ ] Models with multiple providers show all of them in the Providers cell + the modal's providers table.

---

## 12. Reference: prior session decisions affecting this work

Captured in this session's conversation, summarized for the implementer:

- **PageHeader: `items-start` not `items-end`.** Buttons sit at title baseline. CMP-012/013/014/015 were all flipped this session.
- **Sheet → Dialog migration.** CMP-013's drill-in moved from Sheet to Dialog matching CMP-014's pattern. Use Dialog for CMP-016's drill-in.
- **VendorAvatar self-labels** for screen readers via auto-emitted sr-only span. Use `decorative` only when the surrounding chrome already aggregates a label (e.g. avatar stack in the Providers column where the cell-level intent is "list of providers" rather than "this specific vendor").
- **MessageBlock `aria-pressed` pass-through** — irrelevant for this page but available if needed.
- **Sheet dev-mode warn** — irrelevant for this page (using Dialog).
- **Sparkline tones use chart palette only** — `chart-5` (critical), `chart-2` (elevated), `ink-500` (normal), `chart-1` (default-up). No semantic ramps. Irrelevant for CMP-016 unless adding sparklines.
- **Chart palette decoupled from brand** by CTO direction. Brand-mnemonic slot overrides exist in CMP-012's RequestVolumeCard but are opt-in; default is positional.
- **Threat trend card removed from CMP-015** — gone, deferred. Models page is unrelated; just note that CMP-015's surface composition is shorter than its file header comment may suggest.
- **Conversation modal restructure** — title block reduced (no blockquote above stats), Audit Anchor button removed, status column removed from the conversations table. Pattern reference for a leaner modal hero.
- **CMP-013's audit tab simplified** — Anchor Proof section removed; only Guardrail Checks remains. Audit-tab footer still shows "Copy Proof / View on DE" buttons that no longer make sense — flagged for follow-up but not in scope here.

---

## 13. Where to look in code for reference patterns

- **PageHeader (current locked pattern)**: `src/artboards/CMP015Security.tsx` lines ~113-139.
- **KpiRail with divider hairlines**: `src/artboards/CMP015Security.tsx` lines ~143-208 (or `CMP012ComposedDashboard.tsx`).
- **Toolbar with search + filter pills**: `src/artboards/CMP013Requests.tsx` (search input + multiple `<SelectTrigger size="sm">` filters, no leading icons).
- **Sortable table with click-row drill-in**: `src/artboards/CMP015Security.tsx` ApiKeyRiskScoresCard table; or `CMP013Requests.tsx` requests table.
- **TablePaginationFooter usage**: `src/artboards/CMP013Requests.tsx` (search for `TablePaginationFooter`).
- **Dialog drill-in modal**: `src/artboards/CMP014Conversations.tsx` `ConversationDetailDialog` (lines ~417-528). Match the same shape.
- **Tabs `variant="line"` for modality tabs**: search the codebase for `variant="line"`. Used in code-sample tab strips elsewhere.
- **VendorAvatar usage in tables**: `CMP013Requests.tsx`, `CMP014Conversations.tsx`, `CMP010Charts.tsx`.

---

## 14. Tone for the implementer

This is craft work, not generic SaaS scaffolding. The user has been highly opinionated and direct throughout the discovery conversation — they push back on bad design decisions, they catch tone-drift in tables, they reject overcautious rules. Match that energy:

- Don't add KPI rails, Compare mode polish, or extra columns the spec didn't request.
- Don't symmetrize SelectTrigger padding to "clean it up."
- Don't introduce blue links because they "feel familiar."
- Don't write multi-paragraph comments. Don't write WHAT-comments at all.
- Trust the design system. Trust the locked policies. They're locked because each one was prosecuted in a prior session.

If something feels wrong, **flag it in your end-of-task report**, don't silently change it. The user will tell you if they want it changed.

---

## END

Build it. Verify with `npx tsc -b` + chrome-devtools screenshot at `http://localhost:3000`. Report changes per the standard front-end-developer report format. ~20-30 minutes of work for an Opus-class agent in a fresh session.
