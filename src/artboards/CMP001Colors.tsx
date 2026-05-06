import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { VENDOR_META, PROVIDER_ORDER } from '@/components/icons/vendor-meta';

/**
 * CMP-001 · Colors
 *
 * The palette spec sheet. Every color in the design system traces back to a
 * token defined in src/index.css's @theme block. This artboard surfaces each
 * ramp + each single-tone semantic token + the syntax tokens used by code
 * cards. Vendor brand colors get their own section as the documented
 * exception — they are external identities, not surface design.
 *
 * Values are read directly from src/index.css. Ink is hex by intent (hard
 * pinned neutrals). Blue is OKLCH (perceptually uniform brand ramp).
 * Semantic + syntax mix the two depending on whether the token is anchored
 * to the blue ramp or pinned to a brand-spec hex.
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
  description: 'Surfaces & text. Hard-pinned neutrals — the spine of every layout.',
  meta: '12 steps · --color-ink-*',
  tokenPrefix: 'ink',
  steps: [
    { scale: '25',  value: '#F8F9FB' },
    { scale: '50',  value: '#F1F4F6' },
    { scale: '75',  value: '#E9EBEE' },
    { scale: '100', value: '#E4E4E7' },
    { scale: '200', value: '#D1D5D9' },
    { scale: '300', value: '#9FA5AC' },
    { scale: '400', value: '#71717B' },
    { scale: '500', value: '#6E757D' },
    { scale: '600', value: '#50565D' },
    { scale: '700', value: '#1F2328' },
    { scale: '800', value: '#111417' },
    { scale: '900', value: '#09090B' },
  ],
};

const BLUE: Palette = {
  code: 'CMP-001.2 — BLUE',
  name: 'Blue',
  description: 'Brand accent. Saturated blue ramp from pale tints down to near-black.',
  meta: '11 steps · --color-blue-*',
  tokenPrefix: 'blue',
  steps: [
    { scale: '50',  value: '#EBF0FF' },
    { scale: '100', value: '#E1E9FE' },
    { scale: '200', value: '#C2D3FF' },
    { scale: '300', value: '#9DB8FF' },
    { scale: '400', value: '#6A8EFB' },
    { scale: '500', value: '#4064FF' },
    { scale: '600', value: '#2942D6' },
    { scale: '700', value: '#1F2FCE' },
    { scale: '800', value: '#13225F' },
    { scale: '900', value: '#0C1638' },
    { scale: '950', value: '#060B1D' },
  ],
};

interface SingleTone {
  /** label rendered under the swatch */
  scale: string;
  /** css var name without the --color- prefix */
  token: string;
  value: string;
}

const SEMANTIC: { code: string; name: string; description: string; meta: string; steps: SingleTone[] } = {
  code: 'CMP-001.3 — SEMANTIC',
  name: 'Semantic',
  description: 'Status colors. Single tones, no ramp — each token names an intent.',
  meta: '5 tokens · --color-{primary,success,warning,danger}',
  steps: [
    { scale: 'primary',    token: 'primary',    value: 'var(--color-blue-700)' },
    { scale: 'success',    token: 'success',    value: '#16A34A' },
    { scale: 'success-2',  token: 'success-2',  value: '#22C55E' },
    { scale: 'warning',    token: 'warning',    value: '#B45309' },
    { scale: 'warning-2',  token: 'warning-2',  value: '#F97316' },
    { scale: 'danger',     token: 'danger',     value: 'oklch(0.577\n0.245 27.3)' },
  ],
};

const SYNTAX: { code: string; name: string; description: string; meta: string; steps: SingleTone[] } = {
  code: 'CMP-001.4 — SYNTAX',
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
  code: 'CMP-001.5 — VENDOR',
  name: 'Vendor brand',
  description: 'External brand colors. Outside the contract — these represent vendor identity, not surface design.',
  meta: '8 brands · inline hex (no token)',
  steps: PROVIDER_ORDER.map((v) => ({
    scale: VENDOR_META[v].label,
    token: v,
    value: VENDOR_META[v].color,
  })),
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
    <div className="flex flex-col gap-3 bg-ink-25">
      <SectionHeader code={palette.code} hint={palette.description} />
      <div
        className="flex flex-col rounded-sm gap-4 bg-white border border-ink-75 p-6 shadow-[0_1px_2px_rgba(17,20,23,0.04)]"
      >
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-sans font-medium text-ink-900 text-base m-0">
              {palette.name}
            </h2>
            <div className="font-sans text-sm text-ink-500 mt-1">
              {palette.description}
            </div>
          </div>
          <div className="font-mono text-xs font-medium text-ink-500 uppercase tracking-[0.1em]">
            {palette.meta}
          </div>
        </div>
        <div
          className="grid gap-px rounded-sm overflow-hidden border border-ink-100"
          style={{ gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))` }}
        >
          {palette.steps.map((step) => (
            <div key={step.scale} className="flex flex-col">
              <div
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
    <div className="flex flex-col gap-3 bg-ink-25">
      <SectionHeader code={code} hint={description} />
      <div className="flex flex-col rounded-sm gap-4 bg-white border border-ink-75 p-6 shadow-[0_1px_2px_rgba(17,20,23,0.04)]">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-sans font-medium text-ink-900 text-base m-0">{name}</h2>
            <div className="font-sans text-sm text-ink-500 mt-1">{description}</div>
          </div>
          <div className="font-mono text-xs font-medium text-ink-500 uppercase tracking-[0.1em]">{meta}</div>
        </div>
        <div
          className="grid gap-px rounded-sm overflow-hidden border border-ink-100"
          style={{ gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))` }}
        >
          {steps.map((step) => (
            <div key={step.token} className="flex flex-col">
              <div
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
      <div className="flex flex-col w-full bg-ink-25 pt-14">
        <ArtboardHeader
          code="CMP-001"
          title="Colors"
          description="OKLCH-based ramps. Geist's mineral-cool palette: ink for surface + text, blue for the brand accent. Semantic single-tones for status. Syntax tokens for code surfaces. Vendor brands sit outside the contract — they exist to identify external providers."
          parts="5 palettes · 40 swatches"
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

          {/* CMP-001.3 — SEMANTIC */}
          <SingleToneCard
            code={SEMANTIC.code}
            name={SEMANTIC.name}
            description={SEMANTIC.description}
            meta={SEMANTIC.meta}
            steps={SEMANTIC.steps}
            background={(step) => `var(--color-${(step as SingleTone).token})`}
          />

          {/* CMP-001.4 — SYNTAX */}
          <SingleToneCard
            code={SYNTAX.code}
            name={SYNTAX.name}
            description={SYNTAX.description}
            meta={SYNTAX.meta}
            steps={SYNTAX.steps}
            background={(step) => `var(--color-${(step as SingleTone).token})`}
          />

          {/* CMP-001.5 — VENDOR */}
          <SingleToneCard
            code={VENDORS.code}
            name={VENDORS.name}
            description={VENDORS.description}
            meta={VENDORS.meta}
            steps={VENDORS.steps}
            background={(step) => (step as VendorTone).value}
          />
        </div>
      </div>
    </div>
  );
}
