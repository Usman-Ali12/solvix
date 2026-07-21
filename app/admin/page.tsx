"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Target,
  Truck,
  UserCog,
  Briefcase,
  DollarSign,
  Activity,
  Radio,
  Phone,
} from "lucide-react";
import DashboardShell, { NavItem } from "@/components/dashboard/DashboardShell";
import StatCard from "@/components/dashboard/StatCard";
import Badge from "@/components/dashboard/Badge";
import TrendChart, { ChartPoint } from "@/components/dashboard/TrendChart";
import KanbanBoard, { KanbanColumn } from "@/components/dashboard/KanbanBoard";
import { createClient } from "@/lib/supabase/client";

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "clients", label: "Clients", icon: Users },
  { id: "pipeline", label: "Sales Pipeline", icon: Target },
  { id: "dispatch", label: "Dispatch Board", icon: Truck },
  { id: "team", label: "Team", icon: UserCog },
];

const revenueTrend: ChartPoint[] = [
  { label: "Feb", value: 3200 },
  { label: "Mar", value: 4100 },
  { label: "Apr", value: 4600 },
  { label: "May", value: 5300 },
  { label: "Jun", value: 6100 },
  { label: "Jul", value: 6980 },
];

const clients = [
  { name: "Dental Clinic Karachi", plan: "Growth", mrr: "$249", status: "Active" as const, contact: "Dr. Sarah Malik" },
  { name: "IronForge Gym", plan: "Starter", mrr: "$149", status: "Active" as const, contact: "Bilal Khan" },
  { name: "Coastal Real Estate", plan: "Growth", mrr: "$249", status: "Active" as const, contact: "Emily Chen" },
  { name: "Raza & Co. Law", plan: "Pro", mrr: "$399", status: "Active" as const, contact: "Ahmed Raza" },
  { name: "QuickFix HVAC", plan: "Dispatch Pro", mrr: "$449", status: "Onboarding" as const, contact: "Fatima Noor" },
];

const clientStatusColor: Record<string, "green" | "blue" | "gray"> = {
  Active: "green",
  Onboarding: "blue",
  Paused: "gray",
};

const pipelineColumns: KanbanColumn[] = [
  {
    id: "lead",
    title: "New Lead",
    cards: [
      { id: "p1", title: "Metro Plumbing Co.", subtitle: "Referral · Website + Dispatch", meta: "$449/mo est." },
      { id: "p2", title: "Sunrise Pediatrics", subtitle: "Inbound form", meta: "$249/mo est." },
    ],
  },
  {
    id: "contacted",
    title: "Contacted",
    cards: [
      { id: "p3", title: "Falcon Electric", subtitle: "Call booked · Thu 2pm", meta: "$449/mo est." },
    ],
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    cards: [
      { id: "p4", title: "Green Leaf Landscaping", subtitle: "Awaiting response · 3 days", meta: "$249/mo est.", tag: { label: "Follow up", color: "yellow" } },
    ],
  },
  {
    id: "won",
    title: "Won",
    cards: [
      { id: "p5", title: "QuickFix HVAC", subtitle: "Contract signed", meta: "$449/mo", tag: { label: "Won", color: "green" } },
    ],
  },
];

