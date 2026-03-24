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

  const response = await client.responses.parse({
    model,
    input: buildResumeCleanupPrompt(rawText),
    text: {
      format: zodResponseFormat(ResumeParseSchema, "resume_parse") as never,
    },
  });

  return (response.output_parsed as ResumeParse | null) ?? fallbackResumeParse(rawText);
}

export async function parseJobWithAI(
  rawText: string,
  title?: string,
  company?: string,
): Promise<JobParse> {
  const client = getClient();
  if (!client) return fallbackJobParse(rawText, title, company);

  const response = await client.responses.parse({
    model,
    input: buildJobCleanupPrompt(rawText, title, company),
    text: {
      format: zodResponseFormat(JobParseSchema, "job_parse") as never,
    },
  });

  return (response.output_parsed as JobParse | null) ?? fallbackJobParse(rawText, title, company);
}

export async function analyzeMatchWithAI(
  resumeText: string,
  jobText: string,
): Promise<MatchAnalysis> {
  const client = getClient();
  if (!client) return fallbackMatchAnalysis(resumeText, jobText);

  const response = await client.responses.parse({
    model,
    input: buildMatchAnalysisPrompt(resumeText, jobText),
    text: {
      format: zodResponseFormat(MatchAnalysisSchema, "match_analysis") as never,
    },
  });

  return (response.output_parsed as MatchAnalysis | null) ?? fallbackMatchAnalysis(resumeText, jobText);
}

export async function generateRewriteWithAI(
  type: string,
  sourceText: string,
  analysisContext: string,
): Promise<RewriteSet> {
  const client = getClient();
  if (!client) return fallbackRewrite(type, sourceText);

  const response = await client.responses.parse({
    model,
    input: buildRewritePrompt(type, sourceText, analysisContext),
    text: {
      format: zodResponseFormat(RewriteSetSchema, "rewrite_set") as never,
    },
  });

  return (response.output_parsed as RewriteSet | null) ?? fallbackRewrite(type, sourceText);
}

export async function generateCoverLetterWithAI(
  analysisContext: string,
  tone: string,
): Promise<CoverLetter> {
  const client = getClient();
  if (!client) return fallbackCoverLetter(analysisContext, tone);

  const response = await client.responses.parse({
    model,
    input: buildCoverLetterPrompt(analysisContext, tone),
    text: {
      format: zodResponseFormat(CoverLetterSchema, "cover_letter") as never,
    },
  });

  return (response.output_parsed as CoverLetter | null) ?? fallbackCoverLetter(analysisContext, tone);
}
