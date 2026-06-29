import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { Icon } from "@/components/icon";
import {
  AnimatedSection,
  RevealHeader,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-fade";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Waste Management Services is a fully licensed waste carrier committed to a cleaner, greener tomorrow.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <AnimatedSection className="section-padding bg-white">
        <StaggerContainer className="container-narrow grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="card p-6 text-center">
                <p className="text-3xl font-extrabold text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-text-muted">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-surface-muted">
        <StaggerContainer className="container-narrow space-y-12">
          {about.sections.map((s) => (
            <StaggerItem key={s.title}>
              <div className="max-w-3xl">
                <h2>{s.title}</h2>
                <div className="divider-accent !mx-0 mt-4" />
                <p className="mt-4 text-text-muted leading-relaxed">{s.content}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <RevealHeader align="center" className="mb-10">
            <span className="section-label">Our Values</span>
            <h2>What we stand for</h2>
          </RevealHeader>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card card-hover h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                    <Icon name={v.icon} className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="text-base">{v.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <CtaBanner
        title="Ready to book?"
        description="Get started online in minutes or contact our friendly team for a free quote."
      />
    </>
  );
}
