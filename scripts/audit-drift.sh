#!/usr/bin/env bash
# audit-drift.sh — detect hand-rolled instances of design-system primitives.
#
# Codified 2026-05-11 after the 5-agent audit kept missing patterns. The
# fix wasn't "find a magic skill" — it was "write down every recipe and
# grep for it deterministically." This script is the source of truth for
# drift detection in the project. Every primitive extraction should add
# a corresponding pattern here.
#
# Usage:
#   bash scripts/audit-drift.sh         # run all patterns, print findings
#   bash scripts/audit-drift.sh --quiet # exit-code only (CI mode)
#
# Exit codes: 0 = clean, 1 = drift found.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
QUIET=0
[[ "${1:-}" == "--quiet" ]] && QUIET=1

# Grep across artboards + components, exclude the primitive's own file.
# Args: <label> <regex> <exclude-file-glob>
total_findings=0
check() {
  local label="$1"
  local regex="$2"
  local exclude="${3:-/dev/null/no-exclude}"

  # Search source tree for the regex; exclude the primitive's own file.
  # `--include` limits to .tsx; `-l` for files-with-matches isn't useful since
  # we want file:line; `-E` for extended regex.
  local hits
  hits=$(
    grep -rEn --include='*.tsx' "$regex" "$ROOT/src" 2>/dev/null \
      | grep -vF "$exclude" \
      | grep -vF "$ROOT/src/components/icons/" \
      || true
  )

  if [[ -n "$hits" ]]; then
    local count
    count=$(echo "$hits" | wc -l | tr -d ' ')
    total_findings=$((total_findings + count))
    if [[ $QUIET -eq 0 ]]; then
      echo
      echo "──── $label ($count hits) ────"
      echo "$hits"
    fi
  fi
}

# ─── Primitive recipes ────────────────────────────────────────────────────
# Each `check` corresponds to a primitive in src/components/ui/. Add new
# entries when extracting; never delete (history of what was canonical).

# Eyebrow — font-mono text-xs uppercase tracking-[0.1em] font-medium ink-500
# Skip CMP-000 (typography specimens display the recipe as educational
# content) by NOT excluding it — flagged-but-acceptable hits surface for review.
check "Hand-rolled <Eyebrow> recipe" \
  'font-mono text-xs uppercase tracking-\[0\.1em\] font-medium text-ink-500' \
  'src/components/ui/eyebrow.tsx'

# SectionHeading — h3 with font-sans text-sm font-medium text-ink-900 m-0
check "Hand-rolled <SectionHeading> recipe" \
  '<h3[^>]*font-sans text-sm font-medium text-ink-900 m-0' \
  'src/components/ui/section-heading.tsx'

# PageTitle — text-3xl/9 with -tracking-[1px] text-balance (composed pages)
check "Hand-rolled <PageTitle> recipe" \
  'text-3xl/9[^"]*-tracking-\[1px\][^"]*text-balance' \
  'src/components/ui/page-title.tsx'

# InlineCode — font-mono ink-800 bg-ink-100 rounded-xs px-1.5 chip
check "Hand-rolled <InlineCode> recipe" \
  '<code[^>]*font-mono[^>]*bg-ink-100[^>]*rounded-xs' \
  'src/components/ui/inline-code.tsx'

# Badge — inline-flex h-5 rounded-xs with bg/text or border (chip shape)
check "Hand-rolled <Badge>-shaped <span> or <div>" \
  '<(span|div)[^>]*inline-flex[^>]*h-5[^>]*rounded-xs[^>]*(bg-|border-(ink|success|danger|warning|blue))' \
  'src/components/ui/badge.tsx'

# Banned: StatusDot inside Badge (text-only contract, locked 2026-05-11).
# Per-file awk scan: detect a `<StatusDot` line whose previous non-blank
# line ended with `<Badge ...>`. Per-file scoping avoids cross-file
# false positives.
badge_dot_hits=""
for f in "$ROOT"/src/artboards/*.tsx; do
  hits_in_file=$(
    awk '
      # Skip comment-only lines so doc mentions of <StatusDot> dont trigger.
      /^[[:space:]]*\/\// { next }
      /^[[:space:]]*\*/ { next }
      /<Badge[^>]*>[[:space:]]*$/ { prev=NR; next }
      /<StatusDot/ && prev > 0 && NR == prev + 1 {
        printf "%s:%d: <StatusDot> inside <Badge>\n", FILENAME, NR
        prev = 0
      }
      { if (prev > 0 && NR > prev + 1) prev = 0 }
    ' "$f" 2>/dev/null || true
  )
  if [[ -n "$hits_in_file" ]]; then
    badge_dot_hits="${badge_dot_hits}${hits_in_file}"$'\n'
  fi
