import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EmptyState() {
  return (
    <div className="glass rounded-[32px] p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Start here</p>
      <h3 className="section-title mt-4 text-3xl font-semibold">
        Upload your resume and analyze your first internship listing.
      </h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
        Once you have one resume and one job posting in the system, Career Copilot can produce
        fit analysis, targeted rewrites, and a tailored cover letter draft.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/resumes"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white"
        >
          Upload Resume
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm"
        >
          Add Job Posting
        </Link>
      </div>
    </div>
  );
}
