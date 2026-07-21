"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import clsx from "clsx";

const options = [
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "system", icon: Monitor, label: "System theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render nothing meaningful until client mounts
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-slate-line bg-void-soft p-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = mounted && theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            aria-label={opt.label}
            aria-pressed={active}
            className={clsx(
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
              active
                ? "bg-signal text-white"
                : "text-slate-soft hover:text-paper"
            )}
          >
            <Icon size={13} />
          </button>
        );
      })}
    </div>
  );
}
