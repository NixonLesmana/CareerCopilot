"use client";

import { useState } from "react";
import { saveJobAction } from "@/actions/jobs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function JobInputForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const result = await saveJobAction(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setIsPending(false);
    } else {
      toast.success("Job posting saved successfully!");
      // Redirect to the dashboard to trigger step 3!
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input 
        name="title" 
        disabled={isPending} 
        placeholder="Software Engineering Intern" 
        className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
        required 
      />
      <input 
        name="company" 
        disabled={isPending} 
        placeholder="Company name" 
        className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
      />
      <input 
        name="url" 
        disabled={isPending} 
        placeholder="https://company.com/jobs/123" 
        className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
      />
      <textarea 
        name="rawText" 
        disabled={isPending} 
        placeholder="Paste the job description here..." 
        className="min-h-56 w-full rounded-[24px] border border-[var(--border)] bg-white px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
        required 
      />
      
      <button 
        type="submit" 
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium transition hover:bg-[var(--foreground)]/90 disabled:opacity-50"
        style={{ color: "#ffffff" }}
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? "Saving job..." : "Save job posting"}
      </button>
    </form>
  );
}
