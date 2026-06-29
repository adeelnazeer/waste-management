import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { AnimatedSection, FadeIn } from "@/components/scroll-fade";

export const metadata: Metadata = {
  title: "Book a Service",
  description: "Book skip hire, collections, demolition and more online in minutes.",
};

export default function BookPage() {
  return (
    <>
      <AnimatedSection className="gradient-hero text-white">
        <FadeIn immediate variant="fade-up" className="container-narrow px-4 py-10 md:px-8">
          <h1 className="!text-white">Book a Service</h1>
          <p className="mt-2 text-white/70">
            Complete your booking in a few simple steps — it takes under three minutes.
          </p>
        </FadeIn>
      </AnimatedSection>
      <AnimatedSection className="bg-surface-muted">
        <FadeIn delay={0.08}>
          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-brand" />
              </div>
            }
          >
            <BookingWizard />
          </Suspense>
        </FadeIn>
      </AnimatedSection>
    </>
  );
}
