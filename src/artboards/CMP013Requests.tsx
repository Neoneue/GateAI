import { useState } from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import {
  Download,
  ExternalLink,
  Search,
  TriangleAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogScrollBody,
  DialogScrollContent,
  DialogScrollFooter,
  DialogScrollHeader,
  DialogScrollSummary,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TablePaginationFooter } from '@/components/ui/table-pagination-footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusDot } from '@/components/ui/status-dot';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { VENDOR_META, VendorAvatar, type Vendor } from '@/components/icons/vendor-meta';
import { DeltaTag } from '@/components/ui/compact-kpi';
import { HeroNumeric } from '@/components/ui/hero-numeric';
import { MessageBlock, type MessageRole } from '@/components/ui/message-block';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { DashboardChrome } from './_shared/DashboardChrome';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-013 — Requests (Observability)
 *
 * Live request firehose surface. Same production frame as CMP-012 (gray
 * well, white cards, 64px icon sidebar) but the right pane is the dense
 * observability list: hero metric + full-width sparkline → filter bar →
 * sortable request log → pagination footer.
 *
 * Chrome strategy: chrome subcomponents (DashboardSurface, ScreenHead,
 * DashSidebar, DashTopBar) are **copied** from CMP-012 rather than imported.
 * The two artboards share a frame today but the active-nav state is
 * intrinsically per-page; importing would couple them and force one to
 * become the source of truth for the other's nav. Copy keeps each surface
 * free to evolve independently.
 *
 * Color palette: only ink-* / blue-* / semantic vars. Status pill colors
 * (green / red / amber for 200 / 4xx / 5xx) ride success / destructive /
 * warning at low alpha — same approach as CMP-003.
 *
 * Column alignment: numerics (In, Out, Latency, Cost) right-aligned with
 * `font-mono tabular-nums`. Right-edge anchoring stacks the ones-place at
 * a fixed x across rows so magnitudes compare at a glance — the standard
 * tabular convention. `tabular-nums` alone only fixes intra-row digit
 * width; right-align fixes inter-row drift when `4,051` sits above
 * `52,810`. Latency cell reserves a fixed leading icon slot on every row
 * so the slow-row TriangleAlert doesn't shift the digit column.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP013Requests({
  onNavigate,
  innerSidebarExpanded = false,
  onToggleInnerSidebar,
}: {
  onNavigate?: (pageId: string) => void;
  innerSidebarExpanded?: boolean;
  onToggleInnerSidebar?: () => void;
} = {}) {
  return (
    <div className="flex flex-col w-[1440px] min-w-0">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-013"
          title="Requests · Observability"
          description="Live request firehose. Hero metric + sparkline, filter bar, sortable log of every gateway call. Same production frame as CMP-012 — different right pane."
          parts="1 surface"
        />

        <div className="flex flex-col gap-3">
          <SectionHeader
            code="CMP-013.1 — REQUESTS SURFACE"
            hint="v-shell · gray well · hero metric · filter bar · request log"
          />

          <DashboardChrome
            urlSlug="requests"
            screenEyebrow="REQUESTS"
            breadcrumbCurrent="Requests"
            activeNavId="requests"
            sidebarExpanded={innerSidebarExpanded}
            onToggleSidebar={onToggleInnerSidebar ?? (() => {})}
            onNavigate={onNavigate}
          >
            <PageHeader />
            <HeroMetricCard />
            <RequestsTableSection />
          </DashboardChrome>
        </div>
      </div>
    </div>
  );
}

/* ─── Page header (eyebrow + title + actions) ────────────────────────────── */

function PageHeader() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-2 max-w-1/2">
        {/* h2 — see CMP012 PageHeader note. */}
        <h2 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">
          Requests
        </h2>
        <p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">
          Every generation routed through the gateway. Click any row to inspect prompts, security scans and the audit anchor.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Button variant="outline" size="default">
          <Download data-icon="inline-start" aria-hidden />
          Export CSV
        </Button>
      </div>
    </div>
  );
}

/* ─── Hero metric (REQUESTS / 1H + line chart + breakdown) ───────────────── */

