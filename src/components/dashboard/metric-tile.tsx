import { formatPercent } from "@/lib/utils";

export function MetricTile({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-white/70 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
      <p className="mt-4 section-title text-5xl font-semibold">
        {suffix === "%" ? formatPercent(value) : value}
      </p>
    </div>
  );
}
