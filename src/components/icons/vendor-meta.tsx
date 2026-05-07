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
  xai:       { color: '#3D3D3D', icon: GrokIcon,      iconColor: '#FFFFFF', label: 'xAI' },
  google:    { color: '#4285F4', icon: GeminiIcon,    iconColor: '#FFFFFF', label: 'Google' },
  openai:    { color: '#3D3D3D', icon: OpenAIIcon,    iconColor: '#FFFFFF', label: 'OpenAI' },
  meta:      { color: '#0064E0', icon: MetaIcon,      iconColor: '#FFFFFF', label: 'Meta' },
  mistral:   { color: '#FA520F', icon: MistralIcon,   iconColor: '#FFFFFF', label: 'Mistral' },
  deepseek:  { color: '#4D6BFE', icon: DeepSeekIcon,  iconColor: '#FFFFFF', label: 'DeepSeek' },
  cohere:    { color: '#FF7759', icon: CohereIcon,    iconColor: '#FFFFFF', label: 'Cohere' },
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
 * Provider glyph rendered in its native brand color — no chip wrapper,
 * no mono override. SVGs in `model-providers.tsx` use `fill="currentColor"`,
 * so setting CSS color on the icon paints the glyph in the brand hex
 * from VENDOR_META. One treatment everywhere: KPI anchors, modal
 * headers, top-key lists, data-table model columns.
 *
 * Iteration history (kept here so future sessions don't re-prosecute):
 * (1) brand chip everywhere → too rainbow on stacked tables.
 * (2) mono ink-800 icon-only → felt heavy.
 * (3) brand-tinted bare icon → contrast too low at the time.
 * (4) split treatment (neutral table / brand standalone) → too much
 *     black in tables.
 * (5) brand chip everywhere again — locked for a stretch.
 * (6) mono ink-600 icon-only — quieter, but lost brand identity.
 * (7) brand-tinted bare icon — current state. Same shape as (3) with
 *     a clear reference (Stacklane competitor table) showing this is
 *     the convention for product/competitor lists. Trade-off accepted:
 *     low-contrast brands (Cohere #FF7759) sit lighter on white than
 *     high-contrast ones (xAI #3D3D3D); the brand identity is the
 *     payoff.
 */
export function VendorAvatar({ vendor }: { vendor: Vendor }) {
  const meta = VENDOR_META[vendor];
  const Icon = meta.icon;
  return (
    <Icon
      className="size-4 shrink-0"
      style={{ color: meta.color }}
    />
  );
}
