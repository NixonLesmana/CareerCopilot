import { analyzeMatchWithAI } from "@/lib/ai";

export async function runMatchAnalysis(resumeText: string, jobText: string) {
  return analyzeMatchWithAI(resumeText, jobText);
}
