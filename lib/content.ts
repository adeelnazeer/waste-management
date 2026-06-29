import siteData from "@/data/site.json";
import homeData from "@/data/home.json";
import servicesData from "@/data/services.json";
import aboutData from "@/data/about.json";
import contactData from "@/data/contact.json";
import areasData from "@/data/areas.json";
import testimonialsData from "@/data/testimonials.json";
import faqsData from "@/data/faqs.json";
import helpData from "@/data/help.json";
import legalData from "@/data/legal.json";

export const site = siteData;
export const home = homeData;
export const services = servicesData.services;
export const about = aboutData;
export const contact = contactData;
export const areas = areasData;
export const testimonials = testimonialsData.testimonials;
export const faqs = faqsData;
export const help = helpData;
export const legal = legalData;

export type Service = (typeof servicesData.services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}
