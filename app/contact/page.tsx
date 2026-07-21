import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin, Linkedin, Instagram } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Solvix to start your website, AI chatbot, or automation project.",
};

export default function ContactPage() {
  return (
    <section className="pb-28 pt-40 md:pt-48">
      <div className="container-solvix">
        <div className="max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance text-paper md:text-5xl">
            Let's build something that works for you.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-soft md:text-base">
            Tell us a bit about your business and what's eating your time.
            We'll reply within 48 hours to set up a free, no-pressure
            consultation.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <a
              href="mailto:hello@solvix.ai"
              className="flex items-center gap-4 rounded-2xl border border-slate-line bg-void-soft p-5 transition-colors hover:border-circuit"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/10 text-circuit">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-paper">Email</p>
                <p className="text-sm text-slate-soft">hello@solvix.ai</p>
              </div>
            </a>

            <a
              href="https://wa.me/10000000000"
              className="flex items-center gap-4 rounded-2xl border border-slate-line bg-void-soft p-5 transition-colors hover:border-circuit"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/10 text-circuit">
                <MessageCircle size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-paper">WhatsApp</p>
                <p className="text-sm text-slate-soft">Chat with us directly</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-line bg-void-soft p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/10 text-circuit">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-paper">Location</p>
                <p className="text-sm text-slate-soft">
                  Karachi, Pakistan — working with clients worldwide
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-line">
              <div className="flex h-48 items-center justify-center bg-void-soft">
                <p className="font-mono text-xs text-slate-soft">
                  [ Google Maps embed placeholder ]
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Solvix on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-line text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="#"
                aria-label="Solvix on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-line text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
