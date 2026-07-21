"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-slate-line bg-void/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 rounded-full bg-signal py-3 text-sm font-medium text-white"
      >
        <Phone size={15} />
        Book a free consultation
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
