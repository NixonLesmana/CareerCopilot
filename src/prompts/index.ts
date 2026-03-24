export function buildResumeCleanupPrompt(rawText: string) {
  return `
You are a resume parser for an internship-focused career copilot.
Extract only truthful data from the resume text.
Do not invent missing details.
Return structured JSON.

Resume:
${rawText}
`;
}

export function buildJobCleanupPrompt(rawText: string, title?: string, company?: string) {
  return `
You are a job posting parser. Normalize the role into clean fields.
If title or company are provided, use them only when supported by the text.

Provided title: ${title ?? "unknown"}
Provided company: ${company ?? "unknown"}

Job posting:
${rawText}
`;
}

export function buildMatchAnalysisPrompt(resumeText: string, jobText: string) {
  return `
You are an honest job-match analyst for students and new grads.
Score fit, explain strengths and gaps, surface missing keywords, and never suggest fabricating experience.

Resume:
${resumeText}

Job:
${jobText}
`;
}

export function buildRewritePrompt(type: string, sourceText: string, analysisContext: string) {
  return `
Rewrite user resume content for the operation "${type}".
Rules:
- Do not fabricate experience.
- Keep the user's facts intact.
- Make the result more specific, impact-driven, and aligned to the role.
- Explain why each rewrite is stronger.

Context:
${analysisContext}

Source:
${sourceText}
`;
}

export function buildCoverLetterPrompt(analysisContext: string, tone: string) {
  return `
Write a concise, internship-ready cover letter.
Tone: ${tone}
Rules:
- Ground it in the user's real experience only.
- Make it specific to the role.
- Keep it confident but not exaggerated.

Context:
${analysisContext}
`;
}
