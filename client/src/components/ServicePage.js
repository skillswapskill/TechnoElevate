import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import MotionReveal from "@/components/MotionReveal";
import { SERVICES, SITE_URL } from "@/lib/config";

export default function ServicePage({ service }) {
  const url = `${SITE_URL}/services/${service.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "IN",
    keywords: service.points,
    offers: {
      "@type": "Offer",
      name: `Enquire about ${service.title}`,
      url,
    },
  };
  const breadcrumbs = [
    { name: "Home", href: SITE_URL },
    { name: service.title, href: url },
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
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
          <h2>Why partner with us</h2>
          <p>
            We deliver {service.title.toLowerCase()} with a business-first mindset — timelines you can rely on,
            requirements you actually see and review, and measurable outcomes, not just activity.
          </p>
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
      <section className="container services-cross-links" aria-label="Explore other services">
        <h2>More services</h2>
        <div className="services-intro-links">
          {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
