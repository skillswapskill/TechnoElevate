import LeadForm from "@/components/LeadForm";
import MotionReveal from "@/components/MotionReveal";
import { SITE_URL } from "@/lib/config";

export default function ServicePage({ service }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <section className="page-hero">
        <MotionReveal className="container" y={22}>
          <div className="eyebrow">Software Services</div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </MotionReveal>
      </section>

      <section className="container detail-grid" aria-label={`${service.title} details and enquiry`}>
        <MotionReveal className="detail-panel glass">
          <h2>What we offer</h2>
          <p>
            We tailor our {service.title.toLowerCase()} to your goals, timeline, and budget. Share your
            requirements and our team will reach out with a practical, business-focused plan.
          </p>
          <ul className="check-list">
            {service.points.map((point) => (
              <li key={point}>
                <span className="check">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="founder-card" style={{ marginTop: "1.5rem" }}>
            <div className="label">Need help deciding?</div>
            <h3>Let’s talk</h3>
            <p>Tell us what you need to achieve and we’ll recommend the right approach for your business.</p>
          </div>
        </MotionReveal>

        <MotionReveal className="form-reveal" delay={0.12}>
          <LeadForm
            service={service.title}
            source={`service-${service.slug}`}
            title={`Inquire about ${service.title}`}
            subtitle="Share your requirements below. Our consulting team will review them and get in touch."
            buttonText="Request This Service"
          />
        </MotionReveal>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
