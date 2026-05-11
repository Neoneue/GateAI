import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { VENDOR_META, PROVIDER_ORDER } from '@/components/icons/vendor-meta';

/**
 * CMP-001 · Colors
 *
 * The palette spec sheet. Every color in the design system traces back to a
 * token defined in src/index.css's @theme block. Five ramps (ink, blue,
 * success, warning, danger) all 11-step (50–950) OKLCH. Syntax tokens for
 * code surfaces; vendor brands sit outside the contract.
 *
 * Step roles (Geist/Radix-inspired): 50–100 subtle backgrounds, 200 borders,
 * 300 strong borders / ghost-bg-hover, 400 placeholder, 500 secondary text /
 * chart strokes, 600 saturated mid (default solid), 700 saturated dark /
 * primary text on tinted bg, 800–900 high-contrast text, 950 deepest.
 */

interface Step {
  scale: string;
  /** the value as written in index.css — kept as a string so we surface
   *  the literal form (hex or oklch) rather than fabricating a conversion. */
  value: string;
}

interface Palette {
  code: string;
  name: string;
  description: string;
  meta: string;
  /** css var token prefix — e.g. "ink" → var(--color-ink-{scale}) */
  tokenPrefix: string;
  steps: Step[];
}

const INK: Palette = {
  code: 'CMP-001.1 — INK',
  name: 'Ink',
  description: 'Neutral surfaces & text. Pure-neutral OKLCH ramp; ink-900 anchored near #09090B for primary-button identity.',
  meta: '11 steps · --color-ink-*',
  tokenPrefix: 'ink',
  steps: [
    { scale: '50',  value: 'oklch(0.985 0 0)' },
    { scale: '100', value: 'oklch(0.960 0 0)' },
    { scale: '200', value: 'oklch(0.910 0 0)' },
    { scale: '300', value: 'oklch(0.820 0 0)' },
    { scale: '400', value: 'oklch(0.680 0 0)' },
    { scale: '500', value: 'oklch(0.530 0 0)' },
    { scale: '600', value: 'oklch(0.380 0 0)' },
    { scale: '700', value: 'oklch(0.260 0 0)' },
    { scale: '800', value: 'oklch(0.165 0 0)' },
    { scale: '900', value: 'oklch(0.090 0 0)' },
    { scale: '950', value: 'oklch(0.045 0 0)' },
  ],
};

const BLUE: Palette = {
  code: 'CMP-001.2 — BLUE',
  name: 'Blue',
  description: 'Brand accent. Anchored to the brand mark (#1F2FCE) at blue-700; ramp derived around it.',
  meta: '11 steps · --color-blue-*',
  tokenPrefix: 'blue',
  steps: [
    { scale: '50',  value: 'oklch(0.970 0.020 268.85)' },
    { scale: '100', value: 'oklch(0.940 0.040 268.85)' },
    { scale: '200', value: 'oklch(0.890 0.075 268.85)' },
    { scale: '300', value: 'oklch(0.810 0.130 268.85)' },
    { scale: '400', value: 'oklch(0.700 0.180 268.85)' },
    { scale: '500', value: 'oklch(0.580 0.215 268.85)' },
    { scale: '600', value: 'oklch(0.470 0.232 268.85)' },
    { scale: '700', value: 'oklch(0.345 0.224 268.85)' },
    { scale: '800', value: 'oklch(0.275 0.175 268.85)' },
    { scale: '900', value: 'oklch(0.215 0.130 268.85)' },
    { scale: '950', value: 'oklch(0.145 0.085 268.85)' },
  ],
};

