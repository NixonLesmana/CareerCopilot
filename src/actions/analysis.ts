"use server";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { RunAnalysisSchema } from "@/lib/validations";
import { runMatchAnalysis } from "@/services/analysis-service";
import { assertUsageAvailable, trackUsage } from "@/services/quota-service";
import { revalidatePath } from "next/cache";

export async function runAnalysisAction(formData: FormData | Record<string, any>) {
  const user = await requireUser();
  
  const rawData = formData instanceof FormData 
    ? Object.fromEntries(formData) 
    : formData;
    
  const parsed = RunAnalysisSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: "Invalid input data." };
  }

  const payload = parsed.data;

  try {
    await assertUsageAvailable(user.id, "analysis");

    const [resume, job] = await Promise.all([
      db.resume.findFirst({ where: { id: payload.resumeId, userId: user.id } }),
      db.jobPosting.findFirst({ where: { id: payload.jobId, userId: user.id } }),
    ]);

    if (!resume || !job) {
      return { error: "Resume or job not found." };
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
    
    revalidatePath("/dashboard");
    revalidatePath("/analysis");
    
    return { success: true, analysisId: analysis.id };
  } catch (error: any) {
    return { error: error.message || "Failed to run analysis." };
  }
}
