const ITEMS = [
  "AI Websites",
  "Chatbots",
  "Workflow Automation",
  "Lead Routing",
  "CRM Integration",
  "Reporting",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
