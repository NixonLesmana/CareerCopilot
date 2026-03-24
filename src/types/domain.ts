import { z } from "zod";

export const ResumeSectionSchema = z.object({
  summary: z.string().default(""),
  skills: z.array(z.string()).default([]),
  education: z.array(z.string()).default([]),
  experience: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
});

export const ResumeParseSchema = z.object({
  contact: z.object({
    name: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),
    links: z.array(z.string()).default([]),
  }),
  sections: ResumeSectionSchema,
  keywords: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.8),
});

export const JobParseSchema = z.object({
  title: z.string(),
  company: z.string().default(""),
  location: z.string().default(""),
  responsibilities: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  preferred: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
});

export const MatchAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  mustHaveCoverage: z.number().min(0).max(100),
  preferredCoverage: z.number().min(0).max(100),
  skillsOverlap: z.number().min(0).max(100),
  strengths: z.array(z.string()).default([]),
  gaps: z.array(z.string()).default([]),
  missingKeywords: z.array(z.string()).default([]),
  priorityActions: z.array(
    z.object({
      title: z.string(),
      rationale: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    }),
  ),
  truthfulnessWarnings: z.array(z.string()).default([]),
});

export const RewriteItemSchema = z.object({
  original: z.string(),
  rewritten: z.string(),
  explanation: z.string(),
  confidence: z.number().min(0).max(1),
});

export const RewriteSetSchema = z.object({
  type: z.enum([
    "bullet_rewrite",
    "experience_rewrite",
    "project_rewrite",
    "summary_rewrite",
    "skills_suggestion",
  ]),
  items: z.array(RewriteItemSchema),
});

export const CoverLetterSchema = z.object({
  greeting: z.string(),
  intro: z.string(),
  body: z.array(z.string()),
  closing: z.string(),
});

export type ResumeParse = z.infer<typeof ResumeParseSchema>;
export type JobParse = z.infer<typeof JobParseSchema>;
export type MatchAnalysis = z.infer<typeof MatchAnalysisSchema>;
export type RewriteSet = z.infer<typeof RewriteSetSchema>;
export type CoverLetter = z.infer<typeof CoverLetterSchema>;
