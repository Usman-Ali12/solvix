import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="dark-section" id="about">
      <div className="wrap">
        <Reveal className="eyebrow" as="div">Why Solvix</Reveal>
        <Reveal as="p" className="statement" delay={1}>
          Most agencies pitch the same fifty companies. <em>We go find the ones nobody&rsquo;s called yet.</em>
        </Reveal>
      </div>
    </section>
  );
}
