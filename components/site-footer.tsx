import Link from "next/link";
import { Phone, Mail, MapPin, Recycle } from "lucide-react";
import { site } from "@/lib/content";

export function SiteFooter() {
  const { address } = site;
  const fullAddress = `${address.line1}, ${address.line2}, ${address.city}, ${address.county}, ${address.postcode}`;

  return (
    <footer className="bg-black text-white">
      <div className="border-b border-white/10 bg-brand py-4">
        <div className="container-narrow flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
          <p className="text-center text-sm font-semibold md:text-left">
            Call us today for same-day skip delivery
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="btn-dark !bg-white !text-black hover:!bg-white/90">
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-secondary">
              Order Your Skip Now
            </Link>
          </div>
        </div>
      </div>

      <div className="section-padding !py-12">
        <div className="container-narrow grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand">
                <Recycle className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">{site.name}</span>
            </div>
            <p className="mb-4 text-sm text-white/60">{site.description}</p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {fullAddress}
              </p>
              <p>{site.hours.weekdays}</p>
              <p>{site.hours.saturday}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand">
              The Company
            </h4>
            <ul className="space-y-2">
              {site.footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand">
              Our Services
            </h4>
            <ul className="space-y-2">
              {site.footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 px-4 text-center text-xs text-white/50 md:flex-row md:px-8 md:text-left">
          <p>© {new Date().getFullYear()} {site.name} Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            {site.footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
