/**
 * Shared header for every CMP-### artboard.
 * Three columns: code · title+desc · parts/status meta.
 *
 * NOTE: This is intentionally a presentation-only helper for the artboard
 * "spec sheet" chrome — it is NOT part of the design system shipped to apps.
 * Real product surfaces never render this header.
 */
export interface ArtboardHeaderProps {
  code: string;          // e.g. "CMP-001"
  title: string;         // e.g. "Buttons"
  description: string;
  parts: string;         // e.g. "4 variants × 3 sizes"
  status?: string;       // default "released"
}

export function ArtboardHeader({
  code,
  title,
  description,
  parts,
  status = 'released',
}: ArtboardHeaderProps) {
  return (
    <div className="flex items-start mb-8 pb-4 gap-8 bg-ink-50 border-b border-ink-100">
      <div className="flex flex-col w-[200px] shrink-0 gap-1">
        <div className="flex items-baseline gap-1 font-mono uppercase tracking-[0.1em] text-xs">
          <span className="text-ink-500">§</span>
          <span className="text-ink-800 font-medium">{code}</span>
        </div>
      </div>
      <div className="flex flex-col grow gap-1.5">
        <h1 className="font-sans font-medium text-ink-800 text-3xl/9 -tracking-[1px] m-0">
          {title}
        </h1>
        <p className="font-mono text-ink-500 text-xs/5 max-w-[620px] m-0">
          {description}
        </p>
      </div>
      <div className="flex flex-col w-[200px] shrink-0 pt-2 gap-1 font-mono uppercase tracking-wider text-xs">
        <div className="flex justify-between gap-3">
          <span className="text-ink-500">parts</span>
          <span className="text-ink-800">{parts}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-ink-500">status</span>
          <span className="text-ink-800">{status}</span>
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({ code, hint }: { code: string; hint?: string }) {
  const [prefix, title] = code.split(' — ');
  return (
    <div className="flex flex-col bg-ink-50 gap-1.5">
      <div className="flex items-baseline justify-between">
        <div className="font-mono uppercase tracking-[0.1em] font-medium text-ink-500 text-xs">
          {prefix}
        </div>
        {hint && <div className="font-mono text-ink-400 text-xs">{hint}</div>}
      </div>
      {title && (
        <h2 className="font-sans font-medium text-ink-800 text-2xl/8 -tracking-[0.25px] m-0">
          {title}
        </h2>
      )}
    </div>
  );
}
