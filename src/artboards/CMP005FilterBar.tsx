import { useState } from 'react';
import { Search, Clock, Filter, Download } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SegmentedPill } from '@/components/ui/segmented-pill';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/**
 * CMP-005 · Filter bar
 *
 * Composes existing primitives:
 *   <Input> + leading icon (search)
 *   <Select>  → "All envs", "Last 30d", "All Providers", "Sort: Release"
 *   <Button variant="secondary" size="sm"> + calendar icon → "Custom range"
 *   <Button variant="ghost"> → "More filters" link
 *   <Button size="icon"> → Export
 *   <Tag onRemove>          → active filter chips with X
 *   <SegmentedPill>         → All / Text / Code / Image / Embed / Rerank
 */
export function CMP005FilterBar() {
  const [query, setQuery] = useState('prod-');
  const [env, setEnv] = useState('all');
  const [range, setRange] = useState('30d');
  const [provider, setProvider] = useState('all');
  const [sort, setSort] = useState('release');
  const [tab, setTab] = useState('all');
  const [chips, setChips] = useState<string[]>(['env: production', 'status: active']);

  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-005"
          title="Filter bar"
          description="Search + chip filters + dropdown menus. Used at the top of every list view. Fits inline with table headers."
          parts="3 filter types"
        />

        {/* CMP-005.1 — LIST FILTER BAR */}
        <div className="flex flex-col gap-2.5 bg-ink-25">
          <SectionHeader
            code="CMP-005.1 — LIST FILTER BAR"
            hint="<Input> · <Select> · <Tag> · <SegmentedPill>"
          />
          <div className="flex flex-col rounded-sm gap-3 bg-white border border-ink-75 p-7">
            {/* Row 1 — search + scope dropdowns + count.
                All controls use size="default" (h-9 px-4) from the primitive contract. */}
            <div className="flex items-center flex-wrap gap-2">
              <InputGroup className="w-auto min-w-[280px]">
                <InputGroupInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  aria-label="Search keys"
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>

              <Select
                value={env}
                onValueChange={setEnv}
                items={{
                  all: 'All envs',
                  production: 'production',
                  staging: 'staging',
                  preview: 'preview',
                }}
              >
                <SelectTrigger aria-label="Environment">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All envs</SelectItem>
                  <SelectItem value="production">production</SelectItem>
                  <SelectItem value="staging">staging</SelectItem>
                  <SelectItem value="preview">preview</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={range}
                onValueChange={setRange}
                items={{
                  '24h': 'Last 24h',
                  '7d': 'Last 7d',
                  '30d': 'Last 30d',
                  '90d': 'Last 90d',
                }}
              >
                <SelectTrigger aria-label="Time range">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7d</SelectItem>
                  <SelectItem value="30d">Last 30d</SelectItem>
                  <SelectItem value="90d">Last 90d</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="secondary">
                <Clock data-icon="inline-start" />
                Custom range
              </Button>

              <Button variant="ghost">
                <Filter data-icon="inline-start" />
                More filters
              </Button>

              <Button variant="secondary" size="icon" aria-label="Export">
                <Download />
              </Button>

              <div className="grow" />

              <span className="font-sans text-sm text-ink-600 tabular-nums -tracking-[0.01em]">
                5 of 24
              </span>
            </div>

            {/* Row 2 — active filter chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {chips.map((label) => (
                <Tag
                  key={label}
                  onRemove={() => setChips((prev) => prev.filter((t) => t !== label))}
                  className="bg-ink-50 border-ink-75 tabular-nums -tracking-[0.01em]"
                >
                  {label}
                </Tag>
              ))}
              {chips.length > 0 && (
                <button
                  type="button"
                  onClick={() => setChips([])}
                  className="ml-1 font-sans text-xs text-blue-700 hover:text-blue-800 underline decoration-1 underline-offset-[3px]"
                >
                  Clear all
                </button>
              )}
              {chips.length === 0 && (
                <button
                  type="button"
                  onClick={() => setChips(['env: production', 'status: active'])}
                  className="ml-1 font-sans text-xs text-blue-700 hover:text-blue-800 underline decoration-1 underline-offset-[3px]"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Row 3 — provider + tabs + sort */}
            <div className="items-center flex flex-wrap gap-2">
              <Select
                value={provider}
                onValueChange={setProvider}
                items={{
                  all: 'All Providers',
                  anthropic: 'Anthropic',
                  openai: 'OpenAI',
                  google: 'Google',
                  meta: 'Meta',
                }}
              >
                <SelectTrigger aria-label="Provider">
                  <SelectValue placeholder="All Providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="meta">Meta</SelectItem>
                </SelectContent>
              </Select>

              <SegmentedPill
                value={tab}
                onValueChange={setTab}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'text', label: 'Text' },
                  { value: 'code', label: 'Code' },
                  { value: 'image', label: 'Image' },
                  { value: 'embed', label: 'Embed' },
                  { value: 'rerank', label: 'Rerank' },
                ]}
              />

              <div className="grow" />

              <Select
                value={sort}
                onValueChange={setSort}
                items={{
                  release: 'Sort: Release',
                  name: 'Sort: Name',
                  latency: 'Sort: Latency',
                }}
              >
                <SelectTrigger aria-label="Sort">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="release">Release</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="latency">Latency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
