import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UploadForm } from "@/components/upload/upload-form";

interface EmptyStateProps {
  resumeCount: number;
  jobCount: number;
}

export function EmptyState({ resumeCount, jobCount }: EmptyStateProps) {
  if (resumeCount === 0) {
    return (
      <div className="glass rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Step 1</p>
        <h3 className="section-title mt-4 text-3xl font-semibold">
          Upload your base resume.
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
          Start by providing your current resume. We'll parse it and use it as the foundation for your tailored applications.
        </p>
        <div className="mt-6 max-w-lg">
          <UploadForm />
        </div>
      </div>
    );
  }

  // If resumeCount > 0 but jobCount === 0
  return (
    <div className="glass rounded-[32px] p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Step 2</p>
      <h3 className="section-title mt-4 text-3xl font-semibold">
        Add a target job posting.
      </h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
        You've uploaded a resume! Now add a job posting you want to apply for to unlock fit analysis and targeted rewrites.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm transition hover:bg-[var(--foreground)]/90"
          style={{ color: "#ffffff" }}
        >
          Add Job Posting
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
