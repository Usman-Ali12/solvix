import Reveal from "./Reveal";

const STEPS = [
  { num: "01", name: "Discover", desc: "We map how your business actually runs, not how the org chart says it does." },
  { num: "02", name: "Build", desc: "Websites, bots, and workflows get built in weeks, not quarters." },
  { num: "03", name: "Automate", desc: "Systems get wired together so information moves without manual handoffs." },
  { num: "04", name: "Launch", desc: "You get something that keeps working after we leave the room." },
] as const;

export default function Process() {
  return (
    <section className="process-section section-pad" id="process">
      <div className="wrap">
        <Reveal className="section-label" as="div">
          <span className="num">02</span>
          <span className="rule" />
          <span className="label-text">How it runs</span>
        </Reveal>
        <div className="process-list">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} as="div" className="process-row" delay={i > 0 ? ((Math.min(i, 3)) as 1 | 2 | 3) : undefined}>
              <div className="process-num">{s.num}</div>
              <div className="process-name">{s.name}</div>
              <div className="process-desc">{s.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