const SUCCESS: Palette = {
  code: 'CMP-001.3 — SUCCESS',
  name: 'Success',
  description: 'Positive status. Tailwind v4 green ramp OKLCH.',
  meta: '11 steps · --color-success-*',
  tokenPrefix: 'success',
  steps: [
    { scale: '50',  value: 'oklch(0.982 0.018 155.83)' },
    { scale: '100', value: 'oklch(0.962 0.044 156.74)' },
    { scale: '200', value: 'oklch(0.925 0.084 155.99)' },
    { scale: '300', value: 'oklch(0.871 0.150 154.45)' },
    { scale: '400', value: 'oklch(0.792 0.209 151.71)' },
    { scale: '500', value: 'oklch(0.723 0.219 149.58)' },
    { scale: '600', value: 'oklch(0.627 0.194 149.21)' },
    { scale: '700', value: 'oklch(0.527 0.154 150.07)' },
    { scale: '800', value: 'oklch(0.448 0.119 151.33)' },
    { scale: '900', value: 'oklch(0.393 0.095 152.54)' },
    { scale: '950', value: 'oklch(0.266 0.065 152.93)' },
  ],
};

const WARNING: Palette = {
  code: 'CMP-001.4 — WARNING',
  name: 'Warning',
  description: 'Caution / elevated state. Tailwind v4 amber ramp OKLCH.',
  meta: '11 steps · --color-warning-*',
  tokenPrefix: 'warning',
  steps: [
    { scale: '50',  value: 'oklch(0.987 0.022 95.28)' },
    { scale: '100', value: 'oklch(0.962 0.059 95.62)' },
    { scale: '200', value: 'oklch(0.924 0.120 95.75)' },
    { scale: '300', value: 'oklch(0.879 0.169 91.61)' },
    { scale: '400', value: 'oklch(0.828 0.189 84.43)' },
    { scale: '500', value: 'oklch(0.769 0.188 70.08)' },
    { scale: '600', value: 'oklch(0.666 0.179 58.32)' },
    { scale: '700', value: 'oklch(0.555 0.163 49.00)' },
    { scale: '800', value: 'oklch(0.473 0.137 46.20)' },
    { scale: '900', value: 'oklch(0.414 0.112 45.90)' },
    { scale: '950', value: 'oklch(0.279 0.077 45.64)' },
  ],
};

const DANGER: Palette = {
  code: 'CMP-001.5 — DANGER',
  name: 'Danger',
  description: 'Destructive / failure. Tailwind v4 red ramp OKLCH. Aliased by --destructive at danger-600.',
  meta: '11 steps · --color-danger-*',
  tokenPrefix: 'danger',
  steps: [
    { scale: '50',  value: 'oklch(0.971 0.013 17.38)' },
    { scale: '100', value: 'oklch(0.936 0.032 17.72)' },
    { scale: '200', value: 'oklch(0.885 0.062 18.33)' },
    { scale: '300', value: 'oklch(0.808 0.114 19.57)' },
    { scale: '400', value: 'oklch(0.704 0.191 22.22)' },
    { scale: '500', value: 'oklch(0.637 0.237 25.33)' },
    { scale: '600', value: 'oklch(0.577 0.245 27.33)' },
    { scale: '700', value: 'oklch(0.505 0.213 27.52)' },
    { scale: '800', value: 'oklch(0.444 0.177 26.90)' },
    { scale: '900', value: 'oklch(0.396 0.141 25.72)' },
    { scale: '950', value: 'oklch(0.258 0.092 26.04)' },
  ],
};

interface SingleTone {
  /** label rendered under the swatch */
  scale: string;
  /** css var name without the --color- prefix */
  token: string;
  value: string;
}

const SYNTAX: { code: string; name: string; description: string; meta: string; steps: SingleTone[] } = {
  code: 'CMP-001.6 — SYNTAX',
  name: 'Syntax',
  description: 'Code highlight tokens. Named by intent, not hue — one CodeBlock paints all variants.',
  meta: '4 tokens · --color-syntax-*',
  steps: [
    { scale: 'keyword',        token: 'syntax-keyword',        value: 'oklch(0.554\n0.197 39.9)' },
    { scale: 'variable',       token: 'syntax-variable',       value: 'oklch(0.792\n0.171 65.1)' },
    { scale: 'property',       token: 'syntax-property',       value: '#4165FF' },
    { scale: 'terminal-blue',  token: 'syntax-terminal-blue',  value: '#6A8EFB' },
  ],
};

