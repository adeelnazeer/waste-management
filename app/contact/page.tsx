import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for quotes and enquiries. Call ${site.phoneDisplay} or use our enquiry form.`,
};

export default function ContactPage() {
  const { address, company, hours } = site;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <PageHero
        title={contact.hero.title}
        subtitle={contact.hero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-2">{contact.form.title}</h2>
            <p className="mb-8 text-text-muted">{contact.form.description}</p>
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-6">Get in touch</h2>
            <div className="space-y-5">
              <ContactItem icon={<Phone className="h-5 w-5 text-brand" />} label="Call Us">
                <a href={telHref} className="hover:text-brand">{site.phoneDisplay}</a>
              </ContactItem>
              <ContactItem icon={<Mail className="h-5 w-5 text-brand" />} label="Email Us">
                <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
              </ContactItem>
              <ContactItem icon={<MapPin className="h-5 w-5 text-brand" />} label="Visit Us">
                {address.line1}, {address.line2}, {address.city}, {address.county}, {address.postcode}
              </ContactItem>
              <ContactItem icon={<Clock className="h-5 w-5 text-brand" />} label="Opening Hours">
                {hours.weekdays}<br />{hours.saturday}<br />{hours.sunday}
              </ContactItem>
              <ContactItem icon={<Building2 className="h-5 w-5 text-brand" />} label="Company Details">
                Company No. {company.registrationNumber}<br />
                Waste Carrier Licence {company.wasteCarrierLicence}<br />
                VAT {company.vat}
              </ContactItem>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-line">
              <iframe
                title="Our location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${address.line1}, ${address.city}, ${address.postcode}`
                )}&output=embed`}
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm text-text-muted">{children}</p>
      </div>
    </div>
  );
}
