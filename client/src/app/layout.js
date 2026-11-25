import { Outfit } from "next/font/google";
import "./globals.css";
import "./delight.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import ScrollProgress from "@/components/ScrollProgress";
import { SITE, SERVICES, SITE_URL } from "@/lib/config";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const title = `${SITE.shortName} | Software Development & IT Services`;
const description =
  "TechnoElevate Private Limited provides custom software development, website building, digital marketing, LLM training, data leveling, IT outsourcing, and corporate contracting services for growing businesses. Partner with a software development company in India.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "software development company",
    "IT services India",
    "Techno Elevate",
    "TechnoElevate Private Limited",
    "website development services",
    "digital marketing services",
    "LLM training services",
    "data leveling services",
    "IT outsourcing services",
    "corporate contracting services",
    "software development company India",
    "web development services",
    "AI solutions",
    "remote IT team",
  ],
  applicationName: SITE.shortName,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14213D",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      legalName: SITE.name,
      alternateName: SITE.shortName,
      identifier: { "@type": "PropertyValue", propertyID: "CIN", value: SITE.cin },
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description,
      slogan: SITE.tagline,
      areaServed: "IN",
      sameAs: {
        email: SITE.emails.admin,
        "@id": `mailto:${SITE.emails.admin}`,
      },
      email: SITE.emails.admin,
      telephone: SITE.phones.company,
      address: SITE.address,
      founder: {
        "@type": "Person",
        name: SITE.founder.name,
        jobTitle: SITE.founder.title,
        telephone: SITE.founder.phone,
      },
      contactPoint: [
        { "@type": "ContactPoint", contactType: "customer service", telephone: SITE.phones.company, email: SITE.emails.admin },
        { "@type": "ContactPoint", contactType: "product support", telephone: SITE.phones.company, email: SITE.emails.skillswap },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Development and IT Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.short,
            url: `${SITE_URL}/services/${service.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.shortName,
      description: SITE.description,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileBottomBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
