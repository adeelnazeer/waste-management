import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { CtaBanner } from "@/components/cta-banner";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Skip hire, cage van hire, hazardous waste, demolition and portaloo hire — book online with transparent pricing.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Transparent pricing and instant online booking for every type of waste."
        label="What We Do"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section-padding bg-surface-muted">
        <div className="container-narrow grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CtaBanner
        title="Not sure which service you need?"
        description="Our team is happy to advise. Get a free, no-obligation quote today."
      />
    </>
  );
}
