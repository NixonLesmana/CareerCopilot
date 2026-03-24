import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { SiteHeader } from "@/components/shared/site-header";
import { UploadForm } from "@/components/upload/upload-form";

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
            <UploadForm />
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
