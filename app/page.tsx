import Link from "next/link";
import { Phone, CheckCircle } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { CtaBanner } from "@/components/cta-banner";
import {
  site,
  home,
  featuredServices,
  testimonials,
  blog,
} from "@/lib/content";

export default function HomePage() {
  const { hero, intro, servicesSection, quoteCta, whyChoose, localCompany, contactBanner } =
    home;

  return (
    <>
      <section className="gradient-hero relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand" />
          <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-brand" />
        </div>
        <div className="container-narrow relative section-padding">
          <span className="section-label !text-brand-light">{hero.label}</span>
          <h1 className="!text-white">{hero.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={hero.ctaPrimary.href} className="btn-primary">
              {hero.ctaPrimary.label}
            </Link>
            <span className="text-white/50">or</span>
            <a
              href={hero.ctaSecondary.href}
              className="flex items-center gap-2 text-lg font-semibold text-white hover:text-brand-light"
            >
              <Phone className="h-5 w-5" />
              {hero.ctaSecondary.label}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-brand/40 bg-brand/20 px-4 py-1.5 text-sm font-medium text-brand-light"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-label">{intro.label}</span>
              <h2>{intro.title}</h2>
              <div className="divider-accent !mx-0 mt-4" />
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="rounded-lg bg-brand p-8 text-white">
              <p className="text-2xl font-bold italic">{intro.tagline}</p>
              <div className="mt-6 space-y-3">
                {site.highlights.slice(0, 5).map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <span className="section-label">{servicesSection.label}</span>
            <h2>{servicesSection.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">
              {servicesSection.description}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        icon={quoteCta.icon}
        title={quoteCta.title}
        description={quoteCta.description}
        ctaPrimary={quoteCta.ctaPrimary}
        ctaSecondary={quoteCta.ctaSecondary}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <span className="section-label">{home.testimonialsSection.label}</span>
            <h2>{home.testimonialsSection.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-lg border border-black/10 bg-surface-muted p-6"
              >
                <p className="mb-4 text-text-muted italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="font-semibold text-brand">{t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-narrow grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label">{whyChoose.label}</span>
            <h2>{whyChoose.title}</h2>
            <div className="mt-6 space-y-4">
              {whyChoose.points.map((point, i) => (
                <p key={i} className="text-text-muted leading-relaxed">
                  {point}
                </p>
              ))}
            </div>
            <Link href={whyChoose.cta.href} className="btn-primary mt-8">
              {whyChoose.cta.label}
            </Link>
          </div>
          <div className="rounded-lg bg-black p-8 text-white">
            <h3 className="!text-white mb-6">{localCompany.title}</h3>
            <ul className="space-y-3">
              {site.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={localCompany.cta.href} className="btn-primary mt-8">
              {localCompany.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <span className="section-label">{home.blogSection.label}</span>
            <h2>{home.blogSection.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {blog.map((post) => (
              <article
                key={post.slug}
                className="card-hover rounded-lg border border-black/10 bg-white p-6"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  {post.category}
                </span>
                <h3 className="mt-2 text-lg leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-text-muted line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-black/50">{post.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={contactBanner.title}
        description={contactBanner.description}
        ctaPrimary={contactBanner.cta}
        variant="dark"
      />
    </>
  );
}