// 61 minute-bucketed points spanning the trailing hour 13:30 → 14:30
// inclusive. Each point is the per-minute request count (NOT a running
// total). Shape: baseline drifts upward (~50/min → ~220/min) so the
// line rises diagonally across the hour; oscillation amplitude grows
// quadratically (t^1.5) so the first quarter reads almost smooth and
// the last quarter has visible 4-minute peaks/dips — matches the
// "ramp with growing wobble" reference. Sum is tuned to 8,241 so the
// headline number and breakdown rows reconcile.
const HERO_INCREMENTS = [
   50,  53,  55,  59,  62,  64,  66,  70,  74,  76,
   76,  81,  87,  87,  86,  93, 100,  98,  95, 104,
  113, 110, 105, 115, 127, 121, 114, 127, 140, 132,
  123, 138, 154, 144, 131, 149, 168, 155, 140, 161,
  182, 166, 148, 172, 192, 178, 157, 183, 211, 189,
  165, 195, 221, 200, 173, 206, 240, 212, 181, 217, 250,
];
const HERO_TOTAL = HERO_INCREMENTS.reduce((a, b) => a + b, 0);

const HERO_DATA = HERO_INCREMENTS.map((inc, i) => {
  // i=0 → 13:30, i=60 → 14:30 — labels printed `H:MM` (24h, no leading zero).
  const minute = 30 + i;
  const hh = Math.floor(13 + minute / 60);
  const mm = minute % 60;
  return {
    time: `${hh}:${mm.toString().padStart(2, '0')}`,
    requests: inc,
  };
});

const HERO_TICKS = ['13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30'];

const heroChartConfig = {
  requests: {
    label: 'Requests/min',
    color: 'var(--color-blue-700)',
  },
} satisfies ChartConfig;

function HeroMetricCard() {
  return (
    <div className="flex flex-col gap-4 rounded-sm bg-white shadow-(--shadow-border) p-4">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2 shrink-0">
          <div className="font-mono uppercase tracking-[0.1em] text-xs font-medium text-ink-500">
            REQUESTS / 1H
          </div>
          <div className="flex items-baseline gap-3">
            <HeroNumeric size="lg">
              {HERO_TOTAL.toLocaleString()}
            </HeroNumeric>
            <DeltaTag delta="+12.8%" note="vs last hour" />
          </div>
        </div>

        {/* Right-aligned mono breakdown — grid (not stacked flex) so all
            three rows share the same label / dot / value column tracks.
            Each BreakdownRow returns three grid cells; the dot column is
            fixed-width so dots align across rows regardless of label or
            value length. */}
        <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-2 gap-y-2 shrink-0">
          <BreakdownRow label="Success" value="8,182" tone="success" />
          <BreakdownRow label="Errors"  value="47"    tone="danger" />
          <BreakdownRow label={'Slow > 1s'} value="12" tone="warning" />
        </div>
      </div>

      {/* Full-width line chart with minute-ago axis + per-point tooltip */}
      <ChartContainer
        config={heroChartConfig}
        className="aspect-auto h-24 w-full"
      >
        <AreaChart
          data={HERO_DATA}
          margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
        >
          <defs>
            <linearGradient id="cmp013-hero-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-blue-700)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--color-blue-700)" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Domain ceiling 300 gives ~5px of headroom above the top peak (250/min)
              so the line doesn't clip the chart rect top. Per-minute counts, not
              cumulative — curve starts near 50 and ramps up to ~250 with growing
              oscillation. */}
          <YAxis
            width={0}
            tick={false}
            axisLine={false}
            tickLine={false}
            domain={[0, 300]}
            ticks={[0, 100, 200, 300]}
          />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            height={24}
            ticks={HERO_TICKS}
            interval={0}
            tick={(tickProps) => {
              const { x, y, payload } = tickProps as {
                x: number;
                y: number;
                payload: { value: string };
              };
              const value = payload.value;
              const anchor =
                value === HERO_TICKS[0]
                  ? 'start'
                  : value === HERO_TICKS[HERO_TICKS.length - 1]
                    ? 'end'
                    : 'middle';
              return (
                <text
                  x={x}
                  y={y}
                  dy="0.71em"
                  textAnchor={anchor}
                  fontSize={11}
                  fill="var(--color-ink-500)"
                >
                  {value}
                </text>
              );
            }}
          />
          <ChartTooltip
            cursor={{ stroke: 'var(--color-ink-400)', strokeDasharray: '2 3' }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="requests"
            type="linear"
            stroke="var(--color-blue-700)"
            strokeWidth={1.5}
            fill="url(#cmp013-hero-spark)"
            isAnimationActive={false}
          />
          {/* ChartContainer is pinned to h-24 (96px); XAxis height=24 + margin top=4
              gives a drawing rect from y=4 to y=72 (68px tall). With domain [0, 300],
              gridlines at 0/100/200/300 land at y = 72, 49, 27, 4 respectively.
              Hardcoded because YAxis width={0} disables tick-driven grid generation. */}
          <CartesianGrid
            horizontal
            vertical={false}
            horizontalPoints={[4, 27, 49, 72]}
            stroke="var(--color-ink-300)"
            strokeDasharray="2 3"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'success' | 'danger' | 'warning';
}) {
  const dotColor =
    tone === 'success' ? 'bg-success-600'
    : tone === 'danger' ? 'bg-destructive'
    : 'bg-warning-600';
  // Returns three grid cells (no wrapper element). Parent is a 3-col grid
  // so dots and values align across rows. `justify-self-end` right-aligns
  // text-flow cells within their tracks.
  return (
    <>
      <span className="font-sans text-xs font-medium text-ink-600 -tracking-[0.12px] justify-self-end">
        {label}
      </span>
      <span className={`size-1.5 rounded-full ${dotColor}`} aria-hidden />
      <span className="font-mono text-xs font-medium tabular-nums text-ink-900 justify-self-end">
        {value}
      </span>
    </>
  );
}

