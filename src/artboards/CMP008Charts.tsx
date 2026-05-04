import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

export function CMP008Charts() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-008"
          title="Charts"
          description="Line + area for time series, stacked bars for category breakdowns. Both use the same axis treatment, same legend, same tooltip."
          parts="2 chart types"
        />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-008.1 — LINE + AREA"
              hint="Requests · last 14 days"
            />
            <div className="flex justify-center">
              <SpendTrendCard />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-008.2 — STACKED BARS"
              hint="Cost by model · last 7 days"
            />
            <div className="flex justify-center">
              <CostByModelCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-008.1 — Spend trend (grouped bars + line trend)
 * ───────────────────────────────────────────────────────────────────────── */

type SpendDatum = {
  date: string;
  byo: number;
  managed: number;
  trend: number;
  highlight: boolean;
};

const SPEND_DATA: SpendDatum[] = [
  { date: 'Apr 18', byo: 24, managed: 30, trend: 60, highlight: false },
  { date: 'Apr 21', byo: 46, managed: 36, trend: 90, highlight: false },
  { date: 'Apr 24', byo: 56, managed: 44, trend: 130, highlight: false },
  { date: 'Apr 27', byo: 92, managed: 64, trend: 175, highlight: true },
  { date: 'Apr 30', byo: 72, managed: 52, trend: 165, highlight: false },
  { date: 'May 03', byo: 84, managed: 58, trend: 195, highlight: false },
  { date: 'May 06', byo: 106, managed: 70, trend: 240, highlight: false },
  { date: 'May 09', byo: 120, managed: 82, trend: 280, highlight: false },
];

const spendChartConfig: ChartConfig = {
  byo: { label: 'BYO keys', color: 'var(--color-blue-700)' },
  managed: { label: 'Managed-key', color: 'var(--color-blue-300)' },
  trend: { label: 'Trend', color: 'var(--color-blue-700)' },
};

