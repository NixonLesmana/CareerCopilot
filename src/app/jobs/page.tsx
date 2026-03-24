import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { SiteHeader } from "@/components/shared/site-header";

export default async function JobsPage() {
  const user = await requireUser();
  const jobs = await db.jobPosting.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass rounded-[32px] p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Job input</p>
            <h1 className="section-title mt-4 text-4xl font-semibold">Paste a role or import from URL.</h1>
            <form action="/api/jobs/ingest" method="post" className="mt-8 space-y-4">
              <input name="title" placeholder="Software Engineering Intern" className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3" required />
              <input name="company" placeholder="Company name" className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3" />
              <input name="url" placeholder="https://company.com/jobs/123" className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3" />
              <textarea name="rawText" placeholder="Paste the job description here..." className="min-h-56 w-full rounded-[24px] border border-[var(--border)] bg-white px-4 py-4" required />
              <button className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white">Save job posting</button>
            </form>
          </section>
          <section className="rounded-[32px] border border-[var(--border)] bg-white/75 p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Saved jobs</p>
            <div className="mt-6 space-y-4">
              {jobs.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">No jobs saved yet.</p>
              ) : (
                jobs.map((job) => (
                  <article key={job.id} className="rounded-[24px] border border-[var(--border)] p-5">
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-sm text-[var(--muted)]">{job.company ?? "Company not set"}</p>
                    {job.url ? <p className="mt-3 truncate text-xs text-[var(--muted)]">{job.url}</p> : null}
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