/* ─── Table section (toolbar + table in one card · pagination below) ─────
 *
 * Shape lifted from CMP-011.1 (SORTABLE TABLE):
 *   <div rounded-sm bg-white border …>      ← single card
 *     <toolbar>                              ← search · segmented · selects
 *     <Table>                                ← header + rows
 *   </div>
 *   <pagination footer>                      ← sibling, sits in the gray well
 *
 * Holding the toolbar and table together inside one rounded card keeps
 * the SORTABLE TABLE rhythm (same border, same divider between toolbar
 * and header). Pagination becomes a sibling so the gray well shows
 * through the rows-per-page / page-nav strip — matches the reference. */

const RANGE_OPTIONS = [
  { value: '5m',  label: 'Last 5 min'    },
  { value: '30m', label: 'Last 30 min'   },
  { value: '1h',  label: 'Last hour'     },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d',  label: 'Last 7 days'   },
];

/* ─── Requests log table ─────────────────────────────────────────────────── */

type RequestStatus = 'success' | 'warn' | 'danger';

type RequestRow = {
  time: string;
  status: RequestStatus;
  code: string;
  vendor: Vendor;
  model: string;
  conversation: string;
  keyId: string;
  inTokens: string;
  outTokens: string;
  /** Latency in seconds. Stored as string with the `s` suffix already
   *  attached so we can render typographic emphasis on slow values. */
  latency: string;
  /** True when this request crossed the 1s "slow" threshold. */
  slow?: boolean;
  cost: string;
};

