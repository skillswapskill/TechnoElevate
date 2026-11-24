import MotionReveal from "@/components/MotionReveal";

const sectors = [
  { name: "Technology & SaaS", description: "Digital products, software platforms, and technology modernization.", color: "#FF6B5B" },
  { name: "E-commerce & Retail", description: "Customer experiences, digital storefronts, and online growth.", color: "#FF958A" },
  { name: "Healthcare & Wellness", description: "Thoughtful digital experiences, data workflows, and operational support.", color: "#F4EDE0" },
  { name: "Education & Skill Development", description: "Learning platforms, training ecosystems, and community products.", color: "#C8C0B6" },
  { name: "Finance & Professional Services", description: "Digital workflows, client experiences, and business operations.", color: "#7584A5" },
  { name: "Manufacturing & Logistics", description: "Process digitization, structured data, and corporate technology support.", color: "#3D537D" },
];

const engagementAreas = [
  { name: "Web & Software", color: "#FF6B5B" },
  { name: "AI & Data", color: "#F4EDE0" },
  { name: "Digital Growth", color: "#7584A5" },
  { name: "Corporate Delivery", color: "#3D537D" },
];

export default function SectorCharts() {
  return (
    <section className="section sectors-section" id="sectors">
      <div className="container">
        <MotionReveal>
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Sector coverage</div>
              <h2 className="section-title">Software services designed<br />around real business needs.</h2>
            </div>
            <p className="section-sub">Our service model is designed to support organizations across multiple sectors with technology, data, and digital solutions adapted to their workflows.</p>
          </div>
        </MotionReveal>

        <div className="sector-layout">
          <MotionReveal className="sector-list">
            {sectors.map((sector, index) => (
              <article className="sector-item" key={sector.name}>
                <span className="sector-index">0{index + 1}</span>
                <span className="sector-swatch" style={{ backgroundColor: sector.color }} aria-hidden="true" />
                <div><h3>{sector.name}</h3><p>{sector.description}</p></div>
              </article>
            ))}
          </MotionReveal>

          <MotionReveal className="charts-panel" delay={0.1}>
            <figure className="chart-card glass">
              <div
                className="pie-chart industry-pie"
                role="img"
                aria-label={`Sector coverage: ${sectors.map((sector) => sector.name).join(", ")}`}
              >
                <div className="pie-center"><strong>06</strong><span>Sectors</span></div>
              </div>
              <figcaption><h3>Industry coverage</h3><p>Six sectors supported through adaptable software and digital services.</p></figcaption>
              <div className="chart-legend">
                {sectors.map((sector) => <span key={sector.name}><i style={{ backgroundColor: sector.color }} />{sector.name}</span>)}
              </div>
            </figure>

            <figure className="chart-card glass">
              <div
                className="pie-chart service-pie"
                role="img"
                aria-label={`Engagement coverage: ${engagementAreas.map((area) => area.name).join(", ")}`}
              >
                <div className="pie-center"><strong>04</strong><span>Engagement areas</span></div>
              </div>
              <figcaption><h3>Engagement coverage</h3><p>Connected capabilities spanning software, AI, data, growth, and delivery.</p></figcaption>
              <div className="chart-legend">
                {engagementAreas.map((area) => <span key={area.name}><i style={{ backgroundColor: area.color }} />{area.name}</span>)}
              </div>
            </figure>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
