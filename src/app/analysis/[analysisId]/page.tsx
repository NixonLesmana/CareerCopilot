import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { CoverLetterPreview } from "@/components/export/cover-letter-preview";
import { RewritePanel } from "@/components/rewrite/rewrite-panel";
import { RewriteForm } from "@/components/rewrite/rewrite-form";
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
    <div className="flex flex-col h-screen overflow-hidden bg-transparent">
      <div className="flex-none bg-white/50 backdrop-blur-md border-b border-[var(--border)] z-10 relative">
         <SiteHeader compact />
      </div>
      
      <main className="flex-1 overflow-hidden grid lg:grid-cols-2 relative h-full">
        {/* Left Pane: Job Context & Analysis */}
        <section className="h-[calc(100vh-80px)] overflow-y-auto border-r border-[var(--border)] p-6 lg:p-10 pb-24">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{analysis.job.company ?? "Target company"}</p>
            <h1 className="section-title mt-3 text-4xl font-semibold">{analysis.job.title}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Matching against: {analysis.resume.title}</p>
          </div>
          <AnalysisCard analysis={parsedAnalysis} />
        </section>

        {/* Right Pane: Action Studio */}
        <section className="h-[calc(100vh-80px)] overflow-y-auto bg-white/40 p-6 lg:p-10 pb-24">
          <div className="mb-8">
            <h2 className="section-title text-2xl font-semibold">Rewrite Studio</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Tailor your resume directly to the missing skills highlighted.</p>
          </div>

          <div className="space-y-8">
            {rewrite ? (
              <RewritePanel rewrite={rewrite} />
            ) : (
              <RewriteForm analysisId={analysis.id} />
            )}

            {coverLetter ? (
              <CoverLetterPreview letter={coverLetter} />
            ) : (
              <form action="/api/cover-letter" method="post" className="rounded-[32px] border border-[var(--border)] bg-white/75 p-6 shadow-sm">
                <input type="hidden" name="analysisId" value={analysis.id} />
                <div className="mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--foreground)]">Generate Cover Letter</h3>
                </div>
                <select name="tone" className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                  <option value="professional">Professional</option>
                  <option value="confident">Confident</option>
                  <option value="warm">Warm</option>
                </select>
                <button className="mt-4 w-full rounded-full bg-[var(--foreground)] px-5 py-4 text-sm font-medium text-white transition hover:bg-[var(--foreground)]/90">
                  Draft cover letter
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
