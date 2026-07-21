import type { Metadata } from "next";
import { templates } from "@/lib/templates";
import PreviewCard from "@/components/preview/PreviewCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Live Previews",
  description:
    "Browse real, clickable website previews across industries — see what Solvix can build for your business before you commit.",
};

export default function PreviewsPage() {
  return (
    <>
      <section className="pb-16 pt-40 md:pt-48">
        <div className="container-solvix max-w-2xl">
          <p className="eyebrow">Live previews</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            See it before you say yes.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-soft md:text-base">
            These are real, clickable preview sites — not screenshots. Pick
            the closest match to your business, click through, and you'll
            have a working starting point on a call with our team the same
            day.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-solvix grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <PreviewCard key={t.slug} t={t} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
