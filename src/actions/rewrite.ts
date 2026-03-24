"use server";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { RewriteRequestSchema } from "@/lib/validations";
import { buildRewrite } from "@/services/rewrite-service";
import { assertUsageAvailable, trackUsage } from "@/services/quota-service";
import { revalidatePath } from "next/cache";

export async function createRewriteAction(formData: FormData) {
  const user = await requireUser();
  const parsed = RewriteRequestSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { error: "Invalid rewrite request." };
  }

  const payload = parsed.data;

  try {
    await assertUsageAvailable(user.id, "generation");
    
    const analysis = await db.matchAnalysis.findFirst({
      where: { id: payload.analysisId, userId: user.id },
      include: { job: true, resume: true },
    });

    if (!analysis) {
      return { error: "Analysis not found." };
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
    revalidatePath(`/analysis/${analysis.id}`);
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to generate rewrite." };
  }
}
