import { RewriteSet } from "@/types/domain";

export function RewritePanel({ rewrite }: { rewrite: RewriteSet }) {
  return (
    <section className="rounded-[32px] border border-[var(--border)] bg-white/75 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        {rewrite.type.replaceAll("_", " ")}
      </p>
      <div className="mt-4 space-y-5">
        {rewrite.items.map((item) => (
          <div key={`${item.original}-${item.rewritten}`} className="border-t border-[var(--border)] pt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Original</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.original}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Suggested</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{item.rewritten}</p>
            <p className="mt-3 text-xs leading-6 text-[var(--muted)]">{item.explanation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
