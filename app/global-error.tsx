'use client';

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-void text-paper font-body antialiased">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-line bg-void-soft text-circuit">
            <AlertTriangle size={22} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold text-paper md:text-4xl">
            Something went wrong globally.
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-soft">
            The app hit an unexpected runtime issue. Refreshing or returning home should get you back on track.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#1f1711] transition-colors hover:bg-[rgb(var(--signal-light))]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-full border border-slate-line px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Go home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && error.digest ? (
            <p className="mt-6 font-mono text-xs text-slate-soft">Error ID: {error.digest}</p>
          ) : null}
        </section>
      </body>
    </html>
  );
}
