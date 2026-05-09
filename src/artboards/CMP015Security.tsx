import { useState } from 'react';
import { Download, Plus, TriangleAlert } from 'lucide-react';
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
import { CompactKpi, CompactSpark } from '@/components/ui/compact-kpi';
import { SegmentedPill } from '@/components/ui/segmented-pill';
import { Sparkline } from '@/components/ui/sparkline';
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
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { DashboardChrome } from './_shared/DashboardChrome';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-015 — Security
 *
 * Security overview surface in the same production frame as CMP-012/013/014.
 * Composed entirely from existing primitives — no new components extracted.
 *
 * Sections:
 *   1. PageHeader               (title + actions)
 *   2. KpiRail                  (4 sparkline tiles in a single bordered row)
 *   3. CriticalRiskBanner       (inline danger-50 strip with actions)
 *   4. MiddleRow                (API key risk scores + Attack categories,
 *                                50/50 split)
 *
 * Color palette: only ink-* / blue-* / chart-1..8 / success / warning /
 * danger / --destructive. No raw hex.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP015Security({
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
          code="CMP-015"
          title="Security"
          description="Real-time threat detection and policy enforcement across every request routed through the gateway. Same production frame as CMP-012/013/014."
          parts="1 surface"
        />

        <div className="flex flex-col gap-3">
          <SectionHeader
            code="CMP-015.1 — SECURITY SURFACE"
            hint="v-shell · KPI rail · risk banner · attack categories · key risk scores"
          />

          <DashboardChrome
            urlSlug="security"
            screenEyebrow="SECURITY"
            breadcrumbCurrent="Security"
            activeNavId="security-overview"
            sidebarExpanded={innerSidebarExpanded}
            onToggleSidebar={onToggleInnerSidebar ?? (() => {})}
            onNavigate={onNavigate}
          >
            <PageHeader />
            <KpiRail />
            <CriticalRiskBanner />
            <MiddleRow />
          </DashboardChrome>
        </div>
      </div>
    </div>
  );
}

/* ─── Page header ────────────────────────────────────────────────────────── */

function PageHeader() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-2 max-w-1/2">
        {/* h2 — see CMP012 PageHeader note. ArtboardHeader emits the outer
            h1; the in-surface page title reads as h2 in the document
            outline so child cards can use h3 without level skips. */}
        <h2 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">
          Security
        </h2>
        <p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">
          Real-time threat detection and policy enforcement across every request routed through the gateway.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Button variant="outline" size="default">
          <Download data-icon="inline-start" aria-hidden="true" />
          Export report
        </Button>
        <Button variant="default" size="default">
          <Plus data-icon="inline-start" aria-hidden="true" />
          New policy
        </Button>
      </div>
    </div>
  );
}

/* ─── KPI rail (4-up sparkline cards) ────────────────────────────────────── */

function KpiRail() {
  // Same divider pattern as CMP-012's KpiRail — `before:` pseudo-element
  // hairlines at `inset-y-4` so the rule stays inset from rounded corners
  // and the spark's lower edge.
  const dividerCls =
    'relative before:absolute before:left-0 before:inset-y-4 before:w-px before:bg-ink-200';
  return (
    <div className="grid grid-cols-4 rounded-sm bg-white shadow-(--shadow-border) overflow-hidden">
      <CompactKpi
        flat
        title="Requests scanned"
        value="47,891"
        spark={
          <CompactSpark
            colorVar="var(--color-ink-500)"
            data={[28, 32, 36, 40, 38, 44, 48, 52, 57]}
          />
        }
      />
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Threats detected"
          value="47"
          delta="+13.4%"
          spark={
            <CompactSpark
              colorVar="var(--color-chart-2)"
              data={[3, 7, 4, 9, 5, 11, 6, 13, 9]}
            />
          }
        />
      </div>
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Detection accuracy"
          value="99.8%"
          delta="+0.4%"
          spark={
            <CompactSpark
              colorVar="var(--color-chart-3)"
              data={[12, 13, 14, 14, 15, 15, 16, 17, 18]}
            />
          }
        />
      </div>
      <div className={dividerCls}>
        <CompactKpi
          flat
          title="Avg scan latency"
          value={"18 ms"}
          delta="-8.6%"
          deltaInverted
          spark={
            <CompactSpark
              colorVar="var(--color-chart-7)"
              data={[26, 24, 23, 22, 21, 20, 19, 18, 18]}
              endDot
            />
          }
        />
      </div>
    </div>
  );
}

