import { Card } from '@/components/ui/card';
import { CompactKpi, CompactSpark } from '@/components/ui/compact-kpi';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

export function CMP008bStatCards() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-008b"
          title="Stat cards"
          description="Single metric, compare (this/last), status (with health dot), all with sparklines. The same KpiCard that powers the dashboard, just lined up."
          parts="3 layouts"
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-008b.2 — COMPACT + FLAT"
              hint=".compact for dense rails · .flat strips card chrome"
            />
            <Card className="p-6 rounded-sm">
              <div className="grid grid-cols-3 gap-4">
                <CompactKpi
                  title="Total Requests"
                  value="48,293"
                  delta="+8.2%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-1)"
                      data={[6, 12, 10, 16, 20, 18, 26, 24, 28]}
                    />
                  }
                />
                <CompactKpi
                  title="Total Cost"
                  value="$1,247.82"
                  delta="+12.6%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-2)"
                      data={[8, 10, 12, 16, 18, 20, 25, 22, 24]}
                    />
                  }
                />
                <CompactKpi
                  title="Avg Latency"
                  value="1.24 s"
                  delta="-3.2%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-3)"
                      data={[18, 16, 17, 15, 14, 13, 12, 11, 10]}
                      endDot
                    />
                  }
                />
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-008b.3 — STAT ROW"
              hint="KPIs with sparklines · 4 across"
            />
            <Card className="rounded-sm p-0 gap-0">
              <div className="grid grid-cols-4 divide-x divide-ink-200">
                <CompactKpi
                  flat
                  title="Requests"
                  value="24,812"
                  delta="+12.4%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-1)"
                      data={[10, 12, 11, 14, 13, 16, 15, 18, 20]}
                      endDot
                    />
                  }
                />
                <CompactKpi
                  flat
                  title="Tokens"
                  value="18.4 M"
                  delta="+8.7%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-7)"
                      data={[10, 12, 11, 13, 14, 15, 17, 18, 20]}
                      endDot
                    />
                  }
                />
                <CompactKpi
                  flat
                  title="Avg Latency"
                  value="1.24 s"
                  delta="-3.2%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-3)"
                      data={[18, 16, 17, 15, 14, 13, 12, 11, 10]}
                      endDot
                    />
                  }
                />
                <CompactKpi
                  flat
                  title="Spend"
                  value="$482"
                  delta="+14.8%"
                  spark={
                    <CompactSpark
                      colorVar="var(--color-chart-2)"
                      data={[10, 12, 11, 13, 14, 16, 17, 18, 20]}
                      endDot
                    />
                  }
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
