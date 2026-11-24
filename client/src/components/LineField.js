const paths = [
  "M-100 665 C160 600 250 245 555 300 S920 690 1540 205",
  "M-80 755 C265 625 330 360 635 390 S1060 585 1510 425",
  "M-120 510 C185 460 310 105 690 190 S1080 400 1530 55",
  "M-100 815 C280 735 480 575 770 600 S1190 710 1530 530",
];

const nodes = [
  { cx: 302, cy: 398, r: 3 },
  { cx: 555, cy: 300, r: 4 },
  { cx: 905, cy: 499, r: 3 },
  { cx: 1135, cy: 450, r: 4 },
  { cx: 690, cy: 190, r: 3 },
];

export default function LineField() {
  return (
    <div className="line-field" aria-hidden="true">
      <div className="line-field-grid" />
      <svg viewBox="0 0 1440 850" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="data-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--coral)" stopOpacity="0" />
            <stop offset="42%" stopColor="var(--coral)" stopOpacity="0.95" />
            <stop offset="72%" stopColor="var(--cream)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--cream)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="var(--cream)" strokeWidth="0.7" opacity="0.09">
          {paths.map((path) => <path d={path} key={path} />)}
        </g>
        <g fill="none" stroke="url(#data-line)" strokeWidth="1.35">
          {paths.map((path, index) => (
            <path className="data-line" pathLength="1" d={path} key={path} style={{ animationDelay: `${index * 1.1}s` }} />
          ))}
        </g>
        <g fill="var(--coral)">
          {nodes.map((node, index) => (
            <circle className="line-node" key={`${node.cx}-${node.cy}`} {...node} style={{ animationDelay: `${index * 0.55}s` }} />
          ))}
        </g>
      </svg>
      <div className="line-field-fade" />
    </div>
  );
}
