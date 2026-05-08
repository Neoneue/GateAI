import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Segmented } from '@/components/ui/segmented';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkline } from '@/components/ui/sparkline';
import { TablePaginationFooter } from '@/components/ui/table-pagination-footer';
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
  PROVIDER_ORDER,
  VENDOR_META,
  VendorAvatar,
  type Vendor,
} from '@/components/icons/vendor-meta';
import { RecentRequestsCard } from './CMP012ComposedDashboard';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

type Capability = 'T' | '{}' | 'V' | 'f' | 'I' | 'R' | 'E';

type ModelRow = {
  vendor: Vendor;
  name: string;
  context: string;
  latency: string;
  throughput: string;
  input: string;
  output: string;
  cache: string;
  trend: number[];
  capabilities: Capability[];
  providers: Vendor[];
  zdr: '·' | '—';
};

const ROWS: ModelRow[] = [
  {
    vendor: 'anthropic',
    name: 'anthropic/claude-sonnet-4.8',
    context: '1M',
    latency: '0.9s',
    throughput: '94 tps',
    input: '$3.00',
    output: '$15.00',
    cache: 'R: $0.30',
    trend: [6, 8, 7, 12, 11, 16, 18, 20],
    capabilities: ['T', '{}', 'V', 'f'],
    providers: ['anthropic'],
    zdr: '·',
  },
  {
    vendor: 'xai',
    name: 'xai/grok-4.1-fast',
    context: '256K',
    latency: '2.1s',
    throughput: '65 tps',
    input: '$0.95',
    output: '$4.00',
    cache: 'R: $0.16',
    trend: [8, 10, 9, 13, 12, 14, 17, 19],
    capabilities: ['T', '{}', 'f'],
    providers: ['xai'],
    zdr: '·',
  },
  {
    vendor: 'google',
    name: 'google/gemini-3-pro',
    context: '2M',
    latency: '1.4s',
    throughput: '78 tps',
    input: '$1.25',
    output: '$10.00',
    cache: 'R: $0.20',
    trend: [5, 7, 9, 11, 12, 15, 17, 20],
    capabilities: ['T', '{}', 'V', 'I'],
    providers: ['google'],
    zdr: '·',
  },
  {
    vendor: 'openai',
    name: 'openai/gpt-5.1',
    context: '512K',
    latency: '1.8s',
    throughput: '71 tps',
    input: '$2.50',
    output: '$10.00',
    cache: 'R: $0.25',
    trend: [7, 9, 8, 11, 13, 12, 16, 18],
    capabilities: ['T', '{}', 'V', 'f'],
    providers: ['openai'],
    zdr: '·',
  },
  {
    vendor: 'anthropic',
    name: 'anthropic/claude-opus-4.7',
    context: '500K',
    latency: '2.4s',
    throughput: '48 tps',
    input: '$15.00',
    output: '$75.00',
    cache: 'R: $1.50',
    trend: [18, 14, 16, 10, 12, 7, 9, 5],
    capabilities: ['T', '{}', 'V', 'f'],
    providers: ['anthropic'],
    zdr: '·',
  },
  {
    vendor: 'meta',
    name: 'meta/llama-4.2-405b',
    context: '128K',
    latency: '1.6s',
    throughput: '58 tps',
    input: '$0.60',
    output: '$3.00',
    cache: 'R: $0.10',
    trend: [6, 8, 10, 9, 12, 14, 16, 18],
    capabilities: ['T', '{}', 'f'],
    providers: ['meta'],
    zdr: '·',
  },
  {
    vendor: 'mistral',
    name: 'mistral/mistral-large-3',
    context: '256K',
    latency: '1.2s',
    throughput: '82 tps',
    input: '$1.80',
    output: '$5.40',
    cache: 'R: $0.20',
    trend: [4, 7, 6, 10, 12, 13, 16, 19],
    capabilities: ['T', '{}', 'f'],
    providers: ['mistral'],
    zdr: '·',
  },
  {
    vendor: 'deepseek',
    name: 'deepseek/deepseek-r3',
    context: '128K',
    latency: '3.2s',
    throughput: '42 tps',
    input: '$0.14',
    output: '$0.28',
    cache: 'R: $0.03',
    trend: [20, 18, 19, 15, 13, 11, 9, 7],
    capabilities: ['T', '{}'],
    providers: ['deepseek'],
    zdr: '·',
  },
  {
    vendor: 'cohere',
    name: 'cohere/command-r-plus-2',
    context: '128K',
    latency: '1.1s',
    throughput: '88 tps',
    input: '$3.00',
    output: '$15.00',
    cache: 'R: $0.00',
    trend: [5, 8, 7, 11, 10, 14, 16, 17],
    capabilities: ['T', 'R', 'E'],
    providers: ['cohere'],
    zdr: '·',
  },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'text', label: 'Text' },
  { value: 'code', label: 'Code' },
  { value: 'image', label: 'Image' },
  { value: 'embed', label: 'Embed' },
  { value: 'rerank', label: 'Rerank' },
];

