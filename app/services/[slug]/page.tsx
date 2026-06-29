import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Phone, ListChecks } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { getServiceBySlug, getServiceSlugs, formatPrice, site } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.hero.title, description: service.shortDescription };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { hero, content, workflow } = service;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-text-muted">{content.intro}</p>

            <h2 className="mt-10 mb-6">What we offer</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {f}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 mb-6">Options & pricing</h2>
            <div className="space-y-3">
              {content.options.map((opt) => (
                <div
                  key={opt.name}
                  className="card flex items-center justify-between gap-4 p-5"
                >
                  <div>
                    <h3 className="text-base">{opt.name}</h3>
                    <p className="mt-1 text-sm text-text-muted">{opt.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-text-muted">from</p>
                    <p className="text-lg font-extrabold text-brand">{formatPrice(opt.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 card bg-surface-muted p-6">
              <div className="mb-4 flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-brand" />
                <h3 className="text-base">{workflow.title}</h3>
              </div>
              <ol className="grid gap-2 sm:grid-cols-2">
                {workflow.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 card bg-surface-muted p-6">
              <p className="text-xs text-text-muted">Starting from</p>
              <p className="text-3xl font-extrabold text-brand">{formatPrice(service.fromPrice)}</p>
              <p className="mb-5 mt-1 text-sm text-text-muted">
                Book online in minutes — secure payment with Stripe.
              </p>
              <Link href={`/book?service=${service.slug}`} className="btn-primary mb-3 w-full">
                Book {service.title}
              </Link>
              <a href={telHref} className="btn-outline flex w-full items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner
        title={`Need ${service.title.toLowerCase()}?`}
        description="Book online today or call our friendly team for a free quote."
        ctaPrimary={{ label: "Book Now", href: `/book?service=${service.slug}` }}
      />
    </>
  );
}
