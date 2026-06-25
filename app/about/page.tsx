import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { about, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} – a licensed skip hire and waste management company serving London and Surrey.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-black/10 bg-surface-muted p-6 text-center"
              >
                <p className="text-3xl font-bold text-brand">{stat.value}</p>
                <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-narrow space-y-16">
          {about.sections.map((section) => (
            <div key={section.title} className="max-w-3xl">
              <h2>{section.title}</h2>
              <div className="divider-accent !mx-0 mt-4" />
              <p className="mt-4 text-text-muted leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow grid gap-8 md:grid-cols-2">
          {about.policies.map((policy) => (
            <div
              key={policy.title}
              className="rounded-lg border border-black/10 p-8"
            >
              <h3 className="mb-4">{policy.title}</h3>
              <p className="text-text-muted leading-relaxed">{policy.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-brand text-white">
        <div className="container-narrow">
          <h2 className="!text-white mb-8 text-center">
            Why Customers Choose {site.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.highlights.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-dark !bg-white !text-black hover:!bg-white/90">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to order a skip?"
        description="Contact our friendly team for a free quote. Same-day delivery available across London and Surrey."
        ctaPrimary={{ label: "Get a Quote", href: "/contact" }}
        ctaSecondary={{ label: site.phoneDisplay, href: `tel:${site.phone.replace(/\s/g, "")}` }}
        variant="dark"
      />
    </>
  );
}