// Synthetic catalog total — the rendered ROWS are the "first page" of a
// larger model registry. Matches the pattern in CMP-013/014 (totals diverge
// per surface) so pagination math has somewhere to walk.
const MODELS_TOTAL = 127;

export function CMP011DataTable() {
  const [type, setType] = useState('all');
  const [provider, setProvider] = useState<'all' | Vendor>('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('25');

  const TYPE_TO_CAPABILITIES: Record<string, Capability[]> = {
    text: ['T'],
    code: ['{}'],
    image: ['V', 'I'],
    embed: ['E'],
    rerank: ['R'],
  };

  const filtered = ROWS.filter((r) => {
    if (provider !== 'all' && r.vendor !== provider) return false;
    if (type !== 'all') {
      const required = TYPE_TO_CAPABILITIES[type] ?? [];
      if (!required.some((cap) => r.capabilities.includes(cap))) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-[1440px] min-w-0">
      <div className="flex flex-col w-full bg-ink-50 min-w-0">
        <ArtboardHeader
          code="CMP-011"
          title="Data table"
          description="Three table treatments — sortable list view with full toolbar, compact activity feed, and a scored drill-down panel. All share the same Table primitive, mono numerics, status pills, and row chrome."
          parts="3 layouts"
        />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
          <SectionHeader
            code="CMP-011.1 — SORTABLE TABLE"
            hint=".v-tbl · header / row / selected / action"
          />

          <div className="flex flex-col rounded-sm overflow-hidden bg-white border border-ink-200 shadow-xs">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-2">
                <div className="relative w-60">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-ink-500"
                    strokeWidth={1.75}
                  />
                  <Input
                    size="sm"
                    placeholder="Search model…"
                    className="pl-8"
                  />
                </div>
                <Segmented
                  variant="pill"
                  size="sm"
                  options={TYPE_OPTIONS}
                  value={type}
                  onChange={setType}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={provider}
                  onValueChange={(v) => setProvider((v ?? 'all') as 'all' | Vendor)}
                >
                  <SelectTrigger
                    size="sm"
                    className="border-ink-200 bg-white text-ink-900 font-normal"
                  >
                    {provider === 'all'
                      ? 'All Providers'
                      : VENDOR_META[provider].label}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {PROVIDER_ORDER.map((v) => {
                      const meta = VENDOR_META[v];
                      const Icon = meta.icon;
                      const isLight = meta.color === '#FFFFFF';
                      return (
                        <SelectItem key={v} value={v}>
                          <span
                            className="inline-flex items-center justify-center size-4 rounded-[4px] shrink-0"
                            style={{
                              backgroundColor: meta.color,
                              color: '#FFFFFF',
                              border: isLight ? '1px solid var(--color-ink-200)' : 'none',
                            }}
                          >
                            <Icon className="size-2.5" />
                          </span>
                          {meta.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ink-200 bg-white text-ink-900 font-normal"
                >
                  <span className="text-ink-500">Sort:</span>
                  Release Date
                  <ChevronDown
                    className="size-3 text-ink-500"
                    strokeWidth={1.75}
                  />
                </Button>
              </div>
            </div>

            {/* Table */}
            <Table className="min-w-max">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-[200px]">Model</TableHead>
                  <TableHead className="w-[80px] text-right">
                    Context
                  </TableHead>
                  <TableHead className="w-[80px] text-right">
                    Latency
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    Throughput
                  </TableHead>
                  <TableHead className="w-[90px] text-right">Input</TableHead>
                  <TableHead className="w-[90px] text-right">Output</TableHead>
                  <TableHead className="w-[100px] text-right">Cache</TableHead>
                  <TableHead className="w-[90px]">Trend</TableHead>
                  <TableHead className="w-[120px]">Capabilities</TableHead>
                  <TableHead className="w-[50px] text-center">ZDR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <VendorAvatar vendor={row.vendor} />
                        <span className="font-mono text-sm text-ink-900 -tracking-[0.2px]">
                          {row.name.split('/')[1] ?? row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-ink-900">
                      {row.context}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-ink-900">
                      {row.latency}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-ink-900">
                      {row.throughput}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-ink-900">
                      <span>{row.input}</span>
                      <span className="text-ink-500">/M</span>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-ink-900">
                      <span>{row.output}</span>
                      <span className="text-ink-500">/M</span>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-ink-900">
                      {row.cache}
                    </TableCell>
                    <TableCell>
                      <Sparkline points={row.trend} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {row.capabilities.map((c, i) => (
                          <CapabilityPill key={`${c}-${i}`} letter={c} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-ink-500 font-mono">
                      {row.zdr}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePaginationFooter
              total={MODELS_TOTAL}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-011.2 — ACTIVITY FEED"
              hint="card-wrapped · header + 'view all' · imported from CMP-012"
            />
            <RecentRequestsCard />
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-011.3 — DRILL-DOWN PANEL"
              hint="title + subtitle · status pills · severity scores · chevron rows"
            />
            <RiskScoresCard />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CMP-011.3 — Drill-down panel (scored list) ───────────────────────────
 * Embedded panel pattern. Title + subtitle in the card header, single
 * scope dropdown (no full toolbar), severity badges driving both the pill
 * and the score color, severity-tinted sparklines, and a chevron column
 * marking each row as a drill target. Reuses Table, Badge, StatusDot, and
 * the local Sparkline. Status colors trace back to the semantic tokens
 * (--color-destructive / --color-warning-700 / --color-primary). */
type RiskLevel = 'critical' | 'elevated' | 'normal';

const RISK_LEVELS: Record<
  RiskLevel,
  {
    label: string;
    variant: 'destructive' | 'warning' | 'info';
    dot: 'danger' | 'warning' | 'info';
    scoreClass: string;
  }
> = {
  critical: { label: 'Critical', variant: 'destructive', dot: 'danger',  scoreClass: 'text-destructive' },
  elevated: { label: 'Elevated', variant: 'warning',     dot: 'warning', scoreClass: 'text-warning-700' },
  normal:   { label: 'Normal',   variant: 'info',        dot: 'info',    scoreClass: 'text-ink-900' },
};

const RISK_ROWS: {
  key: string;
  risk: RiskLevel;
  score: number;
  events: number;
  trend: number[];
}[] = [
  { key: 'sk-cg-…7a3', risk: 'critical', score: 62, events: 14, trend: [3, 4, 6, 9, 14, 22, 30, 38, 46] },
  { key: 'sk-cg-…2f8', risk: 'elevated', score: 12, events: 8,  trend: [2, 3, 4, 6, 7, 8, 10, 11, 12] },
  { key: 'sk-cg-…9c1', risk: 'normal',   score: 3,  events: 2,  trend: [3, 1, 4, 1, 5, 2, 5, 3, 4] },
  { key: 'sk-cg-…1d4', risk: 'normal',   score: 1,  events: 1,  trend: [1, 0, 2, 0, 3, 0, 2, 0, 1] },
  { key: 'sk-cg-…5b2', risk: 'normal',   score: 0,  events: 0,  trend: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

function RiskScoresCard() {
  const [scope, setScope] = useState('all');
  return (
    <div className="flex flex-col rounded-sm overflow-hidden bg-white border border-ink-200 shadow-xs">
      {/* Header — title + subtitle on the left, scope dropdown on the right */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-900 m-0">
            API key risk scores
          </h3>
          <p className="font-sans text-sm -tracking-[0.14px] text-ink-500 m-0">
            Decays on 1h half-life · elevated keys get enhanced scanning
          </p>
        </div>
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger
            size="sm"
            aria-label="Scope"
            className="border-ink-200 bg-white text-ink-900 font-normal"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All keys</SelectItem>
            <SelectItem value="elevated">Elevated +</SelectItem>
            <SelectItem value="critical">Critical only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="whitespace-nowrap">Key</TableHead>
            <TableHead className="whitespace-nowrap">Risk</TableHead>
            <TableHead className="whitespace-nowrap">Score</TableHead>
            <TableHead className="whitespace-nowrap">Events</TableHead>
            <TableHead className="whitespace-nowrap">Trend</TableHead>
            <TableHead className="w-12" aria-hidden />
          </TableRow>
        </TableHeader>
        <TableBody>
          {RISK_ROWS.map((row) => {
            const meta = RISK_LEVELS[row.risk];
            return (
              <TableRow key={row.key} className="cursor-pointer">
                <TableCell className="whitespace-nowrap font-mono text-sm tabular-nums -tracking-[0.14px] text-ink-900">
                  {row.key}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={meta.variant}>
                    <StatusDot kind={meta.dot} />
                    {meta.label}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`whitespace-nowrap font-mono tabular-nums ${meta.scoreClass}`}
                >
                  {row.score}
                </TableCell>
                <TableCell className="whitespace-nowrap font-mono tabular-nums text-ink-900">
                  {row.events}
                </TableCell>
                <TableCell>
                  <Sparkline points={row.trend} tone={row.risk} />
                </TableCell>
                <TableCell className="text-right text-ink-400">
                  <ChevronRight className="size-4" aria-hidden />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function ProviderAvatar({ vendor }: { vendor: Vendor }) {
  const meta = VENDOR_META[vendor];
  const Icon = meta.icon;
  const isLight = meta.color === '#FFFFFF';
  return (
    <span
      className="inline-flex items-center justify-center size-5 rounded-full shrink-0 ring-2 ring-white"
      style={{
        backgroundColor: meta.color,
        color: meta.iconColor,
        border: isLight ? '1px solid var(--color-ink-200)' : 'none',
      }}
    >
      <Icon className="size-2.5" />
    </span>
  );
}

function CapabilityPill({ letter }: { letter: Capability }) {
  const display = letter === 'f' ? 'ƒ' : letter;
  return (
    <span className="inline-flex items-center justify-center size-5 rounded-[4px] border border-ink-200 font-mono text-xs font-medium text-ink-700">
      {display}
    </span>
  );
}

