import ServicePage from "@/components/ServicePage";
import { SERVICES } from "@/lib/config";

const service = SERVICES.find((s) => s.slug === "llm-training");

export const metadata = {
  title: `${service.title} | Techno Elevate`,
  description: service.description,
  keywords: ["LLM training services", "LLM fine-tuning", "AI model training", "language model evaluation", "Techno Elevate"],
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: { title: service.title, description: service.description, url: `/services/${service.slug}`, type: "website" },
  twitter: { card: "summary_large_image", title: service.title, description: service.description },
};

export default function Page() {
  return <ServicePage service={service} />;
}
