type LogoProps = {
  size?: number;
  className?: string;
  variant?: "solid" | "outline";
  gradientId?: string;
  animated?: boolean;
};

/**
 * Solvix Solutions mark — infinity loop merging into an upward arrow.
 * `variant="outline"` renders a dim, single-color version (used as the base
 * layer under the loading-screen fill animation). `variant="solid"` renders
 * the full blue-to-cyan gradient version used everywhere else.
 * `animated` draws the mark in like a pen stroke on mount, then settles
 * into a slow ambient glow — a small, deliberately hand-crafted touch
 * rather than a static, dropped-in icon.
 */
export default function Logo({
  size = 32,
  className = "",
  variant = "solid",
  gradientId = "solvix-mark-gradient",
  animated = true,
}: LogoProps) {
  const stroke =
    variant === "solid" ? `url(#${gradientId})` : "currentColor";

  const drawClass = animated
    ? "[stroke-dasharray:420] animate-logo-draw"
    : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`${animated ? "animate-glow-pulse" : ""} ${className}`}
      aria-hidden="true"
    >
      {variant === "solid" && (
        <defs>
          <linearGradient id={gradientId} x1="10" y1="75" x2="92" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B5BFF" />
            <stop offset="55%" stopColor="#33C4E6" />
            <stop offset="100%" stopColor="#33E6D8" />
          </linearGradient>
        </defs>
      )}

      {/* Left loop (closed) */}
      <path
        className={drawClass}
        d="M52 52 C46 40 30 38 20 48 C10 58 14 74 28 76 C40 78 50 70 52 58"
        stroke={stroke}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right loop, opening into the arrow tail */}
      <path
        className={drawClass}
        d="M48 48 C54 38 70 36 80 46 C90 56 86 72 72 74 C64 75 58 70 55 63"
        stroke={stroke}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow tail + head */}
      <path className={drawClass} d="M78 44 L89 22" stroke={stroke} strokeWidth="10" strokeLinecap="round" fill="none" />
      <polygon points="96,11 95,27 83,20" fill={stroke} />
    </svg>
  );
}
