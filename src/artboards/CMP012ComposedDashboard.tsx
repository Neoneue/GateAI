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
  Plus,
  Settings2,
  Shield,
  TriangleAlert,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StatusDot } from '@/components/ui/status-dot';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { CompactKpi, CompactSpark } from '@/components/ui/compact-kpi';
import { SegmentedPill } from '@/components/ui/segmented-pill';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  VENDOR_CHART_COLOR_SECONDARY,
  VENDOR_META,
  VendorAvatar,
  type Vendor,
} from '@/components/icons/vendor-meta';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-012 — Composed · Dashboard
 *
 * Production-shell surface composed entirely from primitives that already
 * exist elsewhere in the system:
 *   - KPI rail   →  CompactKpi pattern from CMP-008 (Stat cards)
 *   - Bar chart  →  ComposedChart pattern from CMP-009.1 (Spend trend)
 *   - Audit feed →  table treatment from CMP-010.1 (Data table)
 *
 * The shell itself (sidebar + screen-head) is bespoke to this surface — the
 * 64px icon sidebar isn't part of the system's reusable primitives, so it
 * stays local to this artboard.
 *
 * Color palette: only ink-* / blue-* / semantic vars from index.css.
 * Status pill colors (red/amber for 4xx / 5xx codes) use the destructive
 * and warning semantic vars at low alpha — same approach as CMP-003.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP012ComposedDashboard() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-012"
          title="Composed · Dashboard"
          description="The Overview surface in production frame. Gray content well, white cards — same pattern as Vercel's AI Gateway. Reuses every primitive: KPI cards, charts, banner, codebox."
          parts="1 surface"
        />

        <div className="flex flex-col gap-2.5">
          <SectionHeader
            code="CMP-012.1 — OVERVIEW SURFACE"
            hint="v-shell · gray well · KPI rail · charts · audit feed"
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
    <div className="flex flex-col w-full overflow-hidden rounded-md border border-ink-100 bg-white">
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
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28C840]" aria-hidden />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-ink-600 tabular-nums">
        acme-prod.constellation.io / overview
      </div>
      <div className="ml-auto font-mono uppercase tracking-[0.1em] text-xs text-ink-500">
        DIR.A · OVERVIEW
      </div>
    </div>
  );
}

/* ─── Sidebar (64px icon nav) ────────────────────────────────────────────── */

const NAV_ITEMS_PRIMARY = [
  { id: 'overview',     icon: Home,          label: 'Overview',     active: true  },
  { id: 'models',       icon: Box,           label: 'Model List',   active: false },
  { id: 'keys',         icon: KeyRound,      label: 'API Keys',     active: false },
  { id: 'playground',   icon: Play,          label: 'Playground',   active: false },
  { id: 'requests',     icon: AlignJustify,  label: 'Requests',     active: false },
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

        {/* Separator between brand mark and nav items.
            my-2 compensates for full-bleed brand box and active-state
            highlight on the first nav item; without it, sep1 reads
            tighter than sep2 (which sits between two inset icons). */}
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
                    : 'flex items-center justify-center size-9 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors'
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
                    : 'flex items-center justify-center size-9 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors'
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
        <KpiRail />
        <MiddleRow />
        <RecentRequestsCard />
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
          className="text-ink-400 hover:text-ink-700"
        >
          <PanelLeftOpen className="size-4" strokeWidth={1.75} />
        </Button>
        <span className="font-sans text-xs text-ink-500">All Projects</span>
        <ChevronRight className="size-3 text-ink-300" strokeWidth={1.75} />
        <span className="font-sans text-xs text-ink-500">Constellation Gate</span>
        <ChevronRight className="size-3 text-ink-300" strokeWidth={1.75} />
        <span className="font-sans text-xs font-medium text-ink-900">Overview</span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="border-ink-100 bg-white text-ink-900">
          Docs
        </Button>
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex items-center justify-center size-6 text-ink-500 hover:text-ink-900"
        >
          <Bell className="size-4" strokeWidth={1.75} />
        </button>
        <span className="inline-flex items-center justify-center size-6 ml-2 rounded-full bg-blue-700 text-white font-sans text-xs font-medium">
          CP
        </span>
      </div>
    </div>
  );
}

