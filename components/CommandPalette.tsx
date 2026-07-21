"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  Layers,
  Image as ImageIcon,
  Users,
  Mail,
  LayoutDashboard,
  ShieldCheck,
  Tag,
  CornerDownLeft,
} from "lucide-react";
import { templates } from "@/lib/templates";

type Entry = {
  label: string;
  href: string;
  icon: typeof Home;
  group: string;
  keywords?: string;
};

const staticEntries: Entry[] = [
  { label: "Home", href: "/", icon: Home, group: "Pages" },
  { label: "Services", href: "/services", icon: Layers, group: "Pages" },
  { label: "Pricing", href: "/pricing", icon: Tag, group: "Pages" },
  { label: "Live Previews", href: "/previews", icon: ImageIcon, group: "Pages" },
  { label: "Portfolio", href: "/portfolio", icon: ImageIcon, group: "Pages" },
  { label: "About", href: "/about", icon: Users, group: "Pages" },
  { label: "Contact", href: "/contact", icon: Mail, group: "Pages" },
  { label: "Client Dashboard", href: "/dashboard", icon: LayoutDashboard, group: "Product" },
  { label: "Admin Dashboard", href: "/admin", icon: ShieldCheck, group: "Product" },
];

const previewEntries: Entry[] = templates.map((t) => ({
  label: `${t.businessName} preview`,
  href: `/previews/${t.slug}`,
  icon: ImageIcon,
  group: "Previews",
  keywords: t.niche,
}));

const allEntries = [...staticEntries, ...previewEntries];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return allEntries;
    const q = query.toLowerCase();
    return allEntries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.group.toLowerCase().includes(q) ||
        e.keywords?.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function go(href: string) {
    router.push(href);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].href);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-24">
      <div
        className="absolute inset-0 bg-void/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-line bg-void-soft shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-line px-4 py-3.5">
          <Search size={16} className="shrink-0 text-slate-soft" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages, previews..."
            className="flex-1 bg-transparent text-sm text-paper placeholder:text-slate-soft focus:outline-none"
          />
          <kbd className="rounded border border-slate-line px-1.5 py-0.5 font-mono text-[10px] text-slate-soft">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-slate-soft">No matches found.</p>
          )}
          {results.map((entry, i) => {
            const Icon = entry.icon;
            const active = i === activeIndex;
            return (
              <button
                key={entry.href}
                onClick={() => go(entry.href)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  active ? "bg-signal/15 text-paper" : "text-slate-soft"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={15} className={active ? "text-circuit" : ""} />
                  {entry.label}
                </span>
                {active && <CornerDownLeft size={13} className="text-slate-soft" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-slate-line px-4 py-2.5 font-mono text-[10px] text-slate-soft">
          <span>↑↓ to navigate</span>
          <span>↵ to select</span>
        </div>
      </div>
    </div>
  );
}
