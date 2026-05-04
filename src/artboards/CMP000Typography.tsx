import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/**
 * CMP-000 · Typography
 * Specimen sheet for the Geist + Geist Mono type system.
 * The type *tokens* live in tailwind (text-xs/sm/base/lg/...).
 * This artboard renders them in a labeled table for reference.
 */

interface Specimen {
  label: string;
  tag: string;
  sample: string;
  sampleClass: string;
  meta: string[];
  note: string;
}

const SCALE: Specimen[] = [
  {
    label: 'Page title',
    tag: 'h1 · text-4xl medium',
    sample: 'Overview',
    sampleClass: 'font-sans text-4xl/10 font-medium -tracking-[1px] text-ink-800',
    meta: ['Geist', '36px / 40px · 500', 'tracking -1px'],
    note: 'Hero h1 on dashboard surfaces. The largest size in actual use — one per surface.',
  },
  {
    label: 'Heading',
    tag: 'H2 · text-4xl',
    sample: 'Request Volume',
    sampleClass: 'font-sans text-4xl/10 -tracking-[0.9px] text-ink-800',
    meta: ['Geist', '36px / 40px · 400', 'tracking -0.9px'],
    note: 'Section heads in documentation or hero moments.',
  },
  {
    label: 'Card title',
    tag: 'H3 · text-xl',
    sample: 'Request volume',
    sampleClass: 'font-sans text-xl/7 font-medium -tracking-[0.3px] text-ink-800',
    meta: ['Geist', '20px / 28px · 500', 'tracking -0.3px'],
    note: 'Component / card / sheet titles.',
  },
  {
    label: 'Card title (compact)',
    tag: 'text-base · medium',
    sample: 'Top Keys',
    sampleClass: 'font-sans text-base/5 font-medium -tracking-[0.25px] text-ink-800',
    meta: ['Geist', '16px / 20px · 500', 'tracking -0.25px'],
    note: 'In-line card titles (CardTitle) on dashboard panels. Smaller than the 20px H3 card title above.',
  },
  {
    label: 'Subtitle 1',
    tag: 'text-lg · prominent meta',
    sample: 'Last 7 days · by cost · grouped by model',
    sampleClass: 'font-sans text-lg/7 -tracking-[0.18px] text-ink-800',
    meta: ['Geist', '18px / 28px · 400', 'tracking -0.18px'],
    note: 'Surface subtitles that carry the page.',
  },
  {
    label: 'Card subtitle',
    tag: 'CardDescription · ink-400',
    sample: 'By spend · Last 7d',
    sampleClass: 'font-sans text-sm/5 -tracking-[0.14px] text-ink-400',
    meta: ['Geist', '14px / 20px · 400', 'tracking -0.14px'],
    note: 'Canonical CardDescription — every Card consumer inherits this via the primitive default. Muted ink-400.',
  },
  {
    label: 'Subtitle 2',
    tag: 'text-sm · dense meta',
    sample: 'Last 7 days · by cost · grouped by model',
    sampleClass: 'font-sans text-sm/5 -tracking-[0.14px] text-ink-800',
    meta: ['Geist', '14px / 20px · 400', 'tracking -0.14px'],
    note: 'Card subtitles, inline meta strips.',
  },
  {
    label: 'Body 1',
    tag: 'text-base · default',
    sample:
      'The audit chain is sealed every 60 seconds. Roots are published to an independent data-availability layer.',
    sampleClass: 'font-sans text-base/6 -tracking-[0.16px] text-ink-800',
    meta: ['Geist', '16px / 24px · 400', 'tracking -0.16px'],
    note: 'Default prose. Documentation, modal copy, descriptions.',
  },
  {
    label: 'Body 2',
    tag: 'text-sm · P · dense',
    sample:
      'The audit chain is sealed every 60 seconds. Roots are published to an independent data-availability layer.',
    sampleClass: 'font-sans text-sm/5 text-ink-800',
    meta: ['Geist', '14px / 20px · 400', 'tracking 0'],
    note: 'Dense surfaces only. Never the default.',
  },
  {
    label: 'Machine value',
    tag: 'text-sm · numeric',
    sample: '48,293 · $1,247.82 · 14:23:08',
    sampleClass: 'font-mono text-sm/5 tabular-nums text-ink-800',
    meta: ['Geist Mono', '14px / 20px · 400', 'tracking 0'],
    note: 'All numerics, timestamps, identifiers, payloads.',
  },
  {
    label: 'KPI hero',
    tag: 'text-2xl · mono medium',
    sample: '48,293',
    sampleClass: 'font-mono text-2xl/8 font-medium tabular-nums -tracking-[0.5px] text-ink-800',
    meta: ['Geist Mono', '24px / 32px · 500', 'tracking -0.5px'],
    note: 'CompactKpi value. Per project rule: every KPI numeric is Mono with tabular-nums.',
  },
  {
    label: 'KPI hero (large)',
    tag: 'text-3xl · mono medium',
    sample: '$1,147.82',
    sampleClass: 'font-mono text-3xl/9 font-medium tabular-nums -tracking-[1px] text-ink-800',
    meta: ['Geist Mono', '30px / 36px · 500', 'tracking -1px'],
    note: 'TopKeysCard hero metric. The "primary number" of a panel that needs more weight than the compact KPI rail.',
  },
  {
    label: 'Metric display',
    tag: 'text-5xl · hero numeric',
    sample: '48,293',
    sampleClass:
      'font-mono text-5xl font-light -tracking-[1.44px] leading-none tabular-nums text-ink-800',
    meta: ['Geist Mono', '48px / 1 · 300', 'tracking -1.44px'],
    note: 'One primary number per surface. Weight 300 for air.',
  },
  {
    label: 'Eyebrow',
    tag: 'text-xs · label',
    sample: 'WORKSPACE · LIVE · LAST 7 DAYS',
    sampleClass:
      'font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink-800',
    meta: ['Geist Mono', '12px / 16px · 500', 'tracking 0.1em'],
    note: 'Section eyebrows, table column heads, KPI labels.',
  },
  {
    label: 'Breadcrumb',
    tag: 'text-xs · parent / current',
    sample: 'All Projects',
    sampleClass: 'font-sans text-xs text-ink-500',
    meta: ['Geist', '12px · 400', 'parent: ink-500 · current: ink-900 medium'],
    note: 'Parent-level segments in muted ink-500. Current page uses font-medium text-ink-900.',
  },
];

