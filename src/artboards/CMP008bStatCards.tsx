import { MoreHorizontal } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Customized,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { CompactKpi, CompactSpark, DeltaTag } from '@/components/ui/compact-kpi';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CMP008bStatCards() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-008b"
          title="Stat cards"
          description="Single metric, compare (this/last), status (with health dot), all with sparklines. The same KpiCard that powers the dashboard, just lined up."
          parts="3 layouts"
        />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-008b.2 — COMPACT + FLAT"
              hint=".compact for dense rails · .flat strips card chrome"
            />
            <Card className="p-7 rounded-sm">
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
            </Card>
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-008b.3 — STAT ROW"
              hint="KPIs with sparklines · 4 across"
            />
            <Card className="rounded-md p-0 gap-0">
              <div className="grid grid-cols-4 divide-x divide-ink-100">
                <CompactKpi
                  flat
                  title="Requests"
                  value="24,812"
                  delta="+12.4%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-ink-900)"
                      data={[10, 12, 11, 14, 13, 16, 15, 18, 20]}
                      endDot
                    />
                  }
                />
                <CompactKpi
                  flat
                  title="Tokens"
                  value="18.4 M"
                  delta="+8.7%"
                  spark={
                    <CompactSpark
                      colorVar="#FFA01F"
                      data={[10, 12, 11, 13, 14, 15, 17, 18, 20]}
                      endDot
                    />
                  }
                />
                <CompactKpi
                  flat
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
                <CompactKpi
                  flat
                  title="Spend"
                  value="$482"
                  delta="+14.8%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-blue-700)"
                      data={[10, 12, 11, 13, 14, 16, 17, 18, 20]}
                      endDot
                    />
                  }
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-lg gap-4 bg-white border border-ink-100 p-5">
      {children}
    </div>
  );
}

function KpiHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-base font-medium -tracking-[0.25px] text-ink-900">
        {title}
      </div>
      <Button variant="ghost" size="icon-xs" aria-label="More" className="text-ink-900">
        <MoreHorizontal />
      </Button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * KpiCompareLine — recharts AreaChart with hover tooltip (Apr 24)
 * ───────────────────────────────────────────────────────────────────────── */

const LINE_DATA = [
  { day: 'Mon', date: 'Apr 21', requests: 5800 },
  { day: 'Tue', date: 'Apr 22', requests: 6200 },
  { day: 'Wed', date: 'Apr 23', requests: 6450 },
  { day: 'Thu', date: 'Apr 24', requests: 7100 },
  { day: 'Fri', date: 'Apr 25', requests: 7050 },
  { day: 'Sat', date: 'Apr 26', requests: 7600 },
  { day: 'Sun', date: 'Apr 27', requests: 8093 },
];

const lineChartConfig: ChartConfig = {
  requests: {
    label: 'Requests',
    color: 'var(--color-blue-700)',
  },
};

function KpiCompareLine({
  title,
  value,
  delta,
  deltaNote,
}: {
  title: string;
  value: string;
  delta: string;
  deltaNote: string;
}) {
  return (
    <KpiCardShell>
      <KpiHeader title={title} />
      <div className="flex items-baseline gap-2">
        <div className="text-3xl/9 font-medium tabular-nums -tracking-[0.9px] text-ink-900">
          {value}
        </div>
        <DeltaTag delta={delta} note={deltaNote} />
      </div>
      <ChartContainer
        config={lineChartConfig}
        className="aspect-auto h-[100px] w-full"
      >
        <AreaChart
          accessibilityLayer
          data={LINE_DATA}
          margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
        >
          <defs>
            <linearGradient id="cmp007-line-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-blue-500)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-blue-500)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelKey="date"
                labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
              />
            }
          />
          <Area
            dataKey="requests"
            type="monotone"
            stroke="var(--color-blue-700)"
            strokeWidth={2}
            fill="url(#cmp007-line-fill)"
            activeDot={{
              r: 4,
              fill: '#FFFFFF',
              stroke: 'var(--color-blue-700)',
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-sm -tracking-[0.25px] text-ink-400 text-left first:text-left">
            {d}
          </div>
        ))}
      </div>
    </KpiCardShell>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * KpiStatus — recharts horizontal stacked BarChart (single row, 4 segments)
 * ───────────────────────────────────────────────────────────────────────── */

const STATUS_LEGEND = [
  { key: 'promptInjection', color: '#3B5DF3', label: 'Prompt-injection', pct: '55%', value: 55 },
  { key: 'jailbreak', color: '#FFA01F', label: 'Jailbreak', pct: '23%', value: 23 },
  { key: 'pii', color: '#DC2626', label: 'PII', pct: '13%', value: 13 },
  { key: 'dataExfiltration', color: '#7C3AED', label: 'Data exfiltration', pct: '9%', value: 9 },
] as const;

const statusChartConfig: ChartConfig = {
  promptInjection: { label: 'Prompt-injection', color: '#3B5DF3' },
  jailbreak: { label: 'Jailbreak', color: '#FFA01F' },
  pii: { label: 'PII', color: '#DC2626' },
  dataExfiltration: { label: 'Data exfiltration', color: '#7C3AED' },
};

