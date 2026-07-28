"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  delay,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: 1 | 2 | 3;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only hide the element once JS has actually run — if this effect
    // never fires (JS error, disabled JS, etc.) the element just stays
    // at its default visible CSS state instead of getting stuck hidden.
    el.classList.add("pre");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";

  return (
    // @ts-expect-error — dynamic tag with a shared ref is fine here
    <Tag ref={ref} className={`reveal${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
