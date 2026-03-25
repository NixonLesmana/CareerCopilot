"use server";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobIngestSchema } from "@/lib/validations";
import { parseJobText } from "@/services/job-service";
import { revalidatePath } from "next/cache";

export async function saveJobAction(formData: FormData) {
  try {
    const user = await requireUser();
    
    const validatedData = JobIngestSchema.safeParse({
      title: formData.get("title"),
      company: formData.get("company") || undefined,
      rawText: formData.get("rawText"),
      url: formData.get("url") || undefined,
    });

    if (!validatedData.success) {
      const errorMsg = validatedData.error.errors[0]?.message || "Invalid input";
      return { error: `Validation failed: ${errorMsg}` };
    }

    const payload = validatedData.data;

    const parsed = await parseJobText(payload.rawText, payload.title, payload.company);
    
    // Explicit serialization of parsed object if needed, though Prisma handles plain objects well
    await db.jobPosting.create({
      data: {
        userId: user.id,
        sourceType: payload.url ? "URL" : "PASTE",
        title: parsed.title,
        company: parsed.company || payload.company || "",
        url: payload.url || null,
        rawText: payload.rawText,
        parsedData: parsed as any,
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to save job:", err);
    return { error: err.message || "An unexpected error occurred." };
  }
}
