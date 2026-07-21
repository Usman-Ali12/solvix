import type { Metadata } from "next";
import { Globe, Bot, Workflow, LayoutTemplate, CalendarCheck, Headset, Check } from "lucide-react";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business websites, AI chatbots, automation, landing pages, and booking systems built for growing businesses.",
};

const services = [
  {
    id: "websites",
    icon: Globe,
    title: "Business Websites",
    tagline: "The foundation everything else runs on.",
    description:
      "Your website is often the first real impression a customer gets of your business. We design and build sites that load fast, look premium on every device, and are structured to turn visitors into inquiries — not just sit there looking nice.",
    outcomes: [
      "A site that reflects the quality of your actual business",
      "Faster load times mean fewer visitors bouncing before they see you",
      "Clear calls-to-action so visitors know exactly what to do next",
      "Built to rank — proper SEO foundations from day one",
    ],
  },
  {
    id: "chatbots",
    icon: Bot,
    title: "AI Chatbots",
    tagline: "A team member who never clocks out.",
    description:
      "Most customer questions are repetitive — hours, pricing, availability. We build an AI chatbot trained on your business that answers instantly, qualifies leads, and hands off to you only when a human touch is really needed.",
    outcomes: [
      "Instant answers, any time of day, in your brand's voice",
      "Fewer missed leads from after-hours inquiries",
      "Leads pre-qualified before they hit your inbox",
      "Frees up your time (or your staff's) for higher-value work",
    ],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "AI Automation",
    tagline: "The busywork, handled quietly in the background.",
    description:
      "We connect the tools you already use — calendars, forms, CRMs, email — so information flows between them automatically. Follow-ups get sent, records get updated, and nothing falls through the cracks because someone forgot.",
    outcomes: [
      "Automatic follow-ups so leads don't go cold",
      "Fewer manual, repetitive admin tasks",
      "Systems that scale with you, not against you",
      "One source of truth across your tools",
    ],
  },
  {
    id: "landing",
    icon: LayoutTemplate,
    title: "Landing Pages",
    tagline: "Built for one job: converting traffic.",
    description:
      "Running ads or a launch campaign needs a page laser-focused on a single outcome. We design landing pages stripped of distraction, with messaging and layout built around getting the click, the sign-up, or the sale.",
    outcomes: [
      "Higher conversion rate per visitor from paid traffic",
      "Fast to launch and easy to test against each other",
      "Copy and design aligned to a single, clear goal",
      "Mobile-first, since most ad traffic arrives on phones",
    ],
  },
  {
    id: "workflow",
    icon: CalendarCheck,
    title: "Appointment Booking Systems",
    tagline: "Let customers book themselves in.",
    description:
      "Every back-and-forth message to schedule a booking is time you don't get back. We build booking systems that sync straight to your calendar, send reminders automatically, and cut down on no-shows.",
    outcomes: [
      "Customers book in seconds, without calling",
      "Automatic reminders reduce no-shows",
      "Your calendar stays accurate without manual updates",
      "Fewer scheduling conflicts and double-bookings",
    ],
  },
  {
    id: "dispatch",
    icon: Headset,
    title: "CSR Support & Dispatch",
    tagline: "Built for trades and field service teams.",
    description:
      "For HVAC, plumbing, electrical, and other field service businesses, a missed call is a lost job. We build an AI CSR that answers every call instantly, captures the job details, and routes it to the right technician — so nothing slips through while your team is on the road.",
    outcomes: [
      "Every call answered, even nights and weekends",
      "Jobs routed to the nearest available technician automatically",
      "Customers get real-time ETA updates without calling in",
      "Fewer missed jobs, fewer double-booked technicians",
    ],
  },
];

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.description,
      provider: {
        "@type": "Organization",
        name: "Solvix Solutions",
        url: "https://solvix.ai",
      },
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className="pb-16 pt-40 md:pt-48">
        <div className="container-solvix max-w-2xl">
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            Tools built for outcomes, not features.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-soft md:text-base">
            Every service we offer exists to solve one of two problems: get
            you more customers, or give you back your time. Here's how each
            one works.
          </p>
        </div>
      </section>

      {services.map((s, i) => {
        const Icon = s.icon;
        const reversed = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-24 border-t border-slate-line py-20 ${
              reversed ? "bg-void-soft" : ""
            }`}
          >
            <div className="container-solvix grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <ScrollReveal className={reversed ? "md:order-2" : ""}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10 text-circuit">
                  <Icon size={22} />
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-circuit">
                  {s.tagline}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-paper md:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-soft">
                  {s.description}
                </p>
                <Button href="/contact" variant="ghost" className="mt-7">
                  Ask about {s.title.toLowerCase()}
                </Button>
              </ScrollReveal>

              <ScrollReveal
                delay={100}
                className={`rounded-2xl border border-slate-line bg-void-soft p-8 ${reversed ? "md:order-1" : ""}`}
              >
                <p className="eyebrow">Why it matters</p>
                <ul className="mt-5 space-y-4">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm text-paper/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-circuit/15 text-circuit">
                        <Check size={12} />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
