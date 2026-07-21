import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo size={56} className="opacity-80" />
      <p className="mt-8 font-mono text-sm text-circuit">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-sm text-[15px] text-slate-soft">
        The page you're looking for doesn't exist or may have moved. Let's
        get you back on track.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary" showArrow={false}>
          <ArrowLeft size={15} /> Back to home
        </Button>
        <Button href="/previews" variant="ghost" showArrow={false}>
          <Search size={15} /> Browse previews
        </Button>
      </div>

      <p className="mt-10 font-mono text-xs text-slate-soft">
        Tip: press{" "}
        <kbd className="rounded border border-slate-line px-1.5 py-0.5">⌘K</kbd>{" "}
        to search anywhere on the site.
      </p>
    </section>
  );
}
