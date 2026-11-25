import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/config";

const service = SERVICES.find((s) => s.slug === "outsourcing");

export const metadata = {
  title: `${service.title} | Techno Elevate`,
  description: service.description,
  keywords: ["IT outsourcing services", "business outsourcing", "technology team support", "operational support", "Techno Elevate", "staff augmentation", "remote development teams", "IT support services", "workforce solutions"],
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: { title: service.title, description: service.description, url: `/services/${service.slug}`, type: "website" },
  twitter: { card: "summary_large_image", title: service.title, description: service.description },
};

export default function Page() {
  return <ServicePage service={service} />;
}
