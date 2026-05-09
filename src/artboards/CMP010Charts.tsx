import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { HeroNumeric } from '@/components/ui/hero-numeric';
import {
  VENDOR_META,
  VendorAvatar,
  type Vendor,
} from '@/components/icons/vendor-meta';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

export function CMP010Charts() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-010"
          title="Charts"
          description="Line + area for time series, stacked bars for category breakdowns. Both use the same axis treatment, same legend, same tooltip."
          parts="2 chart types"
        />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-010.1 — LINE + AREA"
              hint="Requests · last 14 days"
            />
            <div className="flex justify-center">
              <SpendTrendCard />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-010.2 — STACKED BARS"
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
 * CMP-010.1 — Spend trend (grouped bars + line trend)
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
    <Card className="w-[720px] rounded-sm p-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-medium -tracking-[0.25px] text-ink-900">
          Spend trend
        </div>
        <div className="flex items-center gap-5">
          <LegendDot color="var(--color-blue-700)" label="BYO keys" />
          <LegendDot color="var(--color-blue-300)" label="Managed-key" />
        </div>
        <div
          role="img"
          aria-label="Date range: Apr 17 to May 17 2026 (specimen)"
          className="flex items-center h-[34px] rounded-sm px-3 gap-2 bg-white border border-ink-200 text-sm -tracking-[0.14px] text-ink-900"
        >
          <Calendar aria-hidden className="size-3.5 text-ink-500" strokeWidth={1.75} />
          Apr 17 – May 17 2026
        </div>
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
            stroke="var(--color-ink-200)"
            strokeDasharray="3 4"
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{
              fontSize: 12,
              fill: 'var(--color-ink-500)',
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
              fill: 'var(--color-ink-500)',
            }}
            width={48}
          />
          <ChartTooltip
            cursor={{
              stroke: 'var(--color-ink-500)',
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
              fill: 'var(--color-white)',
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
 * CMP-010.2 — Cost by model (microchart + legend + mini table)
 * ───────────────────────────────────────────────────────────────────────── */

/* Chart-series → vendor mapping. Mirrors CMP-011's MODEL_LEGEND so both
 * charts render the same 5 vendors in their brand colors from VENDOR_META.
 * Anthropic Haiku opts into the secondary shade so it separates visibly
 * from Anthropic Sonnet at the same scale. */
type ModelRow = {
  key: 'sonnet' | 'gpt4o' | 'haiku' | 'llama' | 'mistral';
  label: string;
  vendor: Vendor;
  /** Optional chart-palette token to override the vendor brand color. Use
   *  for twin-vendor disambiguation (e.g. Anthropic Sonnet keeps chart-2
   *  orange; Haiku takes chart-7 amber so the two Anthropic series read
   *  as distinct slots). Must be a `--color-chart-N` token — never a
   *  semantic ramp. */
  colorOverride?: string;
  cost: string;
  costValue: number;
  delta: string;
};

const MODELS: readonly ModelRow[] = [
  {
    key: 'sonnet',
    label: 'Claude Sonnet 4.5',
    vendor: 'anthropic',
    cost: '$487.32',
    costValue: 487.32,
    delta: '+12.4%',
  },
  {
    key: 'gpt4o',
    label: 'GPT-4o',
    vendor: 'openai',
    cost: '$312.18',
    costValue: 312.18,
    delta: '+5.2%',
  },
  {
    key: 'haiku',
    label: 'Claude Haiku',
    vendor: 'anthropic',
    colorOverride: 'var(--color-chart-7)',
    cost: '$285.40',
    costValue: 285.40,
    delta: '-2.1%',
  },
  {
    key: 'llama',
    label: 'Llama 3.3',
    vendor: 'meta',
    cost: '$134.62',
    costValue: 134.62,
    delta: '+18.6%',
  },
  {
    key: 'mistral',
    label: 'Mistral Large',
    vendor: 'mistral',
    cost: '$28.30',
    costValue: 28.30,
    delta: '+44.2%',
  },
] as const;

function seriesColor(model: ModelRow): string {
  return model.colorOverride ?? VENDOR_META[model.vendor].color;
}

const costChartConfig = {
  cost: { label: 'Cost' },
} satisfies ChartConfig;

const COST_CHART_DATA = MODELS.map((m) => ({
  label: m.label,
  cost: m.costValue,
  fill: seriesColor(m),
}));


function CostByModelCard() {
  return (
    <Card className="w-[720px] rounded-sm p-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-medium -tracking-[0.25px] text-ink-900">
          Cost by model
        </div>
        <div
          role="img"
          aria-label="Period: Last 7 days (specimen)"
          className="flex items-center justify-center h-8 rounded-sm px-3 gap-2 bg-white border border-ink-200 text-sm font-medium -tracking-[0.14px] text-ink-900"
        >
          Last 7 days
          <ChevronDown
            aria-hidden
            className="size-3.5 text-ink-500"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <HeroNumeric size="lg">$1,247.82</HeroNumeric>
        <DeltaTag delta="+12.6%" note="vs last 7d" />
      </div>

      <ChartContainer
        config={costChartConfig}
        className="aspect-auto h-[176px] w-full mt-2"
      >
        <BarChart
          accessibilityLayer
          data={COST_CHART_DATA}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            horizontal
            vertical={false}
            stroke="var(--color-ink-200)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            height={28}
            interval={0}
            tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 11, fill: 'var(--color-ink-500)' }}
            tickFormatter={(v: number) => `$${v}`}
            width={48}
          />
          <ChartTooltip
            cursor={{ fill: 'transparent' }}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(label) => label}
                formatter={(value) => `$${(value as number).toFixed(2)}`}
              />
            }
          />
          <Bar dataKey="cost" radius={0} maxBarSize={48} isAnimationActive={false}>
            {COST_CHART_DATA.map((d) => (
              <Cell key={d.label} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      <div className="flex flex-col w-full">
        <div className="flex items-center py-2 border-b border-ink-200">
          <div className="grow text-sm text-ink-500">Model</div>
          <div className="w-30 text-right shrink-0 text-sm text-ink-500">
            Cost
          </div>
          <div className="w-35 text-right shrink-0 text-sm text-ink-500">
            Trend
          </div>
        </div>
        {MODELS.map((m, i) => (
          <div
            key={m.key}
            className={
              i === MODELS.length - 1
                ? 'flex items-center py-2'
                : 'flex items-center py-2 border-b border-ink-200'
            }
          >
            <div className="grow flex items-center gap-2">
              <VendorAvatar vendor={m.vendor} />
              <span className="text-sm text-ink-900">{m.label}</span>
            </div>
            <div className="w-30 text-right shrink-0 text-sm tabular-nums text-ink-800">
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
  const color = negative ? 'text-danger-500' : 'text-success-500';
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
        <span className="pl-1 text-sm text-ink-500">{note}</span>
      ) : null}
    </div>
  );
}
