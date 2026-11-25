import CareersBoard from "@/components/CareersBoard";
import { JOBS, JOB_DEPARTMENTS } from "@/lib/jobs";
import { SITE_URL } from "@/lib/config";

export const metadata = {
  title: "Careers & Open Roles | Techno Elevate",
  description:
    "Explore engineering, AI, data, design, marketing, business, and internship opportunities at TechnoElevate Private Limited. Open roles across engineering, AI, data, design, marketing, and business.",
  keywords: [
    "careers at Techno Elevate",
    "software engineer jobs",
    "AI jobs",
    "data jobs",
    "web developer jobs",
    "remote jobs India",
    "engineering jobs India",
    "join TechnoElevate Private Limited",
  ],
  alternates: { canonical: "/careers" },
  openGraph: { type: "website" },
  twitter: { card: "summary_large_image" },
};

const locationSchema = (location) =>
  location.includes("Remote")
    ? { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "IN" } }
    : { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: location.replace(/ · .*/, ""), addressCountry: "IN" } };

const jobsStructuredData = JOBS.map((job) => ({
  "@type": "JobPosting",
  title: job.title,
  description: `${job.description} Required skills: ${job.skills.join(", ")}.`,
  employmentType: job.type,
  jobLocation: locationSchema(job.location),
  hiringOrganization: { "@id": `${SITE_URL}/#organization` },
}));

export default function CareersPage() {
  return (
    <>
      <CareersBoard jobs={JOBS} departments={JOB_DEPARTMENTS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsStructuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
