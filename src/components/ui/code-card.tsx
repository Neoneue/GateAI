import * as React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────────────────
 * CodeCard family — primitives for CMP-012.
 *
 * Five Paper layouts (A hero, B1 light tabbed, B2 dark terminal, B3
 * request/response, C steps) all paint code in roughly the same visual
 * vocabulary: a card shell, an optional header strip with tabs / title
 * actions, and a monospaced code body with semantically coloured tokens.
 *
 * We ship a compound family (Card-style) rather than a single variant
 * component because the dark terminal flavour has a distinct surface +
 * chrome (traffic lights, no tabs, dark background) that would force
 * heavy variant overrides in a one-component design. Composition wins.
 *
 *   <CodeCard>                       light card shell
 *     <CodeCardHeader>               grey strip with tabs + actions
 *       <CodeCardTabs items active />
 *       <CodeCardCopyButton />
 *     </CodeCardHeader>
 *     <CodeBlock lines={…} />
 *   </CodeCard>
 *
 *   <TerminalCard title="…">         dark surface + traffic lights
 *     <CodeBlock tone="dark" lines={…} />
 *   </TerminalCard>
 *
 * Token model: every span colour is a semantic Tailwind class — no inline
 * hex / oklch literals. The four syntax tones (keyword / variable /
 * property / terminal-blue) live in src/index.css alongside the existing
 * ink / blue / success / warning / danger ramps.
 * ───────────────────────────────────────────────────────────────────────── */

/* ── Token model ─────────────────────────────────────────────────────────── */

export type CodeTone =
  | 'default'   // ink-900 light · ink-50 (faint white) on dark
  | 'muted'     // ink-400 light · ink-300 on dark — comments, slashes, dividers
  | 'keyword'   // syntax-keyword — curl, -H, -d, export, npm
  | 'string'    // success-2 — quoted strings
  | 'variable'  // syntax-variable — $KEY, interpolated values
  | 'property'  // syntax-property — JSON keys
  | 'number'    // syntax-terminal-blue — numeric values, status codes
  | 'success';  // success — exit codes, "OK"

export interface CodeToken {
  text: string;
  tone?: CodeTone;
}

export type CodeLine = CodeToken[];

const TONE_CLASS_LIGHT: Record<CodeTone, string> = {
  default:  'text-ink-900',
  muted:    'text-ink-400',
  keyword:  'text-[var(--color-syntax-keyword)]',
  string:   'text-success-2',
  variable: 'text-[var(--color-syntax-variable)]',
  property: 'text-[var(--color-syntax-property)]',
  number:   'text-[var(--color-syntax-terminal-blue)]',
  success:  'text-success',
};

const TONE_CLASS_DARK: Record<CodeTone, string> = {
  default:  'text-ink-50',
  muted:    'text-ink-300',
  keyword:  'text-[var(--color-syntax-variable)]', // dark terminal: keywords render as amber, matches Paper
  string:   'text-success-2',
  variable: 'text-[var(--color-syntax-variable)]',
  property: 'text-[var(--color-syntax-terminal-blue)]',
  number:   'text-[var(--color-syntax-terminal-blue)]',
  success:  'text-success-2',
};

/* ── Outer card shells ───────────────────────────────────────────────────── */

interface CodeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised';
}

export function CodeCard({
  className,
  elevation = 'flat',
  ...props
}: CodeCardProps) {
  return (
    <div
      data-slot="code-card"
      className={cn(
        'flex flex-col overflow-hidden rounded-md bg-white border border-ink-75',
        elevation === 'raised' && 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]',
        className,
      )}
      {...props}
    />
  );
}

export function CodeCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="code-card-header"
      className={cn(
        'flex items-center justify-between gap-3 px-4 py-2 bg-ink-50 border-b border-ink-75',
        className,
      )}
      {...props}
    />
  );
}

/* ── Tabs strip (visual; behaviour is opt-in via onChange) ───────────────── */

export interface CodeCardTabsProps {
  items: string[];
  active: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function CodeCardTabs({
  items,
  active,
  onChange,
  className,
}: CodeCardTabsProps) {
  const interactive = typeof onChange === 'function';
  return (
    <div className={cn('flex items-center gap-1', className)} role="tablist">
      {items.map((item) => {
        const isActive = item === active;
        const sharedClass = cn(
          'inline-flex items-center h-6 rounded-md px-2.5 font-sans text-sm transition-colors',
          isActive
            ? 'bg-white text-ink-900 font-medium border border-ink-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
            : 'text-ink-600 font-medium border border-transparent',
          interactive && !isActive && 'hover:text-ink-900 hover:bg-white/60',
        );
        if (interactive) {
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange?.(item)}
              className={sharedClass}
            >
              {item}
            </button>
          );
        }
        return (
          <span
            key={item}
            role="tab"
            aria-selected={isActive}
            className={sharedClass}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

/* ── Copy button — thin wrapper so the icon + label stays consistent ─────── */

export function CodeCardCopyButton({
  label = 'Copy',
  onClick,
  className,
}: {
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      size="xs"
      onClick={onClick}
      className={cn('h-6 gap-1 px-2 font-medium text-ink-600 hover:text-ink-900', className)}
    >
      <Copy data-icon="inline-start" strokeWidth={1.8} />
      {label}
    </Button>
  );
}

/* ── Code body ───────────────────────────────────────────────────────────── */

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: CodeLine[];
  tone?: 'light' | 'dark';
  /** Compact inline snippet — used inside the steps card. */
  density?: 'default' | 'compact' | 'inline';
}

export function CodeBlock({
  lines,
  tone = 'light',
  density = 'default',
  className,
  ...props
}: CodeBlockProps) {
  const toneMap = tone === 'dark' ? TONE_CLASS_DARK : TONE_CLASS_LIGHT;
  const density_cls =
    density === 'inline'
      ? 'px-3.5 py-2.5'
      : density === 'compact'
      ? 'px-4 py-3'
      : 'px-5 py-4';
  const text_cls = density === 'inline' ? 'text-xs/4' : 'text-sm/5';
  return (
    <div
      data-slot="code-block"
      className={cn(
        'flex flex-col font-mono whitespace-pre',
        text_cls,
        density_cls,
        className,
      )}
      {...props}
    >
      {lines.map((line, idx) => (
        <div key={idx} className="flex h-5 shrink-0 min-h-5">
          {line.length === 0 ? (
            // Blank line spacer — keep the line height
            <span aria-hidden="true">&nbsp;</span>
          ) : (
            line.map((tok, j) => (
              <span key={j} className={toneMap[tok.tone ?? 'default']}>
                {tok.text}
              </span>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Terminal card (B2) — dark sibling of CodeCard ───────────────────────── */

export function TerminalCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="terminal-card"
      className={cn(
        'flex flex-col overflow-hidden rounded-md bg-ink-800',
        className,
      )}
    >
      <div className="flex items-center gap-2 px-3.5 py-2 bg-ink-700 border-b border-ink-900/60">
        <div className="flex gap-1" aria-hidden="true">
          <span className="size-2 rounded-full bg-danger-2" />
          <span className="size-2 rounded-full bg-warning" />
          <span className="size-2 rounded-full bg-success" />
        </div>
        <span className="ml-auto font-mono text-xs/4 text-ink-300">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
