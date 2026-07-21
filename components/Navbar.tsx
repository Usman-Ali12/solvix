"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const links = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/previews", label: "Live Previews" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-transparent bg-void/80 backdrop-blur-sm transition-all duration-200">
      <nav className="container-solvix flex h-18 items-center justify-between py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-paper"
        >
          <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Logo size={48} />
          </span>
          <span className="leading-none">
            <span className="block">
              Sol<span className="bg-gradient-to-r from-signal-light to-circuit bg-clip-text text-transparent">vix</span>
            </span>
            <span className="mt-0.5 block font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-slate-soft">
              Solutions
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-soft transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              )
            }
            className="flex items-center gap-2 rounded-full border border-slate-line px-3 py-1.5 text-xs text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
            aria-label="Open quick search"
          >
            <Search size={13} />
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-signal-light hover:shadow-[0_0_0_1px_rgba(59,91,255,0.4),0_8px_24px_rgba(59,91,255,0.3)]"
          >
            Start a project
          </Link>
        </div>

        <button
          className="text-paper lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-line bg-void px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-slate-soft transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-white"
            >
              Start a project
            </Link>
            <div className="mt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
