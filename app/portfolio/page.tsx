import type { Metadata } from "next";
import PortfolioCard, { PortfolioItem } from "@/components/PortfolioCard";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Websites and AI systems Solvix has built for clinics, restaurants, gyms, real estate agencies, and law firms.",
};

const projects: PortfolioItem[] = [
  {
    title: "Dental Clinic Website + AI Chatbot",
    category: "Healthcare",
    description:
      "A calm, trust-first website paired with an AI chatbot that handles insurance questions, appointment booking, and after-hours inquiries.",
    tech: ["Next.js", "Tailwind CSS", "OpenAI API", "Framer Motion"],
    features: [
      "24/7 AI appointment booking",
      "Insurance & procedure FAQ automation",
      "New patient intake form",
      "Mobile-first design",
    ],
    gradient: "bg-gradient-to-br from-signal/40 to-circuit/20",
  },
  {
    title: "Restaurant Website",
    category: "Hospitality",
    description:
      "A visually rich site with an interactive menu, table reservation flow, and integration with delivery platforms.",
    tech: ["React", "Node.js", "Stripe"],
    features: [
      "Online reservation system",
      "Dynamic seasonal menu",
      "Delivery platform integration",
      "Event & catering inquiries",
    ],
    gradient: "bg-gradient-to-br from-circuit/30 to-signal-dim/30",
  },
  {
    title: "IronForge Gym Website",
    category: "Fitness",
    description:
      "A high-energy membership site with automated trial sign-ups, class scheduling, and progress-focused messaging.",
    tech: ["HTML/CSS/JS", "PHP", "MySQL"],
    features: [
      "Class booking automation",
      "Membership sign-up funnels",
      "Trainer profile pages",
      "Trial-to-member conversion flow",
    ],
    gradient: "bg-gradient-to-br from-signal/30 to-circuit/30",
  },
  {
    title: "Real Estate Agency Website",
    category: "Property",
    description:
      "A listings-driven website with an AI assistant that pre-qualifies buyers before they reach an agent.",
    tech: ["Next.js", "Framer Motion", "CRM Sync"],
    features: [
      "AI buyer pre-qualification",
      "Instant new-listing alerts",
      "Mortgage calculator",
      "Agent contact automation",
    ],
    gradient: "bg-gradient-to-br from-signal-dim/50 to-circuit/10",
  },
  {
    title: "Law Firm Website",
    category: "Legal",
    description:
      "An authoritative, credibility-first site with a confidential intake chatbot for prospective clients.",
    tech: ["Next.js", "Tailwind CSS", "OpenAI API"],
    features: [
      "Confidential AI intake chatbot",
      "Practice area breakdowns",
      "Case result highlights",
      "Consultation request automation",
    ],
    gradient: "bg-gradient-to-br from-circuit/20 to-signal/40",
  },
  {
    title: "NetCore Enterprise Dashboard",
    category: "Internal Tools",
    description:
      "A self-contained office network management dashboard built for internal operations visibility.",
    tech: ["HTML", "JavaScript", "Chart.js"],
    features: [
      "Live network monitoring",
      "Role-based access views",
      "Alert & incident logging",
      "Exportable reports",
    ],
    gradient: "bg-gradient-to-br from-signal/40 to-signal-dim/20",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="pb-16 pt-40 md:pt-48">
        <div className="container-solvix max-w-2xl">
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            Real systems, built for real businesses.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-soft md:text-base">
            A selection of the websites and AI systems we've shipped. Every
            project starts from the same question: what will actually move
            the needle for this business?
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-solvix grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={(i % 3) * 100}>
              <PortfolioCard item={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
