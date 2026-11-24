"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE, SERVICES } from "@/lib/config";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const close = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className="site-nav">
      <div className="nav-inner glass">
        <Link href="/" className="brand" onClick={close}>
          <span className="brand-mark">T</span>
          <span>{SITE.shortName}</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary">
          <Link href="/" className={pathname === "/" ? "active" : ""} onClick={close}>
            Home
          </Link>

          <div className={`nav-dropdown ${servicesOpen ? "open" : ""}`}>
            <button
              className="nav-drop-btn"
              type="button"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services ▾
            </button>
            <div className="nav-drop-menu glass">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} onClick={close}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/careers" className={pathname === "/careers" ? "active" : ""} onClick={close}>
            Careers
          </Link>

          <div className={`nav-dropdown ${productsOpen ? "open" : ""}`}>
            <button
              type="button"
              className="nav-drop-btn nav-product"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
            >
              Products ▾
            </button>
            <div className="nav-drop-menu glass">
              <a
                href={SITE.product.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setProductsOpen(false);
                  close();
                }}
              >
                {SITE.product.name} ↗
              </a>
            </div>
          </div>

          <Link href="/#contact" className={pathname === "/#contact" ? "active" : ""} onClick={close}>
            Contact
          </Link>


          <Link href="/#contact" className="btn btn-primary nav-cta" onClick={close}>
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
