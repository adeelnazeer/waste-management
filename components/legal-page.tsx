import { PageHero } from "@/components/page-hero";

type LegalContent = {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: content.title }]}
      />
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl space-y-8">
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl">{s.heading}</h2>
              <p className="mt-3 text-text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
