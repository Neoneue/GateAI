import { useState } from 'react';
import {
  AlignJustify,
  Bell,
  Box,
  ChevronRight,
  Database,
  Download,
  Home,
  KeyRound,
  LineChart,
  PanelLeftOpen,
  Play,
  Search,
  Settings2,
  Shield,
  TriangleAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';
import { SegmentedPill } from '@/components/ui/segmented-pill';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { StatusDot } from '@/components/ui/status-dot';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { VendorAvatar, type Vendor } from '@/components/icons/vendor-meta';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

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
 * Column alignment: all left-aligned per the recent CMP-011 convention —
 * `font-mono tabular-nums` on numerics so columns visually align without
 * the `text-right` mismatch.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP013Requests() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
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

          <DashboardSurface />
        </div>
      </div>
    </div>
  );
}

/* ─── The surface (production frame) ─────────────────────────────────────── */

function DashboardSurface() {
  return (
    <div className="flex flex-col w-full overflow-hidden rounded-md border border-ink-100 bg-white shadow-xs">
      <ScreenHead />
      <div className="flex flex-row min-h-0">
        <DashSidebar />
        <DashMain />
      </div>
    </div>
  );
}

/* ─── Screen head (production chrome strip) ──────────────────────────────── */

function ScreenHead() {
  return (
    <div className="relative flex items-center h-[41px] px-4 bg-ink-25 border-b border-ink-100 shrink-0">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-red)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-amber)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-green)]" aria-hidden />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-ink-600 tabular-nums">
        acme-prod.constellation.io / requests
      </div>
      <div className="ml-auto font-mono uppercase tracking-[0.1em] text-xs text-ink-500">
        DIR.A · REQUESTS
      </div>
    </div>
  );
}

/* ─── Sidebar (64px icon nav) ────────────────────────────────────────────── */

const NAV_ITEMS_PRIMARY = [
  { id: 'overview',     icon: Home,          label: 'Overview',     active: false },
  { id: 'models',       icon: Box,           label: 'Model List',   active: false },
  { id: 'keys',         icon: KeyRound,      label: 'API Keys',     active: false },
  { id: 'playground',   icon: Play,          label: 'Playground',   active: false },
  { id: 'requests',     icon: AlignJustify,  label: 'Requests',     active: true  },
  { id: 'leaderboards', icon: LineChart,     label: 'Leaderboards', active: false },
  { id: 'audit',        icon: Shield,        label: 'Audit Trail',  active: false },
] as const;

const NAV_ITEMS_SECONDARY = [
  { id: 'security',  icon: TriangleAlert, label: 'Security',  active: false },
  { id: 'templates', icon: Database,      label: 'Templates', active: false },
  { id: 'settings',  icon: Settings2,     label: 'Settings',  active: false },
] as const;

function DashSidebar() {
  return (
    <div className="flex flex-col items-center justify-between w-16 py-5 bg-white border-r border-ink-100 shrink-0">
      <div className="flex flex-col items-center gap-2">
        {/* Brand mark */}
        <div className="flex items-center justify-center size-8 rounded-lg bg-blue-700">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="8" cy="8" r="2" fill="#FFFFFF" />
          </svg>
        </div>

        <Separator className="w-8 my-2" />

        {/* Primary nav group */}
        <div className="flex flex-col items-center gap-1">
          {NAV_ITEMS_PRIMARY.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
                className={
                  item.active
                    ? 'flex items-center justify-center size-9 rounded-lg bg-ink-100 text-ink-900'
                    : 'flex items-center justify-center size-9 rounded-lg text-ink-400 transition-colors duration-150 ease-out hover:text-ink-700 hover:bg-ink-50'
                }
              >
                <Icon className="size-[18px]" strokeWidth={1.5} />
              </button>
            );
          })}
        </div>

        <Separator className="w-8" />

        {/* Secondary nav group */}
        <div className="flex flex-col items-center gap-1">
          {NAV_ITEMS_SECONDARY.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
                className={
                  item.active
                    ? 'flex items-center justify-center size-9 rounded-lg bg-ink-100 text-ink-900'
                    : 'flex items-center justify-center size-9 rounded-lg text-ink-400 transition-colors duration-150 ease-out hover:text-ink-700 hover:bg-ink-50'
                }
              >
                <Icon className="size-[18px]" strokeWidth={1.5} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Avatar pinned to bottom */}
      <div className="flex items-center justify-center size-6 rounded-full bg-blue-700 text-white font-mono text-xs font-medium">
        CP
      </div>
    </div>
  );
}

