"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadResumeAction } from "@/actions/resumes";
import { toast } from "sonner";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      if (!title) {
        // Auto-fill title based on filename
        const name = acceptedFiles[0].name.replace(/\.[^/.]+$/, "");
        setTitle(name);
      }
    }
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      toast.error("Please provide a title and select a file.");
      return;
    }

    setIsPending(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const result = await uploadResumeAction(formData);
    
    setIsPending(false);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Resume uploaded and parsed successfully!");
      setFile(null);
      setTitle("");
      router.refresh();
      // Optionally redirect to jobs or dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--muted)]">Resume Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Summer 2026 Software Engineer"
          className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          required
        />
      </div>

      <div 
        {...getRootProps()} 
        className={`w-full cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 transition-colors ${
          isDragActive ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-[var(--border)] bg-white hover:border-[var(--muted)]'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="rounded-full bg-[var(--foreground)]/5 p-3 text-[var(--foreground)]">
            <UploadCloud size={24} />
          </div>
          {file ? (
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText size={16} className="text-[var(--accent)]" />
              <span>{file.name}</span>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-[var(--muted)] mt-1">PDF or DOCX (max 5MB)</p>
            </div>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending || !file || !title}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-4 text-sm font-medium transition hover:bg-[var(--foreground)]/90 disabled:opacity-50"
        style={{ color: "#ffffff" }}
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? "Uploading & Parsing..." : "Upload Resume"}
      </button>
    </form>
  );
}