const REQUEST_ROWS: RequestRow[] = [
  { time: '14:30:14', status: 'success', code: '200', vendor: 'anthropic', model: 'claude-sonnet-4.8', conversation: 'cnv_aurora_42',  keyId: 'prod-web',   inTokens: '2,847', outTokens: '1,204', latency: '1.13s', slow: true,  cost: '$0.0284' },
  { time: '14:29:51', status: 'success', code: '200', vendor: 'openai',    model: 'gpt-5.1',             conversation: 'cnv_aurora_42',  keyId: 'prod-web',   inTokens: '1,892', outTokens: '955',   latency: '0.96s',             cost: '$0.0192' },
  { time: '14:29:23', status: 'success', code: '200', vendor: 'anthropic', model: 'claude-sonnet-4.8', conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '1,420', outTokens: '2,008', latency: '2.14s', slow: true,  cost: '$0.0312' },
  { time: '14:28:48', status: 'success', code: '200', vendor: 'google',    model: 'gemini-3-pro',      conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '1,204', outTokens: '688',   latency: '1.08s', slow: true,  cost: '$0.0091' },
  { time: '14:28:09', status: 'danger',  code: '500', vendor: 'anthropic', model: 'claude-opus-4.7',   conversation: 'cnv_meridian_07',keyId: 'prod-web',   inTokens: '—',     outTokens: '—',     latency: '—',                 cost: '—'       },
  { time: '14:27:42', status: 'success', code: '200', vendor: 'meta',      model: 'llama-4.2-405b',      conversation: 'cnv_orion_70',   keyId: 'dev',        inTokens: '5,024', outTokens: '2,612', latency: '1.95s', slow: true,  cost: '$0.0068' },
  { time: '14:27:11', status: 'success', code: '200', vendor: 'mistral',   model: 'mistral-large-3',   conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '1,442', outTokens: '820',   latency: '0.91s',             cost: '$0.0072' },
  { time: '14:26:52', status: 'warn',    code: '429', vendor: 'openai',    model: 'gpt-5.1',             conversation: 'cnv_meridian_07',keyId: 'prod-web',   inTokens: '—',     outTokens: '—',     latency: '0.18s',             cost: '$0.0000' },
  { time: '14:26:14', status: 'success', code: '200', vendor: 'anthropic', model: 'claude-sonnet-4.8', conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '3,104', outTokens: '1,420', latency: '1.31s', slow: true,  cost: '$0.0315' },
  { time: '14:25:47', status: 'success', code: '200', vendor: 'xai',       model: 'grok-4.1-fast',     conversation: 'cnv_polaris_55', keyId: 'prod-web',   inTokens: '6,204', outTokens: '3,109', latency: '0.42s',             cost: '$0.0184' },
  { time: '14:25:10', status: 'success', code: '200', vendor: 'google',    model: 'gemini-3-pro',      conversation: 'cnv_aurora_42',  keyId: 'prod-web',   inTokens: '942',   outTokens: '517',   latency: '0.74s',             cost: '$0.0062' },
  { time: '14:24:38', status: 'warn',    code: '408', vendor: 'meta',      model: 'llama-4.2-405b',      conversation: 'cnv_polaris_55', keyId: 'dev',        inTokens: '4,108', outTokens: '0',     latency: '8.04s', slow: true,  cost: '$0.0000' },
  { time: '14:24:02', status: 'success', code: '200', vendor: 'anthropic', model: 'claude-sonnet-4.8', conversation: 'cnv_orion_70',   keyId: 'prod-agent', inTokens: '1,712', outTokens: '904',   latency: '1.05s', slow: true,  cost: '$0.0167' },
  { time: '14:23:24', status: 'success', code: '200', vendor: 'mistral',   model: 'mistral-large-3',   conversation: 'cnv_aurora_42',  keyId: 'prod-web',   inTokens: '2,209', outTokens: '1,058', latency: '0.83s',             cost: '$0.0096' },
];

const STATUS_BADGE: Record<RequestStatus, {
  variant: 'success' | 'warning' | 'destructive';
  dot: 'success' | 'warning' | 'danger';
}> = {
  success: { variant: 'success',     dot: 'success' },
  warn:    { variant: 'warning',     dot: 'warning' },
  danger:  { variant: 'destructive', dot: 'danger'  },
};

// Synthetic total — held at module scope so the pagination math reconciles
// with the hero metric narrative (8,241 requests in the trailing hour).
const REQUESTS_TOTAL = 8241;

