import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal/10 text-circuit">
          <Icon size={16} />
        </span>
        {delta && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              trend === "up" ? "text-circuit" : "text-red-400"
            }`}
          >
            {trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-semibold text-paper">{value}</p>
      <p className="mt-1 text-xs text-slate-soft">{label}</p>
    </div>
  );
}