export function CMP000Typography() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25 pt-14">
        <ArtboardHeader
          code="CMP-000"
          title="Typography"
          description="Geist for the UI, Geist Mono for the machine. ~60% mono / 40% sans on dense operational surfaces. Tailwind-aligned scale — every size has a leading baked in."
          parts="15 specimens"
        />

        {/* CMP-000.1 · SCALE */}
        <div className="flex flex-col mb-7 gap-2.5 bg-ink-25">
          <SectionHeader
            code="CMP-000.1 — SCALE"
            hint="tailwind-aligned · 14/20 · 16/24 · 18/28 · 24/32 · 36/40 · 48 · 60"
          />
          <div className="flex flex-col rounded-sm py-1 px-6 bg-white border border-ink-75 shadow-[0_1px_2px_rgba(17,20,23,0.04)]">
            {SCALE.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center py-4 gap-8 ${
                  i < SCALE.length - 1 ? 'border-b border-ink-75' : ''
                }`}
              >
                <div className="flex flex-col w-[140px] shrink-0 gap-1.5">
                  <div className="font-sans font-medium text-ink-800 text-xs/4">
                    {row.label}
                  </div>
                  <div className="inline-flex self-start rounded-[3px] py-0.5 px-1.5 bg-ink-50">
                    <span className="font-sans text-ink-600 text-xs/4 tracking-[0.04em]">
                      {row.tag}
                    </span>
                  </div>
                </div>
                <div className={`grow ${row.sampleClass}`}>{row.sample}</div>
                <div className="flex flex-col w-[250px] shrink-0 gap-1">
                  {row.meta.map((line) => (
                    <div
                      key={line}
                      className="font-sans text-ink-600 text-xs/4 tabular-nums"
                    >
                      {line}
                    </div>
                  ))}
                  <div className="mt-2 font-sans text-ink-500 text-xs/4">
                    {row.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CMP-000.2 · MONO VS SANS */}
        <div className="flex flex-col gap-2.5 mb-7 bg-ink-25">
          <SectionHeader
            code="CMP-000.2 — MONO VS SANS"
            hint="semantic split · machine voice / human voice"
          />
          <div className="flex rounded-sm gap-4 bg-white border border-ink-75 shadow-[0_1px_2px_rgba(17,20,23,0.04)] p-6">
            <div className="flex flex-col grow gap-2">
              <div className="font-mono text-ink-500 uppercase tracking-[0.08em] text-xs/4">
                Mono — machine voice
              </div>
              <pre className="font-mono text-ink-800 text-xs/4 tabular-nums whitespace-pre-wrap m-0">
                {`48,293 requests
sk-tp-prod_a7c3…2f8
14:23:08.247 UTC
POST /v1/messages
$1,247.82 · 14.2M tokens
root · 9c2e04a7f8b1`}
              </pre>
            </div>
            <div className="flex flex-col grow gap-2">
              <div className="font-mono text-ink-500 uppercase tracking-[0.08em] text-xs/4">
                Sans — human voice
              </div>
              <pre className="font-sans text-ink-800 text-xs/4 whitespace-pre-wrap m-0">
                {`Dashboard
Request volume
Rotate API key
New key
Review security events
The audit chain is sealed every 60 seconds.`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
