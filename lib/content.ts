import siteData from "@/data/site.json";
import homeData from "@/data/home.json";
import servicesData from "@/data/services.json";
import aboutData from "@/data/about.json";
import contactData from "@/data/contact.json";
import areasData from "@/data/areas.json";
import testimonialsData from "@/data/testimonials.json";
import blogData from "@/data/blog.json";

export const site = siteData;
export const home = homeData;
export const services = servicesData.services;
export const about = aboutData;
export const contact = contactData;
export const areas = areasData;
export const testimonials = testimonialsData.testimonials;
export const blog = blogData.posts;

export type Service = (typeof servicesData.services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services
    .filter((s) =>
      [
        "skip-hire",
        "roro-hire",
        "wait-and-load",
        "third-party-tipping",
        "grab-loader-muckaway",
      ].includes(s.slug)
    )
    .map((s) => s.slug);
}

export const featuredServices = services.filter((s) =>
  [
    "skip-hire",
    "roro-hire",
    "site-clearance",
    "trade-waste",
    "caged-van-hire",
  ].includes(s.slug)
);
