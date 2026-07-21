import Button from "@/components/Button";
import SignalTrace from "@/components/SignalTrace";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-line bg-gradient-to-br from-void-soft via-void-soft to-void py-24">
      <SignalTrace
        variant="horizontal"
        className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-70"
      />
      <div className="container-solvix relative flex flex-col items-center text-center">
        <p className="eyebrow">Let's talk</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-balance text-paper md:text-4xl">
          Ready to make your next inquiry feel effortless?
        </h2>
        <p className="mt-4 max-w-lg text-[15px] text-slate-soft">
          Share what’s slowing you down and we’ll show you where a better
          website, chatbot, or automation can create momentum right away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary">
            Book a free consultation
          </Button>
          <Button href="/portfolio" variant="ghost" showArrow={false}>
            See our work
          </Button>
        </div>
      </div>
    </section>
  );
}
