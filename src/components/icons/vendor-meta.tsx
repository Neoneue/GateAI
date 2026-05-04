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
 * icon color, and label. Shared across surfaces that show provider badges
 * AND across charts where vendors render as data series.
 *
 * Brand hex literals are intentional: they represent external brand colors
 * (Anthropic Sonnet orange, OpenAI ChatGPT green, Mistral orange, etc.) and
 * are not design-system colors. Same exception CMP-009 makes — every other
 * color in the app traces to ink-* / blue-* / semantic vars in src/index.css.
 *
 * The single `color` field is used for both chips (avatars, swatches, badges)
 * and chart series (bars, lines, legends). Twin-hue pairs (Meta + DeepSeek
 * both blue; Anthropic + Mistral both orange) are accepted as the design —
 * each brand shows up in charts as its own brand color, full strength.
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
  icon: IconType;
  iconColor: string;
  label: string;
}

export const VENDOR_META: Record<Vendor, VendorMeta> = {
  anthropic: { color: '#D97757', icon: AnthropicIcon, iconColor: '#FFFFFF', label: 'Anthropic' },
  xai:       { color: '#1A1A1A', icon: GrokIcon,      iconColor: '#FFFFFF', label: 'xAI' },
  google:    { color: '#9B72CB', icon: GeminiIcon,    iconColor: '#FFFFFF', label: 'Google' },
  openai:    { color: '#10A37F', icon: OpenAIIcon,    iconColor: '#FFFFFF', label: 'OpenAI' },
  meta:      { color: '#0064E0', icon: MetaIcon,      iconColor: '#FFFFFF', label: 'Meta' },
  mistral:   { color: '#FA520F', icon: MistralIcon,   iconColor: '#FFFFFF', label: 'Mistral' },
  deepseek:  { color: '#4D6BFE', icon: DeepSeekIcon,  iconColor: '#FFFFFF', label: 'DeepSeek' },
  cohere:    { color: '#FF7759', icon: CohereIcon,    iconColor: '#FFFFFF', label: 'Cohere' },
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
