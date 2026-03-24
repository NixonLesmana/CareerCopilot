import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/auth";
import { db } from "@/lib/db";
import { SiteHeader } from "@/components/shared/site-header";

export default async function AdminPage() {
  const viewer = await currentUser();
  if (!isAdminEmail(viewer?.primaryEmailAddress?.emailAddress)) {
    notFound();
  }

  const [users, resumes, jobs, analyses, artifacts] = await Promise.all([
    db.user.count(),
    db.resume.count(),
    db.jobPosting.count(),
    db.matchAnalysis.count(),
    db.generatedArtifact.count(),
  ]);

  const stats = [
    ["Users", users],
    ["Resumes", resumes],
    ["Jobs", jobs],
    ["Analyses", analyses],
    ["Artifacts", artifacts],
  ];

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Admin analytics</p>
        <h1 className="section-title mt-3 text-5xl font-semibold">Operational snapshot</h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {stats.map(([label, value]) => (
            <article key={label} className="glass rounded-[32px] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
              <p className="section-title mt-4 text-5xl font-semibold">{value}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
