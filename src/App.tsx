import { lazy, Suspense, useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const CMP000Typography        = lazy(() => import('@/artboards/CMP000Typography').then(m => ({ default: m.CMP000Typography })));
const CMP001Colors            = lazy(() => import('@/artboards/CMP001Colors').then(m => ({ default: m.CMP001Colors })));
const CMP002Buttons           = lazy(() => import('@/artboards/CMP002Buttons').then(m => ({ default: m.CMP002Buttons })));
const CMP003BadgesAndTags     = lazy(() => import('@/artboards/CMP003BadgesAndTags').then(m => ({ default: m.CMP003BadgesAndTags })));
const CMP004FormFields        = lazy(() => import('@/artboards/CMP004FormFields').then(m => ({ default: m.CMP004FormFields })));
const CMP005FilterBar         = lazy(() => import('@/artboards/CMP005FilterBar').then(m => ({ default: m.CMP005FilterBar })));
const CMP006TabsPagination    = lazy(() => import('@/artboards/CMP006TabsPagination').then(m => ({ default: m.CMP006TabsPagination })));
const CMP007ModalEmptyState   = lazy(() => import('@/artboards/CMP007ModalEmptyState').then(m => ({ default: m.CMP007ModalEmptyState })));
const CMP008aCards            = lazy(() => import('@/artboards/CMP008aCards').then(m => ({ default: m.CMP008aCards })));
const CMP008bStatCards        = lazy(() => import('@/artboards/CMP008bStatCards').then(m => ({ default: m.CMP008bStatCards })));
const CMP008cCodeCards        = lazy(() => import('@/artboards/CMP008cCodeCards').then(m => ({ default: m.CMP008cCodeCards })));
const CMP009Toast             = lazy(() => import('@/artboards/CMP009Toast').then(m => ({ default: m.CMP009Toast })));
const CMP010Charts            = lazy(() => import('@/artboards/CMP010Charts').then(m => ({ default: m.CMP010Charts })));
const CMP011DataTable         = lazy(() => import('@/artboards/CMP011DataTable').then(m => ({ default: m.CMP011DataTable })));
const CMP012ComposedDashboard = lazy(() => import('@/artboards/CMP012ComposedDashboard').then(m => ({ default: m.CMP012ComposedDashboard })));
const CMP013Requests          = lazy(() => import('@/artboards/CMP013Requests').then(m => ({ default: m.CMP013Requests })));
const CMP014Conversations     = lazy(() => import('@/artboards/CMP014Conversations').then(m => ({ default: m.CMP014Conversations })));
const CMP015Security          = lazy(() => import('@/artboards/CMP015Security').then(m => ({ default: m.CMP015Security })));
const CMP016Models            = lazy(() => import('@/artboards/CMP016Models').then(m => ({ default: m.CMP016Models })));

type PageId =
  | 'cmp-000' | 'cmp-001' | 'cmp-002' | 'cmp-003' | 'cmp-004'
  | 'cmp-005' | 'cmp-006' | 'cmp-007'
  | 'cmp-008a' | 'cmp-008b' | 'cmp-008c'
  | 'cmp-009' | 'cmp-010' | 'cmp-011' | 'cmp-012' | 'cmp-013' | 'cmp-014' | 'cmp-015' | 'cmp-016';

type Page = {
  id: PageId;
  code: string;
  name: string;
  Component: React.ComponentType<{
    onNavigate?: (pageId: string) => void;
    innerSidebarExpanded?: boolean;
    onToggleInnerSidebar?: () => void;
  }>;
};

const PAGES: Page[] = [
  { id: 'cmp-000',  code: 'CMP-000',  name: 'Typography',          Component: CMP000Typography },
  { id: 'cmp-001',  code: 'CMP-001',  name: 'Colors',              Component: CMP001Colors },
  { id: 'cmp-002',  code: 'CMP-002',  name: 'Buttons',             Component: CMP002Buttons },
  { id: 'cmp-003',  code: 'CMP-003',  name: 'Badges & tags',       Component: CMP003BadgesAndTags },
  { id: 'cmp-004',  code: 'CMP-004',  name: 'Form fields',         Component: CMP004FormFields },
  { id: 'cmp-005',  code: 'CMP-005',  name: 'Filter bar',          Component: CMP005FilterBar },
  { id: 'cmp-006',  code: 'CMP-006',  name: 'Tabs · pagination',   Component: CMP006TabsPagination },
  { id: 'cmp-007',  code: 'CMP-007',  name: 'Modal',               Component: CMP007ModalEmptyState },
  { id: 'cmp-008a', code: 'CMP-008a', name: 'Cards',               Component: CMP008aCards },
  { id: 'cmp-008b', code: 'CMP-008b', name: 'Stat cards',          Component: CMP008bStatCards },
  { id: 'cmp-008c', code: 'CMP-008c', name: 'Code cards',          Component: CMP008cCodeCards },
  { id: 'cmp-009',  code: 'CMP-009',  name: 'Toast',               Component: CMP009Toast },
  { id: 'cmp-010',  code: 'CMP-010',  name: 'Charts',              Component: CMP010Charts },
  { id: 'cmp-011',  code: 'CMP-011',  name: 'Data table',          Component: CMP011DataTable },
  { id: 'cmp-012',  code: 'CMP-012',  name: 'Composed · Dashboard', Component: CMP012ComposedDashboard },
  { id: 'cmp-013',  code: 'CMP-013',  name: 'Requests',             Component: CMP013Requests },
  { id: 'cmp-014',  code: 'CMP-014',  name: 'Conversations',        Component: CMP014Conversations },
  { id: 'cmp-015',  code: 'CMP-015',  name: 'Security',              Component: CMP015Security },
  { id: 'cmp-016',  code: 'CMP-016',  name: 'Models',                Component: CMP016Models },
];

export default function App() {
  const [active, setActive] = useState<PageId>('cmp-000');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Inner production-frame sidebar state — lifted here so it persists
  // when navigating between CMP-012 / CMP-013 / CMP-014 via the inner nav.
  const [innerSidebarExpanded, setInnerSidebarExpanded] = useState(true);
  const Page = PAGES.find((p) => p.id === active)?.Component ?? PAGES[0].Component;

  return (
    <div className="flex h-full w-full">
      {/* Left nav — slides closed by transitioning width 240→0. Inner
          content stays at fixed w-60 (shrink-0) so it doesn't reflow
          during the slide; the outer overflow-hidden clips the right
          edge. Border-r drops with the width so we don't render a
          1px stub when collapsed. */}
      <nav
        className={cn(
          'shrink-0 h-full bg-ink-50 overflow-hidden transition-[width] duration-200 ease-out motion-reduce:transition-none',
          sidebarCollapsed ? 'w-0' : 'w-60 border-r border-ink-200',
        )}
        aria-hidden={sidebarCollapsed}
      >
        <div className="w-60 shrink-0 h-full flex flex-col">
          <div className="flex items-start justify-between gap-2 px-5 py-5 border-b border-ink-200">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex flex-col font-mono text-xs uppercase tracking-[0.12em] font-medium text-ink-500">
                <span>Constellation</span>
                <span>Gate AI</span>
              </div>
              <div className="font-sans text-base font-medium text-ink-800 -tracking-[0.2px]">
                Design system
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(true)}
              className="shrink-0 size-7 inline-flex items-center justify-center rounded-sm text-ink-500 hover:text-ink-900 hover:bg-white/60 transition-colors duration-150 ease-out"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex flex-col gap-0.5 p-2 overflow-y-auto">
            {PAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-sm text-left transition-colors',
                  'font-sans text-sm',
                  active === p.id
                    ? 'bg-white text-ink-900 font-medium shadow-xs border border-ink-200'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-white/60 border border-transparent',
                )}
              >
                <span>{p.name}</span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-500">
                  {p.code}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main scrollable content */}
      <main className="relative flex-1 h-full overflow-auto bg-ink-50">
        {sidebarCollapsed ? (
          <button
            type="button"
            onClick={() => setSidebarCollapsed(false)}
            className="fixed top-4 left-4 z-10 size-8 inline-flex items-center justify-center rounded-sm bg-white border border-ink-200 shadow-xs text-ink-500 hover:text-ink-900 transition-colors duration-150 ease-out"
            aria-label="Show sidebar"
          >
            <PanelLeftOpen className="size-4" strokeWidth={1.75} />
          </button>
        ) : null}
        <div className="flex justify-center py-10 px-10">
          <Suspense fallback={<div className="w-[1440px] min-h-screen" aria-busy />}>
            <Page
              onNavigate={(pageId) => setActive(pageId as PageId)}
              innerSidebarExpanded={innerSidebarExpanded}
              onToggleInnerSidebar={() => setInnerSidebarExpanded((v) => !v)}
            />
          </Suspense>
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
