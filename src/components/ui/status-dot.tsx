import { cn } from '@/lib/utils';

const statusColors = {
  success: 'bg-success-600',
  warning: 'bg-warning-600',
  danger: 'bg-destructive',
  info: 'bg-blue-600',
  neutral: 'bg-ink-500',
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
