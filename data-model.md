# Data Model — Constellation Gate AI Design System

> **Scope:** architecture map for this repo (`mvp` / *Constellation Gate AI* / GitHub `Neoneue/GateAI`). Six Mermaid diagrams: stack, app shell, artboard pattern, contract chain, primitive reuse graph, Paper-to-code flow. Update when the project's structure or contract chain changes.

> **Ship boundary:** `src/` is the product. `front-end-developer/` is a vendored design-methodology agent (gitignored) — it ships nothing into the build. `.claude/agents/front-end-developer.md` is the registered subagent that enforces design craft on dispatches.

---

## Mission

A design-system showcase translated section-by-section from a Paper file (*Brilliant quartz*, artboard `v8 Geist-rounded · Showcase`, 1536×12674px). Each `§ CMP-###` block in Paper becomes one React **artboard** page that demonstrates one or more reusable primitives. The build is the catalog *and* the live primitive library — every visible thing on every artboard must trace back to a primitive in `src/components/ui/` or `src/components/icons/`.

Single source of truth for: chart cards, metric cards, KPI tiles, sparklines, status pills, segmented controls, model provider chips, code cards, tables, dashboard composition. Each primitive lives once; artboards consume by import; the dashboard surface (CMP-012) imports from the same primitives the catalog artboards demonstrate.

### Three core principles

1. **Reuse before extract before invent.** If a primitive exists in `src/components/ui/`, use it. If a pattern recurs across 2+ surfaces, extract it. Inline reimplementation is the failure mode.
2. **Tokens, never hex.** Every color/spacing/radius/type choice traces to `src/index.css` `@theme` (or `vendor-meta.tsx` brand colors for external vendors). No raw hex, no orphan `oklch(...)` literals in artboard JSX. Type sizes only from Tailwind's named scale (`text-xs`/`sm`/`base`/…/`6xl`); never `text-[Npx]`.
3. **Composed surfaces are arrange-and-wire only.** CMP-012 (Composed Dashboard) ships zero new visual primitives; it imports `RequestVolumeCard`, `TopKeysCard`, `CompactKpi`, `Table`, `Button`, `VendorAvatar`, `Card`, `Tag`, `StatusDot` and arranges them.

---

## 1. Stack

```mermaid
graph TB
    VITE["Vite 8<br/>@vitejs/plugin-react<br/>@tailwindcss/vite"]
    REACT["React 19<br/>StrictMode root in main.tsx"]
    TS["TypeScript 6<br/>tsconfig.app.json + tsconfig.node.json<br/>baseUrl + @/* alias"]
    TW["Tailwind CSS v4<br/>@import 'tailwindcss'<br/>@theme {} blocks (NOT v3 config)"]
    SHADCN["shadcn/ui<br/>style: base-nova<br/>baseColor: neutral, no prefix"]
    BASEUI["Base UI (@base-ui/react)<br/>under shadcn primitives<br/>NOT Radix"]
    DEPS["Recharts · Sonner<br/>lucide-react · next-themes<br/>Geist + Geist Mono + IBM Plex"]

    VITE --> REACT
    REACT --> TS
    TS -->|alias @/* → src/*| SHADCN
    TW -->|tokens via @theme| SHADCN
    SHADCN --> BASEUI
    SHADCN --> DEPS
```

- `npm run dev` → Vite on **port 3000** (user preference; not the 5173 default). Use `npm run dev -- --port 3000 --strictPort`.
- `npm run build` → `tsc -b && vite build`.
- `npm run lint` → `eslint .`.

---

## 2. App shell — `App.tsx` + `main.tsx`

The app has **no router**. Page switching is `useState` over a flat `NAV` array. The active page is rendered into a centered scroll container.

