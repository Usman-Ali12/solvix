"use client";

import { useState } from "react";

export default function Tag({ children }: { children: string }) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      className={`tag-pill${active ? " tag-active" : ""}`}
      onClick={() => setActive((v) => !v)}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
