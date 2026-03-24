import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { CoverLetterPreview } from "@/components/export/cover-letter-preview";
import { RewritePanel } from "@/components/rewrite/rewrite-panel";
import { SiteHeader } from "@/components/shared/site-header";
import { CoverLetterSchema, MatchAnalysisSchema, RewriteSetSchema } from "@/types/domain";

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ analysisId: string }>;
}) {
  const user = await requireUser();
  const { analysisId } = await params;

  const analysis = await db.matchAnalysis.findFirst({
    where: { id: analysisId, userId: user.id },
    include: { artifacts: true, job: true, resume: true },
  });

  if (!analysis) notFound();

  const parsedAnalysis = MatchAnalysisSchema.parse(analysis.result);
  const rewriteArtifact = analysis.artifacts.find((artifact) => artifact.type === "BULLET_REWRITE");
  const coverLetterArtifact = analysis.artifacts.find((artifact) => artifact.type === "COVER_LETTER");
  const rewrite = rewriteArtifact ? RewriteSetSchema.parse(rewriteArtifact.content) : null;
  const coverLetter = coverLetterArtifact ? CoverLetterSchema.parse(coverLetterArtifact.content) : null;

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-[1260px] px-4 py-10 sm:px-6">
        <section className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{analysis.job.company ?? "Target company"}</p>
            <h1 className="section-title mt-3 text-5xl font-semibold">{analysis.job.title}</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">{analysis.resume.title}</p>
          </div>
        </section>

        <div className="grid gap-6">
          <AnalysisCard analysis={parsedAnalysis} />
          <div className="grid gap-6 lg:grid-cols-2">
            {rewrite ? (
              <RewritePanel rewrite={rewrite} />
            ) : (
              <form action="/api/rewrite" method="post" className="rounded-[32px] border border-[var(--border)] bg-white/75 p-6">
                <input type="hidden" name="analysisId" value={analysis.id} />
                <input type="hidden" name="type" value="bullet_rewrite" />
                <textarea
                  name="sourceText"
                  placeholder="Paste a bullet or short section to tailor..."
                  className="min-h-52 w-full rounded-[24px] border border-[var(--border)] px-4 py-4"
                  required
                />
                <button className="mt-4 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white">
                  Generate rewrite
                </button>
              </form>
            )}
            {coverLetter ? (
              <CoverLetterPreview letter={coverLetter} />
            ) : (
              <form action="/api/cover-letter" method="post" className="rounded-[32px] border border-[var(--border)] bg-white/75 p-6">
                <input type="hidden" name="analysisId" value={analysis.id} />
                <select name="tone" className="w-full rounded-2xl border border-[var(--border)] px-4 py-3">
                  <option value="professional">Professional</option>
                  <option value="confident">Confident</option>
                  <option value="warm">Warm</option>
                </select>
                <button className="mt-4 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white">
                  Draft cover letter
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
