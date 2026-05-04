import { cn } from '@/lib/utils';

const statusColors = {
  success: 'bg-[#2ECC71]',
  warning: 'bg-[#FA983A]',
  danger: 'bg-[#E64434]',
  info: 'bg-[#3498DB]',
  neutral: 'bg-ink-400',
} as const;

export type StatusDotKind = keyof typeof statusColors;

export interface StatusDotProps {
  kind: StatusDotKind;
  className?: string;
}

/**
 * Tiny solid-color dot used inside <Badge /> to communicate status.
 * Use as a child with `data-icon="inline-start"` so the badge applies
 * the right padding adjustment.
 */
export function StatusDot({ kind, className }: StatusDotProps) {
  return (
    <span
      data-icon="inline-start"
      aria-hidden
      className={cn(
        'size-1.5 shrink-0 rounded-full',
        statusColors[kind],
        className,
      )}
    />
  );
}
