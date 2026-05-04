import {
  RequestVolumeCard,
  TopKeysCard,
} from '@/artboards/CMP012ComposedDashboard';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-008a — Cards
 *
 * Demonstrates the shadcn `<Card>` chrome family — `Card`, `CardHeader`,
 * `CardTitle`, `CardDescription`, `CardAction`, `CardContent` — in two
 * canonical compositions:
 *
 *   1. Chart card  (header / chart body)
 *   2. Metric + list card  (header / metric hero / divider / row list)
 *
 * Single source of truth: both example bodies are imported directly from
 * CMP-012 (`RequestVolumeCard`, `TopKeysCard`). No copy-paste — the same
 * component instance powers the live dashboard surface and the design-
 * system reference shown here. Future card surfaces should compose the
 * same primitives instead of hand-rolling div chrome.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP008aCards() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-008a"
          title="Cards"
          description="Card chrome — header (title · subtitle · action), content body. Powers chart cards, metric panels, and any list surface that needs the white-rounded shell."
          parts="2 layouts"
        />

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-008a.1 — CHART CARD"
              hint=".v-card · header / chart body"
            />
            <div className="flex">
              <RequestVolumeCard />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-008a.2 — METRIC + LIST CARD"
              hint=".v-card · metric hero / divider / row list"
            />
            <div className="flex">
              <TopKeysCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
