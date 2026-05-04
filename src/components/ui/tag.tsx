import type { ReactNode, MouseEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TagProps {
  children: ReactNode;
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/**
 * Removable chip — pill-shaped tag with an inline X button.
 * Used for active filters, scopes, dismissible labels.
 */
export function Tag({ children, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 rounded-full bg-ink-50 border border-ink-100',
        'text-ink-900 font-sans text-xs gap-2',
        onRemove ? 'pr-1 pl-2' : 'px-3',
        className,
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove'}
          className="inline-flex items-center justify-center size-3.5 rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-100"
        >
          <X size={10} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
