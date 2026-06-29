import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/scroll-fade";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about booking, pricing, collections, payments and recycling.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title={faqs.hero.title}
        subtitle={faqs.hero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />

      <AnimatedSection className="section-padding bg-surface-muted">
        <StaggerContainer className="container-narrow max-w-3xl space-y-12">
          {faqs.categories.map((cat) => (
            <StaggerItem key={cat.name}>
              <h2 className="mb-5">{cat.name}</h2>
              <FaqAccordion items={cat.items} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      <CtaBanner
        title="Can't find your answer?"
        description="Get in touch and our team will be happy to help."
        ctaPrimary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
