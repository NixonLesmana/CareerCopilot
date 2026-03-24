"use server";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { assertRateLimit } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";
import { parseResumeText, extractResumeText } from "@/services/resume-service";
import { revalidatePath } from "next/cache";

export async function uploadResumeAction(formData: FormData) {
  const user = await requireUser();
  
  // Rate limits check could throw, which should be caught by the caller or handled gracefully
  try {
    await assertRateLimit(`resume-upload:${user.id}`, 8);
  } catch (err: any) {
    return { error: err.message || "Rate limit exceeded" };
  }

  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file");

  if (!title || !(file instanceof File)) {
    return { error: "Title and file are required." };
  }

  try {
    const rawText = await extractResumeText(file);
    const parsed = await parseResumeText(rawText);

    const resume = await db.resume.create({
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
    revalidatePath("/resumes");
    revalidatePath("/dashboard");
    
    return { success: true, resumeId: resume.id };
  } catch (error: any) {
    return { error: error.message || "Failed to upload resume." };
  }
}
