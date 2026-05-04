import { cn } from '@/lib/utils';

export interface SegmentedProps {
  options: { value: string; label: string }[];
  value: string;
  onChange?: (value: string) => void;
  variant?: 'pill' | 'group';
  /** Mirrors button conventions — `sm` for inline header chrome, `default` for standalone use. */
  size?: 'sm' | 'default';
  className?: string;
}

/**
 * Two visual modes (matches CMP-001.5):
 *  - "pill": gray container, selected gets white pill (e.g. Requests / Cost / Tokens)
 *  - "group": adjacent borders, selected gets ink-900 fill (e.g. Day / Week / Month / Year)
 */
export function Segmented({ options, value, onChange, variant = 'pill', size = 'default', className }: SegmentedProps) {
  if (variant === 'group') {
    return (
      <div className={cn('inline-flex self-start rounded-lg overflow-clip', className)}>
        {options.map((opt, i) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange?.(opt.value)}
              className={cn(
                'inline-flex items-center justify-center px-3 font-sans font-medium text-xs',
                size === 'sm' ? 'h-7' : 'h-8',
                selected
                  ? 'bg-ink-900 text-white border border-ink-900'
                  : 'bg-white text-ink-900 border-t border-b border-r border-ink-100',
                i === 0 && !selected && 'border-l',
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex self-start rounded-lg p-1 bg-ink-50 border border-ink-100',
        className,
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange?.(opt.value)}
            className={cn(
              'inline-flex items-center justify-center rounded-md font-sans font-medium text-xs',
              size === 'sm' ? 'py-1 px-3' : 'py-2 px-4',
              selected
                ? 'bg-white text-ink-900 shadow-[0_1px_2px_rgba(17,20,23,0.08)]'
                : 'text-ink-600 hover:text-ink-900',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