```mermaid
graph TB
    MAIN["main.tsx<br/>StrictMode + createRoot"]
    APP["App.tsx<br/>useState&lt;PageId&gt;"]
    NAV[("NAV: NavItem[]<br/>15 page entries<br/>(group label opt)")]
    LEFT["Left nav (w-60)<br/>NAV.map → button per page<br/>active state via useState"]
    MAINPANE["Main pane<br/>flex justify-center py-10 px-10<br/>renders &lt;ActivePage /&gt;"]

    PAGE000["CMP000 Typography"]
    PAGE001["CMP001 Colors"]
    PAGE002["CMP002 Buttons"]
    PAGEDOTS["CMP003–007<br/>(Badges, Form fields, Filter bar,<br/>Tabs, Modal/empty)"]
    PAGE008a["CMP008a Cards"]
    PAGE008b["CMP008b Stat cards"]
    PAGE008c["CMP008c Code cards"]
    PAGE009["CMP009 Toast"]
    PAGE010["CMP010 Charts"]
    PAGE011["CMP011 Data table"]
    PAGE012["CMP012 Composed · Dashboard"]

    MAIN --> APP
    APP --> NAV
    NAV --> LEFT
    NAV --> MAINPANE
    MAINPANE -.->|active| PAGE000
    MAINPANE -.->|active| PAGE001
    MAINPANE -.->|active| PAGE002
    MAINPANE -.->|active| PAGEDOTS
    MAINPANE -.->|active| PAGE008a
    MAINPANE -.->|active| PAGE008b
    MAINPANE -.->|active| PAGE008c
    MAINPANE -.->|active| PAGE009
    MAINPANE -.->|active| PAGE010
    MAINPANE -.->|active| PAGE011
    MAINPANE -.->|active| PAGE012
```

`PageId` is a string union of `'cmp-000' | 'cmp-001' | ... | 'cmp-008a' | 'cmp-008b' | 'cmp-008c' | 'cmp-009' | ... | 'cmp-012'`. `NavItem` is a discriminated union supporting `{ kind: 'page', id, code, name, Component }` and (optional) `{ kind: 'group', label }` separators. The NAV-rendering branches on `kind`; group entries render as a non-clickable eyebrow label.

---

## 3. Artboard pattern — every `CMP*` page is the same shape

```mermaid
graph TB
    OUTER["&lt;div className='flex flex-col w-[1440px]'&gt;<br/>(fixed 1440px to mirror Paper)"]
    BG["&lt;div className='flex flex-col w-full bg-ink-25'&gt;"]
    AH["&lt;ArtboardHeader<br/>code, title, description, parts, status /&gt;<br/>(spec-sheet chrome — NOT shipped to apps)"]
    SECS["&lt;div className='flex flex-col gap-7'&gt;<br/>(section stack)"]
    SEC1["section group<br/>SectionHeader<br/>+ content"]
    SECN["..."]

    OUTER --> BG
    BG --> AH
    BG --> SECS
    SECS --> SEC1
    SECS --> SECN
```

**Every artboard:**

- File `src/artboards/CMP{NNN}{PascalName}.tsx`, named export matching filename
- Outer `<div className="flex flex-col w-[1440px]">`
- `<ArtboardHeader code={"CMP-XXX"} title=... description=... parts=... />` from `_shared/ArtboardHeader.tsx`
- One or more `<SectionHeader code={"CMP-XXX.N — TITLE"} hint=... />` blocks delimiting sub-sections
- Content composed entirely from primitives in `src/components/ui/` (or extracted helpers)
- Registered in `src/App.tsx` `NAV[]` (and `PageId` union extended)

Section list (current build):

| Code | File | Purpose |
|---|---|---|
| CMP-000 | `CMP000Typography.tsx` | Type scale (15 specimens) + mono-vs-sans |
| CMP-001 | `CMP001Colors.tsx` | Palette spec sheet — ink + blue ramps, semantic tokens, syntax tokens, vendor brand exception |
| CMP-002 | `CMP002Buttons.tsx` | Button variants × sizes × states |
| CMP-003 | `CMP003BadgesAndTags.tsx` | Status pills, counters, chips |
| CMP-004 | `CMP004FormFields.tsx` | Input, textarea, select, check, radio, switch |
| CMP-005 | `CMP005FilterBar.tsx` | Search + chip filters + dropdowns |
| CMP-006 | `CMP006TabsPagination.tsx` | Underline tabs, segmented, pagination |
| CMP-007 | `CMP007ModalEmptyState.tsx` | Modal (incl. CMP-007.1b Generation details) + empty state |
| CMP-008a | `CMP008aCards.tsx` | Card chrome (chart card + metric/list card) |
| CMP-008b | `CMP008bStatCards.tsx` | Stat cards (compact, flat, stat row, compare, status) |
| CMP-008c | `CMP008cCodeCards.tsx` | Code cards (5 layouts: hero / tabs / terminal / req-resp / steps) |
| CMP-009 | `CMP009Toast.tsx` | Sonner toast deck |
| CMP-010 | `CMP010Charts.tsx` | Spend trend (line+area), Cost by model (stacked) |
| CMP-011 | `CMP011DataTable.tsx` | Sortable table, mono numerics, vendor chips |
| CMP-012 | `CMP012ComposedDashboard.tsx` | Production-shell Overview surface |

