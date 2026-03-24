import {
  CoverLetter,
  JobParse,
  MatchAnalysis,
  ResumeParse,
  RewriteSet,
} from "@/types/domain";

function uniqueWords(input: string) {
  return [...new Set(input.toLowerCase().match(/[a-zA-Z][a-zA-Z0-9+#.-]{2,}/g) ?? [])];
}

export function fallbackResumeParse(rawText: string): ResumeParse {
  const lines = rawText.split("\n").map((line) => line.trim()).filter(Boolean);
  const email = lines.find((line) => line.includes("@")) ?? "";
  const skillsLine = lines.find((line) => /skills/i.test(line)) ?? "";
  const name = lines[0] ?? "Candidate";
  const skills = uniqueWords(skillsLine).slice(0, 12);

  return {
    contact: {
      name,
      email,
      phone: "",
      location: "",
      links: lines.filter((line) => line.includes("http")).slice(0, 4),
    },
    sections: {
      summary: lines.slice(1, 4).join(" "),
      skills,
      education: lines.filter((line) => /university|college|school|b\.s|bachelor|master/i.test(line)).slice(0, 4),
      experience: lines.filter((line) => /intern|engineer|developer|assistant|project/i.test(line)).slice(0, 8),
      projects: lines.filter((line) => /project|built|created|developed/i.test(line)).slice(0, 8),
      certifications: lines.filter((line) => /certif/i.test(line)).slice(0, 3),
    },
    keywords: uniqueWords(rawText).slice(0, 30),
    confidence: 0.68,
  };
}

export function fallbackJobParse(rawText: string, title?: string, company?: string): JobParse {
  const lines = rawText.split("\n").map((line) => line.trim()).filter(Boolean);
  const keywords = uniqueWords(rawText).slice(0, 24);

  return {
    title: title ?? lines[0] ?? "Software Engineering Intern",
    company: company ?? "",
    location: "",
    responsibilities: lines.filter((line) => /build|design|develop|collaborate|support/i.test(line)).slice(0, 6),
    requirements: lines.filter((line) => /experience|proficient|required|must|familiar/i.test(line)).slice(0, 8),
    preferred: lines.filter((line) => /preferred|bonus|nice to have/i.test(line)).slice(0, 5),
    keywords,
  };
}

export function fallbackMatchAnalysis(resumeText: string, jobText: string): MatchAnalysis {
  const resumeWords = uniqueWords(resumeText);
  const jobWords = uniqueWords(jobText);
  const overlap = jobWords.filter((word) => resumeWords.includes(word));
  const missing = jobWords.filter((word) => !resumeWords.includes(word)).slice(0, 10);
  const baseScore = Math.min(95, Math.max(35, Math.round((overlap.length / Math.max(jobWords.length, 1)) * 100)));

  return {
    overallScore: baseScore,
    mustHaveCoverage: Math.min(100, baseScore + 4),
    preferredCoverage: Math.max(20, baseScore - 10),
    skillsOverlap: Math.min(100, Math.round((overlap.length / Math.max(jobWords.length, 1)) * 120)),
    strengths: overlap.slice(0, 5).map((word) => `Your resume already reflects "${word}" in a way the role values.`),
    gaps: missing.slice(0, 5).map((word) => `The posting highlights "${word}", but it is not clearly visible in your resume.`),
    missingKeywords: missing,
    priorityActions: [
      {
        title: "Rewrite your summary for the target role",
        rationale: "A role-specific summary increases ATS alignment and gives recruiters faster context.",
        priority: "high",
      },
      {
        title: "Strengthen experience bullets with technical keywords",
        rationale: "Use the language already present in the job description without overstating your work.",
        priority: "high",
      },
      {
        title: "Surface the strongest relevant project earlier",
        rationale: "New-grad resumes often benefit when the most aligned project is easier to find.",
        priority: "medium",
      },
    ],
    truthfulnessWarnings: [
      "Do not add tools, metrics, or ownership claims unless you can defend them in an interview.",
    ],
  };
}

export function fallbackRewrite(type: string, sourceText: string): RewriteSet {
  const cleaned = sourceText.trim();
  return {
    type: type as RewriteSet["type"],
    items: [
      {
        original: cleaned,
        rewritten: cleaned.replace(/\bworked on\b/i, "built").replace(/\bhelped\b/i, "contributed to"),
        explanation: "Uses stronger action language while preserving the original claim.",
        confidence: 0.79,
      },
    ],
  };
}

export function fallbackCoverLetter(context: string, tone: string): CoverLetter {
  return {
    greeting: "Dear Hiring Team,",
    intro:
      tone === "warm"
        ? "I am excited to apply for this opportunity because it closely matches the work I have been building through coursework and personal projects."
        : "I am writing to apply for this role because it aligns strongly with the software and systems experience I have been building.",
    body: [
      "My background combines hands-on project work, technical curiosity, and a strong willingness to learn quickly in collaborative environments.",
      `The strongest fit I see from the role is this: ${context.slice(0, 220)}...`,
    ],
    closing: "Thank you for your time and consideration. I would welcome the chance to discuss how I can contribute and continue growing on your team.",
  };
}
