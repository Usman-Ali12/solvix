"use client";

/**
 * SignalTrace — Solvix's signature visual element.
 * A circuit-style line that "carries" a pulse of light across the page,
 * representing a business process being picked up, routed through AI,
 * and delivered as an outcome. Used sparingly: hero + section dividers.
 */
export default function SignalTrace({
  className = "",
  variant = "horizontal",
}: {
  className?: string;
  variant?: "horizontal" | "hero";
}) {
  if (variant === "hero") {
    return (
      <svg
        viewBox="0 0 1200 400"
        fill="none"
        className={className}
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M -50 320 L 260 320 L 320 260 L 520 260 L 580 200 L 900 200 L 960 140 L 1250 140"
          stroke="rgb(var(--slate-line))"
          strokeWidth="1.5"
        />
        <path
          d="M -50 320 L 260 320 L 320 260 L 520 260 L 580 200 L 900 200 L 960 140 L 1250 140"
          stroke="url(#trace-gradient)"
          strokeWidth="2"
          strokeDasharray="14 900"
          className="animate-trace"
        />
        <circle cx="320" cy="260" r="3" fill="rgb(var(--circuit))" opacity="0.6" />
        <circle cx="580" cy="200" r="3" fill="rgb(var(--circuit))" opacity="0.6" />
        <circle cx="960" cy="140" r="3" fill="rgb(var(--circuit))" opacity="0.6" />
        <defs>
          <linearGradient id="trace-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#33E6D8" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1200 60"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M 0 30 L 1200 30" stroke="rgb(var(--slate-line))" strokeWidth="1" />
      <path
        d="M 0 30 L 1200 30"
        stroke="url(#trace-gradient-2)"
        strokeWidth="1.5"
        strokeDasharray="8 500"
        className="animate-trace"
      />
      <defs>
        <linearGradient id="trace-gradient-2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#33E6D8" stopOpacity="1" />
          <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
