"use client";

import { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const orbRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    function handleMove(e: globalThis.MouseEvent) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      orbRefs.current.forEach((orb) => {
        if (!orb) return;
        const depth = parseFloat(orb.dataset.depth || "0.03");
        orb.style.transform = `translate(${x * 60 * depth * 10}px, ${y * 60 * depth * 10}px)`;
      });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-glow">
        <span className="g1" />
        <span className="g2" />
      </div>

      <div className="hero-objects">
        <div
          ref={(el) => {
            if (el) orbRefs.current[0] = el;
          }}
          className="orb orb-c"
          data-depth="0.02"
        />
        <div
          ref={(el) => {
            if (el) orbRefs.current[1] = el;
          }}
          className="orb orb-a"
          data-depth="0.04"
        />
        <div
          ref={(el) => {
            if (el) orbRefs.current[2] = el;
          }}
          className="orb orb-b"
          data-depth="0.07"
        />
      </div>

      <div className="hero-grid">
        <div>
          <div className="eyebrow hero-eyebrow">Solvix, an AI and automation studio</div>
          <h1 className="display">
            <span className="line"><span>Automation for</span></span>
            <span className="line"><span>the businesses</span></span>
            <span className="line"><span>nobody&rsquo;s called yet.</span></span>
          </h1>
        </div>
        <div className="hero-side">
          <p className="hero-sub">
            Solvix builds AI websites, chatbots, and back-office automation for companies still
            running on spreadsheets, sticky notes, and someone&rsquo;s inbox.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#contact" className="btn btn-primary btn-lg">
              Start a project
            </MagneticButton>
            <a className="btn-ghost" href="#process">See how it works</a>
          </div>
        </div>
      </div>
    </section>
  );
}
