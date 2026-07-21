import Link from "next/link";
import { Mail, MessageCircle, Linkedin, Instagram } from "lucide-react";
import Logo from "@/components/Logo";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services#websites", label: "Business Websites" },
      { href: "/services#chatbots", label: "AI Chatbots" },
      { href: "/services#automation", label: "AI Automation" },
      { href: "/services#landing", label: "Landing Pages" },
      { href: "/services#workflow", label: "Workflow Automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/pricing", label: "Pricing" },
      { href: "/previews", label: "Live Previews" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-line bg-void">
      <div className="container-solvix grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <Logo size={52} />
            <div className="leading-none">
              <span className="block font-display text-xl font-semibold text-paper">
                Sol<span className="bg-gradient-to-r from-signal-light to-circuit bg-clip-text text-transparent">vix</span>
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-soft">
                Solutions
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-soft">
            We help businesses generate more leads, automate customer
            support, and save time using AI — without the agency overhead.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="mailto:hello@solvix.ai"
              aria-label="Email Solvix"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-line text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://wa.me/10000000000"
              aria-label="Message Solvix on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-line text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="#"
              aria-label="Solvix on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-line text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              aria-label="Solvix on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-line text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow">{col.title}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-soft transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="eyebrow">Get in touch</h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-soft">
            <li>hello@solvix.ai</li>
            <li>Karachi, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="container-solvix flex flex-col items-center justify-between gap-4 border-t border-slate-line py-6 text-xs text-slate-soft md:flex-row">
        <span>© {new Date().getFullYear()} Solvix. All rights reserved.</span>
        <span className="font-mono">Built with Next.js &amp; care.</span>
      </div>
    </footer>
  );
}
