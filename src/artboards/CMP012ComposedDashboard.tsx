import { useState } from 'react';
import {
  Activity,
  ArrowLeftRight,
  Bell,
  BookOpen,
  Box,
  ChevronRight,
  ChevronsUpDown,
  Coins,
  CreditCard,
  Download,
  Home,
  KeyRound,
  Lock,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
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
import { BrandMark } from '@/components/icons/brand-mark';
import { cn } from '@/lib/utils';
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

export function CMP012ComposedDashboard({
  onNavigate,
  innerSidebarExpanded = false,
  onToggleInnerSidebar,
}: {
  onNavigate?: (pageId: string) => void;
  innerSidebarExpanded?: boolean;
  onToggleInnerSidebar?: () => void;
} = {}) {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-012"
          title="Composed · Dashboard"
          description="The Overview surface in production frame. Gray content well, white cards — same pattern as Vercel's AI Gateway. Reuses every primitive: KPI cards, charts, banner, codebox."
          parts="1 surface"
        />

        <div className="flex flex-col gap-3">
          <SectionHeader
            code="CMP-012.1 — OVERVIEW SURFACE"
            hint="v-shell · gray well · KPI rail · charts · audit feed"
          />

          <DashboardSurface
            onNavigate={onNavigate}
            sidebarExpanded={innerSidebarExpanded}
            onToggleSidebar={onToggleInnerSidebar ?? (() => {})}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── The surface (production frame) ─────────────────────────────────────── */

function DashboardSurface({
  onNavigate,
  sidebarExpanded,
  onToggleSidebar,
}: {
  onNavigate?: (pageId: string) => void;
  sidebarExpanded: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <div className="flex flex-col w-full overflow-hidden rounded-md border border-ink-100 bg-white shadow-xs">
      <ScreenHead />
      <div className="flex flex-row min-h-0">
        <SidebarShell expanded={sidebarExpanded} onNavigate={onNavigate} />
        <DashMain
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={onToggleSidebar}
        />
      </div>
    </div>
  );
}

/* ─── Sidebar shell — width animation + content cross-fade ───────────────
 * Wraps both `DashSidebar` (64px collapsed) and `DashSidebarExpanded`
 * (240px expanded) so the toggle is a smooth 300ms width animation
 * (drawer curve from emil-design-eng) instead of an instant component
 * swap. Both children render absolute-pinned to the top-left; opacity
 * cross-fades them so content morphs in step with the width change.
 *
 * The `transition-[width]` rule does run layout/paint (the skill's
 * "transform + opacity only" bar) — accepted because width is what
 * actually has to change so DashMain reflows. One-shot, not sustained.
 * `motion-reduce:transition-none` honors reduced-motion. */
function SidebarShell({
  expanded,
  onNavigate,
}: {
  expanded: boolean;
  onNavigate?: (pageId: string) => void;
}) {
  return (
    <aside
      aria-label="Primary navigation"
      style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
      className={cn(
        'relative shrink-0 overflow-hidden bg-white border-r border-ink-100 transition-[width] duration-300 motion-reduce:transition-none',
        expanded ? 'w-60' : 'w-16',
      )}
    >
      <div
        aria-hidden={expanded}
        className={cn(
          'absolute inset-y-0 left-0 transition-opacity duration-200 ease-out motion-reduce:transition-none',
          expanded
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100',
        )}
      >
        <DashSidebar onNavigate={onNavigate} />
      </div>
      <div
        aria-hidden={!expanded}
        className={cn(
          'absolute inset-y-0 left-0 transition-opacity duration-200 ease-out motion-reduce:transition-none',
          expanded
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <DashSidebarExpanded onNavigate={onNavigate} />
      </div>
    </aside>
  );
}

/* ─── Screen head (production chrome strip) ──────────────────────────────── */

function ScreenHead() {
  return (
    <div className="relative flex items-center h-[41px] px-4 bg-ink-25 border-b border-ink-100 shrink-0">
      <div className="flex items-center gap-2">
        {/* macOS traffic-lights — tokens live in src/index.css so the
            chrome strip never inlines hex literals. */}
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-red)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-amber)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-green)]" aria-hidden />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-ink-600 tabular-nums">
        acme-prod.constellation.io / overview
      </div>
      <div className="ml-auto font-mono uppercase tracking-[0.1em] text-xs font-medium text-ink-500">
        DIR.A · OVERVIEW
      </div>
    </div>
  );
}

