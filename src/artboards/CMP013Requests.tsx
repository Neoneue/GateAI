import { useState } from 'react';
import {
  Activity,
  ArrowLeftRight,
  Bell,
  Box,
  ChevronRight,
  ChevronsUpDown,
  Coins,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Home,
  KeyRound,
  Lock,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings2,
  Shield,
  ShieldCheck,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
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
import { BrandMark } from '@/components/icons/brand-mark';
import { DeltaTag } from '@/components/ui/compact-kpi';
import { cn } from '@/lib/utils';
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
    <div className="flex flex-col w-full overflow-hidden rounded-sm bg-white shadow-(--shadow-border)">
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
        'relative shrink-0 overflow-hidden bg-white border-r border-ink-200 transition-[width] duration-300 motion-reduce:transition-none',
        expanded ? 'w-60' : 'w-16',
      )}
    >
      <div
        aria-hidden={expanded}
        className={cn(
          'absolute inset-y-0 left-0 transition-opacity duration-200 ease-out motion-reduce:transition-none',
          expanded ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
      >
        <DashSidebar onNavigate={onNavigate} />
      </div>
      <div
        aria-hidden={!expanded}
        className={cn(
          'absolute inset-y-0 left-0 transition-opacity duration-200 ease-out motion-reduce:transition-none',
          expanded ? 'opacity-100' : 'opacity-0 pointer-events-none',
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
    <div className="relative flex items-center h-[41px] px-4 bg-ink-50 border-b border-ink-200 shrink-0">
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-red)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-amber)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-traffic-green)]" aria-hidden />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-ink-600 tabular-nums">
        acme-prod.constellation.io / requests
      </div>
      <div className="ml-auto font-mono uppercase tracking-[0.1em] text-xs font-medium text-ink-500">
        DIR.A · REQUESTS
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
                      ? 'flex items-center justify-center size-9 rounded-sm bg-ink-200 text-ink-900'
                      : 'flex items-center justify-center size-9 rounded-sm text-ink-500 transition-colors duration-150 ease-out hover:text-ink-700 hover:bg-ink-100'
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

/* ─── Sidebar (expanded 240px full nav) ───────────────────────────────── */

type SidebarItem = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  active?: boolean;
  pageId?: string;
};