/* ─── Critical risk banner ──────────────────────────────────────────────── */

function CriticalRiskBanner() {
  return (
    <div role="alert" className="rounded-sm bg-danger-50 border border-danger-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 max-w-2/3">
          <span
            className="inline-flex items-center justify-center size-8 shrink-0 rounded-full bg-destructive text-white"
            aria-hidden="true"
          >
            <TriangleAlert className="size-4" strokeWidth={2} />
          </span>
          <p className="font-sans text-sm text-ink-900 -tracking-[0.14px] text-pretty m-0">
            <span className="font-medium text-destructive">Critical risk</span>
            <span className="text-ink-500"> · </span>
            <span className="font-mono">sk-cg-…7a3</span> exceeded detection threshold (14&nbsp;events&nbsp;/&nbsp;hr). All requests receiving enhanced scanning, rate-limited to 1&nbsp;req&nbsp;/&nbsp;10s.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="default" size="sm">
            Quarantine key
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Middle row (Attack categories 2/3 + API key risk scores 1/3) ───────── */

function MiddleRow() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ApiKeyRiskScoresCard />
      <AttackCategoriesCard />
    </div>
  );
}

/* ─── Attack categories card ────────────────────────────────────────────── */

type AttackCategory = {
  label: string;
  count: number;
  /** Chart palette CSS var. */
  color: string;
};

const ATTACK_CATEGORIES: AttackCategory[] = [
  { label: 'Content Policy',        count: 24, color: 'var(--color-chart-2)' },
  { label: 'PII in Output',         count: 6,  color: 'var(--color-chart-3)' },
  { label: 'Direct Injection',      count: 5,  color: 'var(--color-chart-1)' },
  { label: 'Unicode Obfuscation',   count: 3,  color: 'var(--color-chart-6)' },
  { label: 'Credentials in Output', count: 3,  color: 'var(--color-chart-4)' },
  { label: 'Encoding Attack',       count: 2,  color: 'var(--color-chart-5)' },
  { label: 'Jailbreak Attempt',     count: 2,  color: 'var(--color-chart-8)' },
  { label: 'PHI in Output',         count: 2,  color: 'var(--color-chart-7)' },
];

const ATTACK_CATEGORIES_RANGE_OPTIONS = [
  { value: '24h', label: '24h' },
  { value: '7d',  label: '7d'  },
];

