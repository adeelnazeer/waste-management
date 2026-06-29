import Link from "next/link";
import { Phone } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/scroll-fade";
import { site } from "@/lib/content";

export function CtaBanner({
  title,
  description,
  ctaPrimary = { label: "Book a Service", href: "/book" },
}: {
  title: string;
  description: string;
  ctaPrimary?: { label: string; href: string };
}) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  return (
    <AnimatedSection className="bg-brand">
      <FadeIn className="container-narrow flex flex-col items-center justify-between gap-6 px-4 py-12 text-center md:flex-row md:px-8 md:text-left">
        <div>
          <h2 className="!text-white">{title}</h2>
          <p className="mt-2 max-w-xl text-white/90">{description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <Link href={ctaPrimary.href} className="btn-dark">
            {ctaPrimary.label}
          </Link>
          <a href={telHref} className="btn-secondary !border-white">
            <Phone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
        </div>
      </FadeIn>
    </AnimatedSection>
  );
}
