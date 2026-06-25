import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { areas, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description: `${site.name} provides skip hire and waste management across South West London, South East London, and Surrey.`,
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        title={areas.hero.title}
        subtitle={areas.hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas We Cover" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <p className="mx-auto mb-12 max-w-3xl text-center text-text-muted leading-relaxed">
            {areas.description}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {areas.areas.map((area) => (
              <div
                key={area}
                className="rounded-md border border-black/10 bg-surface-muted px-3 py-2.5 text-center text-sm transition-colors hover:border-brand hover:bg-brand-soft"
              >
                {area}
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-text-muted">
            Don&apos;t see your area?{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact us
            </Link>{" "}
            – we may still be able to help.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Order a skip in your area"
        description="Fast, reliable skip hire with same-day delivery available across all areas we cover."
        ctaPrimary={{ label: "Book Now", href: "/contact" }}
        ctaSecondary={{ label: site.phoneDisplay, href: `tel:${site.phone.replace(/\s/g, "")}` }}
      />
    </>
  );
}
