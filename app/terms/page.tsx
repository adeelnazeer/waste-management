import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of Waste Management Services.",
};

export default function TermsPage() {
  return <LegalPage content={legal.terms} />;
}
