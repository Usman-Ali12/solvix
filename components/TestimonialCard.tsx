"use client";

import { motion } from "framer-motion";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent?: string;
};

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="flex h-full flex-col justify-between border border-slate-line bg-void-soft p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
      style={{ transform: t.accent ? `rotate(${t.accent})` : undefined }}
    >
      <p className="text-[15px] leading-relaxed text-paper/90">“{t.quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 font-mono text-xs text-accent">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-paper">{t.name}</p>
          <p className="text-xs text-slate-soft">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
