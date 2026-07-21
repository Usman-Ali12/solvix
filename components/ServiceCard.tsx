import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import clsx from "clsx";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  id?: string;
  badge?: string;
  size?: "lg" | "md" | "sm";
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  id,
  badge,
  size = "sm",
}: ServiceCardProps) {
  const featured = size === "lg";

  return (
    <Link
      id={id}
      href={href}
      className={clsx(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.1rem] border border-slate-line bg-void-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-void-dim",
        featured && "border-accent/20 bg-void-soft"
      )}
    >
      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              "flex items-center justify-center transition-colors",
              featured
                ? "h-14 w-14 rounded-[0.9rem] border border-slate-line bg-void-dim text-accent"
                : "h-9 w-9 rounded-full text-accent"
            )}
          >
            <Icon size={featured ? 24 : 18} />
          </div>
          {badge && (
            <span className="rounded-full border border-slate-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-soft">
              {badge}
            </span>
          )}
        </div>
        <h3
          className={clsx(
            "mt-5 font-display font-semibold text-paper",
            featured ? "text-2xl md:text-3xl" : "text-lg"
          )}
        >
          {title}
        </h3>
        <p
          className={clsx(
            "mt-2.5 leading-relaxed text-slate-soft",
            featured ? "max-w-sm text-sm md:text-base" : "text-sm"
          )}
        >
          {description}
        </p>
      </div>
      <div className="relative mt-6 flex items-center gap-1.5 text-sm font-medium text-accent">
        Learn more
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

