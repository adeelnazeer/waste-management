import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Mail, Phone } from "lucide-react";
import { AnimatedSection, FadeIn } from "@/components/scroll-fade";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your booking has been confirmed.",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string; amount?: string }>;
}) {
  const { booking, amount } = await searchParams;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <AnimatedSection className="section-padding bg-surface-muted">
      <FadeIn immediate variant="fade-up" className="container-narrow max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
          <CheckCircle className="h-9 w-9 text-brand" />
        </div>
        <h1>Booking confirmed!</h1>
        <p className="mt-3 text-text-muted">
          Thank you for booking with {site.name}. A confirmation email and invoice are on their
          way to your inbox.
        </p>

        <div className="card mt-8 p-6 text-left">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="text-sm text-text-muted">Booking reference</span>
            <span className="font-bold text-black">{booking ?? "WP-PENDING"}</span>
          </div>
          {amount && (
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm text-text-muted">Amount paid</span>
              <span className="font-bold text-brand">£{Number(amount).toFixed(2)}</span>
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-text-muted">
          Need to make a change? Our team is here to help.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <a href={telHref} className="btn-outline">
            <Phone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="btn-ghost">
            <Mail className="h-4 w-4" />
            Email Us
          </a>
        </div>
      </FadeIn>
    </AnimatedSection>
  );
}
