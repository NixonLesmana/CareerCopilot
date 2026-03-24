export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--foreground)] text-sm font-semibold text-white">
        CC
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">AI Resume Copilot</p>
        <p className="section-title text-2xl font-semibold">Career Copilot</p>
      </div>
    </div>
  );
}
