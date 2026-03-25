import { z } from "zod";

export const ResumeSectionSchema = z.object({
  summary: z.string(),
  skills: z.array(z.string()),
  education: z.array(z.string()),
  experience: z.array(z.string()),
  projects: z.array(z.string()),
  certifications: z.array(z.string()),
});

export const ResumeParseSchema = z.object({
  contact: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    links: z.array(z.string()),
  }),
  sections: ResumeSectionSchema,
  keywords: z.array(z.string()),
  confidence: z.number(),
});

export const JobParseSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  preferred: z.array(z.string()),
  keywords: z.array(z.string()),
});

export const MatchAnalysisSchema = z.object({
  overallScore: z.number(),
  mustHaveCoverage: z.number(),
  preferredCoverage: z.number(),
  skillsOverlap: z.number(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  priorityActions: z.array(
    z.object({
      title: z.string(),
      rationale: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    }),
  ),
  truthfulnessWarnings: z.array(z.string()),
});

export const RewriteItemSchema = z.object({
  original: z.string(),
  rewritten: z.string(),
  explanation: z.string(),
  confidence: z.number(),
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
