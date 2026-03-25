import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
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

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

function getClient() {
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function parseResumeWithAI(rawText: string): Promise<ResumeParse> {
  const client = getClient();
  if (!client) return fallbackResumeParse(rawText);

  const response = await client.beta.chat.completions.parse({
    model,
    messages: [{ role: "user", content: buildResumeCleanupPrompt(rawText) }],
    response_format: zodResponseFormat(ResumeParseSchema, "resume_parse"),
  });

  return response.choices[0].message.parsed ?? fallbackResumeParse(rawText);
}

export async function parseJobWithAI(
  rawText: string,
  title?: string,
  company?: string,
): Promise<JobParse> {
  const client = getClient();
  if (!client) return fallbackJobParse(rawText, title, company);

  const response = await client.beta.chat.completions.parse({
    model,
    messages: [{ role: "user", content: buildJobCleanupPrompt(rawText, title, company) }],
    response_format: zodResponseFormat(JobParseSchema, "job_parse"),
  });

  return response.choices[0].message.parsed ?? fallbackJobParse(rawText, title, company);
}

export async function analyzeMatchWithAI(
  resumeText: string,
  jobText: string,
): Promise<MatchAnalysis> {
  const client = getClient();
  if (!client) return fallbackMatchAnalysis(resumeText, jobText);

  const response = await client.beta.chat.completions.parse({
    model,
    messages: [{ role: "user", content: buildMatchAnalysisPrompt(resumeText, jobText) }],
    response_format: zodResponseFormat(MatchAnalysisSchema, "match_analysis"),
  });

  return response.choices[0].message.parsed ?? fallbackMatchAnalysis(resumeText, jobText);
}

export async function generateRewriteWithAI(
  type: string,
  sourceText: string,
  analysisContext: string,
): Promise<RewriteSet> {
  const client = getClient();
  if (!client) return fallbackRewrite(type, sourceText);

  const response = await client.beta.chat.completions.parse({
    model,
    messages: [{ role: "user", content: buildRewritePrompt(type, sourceText, analysisContext) }],
    response_format: zodResponseFormat(RewriteSetSchema, "rewrite_set"),
  });

  return response.choices[0].message.parsed ?? fallbackRewrite(type, sourceText);
}

export async function generateCoverLetterWithAI(
  analysisContext: string,
  tone: string,
): Promise<CoverLetter> {
  const client = getClient();
  if (!client) return fallbackCoverLetter(analysisContext, tone);

  const response = await client.beta.chat.completions.parse({
    model,
    messages: [{ role: "user", content: buildCoverLetterPrompt(analysisContext, tone) }],
    response_format: zodResponseFormat(CoverLetterSchema, "cover_letter"),
  });

  return response.choices[0].message.parsed ?? fallbackCoverLetter(analysisContext, tone);
}