/* ─── Page header (title + actions) ──────────────────────────────────────── */

function PageHeader() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-sans font-medium text-ink-900 text-4xl/10 -tracking-[1px] m-0">
          Overview
        </h1>
        <p className="font-sans text-ink-400 text-lg/7 -tracking-[0.5px] m-0">
          Traffic, spend and latency across every model on the gateway.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="default">
          <Download data-icon="inline-start" />
          Export
        </Button>
        <Button variant="default" size="default">
          <Plus data-icon="inline-start" />
          Create Key
        </Button>
      </div>
    </div>
  );
}

/* ─── KPI rail (3-up sparkline cards) ────────────────────────────────────── */

function KpiRail() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <CompactKpi
        title="Total Requests"
        value="48,293"
        delta="+8.2%"
        spark={
          <CompactSpark
            colorVar="var(--color-blue-700)"
            data={[6, 12, 10, 16, 20, 18, 26, 24, 28]}
          />
        }
      />
      <CompactKpi
        title="Total Cost"
        value="$1,247.82"
        delta="+12.6%"
        spark={
          <CompactSpark
            colorVar="var(--color-blue-500)"
            data={[8, 10, 12, 16, 18, 20, 25, 22, 24]}
          />
        }
      />
      <CompactKpi
        title="Avg Latency"
        value="1.24 s"
        delta="-3.2%"
        spark={
          <CompactSpark
            colorVar="var(--color-success-2)"
            data={[18, 16, 17, 15, 14, 13, 12, 11, 10]}
            endDot
          />
        }
      />
    </div>
  );
}

/* ─── Middle row (Request Volume bar chart + Top Keys panel) ─────────────── */

function MiddleRow() {
  return (
    <div className="flex gap-3">
      <RequestVolumeCard />
      <TopKeysCard />
    </div>
  );
}

/* ─── Request Volume — grouped bars by model ─────────────────────────────── */

const VOLUME_DATA = [
  { date: 'Apr 21', sonnet: 30, gpt: 24, haiku: 36, llama: 16, mistral: 9 },
  { date: 'Apr 22', sonnet: 33, gpt: 27, haiku: 40, llama: 19, mistral: 11 },
  { date: 'Apr 23', sonnet: 38, gpt: 31, haiku: 47, llama: 22, mistral: 14 },
  { date: 'Apr 24', sonnet: 36, gpt: 33, haiku: 45, llama: 25, mistral: 17 },
  { date: 'Apr 25', sonnet: 46, gpt: 38, haiku: 53, llama: 29, mistral: 20 },
  { date: 'Apr 26', sonnet: 50, gpt: 42, haiku: 56, llama: 31, mistral: 22 },
  { date: 'Apr 27', sonnet: 45, gpt: 36, haiku: 49, llama: 28, mistral: 19 },
];

/* Chart-series → vendor mapping. Each series renders in its vendor's
 * brand `color` from VENDOR_META so the bar visually matches the provider
 * chip elsewhere in the app. When a single vendor appears as more than one
 * series (Anthropic: Sonnet + Haiku), the secondary series opts into
 * VENDOR_CHART_COLOR_SECONDARY for visible separation. */
type ModelSeries = {
  key: 'sonnet' | 'gpt' | 'haiku' | 'llama' | 'mistral';
  label: string;
  vendor: Vendor;
  /** When true, use the vendor's secondary chart shade instead of the primary. */
  useSecondaryShade?: boolean;
};

const MODEL_LEGEND: readonly ModelSeries[] = [
  { key: 'sonnet',  label: 'Claude Sonnet 4.5', vendor: 'anthropic' },
  { key: 'gpt',     label: 'GPT-4o',            vendor: 'openai' },
  { key: 'haiku',   label: 'Claude Haiku',      vendor: 'anthropic', useSecondaryShade: true },
  { key: 'llama',   label: 'Llama 3.3',         vendor: 'meta' },
  { key: 'mistral', label: 'Mistral Large',     vendor: 'mistral' },
] as const;