/* ─── Main pane (gray well + content) ────────────────────────────────────── */

function DashMain() {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-ink-25">
      <DashTopBar />
      <div className="flex flex-col gap-6 p-6">
        <PageHeader />
        <HeroMetricCard />
        <RequestsTableSection />
      </div>
    </div>
  );
}

function DashTopBar() {
  return (
    <div className="flex items-center justify-between h-[49px] px-6 bg-white border-b border-ink-100 shrink-0">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Expand sidebar"
          className="-ml-2 text-ink-400 hover:text-ink-700"
        >
          <PanelLeftOpen className="size-4" strokeWidth={1.75} />
        </Button>
        <span className="font-sans text-xs text-ink-500">All Projects</span>
        <ChevronRight className="size-3 text-ink-300" strokeWidth={1.75} aria-hidden />
        <span className="font-sans text-xs text-ink-500">Constellation Gate AI</span>
        <ChevronRight className="size-3 text-ink-300" strokeWidth={1.75} aria-hidden />
        <span aria-current="page" className="font-sans text-xs font-medium text-ink-900">Requests</span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="border-ink-100 bg-white text-ink-900">
          Docs
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Notifications"
          className="text-ink-500 hover:text-ink-900"
        >
          <Bell className="size-4" strokeWidth={1.75} />
        </Button>
        <span className="inline-flex items-center justify-center size-6 ml-2 rounded-full bg-blue-700 text-white font-sans text-xs font-medium">
          CP
        </span>
      </div>
    </div>
  );
}

/* ─── Page header (eyebrow + title + actions) ────────────────────────────── */

function PageHeader() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] m-0">
          Requests
        </h1>
        <p className="font-sans text-ink-400 text-base tracking-tight m-0 max-w-[640px]">
          Every generation routed through the gateway. Click a row to inspect prompts, security scans and the audit anchor. Group by conversation to follow a chain of calls.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Button variant="outline" size="default">
          <Download data-icon="inline-start" />
          Export CSV
        </Button>
        <Button variant="default" size="default">
          <Play data-icon="inline-start" />
          Replay
        </Button>
      </div>
    </div>
  );
}

/* ─── Hero metric (REQUESTS / 1H + line chart + breakdown) ───────────────── */

// 61 minute-bucketed points spanning the trailing hour 13:30 → 14:30
// inclusive. The chart shows the running total of requests, climbing from
// 0 to the headline 8,241 by 14:30. Per-minute increments below preserve
// the original ramping shape; HERO_DATA scales them so the running sum
// lands exactly at HERO_TOTAL.
const HERO_INCREMENTS = [
  4, 5, 4, 6, 5, 7, 6, 8, 7, 9,
  8, 11, 10, 12, 11, 13, 12, 15, 14, 18,
  16, 20, 18, 22, 20, 25, 23, 27, 25, 30,
  28, 33, 30, 36, 32, 38, 34, 40, 36, 42,
  38, 44, 40, 46, 42, 48, 44, 50, 46, 52,
  48, 54, 50, 55, 52, 57, 54, 58, 56, 60, 62,
];
const HERO_TOTAL = 8241;
const HERO_INCREMENT_SUM = HERO_INCREMENTS.reduce((a, b) => a + b, 0);

