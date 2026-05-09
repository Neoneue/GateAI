import { useState } from 'react';
import { Check, Bell, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

interface ToastSpec {
  id: string;
  tone: 'success' | 'warn' | 'error' | 'info';
  body: React.ReactNode;
  detail?: string;
}

const INITIAL_TOASTS: ToastSpec[] = [
  {
    id: 'success',
    tone: 'success',
    body: (
      <>
        <span className="text-sm text-ink-800">Key</span>
        <span className="text-sm font-medium text-ink-800">preview-env</span>
        <span className="text-sm text-ink-800">created.</span>
      </>
    ),
    detail: 'sk-tp-prev_c2d8…7f1 — copied',
  },
  {
    id: 'warn',
    tone: 'warn',
    body: (
      <>
        <span className="text-sm font-medium text-ink-800">legacy-worker</span>
        <span className="text-sm text-ink-800">rotation due in 3 days.</span>
      </>
    ),
  },
  {
    id: 'error',
    tone: 'error',
    body: (
      <>
        <span className="text-sm font-medium text-ink-800">Failed to verify</span>
        <span className="text-sm text-ink-800">block #48,291.</span>
        <span className="text-sm text-blue-700">Retry?</span>
      </>
    ),
  },
  {
    id: 'info',
    tone: 'info',
    body: (
      <>
        <span className="text-sm text-ink-800">New audit root sealed at</span>
        <span className="text-sm font-medium text-ink-800">14:23:08 UTC.</span>
      </>
    ),
  },
];

export function CMP009Toast() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-009"
          title="Toast"
          description="Inverse-surface success toast, neutral surface for warn/error. Stacks bottom-right, auto-dismiss, click-through dismiss icon."
          parts="3 variants"
        />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-009.1 — TOAST DECK"
              hint="success · warn · error · with action"
            />
            <Card className="p-7 rounded-sm">
              <ToastDeck />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToastDeck() {
  const [toasts, setToasts] = useState<ToastSpec[]>(INITIAL_TOASTS);
  const dismiss = (id: string) => setToasts((cur) => cur.filter((t) => t.id !== id));
  const reset = () => setToasts(INITIAL_TOASTS);
  return (
    <div className="flex items-center justify-center min-h-80 rounded-sm bg-ink-100 border border-ink-100">
      {toasts.length === 0 ? (
        <Button variant="outline" onClick={reset}>
          Restore deck
        </Button>
      ) : (
        <div className="flex flex-col w-[420px] gap-2 px-3">
          {toasts.map((t) => (
            <ToastRow key={t.id} spec={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function ToastIcon({ tone }: { tone: ToastSpec['tone'] }) {
  if (tone === 'success') return <Check aria-hidden className="size-4 text-success-700" strokeWidth={2.2} />;
  if (tone === 'warn') return <Bell aria-hidden className="size-4 text-warning-700" strokeWidth={1.8} />;
  if (tone === 'error') return <X aria-hidden className="size-4 text-danger-500" strokeWidth={1.8} />;
  return <Info aria-hidden className="size-4 text-blue-700" strokeWidth={2.2} />;
}

function ToastRow({ spec, onDismiss }: { spec: ToastSpec; onDismiss: () => void }) {
  const isMultiline = Boolean(spec.detail);
  const isError = spec.tone === 'error';
  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={`flex items-center rounded-sm gap-3 bg-white border border-ink-100 shadow-(--shadow-modal) ${isMultiline ? 'py-3 px-4' : 'py-4 px-4'}`}
    >
      <div className="shrink-0">
        <ToastIcon tone={spec.tone} />
      </div>
      <div className="grow flex flex-col gap-1">
        <div className="flex flex-wrap gap-1">{spec.body}</div>
        {spec.detail && (
          <div className="text-xs tabular-nums text-ink-800">{spec.detail}</div>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="text-ink-500 hover:text-ink-700"
      >
        <X />
      </Button>
    </div>
  );
}
