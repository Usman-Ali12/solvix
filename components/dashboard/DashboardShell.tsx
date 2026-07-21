"use client";

import Link from "next/link";
import { LucideIcon, PanelLeftClose, PanelLeft, LogOut } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export default function DashboardShell({
  product,
  role,
  navItems,
  active,
  onSelect,
  children,
  userInitials = "SV",
  userName = "Solvix User",
  userEmail,
  onLogout,
}: {
  product: string;
  role: string;
  navItems: NavItem[];
  active: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
  userInitials?: string;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-void">
      {/* Sidebar */}
      <aside
        className={clsx(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-line bg-void-soft transition-all duration-300 md:flex",
          collapsed ? "w-[76px]" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-line px-5">
          {!collapsed && (
            <Link href="/" className="font-display text-base font-semibold text-paper">
              Solvix
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            className="text-slate-soft hover:text-paper"
          >
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {!collapsed && (
          <div className="border-b border-slate-line px-5 py-3">
            <span className="rounded-full bg-signal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-circuit">
              {role}
            </span>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-signal/15 text-paper"
                    : "text-slate-soft hover:bg-void-dim hover:text-paper",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon size={17} className={isActive ? "text-circuit" : ""} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-line p-4">
          <div className={clsx("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-xs text-circuit">
              {userInitials}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-paper">{userName}</p>
                <p className="truncate text-xs text-slate-soft">
                  {userEmail ?? product}
                </p>
              </div>
            )}
            {!collapsed && onLogout && (
              <button
                onClick={onLogout}
                aria-label="Log out"
                title="Log out"
                className="shrink-0 rounded-lg p-1.5 text-slate-soft transition-colors hover:bg-void-dim hover:text-paper"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-line bg-void/90 px-6 backdrop-blur">
          <div>
            <p className="font-display text-sm font-semibold text-paper md:text-base">
              {navItems.find((n) => n.id === active)?.label ?? "Overview"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 rounded-full border border-slate-line px-3 py-1.5 text-xs text-slate-soft transition-colors hover:border-circuit hover:text-circuit md:hidden"
              >
                <LogOut size={13} />
                Log out
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}

