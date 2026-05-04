import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { CMP000Typography } from '@/artboards/CMP000Typography';
import { CMP001Buttons } from '@/artboards/CMP001Buttons';
import { CMP002BadgesAndTags } from '@/artboards/CMP002BadgesAndTags';
import { CMP003FormFields } from '@/artboards/CMP003FormFields';
import { CMP004FilterBar } from '@/artboards/CMP004FilterBar';
import { CMP005TabsPagination } from '@/artboards/CMP005TabsPagination';
import { CMP006ModalEmptyState } from '@/artboards/CMP006ModalEmptyState';
import { CMP007StatCards } from '@/artboards/CMP007StatCards';
import { CMP007bToast } from '@/artboards/CMP007bToast';
import { CMP008Charts } from '@/artboards/CMP008Charts';
import { CMP009DataTable } from '@/artboards/CMP009DataTable';
import { CMP011ComposedDashboard } from '@/artboards/CMP011ComposedDashboard';

type PageId = 'cmp-000' | 'cmp-001' | 'cmp-002' | 'cmp-003' | 'cmp-004' | 'cmp-005' | 'cmp-006' | 'cmp-007' | 'cmp-007b' | 'cmp-008' | 'cmp-009' | 'cmp-011';

interface Page {
  id: PageId;
  code: string;
  name: string;
  Component: React.ComponentType;
}

const PAGES: Page[] = [
  { id: 'cmp-000', code: 'CMP-000', name: 'Typography', Component: CMP000Typography },
  { id: 'cmp-001', code: 'CMP-001', name: 'Buttons', Component: CMP001Buttons },
  { id: 'cmp-002', code: 'CMP-002', name: 'Badges & tags', Component: CMP002BadgesAndTags },
  { id: 'cmp-003', code: 'CMP-003', name: 'Form fields', Component: CMP003FormFields },
  { id: 'cmp-004', code: 'CMP-004', name: 'Filter bar', Component: CMP004FilterBar },
  { id: 'cmp-005', code: 'CMP-005', name: 'Tabs · pagination', Component: CMP005TabsPagination },
  { id: 'cmp-006', code: 'CMP-006', name: 'Modal · empty', Component: CMP006ModalEmptyState },
  { id: 'cmp-007', code: 'CMP-007', name: 'Stat cards', Component: CMP007StatCards },
  { id: 'cmp-007b', code: 'CMP-007b', name: 'Toast', Component: CMP007bToast },
  { id: 'cmp-008', code: 'CMP-008', name: 'Charts', Component: CMP008Charts },
  { id: 'cmp-009', code: 'CMP-009', name: 'Data table', Component: CMP009DataTable },
  { id: 'cmp-011', code: 'CMP-011', name: 'Composed · Dashboard', Component: CMP011ComposedDashboard },
];

export default function App() {
  const [active, setActive] = useState<PageId>('cmp-000');
  const Page = PAGES.find((p) => p.id === active)?.Component ?? PAGES[0].Component;

  return (
    <div className="flex h-full w-full">
      {/* Left nav */}
      <nav className="w-60 shrink-0 h-full border-r border-ink-100 bg-ink-25 flex flex-col">
        <div className="px-5 py-5 border-b border-ink-100">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500 mb-1">
            Constellation Gateway
          </div>
          <div className="font-sans text-base font-medium text-ink-800 -tracking-[0.2px]">
            Design system
          </div>
        </div>
        <div className="flex flex-col gap-0.5 p-2 overflow-y-auto">
          {PAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors',
                'font-sans text-sm',
                active === p.id
                  ? 'bg-white text-ink-900 font-medium shadow-[0_1px_2px_rgba(17,20,23,0.06)] border border-ink-100'
                  : 'text-ink-600 hover:text-ink-900 hover:bg-white/60 border border-transparent',
              )}
            >
              <span>{p.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-400">
                {p.code}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main scrollable content */}
      <main className="flex-1 h-full overflow-auto bg-ink-25">
        <div className="flex justify-center py-10 px-10">
          <Page />
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
