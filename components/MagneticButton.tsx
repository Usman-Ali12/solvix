"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

export default function MagneticButton({
  children,
  href,
  type,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  const shared = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
  };

  if (href) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} {...shared}>
      {children}
    </button>
  );
}