function AttackCategoriesCard() {
  const [range, setRange] = useState('7d');
  const max = Math.max(...ATTACK_CATEGORIES.map((c) => c.count));
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="font-sans text-base font-medium -tracking-[0.25px] text-ink-900">
          Attack categories
        </CardTitle>
        <CardDescription>Breakdown by detection type</CardDescription>
        <CardAction>
          <SegmentedPill
            size="sm"
            options={ATTACK_CATEGORIES_RANGE_OPTIONS}
            value={range}
            onValueChange={setRange}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {ATTACK_CATEGORIES.map((cat) => {
          const pct = (cat.count / max) * 100;
          return (
            <div
              key={cat.label}
              className="flex items-center gap-3"
            >
              <span className="w-48 shrink-0 font-sans text-sm text-ink-900 truncate" title={cat.label}>
                {cat.label}
              </span>
              <div
                role="meter"
                aria-valuenow={cat.count}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={`${cat.label}: ${cat.count} detections`}
                className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden"
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: cat.color }}
                />
              </div>
              <span className="w-6 shrink-0 font-mono text-sm tabular-nums text-ink-800 text-right">
                {cat.count}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/* ─── API key risk scores card ───────────────────────────────────────────── */

type RiskTier = 'critical' | 'elevated' | 'normal';

type RiskRow = {
  key: string;
  tier: RiskTier;
  tierLabel: string;
  score: number;
  events: number;
  trend: number[];
};

const RISK_ROWS: RiskRow[] = [
  { key: 'sk-cg-…7a3', tier: 'critical', tierLabel: 'Critical', score: 62, events: 14, trend: [3, 4, 6, 9, 14, 22, 30, 38, 46] },
  { key: 'sk-cg-…2f8', tier: 'elevated', tierLabel: 'Elevated', score: 12, events: 8,  trend: [2, 3, 4, 6, 7, 8, 10, 11, 12]   },
  { key: 'sk-cg-…9c1', tier: 'normal',   tierLabel: 'Normal',   score: 3,  events: 2,  trend: [3, 1, 4, 1, 5, 2, 5, 3, 4]      },
  { key: 'sk-cg-…1d4', tier: 'normal',   tierLabel: 'Normal',   score: 1,  events: 1,  trend: [1, 0, 2, 0, 3, 0, 2, 0, 1]      },
  { key: 'sk-cg-…5b2', tier: 'normal',   tierLabel: 'Normal',   score: 0,  events: 0,  trend: [0, 0, 0, 0, 0, 0, 0, 0, 0]      },
];

const TIER_BADGE: Record<RiskTier, {
  variant: 'destructive' | 'warning' | 'neutral';
  dot: 'danger' | 'warning' | 'neutral';
}> = {
  critical: { variant: 'destructive', dot: 'danger'   },
  elevated: { variant: 'warning',     dot: 'warning'  },
  normal:   { variant: 'neutral',     dot: 'neutral'  },
};

function ApiKeyRiskScoresCard() {
  return (
    <div className="flex flex-col min-w-0 rounded-sm overflow-hidden bg-white shadow-(--shadow-border)">
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-sans text-base font-medium -tracking-[0.25px] text-ink-900 m-0">
            API key risk scores
          </h3>
          <p className="font-sans text-sm/5 tracking-tight text-ink-500 m-0">
            Decays on 1 h half-life · elevated keys get enhanced scanning
          </p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger
            size="sm"
            aria-label="Key filter"
            className="border-ink-200 bg-white text-ink-900 font-normal"
          >
            <SelectValue placeholder="All keys" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All keys</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="elevated">Elevated</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="whitespace-nowrap">Key</TableHead>
              <TableHead className="whitespace-nowrap">Risk</TableHead>
              <TableHead className="text-right whitespace-nowrap">Score</TableHead>
              <TableHead className="text-right whitespace-nowrap">Events</TableHead>
              <TableHead className="text-right whitespace-nowrap">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RISK_ROWS.map((row) => {
              const badge = TIER_BADGE[row.tier];
              return (
                <TableRow
                  key={row.key}
                  className="cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-ink-50"
                  onClick={() => { /* drill target — wire to detail panel */ }}
                >
                  <TableCell className="whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        /* drill target — wire to detail panel */
                      }}
                      aria-label={`Inspect ${row.key} (${row.tierLabel} risk)`}
                      className="font-mono text-sm text-ink-900 -tracking-[0.14px] text-left bg-transparent p-0 outline-none rounded-xs focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {row.key}
                    </button>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={badge.variant}>
                      <StatusDot kind={badge.dot} />
                      {row.tierLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-800">
                    {row.score}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap font-mono tabular-nums text-ink-800">
                    {row.events}
                  </TableCell>
                  <TableCell className="text-right">
                    <Sparkline
                      points={row.trend}
                      tone={row.tier}
                      smooth={row.tier === 'normal'}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </div>
  );
}

