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
      "bg-signal text-white hover:bg-signal-light hover:shadow-[0_0_0_1px_rgba(59,91,255,0.4),0_8px_30px_rgba(59,91,255,0.35)]",
    secondary:
      "bg-white text-[#0A0E16] hover:bg-white/90",
    ghost:
      "border border-slate-line text-paper hover:border-circuit hover:text-circuit",
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
