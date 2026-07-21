"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Fill animation runs ~1.5s; hold briefly, then fade out and unmount.
    const fillDuration = prefersReducedMotion ? 150 : 1500;
    const holdDuration = prefersReducedMotion ? 100 : 350;
    const fadeDuration = 400;

    const fadeTimer = setTimeout(() => setFading(true), fillDuration + holdDuration);
    const removeTimer = setTimeout(
      () => setVisible(false),
      fillDuration + holdDuration + fadeDuration
    );

    // Prevent scroll while the loading screen is up
    document.body.style.overflow = "hidden";
    const cleanup = setTimeout(() => {
      document.body.style.overflow = "";
    }, fillDuration + holdDuration + fadeDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearTimeout(cleanup);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-void transition-opacity duration-[400ms] ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-24 w-24">
        {/* Dim outline base — always fully visible */}
        <Logo size={96} variant="outline" animated={false} className="absolute inset-0 text-slate-line" />
        {/* Gradient fill that animates bottom-to-top over the outline */}
        <Logo
          size={96}
          variant="solid"
          animated={false}
          gradientId="loading-mark-gradient"
          className="absolute inset-0 animate-logo-fill"
        />
      </div>
    </div>
  );
}
