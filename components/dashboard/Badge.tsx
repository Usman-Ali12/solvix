import clsx from "clsx";

const styles: Record<string, string> = {
  green: "bg-circuit/15 text-circuit",
  blue: "bg-signal/15 text-signal-light",
  yellow: "bg-amber-400/15 text-amber-400",
  red: "bg-red-400/15 text-red-400",
  gray: "bg-slate-line text-slate-soft",
};

export default function Badge({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: keyof typeof styles;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        styles[color]
      )}
    >
      {children}
    </span>
  );
}
