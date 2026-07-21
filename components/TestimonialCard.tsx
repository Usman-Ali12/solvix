export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-line bg-void-soft p-7">
      <p className="text-[15px] leading-relaxed text-paper/90">“{t.quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/15 font-mono text-xs text-circuit">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-paper">{t.name}</p>
          <p className="text-xs text-slate-soft">{t.role}</p>
        </div>
      </div>
    </div>
  );
}
