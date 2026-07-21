"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={clsx(
        "fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-line bg-void-soft text-slate-soft shadow-lg transition-all duration-300 hover:border-circuit hover:text-circuit",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp size={17} />
    </button>
  );
}
