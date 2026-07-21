import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className,
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 font-body";

  const variants = {
    primary:
      "bg-accent text-[#1f1711] hover:bg-[rgb(var(--signal-light))]",
    secondary:
      "bg-void-soft text-paper hover:bg-void-dim",
    ghost:
      "border border-slate-line text-paper hover:border-accent hover:text-accent",
  };

  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
      {showArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
