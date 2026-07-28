<<<<<<< HEAD
import dynamic from "next/dynamic";
import { Globe, Bot, Workflow, LayoutTemplate, CalendarCheck, Headset } from "lucide-react";
import Button from "@/components/Button";
import SignalTrace from "@/components/SignalTrace";
import HeroMedia from "@/components/HeroMedia";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard, { PortfolioItem } from "@/components/PortfolioCard";
import type { Testimonial } from "@/components/TestimonialCard";
import type { FAQItem } from "@/components/FAQ";
import KineticWord from "@/components/KineticWord";
import { templates } from "@/lib/templates";
import PreviewCard from "@/components/preview/PreviewCard";
import Counter from "@/components/Counter";
import ScrollReveal from "@/components/ScrollReveal";

const TestimonialCarousel = dynamic(() => import("@/components/TestimonialCarousel"), {
  ssr: false,
  loading: () => <div className="mx-auto max-w-4xl rounded-2xl border border-slate-line bg-void-soft/70 p-10" />,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  ssr: false,
  loading: () => <div className="space-y-3" />,
});

const CTASection = dynamic(() => import("@/components/CTASection"), {
  ssr: false,
  loading: () => <section className="border-t border-slate-line py-24 md:py-32" />,
});

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "A fast, polished site built to convert visitors — not just look good in a portfolio.",
    href: "/services#websites",
    size: "lg" as const,
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description:
      "Answer customer questions and capture leads 24/7, even while you sleep.",
    href: "/services#chatbots",
    size: "md" as const,
    span: "lg:col-span-2",
  },
  {
    icon: Workflow,
    title: "AI Automation",
    description:
      "Connect your tools so quotes, follow-ups, and reminders send themselves.",
    href: "/services#automation",
    size: "sm" as const,
    span: "lg:col-span-1",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    description:
      "High-converting pages for campaigns, launches, and paid ad traffic.",
    href: "/services#landing",
    size: "sm" as const,
    span: "lg:col-span-1",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    description:
      "Let customers book themselves in, synced straight to your calendar.",
    href: "/services#workflow",
    size: "md" as const,
    span: "lg:col-span-2",
  },
  {
    icon: Headset,
    title: "CSR Support & Dispatch",
    description:
      "For trades and field service teams: an AI receptionist that answers every call and routes the right technician to the right job.",
    href: "/services#dispatch",
    size: "md" as const,
    span: "lg:col-span-2",
    badge: "New",
  },
];

const industries = [
  "Dental & Medical Clinics",
  "Restaurants & Cafés",
  "Gyms & Fitness Studios",
  "Real Estate Agencies",
  "Law Firms",
  "Local Service Businesses",
];

const stats = [
  { value: "40+", label: "Projects Delivered" },
  { value: "24/7", label: "AI Support Coverage" },
  { value: "3.2x", label: "Avg. Lead Increase" },
  { value: "<48h", label: "Typical Response Time" },
];

const process = [
  {
    step: "Discover",
    detail:
      "We learn how your business actually runs — where leads drop off, where your time disappears.",
  },
  {
    step: "Design",
    detail:
      "We design a site and system tailored to your brand, not a recycled template.",
  },
  {
    step: "Build",
    detail:
      "We build the website, chatbot, and automations, and test everything against real scenarios.",
  },
  {
    step: "Launch & Support",
    detail:
      "We launch, monitor performance, and keep refining as your business grows.",
  },
];

