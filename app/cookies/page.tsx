import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Waste Management Services uses cookies and how you can manage them.",
};

export default function CookiesPage() {
  return <LegalPage content={legal.cookies} />;
}
