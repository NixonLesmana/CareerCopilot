import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { RunAnalysisSchema } from "@/lib/validations";
import { runMatchAnalysis } from "@/services/analysis-service";
import { assertUsageAvailable, trackUsage } from "@/services/quota-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const payload =
    request.headers.get("content-type")?.includes("application/json")
      ? RunAnalysisSchema.parse(await request.json())
      : RunAnalysisSchema.parse(Object.fromEntries(await request.formData()));

  await assertUsageAvailable(user.id, "analysis");

  const [resume, job] = await Promise.all([
    db.resume.findFirst({ where: { id: payload.resumeId, userId: user.id } }),
    db.jobPosting.findFirst({ where: { id: payload.jobId, userId: user.id } }),
  ]);

  if (!resume || !job) {
    return NextResponse.json({ error: "Resume or job not found." }, { status: 404 });
  }

  const result = await runMatchAnalysis(resume.rawText, job.rawText);
  const analysis = await db.matchAnalysis.create({
    data: {
      userId: user.id,
      resumeId: resume.id,
      jobId: job.id,
      overallScore: result.overallScore,
      result,
    },
  });

  await trackUsage(user.id, "analysis", { analysisId: analysis.id });

  if (request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(analysis);
  }

  return NextResponse.redirect(new URL(`/analysis/${analysis.id}`, request.url));
}
