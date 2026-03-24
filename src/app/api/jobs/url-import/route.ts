import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { JobUrlImportSchema } from "@/lib/validations";
import { extractJobFromUrl, parseJobText } from "@/services/job-service";

export async function POST(request: Request) {
  await requireUser();
  const payload = JobUrlImportSchema.parse(await request.json());
  const rawText = await extractJobFromUrl(payload.url);
  const parsed = await parseJobText(rawText);
  return NextResponse.json({ rawText, parsed });
}
