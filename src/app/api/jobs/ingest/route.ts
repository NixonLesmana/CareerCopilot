import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobIngestSchema } from "@/lib/validations";
import { parseJobText } from "@/services/job-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const formData = await request.formData();
  const payload = JobIngestSchema.parse({
    title: formData.get("title"),
    company: formData.get("company"),
    rawText: formData.get("rawText"),
    url: formData.get("url"),
  });

  const parsed = await parseJobText(payload.rawText, payload.title, payload.company);
  await db.jobPosting.create({
    data: {
      userId: user.id,
      sourceType: payload.url ? "URL" : "PASTE",
      title: parsed.title,
      company: parsed.company || payload.company,
      url: payload.url || null,
      rawText: payload.rawText,
      parsedData: parsed,
    },
  });

  return NextResponse.redirect(new URL("/jobs", request.url));
}
