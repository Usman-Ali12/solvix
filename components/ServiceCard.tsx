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
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-line bg-void-soft p-7 transition-all duration-300 hover:border-signal/50 hover:bg-void-dim",
        featured && "bg-gradient-to-br from-signal/10 via-void-soft to-void-soft"
      )}
    >
      {featured && (
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-signal/15 blur-3xl transition-opacity duration-300 group-hover:opacity-70" />
      )}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              "flex items-center justify-center rounded-xl bg-signal/10 text-circuit transition-colors group-hover:bg-signal/20",
              featured ? "h-14 w-14" : "h-11 w-11"
            )}
          >
            <Icon size={featured ? 26 : 20} />
          </div>
          {badge && (
            <span className="rounded-full bg-circuit/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-circuit">
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
      <div className="relative mt-6 flex items-center gap-1.5 text-sm font-medium text-signal-light">
        Learn more
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

