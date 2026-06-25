import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { getServiceBySlug, getServiceSlugs, site } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.hero.title,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { hero, content } = service;

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/skip-hire" },
          { label: service.title },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg text-text-muted leading-relaxed">{content.intro}</p>

            <h2 className="mt-10 mb-6">What We Offer</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {feature}
                </li>
              ))}
            </ul>

            {content.sizes.length > 0 && (
              <>
                <h2 className="mt-10 mb-6">Available Sizes</h2>
                <div className="space-y-4">
                  {content.sizes.map((size) => (
                    <div
                      key={size.size}
                      className="rounded-lg border border-black/10 p-5"
                    >
                      <h3 className="text-lg text-brand">{size.size}</h3>
                      <p className="mt-1 text-sm text-text-muted">{size.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="sticky top-28 rounded-lg border border-black/10 bg-surface-muted p-6">
              <h3 className="mb-4">Book {service.title}</h3>
              <p className="mb-6 text-sm text-text-muted">
                Get a free, no-obligation quote. Same-day delivery available.
              </p>
              <Link href="/contact" className="btn-primary mb-3 w-full">
                {service.ctaPrimary.label}
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn-outline flex w-full items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Need ${service.title}?`}
        description="Contact our team today for competitive pricing and fast delivery across London and Surrey."
        ctaPrimary={{ label: "Get a Quote", href: "/contact" }}
        ctaSecondary={{ label: site.phoneDisplay, href: `tel:${site.phone.replace(/\s/g, "")}` }}
      />
    </>
  );
}