interface VendorTone {
  scale: string;   // brand label
  token: string;   // VENDOR_META key
  value: string;   // hex literal
}

const VENDORS: { code: string; name: string; description: string; meta: string; steps: VendorTone[] } = {
  code: 'CMP-001.7 — VENDOR',
  name: 'Vendor brand',
  description: 'External brand colors. Outside the contract — these represent vendor identity, not surface design.',
  meta: '8 brands · inline hex (no token)',
  steps: PROVIDER_ORDER.map((v) => ({
    scale: VENDOR_META[v].label,
    token: v,
    value: VENDOR_META[v].color,
  })),
};

const CHART: { code: string; name: string; description: string; meta: string; steps: SingleTone[] } = {
  code: 'CMP-001.8 — CHART',
  name: 'Chart series',
  description: 'Categorical palette for graph series. Picked by index, not by data content — series N always gets slot N. Bright mid-saturation OKLCH (L 0.62–0.85, C 0.16–0.22); adjacent hues separated by ≥85° so neighbors stay distinct without lightness alternation. See docs/chart-colors.md for the design rationale.',
  meta: '8 slots · --color-chart-1..8',
  steps: [
    { scale: 'blue',   token: 'chart-1', value: 'oklch(0.62\n0.18 255)' },
    { scale: 'orange', token: 'chart-2', value: 'oklch(0.72\n0.17 50)' },
    { scale: 'green',  token: 'chart-3', value: 'oklch(0.72\n0.20 145)' },
    { scale: 'purple', token: 'chart-4', value: 'oklch(0.70\n0.18 290)' },
    { scale: 'coral',  token: 'chart-5', value: 'oklch(0.65\n0.20 18)' },
    { scale: 'teal',   token: 'chart-6', value: 'oklch(0.75\n0.13 195)' },
    { scale: 'amber',   token: 'chart-7', value: 'oklch(0.85\n0.16 88)' },
    { scale: 'magenta', token: 'chart-8', value: 'oklch(0.68\n0.20 335)' },
  ],
};

/* ─── helpers ─────────────────────────────────────────────────────────── */