/* ─── Sidebar (collapsed 64px icon rail) ──────────────────────────────────
 * Mirrors `SIDEBAR_SECTIONS` (the expanded nav data) so collapsed and
 * expanded never drift. Section groups are separated by a `<Separator />`
 * since we don't have eyebrow labels at this width. */

function DashSidebar({ onNavigate }: { onNavigate?: (pageId: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-between w-16 h-full py-5 shrink-0">
      <div className="flex flex-col items-center gap-1 w-full">
        <BrandMark className="size-8 text-blue-700" />
        {SIDEBAR_SECTIONS.map((section, i) => (
          <div key={section.label ?? `top-${i}`} className="flex flex-col items-center gap-1 w-full">
            <Separator className={i === 0 ? 'w-8 my-2' : 'w-8 my-1'} />
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={item.pageId ? () => onNavigate?.(item.pageId!) : undefined}
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
        ))}
      </div>
      <div className="flex items-center justify-center size-6 rounded-full bg-blue-700 text-white font-mono text-xs font-medium">
        CP
      </div>
    </div>
  );
}

/* ─── Expanded sidebar (240px full nav) ──────────────────────────────────
 * Sibling of <DashSidebar /> (the 64px icon rail). Toggled via the
 * panel-left button in DashTopBar. Sections use mono-uppercase eyebrow
 * group labels (Eyebrow / sm spec from CMP-000); active item uses the
 * project's white-pill convention (`bg-white border-ink-100 shadow-xs`).
 * No left-edge indicator line — the active pill carries the signal. */

type SidebarItem = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  active?: boolean;
  pageId?: string;
};

type SidebarSection = {
  /** Eyebrow group label; omit for the top section (no header). */
  label?: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    items: [
      { id: 'overview',      icon: Home,           label: 'Overview', active: true,  pageId: 'cmp-012' },
      { id: 'requests',      icon: ArrowLeftRight, label: 'Requests',                pageId: 'cmp-013' },
      { id: 'conversations', icon: MessageSquare,  label: 'Conversations',           pageId: 'cmp-014' },
    ],
  },
  {
    label: 'Gateway',
    items: [
      { id: 'models',         icon: Box,         label: 'Models' },
      { id: 'token-savings',  icon: Coins,       label: 'Token Savings' },
      { id: 'guardrails',     icon: ShieldCheck, label: 'Guardrails' },
    ],
  },
  {
    label: 'Security',
    items: [
      { id: 'security-overview', icon: TriangleAlert, label: 'Overview' },
      { id: 'policies',          icon: Shield,        label: 'Policies' },
      { id: 'events',            icon: Bell,          label: 'Events' },
    ],
  },
  {
    label: 'Audit',
    items: [{ id: 'audit-trail', icon: Lock, label: 'Audit Trail' }],
  },
  {
    label: 'Workspace Admin',
    items: [
      { id: 'activity', icon: Activity,   label: 'Activity' },
      { id: 'team',     icon: Users,      label: 'Team' },
      { id: 'billing',  icon: CreditCard, label: 'Billing' },
      { id: 'api-keys', icon: KeyRound,   label: 'API Keys' },
      { id: 'settings', icon: Settings2,  label: 'Settings' },
    ],
  },
];

