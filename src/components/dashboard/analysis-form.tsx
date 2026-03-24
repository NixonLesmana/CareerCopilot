"use client";

import { useState } from "react";
import { runAnalysisAction } from "@/actions/analysis";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Item {
  id: string;
  title: string;
  company?: string | null;
}

export function AnalysisForm({ resumes, jobs }: { resumes: Item[], jobs: Item[] }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const resumeId = formData.get("resumeId");
    const jobId = formData.get("jobId");

    if (!resumeId || !jobId) {
      toast.error("Please select a base resume and a target role.");
      return;
    }

    setIsPending(true);
    const result = await runAnalysisAction(formData);
    
    // Do not set isPending to false on success to keep loading state 
    // during the redirect to the new page.
    if (result.error) {
      setIsPending(false);
      toast.error(result.error);
    } else {
      toast.success("Analysis complete!");
      router.push(`/analysis/${result.analysisId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[32px] p-8 flex flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Run analysis</p>
        <h2 className="section-title mt-4 text-4xl font-semibold">Compare a resume against a live role.</h2>
      </div>
      
      <div className="mt-8 space-y-4">
        <select 
          name="resumeId" 
          disabled={isPending}
          defaultValue=""
          className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          required
        >
          <option value="" disabled>Select a base resume</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>{resume.title}</option>
          ))}
        </select>
        
        <select 
          name="jobId" 
          disabled={isPending}
          defaultValue=""
          className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          required
        >
          <option value="" disabled>Select a target role</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} {job.company ? `· ${job.company}` : ""}
            </option>
          ))}
        </select>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-medium text-white transition hover:bg-[var(--foreground)]/90 disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? "Analyzing fit..." : "Analyze fit"}
          {!isPending && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
  );
}
