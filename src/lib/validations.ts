import { z } from "zod";

export const UploadResumeSchema = z.object({
  title: z.string().min(1),
});

export const JobIngestSchema = z.object({
  title: z.string().min(2),
  company: z.string().optional(),
  rawText: z.string().min(80),
  url: z.string().url().optional().or(z.literal("")),
});

export const JobUrlImportSchema = z.object({
  url: z.string().url(),
});

export const RunAnalysisSchema = z.object({
  resumeId: z.string().min(1),
  jobId: z.string().min(1),
});

export const RewriteRequestSchema = z.object({
  analysisId: z.string().min(1),
  type: z.enum([
    "bullet_rewrite",
    "experience_rewrite",
    "project_rewrite",
    "summary_rewrite",
    "skills_suggestion",
  ]),
  sourceText: z.string().min(10),
});

export const CoverLetterRequestSchema = z.object({
  analysisId: z.string().min(1),
  tone: z.enum(["professional", "confident", "warm"]).default("professional"),
});
