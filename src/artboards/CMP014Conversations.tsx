import { useState } from 'react';
import { Download, Search } from 'lucide-react';
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
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { DashboardChrome } from './_shared/DashboardChrome';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-014 — Conversations (Observability)
 *
 * Conversation-grouped view of gateway traffic. Each row is a chain of
 * requests sharing session context (agent runs, multi-turn chats, tool
 * loops). Production-shell chrome — sidebar + screen-head + topbar —
 * comes from `_shared/DashboardChrome` and is shared with CMP-012 /
 * CMP-013. This file owns the page-internal pieces only: PageHeader,
 * KpiRail, ConversationsTableSection.
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

          <DashboardChrome
            urlSlug="conversations"
            screenEyebrow="CONVERSATIONS"
            breadcrumbCurrent="Conversations"
            activeNavId="conversations"
            sidebarExpanded={innerSidebarExpanded}
            onToggleSidebar={onToggleInnerSidebar ?? (() => {})}
            onNavigate={onNavigate}
          >
            <PageHeader />
            <KpiRail />
            <ConversationsTableSection />
          </DashboardChrome>
        </div>
      </div>
    </div>
  );
}

/* ─── Page header — eyebrow + title + description + actions ──────────────── */

function PageHeader() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2 max-w-1/2">
        {/* h2 — see CMP012 PageHeader note. */}
        <h2 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">
          Conversations
        </h2>
        <p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">
          A conversation is a chain of requests that share session context — agent runs, multi-turn chats, tool-calling loops. Click any row to see the message thread alongside its request trace.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="outline" size="default" className="border-ink-200 bg-white text-ink-900">
          <Download data-icon="inline-start" aria-hidden />
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
          deltaInverted
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
            aria-hidden
          />
          <Input
            size="sm"
            type="search"
            name="q"
            autoComplete="off"
            spellCheck={false}
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
            <TableHead className="text-right whitespace-nowrap">Turns</TableHead>
            <TableHead className="text-right whitespace-nowrap">Reqs</TableHead>
            <TableHead className="whitespace-nowrap">Models</TableHead>
            <TableHead className="text-right whitespace-nowrap">Tokens</TableHead>
            <TableHead className="text-right whitespace-nowrap">Cost</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CONVERSATION_ROWS.map((row) => {
            const badge = STATUS_BADGE[row.status];
            return (
              <TableRow key={row.conversationId} className="transition-colors duration-150 ease-out hover:bg-ink-50">
                <TableCell className="max-w-[360px]">
                  <div className="flex flex-col gap-1 min-w-0">
                    <button
                      type="button"
                      className="font-sans text-sm text-ink-900 -tracking-[0.14px] truncate text-left bg-transparent p-0 outline-none underline decoration-ink-300 underline-offset-2 hover:decoration-ink-500 focus-visible:decoration-ink-500"
                    >
                      {row.title}
                    </button>
                    <span className="font-mono text-xs text-ink-500 -tracking-[0.01em]">
                      {row.conversationId}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono text-sm text-ink-800 -tracking-[0.14px]">
                  {row.initiator}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.turns}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.reqs}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {row.vendors.map((v) => (
                      <VendorAvatar key={v} vendor={v} />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
                  {row.tokens}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap font-mono text-sm tabular-nums text-ink-800">
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
            Showing <span className="font-medium">1–25</span> of <span className="font-medium">18,210</span>
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
                  onClick={() => setPage(n)}
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
                onClick={() => setPage(729)}
              >
                729
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(729, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
