import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { PostcodeChecker } from "@/components/postcode-checker";
import { UkMap } from "@/components/uk-map";
import { areas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description:
    "We provide waste management across the UK including Leicester, Birmingham, London, Manchester, Nottingham and Coventry.",
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        title={areas.hero.title}
        subtitle={areas.hero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Areas We Cover" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2>Check your postcode</h2>
            <p className="mt-3 text-text-muted">{areas.description}</p>
            <div className="mt-6 max-w-md">
              <PostcodeChecker />
            </div>

            <h3 className="mb-3 mt-10">Popular locations</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {areas.popular.map((a) => (
                <div key={a.name} className="card flex items-center justify-between p-3">
                  <span className="text-sm font-medium">{a.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      a.availability === "same-day"
                        ? "bg-brand text-white"
                        : "bg-black text-white"
                    }`}
                  >
                    {a.availability === "same-day" ? "Same-day" : "Next-day"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <UkMap />
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <span className="section-label">Our Coverage Map</span>
            <h2>Find us across the UK</h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">
              Explore the areas we serve on the interactive map below.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
            <iframe
              title="Areas we cover across the UK"
              src="https://www.google.com/maps?q=United+Kingdom&z=5&output=embed"
              className="h-[460px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <span className="section-label">Coverage</span>
            <h2>Regions we serve</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.regions.map((r) => (
              <div key={r.name} className="card p-6">
                <h3 className="text-base text-brand">{r.name}</h3>
                <ul className="mt-3 space-y-1.5">
                  {r.cities.map((c) => (
                    <li key={c} className="text-sm text-text-muted">{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Available in your area?"
        description="Book online now for fast, reliable collection — same-day and next-day options available."
      />
    </>
  );
}
