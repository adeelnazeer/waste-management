import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for skip hire quotes and waste management enquiries. Call ${site.phoneDisplay} or use our enquiry form.`,
};

const iconMap = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={contact.hero.title}
        subtitle={contact.hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-2">{contact.form.title}</h2>
            <p className="mb-8 text-text-muted">{contact.form.description}</p>
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-6">{contact.contactInfo.title}</h2>
            <div className="space-y-6">
              {contact.contactInfo.items.map((item) => {
                const Icon = iconMap[item.type as keyof typeof iconMap];
                return (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-soft">
                      <Icon className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-text-muted hover:text-brand"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-text-muted">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-lg bg-black p-6 text-white">
              <p className="font-semibold">Need a skip today?</p>
              <p className="mt-2 text-sm text-white/60">
                Call us for same-day delivery across London and Surrey.
              </p>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn-primary mt-4 w-full"
              >
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
