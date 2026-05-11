import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SegmentedPill } from '@/components/ui/segmented-pill';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/**
 * CMP-006 · Tabs · pagination
 *
 * Composes existing/installed primitives:
 *   <Tabs variant="line">         → page-level underline tabs (Overview / API keys / …)
 *   <SegmentedPill>               → gray-pill segmented (Day/Week/Month, 1H/24H/7D/30D/90D)
 *   <ToggleGroup variant="group"> → bordered group (Newest/Most used/A→Z)
 *   <Pagination>                  → numbered page list with prev/next + ellipsis
 */
export function CMP006TabsPagination() {
  const [tab, setTab] = useState('keys');
  const [period, setPeriod] = useState('week');
  const [range, setRange] = useState('7d');
  const [sort, setSort] = useState('most-used');
  const [page, setPage] = useState(3);
  const totalPages = 12;
  const totalRows = 240;

  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-006"
          title="Tabs · pagination"
          description="Underline tabs (sticky), segmented tabs (button-group), pagination with page count + jump. Sit cleanly under filter bars and inside cards."
          parts="3 components"
        />

        <div className="flex flex-col gap-8">
          {/* CMP-006.1 — UNDERLINE TABS */}
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-006.1 — UNDERLINE TABS"
              hint="page-level navigation"
            />
            <div className="flex flex-col rounded-md bg-white shadow-(--shadow-border)">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList variant="line">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="keys">API keys</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                  <TabsTrigger value="audit">Audit</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-6 text-sm text-ink-500 tabular-nums -tracking-[0.01em]">
                  panel: overview
                </TabsContent>
                <TabsContent value="keys" className="p-6 text-sm text-ink-500 tabular-nums -tracking-[0.01em]">
                  panel: keys
                </TabsContent>
                <TabsContent value="logs" className="p-6 text-sm text-ink-500 tabular-nums -tracking-[0.01em]">
                  panel: logs
                </TabsContent>
                <TabsContent value="audit" className="p-6 text-sm text-ink-500 tabular-nums -tracking-[0.01em]">
                  panel: audit
                </TabsContent>
                <TabsContent value="billing" className="p-6 text-sm text-ink-500 tabular-nums -tracking-[0.01em]">
                  panel: billing
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* CMP-006.2 — SEGMENTED · PAGINATION */}
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-006.2 — SEGMENTED · PAGINATION"
              hint="<SegmentedPill> · <ToggleGroup> · <Pagination>"
            />
            <div className="flex flex-col rounded-md gap-4 bg-white shadow-(--shadow-border) p-6">
              {/* Three segmented groups */}
              <div className="flex items-center flex-wrap gap-4">
                <SegmentedPill
                  aria-label="Period"
                  value={period}
                  onValueChange={setPeriod}
                  options={[
                    { value: 'day', label: 'Day' },
                    { value: 'week', label: 'Week' },
                    { value: 'month', label: 'Month' },
                  ]}
                />

                <SegmentedPill
                  aria-label="Time range"
                  value={range}
                  onValueChange={setRange}
                  options={[
                    { value: '1h', label: '1H' },
                    { value: '24h', label: '24H' },
                    { value: '7d', label: '7D' },
                    { value: '30d', label: '30D' },
                    { value: '90d', label: '90D' },
                  ]}
                />

                <ToggleGroup
                  aria-label="Sort order"
                  value={[sort]}
                  onValueChange={(v) => v.length > 0 && setSort(v[v.length - 1])}
                  className="rounded-sm overflow-clip gap-0"
                >
                  {[
                    { value: 'newest', label: 'Newest' },
                    { value: 'most-used', label: 'Most used' },
                    { value: 'a-z', label: 'A → Z' },
                  ].map((opt, i) => (
                    <ToggleGroupItem
                      key={opt.value}
                      value={opt.value}
                      className={cn(
                        'h-7 px-3 min-w-0 rounded-none text-xs font-sans font-medium text-ink-900 bg-white',
                        'border border-ink-300 hover:bg-ink-50',
                        i > 0 && '-ml-px',
                        'data-[pressed]:bg-ink-800 data-[pressed]:text-white data-[pressed]:border-ink-800',
                        'aria-pressed:bg-ink-800 aria-pressed:text-white aria-pressed:border-ink-800',
                      )}
                    >
                      {opt.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-2">
                <Pagination className="mx-0 w-fit justify-start">
                  <PaginationContent className="gap-1">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((p) => Math.max(1, p - 1));
                        }}
                      />
                    </PaginationItem>
                    {[1, 2, 3, 4].map((n) => (
                      <PaginationItem key={n}>
                        <PaginationLink
                          isActive={page === n}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(n);
                          }}
                        >
                          {n}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        isActive={page === totalPages}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(totalPages);
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((p) => Math.min(totalPages, p + 1));
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="font-sans text-xs text-ink-500 tabular-nums -tracking-[0.01em]"
                >
                  Page {page} of {totalPages} · {totalRows} rows
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
