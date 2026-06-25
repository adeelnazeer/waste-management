import Link from "next/link";
import { Phone } from "lucide-react";

type CtaBannerProps = {
  icon?: string;
  title: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  variant?: "green" | "dark";
};

export function CtaBanner({
  icon,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  variant = "green",
}: CtaBannerProps) {
  const isGreen = variant === "green";

  return (
    <section
      className={`section-padding ${isGreen ? "bg-brand" : "gradient-hero"} text-white`}
    >
      <div className="container-narrow text-center">
        {icon && <span className="mb-4 block text-4xl">{icon}</span>}
        <h2 className="!text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ctaPrimary.href}
            className={isGreen ? "btn-dark" : "btn-primary"}
          >
            {ctaPrimary.label}
          </Link>
          {ctaSecondary && (
            <a
              href={ctaSecondary.href}
              className="btn-secondary flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              {ctaSecondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
