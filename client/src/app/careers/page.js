import CareersBoard from "@/components/CareersBoard";
import { JOBS, JOB_DEPARTMENTS } from "@/lib/jobs";

export const metadata = {
  title: "Careers & Open Roles | Techno Elevate",
  description: "Explore engineering, AI, data, design, marketing, business, and internship opportunities at TechnoElevate Private Limited.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return <CareersBoard jobs={JOBS} departments={JOB_DEPARTMENTS} />;
}
