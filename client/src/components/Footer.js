import Link from "next/link";
import { SITE, SERVICES, OFFICE_MAP_URL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <span className="brand-mark">T</span>
            <span>{SITE.shortName}</span>
          </div>
          <p>{SITE.description}</p>
        </div>

        <div className="footer-col">
          <h2>Services</h2>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h2>Company</h2>
          <Link href="/">Home</Link>
          <Link href="/careers">Careers</Link>
          <a href={SITE.product.href} target="_blank" rel="noopener noreferrer">
            {SITE.product.name}
          </a>
          <Link href="/#contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
          <a href={OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer">{SITE.address}</a>
          <a href={`mailto:${SITE.emails.admin}`}>{SITE.emails.admin}</a>
          <a href={`mailto:${SITE.emails.skillswap}`}>{SITE.emails.skillswap}</a>
          <a href={`tel:${SITE.phones.company.replace(/\s+/g, "")}`}>{SITE.phones.company}</a>
          <p>
            {SITE.founder.name} — {SITE.founder.title}
            <br />
            <a href={`tel:${SITE.founder.phone.replace(/\s+/g, "")}`}>{SITE.founder.phone}</a>
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <span>CIN: {SITE.cin}</span>
      </div>
    </footer>
  );
}
