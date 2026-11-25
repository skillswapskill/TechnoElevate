import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/config";

const service = SERVICES.find((s) => s.slug === "corporate-contracting");

export const metadata = {
  title: `${service.title} | Techno Elevate`,
  description: service.description,
  keywords: ["corporate contracting services", "technology contracting", "software project contracting", "corporate IT delivery", "Techno Elevate", "structured engagements", "IT contracting", "governed delivery", "corporate IT partner"],
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: { title: service.title, description: service.description, url: `/services/${service.slug}`, type: "website" },
  twitter: { card: "summary_large_image", title: service.title, description: service.description },
};

export default function Page() {
  return <ServicePage service={service} />;
}
