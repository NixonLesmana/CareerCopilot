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
    <div className="rounded-[24px] border border-[var(--border)] bg-white/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
      <p className="mt-3 section-title text-4xl font-semibold">
        {suffix === "%" ? formatPercent(value) : value}
      </p>
    </div>
  );
}
