import type { ComponentType, SVGProps } from 'react';
import {
  AnthropicIcon,
  CohereIcon,
  DeepSeekIcon,
  GeminiIcon,
  GrokIcon,
  MetaIcon,
  MistralIcon,
  OpenAIIcon,
} from './model-providers';

/* ─────────────────────────────────────────────────────────────────────────
 * Vendor meta — canonical mapping of model providers to brand color, icon,
 * icon color, and label. Shared across surfaces that show provider badges.
 *
 * Brand hex literals are intentional: they represent external brand colors
 * (Anthropic Sonnet orange, OpenAI black, Mistral orange, etc.) and are not
 * design-system colors. Same exception CMP-009 makes — every other color in
 * the app traces to ink-* / blue-* / semantic vars in src/index.css.
 *
 * `chartColor` is a desaturated, OKLCH-formed sibling of `color`, used when
 * the brand identity needs to render as one of N data-encoding series in a
 * chart (bars, lines, legend swatches). Chips on white cards can use the
 * full-strength brand `color`; multi-series charts need the softer variant
 * so 5 vendors side-by-side don't fight each other for attention.
 * Hue is preserved from the brand value — chroma is reduced ~0.04–0.07,
 * lightness raised slightly to read well at small fill widths.
 * ───────────────────────────────────────────────────────────────────────── */

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type Vendor =
  | 'anthropic'
  | 'xai'
  | 'google'
  | 'openai'
  | 'meta'
  | 'mistral'
  | 'deepseek'
  | 'cohere';

export interface VendorMeta {
  color: string;
  chartColor: string;
  icon: IconType;
  iconColor: string;
  label: string;
}

export const VENDOR_META: Record<Vendor, VendorMeta> = {
  anthropic: { color: '#D97757', chartColor: 'oklch(0.680 0.105 41)',  icon: AnthropicIcon, iconColor: '#FFFFFF', label: 'Anthropic' },
  xai:       { color: '#000000', chartColor: 'oklch(0.380 0.020 264)', icon: GrokIcon,      iconColor: '#FFFFFF', label: 'xAI' },
  google:    { color: '#FFFFFF', chartColor: 'oklch(0.628 0.150 257)', icon: GeminiIcon,    iconColor: '#1A73E8', label: 'Google' },
  openai:    { color: '#000000', chartColor: 'oklch(0.380 0.020 264)', icon: OpenAIIcon,    iconColor: '#FFFFFF', label: 'OpenAI' },
  meta:      { color: '#0467DF', chartColor: 'oklch(0.628 0.150 257)', icon: MetaIcon,      iconColor: '#FFFFFF', label: 'Meta' },
  mistral:   { color: '#FA520F', chartColor: 'oklch(0.700 0.155 38)',  icon: MistralIcon,   iconColor: '#FFFFFF', label: 'Mistral' },
  deepseek:  { color: '#4D6BFE', chartColor: 'oklch(0.640 0.155 270)', icon: DeepSeekIcon,  iconColor: '#FFFFFF', label: 'DeepSeek' },
  cohere:    { color: '#39594D', chartColor: 'oklch(0.500 0.060 165)', icon: CohereIcon,    iconColor: '#FF7759', label: 'Cohere' },
};

/**
 * Secondary chart shade for the same vendor — used when a single brand
 * appears as more than one series in a chart (e.g. Anthropic with both
 * Sonnet and Haiku). Hue is preserved; lightness raised for visible
 * separation between primary and secondary at the same scale.
 */
export const VENDOR_CHART_COLOR_SECONDARY: Partial<Record<Vendor, string>> = {
  anthropic: 'oklch(0.830 0.075 65)',
};

export const PROVIDER_ORDER: Vendor[] = [
  'anthropic',
  'openai',
  'google',
  'xai',
  'meta',
  'mistral',
  'deepseek',
  'cohere',
];

/**
 * Small colored chip with the white provider icon centered inside.
 * Canonical model-cell badge — same dimensions as CMP-009's data table.
 */
export function VendorAvatar({ vendor }: { vendor: Vendor }) {
  const meta = VENDOR_META[vendor];
  const Icon = meta.icon;
  const isLight = meta.color === '#FFFFFF';
  return (
    <span
      className="inline-flex items-center justify-center size-5 rounded-[5px] shrink-0"
      style={{
        backgroundColor: meta.color,
        color: meta.iconColor,
        border: isLight ? '1px solid var(--color-ink-100)' : 'none',
      }}
    >
      <Icon className="size-3" />
    </span>
  );
}
