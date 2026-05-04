import { useLayoutEffect, useRef, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

export interface SegmentedPillOption {
  value: string;
  label: string;
}

export interface SegmentedPillProps {
  value: string;
  onValueChange?: (value: string) => void;
  options: SegmentedPillOption[];
  className?: string;
}

/**
 * Pill-style segmented control with a sliding white indicator.
 * Wraps shadcn <ToggleGroup /> + <ToggleGroupItem /> (base-ui primitives).
 *
 * The indicator measures the active item's position on every value change
 * and animates `translateX` + `width` with a 220ms expressive cubic-bezier.
 */
export function SegmentedPill({
  value,
  onValueChange,
  options,
  className,
}: SegmentedPillProps) {
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    ready: boolean;
  }>({ x: 0, y: 0, width: 0, height: 0, ready: false });

  useLayoutEffect(() => {
    const active = itemRefs.current[value];
    if (!active) return;
    setIndicator({
      x: active.offsetLeft,
      y: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
      ready: true,
    });
  }, [value, options]);

  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(v) => v.length > 0 && onValueChange?.(v[0])}
      spacing={0}
      className={cn(
        // Paper spec WW0-0: h-10 container, py-px px-1, rounded-[8px],
        // bg ink-50 (#F1F4F6), border ink-75 (#E9EBEE).
        'relative h-10 bg-ink-50 border border-ink-75 py-px px-1 rounded-[8px] gap-0',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          // Paper spec WW9-0: rounded-[4px], white, shadow #11141714 0 1 2.
          'absolute top-0 left-0 bg-white rounded-[4px]',
          'shadow-[0_1px_2px_rgba(17,20,23,0.08)]',
          indicator.ready ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          transform: `translate(${indicator.x}px, ${indicator.y}px)`,
          width: indicator.width,
          height: indicator.height,
          transition: indicator.ready
            ? 'transform 220ms cubic-bezier(0.77, 0, 0.175, 1), width 220ms cubic-bezier(0.77, 0, 0.175, 1)'
            : undefined,
        }}
      />
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          ref={(el: HTMLButtonElement | null) => {
            itemRefs.current[opt.value] = el;
          }}
          className={cn(
            // Paper spec WW7-0: h-8, px-3 (12px), text 12px/16px Geist medium.
            'relative z-10 h-8 px-3 min-w-0 rounded-[4px]! text-xs leading-4 font-sans font-medium',
            'text-ink-600 bg-transparent border-0',
            'hover:text-ink-900 hover:bg-transparent',
            'data-[pressed]:text-ink-900 data-[pressed]:bg-transparent',
            'aria-pressed:text-ink-900 aria-pressed:bg-transparent',
          )}
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
