import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Icon from "@/components/Icon";
import LineField from "@/components/LineField";
import HeroTitle from "@/components/HeroTitle";
import MotionReveal from "@/components/MotionReveal";
import SectorCharts from "@/components/SectorCharts";
import MomentumJourney from "@/components/MomentumJourney";
import { SITE, SERVICES, OFFICE_MAP_URL } from "@/lib/config";

const serviceIcons = {
  "digital-marketing": "chart",
  "website-building": "code",
  "llm-training": "cpu",
  "data-leveling": "database",
  outsourcing: "layers",
  "corporate-contracting": "briefcase",
};

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-label="Techno Elevate introduction">
        <LineField />
        <div className="container hero-grid">
          <MotionReveal className="hero-copy" y={18}>
            <HeroTitle />
            <p>
              {SITE.name} is a software and IT services company helping organizations solve
              business challenges through software engineering, AI, data, and digital solutions.
            </p>
            <p className="section-sub">{SITE.tagline}</p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-primary">Start a project <Icon name="arrow" size={18} /></Link>
              <Link href="#services" className="btn btn-secondary">Explore our services</Link>
            </div>
            <div className="hero-meta">
              <div className="avatar-stack" aria-hidden="true"><span>IT</span><span>AI</span><span>UX</span></div>
              <p>Clear consulting. Accountable engineering.<br /><strong>One technology partner for your digital journey.</strong></p>
            </div>
          </MotionReveal>

          <MotionReveal className="hero-visual" delay={0.18} y={36}>
            <div className="visual-glow" />
            <div className="visual-card glass">
              <div className="visual-head">
                <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
                <span>TE / SOFTWARE & IT SERVICES</span>
              </div>
              <div className="visual-intro">
                <h2>Technology that works<br />for your business.</h2>
                <p>Software, AI, data, and digital capabilities delivered with clarity.</p>
              </div>
              <div className="visual-service-list">
                {SERVICES.slice(0, 3).map((service) => (
                  <Link href={`/services/${service.slug}`} className="visual-service" key={service.slug}>
                    <span className="visual-service-icon"><Icon name={serviceIcons[service.slug]} size={20} /></span>
                    <span><strong>{service.title.replace(" Services", "")}</strong><small>{service.points[0]} · {service.points[1]}</small></span>
                    <span className="service-arrow"><Icon name="arrow" size={17} /></span>
                  </Link>
                ))}
              </div>
              <div className="visual-footer">
                <div><span>Approach</span><strong>Business-first</strong></div>
                <div><span>Delivery</span><strong>Accountable</strong></div>
                <div><span>Engagement</span><strong>Flexible</strong></div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <MotionReveal>
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">What we do</div>
                <h2 className="section-title">Software and IT expertise<br />for modern organizations.</h2>
              </div>
              <p className="section-sub">Six focused service lines covering software development, digital growth, AI, data, and corporate delivery — shaped around your business objectives.</p>
            </div>
          </MotionReveal>
          <div className="services-intro">
            <p className="section-sub">
              From custom website building and software development to digital marketing, LLM training, data leveling, IT outsourcing, and corporate contracting, we deliver secure, scalable, and business-first technology solutions for growing organizations.
            </p>
            <div className="services-intro-links">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid-3 services-grid">
            {SERVICES.map((service, index) => (
              <MotionReveal key={service.slug} className="service-reveal" delay={index * 0.09}>
                <article className="card glass service-card">
                  <div className="card-top">
                    <div className="card-icon"><Icon name={serviceIcons[service.slug]} size={25} /></div>
                    <span className="card-number">0{index + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <ul className="service-points">
                    {service.points.slice(0, 3).map((point) => <li key={point}><span>✓</span>{point}</li>)}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="card-link">Explore service <Icon name="arrow" size={17} /></Link>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <MomentumJourney />

      <SectorCharts />

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <MotionReveal className="about-copy">
            <div className="eyebrow">Why Techno Elevate</div>
            <h2 className="section-title">Business-first thinking.<br />Technology done right.</h2>
            <p className="section-sub">We make software and technology easier to understand and simpler to act on. Every engagement is clear, collaborative, and grounded in your business objectives — without unnecessary complexity.</p>
            <Link href="#contact" className="text-link">Let’s work together <Icon name="arrow" size={18} /></Link>
          </MotionReveal>
          <MotionReveal className="about-bento" delay={0.12}>
            <div className="bento-card glass bento-large">
              <span className="bento-label">Our promise</span>
              <strong>Built with care.<br />Designed to perform.</strong>
              <div className="bento-line"><i /><i /><i /></div>
            </div>
            <div className="bento-card glass">
              <span className="bento-label">Leadership</span>
              <h3>{SITE.founder.name}</h3>
              <p>{SITE.founder.title}</p>
              <a href={`tel:${SITE.founder.phone.replace(/\s+/g, "")}`}>{SITE.founder.phone}</a>
            </div>
            <a className="bento-card glass product-card" href={SITE.product.href} target="_blank" rel="noopener noreferrer">
              <span className="bento-label">Our product</span>
              <h3>{SITE.product.name}<Icon name="external" size={20} /></h3>
              <p>Discover a smarter way to connect, share, and grow.</p>
              <span className="text-link">Visit skillswap.company <Icon name="arrow" size={16} /></span>
            </a>
          </MotionReveal>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <MotionReveal className="contact-heading">
            <div className="eyebrow">Start a conversation</div>
            <h2 className="section-title">Have a challenge? Let’s solve it together.</h2>
            <p className="section-sub">Tell us what your organization needs. Our software and IT services team will help you identify a practical way forward.</p>
          </MotionReveal>
          <div className="contact-grid">
            <MotionReveal className="contact-details">
              <a className="contact-tile glass" href={`tel:${SITE.phones.company.replace(/\s+/g, "")}`}>
                <span className="info-icon"><Icon name="phone" size={21} /></span>
                <span><small>Call our team</small><strong>{SITE.phones.company}</strong></span>
                <Icon name="arrow" size={18} />
              </a>
              <a className="contact-tile glass" href={`mailto:${SITE.emails.admin}`}>
                <span className="info-icon"><Icon name="mail" size={21} /></span>
                <span><small>Email us</small><strong>{SITE.emails.admin}</strong></span>
                <Icon name="arrow" size={18} />
              </a>
              <a className="contact-tile glass" href={OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer">
                <span className="info-icon"><Icon name="pin" size={21} /></span>
                <span><small>Find our office on Google Maps</small><strong>{SITE.address}</strong></span>
                <Icon name="external" size={18} />
              </a>
              <div className="contact-tile glass">
                <span className="info-icon"><Icon name="user" size={21} /></span>
                <span><small>Founder / Managing Director</small><strong>{SITE.founder.name}</strong><a href={`tel:${SITE.founder.phone.replace(/\s+/g, "")}`}>{SITE.founder.phone}</a></span>
              </div>
              <div className="contact-tile glass">
                <span className="info-icon"><Icon name="briefcase" size={21} /></span>
                <span><small>Corporate Identification Number</small><strong>{SITE.cin}</strong></span>
              </div>
              <div className="secondary-email"><span>SkillSwap enquiries</span><a href={`mailto:${SITE.emails.skillswap}`}>{SITE.emails.skillswap}</a></div>
            </MotionReveal>
            <MotionReveal className="form-reveal" delay={0.12}>
              <LeadForm service="General Inquiry" source="home-contact" title="Tell us about your project" subtitle="A few details are all we need to start the conversation." buttonText="Send my enquiry" />
            </MotionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
