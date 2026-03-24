import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseResumeText } from "@/services/resume-service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireUser();
  const { id } = await params;
  const resume = await db.resume.findFirst({ where: { id, userId: user.id } });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  }

  const parsed = await parseResumeText(resume.rawText);
  const updated = await db.resume.update({
    where: { id: resume.id },
    data: {
      status: "PARSED",
      parseConfidence: parsed.confidence,
      parsedData: parsed,
    },
  });

  return NextResponse.json(updated);
}
