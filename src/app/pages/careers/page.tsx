import Careers from "@/components/pages/Careers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Join Our Team | Gemini Pixel Craft",
  description:
    "Join our team of passionate developers and designers. Explore career opportunities at Gemini Pixel Craft.",
  keywords: ["careers", "jobs", "web development careers", "hiring"],
};

export default function CareersPage() {
  return <Careers />;
}
