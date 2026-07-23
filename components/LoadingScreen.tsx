"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "@/components/Logo";

/**
 * Splash screen. The fill doesn't run on a fixed timer — it climbs quickly
 * toward a ~90% ceiling and *holds* there until the page has genuinely
 * finished loading (window `load` event), then jumps to 100% and fades.
 * Same idea as the progress bar on Linear/YouTube: always visibly making
 * progress, never claims "done" before it's true. A floor time keeps it
 * from feeling like a flash-of-nothing on fast connections.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(4);
  const readyRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setProgress(100);
      const t1 = setTimeout(() => setFading(true), 150);
      const t2 = setTimeout(() => setVisible(false), 550);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    const floorMs = 900; // minimum time the splash stays up, even if load is instant
    const start = performance.now();
    let raf: number;

    // Ease quickly toward 90%, then crawl — never reaches 100 on its own.
    function tick(now: number) {
      const elapsed = now - start;
      const eased = 90 * (1 - Math.exp(-elapsed / 900));
      setProgress((p) => Math.max(p, Math.min(90, eased)));
      if (!readyRef.current) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function finish() {
      readyRef.current = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, floorMs - elapsed);
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setFading(true), 300);
        setTimeout(() => setVisible(false), 700);
      }, wait);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-void transition-opacity duration-[400ms] ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-20 w-20">
        {/* Dim outline base — always fully visible */}
        <Logo size={80} variant="outline" animated={false} className="absolute inset-0 text-slate-line" />
        {/* Gradient fill that climbs bottom-to-top, tracking real progress */}
        <div
          className="absolute inset-0 overflow-hidden transition-[clip-path] duration-150 ease-out"
          style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
        >
          <Logo size={80} variant="solid" animated={false} gradientId="loading-mark-gradient" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-slate-soft">
          Solvix Solutions
        </p>
        <p
          className="font-display text-sm font-medium text-paper opacity-0 animate-fade-up [animation-delay:200ms]"
        >
          We solve what seems unresolved.
        </p>
      </div>
    </div>
  );
}
