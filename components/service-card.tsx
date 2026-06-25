import type { ElementType } from "react";
import Link from "next/link";
import {
  Truck,
  Container,
  Clock,
  Building2,
  Shovel,
  HardHat,
  Package,
  Van,
} from "lucide-react";
import type { Service } from "@/lib/content";

const iconMap: Record<string, ElementType> = {
  "skip-hire": Truck,
  "roro-hire": Container,
  "wait-and-load": Clock,
  "third-party-tipping": Building2,
  "grab-loader-muckaway": Shovel,
  "site-clearance": HardHat,
  "trade-waste": Package,
  "caged-van-hire": Van,
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.slug] ?? Truck;
  const href = service.ctaSecondary.href;

  return (
    <article className="card-hover flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-brand-soft to-white">
        <Icon className="h-16 w-16 text-brand" strokeWidth={1.5} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl">{service.title}</h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-text-muted">
          {service.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href={service.ctaPrimary.href} className="btn-primary !px-5 !py-2.5 !text-xs">
            {service.ctaPrimary.label}
          </Link>
          {href.startsWith("/services/") && (
            <Link href={href} className="btn-outline !px-5 !py-2.5 !text-xs">
              {service.ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
