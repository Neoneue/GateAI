import { useState } from 'react';
import {
  Activity,
  ArrowLeftRight,
  Bell,
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
  Search,
  Settings2,
  Shield,
  ShieldCheck,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompactKpi, CompactSpark } from '@/components/ui/compact-kpi';
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
import { Separator } from '@/components/ui/separator';
import { StatusDot } from '@/components/ui/status-dot';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VendorAvatar, type Vendor } from '@/components/icons/vendor-meta';
import { BrandMark } from '@/components/icons/brand-mark';
import { cn } from '@/lib/utils';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-014 — Conversations (Observability)
 *
 * Conversation-grouped view of gateway traffic. Each row is a chain of
 * requests sharing session context (agent runs, multi-turn chats, tool
 * loops). Same production frame as CMP-012 / CMP-013 — the chrome
 * (DashboardSurface + SidebarShell + DashTopBar) is copied per the
 * established artboard pattern. Sidebar starts expanded on this surface
 * because Conversations is a list-density view; users want the labelled
 * nav available, not collapsed icons.
 *
 * Note for future cleanup: this is the 3rd shell duplication. Extracting
 * DashboardSurface / SidebarShell into `_shared/DashboardChrome.tsx`
 * would consolidate the chrome and let each artboard pass a `nav` prop
 * (active id) + render its own page content.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP014Conversations({
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
          code="CMP-014"
          title="Conversations · Observability"
          description="Conversation-grouped view of gateway traffic. KPI rail (4 stats), filter toolbar, sortable conversation list with vendor avatars, status pills, and trace-cost columns. Same production frame as CMP-012 / CMP-013."
          parts="1 surface"
        />

        <div className="flex flex-col gap-3">
          <SectionHeader
            code="CMP-014.1 — CONVERSATIONS SURFACE"
            hint="v-shell · gray well · KPI rail · filter toolbar · conversation log"
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
        acme-prod.constellation.io / conversations
      </div>
      <div className="ml-auto font-mono uppercase tracking-[0.1em] text-xs font-medium text-ink-500">
        DIR.A · CONVERSATIONS
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
  /** When set, clicking the item calls the surface's `onNavigate(pageId)`
   * so the inner sidebar can drive the outer App router. */
  pageId?: string;
};

type SidebarSection = {
  label?: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    items: [
      { id: 'overview',      icon: Home,           label: 'Overview',                     pageId: 'cmp-012' },
      { id: 'requests',      icon: ArrowLeftRight, label: 'Requests',                     pageId: 'cmp-013' },
      { id: 'conversations', icon: MessageSquare,  label: 'Conversations', active: true,  pageId: 'cmp-014' },
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

/* ─── Main pane ───────────────────────────────────────────────────────────── */

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
        <KpiRail />
        <ConversationsTableSection />
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
        <span aria-current="page" className="font-sans text-xs font-medium text-ink-900">
          Conversations
        </span>
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

/* ─── Page header — eyebrow + title + description + actions ──────────────── */

function PageHeader() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2 max-w-1/2">
        <h1 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">
          Conversations
        </h1>
        <p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">
          A conversation is a chain of requests that share session context — agent runs, multi-turn chats, tool-calling loops. Click any row to see the message thread alongside its request trace.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="outline" size="default" className="border-ink-200 bg-white text-ink-900">
          <Download data-icon="inline-start" />
          Export
        </Button>
      </div>
    </div>
  );
}

/* ─── KPI Rail (4 cards — Spend / 24h omitted per request) ────────────── */

function KpiRail() {
  const dividerCls =
    'relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-200';
  return (
    <div className="grid grid-cols-4 rounded-sm bg-white shadow-(--shadow-border) overflow-hidden">
      <CompactKpi
        flat
        title="Active Now"
        value="247"
        delta="+12"
        spark={
          <CompactSpark
            colorVar="var(--color-ink-500)"
            data={[238, 252, 230, 244, 256, 234, 248, 240, 247]}
          />
        }
      />
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Conversations"
          value="18,210"
          delta="+6.4%"
          spark={
            <CompactSpark
              colorVar="var(--color-warning-500)"
              data={[1740, 2120, 1680, 2040, 2380, 1820, 2240, 1960, 2230]}
            />
          }
        />
      </div>
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Avg Turns"
          value="14.2"
          delta="+1.8"
          spark={
            <CompactSpark
              colorVar="var(--color-success-500)"
              data={[13.4, 14.8, 13.1, 14.2, 14.9, 13.6, 14.5, 13.9, 14.2]}
            />
          }
        />
      </div>
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Avg Cost / Conv"
          value="$0.082"
          delta="-3.1%"
          spark={
            <CompactSpark
              colorVar="var(--color-blue-500)"
              data={[0.087, 0.082, 0.090, 0.083, 0.085, 0.080, 0.084, 0.079, 0.082]}
              endDot
            />
          }
        />
      </div>
    </div>
  );
}

/* ─── Conversations table section (toolbar + table + pagination) ─────── */

type ConversationStatus = 'active' | 'completed' | 'failed';

const STATUS_BADGE: Record<
  ConversationStatus,
  { variant: 'success' | 'destructive' | 'info'; dot: 'success' | 'danger' | 'info'; label: string }
> = {
  active:    { variant: 'success',     dot: 'success', label: 'active' },
  completed: { variant: 'info',        dot: 'info',    label: 'completed' },
  failed:    { variant: 'destructive', dot: 'danger',  label: 'failed' },
};

type ConversationRow = {
  title: string;
  conversationId: string;
  initiator: string;
  turns: number;
  reqs: number;
  vendors: Vendor[];
  tokens: string;
  cost: string;
  status: ConversationStatus;
  updated: string;
};

const CONVERSATION_ROWS: ConversationRow[] = [
  { title: 'Why was the SEPA transfer 0x4a3e flagged for review yesterday?', conversationId: 'cnv_aurora_42',   initiator: 'service-eu-payments',  turns:  9, reqs: 14, vendors: ['anthropic'],                      tokens: '4,051',   cost: '$0.1042', status: 'active',    updated: '14:28:04' },
  { title: 'Draft a 4-step onboarding sequence for new fin clients',         conversationId: 'cnv_skylark_18', initiator: 'kira.tan@acme.io',     turns:  6, reqs: 11, vendors: ['anthropic', 'openai'],            tokens: '8,114',   cost: '$0.4218', status: 'active',    updated: '14:22:11' },
  { title: 'Classify the attached document and click KYC if needed',         conversationId: 'cnv_meridian_07',initiator: 'service-kyc-bot',      turns:  3, reqs:  4, vendors: ['google'],                         tokens: '2,104',   cost: '$0.3104', status: 'active',    updated: '14:15:22' },
  { title: 'Investigate the variance in YOY revenue between segments',       conversationId: 'cnv_orion_70',   initiator: 'mateus.silva@ebux.com',turns: 18, reqs: 38, vendors: ['anthropic', 'openai', 'mistral'], tokens: '52,810',  cost: '$0.5841', status: 'completed', updated: '14:02:48' },
  { title: 'Draft a postmortem for incident INC-2026-04-1107',               conversationId: 'cnv_polaris_55', initiator: 'service.incident-bot', turns:  4, reqs:  7, vendors: ['anthropic'],                      tokens: '3,402',   cost: '$0.1102', status: 'active',    updated: '13:48:33' },
  { title: 'Customer requesting a refund on order ORD-89412',                conversationId: 'cnv_lyra_92',    initiator: 'service-support-bot',  turns: 14, reqs: 32, vendors: ['openai'],                         tokens: '12,608',  cost: '$0.0812', status: 'failed',    updated: '13:36:10' },
  { title: 'Summarize Q1 2026 earnings call for top 10 holdings',            conversationId: 'cnv_vela_21',    initiator: 'pulja.shah@acme.io',   turns: 12, reqs: 26, vendors: ['anthropic'],                      tokens: '102,041', cost: '$0.1402', status: 'completed', updated: '13:18:55' },
];

function ConversationsTableSection() {
  const [scope, setScope] = useState('all');
  const [user, setUser] = useState('all');
  const [keyId, setKeyId] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('25');

  return (
    <div className="flex flex-col w-full rounded-sm overflow-hidden bg-white shadow-(--shadow-border)">
      {/* Toolbar */}
      <div className="flex items-center gap-2 py-3 px-4">
        <div className="relative w-72 min-w-0 shrink-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-ink-500"
            strokeWidth={1.75}
          />
          <Input
            size="sm"
            placeholder="Search by id, prompt, user, key…"
            aria-label="Search conversations"
            className="pl-8 placeholder:text-ink-500"
          />
        </div>
        <SegmentedPill
          size="sm"
          value={scope}
          onValueChange={setScope}
          options={[
            { value: 'all',    label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'failed', label: 'Failed' },
          ]}
          aria-label="Conversation scope"
        />
        <div className="grow" />
        <Select value={user} onValueChange={setUser}>
          <SelectTrigger
            size="sm"
            aria-label="User"
            className="border-ink-200 bg-white text-ink-900 font-normal"
          >
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All users</SelectItem>
            <SelectItem value="service-eu-payments">service-eu-payments</SelectItem>
            <SelectItem value="kira.tan@acme.io">kira.tan@acme.io</SelectItem>
            <SelectItem value="mateus.silva@ebux.com">mateus.silva@ebux.com</SelectItem>
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
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="whitespace-nowrap">Conversation</TableHead>
            <TableHead className="whitespace-nowrap">Initiator</TableHead>
            <TableHead className="whitespace-nowrap">Turns</TableHead>
            <TableHead className="whitespace-nowrap">Reqs</TableHead>
            <TableHead className="whitespace-nowrap">Models</TableHead>
            <TableHead className="whitespace-nowrap">Tokens</TableHead>
            <TableHead className="whitespace-nowrap">Cost</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CONVERSATION_ROWS.map((row) => {
            const badge = STATUS_BADGE[row.status];
            return (
              <TableRow key={row.conversationId} className="cursor-pointer transition-colors duration-150 ease-out hover:bg-ink-50">
                <TableCell className="max-w-[360px]">
                  <div className="flex flex-col gap-1 min-w-0">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="font-sans text-sm text-ink-900 -tracking-[0.14px] truncate outline-none underline decoration-ink-300 underline-offset-2 hover:decoration-ink-500 focus-visible:decoration-ink-500"
                    >
                      {row.title}
                    </a>
                    <span className="font-mono text-xs text-ink-500 -tracking-[0.01em]">
                      {row.conversationId}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm text-ink-700 -tracking-[0.14px]">
                  {row.initiator}
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.turns}
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.reqs}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {row.vendors.map((v) => (
                      <VendorAvatar key={v} vendor={v} />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.tokens}
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.cost}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={badge.variant}>
                    <StatusDot kind={badge.dot} />
                    {badge.label}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm tabular-nums text-ink-500 -tracking-[0.14px]">
                  {row.updated}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination footer */}
      <div className="flex items-center justify-between gap-3 py-3 px-4 border-t border-ink-200">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-ink-500 tabular-nums -tracking-[0.01em]">
            Showing 1–25 of 18,210
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
                  isActive={n === page}
                  href="#"
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
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(729);
                }}
              >
                729
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(729, p + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
