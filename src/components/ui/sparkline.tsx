/* ─────────────────────────────────────────────────────────────────────────
 * Sparkline — tiny in-row SVG sparkline. Sized for table cells (default
 * 80×24px) where the recharts-based CompactSpark (h-9 = 36px) would
 * inflate row height. Tone variants paint stroke + fill from the
 * destructive / warning / ink semantic vars; with no tone, the line
 * picks blue or ink based on whether the trend is up or down.
 * ───────────────────────────────────────────────────────────────────────── */

export type SparklineTone = 'critical' | 'elevated' | 'normal';

export function Sparkline({
  points,
  tone,
  width = 80,
  height = 24,
}: {
  points: number[];
  tone?: SparklineTone;
  width?: number;
  height?: number;
}) {
  const w = width;
  const h = height;
  const padY = 2;
  // Horizontal inset keeps the end dot + start dot fully inside the viewBox
  // — without it, a circle of r=2 at cx=0 / cx=w gets half-clipped by the
  // SVG edge, and rounded stroke caps lose their cap radius.
  const padX = 3;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = (w - padX * 2) / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: padX + i * step,
    y: padY + (h - padY * 2) - ((p - min) / range) * (h - padY * 2),
  }));
  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(' ');
  const last = coords[coords.length - 1];
  const areaPath =
    `M ${coords[0].x.toFixed(1)},${h} ` +
    coords.map((c) => `L ${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ') +
    ` L ${last.x.toFixed(1)},${h} Z`;

  let stroke: string;
  let fill: string;
  let fillOpacity = 0.6;
  if (tone === 'critical') {
    stroke = 'var(--color-destructive)';
    fill = 'var(--color-destructive)';
    fillOpacity = 0.12;
  } else if (tone === 'elevated') {
    stroke = 'var(--color-warning-700)';
    fill = 'var(--color-warning-700)';
    fillOpacity = 0.12;
  } else if (tone === 'normal') {
    stroke = 'var(--color-ink-500)';
    fill = 'var(--color-ink-300)';
    fillOpacity = 0.6;
  } else {
    const isUp = points[points.length - 1] >= points[0];
    stroke = isUp ? 'var(--color-blue-700)' : 'var(--color-ink-700)';
    fill = isUp ? 'var(--color-blue-100)' : 'var(--color-ink-200)';
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
      aria-hidden
    >
      <path d={areaPath} fill={fill} fillOpacity={fillOpacity} />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last.x} cy={last.y} r={2} fill={stroke} />
    </svg>
  );
}
