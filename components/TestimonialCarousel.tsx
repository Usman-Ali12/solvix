"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait">
          <motion.div
            key={items[index].name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="border border-slate-line bg-void-soft p-8 md:p-10">
              <p className="text-[15px] leading-relaxed text-paper/90">
                “{items[index].quote}”
              </p>
            </div>
            <div className="border border-slate-line bg-void-dim p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                Placeholder quote
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-soft">
                Replace this placeholder with a real client quote before launch.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 font-mono text-xs text-accent">
                  {items[index].initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-paper">{items[index].name}</p>
                  <p className="text-xs text-slate-soft">{items[index].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          onClick={() => {
            prev();
            resetTimer();
          }}
          aria-label="Previous testimonial"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-line text-slate-soft hover:border-accent hover:text-accent"
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
                i === index ? "w-5 bg-accent" : "w-1.5 bg-slate-line"
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
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-line text-slate-soft hover:border-accent hover:text-accent"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
