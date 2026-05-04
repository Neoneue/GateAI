import { useState } from 'react';
import { Plus, Download, ChevronDown, MoreHorizontal, X, Copy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SegmentedPill } from '@/components/ui/segmented-pill';
import { cn } from '@/lib/utils';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/**
 * CMP-002 · Buttons
 * Demonstrates every variant × size × state of the shadcn <Button />
 * primitive at src/components/ui/button.tsx.
 *
 * shadcn variants used: default · outline · secondary · ghost · destructive · link
 * shadcn sizes used:    xs · sm · default · lg · icon · icon-sm · icon-xs
 *
 * Future artboards (Modal, Dashboard, etc.) re-use the same primitive.
 */
export function CMP002Buttons() {
  const [period, setPeriod] = useState<string[]>(['day']);
  const [metric, setMetric] = useState<string>('requests');

  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-002"
          title="Buttons"
          description="shadcn <Button /> — default, outline, secondary, ghost, destructive, link. Four sizes plus icon-only variants. Six states: default, hover, active, focus, loading, disabled."
          parts="6 variants × 4 sizes × 6 states"
        />

        {/* CMP-002.1 · VARIANTS */}
        <div className="flex flex-col mb-7 gap-3 bg-ink-25">
          <SectionHeader
            code="CMP-002.1 — VARIANTS"
            hint="<Button variant=… /> · default · outline · secondary · ghost · destructive · link"
          />
          <div className="flex flex-wrap items-center rounded-sm gap-5 bg-white border border-ink-75 p-7">
            <Button variant="default">
              <Plus data-icon="inline-start" />
              Create key
            </Button>
            <Button variant="secondary">Export</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="link">Refresh</Button>
            <Button variant="destructive">Revoke</Button>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
              Delete
            </Button>
            <Button variant="link" className="underline">
              View docs
            </Button>
          </div>
        </div>

        {/* CMP-002.2 · SIZES */}
        <div className="flex flex-col mb-7 gap-3 bg-ink-25">
          <SectionHeader
            code="CMP-002.2 — SIZES"
            hint="<Button size=… /> · xs · sm · default · lg"
          />
          <div className="flex flex-wrap items-center rounded-sm gap-5 bg-white border border-ink-75 p-7">
            <Button size="xs">Tiny</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* CMP-002.3 · STATES + CMP-002.4 · ICON + CMP-002.5 · GROUP */}
        <div className="flex gap-4 bg-ink-25">
          {/* STATES — explicit visual representations (not :hover/:focus) */}
          <div className="flex flex-col grow gap-3 basis-0">
            <SectionHeader
              code="CMP-002.3 — STATES"
              hint="default · hover · active · focus · loading · disabled"
            />
            <div className="flex flex-col rounded-sm gap-3 bg-white border border-ink-75 p-7">
              <Button className="w-full" tabIndex={-1}>Default</Button>
              <Button className="w-full bg-primary/85" tabIndex={-1}>Hover</Button>
              <Button className="w-full translate-y-px" tabIndex={-1}>Active</Button>
              <Button
                className="w-full ring-3 ring-ring/50 border-ring"
                tabIndex={-1}
              >
                Focus
              </Button>
              <Button className="w-full" tabIndex={-1} disabled>
                <Loader2 data-icon="inline-start" className="animate-spin" />
                Loading
              </Button>
              <Button className="w-full" disabled>Disabled</Button>
            </div>
          </div>

          {/* ICON */}
          <div className="flex flex-col grow gap-3 basis-0">
            <SectionHeader
              code="CMP-002.4 — ICON"
              hint="data-icon=inline-start · icon-only · button-group"
            />
            <div className="flex flex-col rounded-sm gap-3 bg-white border border-ink-75 p-7">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">
                  <Download data-icon="inline-start" />
                  Export
                </Button>
                <Button variant="secondary" size="sm">
                  Continue
                  <ChevronDown data-icon="inline-end" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="icon" aria-label="Copy">
                  <Copy />
                </Button>
                <Button variant="secondary" size="icon-sm" aria-label="More">
                  <MoreHorizontal />
                </Button>
                <Button variant="secondary" size="icon-xs" aria-label="Close">
                  <X />
                </Button>
              </div>
              <div className="inline-flex self-start" data-slot="button-group">
                <Button size="sm" className="rounded-r-none">
                  Deploy
                </Button>
                <Button size="icon-sm" aria-label="Deploy options" className="rounded-l-none border-l border-l-primary-foreground/20">
                  <ChevronDown />
                </Button>
              </div>
            </div>
          </div>

          {/* GROUP — real shadcn ToggleGroup, styled to match Paper */}
          <div className="flex flex-col grow gap-3 basis-0">
            <SectionHeader
              code="CMP-002.5 — GROUP"
              hint="<ToggleGroup> · <SegmentedPill>"
            />
            <div className="flex flex-col rounded-sm gap-3 bg-white border border-ink-75 p-7 items-start">
              {/* Bordered group: Day · Week · Month · Year */}
              <ToggleGroup
                value={period}
                onValueChange={(v) => v.length > 0 && setPeriod(v)}
                className="rounded-lg overflow-clip gap-0"
              >
                {[
                  { value: 'day', label: 'Day' },
                  { value: 'week', label: 'Week' },
                  { value: 'month', label: 'Month' },
                  { value: 'year', label: 'Year' },
                ].map((opt, i) => (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    className={cn(
                      'h-6 px-3 min-w-0 rounded-none text-xs font-sans font-medium text-ink-900 bg-white',
                      'border border-ink-100 hover:bg-ink-25',
                      i > 0 && '-ml-px',
                      'data-[pressed]:bg-ink-900 data-[pressed]:text-white data-[pressed]:border-ink-900',
                      'aria-pressed:bg-ink-900 aria-pressed:text-white aria-pressed:border-ink-900',
                    )}
                  >
                    {opt.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              {/* Pill in gray container with sliding indicator: Requests · Cost · Tokens */}
              <SegmentedPill
                value={metric}
                onValueChange={setMetric}
                options={[
                  { value: 'requests', label: 'Requests' },
                  { value: 'cost', label: 'Cost' },
                  { value: 'tokens', label: 'Tokens' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
