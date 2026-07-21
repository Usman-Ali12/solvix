"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

export type FAQItem = { question: string; answer: string };

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-line border-t border-slate-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-medium text-paper md:text-lg">
                {item.question}
              </span>
              <Plus
                size={18}
                className={clsx(
                  "shrink-0 text-circuit transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            <div
              className={clsx(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              )}
            >
              <p className="overflow-hidden text-sm leading-relaxed text-slate-soft md:text-[15px]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
