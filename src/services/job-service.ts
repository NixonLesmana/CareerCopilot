import { parseJobWithAI } from "@/lib/ai";

export async function extractJobFromUrl(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "CareerCopilotBot/1.0",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch the job posting URL.");
  }

  const html = await response.text();
  const plainText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.slice(0, 12_000);
}

export async function parseJobText(rawText: string, title?: string, company?: string) {
  return parseJobWithAI(rawText, title, company);
}
