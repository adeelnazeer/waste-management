import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/scroll-fade";
import { help } from "@/lib/content";

export const metadata: Metadata = {
  title: "Help & Advice",
  description: "Guides and tips on skip sizes, permits, waste types and responsible disposal.",
};

export default function HelpAdvicePage() {
  return (
    <>
      <PageHero
        title={help.hero.title}
        subtitle={help.hero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Help & Advice" }]}
      />

      <AnimatedSection className="section-padding bg-surface-muted">
        <StaggerContainer className="container-narrow grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {help.articles.map((a) => (
            <StaggerItem key={a.slug}>
              <article className="card card-hover flex h-full flex-col p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  {a.category}
                </span>
                <h3 className="mt-2 text-lg leading-snug">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm text-text-muted">{a.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Clock className="h-3.5 w-3.5" />
                    {a.readTime}
                  </span>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      <CtaBanner
        title="Still have questions?"
        description="Our team is here to help you choose the right service for your project."
        ctaPrimary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
