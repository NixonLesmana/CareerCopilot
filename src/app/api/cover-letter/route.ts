import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CoverLetterRequestSchema } from "@/lib/validations";
import { buildCoverLetter } from "@/services/rewrite-service";
import { assertUsageAvailable, trackUsage } from "@/services/quota-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const payload = CoverLetterRequestSchema.parse(Object.fromEntries(await request.formData()));

  await assertUsageAvailable(user.id, "generation");

  const analysis = await db.matchAnalysis.findFirst({
    where: { id: payload.analysisId, userId: user.id },
    include: { job: true, resume: true },
  });

  if (!analysis) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  const context = `Resume: ${analysis.resume.rawText}\nJob: ${analysis.job.rawText}\nAnalysis: ${JSON.stringify(
    analysis.result,
  )}`;
  const letter = await buildCoverLetter(context, payload.tone);

  await db.generatedArtifact.create({
    data: {
      userId: user.id,
      analysisId: analysis.id,
      type: "COVER_LETTER",
      title: `${analysis.job.title} cover letter`,
      content: letter,
    },
  });

  await trackUsage(user.id, "generation", { analysisId: analysis.id, type: "cover_letter" });
  return NextResponse.redirect(new URL(`/analysis/${analysis.id}`, request.url));
}
