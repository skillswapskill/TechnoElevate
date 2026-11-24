export default function MotionReveal({ children, className = "", y = 28 }) {
  return (
    <div className={`motion-reveal ${className}`} style={{ "--reveal-distance": `${y}px` }}>
      {children}
    </div>
  );
}