function SpendTrendCard() {
  return (
    <Card className="w-[720px] rounded-lg p-5 gap-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-medium -tracking-[0.25px] text-ink-900">
          Spend trend
        </div>
        <div className="flex items-center gap-5">
          <LegendDot color="var(--color-blue-700)" label="BYO keys" />
          <LegendDot color="var(--color-blue-300)" label="Managed-key" />
        </div>
        <button
          type="button"
          className="flex items-center h-[34px] rounded-lg px-3 gap-2 bg-white border border-ink-100 text-sm -tracking-[0.14px] text-ink-900"
        >
          <Calendar className="size-3.5 text-ink-400" strokeWidth={1.75} />
          Apr 17 – May 17 2026
        </button>
      </div>

      <ChartContainer
        config={spendChartConfig}
        className="aspect-auto h-[296px] w-full"
      >
        <ComposedChart
          accessibilityLayer
          data={SPEND_DATA}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
          barCategoryGap="20%"
          barGap={2}
        >
          <CartesianGrid
            horizontal
            vertical={false}
            stroke="var(--color-ink-100)"
            strokeDasharray="3 4"
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{
              fontSize: 12,
              fill: 'var(--color-ink-400)',
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            ticks={[0, 50, 100, 150, 200, 250, 300]}
            domain={[0, 300]}
            tickFormatter={(v) => `$${v}`}
            tick={{
              fontSize: 12,
              fill: 'var(--color-ink-400)',
            }}
            width={48}
          />
          <ChartTooltip
            cursor={{
              stroke: 'var(--color-ink-400)',
              strokeDasharray: '2 3',
              strokeOpacity: 0.6,
            }}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.date ?? ''
                }
                formatter={(value, name, item) => {
                  const label =
                    name === 'byo'
                      ? 'BYO keys'
                      : name === 'managed'
                        ? 'Managed-key'
                        : String(name);
                  if (name === 'trend') return null;
                  return (
                    <>
                      <div
                        className="size-2 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex flex-1 items-center justify-between gap-3 leading-none">
                        <span className="text-ink-600">{label}</span>
                        <span className="font-medium tabular-nums text-ink-900">
                          ${value}
                        </span>
                      </div>
                    </>
                  );
                }}
              />
            }
          />
          <Bar
            dataKey="byo"
            fill="var(--color-blue-700)"
            fillOpacity={0.7}
            radius={2}
            maxBarSize={10}
            isAnimationActive={false}
          />
          <Bar
            dataKey="managed"
            fill="var(--color-blue-300)"
            fillOpacity={0.7}
            radius={2}
            maxBarSize={10}
            isAnimationActive={false}
          />
          <Line
            dataKey="trend"
            type="monotone"
            stroke="var(--color-blue-700)"
            strokeWidth={2.5}
            isAnimationActive={false}
            dot={false}
            activeDot={{
              r: 5,
              fill: '#FFFFFF',
              stroke: 'var(--color-blue-700)',
              strokeWidth: 2.5,
            }}
          />
        </ComposedChart>
      </ChartContainer>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm -tracking-[0.14px] text-ink-900">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-008.2 — Cost by model (microchart + legend + mini table)
 * ───────────────────────────────────────────────────────────────────────── */

const MODELS = [
  {
    key: 'sonnet',
    label: 'Claude Sonnet 4.5',
    color: 'oklch(55.4% 0.197 39.9)',
    cost: '$487.32',
    delta: '+12.4%',
    bars: 18,
  },
  {
    key: 'gpt4o',
    label: 'GPT-4o',
    color: 'var(--color-blue-700)',
    cost: '$312.18',
    delta: '+5.2%',
    bars: 12,
  },
  {
    key: 'haiku',
    label: 'Claude Haiku',
    color: 'oklch(79.2% 0.171 65.1)',
    cost: '$285.40',
    delta: '-2.1%',
    bars: 10,
  },
  {
    key: 'llama',
    label: 'Llama 3.3',
    color: 'var(--color-blue-500)',
    cost: '$134.62',
    delta: '+18.6%',
    bars: 7,
  },
  {
    key: 'mistral',
    label: 'Mistral Large',
    color: 'var(--color-blue-300)',
    cost: '$28.30',
    delta: '+44.2%',
    bars: 3,
  },
] as const;

const MICRO_BAR_HEIGHTS = [
  54, 52, 56, 50, 53, 51, 49, 48, 47, 46, 44, 45, 43, 42, 41, 40, 39, 38, // sonnet
  37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, // gpt4o
  25, 24, 24, 23, 22, 22, 21, 20, 20, 19, // haiku
  18, 17, 17, 16, 15, 14, 13, // llama
  11, 9, 7, // mistral
  5, 4, // tail (ink-100)
];

function CostByModelCard() {
  let modelIdx = 0;
  let consumed = 0;
  const bars = MICRO_BAR_HEIGHTS.map((h, i) => {
    if (modelIdx < MODELS.length && consumed >= MODELS[modelIdx].bars) {
      modelIdx += 1;
      consumed = 0;
    }
    const color =
      modelIdx < MODELS.length ? MODELS[modelIdx].color : 'var(--color-ink-100)';
    consumed += 1;
    return { i, h, color };
  });

  return (
    <Card className="w-[720px] rounded-lg p-5 gap-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-medium -tracking-[0.25px] text-ink-900">
          Cost by model
        </div>
        <button
          type="button"
          className="flex items-center justify-center h-8 rounded-lg px-3 gap-1.5 bg-white border border-ink-100 text-sm font-medium -tracking-[0.14px] text-ink-900"
        >
          Last 7 days
          <ChevronDown
            className="size-3.5 text-ink-400"
            strokeWidth={1.75}
          />
        </button>
      </div>

      <div className="flex items-baseline gap-3">
        <div className="text-3xl/9 font-medium tabular-nums -tracking-[0.9px] text-ink-900">
          $1,247.82
        </div>
        <DeltaTag delta="+12.6%" note="vs last 7d" />
      </div>

      <div className="flex items-end h-14 w-full gap-2 shrink-0 mt-4">
        {bars.map((b) => (
          <div
            key={b.i}
            className="w-[5px] rounded-[1px] shrink-0"
            style={{ height: `${b.h}px`, backgroundColor: b.color }}
          />
        ))}
      </div>

      <div className="flex items-center flex-wrap gap-4">
        {MODELS.map((m) => (
          <div key={m.key} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: m.color }}
            />
            <span className="text-xs text-ink-400">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center py-2 border-b border-ink-100">
          <div className="grow text-sm text-ink-400">Model</div>
          <div className="w-30 text-right shrink-0 text-sm text-ink-400">
            Cost
          </div>
          <div className="w-35 text-right shrink-0 text-sm text-ink-400">
            Trend
          </div>
        </div>
        {MODELS.map((m, i) => (
          <div
            key={m.key}
            className={
              i === MODELS.length - 1
                ? 'flex items-center py-2'
                : 'flex items-center py-2 border-b border-ink-100'
            }
          >
            <div className="grow flex items-center gap-2">
              <span
                className="size-2 rounded-full shrink-0"
                style={{ backgroundColor: m.color }}
              />
              <span className="text-sm text-ink-900">{m.label}</span>
            </div>
            <div className="w-30 text-right shrink-0 text-sm font-medium tabular-nums text-ink-900">
              {m.cost}
            </div>
            <div className="w-35 flex items-center justify-end gap-1 shrink-0">
              <DeltaTag delta={m.delta} compact />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DeltaTag({
  delta,
  note,
  compact = false,
}: {
  delta: string;
  note?: string;
  compact?: boolean;
}) {
  const negative = delta.trim().startsWith('-');
  const Icon = negative ? ArrowDownRight : ArrowUpRight;
  const color = negative ? 'text-danger-2' : 'text-success-2';
  const iconSize = compact ? 'size-3' : 'size-3.5';
  return (
    <div className="inline-flex items-center gap-1">
      <Icon className={`${iconSize} ${color}`} strokeWidth={1.75} />
      <span
        className={`text-sm font-medium tabular-nums -tracking-[0.14px] ${color}`}
      >
        {delta}
      </span>
      {note ? (
        <span className="pl-1 text-sm text-ink-400">{note}</span>
      ) : null}
    </div>
  );
}
