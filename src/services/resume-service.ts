import mammoth from "mammoth";
import pdf from "pdf-parse";
import { parseResumeWithAI } from "@/lib/ai";

export async function extractResumeText(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf") {
    const parsed = await pdf(buffer);
    return parsed.text.trim();
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  throw new Error("Unsupported file type. Upload a PDF or DOCX resume.");
}

export async function parseResumeText(rawText: string) {
  return parseResumeWithAI(rawText);
}
