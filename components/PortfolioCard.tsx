import { Github, ExternalLink } from "lucide-react";

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  features: string[];
  gradient: string;
  demoHref?: string;
  githubHref?: string;
};

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-line bg-void-soft transition-colors hover:border-signal/50">
      <div
        className={`relative flex h-48 items-center justify-center overflow-hidden ${item.gradient}`}
      >
        <span className="font-display text-2xl font-semibold text-white/25">
          {item.title}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-void-soft via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{item.category}</p>
        <h3 className="mt-2 font-display text-lg font-semibold text-paper">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-soft">
          {item.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-slate-line px-2.5 py-1 font-mono text-[11px] text-slate-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-4 space-y-1.5 text-xs text-slate-soft">
          {item.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-circuit" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <a
            href={item.demoHref ?? "#"}
            className="flex items-center gap-1.5 text-xs font-medium text-signal-light hover:text-circuit"
          >
            <ExternalLink size={13} /> Live Demo
          </a>
          <a
            href={item.githubHref ?? "#"}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-soft hover:text-paper"
          >
            <Github size={13} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