---

## 4. Token contract chain

```mermaid
graph LR
    INDEX[("src/index.css<br/>@theme {}<br/>--color-ink-25..900<br/>--color-blue-50..950<br/>--color-syntax-*<br/>semantic: --color-primary,<br/>--color-success/warning/danger,<br/>--color-success-2/danger-2")]
    CSSVARS[":root vars<br/>--background, --foreground,<br/>--card, --popover, --primary,<br/>--secondary, --muted, --accent,<br/>--destructive, --border, --input,<br/>--ring, --chart-1..5, --radius,<br/>--sidebar-*"]
    THEMEINLINE["@theme inline<br/>maps :root vars to<br/>Tailwind color/radius utilities"]
    TWUTILS["Tailwind utilities<br/>bg-ink-* text-ink-* bg-blue-*<br/>text-primary bg-card<br/>rounded-lg etc."]
    PRIMS["src/components/ui/*<br/>className strings<br/>(no hex literals here)"]
    ARTS["src/artboards/CMP*<br/>className strings<br/>(no hex literals here)"]
    VENDOR[("src/components/icons/<br/>vendor-meta.tsx<br/>VENDOR_META.color (brand)<br/>VENDOR_CHART_COLOR_SECONDARY<br/>(only for one-vendor multi-series)")]

    INDEX --> CSSVARS
    INDEX --> THEMEINLINE
    THEMEINLINE --> TWUTILS
    CSSVARS --> THEMEINLINE
    TWUTILS --> PRIMS
    TWUTILS --> ARTS
    VENDOR -.->|brand-hex exception<br/>(chips AND chart series)| ARTS
```

