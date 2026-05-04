import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Line, XAxis } from 'recharts';
import {
  ChartContainer,
  type ChartConfig,
} from '@/components/ui/chart';

/* ─────────────────────────────────────────────────────────────────────────
 * DeltaTag — directional arrow + delta value, optional trailing note.
 * Negative deltas (leading "-") render danger; otherwise success.
 * ───────────────────────────────────────────────────────────────────────── */

export function DeltaTag({ delta, note }: { delta: string; note?: string }) {
  const negative = delta.trim().startsWith('-');
  const Icon = negative ? ArrowDownRight : ArrowUpRight;
  const color = negative ? 'text-danger-2' : 'text-success-2';
  return (
    <div className="inline-flex items-center gap-0.5">
      <Icon className={`size-3.5 ${color}`} strokeWidth={1.75} />
      <span className={`text-sm font-medium -tracking-[0.25px] ${color}`}>{delta}</span>
      {note ? (
        <span className="pl-1 text-sm -tracking-[0.25px] text-ink-400">{note}</span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * CompactKpi — dense KPI card. Title + value + (delta or noteLine) + sparkline.
 * `flat` strips the card chrome (border + radius) for use inside a divided row.
 * ───────────────────────────────────────────────────────────────────────── */

export function CompactKpi({
  title,
  value,
  delta,
  deltaNote,
  noteLine,
  spark,
  flat = false,
}: {
  title: string;
  value: string;
  delta?: string;
  deltaNote?: string;
  noteLine?: string;
  spark: React.ReactNode;
  flat?: boolean;
}) {
  const containerCls = flat
    ? 'flex flex-col gap-3 bg-white p-5'
    : 'flex flex-col rounded-lg gap-3 bg-white border border-ink-100 p-5';
  return (
    <div className={containerCls}>
      <div className="text-sm font-medium -tracking-[0.14px] text-ink-900">{title}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl/8 font-medium tabular-nums -tracking-[0.5px] text-ink-900">
          {value}
        </div>
        {delta ? (
          <DeltaTag delta={delta} note={deltaNote} />
        ) : (
          <span className="text-sm -tracking-[0.25px] text-ink-400">{noteLine}</span>
        )}
      </div>
      {spark}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * CompactSpark — small recharts AreaChart sparkline (~36px tall).
 * Optional `endDot` marks the final point; `noGrid` hides the dashed grid.
 * ───────────────────────────────────────────────────────────────────────── */

const compactSparkConfig: ChartConfig = {
  v: {
    label: 'Value',
  },
};

export function CompactSpark({
  colorVar,
  data,
  endDot = false,
  noGrid = false,
}: {
  colorVar: string;
  data: number[];
  endDot?: boolean;
  noGrid?: boolean;
}) {
  const points = data.map((v, i) => ({ i, v }));
  const gradId = `cmp007-spark-${colorVar.replace(/[^a-zA-Z0-9]/g, '')}`;
  const lastIndex = points.length - 1;
  return (
    <ChartContainer
      config={compactSparkConfig}
      className="aspect-auto h-9 w-full mt-1"
    >
      <AreaChart
        accessibilityLayer
        data={points}
        margin={{ top: 2, right: 4, left: 0, bottom: 2 }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorVar} stopOpacity={0.22} />
            <stop offset="100%" stopColor={colorVar} stopOpacity={0} />
          </linearGradient>
        </defs>
        {noGrid ? null : (
          <CartesianGrid
            horizontal
            vertical={false}
            stroke="var(--color-ink-100)"
            strokeDasharray="2 3"
          />
        )}
        <Area
          dataKey="v"
          type="linear"
          stroke={colorVar}
          strokeWidth={1.5}
          fill={`url(#${gradId})`}
          isAnimationActive={false}
          dot={false}
          activeDot={false}
        />
        {endDot ? (
          <Line
            dataKey="v"
            type="linear"
            stroke="transparent"
            isAnimationActive={false}
            dot={(props) => {
              const { cx, cy, index, key } = props as {
                cx: number;
                cy: number;
                index: number;
                key?: string | number;
              };
              if (index !== lastIndex) {
                return <g key={key ?? `dot-${index}`} />;
              }
              return (
                <circle
                  key={key ?? `dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={2.5}
                  fill={colorVar}
                />
              );
            }}
            activeDot={false}
          />
        ) : null}
        <XAxis dataKey="i" hide />
      </AreaChart>
    </ChartContainer>
  );
}
