import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { RewriteRequestSchema } from "@/lib/validations";
import { buildRewrite } from "@/services/rewrite-service";
import { assertUsageAvailable, trackUsage } from "@/services/quota-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const payload = RewriteRequestSchema.parse(Object.fromEntries(await request.formData()));

  await assertUsageAvailable(user.id, "generation");
  const analysis = await db.matchAnalysis.findFirst({
    where: { id: payload.analysisId, userId: user.id },
    include: { job: true, resume: true },
  });

  if (!analysis) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  const context = `Resume: ${analysis.resume.rawText}\n\nJob: ${analysis.job.rawText}\n\nAnalysis: ${JSON.stringify(
    analysis.result,
  )}`;
  const rewrite = await buildRewrite(payload.type, payload.sourceText, context);

  await db.generatedArtifact.create({
    data: {
      userId: user.id,
      analysisId: analysis.id,
      type:
        payload.type === "summary_rewrite"
          ? "SUMMARY_REWRITE"
          : payload.type === "skills_suggestion"
            ? "SKILLS_SUGGESTION"
            : payload.type === "experience_rewrite"
              ? "EXPERIENCE_REWRITE"
              : payload.type === "project_rewrite"
                ? "PROJECT_REWRITE"
                : "BULLET_REWRITE",
      title: payload.type.replaceAll("_", " "),
      content: rewrite,
    },
  });

  await trackUsage(user.id, "generation", { analysisId: analysis.id, type: payload.type });
  return NextResponse.redirect(new URL(`/analysis/${analysis.id}`, request.url));
}
