"use client";

import { useState } from "react";

export default function SmileMark() {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      aria-label="BrightSmile Dental Studio"
      aria-pressed={active}
      className={`smile-mark${active ? " smile-active" : ""}`}
      onClick={() => setActive((v) => !v)}
    >
      <svg viewBox="0 0 120 120" fill="none" className="case-brand-mark">
        <circle cx="60" cy="60" r="56" stroke="#3e8ed9" strokeWidth="2" />
        <path
          className="smile-path"
          d="M33 63c7.5 15 18 22.5 27 22.5s19.5-7.5 27-22.5"
          stroke="#0b2b45"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
