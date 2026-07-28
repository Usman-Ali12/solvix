export default function Loading() {
  return (
    <div className="loader" style={{ animation: "none" }}>
      <svg className="loader-mark-icon" viewBox="0 0 26 26" fill="none">
        <circle cx="6" cy="6" r="4.2" fill="#17140F" />
        <circle cx="20" cy="6" r="4.2" fill="#E8491E" />
        <circle cx="6" cy="20" r="4.2" fill="#E8491E" />
        <circle cx="20" cy="20" r="4.2" fill="#17140F" />
        <path d="M8 8 L18 18 M18 8 L8 18" stroke="#17140F" strokeWidth="1.3" strokeOpacity="0.35" />
      </svg>
      <div className="loader-mark">SOLVIX SOLUTION</div>
    </div>
  );
}
