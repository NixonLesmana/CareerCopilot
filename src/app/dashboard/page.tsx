import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { EmptyState } from "@/components/dashboard/empty-state";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { SiteHeader } from "@/components/shared/site-header";

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
      <main className="mx-auto max-w-[1260px] px-4 py-10 sm:px-6">
        <section className="mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Workspace</p>
          <h1 className="section-title mt-3 text-5xl font-semibold">Your internship application cockpit.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Keep one base resume, compare it against multiple roles, and save better drafts without losing the truth of your original work.
          </p>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          <MetricTile label="Resumes" value={resumeCount} />
          <MetricTile label="Jobs saved" value={jobCount} />
          <MetricTile label="Analyses run" value={analysisCount} />
        </section>
        <section className="mt-8">
          {resumeCount === 0 || jobCount === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <form action="/api/analysis/run" method="post" className="glass rounded-[32px] p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Run analysis</p>
                <h2 className="section-title mt-4 text-4xl font-semibold">Compare a resume against a live role.</h2>
                <div className="mt-8 space-y-4">
                  <select name="resumeId" className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3">
                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.title}
                      </option>
                    ))}
                  </select>
                  <select name="jobId" className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3">
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} {job.company ? `· ${job.company}` : ""}
                      </option>
                    ))}
                  </select>
                  <button className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white">
                    Analyze fit
                  </button>
                </div>
              </form>
              <div className="grid gap-4">
                {analysisCount === 0 ? (
                  <div className="rounded-[32px] border border-[var(--border)] bg-white/75 p-8 text-sm leading-7 text-[var(--muted)]">
                    Run your first analysis to unlock rewrites and cover letter generation.
                  </div>
                ) : (
                  latestAnalyses.map((analysis) => (
                    <Link
                      key={analysis.id}
                      href={`/analysis/${analysis.id}`}
                      className="glass rounded-[32px] p-6 transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{analysis.job.company ?? "Target role"}</p>
                      <h2 className="section-title mt-3 text-3xl font-semibold">{analysis.job.title}</h2>
                      <p className="mt-2 text-sm text-[var(--muted)]">{analysis.resume.title}</p>
                      <p className="mt-6 text-5xl font-semibold">{analysis.overallScore}</p>
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
