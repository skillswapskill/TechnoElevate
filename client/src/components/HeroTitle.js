const lines = ["Technology that", "moves business", "forward."];

export default function HeroTitle() {
  return (
    <h1 className="hero-title" aria-label="Technology that moves business forward.">
      {lines.map((line, index) => (
        <span className="title-mask" aria-hidden="true" key={line}>
          <span className={index > 0 ? "hero-title-line gradient" : "hero-title-line"} style={{ animationDelay: `${0.15 + index * 0.12}s` }}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
