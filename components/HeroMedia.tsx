"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CalendarCheck, PhoneCall, Zap } from "lucide-react";
import clsx from "clsx";

type FeedEvent = {
  id: number;
  icon: typeof MessageSquare;
  label: string;
  detail: string;
};

const EVENTS: Omit<FeedEvent, "id">[] = [
  { icon: MessageSquare, label: "Chatbot answered a pricing question", detail: "0.6s response" },
  { icon: PhoneCall, label: "Missed call auto-texted back", detail: "instant" },
  { icon: CalendarCheck, label: "Appointment booked", detail: "Thu, 2:30pm" },
  { icon: Zap, label: "Lead pushed to your CRM", detail: "0.9s" },
];

/**
 * A live-looking activity console for the hero — replaces the generic
 * "browser chrome + play button" pattern with something that actually shows
 * what Solvix does: real-time capture and automation, not a video placeholder.
 * Entirely CSS/SVG driven — no video asset required.
 */
export default function HeroMedia() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const visible: FeedEvent[] = Array.from({ length: 4 }, (_, i) => {
    const eventIndex = (tick + i) % EVENTS.length;
    return { id: tick + i, ...EVENTS[eventIndex] };
  }).reverse();

  return (
    <div className="relative mx-auto w-full max-w-lg md:max-w-none">
      <div className="relative overflow-hidden rounded-[1.1rem] border border-slate-line bg-void-soft shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
        {/* Console header */}
        <div className="flex items-center justify-between border-b border-slate-line px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-circuit opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
              Live activity
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-soft">solvix.ai</span>
        </div>

        {/* Feed area */}
        <div className="relative flex min-h-[340px] flex-col justify-end gap-2.5 overflow-hidden bg-gradient-to-br from-void-dim via-void-soft to-void-dim p-5">
          <div className="grid-fade absolute inset-0" />

          {/* Headline stat */}
          <div className="relative z-10 mb-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold text-paper">24/7</span>
            <span className="text-sm text-slate-soft">
              your business is answering, booking, and following up — even right now.
            </span>
          </div>

          {/* Animated event feed */}
          <div className="relative z-10 flex flex-col gap-2">
            {visible.map((event, i) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className={clsx(
                    "glass-panel flex items-center gap-3 rounded-[0.9rem] px-4 py-3 transition-all duration-700",
                    i === visible.length - 1
                      ? "animate-fade-up opacity-100"
                      : "opacity-70"
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={14} />
                  </span>
                  <span className="flex-1 truncate text-sm text-paper">{event.label}</span>
                  <span className="shrink-0 font-mono text-[11px] text-slate-soft">
                    {event.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
