"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  Bot,
  CalendarCheck,
  Workflow,
  Receipt,
  LifeBuoy,
  Users,
  MessageSquare,
  Percent,
  Activity,
  Check,
  Download,
} from "lucide-react";
import DashboardShell, { NavItem } from "@/components/dashboard/DashboardShell";
import StatCard from "@/components/dashboard/StatCard";
import Badge from "@/components/dashboard/Badge";
import TrendChart, { ChartPoint } from "@/components/dashboard/TrendChart";
import { createClient } from "@/lib/supabase/client";

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "leads", label: "Chatbot Leads", icon: Bot },
  { id: "appointments", label: "Appointments", icon: CalendarCheck },
  { id: "automations", label: "Automations", icon: Workflow },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "support", label: "Support", icon: LifeBuoy },
];

const leadsTrend: ChartPoint[] = [
  { label: "Mon", value: 4 },
  { label: "Tue", value: 7 },
  { label: "Wed", value: 5 },
  { label: "Thu", value: 9 },
  { label: "Fri", value: 12 },
  { label: "Sat", value: 8 },
  { label: "Sun", value: 6 },
];

const leads = [
  { name: "Sarah Malik", contact: "sarah.m@email.com", inquiry: "Pricing for family checkup", source: "Chatbot", date: "Jul 11", status: "New" as const },
  { name: "Ahmed Raza", contact: "+92 300 1234567", inquiry: "Insurance coverage question", source: "Chatbot", date: "Jul 11", status: "Contacted" as const },
  { name: "Emily Chen", contact: "emily.c@email.com", inquiry: "Booking a consultation", source: "Website form", date: "Jul 10", status: "Booked" as const },
  { name: "Bilal Khan", contact: "bilal.k@email.com", inquiry: "Same-day appointment availability", source: "Chatbot", date: "Jul 10", status: "New" as const },
  { name: "Fatima Noor", contact: "+92 321 9988776", inquiry: "General inquiry about services", source: "Chatbot", date: "Jul 9", status: "Contacted" as const },
];

const statusColor: Record<string, "blue" | "green" | "gray"> = {
  New: "blue",
  Contacted: "gray",
  Booked: "green",
};

const appointments = [
  { name: "Sarah Malik", service: "Consultation", time: "Today · 3:00 PM", status: "Confirmed" as const },
  { name: "Bilal Khan", service: "Follow-up visit", time: "Today · 5:30 PM", status: "Confirmed" as const },
  { name: "Emily Chen", service: "New patient intake", time: "Tomorrow · 10:00 AM", status: "Pending" as const },
  { name: "Ahmed Raza", service: "Consultation", time: "Jul 14 · 1:00 PM", status: "Confirmed" as const },
];

const automations = [
  { name: "AI Chatbot — Lead Capture", description: "Answers FAQs and books consultations 24/7.", active: true },
  { name: "Appointment Reminders", description: "SMS + email reminders sent 24h before each booking.", active: true },
  { name: "Review Request Follow-up", description: "Requests a Google review 2 days after a completed visit.", active: true },
  { name: "No-show Re-engagement", description: "Automatically reaches out to reschedule missed appointments.", active: false },
];

const invoices = [
  { id: "INV-0042", date: "Jul 1, 2026", amount: "$249.00", status: "Paid" as const },
  { id: "INV-0038", date: "Jun 1, 2026", amount: "$249.00", status: "Paid" as const },
  { id: "INV-0031", date: "May 1, 2026", amount: "$249.00", status: "Paid" as const },
];

