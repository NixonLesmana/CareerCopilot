import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { EmptyState } from "@/components/dashboard/empty-state";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { SiteHeader } from "@/components/shared/site-header";
import { AnalysisForm } from "@/components/dashboard/analysis-form";

export default async function DashboardPage() {
  const user = await requireUser();
  const [resumeCount, jobCount, analysisCount, latestAnalyses, resumes, jobs] = await Promise.all([
    db.resume.count({ where: { userId: user.id } }),
    db.jobPosting.count({ where: { userId: user.id } }),
    db.matchAnalysis.count({ where: { userId: user.id } }),
    db.matchAnalysis.findMany({
      where: { userId: user.id },
      include: { job: true, resume: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    db.resume.findMany({
      where: { userId: user.id },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
    db.jobPosting.findMany({
      where: { userId: user.id },
      select: { id: true, title: true, company: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6">
        <section className="mb-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Workspace</p>
          <h1 className="section-title mt-2 text-3xl font-semibold leading-tight lg:text-[2.8rem]">
            Your internship application cockpit.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-[0.95rem]">
            Keep one base resume, compare it against multiple roles, and save better drafts without losing the truth of your original work.
          </p>
        </section>
        <section className="grid gap-3 md:grid-cols-3">
          <MetricTile label="Resumes" value={resumeCount} />
          <MetricTile label="Jobs saved" value={jobCount} />
          <MetricTile label="Analyses run" value={analysisCount} />
        </section>
        <section className="mt-6">
          {resumeCount === 0 || jobCount === 0 ? (
            <EmptyState resumeCount={resumeCount} jobCount={jobCount} />
          ) : (
            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <AnalysisForm resumes={resumes} jobs={jobs} />
              <div className="grid gap-4">
                {analysisCount === 0 ? (
                  <div className="rounded-[28px] border border-[var(--border)] bg-white/75 p-6 text-sm leading-6 text-[var(--muted)]">
                    Run your first analysis to unlock rewrites and cover letter generation.
                  </div>
                ) : (
                  latestAnalyses.map((analysis) => (
                    <Link
                      key={analysis.id}
                      href={`/analysis/${analysis.id}`}
                      className="glass rounded-[28px] p-5 transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{analysis.job.company ?? "Target role"}</p>
                      <h2 className="section-title mt-2 text-[2rem] font-semibold leading-tight">{analysis.job.title}</h2>
                      <p className="mt-1.5 text-sm text-[var(--muted)]">{analysis.resume.title}</p>
                      <p className="mt-4 text-4xl font-semibold">{analysis.overallScore}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
