import Reveal from "./Reveal";

const CARDS = [
  { eyebrow: "Built to last", title: "Systems, not one-off sites", body: "Every build is meant to keep running without a developer on standby, with clear handoffs, documented and yours." },
  { eyebrow: "Direct access", title: "You talk to the people building it", body: "No account managers relaying messages. You work directly with the person writing the code." },
  { eyebrow: "Weeks, not quarters", title: "Shipped fast, on purpose", body: "Small team, focused scope. Projects move from kickoff to launch without months of back-and-forth." },
] as const;

export default function OffsetCards() {
  return (
    <section className="offset-section">
      <div className="wrap">
        <Reveal className="section-label" as="div">
          <span className="num">04</span>
          <span className="rule" />
          <span className="label-text">How we work with you</span>
        </Reveal>
        <div className="offset-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} as="div" className="offset-card" delay={i > 0 ? (i as 1 | 2) : undefined}>
              <div className="card-eyebrow">{c.eyebrow}</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