const HERO_DATA = (() => {
  let running = 0;
  return HERO_INCREMENTS.map((inc, i) => {
    running += inc;
    // i=0 → 13:30, i=60 → 14:30 — labels printed `H:MM` (24h, no leading zero).
    const minute = 30 + i;
    const hh = Math.floor(13 + minute / 60);
    const mm = minute % 60;
    return {
      time: `${hh}:${mm.toString().padStart(2, '0')}`,
      requests: Math.round((running / HERO_INCREMENT_SUM) * HERO_TOTAL),
    };
  });
})();

const HERO_TICKS = ['13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30'];

const heroChartConfig = {
  requests: {
    label: 'Requests',
    color: 'var(--color-blue-700)',
  },
} satisfies ChartConfig;

function HeroMetricCard() {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white border border-ink-100 shadow-xs px-5 py-5">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2 shrink-0">
          <div className="font-mono uppercase tracking-[0.1em] text-xs text-ink-500">
            REQUESTS / 1H
          </div>
          <div className="flex items-baseline gap-3">
            <div className="font-mono text-3xl/9 font-medium tabular-nums -tracking-[1px] text-ink-900">
              8,241
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-sm font-medium tabular-nums tracking-tight text-success-2">
              +12.8%
              <span className="font-sans font-normal text-ink-400 -tracking-[0.14px]">vs last hour</span>
            </span>
          </div>
        </div>

        {/* Right-aligned mono breakdown */}
        <div className="flex flex-col gap-1.5 shrink-0 text-right">
          <BreakdownRow label="Success" value="8,182" tone="success" />
          <BreakdownRow label="Errors"  value="47"    tone="danger" />
          <BreakdownRow label="Slow >1s" value="12"   tone="warning" />
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
          {/* Domain ceiling 8,500 gives ~3px of headroom above the 8k gridline so the
              cumulative line (peaks at 8,241) isn't clipped by the chart rect top. */}
          <YAxis
            width={0}
            tick={false}
            axisLine={false}
            tickLine={false}
            domain={[0, 8500]}
            ticks={[0, 2000, 4000, 6000, 8000]}
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
                  fill="var(--color-ink-400)"
                >
                  {value}
                </text>
              );
            }}
          />
          <ChartTooltip
            cursor={{ stroke: 'var(--color-ink-300)', strokeDasharray: '2 3' }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="requests"
            type="monotone"
            stroke="var(--color-blue-700)"
            strokeWidth={1.5}
            fill="url(#cmp013-hero-spark)"
            isAnimationActive={false}
          />
          {/* ChartContainer is pinned to h-24 (96px); XAxis height=24 + margin top=4
              gives a drawing rect from y=4 to y=72 (68px tall). With domain [0, 8500],
              gridlines at 0/2k/4k/6k/8k land at y = 72, 56, 40, 24, 8 respectively.
              Hardcoded because YAxis width={0} disables tick-driven grid generation. */}
          <CartesianGrid
            horizontal
            vertical={false}
            horizontalPoints={[8, 24, 40, 56, 72]}
            stroke="var(--color-ink-200)"
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
    tone === 'success' ? 'bg-success'
    : tone === 'danger' ? 'bg-destructive'
    : 'bg-warning';
  return (
    <div className="inline-flex items-center justify-end gap-2">
      <span className="font-sans text-xs text-ink-500 -tracking-[0.12px]">{label}</span>
      <span className={`size-1.5 rounded-full ${dotColor}`} aria-hidden />
      <span className="font-mono text-xs font-medium tabular-nums text-ink-900 min-w-[3.5ch]">
        {value}
      </span>
    </div>
  );
}

