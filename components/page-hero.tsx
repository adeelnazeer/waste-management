import Link from "next/link";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  label?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHero({ title, subtitle, label, breadcrumbs }: PageHeroProps) {
  return (
    <section className="gradient-hero relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-brand" />
      </div>
      <div className="container-narrow relative section-padding !pb-12 !pt-16 md:!pt-20">
        {breadcrumbs && (
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-white/60">
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
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
