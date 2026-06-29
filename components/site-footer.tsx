import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { site } from "@/lib/content";

export function SiteFooter() {
  const { address, company } = site;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  const columns = [
    { title: "Services", links: site.footerLinks.services },
    { title: "Company", links: site.footerLinks.company },
    { title: "Support", links: site.footerLinks.support },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="section-padding !py-14">
        <div className="container-narrow grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src={site.logo}
                alt={site.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-md object-contain"
              />
              <span className="text-base font-extrabold tracking-tight">
                WASTE <span className="text-brand-light">MANAGEMENT</span>
              </span>
            </div>
            <p className="mb-5 max-w-sm text-sm text-white/60">{site.description}</p>
            <div className="flex gap-3">
              {[
                { href: site.social.facebook, Icon: Facebook },
                { href: site.social.instagram, Icon: Instagram },
                { href: site.social.twitter, Icon: Twitter },
                { href: site.social.linkedin, Icon: Linkedin },
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 transition-colors hover:bg-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-light">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
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
          ))}

          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-light">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                <span>
                  {address.line1}, {address.city}, {address.postcode}
                </span>
              </li>
              <li>
                <a href={telHref} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-brand-light" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-brand-light" />
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-xs text-white/40">
                {site.hours.weekdays}
                <br />
                {site.hours.saturday}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 px-4 text-center text-xs text-white/50 md:flex-row md:px-8 md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. Company No. {company.registrationNumber} ·
            Waste Carrier Licence {company.wasteCarrierLicence}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
