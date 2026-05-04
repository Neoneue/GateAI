import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { CMP000Typography } from '@/artboards/CMP000Typography';
import { CMP001Colors } from '@/artboards/CMP001Colors';
import { CMP002Buttons } from '@/artboards/CMP002Buttons';
import { CMP003BadgesAndTags } from '@/artboards/CMP003BadgesAndTags';
import { CMP004FormFields } from '@/artboards/CMP004FormFields';
import { CMP005FilterBar } from '@/artboards/CMP005FilterBar';
import { CMP006TabsPagination } from '@/artboards/CMP006TabsPagination';
import { CMP007ModalEmptyState } from '@/artboards/CMP007ModalEmptyState';
import { CMP008aCards } from '@/artboards/CMP008aCards';
import { CMP008bStatCards } from '@/artboards/CMP008bStatCards';
import { CMP008cCodeCards } from '@/artboards/CMP008cCodeCards';
import { CMP009Toast } from '@/artboards/CMP009Toast';
import { CMP010Charts } from '@/artboards/CMP010Charts';
import { CMP011DataTable } from '@/artboards/CMP011DataTable';
import { CMP012ComposedDashboard } from '@/artboards/CMP012ComposedDashboard';

type PageId =
  | 'cmp-000' | 'cmp-001' | 'cmp-002' | 'cmp-003' | 'cmp-004'
  | 'cmp-005' | 'cmp-006' | 'cmp-007'
  | 'cmp-008a' | 'cmp-008b' | 'cmp-008c'
  | 'cmp-009' | 'cmp-010' | 'cmp-011' | 'cmp-012';

type Page = { id: PageId; code: string; name: string; Component: React.ComponentType };

const PAGES: Page[] = [
  { id: 'cmp-000',  code: 'CMP-000',  name: 'Typography',          Component: CMP000Typography },
  { id: 'cmp-001',  code: 'CMP-001',  name: 'Colors',              Component: CMP001Colors },
  { id: 'cmp-002',  code: 'CMP-002',  name: 'Buttons',             Component: CMP002Buttons },
  { id: 'cmp-003',  code: 'CMP-003',  name: 'Badges & tags',       Component: CMP003BadgesAndTags },
  { id: 'cmp-004',  code: 'CMP-004',  name: 'Form fields',         Component: CMP004FormFields },
  { id: 'cmp-005',  code: 'CMP-005',  name: 'Filter bar',          Component: CMP005FilterBar },
  { id: 'cmp-006',  code: 'CMP-006',  name: 'Tabs · pagination',   Component: CMP006TabsPagination },
  { id: 'cmp-007',  code: 'CMP-007',  name: 'Modal · empty',       Component: CMP007ModalEmptyState },
  { id: 'cmp-008a', code: 'CMP-008a', name: 'Cards',               Component: CMP008aCards },
  { id: 'cmp-008b', code: 'CMP-008b', name: 'Stat cards',          Component: CMP008bStatCards },
  { id: 'cmp-008c', code: 'CMP-008c', name: 'Code cards',          Component: CMP008cCodeCards },
  { id: 'cmp-009',  code: 'CMP-009',  name: 'Toast',               Component: CMP009Toast },
  { id: 'cmp-010',  code: 'CMP-010',  name: 'Charts',              Component: CMP010Charts },
  { id: 'cmp-011',  code: 'CMP-011',  name: 'Data table',          Component: CMP011DataTable },
  { id: 'cmp-012',  code: 'CMP-012',  name: 'Composed · Dashboard', Component: CMP012ComposedDashboard },
];

export default function App() {
  const [active, setActive] = useState<PageId>('cmp-000');
  const Page = PAGES.find((p) => p.id === active)?.Component ?? PAGES[0].Component;

  return (
    <div className="flex h-full w-full">
      {/* Left nav */}
      <nav className="w-60 shrink-0 h-full border-r border-ink-100 bg-ink-25 flex flex-col">
        <div className="px-5 py-5 border-b border-ink-100">
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-500 mb-1">
            Constellation Gate AI
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
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-400">
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
