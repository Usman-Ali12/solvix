"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through a list of words with a slide+fade transition — the
 * "kinetic typography" pattern used in headline treatments like Linear's.
 * Reserves space for the longest word so layout doesn't shift.
 * Draws a loose, hand-sketched underline beneath it — a small deliberately
 * imperfect touch rather than a machine-straight rule.
 */
export default function KineticWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-grid">
      {/* Invisible longest word reserves width/height so nothing reflows */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <span
        className={`col-start-1 row-start-1 bg-gradient-to-r from-signal-light to-circuit bg-clip-text text-transparent transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {words[index]}
      </span>

      {/* Hand-sketched underline, redraws each time the word changes */}
      <svg
        key={index}
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-2 left-0 col-start-1 row-start-1 h-3 w-full"
        aria-hidden="true"
      >
        <path
          d="M2 7 C 20 9, 35 4, 50 6 S 82 9, 98 5 S 115 4, 118 6"
          stroke="url(#kinetic-underline)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="[stroke-dasharray:150] animate-underline-draw"
        />
        <defs>
          <linearGradient id="kinetic-underline" x1="0" y1="0" x2="120" y2="0">
            <stop offset="0%" stopColor="#3B5BFF" />
            <stop offset="100%" stopColor="#33E6D8" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