const STATUS_DATA = [
  {
    name: 'Block distribution',
    promptInjection: 55,
    jailbreak: 23,
    pii: 13,
    dataExfiltration: 9,
  },
];

function KpiStatus() {
  return (
    <KpiCardShell>
      <KpiHeader title="Block Rate · 7d" />
      <div className="flex items-baseline gap-3">
        <div className="text-3xl/9 font-medium tabular-nums -tracking-[0.9px] text-ink-900">
          0.24%
        </div>
        <div className="text-sm -tracking-[0.25px] text-ink-400">+0.06pp · 116 blocked</div>
      </div>
      <ChartContainer
        config={statusChartConfig}
        className="aspect-auto h-3 w-full overflow-clip rounded-md"
      >
        <BarChart
          accessibilityLayer
          layout="vertical"
          data={STATUS_DATA}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barCategoryGap={0}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <ChartTooltip
            cursor={{ fill: 'transparent' }}
            content={<ChartTooltipContent hideLabel indicator="dot" />}
          />
          {STATUS_LEGEND.map((row, i) => (
            <Bar
              key={row.key}
              dataKey={row.key}
              stackId="a"
              fill={row.color}
              isAnimationActive={false}
              radius={
                i === 0
                  ? [6, 0, 0, 6]
                  : i === STATUS_LEGEND.length - 1
                    ? [0, 6, 6, 0]
                    : 0
              }
            />
          ))}
        </BarChart>
      </ChartContainer>
      <div className="flex flex-col gap-2">
        {STATUS_LEGEND.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
              <span className="text-sm -tracking-[0.25px] text-ink-900">{row.label}</span>
            </div>
            <span className="text-sm tabular-nums -tracking-[0.25px] text-ink-400">{row.pct}</span>
          </div>
        ))}
      </div>
    </KpiCardShell>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * KpiCompareBars — recharts BarChart, 7 vertical bars, Apr 24 highlighted
 * ───────────────────────────────────────────────────────────────────────── */

const COST_DATA = [
  { day: 'Mon', date: 'Apr 21', cost: 38, highlight: false },
  { day: 'Tue', date: 'Apr 22', cost: 56, highlight: false },
  { day: 'Wed', date: 'Apr 23', cost: 88, highlight: true },
  { day: 'Thu', date: 'Apr 24', cost: 50, highlight: false },
  { day: 'Fri', date: 'Apr 25', cost: 42, highlight: false },
  { day: 'Sat', date: 'Apr 26', cost: 64, highlight: false },
  { day: 'Sun', date: 'Apr 27', cost: 38, highlight: false },
];

const HIGHLIGHT_LABEL = 'Apr 24';

const costChartConfig: ChartConfig = {
  cost: {
    label: 'Cost',
    color: 'var(--color-blue-700)',
  },
};

type CartesianViewBox = { x: number; y: number; width: number; height: number };

function HighlightLabel({ viewBox }: { viewBox?: CartesianViewBox }) {
  if (!viewBox) return null;
  // Position the floating "Apr 24" pill at the top-center of the highlighted column.
  const highlightIdx = COST_DATA.findIndex((d) => d.highlight);
  const colWidth = viewBox.width / COST_DATA.length;
  const cx = viewBox.x + colWidth * highlightIdx + colWidth / 2;
  const top = viewBox.y;
  const w = 60;
  const h = 24;
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={top}
        width={w}
        height={h}
        rx={6}
        ry={6}
        fill="#FFFFFF"
        stroke="#E4E4E7"
      />
      <text
        x={cx}
        y={top + h / 2 + 4}
        fontFamily="Geist"
        fontSize={12}
        fill="#09090B"
        fontWeight={500}
        textAnchor="middle"
      >
        {HIGHLIGHT_LABEL}
      </text>
    </g>
  );
}

function KpiCompareBars({
  title,
  value,
  delta,
  deltaNote,
}: {
  title: string;
  value: string;
  delta: string;
  deltaNote: string;
}) {
  return (
    <KpiCardShell>
      <KpiHeader title={title} />
      <div className="flex items-baseline gap-2">
        <div className="text-3xl/9 font-semibold tabular-nums -tracking-[1px] text-ink-900">
          {value}
        </div>
        <DeltaTag delta={delta} note={deltaNote} />
      </div>
      <div className="flex flex-col gap-2">
        <ChartContainer
          config={costChartConfig}
          className="aspect-auto h-29 w-full"
        >
          <BarChart
            accessibilityLayer
            data={COST_DATA}
            margin={{ top: 32, right: 0, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            <defs>
              <linearGradient id="cmp007-bar-highlight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-blue-700)" />
                <stop offset="100%" stopColor="var(--color-blue-500)" />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={{ fill: 'transparent' }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelKey="date"
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
                />
              }
            />
            <Bar dataKey="cost" radius={13} maxBarSize={26} isAnimationActive={false}>
              {COST_DATA.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.highlight ? 'url(#cmp007-bar-highlight)' : 'var(--color-ink-100)'
                  }
                />
              ))}
            </Bar>
            <Customized component={HighlightLabel as never} />
          </BarChart>
        </ChartContainer>
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-sm -tracking-[0.25px] text-ink-400 text-center">
              {d}
            </div>
          ))}
        </div>
      </div>
    </KpiCardShell>
  );
}