/* ─── Table section (toolbar + table in one card · pagination below) ─────
 *
 * Shape lifted from CMP-011.1 (SORTABLE TABLE):
 *   <div rounded-md bg-white border …>      ← single card
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
  { value: '5m',  label: '5m'  },
  { value: '1h',  label: '1h'  },
  { value: '24h', label: '24h' },
  { value: '7d',  label: '7d'  },
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
  { time: '14:29:51', status: 'success', code: '200', vendor: 'openai',    model: 'gpt-5',             conversation: 'cnv_aurora_42',  keyId: 'prod-web',   inTokens: '1,892', outTokens: '955',   latency: '0.96s',             cost: '$0.0192' },
  { time: '14:29:23', status: 'success', code: '200', vendor: 'anthropic', model: 'claude-sonnet-4.8', conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '1,420', outTokens: '2,008', latency: '2.14s', slow: true,  cost: '$0.0312' },
  { time: '14:28:48', status: 'success', code: '200', vendor: 'google',    model: 'gemini-3-pro',      conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '1,204', outTokens: '688',   latency: '1.08s', slow: true,  cost: '$0.0091' },
  { time: '14:28:09', status: 'danger',  code: '500', vendor: 'anthropic', model: 'claude-opus-4.7',   conversation: 'cnv_meridian_07',keyId: 'prod-web',   inTokens: '—',     outTokens: '—',     latency: '—',                 cost: '—'       },
  { time: '14:27:42', status: 'success', code: '200', vendor: 'meta',      model: 'llama-4-405b',      conversation: 'cnv_orion_70',   keyId: 'dev',        inTokens: '5,024', outTokens: '2,612', latency: '1.95s', slow: true,  cost: '$0.0068' },
  { time: '14:27:11', status: 'success', code: '200', vendor: 'mistral',   model: 'mistral-large-3',   conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '1,442', outTokens: '820',   latency: '0.91s',             cost: '$0.0072' },
  { time: '14:26:52', status: 'warn',    code: '429', vendor: 'openai',    model: 'gpt-5',             conversation: 'cnv_meridian_07',keyId: 'prod-web',   inTokens: '—',     outTokens: '—',     latency: '0.18s',             cost: '$0.0000' },
  { time: '14:26:14', status: 'success', code: '200', vendor: 'anthropic', model: 'claude-sonnet-4.8', conversation: 'cnv_skylark_18', keyId: 'prod-agent', inTokens: '3,104', outTokens: '1,420', latency: '1.31s', slow: true,  cost: '$0.0315' },
  { time: '14:25:47', status: 'success', code: '200', vendor: 'xai',       model: 'grok-4.1-fast',     conversation: 'cnv_polaris_55', keyId: 'prod-web',   inTokens: '6,204', outTokens: '3,109', latency: '0.42s',             cost: '$0.0184' },
  { time: '14:25:10', status: 'success', code: '200', vendor: 'google',    model: 'gemini-3-pro',      conversation: 'cnv_aurora_42',  keyId: 'prod-web',   inTokens: '942',   outTokens: '517',   latency: '0.74s',             cost: '$0.0062' },
  { time: '14:24:38', status: 'warn',    code: '408', vendor: 'meta',      model: 'llama-4-405b',      conversation: 'cnv_polaris_55', keyId: 'dev',        inTokens: '4,108', outTokens: '0',     latency: '8.04s', slow: true,  cost: '$0.0000' },
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

function RequestsTableSection() {
  const [range, setRange] = useState('1h');
  const [model, setModel] = useState('all');
  const [keyId, setKeyId] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('25');

  return (
    <div className="flex flex-col w-full rounded-md overflow-hidden bg-white border border-ink-100 shadow-xs">
        {/* Toolbar — shape lifted from CMP-011.1. No flex-wrap: the
            sortable-table convention is single-row, and the filter set
            fits in the gray well at this width. */}
        <div className="flex items-center gap-2 py-3 px-5">
          <div className="relative w-60 min-w-0 shrink-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-ink-500"
              strokeWidth={1.75}
              aria-hidden
            />
            <Input
              size="sm"
              placeholder="Search request…"
              className="pl-8"
              aria-label="Search requests"
            />
          </div>

          <SegmentedPill
            size="sm"
            value={range}
            onValueChange={setRange}
            options={RANGE_OPTIONS}
            aria-label="Time range"
          />

          <div className="grow" />

          <Select value={model} onValueChange={setModel}>
            <SelectTrigger
              size="sm"
              aria-label="Model"
              className="border-ink-100 bg-white text-ink-900 font-normal"
            >
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All models</SelectItem>
              <SelectItem value="claude-sonnet-4.8">claude-sonnet-4.8</SelectItem>
              <SelectItem value="gpt-5">gpt-5</SelectItem>
              <SelectItem value="gemini-3-pro">gemini-3-pro</SelectItem>
              <SelectItem value="llama-4-405b">llama-4-405b</SelectItem>
              <SelectItem value="grok-4.1-fast">grok-4.1-fast</SelectItem>
              <SelectItem value="mistral-large-3">mistral-large-3</SelectItem>
            </SelectContent>
          </Select>

          <Select value={keyId} onValueChange={setKeyId}>
            <SelectTrigger
              size="sm"
              aria-label="Key"
              className="border-ink-100 bg-white text-ink-900 font-normal"
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
              className="border-ink-100 bg-white text-ink-900 font-normal"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="200">200 OK</SelectItem>
              <SelectItem value="4xx">4xx</SelectItem>
              <SelectItem value="5xx">5xx</SelectItem>
              <SelectItem value="slow">Slow &gt; 1s</SelectItem>
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
              <TableHead className="whitespace-nowrap">In</TableHead>
              <TableHead className="whitespace-nowrap">Out</TableHead>
              <TableHead className="whitespace-nowrap">Latency</TableHead>
              <TableHead className="whitespace-nowrap">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REQUEST_ROWS.map((row, i) => {
              const badge = STATUS_BADGE[row.status];
              const isMissing = row.inTokens === '—';
              const numericCls = isMissing
                ? 'whitespace-nowrap font-mono tabular-nums text-ink-300'
                : 'whitespace-nowrap font-mono tabular-nums text-ink-900';
              const latencyCls =
                row.latency === '—'
                  ? 'whitespace-nowrap font-mono tabular-nums text-ink-300'
                  : row.slow
                    ? 'whitespace-nowrap font-mono tabular-nums text-warning'
                    : 'whitespace-nowrap font-mono tabular-nums text-ink-900';
              return (
                <TableRow key={`${row.time}-${i}`} className="cursor-pointer">
                  <TableCell className="whitespace-nowrap font-mono tabular-nums -tracking-[0.14px] text-ink-500">
                    {row.time}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={badge.variant}>
                      <StatusDot kind={badge.dot} />
                      {row.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <VendorAvatar vendor={row.vendor} tone="neutral" />
                      <span className="font-mono text-sm text-ink-900 -tracking-[0.2px]">
                        {row.model}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-mono tabular-nums -tracking-[0.14px] text-ink-600">
                    {row.conversation}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-mono text-ink-600 -tracking-[0.14px]">
                    {row.keyId}
                  </TableCell>
                  <TableCell className={numericCls}>{row.inTokens}</TableCell>
                  <TableCell className={numericCls}>{row.outTokens}</TableCell>
                  <TableCell className={latencyCls}>{row.latency}</TableCell>
                  <TableCell className={numericCls}>{row.cost}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination footer — bottom row of the card */}
        <div className="flex items-center justify-between gap-3 py-3 px-5 border-t border-ink-100">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ink-500 tabular-nums -tracking-[0.01em]">
              Showing 1–25 of 8,241
            </span>
            <span className="text-ink-300" aria-hidden>·</span>
            <span className="font-mono text-xs text-ink-500 -tracking-[0.01em]">Rows</span>
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger
                size="sm"
                aria-label="Rows per page"
                className="border-ink-100 bg-white text-ink-900 font-normal"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Pagination className="mx-0 w-fit justify-end">
          <PaginationContent className="gap-1">
            {[1, 2, 3].map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  isActive={page === n}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(n);
                  }}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={page === 330}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(330);
                }}
              >
                330
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(330, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
