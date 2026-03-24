import { generateCoverLetterWithAI, generateRewriteWithAI } from "@/lib/ai";

export async function buildRewrite(type: string, sourceText: string, analysisContext: string) {
  return generateRewriteWithAI(type, sourceText, analysisContext);
}

export async function buildCoverLetter(analysisContext: string, tone: string) {
  return generateCoverLetterWithAI(analysisContext, tone);
}