function PaletteCard({
  palette,
  background,
}: {
  palette: Palette;
  /** how to compute the CSS background for each swatch from a step */
  background: (step: Step) => string;
}) {
  const stepCount = palette.steps.length;
  return (
    <div className="flex flex-col gap-3 bg-ink-50">
      <SectionHeader code={palette.code} hint={palette.description} />
      <div
        className="flex flex-col rounded-md gap-4 bg-white p-6 shadow-(--shadow-border)"
      >
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="font-sans font-medium text-ink-900 text-base m-0">
              {palette.name}
            </h3>
            <div className="font-sans text-sm text-ink-500 mt-1">
              {palette.description}
            </div>
          </div>
          <div className="font-mono text-xs font-medium text-ink-500 uppercase tracking-[0.1em]">
            {palette.meta}
          </div>
        </div>
        <div
          className="grid gap-px rounded-sm overflow-hidden border border-ink-200"
          style={{ gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))` }}
        >
          {palette.steps.map((step) => (
            <div key={step.scale} className="flex flex-col">
              <div
                role="img"
                aria-label={`${palette.name} ${step.scale} swatch — ${step.value.replace(/\n/g, ' ')}`}
                className="aspect-square w-full"
                style={{ background: background(step) }}
              />
              <div className="flex flex-col gap-1 bg-white p-2">
                <div className="font-mono text-xs text-ink-800 font-medium">
                  {step.scale}
                </div>
                <div className="font-mono text-xs/4 text-ink-500 tabular-nums whitespace-pre-line">
                  {step.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SingleToneCard({
  code,
  name,
  description,
  meta,
  steps,
  background,
  caption = 'value',
}: {
  code: string;
  name: string;
  description: string;
  meta: string;
  steps: SingleTone[] | VendorTone[];
  background: (step: SingleTone | VendorTone) => string;
  /** what the second line under each swatch represents */
  caption?: string;
}) {
  void caption; // accepted for future use; kept off-screen for now
  const stepCount = steps.length;
  return (
    <div className="flex flex-col gap-3 bg-ink-50">
      <SectionHeader code={code} hint={description} />
      <div className="flex flex-col rounded-md gap-4 bg-white p-6 shadow-(--shadow-border)">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="font-sans font-medium text-ink-900 text-base m-0">{name}</h3>
            <div className="font-sans text-sm text-ink-500 mt-1">{description}</div>
          </div>
          <div className="font-mono text-xs font-medium text-ink-500 uppercase tracking-[0.1em]">{meta}</div>
        </div>
        <div
          className="grid gap-px rounded-sm overflow-hidden border border-ink-200"
          style={{ gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))` }}
        >
          {steps.map((step) => (
            <div key={step.token} className="flex flex-col">
              <div
                role="img"
                aria-label={`${name} ${step.scale} swatch — ${step.value.replace(/\n/g, ' ')}`}
                className="aspect-square w-full"
                style={{ background: background(step) }}
              />
              <div className="flex flex-col gap-1 bg-white p-2">
                <div className="font-mono text-xs text-ink-800 font-medium">
                  {step.scale}
                </div>
                <div className="font-mono text-xs/4 text-ink-500 tabular-nums whitespace-pre-line">
                  {step.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── artboard ────────────────────────────────────────────────────────── */

export function CMP001Colors() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50 pt-14">
        <ArtboardHeader
          code="CMP-001"
          title="Colors"
          description="OKLCH ramps, 11-step (50–950) Tailwind-aligned naming. Five ramps: ink (neutrals), blue (brand, anchored to the brand mark at blue-700), success/warning/danger (Tailwind v4 green/amber/red OKLCH). Syntax tokens for code surfaces; vendor brands sit outside the contract; chart series use a standalone 8-slot categorical palette."
          parts="5 ramps + syntax + vendor + chart"
        />

        <div className="flex flex-col gap-7">
          {/* CMP-001.1 — INK */}
          <PaletteCard
            palette={INK}
            background={(step) => step.value.replace(/\n/g, ' ')}
          />

          {/* CMP-001.2 — BLUE */}
          <PaletteCard
            palette={BLUE}
            background={(step) => step.value.replace(/\n/g, ' ')}
          />

          {/* CMP-001.3 — SUCCESS */}
          <PaletteCard
            palette={SUCCESS}
            background={(step) => step.value.replace(/\n/g, ' ')}
          />

          {/* CMP-001.4 — WARNING */}
          <PaletteCard
            palette={WARNING}
            background={(step) => step.value.replace(/\n/g, ' ')}
          />

          {/* CMP-001.5 — DANGER */}
          <PaletteCard
            palette={DANGER}
            background={(step) => step.value.replace(/\n/g, ' ')}
          />

          {/* CMP-001.6 — SYNTAX */}
          <SingleToneCard
            code={SYNTAX.code}
            name={SYNTAX.name}
            description={SYNTAX.description}
            meta={SYNTAX.meta}
            steps={SYNTAX.steps}
            background={(step) => `var(--color-${(step as SingleTone).token})`}
          />

          {/* CMP-001.7 — VENDOR */}
          <SingleToneCard
            code={VENDORS.code}
            name={VENDORS.name}
            description={VENDORS.description}
            meta={VENDORS.meta}
            steps={VENDORS.steps}
            background={(step) => (step as VendorTone).value}
          />

          {/* CMP-001.8 — CHART */}
          <SingleToneCard
            code={CHART.code}
            name={CHART.name}
            description={CHART.description}
            meta={CHART.meta}
            steps={CHART.steps}
            background={(step) => `var(--color-${(step as SingleTone).token})`}
          />
        </div>
      </div>
    </div>
  );
}
