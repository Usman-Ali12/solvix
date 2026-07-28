import Reveal from "./Reveal";
import Tag from "./Tag";

const SERVICES = [
  {
    index: "01 / Websites",
    title: "A website that sells while you sleep.",
    desc: "Fast, conversion-built sites on modern infrastructure, designed to turn visitors into booked calls instead of another tab left open.",
    tags: ["Next.js", "SEO-ready", "Booking built in"],
    glyph: (
      <svg className="glyph" viewBox="0 0 100 100" fill="none">
        <rect x="14" y="14" width="72" height="72" rx="10" stroke="#17140F" strokeWidth="1.4" />
        <path d="M14 32H86" stroke="#17140F" strokeWidth="1.4" />
        <circle cx="24" cy="23" r="2" fill="#E8491E" />
        <circle cx="32" cy="23" r="2" fill="#8B8478" />
        <path d="M28 55l14 14 28-28" stroke="#E8491E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    reverse: false,
  },
  {
    index: "02 / Chatbots",
    title: "Answers before your team wakes up.",
    desc: "Chat systems trained on your business that qualify leads, answer questions, and only hand off what's actually worth a human's time.",
    tags: ["Trained on your docs", "Lead qualification", "Human handoff"],
    glyph: (
      <svg className="glyph chat-glyph" viewBox="0 0 100 100" fill="none">
        <rect x="18" y="20" width="64" height="48" rx="12" stroke="#17140F" strokeWidth="1.4" />
        <path d="M38 68l-6 14 18-14" stroke="#17140F" strokeWidth="1.4" strokeLinejoin="round" />
        <circle className="chat-dot chat-dot-a" cx="42" cy="41" r="3.4" fill="#17140F" />
        <circle className="chat-dot chat-dot-b" cx="58" cy="41" r="3.4" fill="#E8491E" />
      </svg>
    ),
    reverse: true,
  },
  {
    index: "03 / Automation",
    title: "The busywork, gone.",
    desc: "We connect the tools you already use so quotes, follow-ups, and reporting move on their own, with no manual re-typing between systems.",
    tags: ["CRM sync", "Follow-up sequences", "Reporting"],
    glyph: (
      <svg className="glyph automation-glyph" viewBox="0 0 100 100" fill="none">
        <path className="node-line" d="M32 27L68 27M28 32L46 68M72 32L54 68" stroke="#17140F" strokeWidth="1.2" />
        <circle className="node node-a" cx="24" cy="24" r="9" stroke="#17140F" strokeWidth="1.4" />
        <circle className="node node-b" cx="76" cy="24" r="9" stroke="#17140F" strokeWidth="1.4" />
        <circle className="node node-c" cx="50" cy="76" r="9" fill="#E8491E" />
      </svg>
    ),
    reverse: false,
  },
];

export default function Services() {
  return (
    <section className="section-pad" id="services">
      <div className="wrap">
        <Reveal className="section-label" as="div">
          <span className="num">01</span>
          <span className="rule" />
          <span className="label-text">What we build</span>
        </Reveal>

        {SERVICES.map((s) => (
          <Reveal key={s.index} as="div" className={`service${s.reverse ? " reverse" : ""}`}>
            <div>
              <div className="service-index">{s.index}</div>
              <h3 className="display service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <div className="service-visual">{s.glyph}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
