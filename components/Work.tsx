import Reveal from "./Reveal";
import Tag from "./Tag";
import SmileMark from "./SmileMark";

export default function Work() {
  return (
    <section className="section-pad" id="work">
      <div className="wrap">
        <Reveal className="section-label" as="div">
          <span className="num">03</span>
          <span className="rule" />
          <span className="label-text">Selected work</span>
        </Reveal>

        {/* Fitness Empire */}
        <Reveal as="div" className="case-study">
          <div className="case-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/fitness-empire.png" alt="Fitness Empire storefront, Baldia Town, Karachi" />
          </div>
          <div className="case-body">
            <div className="case-logo-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/work/fitness-empire-logo.png" alt="Fitness Empire logo" className="case-logo" />
              <div className="service-index">Client / Gym &amp; fitness</div>
            </div>
            <h3 className="display service-title">Fitness Empire</h3>
            <p className="service-desc">
              A gym in Baldia Town, Karachi, that used to run entirely on WhatsApp now has a full
              site behind it: six training programs, trainer profile, three pricing tiers, member
              testimonials, a gallery, and an FAQ, all pulled from a single content file so the
              gym can update copy without touching code.
            </p>
            <div className="service-tags">
              <Tag>Next.js</Tag>
              <Tag>Framer Motion</Tag>
              <Tag>Full site build</Tag>
            </div>
          </div>
        </Reveal>

        {/* BrightSmile Dental Studio */}
        <Reveal as="div" className="case-study reverse">
          <div className="case-body">
            <div className="case-logo-row">
              <svg className="case-logo case-logo-svg" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="#3e8ed9" strokeWidth="1.4" />
                <path d="M11 21c2.5 5 6 7.5 9 7.5s6.5-2.5 9-7.5" stroke="#0b2b45" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="service-index">Client / Dental practice</div>
            </div>
            <h3 className="display service-title">BrightSmile Dental Studio</h3>
            <p className="service-desc">
              A dental practice that stops answering the same three questions all day. The site
              runs an AI receptionist that handles booking, insurance questions, and general info
              on its own, backed by a doctors section, a service gallery, and an FAQ.
            </p>
            <div className="service-tags">
              <Tag>AI Chatbot</Tag>
              <Tag>Online Booking</Tag>
              <Tag>Full site build</Tag>
            </div>
          </div>
          <div className="case-media case-media-brand">
            <SmileMark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
