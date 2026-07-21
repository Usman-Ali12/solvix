'use client';

import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-line bg-void-soft text-circuit">
        <AlertTriangle size={22} />
      </div>

      <p className="mt-6 font-mono text-sm uppercase tracking-[0.24em] text-circuit">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
        We hit an unexpected issue.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-soft">
        This page failed to render properly. You can try again, or head back home and continue browsing.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#1f1711] transition-colors hover:bg-[rgb(var(--signal-light))]"
        >
          <RotateCcw size={15} />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-line px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
        >
          Go to home
        </Link>
      </div>

      {process.env.NODE_ENV === "development" && error.digest ? (
        <p className="mt-6 font-mono text-xs text-slate-soft">Error ID: {error.digest}</p>
      ) : null}
    </section>
  );
}
