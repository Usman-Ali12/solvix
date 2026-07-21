import type { Metadata } from "next";
import { Target, Users, TrendingUp } from "lucide-react";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Solvix helps businesses become smarter through modern technology and AI, built around long-term partnerships and measurable results.",
};

const values = [
  {
    icon: Target,
    title: "Outcomes over output",
    description:
      "We don't measure success by how many pages we shipped. We measure it by whether your phone rings more and your inbox works harder for you.",
  },
  {
    icon: Users,
    title: "Long-term partnerships",
    description:
      "We'd rather grow with a handful of businesses over years than churn through one-off projects. Most of our work continues well past launch.",
  },
  {
    icon: TrendingUp,
    title: "Measurable results",
    description:
      "Every project is judged against a number — more leads, fewer missed calls, less admin time. If it doesn't move a number, we don't build it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-20 pt-40 md:pt-48">
        <div className="container-solvix max-w-2xl">
          <p className="eyebrow">About Solvix</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            Helping businesses become smarter through AI.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-soft md:text-base">
            Solvix started from a simple observation: most small and
            mid-sized businesses are still running on tools and websites that
            were outdated the day they launched, while their customers have
            moved on to expecting instant, effortless experiences.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-line bg-void-soft py-20">
        <div className="container-solvix grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-balance text-paper md:text-3xl">
              Modern technology shouldn't be reserved for companies with
              in-house engineering teams.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-slate-soft">
            We built Solvix to close that gap — bringing the same caliber of
            website, AI chatbot, and automation that large companies pay
            engineering teams for, to the dental clinics, gyms, restaurants,
            and law firms that make up most of the economy. No bloated
            retainers, no jargon, no six-month timelines. Just systems that
            work from week one and keep working as you grow.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-solvix">
          <p className="eyebrow">What we believe</p>
          <h2 className="mt-4 max-w-lg font-display text-2xl font-semibold text-balance text-paper md:text-3xl">
            Three principles behind every project we take on.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={i * 100}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal/10 text-circuit">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-paper">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-soft">
                    {v.description}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-line bg-void-soft py-20">
        <div className="container-solvix flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-signal/15 font-display text-xl font-semibold text-circuit">
            U
          </div>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/90">
            "I started Solvix because I kept seeing the same story — great
            businesses held back by websites and workflows that hadn't
            caught up to what their customers expect. Our job is to close
            that gap, quietly and reliably."
          </p>
          <p className="mt-4 font-display text-sm font-semibold text-paper">
            Umair
          </p>
          <p className="text-xs text-slate-soft">Founder, Solvix</p>
          <Button href="/contact" variant="primary" className="mt-8">
            Start a conversation
          </Button>
        </div>
      </section>

      <CTASection />
    </>
  );
}
