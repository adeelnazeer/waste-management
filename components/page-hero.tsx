import Link from "next/link";
import { AnimatedSection, FadeIn } from "@/components/scroll-fade";

type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  subtitle,
  label,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  label?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <AnimatedSection className="gradient-hero relative overflow-hidden text-white">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
      <FadeIn immediate variant="fade-up" className="container-narrow relative px-4 py-14 md:px-8 md:py-20">
        {breadcrumbs && (
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-white/50">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-light">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {label && <span className="section-label !text-brand-light">{label}</span>}
        <h1 className="!text-white">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>}
      </FadeIn>
    </AnimatedSection>
  );
}
