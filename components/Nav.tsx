import MagneticButton from "./MagneticButton";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">
          <svg className="brand-mark" viewBox="0 0 26 26" fill="none">
            <circle cx="6" cy="6" r="4.2" fill="#17140F" />
            <circle cx="20" cy="6" r="4.2" fill="#E8491E" />
            <circle cx="6" cy="20" r="4.2" fill="#E8491E" />
            <circle cx="20" cy="20" r="4.2" fill="#17140F" />
            <path d="M8 8 L18 18 M18 8 L8 18" stroke="#17140F" strokeWidth="1.3" strokeOpacity="0.35" />
          </svg>
          <span className="brand-word">Solvix Solution</span>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <MagneticButton href="#contact" className="btn btn-primary btn-sm">
          Book a call
        </MagneticButton>
      </div>
    </nav>
  );
}