function DashSidebarExpanded({ onNavigate }: { onNavigate?: (pageId: string) => void }) {
  return (
    <div className="flex flex-col w-60 h-full shrink-0">
      {/* Brand area — logomark + stacked wordmark (Constellation eyebrow,
          Gate AI title with "AI" in brand-blue). */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-ink-100 shrink-0">
        <BrandMark className="size-8 shrink-0 text-blue-700" />
        <div className="flex flex-col leading-tight min-w-0">
          <span className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">
            Constellation
          </span>
          <span className="font-sans text-base font-medium text-ink-900">
            Gate <span className="text-blue-700">AI</span>
          </span>
        </div>
      </div>

      {/* Workspace switcher */}
      <div className="px-3 py-3 border-b border-ink-100 shrink-0">
        <button
          type="button"
          className="flex items-center justify-between gap-2 w-full p-2 rounded-md border border-ink-100 bg-white hover:bg-ink-25 transition-colors duration-150 ease-out"
        >
          <span className="font-sans text-sm font-medium text-ink-900 truncate min-w-0">
            Chad's project
          </span>
          <div className="shrink-0 flex items-center gap-1.5">
            <span className="inline-flex items-center h-5 px-2 rounded-full bg-blue-50 text-blue-700 font-sans text-xs font-medium">
              Pro
            </span>
            <ChevronsUpDown className="size-4 text-ink-400" strokeWidth={1.75} aria-hidden />
          </div>
        </button>
      </div>

      {/* Nav sections */}
      <nav className="flex flex-col gap-4 px-3 py-3 overflow-y-auto flex-1">
        {SIDEBAR_SECTIONS.map((section, i) => (
          <div key={section.label ?? `top-${i}`} className="flex flex-col gap-1">
            {section.label ? (
              <div className="px-2 pt-1 pb-1 font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">
                {section.label}
              </div>
            ) : null}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={item.active ? 'page' : undefined}
                  onClick={item.pageId ? () => onNavigate?.(item.pageId!) : undefined}
                  className={
                    item.active
                      ? 'flex items-center gap-3 px-2 py-2 rounded-md border border-ink-100 bg-ink-50 text-ink-900 font-medium shadow-xs'
                      : 'flex items-center gap-3 px-2 py-2 rounded-md border border-transparent text-ink-700 hover:text-ink-900 hover:bg-ink-25 transition-colors duration-150 ease-out'
                  }
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  <span className="font-sans text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom user area */}
      <div className="flex items-center justify-between gap-2 px-3 py-3 border-t border-ink-100 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="size-7 shrink-0 rounded-full bg-blue-700" aria-hidden />
          <span className="font-sans text-sm font-medium text-ink-900 truncate">
            Chad
          </span>
        </div>
        <button
          type="button"
          aria-label="User menu"
          className="shrink-0 size-7 inline-flex items-center justify-center rounded-md text-ink-500 hover:text-ink-900 hover:bg-ink-50 transition-colors duration-150 ease-out"
        >
          <MoreHorizontal className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main pane (gray well + content) ────────────────────────────────────── */

function DashMain({
  sidebarExpanded,
  onToggleSidebar,
}: {
  sidebarExpanded: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-ink-25">
      <DashTopBar
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={onToggleSidebar}
      />
      <div className="flex flex-col gap-6 p-6">
        <PageHeader />
        <KpiRail />
        <MiddleRow />
        <RecentRequestsCard />
        <QuickActionsRow />
      </div>
    </div>
  );
}

function DashTopBar({
  sidebarExpanded,
  onToggleSidebar,
}: {
  sidebarExpanded: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <div className="flex items-center justify-between h-[49px] px-6 bg-white border-b border-ink-100 shrink-0">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={sidebarExpanded}
          onClick={onToggleSidebar}
          className="-ml-2 text-ink-400 hover:text-ink-700 aria-expanded:bg-transparent aria-expanded:text-ink-400 hover:aria-expanded:text-ink-700"
        >
          {sidebarExpanded ? (
            <PanelLeftClose className="size-4" strokeWidth={1.75} />
          ) : (
            <PanelLeftOpen className="size-4" strokeWidth={1.75} />
          )}
        </Button>
        <span className="font-sans text-xs text-ink-500">All Projects</span>
        <ChevronRight className="size-3 text-ink-300" strokeWidth={1.75} aria-hidden />
        <span className="font-sans text-xs text-ink-500">Constellation Gate AI</span>
        <ChevronRight className="size-3 text-ink-300" strokeWidth={1.75} aria-hidden />
        <span aria-current="page" className="font-sans text-xs font-medium text-ink-900">Overview</span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="border-ink-100 bg-white text-ink-900">
          Docs
        </Button>
        {/* Skill: surfaces.md — promote to Button `icon-sm` so the hit
            target jumps from 24px to 32px without colliding with the
            adjacent Docs button (gap-1 = 4px) or the avatar span. */}
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

/* ─── Page header (title + actions) ──────────────────────────────────────── */

function PageHeader() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] m-0">
          Overview
        </h1>
        <p className="font-sans text-ink-400 text-base tracking-tight m-0">
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
  // Single bordered row with equal fourths. Dividers between sections are
  // `before:` pseudo-elements at `inset-y-4` so the hairline doesn't reach
  // the rounded corners or the spark's lower edge — reads lighter than a
  // full-height `divide-x` and signals "section break inside one container"
  // instead of "spreadsheet column."
  const dividerCls =
    'relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-100';
  return (
    <div className="grid grid-cols-4 rounded-md bg-white border border-ink-100 shadow-xs overflow-hidden">
      <CompactKpi
        flat
        title="Total Requests"
        value="48,293"
        delta="+8.2%"
        spark={
          <CompactSpark
            colorVar="var(--color-ink-400)"
            data={[6, 12, 10, 16, 20, 18, 26, 24, 28]}
          />
        }
      />
      <div className={dividerCls}>
        <CompactKpi
          flat
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
      </div>
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Avg Latency"
          value="1.24 s"
          delta="-3.2%"
          spark={
            <CompactSpark
              colorVar="var(--color-warning-2)"
              data={[18, 16, 17, 15, 14, 13, 12, 11, 10]}
              endDot
            />
          }
        />
      </div>
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Total Tokens"
          value="18.4 M"
          delta="+8.7%"
          spark={
            <CompactSpark
              colorVar="var(--color-success-2)"
              data={[10, 11, 13, 14, 16, 15, 17, 18, 18]}
            />
          }
        />
      </div>
    </div>
  );
}

/* ─── Middle row (Request Volume bar chart + Top Keys panel) ─────────────── */

function MiddleRow() {
  return (
    <div className="grid grid-cols-3 gap-3">
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
  /** When set, overrides the vendor brand color entirely. Use a token
   *  (`var(--color-ink-400)`) when a series should sit outside the vendor
   *  palette — e.g., to keep the chart from reading too rainbow. */
  colorOverride?: string;
};

const MODEL_LEGEND: readonly ModelSeries[] = [
  { key: 'sonnet',  label: 'Claude Sonnet 4.5', vendor: 'anthropic' },
  { key: 'gpt',     label: 'GPT-4o',            vendor: 'openai',    colorOverride: 'var(--color-ink-400)' },
  { key: 'haiku',   label: 'Claude Haiku',      vendor: 'anthropic', useSecondaryShade: true },
  { key: 'llama',   label: 'Llama 3.3',         vendor: 'meta' },
  { key: 'mistral', label: 'Mistral Large',     vendor: 'mistral' },
] as const;

function seriesColor(series: ModelSeries): string {
  if (series.colorOverride) return series.colorOverride;
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
    <Card className="col-span-2 min-w-0">
      <CardHeader>
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

      <CardContent className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
          {MODEL_LEGEND.map((m) => (
            <div key={m.key} className="flex items-center gap-2">
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
    <Card className="min-w-0 gap-2">
      <CardHeader>
        <CardTitle className="font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-900">
          Top Keys
        </CardTitle>
        <CardDescription>By spend · Last 7d</CardDescription>
        <CardAction>
          {/* Skill: surfaces.md — pseudo-element extends 24px button to a
              proper hit area; skill: performance.md — explicit transition. */}
          <button
            type="button"
            aria-label="More"
            className="relative inline-flex items-center justify-center size-6 rounded-md text-ink-400 transition-colors duration-150 ease-out hover:text-ink-900 hover:bg-ink-50 after:absolute after:-inset-2 after:content-['']"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="3" cy="8" r="1.25" fill="currentColor" />
              <circle cx="8" cy="8" r="1.25" fill="currentColor" />
              <circle cx="13" cy="8" r="1.25" fill="currentColor" />
            </svg>
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="font-mono text-2xl/8 font-medium tabular-nums -tracking-[0.5px] text-ink-900">
          $1,147.82
        </div>

        <div className="flex flex-col gap-4 pt-3 border-t border-ink-100">
          {TOP_KEYS.map((k) => (
            <div key={k.label} className="flex items-center justify-between gap-3">
              <div className="flex items-center min-w-0 gap-2">
                <VendorAvatar vendor={k.vendor} tone="neutral" />
                <span className="font-sans text-sm font-medium -tracking-[0.14px] text-ink-900">
                  {k.label}
                </span>
              </div>
              <span className="font-mono text-sm tabular-nums -tracking-[0.14px] text-ink-900">
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

// Skill: surfaces.md — RecentRequestsCard is hand-rolled (the table needs
// no card padding so we don't use <Card>) but it should still wear the
// hairline shadow + border that the Card primitive now ships with so the
// dashboard's two surfaces read as the same depth tier.
export function RecentRequestsCard() {
  return (
    <div className="flex flex-col w-full rounded-md overflow-hidden bg-white border border-ink-100 shadow-xs">
      <div className="flex items-center justify-between py-3 px-4">
        <h3 className="font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-900 m-0">
          Recent Requests
        </h3>
        <Button variant="ghost" size="sm" className="text-ink-500 hover:text-ink-900 -mr-2">
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
                  <div className="flex items-center gap-2">
                    <VendorAvatar vendor={row.vendor} tone="neutral" />
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
                <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-800">
                  {row.tokens}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-800">
                  {row.latency}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-800">
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

/* ─── Quick Actions card ─────────────────────────────────────────────────
 * Single bordered card with a "Quick actions" header and 4 task items
 * inside, divided by hairline `before:` pseudo-elements (same pattern
 * as the consolidated KPI rail). One unified section instead of 4
 * floating cards. */

type QuickAction = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  subtitle: string;
  /** Subtle brand-blue accent for the focal action (e.g. Upgrade). Tints
   *  the section bg + icon chip without going fully inverted — keeps the
   *  page's operator-tool register quiet rather than marketing-loud. */
  accent?: boolean;
};

const QUICK_ACTIONS: QuickAction[] = [
  { icon: RefreshCw,  title: 'Rotate API key',         subtitle: 'Last rotated 6.2 days ago' },
  { icon: Sparkles,   title: 'Upgrade to Enterprise',  subtitle: 'Unlock custom rate limits', accent: true },
  { icon: Shield,     title: 'Review security events', subtitle: '3 events in the last hour' },
  { icon: BookOpen,   title: 'Read integration guide', subtitle: 'SDK quickstart' },
];

function QuickActionsRow() {
  // Inset divider — hairline doesn't reach top/bottom edges; reads
  // lighter than a `divide-x`. Matches the KPI rail treatment.
  const dividerCls =
    'relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-100';
  return (
    <div className="rounded-md border border-ink-100 bg-white shadow-xs overflow-hidden">
      <div className="flex items-center py-3 px-4 border-b border-ink-100">
        <h3 className="font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-900 m-0">
          Quick Actions
        </h3>
      </div>
      <div className="grid grid-cols-4">
        <QuickActionItem {...QUICK_ACTIONS[0]} />
        <div className={dividerCls}>
          <QuickActionItem {...QUICK_ACTIONS[1]} />
        </div>
        <div className={dividerCls}>
          <QuickActionItem {...QUICK_ACTIONS[2]} />
        </div>
        <div className={dividerCls}>
          <QuickActionItem {...QUICK_ACTIONS[3]} />
        </div>
      </div>
    </div>
  );
}

function QuickActionItem({ icon: Icon, title, subtitle, accent }: QuickAction) {
  const sectionCls = accent
    ? 'bg-blue-50 hover:bg-blue-100/70'
    : 'bg-white hover:bg-ink-25';
  const chipCls = accent
    ? 'bg-blue-100 text-blue-700'
    : 'bg-ink-50 text-ink-700';
  return (
    <button
      type="button"
      className={`w-full flex items-center gap-3 p-4 text-left transition-colors duration-150 ease-out ${sectionCls}`}
    >
      <span
        className={`shrink-0 size-8 inline-flex items-center justify-center rounded-md ${chipCls}`}
      >
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="font-sans text-sm font-medium text-ink-900 truncate">
          {title}
        </span>
        <span className="font-sans text-xs text-ink-500 truncate">
          {subtitle}
        </span>
      </div>
      <ChevronRight className="shrink-0 size-4 text-ink-400" strokeWidth={1.75} />
    </button>
  );
}