function RequestsTableSection() {
  const [range, setRange] = useState('1h');
  const [model, setModel] = useState('all');
  const [keyId, setKeyId] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('25');
  // Row-click drill-in. `selectedRow` doubles as the dialog's `open`
  // signal — `null` means closed, a row means open. Avoids carrying a
  // separate `open` flag.
  const [selectedRow, setSelectedRow] = useState<RequestRow | null>(null);

  return (
    <>
    <div className="flex flex-col w-full rounded-sm overflow-hidden bg-white shadow-(--shadow-border)">
        {/* Toolbar — shape lifted from CMP-011.1. No flex-wrap: the
            sortable-table convention is single-row, and the filter set
            fits in the gray well at this width. */}
        <div className="flex items-center gap-2 py-3 px-4">
          <div className="relative w-72 min-w-0 shrink-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-ink-500"
              strokeWidth={1.75}
              aria-hidden
            />
            <Input
              size="sm"
              type="search"
              name="q"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search request…"
              className="pl-8"
              aria-label="Search requests"
            />
          </div>

          <Select value={range} onValueChange={setRange}>
            <SelectTrigger
              size="sm"
              aria-label="Time range"
              className="border-ink-200 bg-white text-ink-900 font-normal"
            >
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              {RANGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={model} onValueChange={setModel}>
            <SelectTrigger
              size="sm"
              aria-label="Model"
              className="border-ink-200 bg-white text-ink-900 font-normal"
            >
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All models</SelectItem>
              <SelectItem value="claude-sonnet-4.8">claude-sonnet-4.8</SelectItem>
              <SelectItem value="gpt-5.1">gpt-5.1</SelectItem>
              <SelectItem value="gemini-3-pro">gemini-3-pro</SelectItem>
              <SelectItem value="llama-4.2-405b">llama-4.2-405b</SelectItem>
              <SelectItem value="grok-4.1-fast">grok-4.1-fast</SelectItem>
              <SelectItem value="mistral-large-3">mistral-large-3</SelectItem>
            </SelectContent>
          </Select>

          <Select value={keyId} onValueChange={setKeyId}>
            <SelectTrigger
              size="sm"
              aria-label="Key"
              className="border-ink-200 bg-white text-ink-900 font-normal"
            >
              <SelectValue placeholder="Key" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All keys</SelectItem>
              <SelectItem value="prod-web">prod-web</SelectItem>
              <SelectItem value="prod-agent">prod-agent</SelectItem>
              <SelectItem value="dev">dev</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger
              size="sm"
              aria-label="Status"
              className="border-ink-200 bg-white text-ink-900 font-normal"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="200">200 OK</SelectItem>
              <SelectItem value="4xx">4xx</SelectItem>
              <SelectItem value="5xx">5xx</SelectItem>
              <SelectItem value="slow">{'Slow > 1s'}</SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="whitespace-nowrap">Time</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Model</TableHead>
              <TableHead className="whitespace-nowrap">Conversation</TableHead>
              <TableHead className="whitespace-nowrap">Key</TableHead>
              <TableHead className="text-right whitespace-nowrap">In</TableHead>
              <TableHead className="text-right whitespace-nowrap">Out</TableHead>
              <TableHead className="text-right whitespace-nowrap">Latency</TableHead>
              <TableHead className="text-right whitespace-nowrap">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REQUEST_ROWS.map((row, i) => {
              const badge = STATUS_BADGE[row.status];
              const isMissing = row.inTokens === '—';
              const numericCls = isMissing
                ? 'text-right whitespace-nowrap font-mono tabular-nums text-ink-400'
                : 'text-right whitespace-nowrap font-mono tabular-nums text-ink-800';
              // Slow rows: leading amber TriangleAlert + ink-900 (one step
              // darker than the ink-800 default). Same weight as non-slow rows
              // so `tabular-nums` keeps the column tracks aligned — font-medium
              // would widen the digits and leave the column ragged. The icon
              // sits in a fixed-width slot reserved on every row (slow or not)
              // so the digit column stays anchored at the cell's right edge
              // regardless of slow state — value owns the alignment edge, icon
              // qualifies it from the left.
              const isSlow = row.slow && row.latency !== '—';
              const latencyTextCls =
                row.latency === '—'
                  ? 'text-ink-400'
                  : isSlow
                    ? 'text-ink-900'
                    : 'text-ink-800';
              return (
                <TableRow
                  key={`${row.time}-${i}`}
                  className="cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-ink-50"
                  onClick={() => setSelectedRow(row)}
                >
                  <TableCell className="whitespace-nowrap font-mono tabular-nums -tracking-[0.14px] text-ink-500">
                    {row.time}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={badge.variant}>
                      <StatusDot kind={badge.dot} />
                      {row.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[260px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(row);
                      }}
                      aria-label={`Inspect ${row.code} request to ${row.model} at ${row.time}`}
                      className="flex items-center gap-2 min-w-0 w-full text-left bg-transparent p-0 outline-none rounded-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <VendorAvatar vendor={row.vendor} />
                      <span
                        className="font-mono text-sm text-ink-900 -tracking-[0.2px] truncate"
                        title={row.model}
                      >
                        {row.model}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell className="max-w-[200px] font-mono tabular-nums -tracking-[0.14px] text-ink-800">
                    <span className="block truncate" title={row.conversation}>
                      {row.conversation}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[140px] font-mono text-ink-800 -tracking-[0.14px]">
                    <span className="block truncate" title={row.keyId}>
                      {row.keyId}
                    </span>
                  </TableCell>
                  <TableCell className={numericCls}>{row.inTokens}</TableCell>
                  <TableCell className={numericCls}>{row.outTokens}</TableCell>
                  <TableCell className="text-right whitespace-nowrap font-mono tabular-nums">
                    <span className="inline-flex items-center justify-end gap-1.5">
                      {isSlow ? (
                        <TriangleAlert
                          className="size-3 shrink-0 text-warning-600"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      ) : (
                        <span className="size-3 shrink-0" aria-hidden />
                      )}
                      {isSlow ? <span className="sr-only">slow</span> : null}
                      <span className={latencyTextCls}>{row.latency}</span>
                    </span>
                  </TableCell>
                  <TableCell className={numericCls}>{row.cost}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <TablePaginationFooter
          total={REQUESTS_TOTAL}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
    </div>
    <RequestDetailDialog
      row={selectedRow}
      onOpenChange={(open) => {
        if (!open) setSelectedRow(null);
      }}
    />
    </>
  );
}

/* ─── Request detail dialog ────────────────────────────────────────────────
 * Drill-in panel opened from a row click. Mirrors the table's per-row data
 * (model, vendor, key, latency, cost, tokens) and adds context the row
 * doesn't carry (provider name, endpoint, cache status).
 *
 * Centered modal (Dialog primitive) matching CMP-014's ConversationDetail
 * pattern. sm:max-w-3xl gives the tabbed body breathing room without
 * overpowering the dimmed page behind. max-h-[90vh] keeps the modal inside
 * the viewport on shorter screens; the tabbed area scrolls internally.
 * ────────────────────────────────────────────────────────────────────── */

function RequestDetailDialog({
  row,
  onOpenChange,
}: {
  row: RequestRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!row} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-3xl">
        {row ? <RequestDetailBody row={row} /> : null}
      </DialogScrollContent>
    </Dialog>
  );
}

function RequestDetailBody({ row }: { row: RequestRow }) {
  const badge = STATUS_BADGE[row.status];
  const requestId = `req_${row.conversation.replace('cnv_', '').slice(0, 8)}${row.code}`;
  const provider = VENDOR_META[row.vendor].label;
  // Tabs is controlled so the panel footer can swap actions per active
  // tab (Audit gets Copy Proof / View on DE; everyone else gets Copy ID /
  // Open Conversation). Defaults to "messages" so the prompt/response is
  // visible on first open.
  const [activeTab, setActiveTab] = useState('messages');
  return (
    <>
      {/* Top section — eyebrow + DialogTitle + status badge + provenance.
          `pr-12` on the title block clears the absolute DialogClose X. */}
      <DialogScrollHeader>
        <div className="flex flex-col gap-1 pr-12">
          <span className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">
            Request
          </span>
          <div className="flex items-center gap-2">
            {/* DialogTitle override — keep the default `font-heading` recipe
                replaced with the request-id mono treatment. */}
            <DialogTitle className="font-mono text-lg leading-none font-medium text-ink-900 m-0">
              {requestId}
            </DialogTitle>
            <Badge variant={badge.variant}>
              <StatusDot kind={badge.dot} />
              {row.code}
            </Badge>
          </div>
          <p className="font-mono text-xs text-ink-500 -tracking-[0.01em] text-pretty m-0">
            Apr 22, 2026 · {row.time} UTC · part of conversation{' '}
            <button
              type="button"
              className="text-ink-700 bg-transparent p-0 outline-none rounded-xs underline decoration-ink-200 underline-offset-2 hover:decoration-ink-500 focus-visible:decoration-ink-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {row.conversation}
            </button>
          </p>
        </div>
      </DialogScrollHeader>

      {/* Persistent KPI rail — sits below the header, above the tabs. */}
      <DialogScrollSummary>
        <KpiRail row={row} />
      </DialogScrollSummary>

      {/* Scrollable tabbed body. */}
      <DialogScrollBody>
        {/* Tabs default to Messages so the prompt/response — the load-bearing
            content of any request inspection — is visible on first open. */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <MessagesPanel />
          </TabsContent>

          <TabsContent value="details">
            <div className="rounded-sm border border-ink-200 overflow-hidden">
              <DetailRow
                label="Model"
                value={
                  <div className="flex items-center gap-2">
                    <VendorAvatar vendor={row.vendor} />
                    <span className="font-mono text-sm text-ink-900 -tracking-[0.2px]">
                      {row.model}
                    </span>
                  </div>
                }
              />
              <DetailRow label="Provider" value={<span className="font-sans text-sm text-ink-900">{provider}</span>} />
              <DetailRow
                label="API Key"
                value={<span className="font-mono text-sm text-ink-900 -tracking-[0.14px]">{row.keyId}</span>}
              />
              <DetailRow
                label="Endpoint"
                value={
                  <span className="font-mono text-sm text-ink-900 -tracking-[0.14px]">
                    <span className="text-ink-500">POST</span> /v1/messages
                  </span>
                }
              />
              <DetailRow
                label="Cache"
                value={
                  <Badge variant="info">
                    <StatusDot kind="info" />
                    miss
                  </Badge>
                }
              />
            </div>
          </TabsContent>

          {/* Audit tab — runtime guardrail checks (did this request pass
              policy at runtime?). */}
          <TabsContent value="audit">
            <SecurityPanel row={row} />
          </TabsContent>
        </Tabs>
      </DialogScrollBody>

      <DialogScrollFooter>
        {activeTab === 'audit' ? (
          <>
            <CopyButton
              mode="label"
              size="sm"
              text="Copy Proof"
              value={`proof_${requestId}`}
              label="audit proof"
            />
            <Button variant="default" size="sm">
              View on DE
              <ExternalLink data-icon="inline-end" aria-hidden />
            </Button>
          </>
        ) : (
          <>
            <CopyButton
              mode="label"
              size="sm"
              text="Copy ID"
              value={requestId}
              label="request ID"
            />
            <Button variant="default" size="sm">
              Open Conversation
              <ExternalLink data-icon="inline-end" aria-hidden />
            </Button>
          </>
        )}
      </DialogScrollFooter>
    </>
  );
}

function KpiRail({ row }: { row: RequestRow }) {
  // Inset divider — hairline doesn't reach top/bottom edges, reads
  // lighter than a `divide-x`. Matches CMP-012's main KPI rail.
  const dividerCls =
    'relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-200';
  return (
    <div className="grid grid-cols-4 rounded-sm bg-white shadow-(--shadow-border) overflow-hidden">
      <KpiTile label="Latency" value={row.latency} />
      <div className={dividerCls}>
        <KpiTile label="Cost" value={row.cost} />
      </div>
      <div className={dividerCls}>
        <KpiTile label="Tokens In" value={row.inTokens} />
      </div>
      <div className={dividerCls}>
        <KpiTile label="Tokens Out" value={row.outTokens} />
      </div>
    </div>
  );
}

function KpiTile({ label, value }: { label: string; value: string }) {
  // Tile chrome (border, radius, bg) lives on the parent rail container;
  // each tile is just label + value at consistent padding.
  return (
    <div className="flex flex-col gap-1 px-3 py-3">
      <span className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">
        {label}
      </span>
      <span className="font-mono text-lg font-medium tabular-nums -tracking-[0.5px] text-ink-900">
        {value}
      </span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  // 4-col grid mirrors the KPI rail's `grid-cols-4 gap-3` exactly so the
  // value cell (cols 2–4) starts at the same x as the second stat card.
  // Horizontal padding moves from row-level to cell-level (`pl-4` on label,
  // `pr-4` on value) so the row chrome reads the same as before but the
  // column tracks line up with the rail above.
  // Label is `font-medium text-ink-600` — at `font-normal` it reads as
  // ambient body text rather than a field label.
  return (
    <div className="grid grid-cols-4 gap-3 items-center py-3 border-b border-ink-200 last:border-b-0">
      <span className="font-sans text-sm font-medium text-ink-600 pl-4">{label}</span>
      <div className="col-span-3 pr-4">{value}</div>
    </div>
  );
}

/* Sample turn-by-turn for the Messages tab. Treated as static demo data —
   the row type doesn't carry message payloads. Mirrors the routing-assistant
   scenario from the PM mockup so prompt / tool / response shape is visible.
   Tool function name uses snake_case lowercase to match the Anthropic /
   OpenAI tool-call API convention. */
const SAMPLE_MESSAGES: {
  role: MessageRole;
  tool?: string;
  body: React.ReactNode;
}[] = [
  {
    role: 'system',
    body: 'You are a routing assistant for the eu-payments service. Use the tools provided. Be concise.',
  },
  {
    role: 'user',
    body: 'Why was the SEPA transfer 0x4a3e flagged for review yesterday? Pull the audit reason and route the dispute to the right operator.',
  },
  {
    role: 'tool',
    tool: 'lookup_transfer',
    body: (
      <code className="font-mono text-sm text-ink-900 -tracking-[0.14px] break-all">
        {'{"id":"0x4a3e","amount":"€2,840.12","status":"flagged","reason":"PEP_MATCH"}'}
      </code>
    ),
  },
  {
    role: 'assistant',
    body: 'The SEPA transfer 0x4a3e was flagged because the recipient matched a PEP watchlist entry (sanctioned official, IT). Routing the dispute to compliance-eu-tier2…',
  },
];

function MessagesPanel() {
  return (
    <div className="flex flex-col gap-4">
      {SAMPLE_MESSAGES.map((m, i) => (
        <MessageBlock key={i} role={m.role} tool={m.tool} body={m.body} />
      ))}
    </div>
  );
}

/* Security scan report — every gateway request runs the same set of
   guardrails (prompt-injection, PII, toxicity, model allowlist, spend cap).
   Status is hardcoded `pass` on this demo data; descriptions use live values
   from the row where possible (cost, model, key) so the panel doesn't read
   as decoupled from the selected request. */
function SecurityPanel({ row }: { row: RequestRow }) {
  const checks: {
    title: string;
    description: string;
    status: 'pass';
  }[] = [
    {
      title: 'Prompt injection scan',
      description: 'No injection patterns detected · 0/247 rules matched',
      status: 'pass',
    },
    {
      title: 'PII redaction',
      description: 'No PII detected',
      status: 'pass',
    },
    {
      title: 'Output toxicity',
      description: 'Below threshold (0.04 / 0.7)',
      status: 'pass',
    },
    {
      title: 'Model allowlist',
      description: `${row.model} approved for key ${row.keyId}`,
      status: 'pass',
    },
    {
      title: 'Spend cap',
      description: `Within daily cap · ${row.cost} of $50.00`,
      status: 'pass',
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {checks.map((check) => (
        <SecurityCheckRow key={check.title} {...check} />
      ))}
    </div>
  );
}

function SecurityCheckRow({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: 'pass';
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-sm border border-ink-200 px-4 py-3">
      <div className="flex flex-col gap-1 min-w-0">
        <span className="font-sans text-sm font-medium text-ink-900">{title}</span>
        <span className="font-sans text-xs text-ink-500 text-pretty">{description}</span>
      </div>
      <Badge variant="success">
        <StatusDot kind="success" />
        {status}
      </Badge>
    </div>
  );
}

