"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Star, ShieldCheck } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { PostcodeChecker } from "@/components/postcode-checker";
import { UkMap } from "@/components/uk-map";
import { Icon } from "@/components/icon";
import {
  AnimatedSection,
  FadeIn,
  RevealHeader,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-fade";
import { site, home, services, testimonials, areas } from "@/lib/content";

export default function HomePage() {
  const { hero, servicesSection, whyChoose, about, reviewsSection, finalCta } = home;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <AnimatedSection className="gradient-hero relative overflow-hidden text-white">
        <div className="container-narrow relative grid items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
          <FadeIn immediate variant="fade-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-4 py-1.5 text-xs font-semibold text-brand-light">
              <ShieldCheck className="h-4 w-4" />
              {hero.badge}
            </span>
            <h1 className="mt-5 !text-white">
              {hero.titleStart} <br />
              <span className="text-brand-light">{hero.titleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/70">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={hero.ctaPrimary.href} className="btn-primary">
                {hero.ctaPrimary.label}
              </Link>
              <Link href={hero.ctaSecondary.href} className="btn-secondary">
                {hero.ctaSecondary.label}
              </Link>
            </div>
          </FadeIn>

          <FadeIn immediate variant="fade-left" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={hero.image}
                alt="Green waste management collection truck"
                width={900}
                height={600}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <StaggerContainer className="container-narrow grid grid-cols-2 gap-px border-t border-white/10 bg-black/40 px-4 md:px-8 lg:grid-cols-4">
          {hero.trustBadges.map((b) => (
            <StaggerItem key={b.title}>
              <div className="flex items-center gap-3 py-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/15">
                  <Icon name={b.icon} className="h-5 w-5 text-brand-light" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.title}</p>
                  <p className="text-xs text-white/50">{b.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-surface-muted">
        <div className="container-narrow">
          <RevealHeader className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="section-label">{servicesSection.label}</span>
              <h2>{servicesSection.title}</h2>
              <p className="mt-3 max-w-xl text-text-muted">{servicesSection.description}</p>
            </div>
            <Link href="/services" className="btn-ghost shrink-0 !py-2.5 !text-sm">
              All Services
            </Link>
          </RevealHeader>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <RevealHeader align="center" className="mb-10">
            <span className="section-label">{whyChoose.label}</span>
            <h2>{whyChoose.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">{whyChoose.description}</p>
          </RevealHeader>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {whyChoose.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card card-hover h-full p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                    <Icon name={item.icon} className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="text-base">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-surface-muted">
        <div className="container-narrow grid items-center gap-12 lg:grid-cols-2">
          <FadeIn variant="fade-right">
            <span className="section-label">{about.label}</span>
            <h2>{about.title}</h2>
            <div className="divider-accent !mx-0 mt-4" />
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-text-muted leading-relaxed">
                {p}
              </p>
            ))}
            <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div>
                    <p className="text-2xl font-extrabold text-brand md:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs text-text-muted">{s.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <Link href={about.cta.href} className="btn-primary mt-8">
              {about.cta.label}
            </Link>
          </FadeIn>

          <FadeIn variant="fade-left" delay={0.1}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-line shadow-lg">
                <Image
                  src={hero.image}
                  alt="Eco-friendly waste collection"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-xl bg-brand px-6 py-4 text-white shadow-xl">
                <p className="text-3xl font-extrabold">{about.badge.value}</p>
                <p className="text-xs font-medium text-white/80">{about.badge.label}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow grid items-center gap-12 lg:grid-cols-2">
          <FadeIn variant="fade-up">
            <span className="section-label">{home.areas.label}</span>
            <h2>{home.areas.title}</h2>
            <p className="mt-3 text-text-muted">{home.areas.description}</p>
            <div className="mt-6 max-w-md">
              <PostcodeChecker />
            </div>
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-black">Popular Areas</p>
              <StaggerContainer className="flex flex-wrap gap-2">
                {areas.popular.slice(0, 8).map((a) => (
                  <StaggerItem key={a.name}>
                    <span className="inline-block rounded-full border border-line bg-surface-muted px-3 py-1.5 text-sm text-text-muted">
                      {a.name}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <Link href="/areas" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
                View all areas →
              </Link>
            </div>
          </FadeIn>
          <FadeIn variant="fade-left" delay={0.12}>
            <UkMap />
          </FadeIn>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-surface-muted">
        <div className="container-narrow">
          <RevealHeader align="center" className="mb-10">
            <span className="section-label">{reviewsSection.label}</span>
            <h2>{reviewsSection.title}</h2>
          </RevealHeader>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <blockquote className="card h-full p-6">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-text-muted">&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <p className="text-sm font-semibold text-black">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.location}</p>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-brand">
        <FadeIn className="container-narrow flex flex-col items-center justify-between gap-6 px-4 py-12 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <h2 className="!text-white">{finalCta.title}</h2>
            <p className="mt-2 max-w-xl text-white/90">{finalCta.description}</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link href={finalCta.ctaPrimary.href} className="btn-dark">
              {finalCta.ctaPrimary.label}
            </Link>
            <a href={telHref} className="btn-secondary !border-white">
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </FadeIn>
      </AnimatedSection>
    </>
  );
}