done
badge_dot_hits=$(echo -n "$badge_dot_hits" | sed '/^$/d')
if [[ -n "$badge_dot_hits" ]]; then
  count=$(echo "$badge_dot_hits" | wc -l | tr -d ' ')
  total_findings=$((total_findings + count))
  if [[ $QUIET -eq 0 ]]; then
    echo
    echo "──── <StatusDot> nested inside <Badge> ($count hits) ────"
    echo "$badge_dot_hits"
  fi
fi

# Card — rounded-md + shadow-(--shadow-border) chrome
check "Hand-rolled <Card>-shaped <div>" \
  '<div[^>]*rounded-md[^>]*shadow-\(--shadow-border\)' \
  'src/components/ui/card.tsx'
check "Hand-rolled <Card>-shaped <div> (classes reversed)" \
  '<div[^>]*shadow-\(--shadow-border\)[^>]*rounded-md' \
  'src/components/ui/card.tsx'

# Modal — rounded-xl + shadow-(--shadow-modal) chrome
check "Hand-rolled modal shell (<div> with rounded-xl + shadow-modal)" \
  '<div[^>]*rounded-xl[^>]*shadow-\(--shadow-modal\)' \
  'src/components/ui/dialog.tsx'

# TextLink — text-ink-800 underline decoration-ink-200 underline-offset-2
check "Hand-rolled <TextLink> recipe (button with link styles)" \
  'underline decoration-ink-200 underline-offset-2' \
  'src/components/ui/text-link.tsx'

# DetailRow — grid grid-cols-4 gap-4 py-3 border-b border-ink-200
check "Hand-rolled <DetailRow> recipe" \
  'grid grid-cols-4 gap-4 items-center py-3 border-b border-ink-200' \
  'src/components/ui/detail-list.tsx'

# DetailList alt shape — grid-cols-[36%_1fr] (the deprecated CMP-007 shape)
check "Hand-rolled DetailGrid (banned grid-cols-[36%_1fr])" \
  'grid-cols-\[36%_1fr\]' \
  'NO_EXCLUDE'

# Note: `has-data-[icon=*]:p*-N` is legitimate inside Button / Tabs /
# Toggle / ToggleGroup primitives (they DO accept inline icons). Only
# Badge bans it (text-only contract). The Badge primitive itself is
# excluded; if a Badge consumer reaches for has-data-[icon=*], it would
# show up under "Hand-rolled Badge-shaped <span>" since they'd be
# writing the recipe inline. No separate check needed.

# Semantic-token misuse — should use ramp atoms not semantic destructive
check "Semantic destructive token (use danger-N ramp atom)" \
  '(bg-destructive(/|"| |$)|text-destructive(/|"| |$)|border-destructive(/|"| |$))' \
  'src/components/ui/button.tsx'

# Banned at surface tier: gap-3 / gap-5 / gap-7 / p-3 / p-5 / p-7
# (these are valid inside primitive internals; flag uses in artboards only)
check "Banned surface-tier spacing (gap-3/5/7, p-3/5/7) in artboards" \
  '(className="[^"]*(gap-3|gap-5|gap-7|p-3|p-5|p-7|py-3|py-5|py-7|px-5|px-7)[^"]*")' \
  'NO_EXCLUDE_PLACEHOLDER_ARTBOARDS_ONLY'

# Final exit-code logic
if [[ $total_findings -gt 0 ]]; then
  if [[ $QUIET -eq 0 ]]; then
    echo
    echo "==================================================================="
    echo "DRIFT: $total_findings findings across the recipes above."
    echo "Either swap to the primitive, justify with a comment, or extend the"
    echo "primitive (new variant / new slot) — don't hand-roll."
    echo "==================================================================="
  fi
  exit 1
fi

if [[ $QUIET -eq 0 ]]; then
  echo "✓ No drift detected against $((10)) known primitive recipes."
fi
exit 0
