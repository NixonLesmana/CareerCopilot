import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { SiteHeader } from "@/components/shared/site-header";

export default async function ResumesPage() {
  const user = await requireUser();
  const resumes = await db.resume.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass rounded-[32px] p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Upload resume</p>
            <h1 className="section-title mt-4 text-4xl font-semibold">Add a base resume.</h1>
            <form action="/api/resumes/upload" method="post" encType="multipart/form-data" className="mt-8 space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Summer 2026 software resume"
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
                required
              />
              <input
                type="file"
                name="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="w-full rounded-2xl border border-dashed border-[var(--border)] bg-white px-4 py-6"
                required
              />
              <button className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white">Upload and parse</button>
            </form>
          </section>
          <section className="rounded-[32px] border border-[var(--border)] bg-white/75 p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Library</p>
            <div className="mt-6 space-y-4">
              {resumes.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">No resumes yet.</p>
              ) : (
                resumes.map((resume) => (
                  <article key={resume.id} className="rounded-[24px] border border-[var(--border)] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold">{resume.title}</h2>
                        <p className="text-sm text-[var(--muted)]">{resume.fileName}</p>
                      </div>
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.18em]">
                        {resume.status}
                      </span>
                    </div>
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
