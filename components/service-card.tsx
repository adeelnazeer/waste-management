import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { formatPrice, type Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-soft to-white">
        <Icon name={service.icon} className="h-14 w-14 text-brand" strokeWidth={1.5} />
        <span className="absolute right-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
          From {formatPrice(service.fromPrice)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
          {service.shortDescription}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/book?service=${service.slug}`}
            className="btn-primary flex-1 !py-2.5 !text-sm"
          >
            Book Now
          </Link>
          <Link
            href={`/services/${service.slug}`}
            className="btn-ghost !px-3 !py-2.5"
            aria-label={`More about ${service.title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
