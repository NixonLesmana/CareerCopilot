"use client";

import { useState } from "react";
import { createRewriteAction } from "@/actions/rewrite";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

export function RewriteForm({ analysisId }: { analysisId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsPending(true);
    const formData = new FormData();
    formData.append("analysisId", analysisId);
    formData.append("type", "bullet_rewrite");
    formData.append("sourceText", text);

    const result = await createRewriteAction(formData);
    setIsPending(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Rewrite generated!");
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[32px] border border-[var(--border)] bg-white/75 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-[var(--accent)]" size={18} />
        <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--foreground)]">Rewrite with AI</h3>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a bullet or section from your resume to tailor it directly to this role..."
        className="min-h-[140px] w-full rounded-[24px] border border-[var(--border)] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-sm leading-relaxed"
        required
        disabled={isPending}
      />
      <button 
        type="submit"
        disabled={isPending || !text.trim()}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-4 text-sm font-medium text-white transition hover:bg-[var(--foreground)]/90 disabled:opacity-50"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? "Rewriting..." : "Generate Rewrite"}
      </button>
    </form>
  );
}
