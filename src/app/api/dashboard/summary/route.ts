import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await requireUser();
  const [resumes, jobs, analyses, artifacts] = await Promise.all([
    db.resume.count({ where: { userId: user.id } }),
    db.jobPosting.count({ where: { userId: user.id } }),
    db.matchAnalysis.count({ where: { userId: user.id } }),
    db.generatedArtifact.count({ where: { userId: user.id } }),
  ]);

  return NextResponse.json({ resumes, jobs, analyses, artifacts });
}