export default function ClientDashboard() {
  const [active, setActive] = useState("overview");
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userName, setUserName] = useState("Dental Clinic Karachi");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email ?? undefined);
        const name = data.user.user_metadata?.business_name || data.user.user_metadata?.full_name;
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
      product="Client Portal"
      role="Client Account"
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
            <StatCard label="Website visitors (30d)" value="4,182" delta="+12.4%" icon={Users} />
            <StatCard label="Leads captured (30d)" value="87" delta="+8.1%" icon={MessageSquare} />
            <StatCard label="Chatbot conversion rate" value="21.6%" delta="+2.3%" icon={Percent} />
            <StatCard label="Chatbot uptime" value="99.98%" icon={Activity} />
          </div>

          <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold text-paper">
                  Leads captured this week
                </p>
                <p className="text-xs text-slate-soft">
                  From chatbot conversations and website forms
                </p>
              </div>
            </div>
            <div className="mt-4">
              <TrendChart data={leadsTrend} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
            <p className="font-display text-base font-semibold text-paper">Recent leads</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-line text-xs text-slate-soft">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Inquiry</th>
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 4).map((l) => (
                    <tr key={l.name} className="border-b border-slate-line last:border-0">
                      <td className="py-3 text-paper">{l.name}</td>
                      <td className="py-3 text-slate-soft">{l.inquiry}</td>
                      <td className="py-3 text-slate-soft">{l.source}</td>
                      <td className="py-3">
                        <Badge color={statusColor[l.status]}>{l.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {active === "leads" && (
        <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
          <p className="font-display text-base font-semibold text-paper">All chatbot leads</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-line text-xs text-slate-soft">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Inquiry</th>
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.name} className="border-b border-slate-line last:border-0">
                    <td className="py-3 text-paper">{l.name}</td>
                    <td className="py-3 text-slate-soft">{l.contact}</td>
                    <td className="py-3 text-slate-soft">{l.inquiry}</td>
                    <td className="py-3 text-slate-soft">{l.source}</td>
                    <td className="py-3 text-slate-soft">{l.date}</td>
                    <td className="py-3">
                      <Badge color={statusColor[l.status]}>{l.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {active === "appointments" && (
        <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
          <p className="font-display text-base font-semibold text-paper">Upcoming appointments</p>
          <div className="mt-4 divide-y divide-slate-line">
            {appointments.map((a) => (
              <div key={a.name + a.time} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium text-paper">{a.name}</p>
                  <p className="text-xs text-slate-soft">{a.service}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-slate-soft">{a.time}</span>
                  <Badge color={a.status === "Confirmed" ? "green" : "yellow"}>{a.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === "automations" && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {automations.map((a) => (
            <div key={a.name} className="rounded-2xl border border-slate-line bg-void-soft p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-paper">{a.name}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-soft">
                    {a.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    a.active ? "bg-circuit/15 text-circuit" : "bg-slate-line text-slate-soft"
                  }`}
                >
                  {a.active ? "Active" : "Paused"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {active === "billing" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-soft">Current plan</p>
                <p className="font-display text-lg font-semibold text-paper">Growth Plan</p>
              </div>
              <div>
                <p className="text-xs text-slate-soft">Monthly</p>
                <p className="font-display text-lg font-semibold text-paper">$249.00</p>
              </div>
              <div>
                <p className="text-xs text-slate-soft">Next billing date</p>
                <p className="text-sm text-paper">Aug 1, 2026</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-line bg-void-soft p-6">
            <p className="font-display text-base font-semibold text-paper">Invoice history</p>
            <div className="mt-4 divide-y divide-slate-line">
              {invoices.map((i) => (
                <div key={i.id} className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm text-paper">{i.id}</p>
                    <p className="text-xs text-slate-soft">{i.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-paper">{i.amount}</span>
                    <Badge color="green">
                      <Check size={11} className="mr-1" /> {i.status}
                    </Badge>
                    <button
                      aria-label={`Download ${i.id}`}
                      className="text-slate-soft hover:text-circuit"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {active === "support" && (
        <div className="rounded-2xl border border-slate-line bg-void-soft p-10 text-center">
          <LifeBuoy className="mx-auto text-circuit" size={28} />
          <p className="mt-4 font-display text-lg font-semibold text-paper">
            Need something changed?
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-soft">
            Reach your account team directly — most requests get a same-day
            response.
          </p>
          <a
            href="mailto:info@solvixsolution.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-light"
          >
            Email support
          </a>
        </div>
      )}
    </DashboardShell>
  );
}
