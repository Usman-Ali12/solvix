import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PreviewTemplate } from "@/lib/templates";

export default function PreviewCard({ t }: { t: PreviewTemplate }) {
  return (
    <Link
      href={`/previews/${t.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-line bg-void-soft transition-colors hover:border-signal/50"
    >
      {/* Mock browser preview */}
      <div className="border-b border-slate-line">
        <div className="flex items-center gap-1.5 border-b border-slate-line px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-slate-line" />
          <span className="h-2 w-2 rounded-full bg-slate-line" />
          <span className="h-2 w-2 rounded-full bg-slate-line" />
        </div>
        <div
          className={`relative flex h-40 flex-col justify-end overflow-hidden bg-gradient-to-br p-4 ${t.accent}`}
        >
          <div className="grid-fade absolute inset-0" />
          <p className="relative font-display text-sm font-semibold text-paper">
            {t.businessName}
          </p>
          <p className="relative text-xs text-slate-soft">{t.heroLine}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{t.niche}</p>
        <h3 className="mt-2 font-display text-lg font-semibold text-paper">
          {t.businessName}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-soft">{t.tagline}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-circuit">
            <Clock size={12} /> {t.turnaround}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-signal-light">
            Preview site
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