const portfolioPreview: PortfolioItem[] = [
  {
    title: "Dental Clinic",
    category: "Healthcare · Website + AI Chatbot",
    description:
      "A calming, trust-first site with an AI chatbot that answers insurance questions and books appointments.",
    tech: ["Next.js", "Tailwind", "OpenAI API"],
    features: ["24/7 appointment booking", "Insurance FAQ automation"],
    gradient: "bg-gradient-to-br from-signal/40 to-circuit/20",
  },
  {
    title: "IronForge Gym",
    category: "Fitness · Website + Automation",
    description:
      "A high-energy membership site with automated trial sign-ups and class reminders.",
    tech: ["React", "Node.js", "MySQL"],
    features: ["Class booking automation", "Membership funnels"],
    gradient: "bg-gradient-to-br from-circuit/30 to-signal/30",
  },
  {
    title: "Real Estate Group",
    category: "Property · Website + Lead Capture",
    description:
      "A listings-driven site with AI pre-qualification so agents only speak to serious buyers.",
    tech: ["Next.js", "Framer Motion", "CRM Sync"],
    features: ["AI lead qualification", "Instant listing alerts"],
    gradient: "bg-gradient-to-br from-signal-dim/50 to-circuit/10",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Our booking chatbot handles half our appointment questions now. It feels like we hired a receptionist that never sleeps.",
    name: "Placeholder Client",
    role: "Owner, Dental Clinic",
    initials: "DC",
  },
  {
    quote:
      "The site looks like something a much bigger company would pay ten times more for. Leads picked up within the first week.",
    name: "Placeholder Client",
    role: "Founder, Fitness Studio",
    initials: "FS",
  },
  {
    quote:
      "Solvix didn't just build a website — they mapped out our whole intake process and automated the boring parts.",
    name: "Placeholder Client",
    role: "Partner, Law Firm",
    initials: "LF",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most business websites take 2–4 weeks from kickoff to launch. Adding a chatbot or automation layer typically adds another 1–2 weeks, depending on complexity.",
  },
  {
    question: "Do I need to know anything technical to work with you?",
    answer:
      "No. We handle the technical side entirely and explain everything in plain language. You focus on your business — we'll ask the right questions to build the right system.",
  },
  {
    question: "Can you work with my existing website?",
    answer:
      "Yes. We can add a chatbot or automation layer to an existing site, or rebuild it entirely if it's holding your business back.",
  },
  {
    question: "What does the AI chatbot actually do?",
    answer:
      "It answers common customer questions, qualifies leads, and can book appointments directly into your calendar — all trained on your business's specific information.",
  },
  {
    question: "What's included after launch?",
    answer:
      "Every project includes a support window post-launch, and we offer ongoing maintenance plans if you want us to keep improving the system over time.",
  },
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden pb-24 pt-40 md:pt-48">
        <div className="grid-fade pointer-events-none absolute inset-0 h-full w-full" />
        <SignalTrace
          variant="hero"
          className="pointer-events-none absolute inset-x-0 top-16 h-[380px] w-full opacity-40"
        />
        <div className="container-solvix relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start text-left">
            <div className="animate-fade-up opacity-0 [animation-delay:0.05s]">
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-slate-line px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-circuit" />
                AI Websites &amp; Automation
              </span>
            </div>


            <h1 className="mt-7 max-w-2xl animate-fade-up font-display text-4xl font-semibold leading-[1.08] text-balance text-paper opacity-0 [animation-delay:0.15s] md:text-6xl">
              Turn your website into a
              <span className="block bg-gradient-to-r from-signal-light via-signal to-circuit bg-clip-text text-transparent">
                24/7 growth engine.
              </span>
            </h1>

            <p className="mt-6 max-w-lg animate-fade-up text-[15px] leading-relaxed text-slate-soft opacity-0 [animation-delay:0.25s] md:text-base">
              We design fast, conversion-focused websites and AI systems that
              answer questions, capture leads, and reduce repetitive work —
              without adding complexity to your team.
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-4 opacity-0 [animation-delay:0.35s]">
              <Button href="/contact" variant="primary">
                Book a free consultation
              </Button>
              <Button href="/portfolio" variant="ghost" showArrow={false}>
                Explore case studies
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-soft">
              <span className="rounded-full border border-slate-line bg-void-soft/70 px-3 py-1.5">
                Built for service businesses
              </span>
              <span className="rounded-full border border-slate-line bg-void-soft/70 px-3 py-1.5">
                Fast launch • clear ROI
              </span>
            </div>
          </div>

          <div className="animate-fade-up opacity-0 [animation-delay:0.3s]">
            <HeroMedia />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-line bg-void-soft/80 py-14">
        <div className="container-solvix grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80} className="text-center md:text-left">
              <p className="font-display text-3xl font-semibold text-paper md:text-4xl">
                <Counter value={s.value} />
              </p>
              <p className="mt-1 text-xs text-slate-soft md:text-sm">
                {s.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-24 md:py-32">
        <div className="container-solvix">
          <ScrollReveal className="max-w-xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
              Clear systems that make your business easier to trust, book, and grow.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(180px,auto)] lg:grid-flow-dense">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={(i % 3) * 100} className={s.span}>
                <ServiceCard {...s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-y border-slate-line bg-void-soft py-24">
        <div className="container-solvix">
          <ScrollReveal>
            <p className="eyebrow text-center">Industries we serve</p>
            <h2 className="mx-auto mt-4 max-w-lg text-center font-display text-2xl font-semibold text-balance text-paper md:text-3xl">
              Designed for businesses that depend on trust, timing, and reputation.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-slate-line px-5 py-2.5 text-sm text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
              >
                {ind}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* LIVE PREVIEWS TEASER */}
      <section className="py-24 md:py-32">
        <div className="container-solvix">
          <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">See before you decide</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
                Real, clickable preview sites — not screenshots.
              </h2>
              <p className="mt-3 text-[15px] text-slate-soft">
                Pick the closest match to your business and walk through it
                yourself before we write a line of custom code.
              </p>
            </div>
            <Button href="/previews" variant="ghost" showArrow className="shrink-0">
              Browse all previews
            </Button>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {templates.slice(0, 3).map((t, i) => (
              <ScrollReveal key={t.slug} delay={i * 100}>
                <PreviewCard t={t} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-24 md:py-32">
        <div className="container-solvix">
          <ScrollReveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Recent work</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
                A few systems we've shipped.
              </h2>
            </div>
            <Button href="/portfolio" variant="ghost" showArrow className="shrink-0">
              View full portfolio
            </Button>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {portfolioPreview.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <PortfolioCard item={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-slate-line bg-void-soft py-24 md:py-32">
        <div className="container-solvix">
          <ScrollReveal className="max-w-xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
              A clear process, from first call to launch.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 100} className="relative">
                <span className="font-mono text-xs text-circuit">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-paper">
                  {p.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-soft">
                  {p.detail}
                </p>
                {i < process.length - 1 && (
                  <div className="mt-6 hidden h-px w-full bg-slate-line md:block" />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="container-solvix">
          <ScrollReveal>
            <p className="eyebrow text-center">What clients say</p>
            <h2 className="mx-auto mt-4 max-w-lg text-center font-display text-2xl font-semibold text-balance text-paper md:text-3xl">
              Placeholder testimonials — swap in real quotes at launch.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100} className="mt-14">
            <TestimonialCarousel items={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-line py-24 md:py-32">
        <div className="container-solvix grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
          <ScrollReveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-paper">
              Questions business owners usually ask.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQ items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
=======
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Work from "@/components/Work";
import About from "@/components/About";
import OffsetCards from "@/components/OffsetCards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Work />
      <About />
      <OffsetCards />
      <Contact />
      <Footer />
    </main>
>>>>>>> 3794f29 (Initial commit)
  );
}
