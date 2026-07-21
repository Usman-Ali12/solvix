"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/components/TestimonialCard";
import clsx from "clsx";

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length]);

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) {
      prev();
      resetTimer();
    } else if (delta < -50) {
      next();
      resetTimer();
    }
    touchStartX.current = null;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t) => (
            <div key={t.name + t.role} className="w-full shrink-0 px-2">
              <div className="rounded-2xl border border-slate-line bg-void-soft p-8 text-center">
                <p className="text-[15px] leading-relaxed text-paper/90">“{t.quote}”</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/15 font-mono text-xs text-circuit">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-paper">{t.name}</p>
                    <p className="text-xs text-slate-soft">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          onClick={() => {
            prev();
            resetTimer();
          }}
          aria-label="Previous testimonial"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-line text-slate-soft hover:border-circuit hover:text-circuit"
        >
          <ChevronLeft size={15} />
        </button>

        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                resetTimer();
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={clsx(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-5 bg-circuit" : "w-1.5 bg-slate-line"
              )}
            />
          ))}
        </div>

        <button
          onClick={() => {
            next();
            resetTimer();
          }}
          aria-label="Next testimonial"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-line text-slate-soft hover:border-circuit hover:text-circuit"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
