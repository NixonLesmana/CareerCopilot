import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { assertRateLimit } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";
import { parseResumeText, extractResumeText } from "@/services/resume-service";

export async function POST(request: Request) {
  const user = await requireUser();
  assertRateLimit(`resume-upload:${user.id}`, 8);

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file");

  if (!title || !(file instanceof File)) {
    return NextResponse.json({ error: "Title and file are required." }, { status: 400 });
  }

  const rawText = await extractResumeText(file);
  const parsed = await parseResumeText(rawText);

  await db.resume.create({
    data: {
      userId: user.id,
      title,
      fileName: file.name,
      mimeType: file.type,
      rawText,
      status: "PARSED",
      parseConfidence: parsed.confidence,
      parsedData: parsed,
    },
  });

  await trackEvent("resume_uploaded", { userId: user.id, title });
  return NextResponse.redirect(new URL("/resumes", request.url));
}