**Authority:** `system.md` (host-level Theme + Project) > `front-end-developer/contract/globals.md` (Layer 1) > `src/index.css` (this repo's globals). Currently `system.md` does not exist; `index.css` is the operative token source. `vendor-meta.tsx` is the only place raw brand hex literals live (intentional — they represent external brand identities, not contract colors).

**Hard rule:** no `#xxxxxx` or `oklch(...)` literals appear in `src/components/ui/*` or `src/artboards/*`. Every color reference resolves through Tailwind utilities or `var(--color-*)` references.

**Vendor color model:** the `VENDOR_META[vendor].color` field is single-source — chips/avatars/badges and chart series both pull from it. There is no separate `chartColor` tier. Twin-hue pairs (Meta + DeepSeek both blue; Anthropic + Mistral both orange) are accepted as the design — each vendor renders in its own brand color, full strength. `VENDOR_CHART_COLOR_SECONDARY` exists only for the case where one vendor is two series in the same chart (e.g. Anthropic Sonnet + Haiku).

---

## 5. Primitive reuse graph (the load-bearing one)

This is the diagram that proves *every artboard composes from primitives*. Arrows mean "imports from."

```mermaid
graph LR
    subgraph TOK["Tokens"]
        IDX[("index.css")]
    end

    subgraph PRIM["src/components/ui/*"]
        BTN["button"]
        CARD["card<br/>Card / CardHeader / CardTitle /<br/>CardDescription / CardAction /<br/>CardContent"]
        TBL["table<br/>(eyebrow column headers)"]
        TABS["tabs"]
        TAG["tag"]
        BADGE["badge"]
        SDOT["status-dot"]
        SEG["segmented-pill<br/>(slide indicator)"]
        SEP["separator"]
        DLG["dialog · alert-dialog"]
        FLD["field · label · input ·<br/>textarea · select · checkbox ·<br/>radio-group · switch ·<br/>toggle · toggle-group ·<br/>input-group"]
        PAG["pagination"]
        CHT["chart (recharts wrapper)"]
        SON["sonner"]
        CKPI["compact-kpi<br/>CompactKpi · CompactSpark ·<br/>DeltaTag"]
        CCARD["code-card<br/>CodeCard · CodeCardHeader ·<br/>CodeCardTabs ·<br/>CodeCardCopyButton ·<br/>CodeBlock · TerminalCard"]
    end

    subgraph ICN["src/components/icons/"]
        MP["model-providers<br/>(8 brand SVGs)"]
        VM["vendor-meta<br/>VENDOR_META · VendorAvatar ·<br/>VENDOR_CHART_COLOR_SECONDARY"]
    end

    subgraph LIB["src/lib/"]
        UTL["utils.ts<br/>cn() = twMerge(clsx(...))"]
    end

    subgraph ARTS["Artboards"]
        A011["CMP011 Data table"]
        A012["CMP012 Composed Dashboard"]
        A008a["CMP008a Cards"]
        A008b["CMP008b Stat cards"]
        A008c["CMP008c Code cards"]
        A010["CMP010 Charts"]
    end

    IDX --> PRIM
    IDX --> ICN
    MP --> VM
    UTL --> PRIM
    UTL --> ARTS

    CKPI --> A008b
    CKPI --> A012
    CCARD --> A008c
    CARD --> A012
    CARD --> A008a
    TBL --> A011
    TBL --> A012
    VM --> A011
    VM --> A012
    VM --> A010
    BTN --> ARTS
    BADGE --> A012
    TAG --> A012
    SDOT --> A012
    SEG --> A012
    CHT --> A010
    CHT --> A012
    SEP --> A012

    A012 -.->|re-exports<br/>RequestVolumeCard, TopKeysCard| A008a
```

**Key reuse loops to call out:**

- **`CompactKpi`** lives in `src/components/ui/compact-kpi.tsx`. Consumed by `CMP008b` (Stat cards) AND `CMP012` KPI rail. Title style (`font-mono font-medium uppercase tracking-[0.1em] text-xs text-ink-500`) is canonical eyebrow.
- **`Card` family** lives in `src/components/ui/card.tsx`. `RequestVolumeCard` and `TopKeysCard` (defined in `CMP012ComposedDashboard.tsx`, **exported** for reuse) are the two card examples in `CMP008a`. Single source of truth — CMP-008a re-imports from CMP-012, no duplication.
- **`VendorAvatar` + `VENDOR_META`** lives in `src/components/icons/vendor-meta.tsx`. Consumed by CMP-010 (chart legend chips), CMP-011 (Recent requests model column), CMP-012 (Top Keys panel + Recent requests + Request Volume chart). The `color` field is single-source — chips and chart series both pull from it.
- **`Table` primitive** has Geist Mono uppercase column header treatment baked in — every `<TableHead>` consumer inherits.
- **Code card primitives** (`CodeCard`, `TerminalCard`, `CodeBlock`) live in `code-card.tsx`. CMP-008c is the only consumer today, but the family is structured for reuse on any future code-rendering surface (docs, API references, blog).
- **`ArtboardHeader` h1** is `text-4xl/10 font-medium` (Page title spec), the largest size used across the app — propagates to all 15 artboards via the shared header in `_shared/ArtboardHeader.tsx`.

---

## 6. Paper → Code flow

```mermaid
sequenceDiagram
    participant U as User
    participant M as Main thread
    participant A as front-end-developer agent
    participant P as Paper MCP
    participant FS as src/artboards/

    U->>M: "Add CMP-XYZ"
    M->>P: get_basic_info, get_tree_summary({nodeId, depth})
    M->>A: dispatch with nodeId, target file path,<br/>existing primitives to reuse
    A->>P: get_screenshot({nodeId, scale: 2}) (visual reference)
    A->>P: get_jsx({nodeId, format: 'tailwind'}) (production code)
    A->>P: get_computed_styles (precision values)
    A->>FS: Write CMPxyz.tsx<br/>- Wrap in &lt;div w-[1440px]&gt;<br/>- ArtboardHeader + SectionHeaders<br/>- Reuse src/components/ui/*<br/>- Adapt to vendor-meta if vendor data
    A->>FS: Update src/App.tsx (NAV + PageId)
    A->>FS: tsc + dev-server screenshot verify
    A->>M: deliverable (file paths, decisions, drift)
    M->>U: confirm done
```

**Source-data rule:** the agent ALWAYS calls `get_jsx(format="tailwind")` + `get_computed_styles` on the source node. Screenshots are for visual verification only, never for tracing values. Paper's JSX output IS production HTML/CSS; the agent's job is adaptation (named export, project imports, primitive swaps, vendor mapping).

---

## 7. Build / dev pipeline

```mermaid
graph LR
    SRC["src/<br/>+ public/"]
    TSC["tsc -b<br/>tsconfig.app.json +<br/>tsconfig.node.json"]
    VITE_DEV["vite (dev)<br/>:3000 (strictPort)"]
    VITE_BUILD["vite build<br/>(prod)"]
    DIST["dist/"]
    GH["GitHub<br/>Neoneue/GateAI<br/>main + production"]

    SRC --> TSC
    TSC -.->|type-only<br/>noEmit| VITE_DEV
    SRC --> VITE_DEV
    TSC --> VITE_BUILD
    SRC --> VITE_BUILD
    VITE_BUILD --> DIST
    SRC -->|git push origin production| GH
```

**Branches:**
- `main` — stable line; merge target when production is ready to ship
- `production` — working branch; commits land here first

**Dev-server lifecycle:** main thread responsibility (per CLAUDE.md exception). The orchestrated agent never restarts it.

---

## 8. File tree (current)

```text
mvp/
├── CLAUDE.md                       ← orchestration rules + repo conventions
├── data-model.md                   ← this file
├── README.md                       ← Vite default README (untouched)
├── components.json                 ← shadcn config (style: base-nova)
├── package.json                    ← deps + scripts
├── vite.config.ts                  ← @ alias + plugins
├── tsconfig.{json,app,node}.json
├── eslint.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── .claude/
│   ├── agents/front-end-developer.md   ← project-scoped subagent (committed)
│   └── settings.local.json             ← gitignored
├── front-end-developer/            ← gitignored vendored agent bundle
│   ├── agent/front-end-developer.md
│   ├── contract/globals.md
│   ├── data-model.md (the agent's own)
│   ├── knowledge/{core,figma,paper,shadcn}/
│   ├── skills/<33 skills>/
│   └── hooks/<5 .sh>/
└── src/
    ├── main.tsx                    ← StrictMode root
    ├── App.tsx                     ← left nav + page swap, NAV array
    ├── index.css                   ← Tailwind v4 imports + @theme tokens
    ├── App.css                     ← (legacy, mostly empty)
    ├── artboards/
    │   ├── _shared/ArtboardHeader.tsx
    │   ├── CMP000Typography.tsx
    │   ├── CMP001Colors.tsx
    │   ├── CMP002Buttons.tsx
    │   ├── CMP003BadgesAndTags.tsx
    │   ├── CMP004FormFields.tsx
    │   ├── CMP005FilterBar.tsx
    │   ├── CMP006TabsPagination.tsx
    │   ├── CMP007ModalEmptyState.tsx
    │   ├── CMP008aCards.tsx
    │   ├── CMP008bStatCards.tsx
    │   ├── CMP008cCodeCards.tsx
    │   ├── CMP009Toast.tsx
    │   ├── CMP010Charts.tsx
    │   ├── CMP011DataTable.tsx
    │   └── CMP012ComposedDashboard.tsx
    ├── components/
    │   ├── canvas/Artboard.tsx     ← absolute-positioned wrapper (zoomable canvas mode; not used by current shell)
    │   ├── icons/
    │   │   ├── model-providers.tsx ← Anthropic/OpenAI/Gemini/Grok/Meta/Mistral/DeepSeek/Cohere SVGs
    │   │   └── vendor-meta.tsx     ← Vendor type + VENDOR_META (single `color` field) + VendorAvatar + VENDOR_CHART_COLOR_SECONDARY
    │   └── ui/                     ← 28 shadcn/Base UI primitives
    ├── lib/
    │   ├── utils.ts                ← cn() helper
    │   └── portal-target.tsx
    └── assets/                     ← hero.png, react.svg, vite.svg
```

---

## 9. Cross-references

- **Token decisions:** `src/index.css` (open this when adding/auditing colors)
- **Repo conventions + dispatch rules:** `CLAUDE.md`
- **Design methodology contract:** `.claude/agents/front-end-developer.md` (sourced from `front-end-developer/agent/front-end-developer.md`)
- **Agent skill routing:** `front-end-developer/agent/front-end-developer.md` (skill table near the top)
- **Paper canvas reference:** the Paper file *Brilliant quartz* (`app.paper.design/file/01KQ33WPFNCEZAER8FDFPVW5EP`)

When the project structure changes (new primitive extracted, new artboard added, contract chain shifts, build pipeline changes), update this file. The diagrams should always match the source.
