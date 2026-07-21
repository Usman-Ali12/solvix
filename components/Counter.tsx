"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Parses strings like "4,182", "3.2x", "99.98%", "<48h", "40+" into a
 * numeric target plus prefix/suffix, animates the number, then re-applies
 * the original formatting on top of the animated value.
 */
function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: raw, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const target = parseFloat(numStr.replace(/,/g, ""));
  return { prefix, target, suffix, decimals, hasComma: numStr.includes(",") };
}

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(() => {
    const { prefix, decimals, suffix } = parseValue(value);
    return `${prefix}${(0).toFixed(decimals)}${suffix}`;
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const { prefix, target, suffix, decimals, hasComma } = parseValue(value);
          const duration = 1400;
          const startTime = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            const formatted = hasComma
              ? Math.round(current).toLocaleString("en-US")
              : current.toFixed(decimals);
            setDisplay(`${prefix}${formatted}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, started]);

  return <span ref={ref}>{display}</span>;
}