const dispatchColumns: KanbanColumn[] = [
  {
    id: "new",
    title: "New",
    cards: [
      { id: "d1", title: "Burst pipe — Unit 4B", subtitle: "Metro Plumbing Co.", meta: "Called 2 min ago", tag: { label: "Urgent", color: "red" } },
    ],
  },
  {
    id: "assigned",
    title: "Assigned",
    cards: [
      { id: "d2", title: "AC not cooling", subtitle: "QuickFix HVAC · Tech: Zain", meta: "ETA 24 min" },
      { id: "d3", title: "Panel inspection", subtitle: "Falcon Electric · Tech: Omar", meta: "ETA 40 min" },
    ],
  },
  {
    id: "enroute",
    title: "En Route",
    cards: [
      { id: "d4", title: "Water heater install", subtitle: "QuickFix HVAC · Tech: Ali", meta: "5 min away" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [
      { id: "d5", title: "Drain cleaning", subtitle: "Metro Plumbing Co. · Tech: Hassan", meta: "Started 18 min ago" },
    ],
  },
  {
    id: "done",
    title: "Completed",
    cards: [
      { id: "d6", title: "Thermostat replacement", subtitle: "QuickFix HVAC · Tech: Zain", meta: "Closed 10:12 AM", tag: { label: "Paid", color: "green" } },
    ],
  },
];

const team = [
  { name: "Umair", role: "Founder / Sales", status: "Online" as const, note: "3 calls today" },
  { name: "Sales Lead", role: "Sales", status: "Online" as const, note: "5 deals in pipeline" },
  { name: "Zain", role: "HVAC Technician", status: "On job" as const, note: "QuickFix HVAC" },
  { name: "Omar", role: "Electrician", status: "En route" as const, note: "Falcon Electric" },
  { name: "Ali", role: "Plumber", status: "En route" as const, note: "QuickFix HVAC" },
  { name: "Hassan", role: "Plumber", status: "On job" as const, note: "Metro Plumbing Co." },
];

const teamStatusColor: Record<string, "green" | "blue" | "yellow"> = {
  Online: "green",
  "On job": "blue",
  "En route": "yellow",
};

export default function AdminDashboard() {
  const [active, setActive] = useState("overview");
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userName, setUserName] = useState("Umair");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email ?? undefined);
        const name = data.user.user_metadata?.full_name;
        if (name) setUserName(name);
      }
    });
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <DashboardShell
      product="Solvix Admin"
      role="Internal / Admin"
      navItems={navItems}
      active={active}
      onSelect={setActive}
      userName={userName}
      userInitials={userName.slice(0, 2).toUpperCase()}
      userEmail={userEmail}
      onLogout={handleLogout}
    >
      {active === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active clients" value="12" delta="+2 this month" icon={Users} />
            <StatCard label="Monthly recurring revenue" value="$6,980" delta="+14.4%" icon={DollarSign} />
            <StatCard label="Open dispatch jobs" value="6" icon={Truck} />
            <StatCard label="Technicians online" value="4 / 5" icon={Radio} />
          </div>

          <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
            <p className="font-display text-base font-semibold text-paper">MRR growth</p>
            <p className="text-xs text-slate-soft">Last 6 months</p>
            <div className="mt-4">
              <TrendChart data={revenueTrend} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
              <p className="font-display text-base font-semibold text-paper">Live dispatch feed</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={15} className="mt-0.5 shrink-0 text-circuit" />
                  <p className="text-sm text-slate-soft">
                    <span className="text-paper">Metro Plumbing Co.</span> — new call, burst
                    pipe, dispatched to nearest available tech.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Activity size={15} className="mt-0.5 shrink-0 text-circuit" />
                  <p className="text-sm text-slate-soft">
                    <span className="text-paper">QuickFix HVAC</span> — job #4468 marked
                    complete by Zain.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={15} className="mt-0.5 shrink-0 text-circuit" />
                  <p className="text-sm text-slate-soft">
                    <span className="text-paper">Falcon Electric</span> — AI CSR booked a
                    panel inspection for Thursday.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
              <p className="font-display text-base font-semibold text-paper">Pipeline snapshot</p>
              <div className="mt-4 space-y-3">
                {pipelineColumns.map((col) => (
                  <div key={col.id} className="flex items-center justify-between">
                    <span className="text-sm text-slate-soft">{col.title}</span>
                    <span className="font-mono text-sm text-paper">{col.cards.length}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "clients" && (
        <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
          <p className="font-display text-base font-semibold text-paper">All clients</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-line text-xs text-slate-soft">
                  <th className="pb-3 font-medium">Business</th>
                  <th className="pb-3 font-medium">Primary contact</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">MRR</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.name} className="border-b border-slate-line last:border-0">
                    <td className="py-3 text-paper">{c.name}</td>
                    <td className="py-3 text-slate-soft">{c.contact}</td>
                    <td className="py-3 text-slate-soft">{c.plan}</td>
                    <td className="py-3 text-slate-soft">{c.mrr}</td>
                    <td className="py-3">
                      <Badge color={clientStatusColor[c.status]}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {active === "pipeline" && (
        <div>
          <p className="mb-4 text-sm text-slate-soft">
            Drag-and-drop wiring not included yet — this is a static view ready
            to connect to your CRM of choice.
          </p>
          <KanbanBoard columns={pipelineColumns} />
        </div>
      )}

      {active === "dispatch" && (
        <div>
          <p className="mb-4 text-sm text-slate-soft">
            Live jobs routed by the AI CSR, grouped by status. Connect this to
            your dispatch backend to make it real-time.
          </p>
          <KanbanBoard columns={dispatchColumns} />
        </div>
      )}

      {active === "team" && (
        <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
          <p className="font-display text-base font-semibold text-paper">Team status</p>
          <div className="mt-4 divide-y divide-slate-line">
            {team.map((t) => (
              <div key={t.name} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/15 font-mono text-xs text-circuit">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-paper">{t.name}</p>
                    <p className="text-xs text-slate-soft">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-soft">{t.note}</span>
                  <Badge color={teamStatusColor[t.status]}>{t.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
