import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Waste Management Services collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return <LegalPage content={legal.privacy} />;
}