type SidebarSection = {
  label?: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    items: [
      { id: 'overview',      icon: Home,           label: 'Overview',                 pageId: 'cmp-012' },
      { id: 'requests',      icon: ArrowLeftRight, label: 'Requests', active: true,   pageId: 'cmp-013' },
      { id: 'conversations', icon: MessageSquare,  label: 'Conversations',            pageId: 'cmp-014' },
    ],
  },
  {
    label: 'Gateway',
    items: [
      { id: 'models',        icon: Box,         label: 'Models' },
      { id: 'token-savings', icon: Coins,       label: 'Token Savings' },
      { id: 'guardrails',    icon: ShieldCheck, label: 'Guardrails' },
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
      <div className="flex items-center gap-3 px-4 py-4 border-b border-ink-200 shrink-0">
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
      <div className="px-3 py-3 border-b border-ink-200 shrink-0">
        <button
          type="button"
          className="flex items-center justify-between gap-2 w-full p-2 rounded-sm border border-ink-200 bg-white hover:bg-ink-50 transition-colors duration-150 ease-out"
        >
          <span className="font-sans text-sm font-medium text-ink-900 truncate min-w-0">
            Chad's project
          </span>
          <div className="shrink-0 flex items-center gap-1.5">
            <span className="inline-flex items-center h-5 px-2 rounded-full bg-blue-50 text-blue-700 font-sans text-xs font-medium">
              Pro
            </span>
            <ChevronsUpDown className="size-4 text-ink-500" strokeWidth={1.75} aria-hidden />
          </div>
        </button>
      </div>
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
                      ? 'flex items-center gap-3 px-2 py-2 rounded-sm border border-ink-200 bg-ink-100 text-ink-900 font-medium shadow-xs'
                      : 'flex items-center gap-3 px-2 py-2 rounded-sm border border-transparent text-ink-700 hover:text-ink-900 hover:bg-ink-50 transition-colors duration-150 ease-out'
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
      <div className="flex items-center justify-between gap-2 px-3 py-3 border-t border-ink-200 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="size-7 shrink-0 rounded-full bg-blue-700" aria-hidden />
          <span className="font-sans text-sm font-medium text-ink-900 truncate">
            Chad
          </span>
        </div>
        <button
          type="button"
          aria-label="User menu"
          className="shrink-0 size-7 inline-flex items-center justify-center rounded-sm text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition-colors duration-150 ease-out"
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
    <div className="flex flex-col flex-1 min-w-0 bg-ink-50">
      <DashTopBar
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={onToggleSidebar}
      />
      <div className="flex flex-col gap-6 p-6">
        <PageHeader />
        <HeroMetricCard />
        <RequestsTableSection />
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
    <div className="flex items-center justify-between h-[49px] px-6 bg-white border-b border-ink-200 shrink-0">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={sidebarExpanded}
          onClick={onToggleSidebar}
          className="-ml-2 text-ink-500 hover:text-ink-700 aria-expanded:bg-transparent aria-expanded:text-ink-500 hover:aria-expanded:text-ink-700"
        >
          {/* Skill: animations.md — contextual icon cross-fade. Both icons stay
              in DOM, absolute-positioned over each other; toggle scale/opacity/blur
              with the skill's exact values (0.25→1, 0→1, 4px→0). */}
          <span className="relative inline-flex size-4 items-center justify-center">
            <PanelLeftClose
              aria-hidden
              strokeWidth={1.75}
              className={cn(
                'absolute size-4 transition-[opacity,transform,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
                sidebarExpanded
                  ? 'opacity-100 scale-100 blur-0'
                  : 'opacity-0 scale-[0.25] blur-[4px]',
              )}
            />
            <PanelLeftOpen
              aria-hidden
              strokeWidth={1.75}
              className={cn(
                'absolute size-4 transition-[opacity,transform,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none',
                sidebarExpanded
                  ? 'opacity-0 scale-[0.25] blur-[4px]'
                  : 'opacity-100 scale-100 blur-0',
              )}
            />
          </span>
        </Button>
        <span className="font-sans text-xs text-ink-500">All Projects</span>
        <ChevronRight className="size-3 text-ink-400" strokeWidth={1.75} aria-hidden />
        <span className="font-sans text-xs text-ink-500">Constellation Gate AI</span>
        <ChevronRight className="size-3 text-ink-400" strokeWidth={1.75} aria-hidden />
        <span aria-current="page" className="font-sans text-xs font-medium text-ink-900">Requests</span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="border-ink-200 bg-white text-ink-900">
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
      <div className="flex flex-col gap-2 max-w-1/2">
        <h1 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">
          Requests
        </h1>
        <p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">
          Every generation routed through the gateway. Click a row to inspect prompts, security scans and the audit anchor. Group by conversation to follow a chain of calls.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Button variant="outline" size="default">
          <Download data-icon="inline-start" />
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
    label: 'Requests',
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
            <div className="font-mono text-3xl/9 font-medium tabular-nums -tracking-[1px] text-ink-900">
              {HERO_TOTAL.toLocaleString()}
            </div>
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
  { value: '5m',  label: '5m'  },
  { value: '30m', label: '30m' },
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
              className="border-ink-200 bg-white text-ink-900 font-normal"
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
                ? 'whitespace-nowrap font-mono tabular-nums text-ink-400'
                : 'whitespace-nowrap font-mono tabular-nums text-ink-800';
              const latencyCls =
                row.latency === '—'
                  ? 'whitespace-nowrap font-mono tabular-nums text-ink-400'
                  : row.slow
                    ? 'whitespace-nowrap font-mono tabular-nums text-warning-600'
                    : 'whitespace-nowrap font-mono tabular-nums text-ink-800';
              return (
                <TableRow
                  key={`${row.time}-${i}`}
                  className="cursor-pointer transition-colors duration-150 ease-out hover:bg-ink-50"
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
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <VendorAvatar vendor={row.vendor} />
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
        <div className="flex items-center justify-between gap-3 py-3 px-4 border-t border-ink-200">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ink-500 tabular-nums -tracking-[0.01em]">
              Showing 1–25 of 8,241
            </span>
            <span className="text-ink-400" aria-hidden>·</span>
            <span className="font-mono text-xs font-medium text-ink-500 -tracking-[0.01em]">Rows</span>
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger
                size="sm"
                aria-label="Rows per page"
                className="border-ink-200 bg-white text-ink-900 font-normal"
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
 * Drill-in modal opened from a row click. Mirrors the table's per-row data
 * (model, vendor, key, latency, cost, tokens) and adds context the row
 * doesn't carry (provider name, endpoint, cache status).
 * Tabs scaffold for future depth (Messages / Security / Audit) — only
 * Summary is wired today.
 *
 * Layout uses the project's Dialog primitive verbatim and overrides the
 * default `sm:max-w-sm` width to `sm:max-w-2xl` (672px) so the KPI rail
 * has room to breathe.
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
      <DialogContent className="sm:max-w-2xl gap-4">
        {row ? <RequestDetailBody row={row} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function RequestDetailBody({ row }: { row: RequestRow }) {
  const badge = STATUS_BADGE[row.status];
  const requestId = `req_${row.conversation.replace('cnv_', '').slice(0, 8)}${row.code}`;
  const provider = VENDOR_META[row.vendor].label;
  // Tabs is controlled so the footer can swap actions per tab
  // (Audit gets Copy proof / View on DE; everyone else gets the
  // request-action set Copy ID / Open conversation).
  const [activeTab, setActiveTab] = useState('summary');
  return (
    <>
      <DialogHeader className="gap-1">
        <span className="font-mono text-sm uppercase tracking-[0.1em] font-medium text-ink-500">
          REQUEST
        </span>
        <div className="flex items-center gap-2 pr-8">
          <span className="font-mono text-lg font-medium text-ink-900">
            {requestId}
          </span>
          <Badge variant={badge.variant}>
            <StatusDot kind={badge.dot} />
            {row.code}
          </Badge>
        </div>
        <p className="font-mono text-xs text-ink-500 -tracking-[0.01em]">
          Apr 22, 2026 · {row.time} UTC · part of conversation{' '}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-ink-700 outline-none underline decoration-ink-300 underline-offset-2 hover:decoration-ink-500 focus-visible:decoration-ink-500"
          >
            {row.conversation}
          </a>
        </p>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-3">
            <KpiTile label="Latency" value={row.latency} />
            <KpiTile label="Cost" value={row.cost} />
            <KpiTile label="Tokens In" value={row.inTokens} />
            <KpiTile label="Tokens Out" value={row.outTokens} />
          </div>

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

        <TabsContent value="messages">
          <MessagesPanel />
        </TabsContent>
        <TabsContent value="security">
          <SecurityPanel row={row} />
        </TabsContent>
        <TabsContent value="audit">
          <AuditPanel />
        </TabsContent>
      </Tabs>

      <DialogFooter className="-mx-4 -mb-4 px-4 py-3 border-t border-ink-200 sm:justify-end">
        {activeTab === 'audit' ? (
          <>
            <Button variant="outline" size="sm">
              <Copy data-icon="inline-start" />
              Copy proof
            </Button>
            <Button variant="default" size="sm">
              View on DE
              <ExternalLink data-icon="inline-end" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm">
              <Copy data-icon="inline-start" />
              Copy ID
            </Button>
            <Button variant="default" size="sm">
              Open conversation
              <ExternalLink data-icon="inline-end" />
            </Button>
          </>
        )}
      </DialogFooter>
    </>
  );
}

function KpiTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-sm bg-white border border-ink-200 px-3 py-3">
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
  role: 'system' | 'user' | 'tool' | 'assistant';
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

const ROLE_LABEL: Record<'system' | 'user' | 'tool' | 'assistant', string> = {
  system: 'System',
  user: 'User',
  tool: 'Tool',
  assistant: 'Assistant',
};

function MessagesPanel() {
  return (
    <div className="flex flex-col gap-4">
      {SAMPLE_MESSAGES.map((m, i) => (
        <MessageBlock key={i} role={m.role} tool={m.tool} body={m.body} />
      ))}
    </div>
  );
}

function MessageBlock({
  role,
  tool,
  body,
}: {
  role: 'system' | 'user' | 'tool' | 'assistant';
  tool?: string;
  body: React.ReactNode;
}) {
  // Assistant turns lift onto the brand surface so the model's reply is
  // distinguishable from prompt / tool noise; everything else uses the
  // neutral ink-100 well.
  const bubbleSurface =
    role === 'assistant'
      ? 'bg-blue-50 border-blue-100'
      : 'bg-ink-100 border-ink-200';
  return (
    <div className="flex flex-col gap-2">
      {/* Voice split: role is a sans Title Case label (message metadata,
          not a section eyebrow); tool function name is mono lowercase
          since it's an API code identifier. The two halves on one line
          carry different voices for different jobs. */}
      <div className="font-sans text-xs font-medium text-ink-600">
        {ROLE_LABEL[role]}
        {tool ? (
          <>
            <span className="text-ink-400"> · </span>
            <span className="font-mono font-normal text-ink-700">{tool}</span>
          </>
        ) : null}
      </div>
      <div className={`rounded-sm border px-3 py-2 text-sm text-ink-900 ${bubbleSurface}`}>
        {body}
      </div>
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
        <span className="font-sans text-xs text-ink-500">{description}</span>
      </div>
      <Badge variant="success">
        <StatusDot kind="success" />
        {status}
      </Badge>
    </div>
  );
}

/* Audit tab — anchored proof report. Reuses Summary's DetailRow primitive
   so both tabs read as the same family of detail tables (single bordered
   card, label / value, hairline separators). All values are static demo
   data; in production these come from an anchoring service tied to the
   request id. */
function AuditPanel() {
  return (
    <div className="rounded-sm border border-ink-200 overflow-hidden">
      <DetailRow
        label="Leaf hash"
        value={
          <span className="font-mono text-sm text-ink-900 -tracking-[0.14px]">
            0xa1b8c3d7…b4a6c1d8
          </span>
        }
      />
      <DetailRow
        label="Anchor root"
        value={
          <span className="font-mono text-sm text-ink-900 -tracking-[0.14px]">
            0x7f3a91c4…d8e2b6f1
          </span>
        }
      />
      <DetailRow
        label="Block"
        value={
          <span className="font-mono text-sm tabular-nums text-ink-900 -tracking-[0.14px]">
            #18,472,911
          </span>
        }
      />
      <DetailRow
        label="Quorum"
        value={
          <div className="flex items-center gap-2">
            <Shield className="size-3.5 text-ink-500" strokeWidth={1.75} />
            <span className="font-sans text-sm text-ink-900">3-of-3 verified</span>
          </div>
        }
      />
      <DetailRow
        label="Anchored"
        value={<span className="font-sans text-sm text-ink-900">2s after request</span>}
      />
      <DetailRow
        label="Verified"
        value={
          <Badge variant="success">
            <StatusDot kind="success" />
            tamper-evident
          </Badge>
        }
      />
    </div>
  );
}

function EmptyTabPanel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-32 rounded-sm border border-dashed border-ink-200 bg-ink-50">
      <span className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">
        {label} · TODO
      </span>
    </div>
  );
}