function seriesColor(series: ModelSeries): string {
  if (series.useSecondaryShade) {
    const secondary = VENDOR_CHART_COLOR_SECONDARY[series.vendor];
    if (secondary) return secondary;
  }
  return VENDOR_META[series.vendor].color;
}

const volumeChartConfig: ChartConfig = Object.fromEntries(
  MODEL_LEGEND.map((m) => [m.key, { label: m.label, color: seriesColor(m) }]),
) as ChartConfig;

const RANGE_OPTIONS = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '60d', label: '60D' },
];

/**
 * RequestVolumeCard — chart-card pattern.
 *
 * Exported so CMP-008c (Cards) can import the same instance — single source
 * of truth, no copy-paste. Built entirely from the shadcn `<Card>` family:
 * header (title + subtitle + range action) → body (legend + bar chart).
 */
export function RequestVolumeCard() {
  const [range, setRange] = useState('7d');
  return (
    <Card className="flex-1 min-w-0 py-5">
      <CardHeader className="px-5">
        <CardTitle className="font-sans text-base font-medium -tracking-[0.25px] text-ink-900">
          Request Volume
        </CardTitle>
        <CardDescription>Grouped by model · Last 7d</CardDescription>
        <CardAction>
          <SegmentedPill
            options={RANGE_OPTIONS}
            value={range}
            onValueChange={setRange}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="px-5 flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5">
          {MODEL_LEGEND.map((m) => (
            <div key={m.key} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-[2px] shrink-0"
                style={{ backgroundColor: seriesColor(m) }}
              />
              <span className="font-sans text-xs text-ink-900">{m.label}</span>
            </div>
          ))}
        </div>

        <ChartContainer
          config={volumeChartConfig}
          className="aspect-auto h-[176px] w-full mt-auto"
        >
          <BarChart
            accessibilityLayer
            data={VOLUME_DATA}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="12%"
            barGap={2}
          >
            <CartesianGrid
              horizontal
              vertical={false}
              stroke="var(--color-ink-100)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              height={28}
              tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 60]}
              ticks={[0, 30, 60]}
              tickFormatter={(v) => `${v}K`}
              tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
              width={36}
            />
            <ChartTooltip
              cursor={{ fill: 'transparent' }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.date ?? ''
                  }
                />
              }
            />
            {MODEL_LEGEND.map((m) => (
              <Bar
                key={m.key}
                dataKey={m.key}
                fill={seriesColor(m)}
                radius={2}
                maxBarSize={8}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

/* ─── Top Keys panel ─────────────────────────────────────────────────────── */

const TOP_KEYS: { label: string; model: string; cost: string; vendor: Vendor }[] = [
  { label: 'Production', model: 'Claude Sonnet 4.5', cost: '$412.30', vendor: 'anthropic' },
  { label: 'Macro Analyst', model: 'GPT-4o', cost: '$287.14', vendor: 'openai' },
  { label: 'Risk Pipeline', model: 'Llama 3.3', cost: '$198.41', vendor: 'meta' },
  { label: 'Development', model: 'Claude Haiku', cost: '$152.88', vendor: 'anthropic' },
  { label: 'Eval Harness', model: 'Gemini 3 Pro', cost: '$89.16', vendor: 'google' },
];

/**
 * TopKeysCard — metric + list pattern.
 *
 * Exported so CMP-008c (Cards) can import the same instance. Built from the
 * shadcn `<Card>` family: header (title + subtitle + overflow action) →
 * body (metric hero + divider + row list).
 */
export function TopKeysCard() {
  return (
    <Card className="w-[410px] shrink-0 gap-5 py-5">
      <CardHeader className="px-5">
        <CardTitle className="font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-900">
          Top Keys
        </CardTitle>
        <CardDescription>By spend · Last 7d</CardDescription>
        <CardAction>
          <button
            type="button"
            aria-label="More"
            className="inline-flex items-center justify-center size-6 rounded-md text-ink-400 hover:text-ink-900 hover:bg-ink-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="3" cy="8" r="1.25" fill="currentColor" />
              <circle cx="8" cy="8" r="1.25" fill="currentColor" />
              <circle cx="13" cy="8" r="1.25" fill="currentColor" />
            </svg>
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-5 flex flex-col gap-5">
        <div className="flex items-baseline gap-2">
          <div className="flex-1 font-mono text-3xl/9 font-medium tabular-nums -tracking-[1px] text-ink-900">
            $1,147.82
          </div>
          <div className="font-sans text-sm -tracking-[0.14px] text-ink-400">
            5 active keys
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 border-t border-ink-100">
          {TOP_KEYS.map((k) => (
            <div key={k.label} className="flex items-center justify-between gap-3">
              <div className="flex items-center min-w-0 gap-2.5">
                <VendorAvatar vendor={k.vendor} />
                <span className="font-sans text-sm font-medium -tracking-[0.14px] text-ink-900">
                  {k.label}
                </span>
                <span className="font-sans text-xs -tracking-[0.14px] text-ink-400">
                  {k.model}
                </span>
              </div>
              <span className="font-mono text-sm font-medium tabular-nums -tracking-[0.14px] text-ink-900">
                {k.cost}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Recent Requests (live-feed table) ──────────────────────────────────── */

type RequestStatus = 'success' | 'warn' | 'danger';

const RECENT_REQUESTS: {
  time: string;
  vendor: Vendor;
  model: string;
  status: RequestStatus;
  code: string;
  tokens: string;
  latency: string;
  cost: string;
}[] = [
  { time: '14:28:04', vendor: 'anthropic', model: 'claude-sonnet-4.8', status: 'success', code: '200',  tokens: '4,051', latency: '1.21s', cost: '$0.028' },
  { time: '14:27:52', vendor: 'openai',    model: 'gpt-5.1',           status: 'success', code: '200',  tokens: '2,847', latency: '0.89s', cost: '$0.019' },
  { time: '14:27:41', vendor: 'xai',       model: 'grok-4.1-fast',     status: 'success', code: '200',  tokens: '6,120', latency: '2.14s', cost: '$0.012' },
  { time: '14:27:30', vendor: 'google',    model: 'gemini-3-pro',      status: 'warn',    code: 'slow', tokens: '1,892', latency: '4.08s', cost: '$0.009' },
  { time: '14:27:18', vendor: 'anthropic', model: 'claude-opus-4.7',   status: 'danger',  code: '500',  tokens: '0',     latency: '0.18s', cost: '$0.000' },
  { time: '14:26:54', vendor: 'meta',      model: 'llama-4.2-405b',    status: 'success', code: '200',  tokens: '3,204', latency: '1.65s', cost: '$0.006' },
];

const STATUS_BADGE: Record<RequestStatus, {
  variant: 'success' | 'warning' | 'destructive';
  dot: 'success' | 'warning' | 'danger';
}> = {
  success: { variant: 'success',     dot: 'success' },
  warn:    { variant: 'warning',     dot: 'warning' },
  danger:  { variant: 'destructive', dot: 'danger'  },
};

function RecentRequestsCard() {
  return (
    <div className="flex flex-col w-full rounded-lg overflow-hidden bg-white border border-ink-100">
      <div className="flex items-center justify-between py-4 px-5">
        <div className="font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-900">
          Recent requests
        </div>
        <Button variant="outline" size="sm">
          View all
          <ChevronRight data-icon="inline-end" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="whitespace-nowrap">Time</TableHead>
            <TableHead className="whitespace-nowrap">Model</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="text-right whitespace-nowrap">Tokens</TableHead>
            <TableHead className="text-right whitespace-nowrap">Latency</TableHead>
            <TableHead className="text-right whitespace-nowrap">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RECENT_REQUESTS.map((row, i) => {
            const badge = STATUS_BADGE[row.status];
            return (
              <TableRow key={`${row.time}-${i}`} className="hover:bg-transparent">
                <TableCell className="whitespace-nowrap font-mono tabular-nums -tracking-[0.14px] text-ink-500">
                  {row.time}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <VendorAvatar vendor={row.vendor} />
                    <span className="font-mono text-sm text-ink-900 -tracking-[0.2px]">
                      {row.model}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={badge.variant}>
                    <StatusDot kind={badge.dot} />
                    {row.code}
                  </Badge>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-900">
                  {row.tokens}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-900">
                  {row.latency}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-900">
                  {row.cost}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
