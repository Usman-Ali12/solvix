import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import Button from "@/components/Button";
import ScrollReveal from "@/components/ScrollReveal";
import FAQ, { FAQItem } from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for websites, AI chatbots, automation, and CSR dispatch — no hidden fees.",
};

const plans = [
  {
    name: "Starter",
    price: "$149",
    period: "/month",
    setup: "$400 one-time setup",
    description: "A polished website that gets your business online properly.",
    features: [
      "Custom 5-page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "1 round of monthly content updates",
    ],
    cta: "Start with Starter",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$249",
    period: "/month",
    setup: "$600 one-time setup",
    description: "For businesses ready to automate lead capture and follow-up.",
    features: [
      "Everything in Starter",
      "AI chatbot (trained on your business)",
      "Appointment booking system",
      "Automated review requests",
      "Monthly performance report",
    ],
    cta: "Start with Growth",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$399",
    period: "/month",
    setup: "$900 one-time setup",
    description: "Full automation for businesses with real workflow complexity.",
    features: [
      "Everything in Growth",
      "Multi-step workflow automation",
      "CRM / calendar integrations",
      "Priority support (same-day response)",
      "Quarterly strategy call",
    ],
    cta: "Start with Pro",
    highlighted: false,
  },
];

const dispatchPlan = {
  name: "Dispatch Pro",
  price: "$449",
  period: "/month",
  setup: "$900 one-time setup",
  description:
    "Built specifically for field service and trade businesses: HVAC, plumbing, electrical, and similar. Includes everything in Pro, plus:",
  features: [
    "AI CSR that answers every call, 24/7",
    "Automatic technician routing & dispatch",
    "Real-time customer ETA updates",
    "Job status tracking dashboard",
  ],
};

const comparisonRows = [
  { feature: "Custom website", starter: true, growth: true, pro: true },
  { feature: "Mobile responsive", starter: true, growth: true, pro: true },
  { feature: "AI chatbot", starter: false, growth: true, pro: true },
  { feature: "Appointment booking", starter: false, growth: true, pro: true },
  { feature: "Workflow automation", starter: false, growth: false, pro: true },
  { feature: "CRM integrations", starter: false, growth: false, pro: true },
  { feature: "Priority support", starter: false, growth: false, pro: true },
];

const faqs: FAQItem[] = [
  {
    question: "Is there a contract or can I cancel anytime?",
    answer:
      "Plans are month-to-month with no long-term contract. If you'd like to cancel, just give us 30 days' notice.",
  },
  {
    question: "What does the one-time setup fee cover?",
    answer:
      "Design, development, chatbot training on your specific business, and testing before launch. It's a one-time cost — the monthly fee covers hosting, maintenance, and support afterward.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. Most clients start with Starter or Growth and upgrade once they see the chatbot or automation paying off. Upgrades take effect on your next billing cycle.",
  },
  {
    question: "Do you offer custom pricing for larger projects?",
    answer:
      "Yes — if your business needs something beyond these plans (multiple locations, custom integrations, high call volume), reach out and we'll quote it directly.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pb-16 pt-40 md:pt-48">
        <div className="container-solvix max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            Simple pricing, no surprises.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-soft md:text-base">
            Every plan includes a real website built for your business — pick
            based on how much of the busywork you want automated away.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-solvix grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  plan.highlighted
                    ? "border-signal bg-void-soft shadow-[0_0_0_1px_rgba(59,91,255,0.3),0_20px_60px_rgba(59,91,255,0.15)]"
                    : "border-slate-line bg-void-soft"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-paper">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-slate-soft">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-paper">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-soft">{plan.period}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-soft">{plan.setup}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-paper/90">
                      <Check size={15} className="mt-0.5 shrink-0 text-circuit" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant={plan.highlighted ? "primary" : "ghost"}
                  showArrow={false}
                  className="mt-7 w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Dispatch Pro highlight */}
      <section className="border-y border-slate-line bg-void-soft py-20">
        <div className="container-solvix">
          <ScrollReveal>
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 rounded-2xl border border-slate-line bg-void p-8 md:flex-row md:items-center md:p-10">
              <div className="flex-1">
                <span className="rounded-full bg-circuit/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-circuit">
                  For field service & trades
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-paper">
                  {dispatchPlan.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-soft">
                  {dispatchPlan.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {dispatchPlan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-paper/90">
                      <Check size={15} className="mt-0.5 shrink-0 text-circuit" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-4 md:items-end md:text-right">
                <div>
                  <span className="font-display text-3xl font-semibold text-paper">
                    {dispatchPlan.price}
                  </span>
                  <span className="text-sm text-slate-soft">{dispatchPlan.period}</span>
                  <p className="font-mono text-xs text-slate-soft">{dispatchPlan.setup}</p>
                </div>
                <Button href="/contact" variant="primary" showArrow={false}>
                  Ask about Dispatch Pro
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 md:py-28">
        <div className="container-solvix">
          <ScrollReveal>
            <p className="eyebrow text-center">Compare plans</p>
            <h2 className="mx-auto mt-3 max-w-md text-center font-display text-2xl font-semibold text-balance text-paper md:text-3xl">
              What's included at each level.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-line">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-line bg-void-soft">
                    <th className="px-5 py-4 font-medium text-slate-soft">Feature</th>
                    <th className="px-5 py-4 text-center font-medium text-paper">Starter</th>
                    <th className="px-5 py-4 text-center font-medium text-paper">Growth</th>
                    <th className="px-5 py-4 text-center font-medium text-paper">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-slate-line last:border-0">
                      <td className="px-5 py-4 text-slate-soft">{row.feature}</td>
                      <td className="px-5 py-4 text-center">
                        {row.starter ? (
                          <Check size={16} className="mx-auto text-circuit" />
                        ) : (
                          <Minus size={16} className="mx-auto text-slate-line" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.growth ? (
                          <Check size={16} className="mx-auto text-circuit" />
                        ) : (
                          <Minus size={16} className="mx-auto text-slate-line" />
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.pro ? (
                          <Check size={16} className="mx-auto text-circuit" />
                        ) : (
                          <Minus size={16} className="mx-auto text-slate-line" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-slate-line py-20 md:py-28">
        <div className="container-solvix grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
          <ScrollReveal>
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-paper">
                Pricing questions, answered.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQ items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
