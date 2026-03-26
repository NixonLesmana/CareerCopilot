import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import {
  type CoverLetter,
  type JobParse,
  type MatchAnalysis,
  type ResumeParse,
  type RewriteSet,
  CoverLetterSchema,
  JobParseSchema,
  MatchAnalysisSchema,
  ResumeParseSchema,
  RewriteSetSchema,
} from "@/types/domain";
import {
  buildCoverLetterPrompt,
  buildJobCleanupPrompt,
  buildMatchAnalysisPrompt,
  buildResumeCleanupPrompt,
  buildRewritePrompt,
} from "@/prompts";
import {
  fallbackCoverLetter,
  fallbackJobParse,
  fallbackMatchAnalysis,
  fallbackResumeParse,
  fallbackRewrite,
} from "@/services/fallbacks";

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

function getModel() {
  if (!apiKey) return null;
  const google = createGoogleGenerativeAI({ apiKey });
  return google(modelName);
}

export async function parseResumeWithAI(rawText: string): Promise<ResumeParse> {
  const model = getModel();
  if (!model) return fallbackResumeParse(rawText);

  try {
    const { object } = await generateObject({
      model,
      schema: ResumeParseSchema,
      prompt: buildResumeCleanupPrompt(rawText),
    });
    return object;
  } catch (err) {
    console.error("AI Parse Error:", err);
    return fallbackResumeParse(rawText);
  }
}

export async function parseJobWithAI(
  rawText: string,
  title?: string,
  company?: string,
): Promise<JobParse> {
  const model = getModel();
  if (!model) return fallbackJobParse(rawText, title, company);

  try {
    const { object } = await generateObject({
      model,
      schema: JobParseSchema,
      prompt: buildJobCleanupPrompt(rawText, title, company),
    });
    return object;
  } catch (err) {
    console.error("AI Parse Error:", err);
    return fallbackJobParse(rawText, title, company);
  }
}

export async function analyzeMatchWithAI(
  resumeText: string,
  jobText: string,
): Promise<MatchAnalysis> {
  const model = getModel();
  if (!model) return fallbackMatchAnalysis(resumeText, jobText);

  try {
    const { object } = await generateObject({
      model,
      schema: MatchAnalysisSchema,
      prompt: buildMatchAnalysisPrompt(resumeText, jobText),
    });
    return object;
  } catch (err) {
    console.error("AI Parse Error:", err);
    return fallbackMatchAnalysis(resumeText, jobText);
  }
}

export async function generateRewriteWithAI(
  type: string,
  sourceText: string,
  analysisContext: string,
): Promise<RewriteSet> {
  const model = getModel();
  if (!model) return fallbackRewrite(type, sourceText);

  try {
    const { object } = await generateObject({
      model,
      schema: RewriteSetSchema,
      prompt: buildRewritePrompt(type, sourceText, analysisContext),
    });
    return object;
  } catch (err) {
    console.error("AI Parse Error:", err);
    return fallbackRewrite(type, sourceText);
  }
}

export async function generateCoverLetterWithAI(
  analysisContext: string,
  tone: string,
): Promise<CoverLetter> {
  const model = getModel();
  if (!model) return fallbackCoverLetter(analysisContext, tone);

  try {
    const { object } = await generateObject({
      model,
      schema: CoverLetterSchema,
      prompt: buildCoverLetterPrompt(analysisContext, tone),
    });
    return object;
  } catch (err) {
    console.error("AI Parse Error:", err);
    return fallbackCoverLetter(analysisContext, tone);
  }
}
