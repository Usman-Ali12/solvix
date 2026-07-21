import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Phone, Sparkles } from "lucide-react";
import { templates, getTemplate } from "@/lib/templates";
import Button from "@/components/Button";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const t = getTemplate(params.slug);
  if (!t) return {};
  return {
    title: `${t.businessName} — Preview`,
    description: `A Solvix preview site for ${t.niche} businesses.`,
  };
}

export default function PreviewSitePage({
  params,
}: {
  params: { slug: string };
}) {
  const t = getTemplate(params.slug);
  if (!t) notFound();

  return (
    <div className="min-h-screen bg-void">
      {/* Solvix preview banner — sits above the fictional site */}
      <div className="sticky top-0 z-50 border-b border-slate-line bg-void/95 backdrop-blur">
        <div className="container-solvix flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/previews"
              className="flex items-center gap-1.5 text-xs text-slate-soft hover:text-paper"
            >
              <ArrowLeft size={13} /> All previews
            </Link>
            <span className="hidden h-4 w-px bg-slate-line sm:block" />
            <span className="hidden items-center gap-1.5 font-mono text-[11px] text-circuit sm:flex">
              <Sparkles size={11} /> Solvix preview · {t.niche} · fictional example
            </span>
          </div>
          <Button href="/contact" variant="primary" showArrow={false} className="!px-4 !py-2 !text-xs">
            This could be your site
          </Button>
        </div>
      </div>

      {/* --- Fictional site content starts here --- */}
      <section className={`relative overflow-hidden bg-gradient-to-br px-6 py-20 md:py-28 ${t.accent}`}>
        <div className="grid-fade absolute inset-0" />
        <div className="container-solvix relative flex flex-col items-center text-center">
          <span className="eyebrow rounded-full border border-slate-line bg-void/40 px-4 py-1.5 backdrop-blur">
            {t.niche}
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            {t.heroLine}
          </h1>
          <p className="mt-4 max-w-lg text-[15px] text-slate-soft md:text-base">
            {t.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-white">
              <Phone size={14} /> Book now
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-line px-6 py-3 text-sm font-medium text-paper">
              Learn more
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-line bg-void-soft py-10">
        <div className="container-solvix grid grid-cols-3 gap-6 text-center">
          {t.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-semibold text-paper md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-slate-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-solvix">
          <p className="eyebrow text-center">What we offer</p>
          <h2 className="mx-auto mt-3 max-w-md text-center font-display text-2xl font-semibold text-paper md:text-3xl">
            Built around what {t.businessName.split(" ")[0]}'s customers actually need.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-line bg-void-soft p-6"
              >
                <h3 className="font-display text-base font-semibold text-paper">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-soft">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-line bg-void-soft py-16">
        <div className="container-solvix flex flex-col items-center text-center">
          <div className="flex gap-1 text-circuit">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-paper/90">
            "{t.testimonial.quote}"
          </p>
          <p className="mt-3 text-xs text-slate-soft">{t.testimonial.name}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-solvix flex flex-col items-center rounded-2xl border border-slate-line bg-void-soft px-8 py-14 text-center">
          <p className="eyebrow">Like what you see?</p>
          <h2 className="mt-4 max-w-lg font-display text-2xl font-semibold text-balance text-paper md:text-3xl">
            This exact template can be customized and live for your business
            in a matter of days.
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              Talk to our team
            </Button>
            <Button href="/previews" variant="ghost" showArrow={false}>
              See other previews
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
