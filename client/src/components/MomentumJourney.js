"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import MotionReveal from "@/components/MotionReveal";

const stages = [
  {
    label: "Discover",
    tag: "Listen & align",
    title: "Find the signal in the noise.",
    description: "We start with your goals, your people, and the problem worth solving. No jargon-filled marathon meetings — just a focused conversation that creates clarity.",
    outcome: "A shared brief, clear priorities, and a practical next move.",
    points: ["Business goals and user needs", "Scope, priorities, and success criteria", "A roadmap everyone can understand"],
    icon: "sparkles",
    color: "#ff8d7d",
    rgb: "255, 141, 125",
    rhythm: [30, 46, 40, 58, 52, 68, 61, 78, 70, 88, 82, 94],
  },
  {
    label: "Design",
    tag: "Shape & simplify",
    title: "Give the idea a shape people love.",
    description: "We turn direction into intuitive screens, thoughtful journeys, and a system that feels unmistakably yours. Every detail earns its place.",
    outcome: "A clear experience you can see, feel, and respond to.",
    points: ["User flows and experience design", "A distinct, responsive visual system", "Feedback loops before development"],
    icon: "layers",
    color: "#f3ca78",
    rgb: "243, 202, 120",
    rhythm: [66, 42, 74, 52, 84, 62, 91, 72, 80, 94, 86, 100],
  },
  {
    label: "Build",
    tag: "Create & refine",
    title: "Turn good decisions into real momentum.",
    description: "Our team brings the experience to life with clean engineering and visible progress. You always know what is moving, what is next, and why it matters.",
    outcome: "A reliable digital product, built with care and ready to grow.",
    points: ["Quality-focused development", "Regular, understandable updates", "Testing across real devices and flows"],
    icon: "code",
    color: "#7fd6b0",
    rgb: "127, 214, 176",
    rhythm: [36, 56, 44, 72, 60, 84, 68, 90, 76, 94, 88, 100],
  },
  {
    label: "Launch",
    tag: "Ship & grow",
    title: "Make the launch feel like a beginning.",
    description: "We help you ship with confidence, learn from real use, and keep improving. The finish line becomes a bright new starting point.",
    outcome: "A confident launch and a clear path for what comes next.",
    points: ["Launch readiness and final checks", "A smooth handover for your team", "Ongoing improvements as you grow"],
    icon: "chart",
    color: "#aebaff",
    rgb: "174, 186, 255",
    rhythm: [30, 42, 54, 48, 68, 62, 80, 74, 92, 84, 96, 100],
  },
];

export default function MomentumJourney() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const progress = ((active + 1) / stages.length) * 100;

  return (
    <section className="section momentum-section" id="process">
      <div className="container">
        <MotionReveal>
          <div className="section-heading-row momentum-heading">
            <div>
              <div className="eyebrow">Small steps. Real momentum.</div>
              <h2 className="section-title">Watch your idea<br />come to life.</h2>
            </div>
            <p className="section-sub">A good process should feel as thoughtful as the final product. Tap through our four-step journey and see how we turn a first conversation into meaningful progress.</p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <div
            className="momentum-dashboard glass"
            style={{
              "--journey-accent": stage.color,
              "--journey-rgb": stage.rgb,
              "--journey-progress": `${progress}%`,
            }}
          >
            <div className="momentum-topline">
              <span><Icon name="sparkles" size={15} /> THE MOMENTUM MAP</span>
              <span className="momentum-preview"><i /> INTERACTIVE ROADMAP</span>
            </div>

            <div className="momentum-stage-tabs" aria-label="Explore the project journey">
              {stages.map((item, index) => (
                <button
                  type="button"
                  key={item.label}
                  className={`momentum-stage-tab ${index === active ? "active" : ""} ${index < active ? "visited" : ""}`}
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  <span className="momentum-stage-number">{index < active ? "✓" : `0${index + 1}`}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="momentum-life-track" aria-hidden="true"><span /></div>

            <div className="momentum-panel">
              <div className="momentum-visual">
                <div
                  className="momentum-ring"
                  role="progressbar"
                  aria-label="Roadmap position"
                  aria-valuemin={1}
                  aria-valuemax={stages.length}
                  aria-valuenow={active + 1}
                  aria-valuetext={`${stage.label}, stage ${active + 1} of ${stages.length}`}
                >
                  <div className="momentum-ring-center">
                    <span>STAGE</span>
                    <strong>0{active + 1}<small>/ 0{stages.length}</small></strong>
                    <em>{stage.label}</em>
                  </div>
                </div>

                <div className="momentum-energy-chart" key={`chart-${stage.label}`} aria-hidden="true">
                  {stage.rhythm.map((height, index) => (
                    <i key={`${height}-${index}`} style={{ "--bar-height": `${height}%`, "--bar-delay": `${index * 35}ms` }} />
                  ))}
                </div>
                <p className="momentum-visual-note"><Icon name={stage.icon} size={15} /> Clarity, craft, and a little spark.</p>
                {active === stages.length - 1 && (
                  <div className="momentum-sparks" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--spark-index": index }} />)}
                  </div>
                )}
              </div>

              <div className="momentum-content" key={stage.label} aria-live="polite" aria-atomic="true">
                <span className="momentum-kicker">0{active + 1} / {stage.tag}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <ul>
                  {stage.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}
                </ul>
                <div className="momentum-outcome">
                  <span><Icon name="sparkles" size={18} /></span>
                  <div><small>THE GOOD PART</small><strong>{stage.outcome}</strong></div>
                </div>
              </div>
            </div>

            <div className="momentum-footer">
              <button
                type="button"
                className="btn momentum-next"
                onClick={() => setActive((current) => (current + 1) % stages.length)}
              >
                {active === stages.length - 1 ? "Replay the journey" : `Next: ${stages[active + 1].label}`}
                <Icon name="arrow" size={18} />
              </button>
              <Link href="#contact" className="momentum-contact-link">Bring your idea to life <Icon name="arrow" size={17} /></Link>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
