import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-glow" />
      <div className="cta-head">
        <Reveal className="eyebrow eyebrow-center" as="div">
          Get started
        </Reveal>
        <Reveal as="h2" className="display cta-title" delay={1}>
          Let&rsquo;s build something that <span className="accent">runs itself.</span>
        </Reveal>
        <Reveal as="p" className="cta-sub" delay={2}>
          Or email us directly at{" "}
          <a href="mailto:info@solvixsolution.com" className="btn-ghost">
            info@solvixsolution.com
          </a>
        </Reveal>
      </div>
      <ContactForm />
    </section>
  );
}
