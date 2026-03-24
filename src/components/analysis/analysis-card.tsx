import { MatchAnalysis } from "@/types/domain";
import { formatPercent } from "@/lib/utils";

export function AnalysisCard({ analysis }: { analysis: MatchAnalysis }) {
  return (
    <div className="glass rounded-[32px] p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Overall fit</p>
          <p className="section-title mt-3 text-6xl font-semibold">{analysis.overallScore}</p>
        </div>
        <div className="text-right text-sm text-[var(--muted)]">
          <p>Must-have coverage {formatPercent(analysis.mustHaveCoverage)}</p>
          <p>Preferred coverage {formatPercent(analysis.preferredCoverage)}</p>
          <p>Skills overlap {formatPercent(analysis.skillsOverlap)}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Strengths</h3>
          <ul className="mt-3 space-y-3 text-sm leading-6">
            {analysis.strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Priority gaps</h3>
          <ul className="mt-3 space-y-3 text-sm leading-6">
            {analysis.gaps.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
