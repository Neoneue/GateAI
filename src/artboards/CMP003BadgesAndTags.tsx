import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { StatusDot } from '@/components/ui/status-dot';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/**
 * CMP-003 · Badges & tags
 *
 * Status badges (active / rotating / revoked / dormant / preview),
 * counters, removable tags, mono uppercase rev marks.
 *
 * Composes shadcn <Badge /> with project status variants + StatusDot + Tag.
 */
export function CMP003BadgesAndTags() {
  const [tags, setTags] = useState<string[]>(['production', 'error', 'last 7d']);

  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-003"
          title="Badges & tags"
          description="Status badges (running, ok, warn, danger), counters, tags with close affordance, rev marks. All 20px tall, mono micro-type."
          parts="6 variants"
        />

        <div className="flex gap-6 bg-ink-25">
          {/* CMP-003.1 — STATUS */}
          <div className="flex flex-col grow gap-2.5 basis-0 bg-ink-25">
            <SectionHeader
              code="CMP-003.1 — STATUS"
              hint="<Badge variant=… /> + <StatusDot />"
            />
            <div className="flex flex-col rounded-sm gap-3 bg-white border border-ink-75 p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">
                  <StatusDot kind="success" />
                  active
                </Badge>
                <Badge variant="warning">
                  <StatusDot kind="warning" />
                  rotating
                </Badge>
                <Badge variant="destructive">
                  <StatusDot kind="danger" />
                  revoked
                </Badge>
                <Badge variant="neutral">dormant</Badge>
                <Badge variant="info">
                  <StatusDot kind="info" />
                  preview
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">
                  <StatusDot kind="success" />
                  running
                </Badge>
                <Badge variant="warning">
                  <StatusDot kind="warning" />
                  degraded
                </Badge>
                <Badge variant="destructive">
                  <StatusDot kind="danger" />
                  failed
                </Badge>
                <Badge variant="neutral">idle</Badge>
              </div>
            </div>
          </div>

          {/* CMP-003.2 — COUNTERS & CHIPS */}
          <div className="flex flex-col grow gap-2.5 basis-0 bg-ink-25">
            <SectionHeader
              code="CMP-003.2 — COUNTERS & CHIPS"
              hint="<Badge /> · <Tag onRemove /> · mono marks"
            />
            <div className="flex flex-col rounded-sm gap-3.5 bg-white border border-ink-75 p-7">
              {/* Counters / version pills / accent labels */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="rounded-sm h-5 px-1.5 font-mono font-normal">
                  v0.4.1
                </Badge>
                <Badge variant="link" className="h-5 px-1.5 rounded-sm font-medium tracking-wide uppercase">
                  BETA
                </Badge>
                <Badge variant="default" className="rounded-sm h-5 px-1.5 font-mono uppercase tracking-wider">
                  NEW
                </Badge>
                <Badge variant="outline" className="rounded-full size-5 p-0 border-destructive text-destructive font-mono tabular-nums">
                  3
                </Badge>
                <Badge variant="secondary" className="rounded-full px-1.5 h-5 font-mono tabular-nums text-ink-500">
                  +12
                </Badge>
              </div>

              {/* Removable tags */}
              <div className="flex flex-wrap items-center gap-3">
                {tags.map((label) => (
                  <Tag
                    key={label}
                    onRemove={() => setTags((prev) => prev.filter((t) => t !== label))}
                  >
                    {label}
                  </Tag>
                ))}
                {tags.length === 0 && (
                  <button
                    type="button"
                    onClick={() => setTags(['production', 'error', 'last 7d'])}
                    className="font-mono text-xs uppercase tracking-[0.08em] text-blue-700 hover:text-blue-800"
                  >
                    Reset tags
                  </button>
                )}
              </div>

              {/* Rev marks — mono uppercase, square corner */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-none h-5 px-1.5 font-mono uppercase tracking-widest text-ink-400 border border-ink-100">
                  R.01
                </Badge>
                <Badge variant="secondary" className="rounded-none h-5 px-1.5 font-mono uppercase tracking-widest text-ink-400 border border-ink-100">
                  SHEET 011
                </Badge>
                <Badge variant="default" className="rounded-none h-5 px-1.5 font-mono uppercase tracking-widest">
                  INTERNAL
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
