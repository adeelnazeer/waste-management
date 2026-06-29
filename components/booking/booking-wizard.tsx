"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { Icon } from "@/components/icon";
import { services, formatPrice, type Service } from "@/lib/content";
import { createBooking } from "@/lib/wastepilot";
import { startCheckout } from "@/lib/stripe";

const STEPS = [
  "Service",
  "Details",
  "Address",
  "Date & Time",
  "Review",
  "Your Info",
  "Payment",
];

const TIME_SLOTS = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–6pm)"];

type Option = Service["content"]["options"][number];

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("service") ?? "";

  const [step, setStep] = useState(initialSlug ? 1 : 0);
  const [slug, setSlug] = useState(initialSlug);
  const [option, setOption] = useState<Option | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [address, setAddress] = useState({ line1: "", city: "", postcode: "" });
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  const vat = option ? Math.round(option.price * 0.2 * 100) / 100 : 0;
  const total = option ? option.price + vat : 0;

  const canContinue = (() => {
    switch (step) {
      case 0:
        return Boolean(service && option);
      case 1:
        return service ? service.workflow.steps.every((s) => answers[s]?.trim()) : false;
      case 2:
        return address.line1.trim() && address.city.trim() && address.postcode.trim();
      case 3:
        return date && timeSlot;
      case 4:
        return true;
      case 5:
        return (
          customer.name.trim() &&
          /\S+@\S+\.\S+/.test(customer.email) &&
          customer.phone.trim()
        );
      default:
        return true;
    }
  })();

  async function handlePay() {
    if (!service || !option) return;
    setSubmitting(true);
    const booking = await createBooking({
      serviceSlug: service.slug,
      answers,
      address,
      date,
      timeSlot,
      customer,
    });
    const { url } = await startCheckout(booking.id, [
      { name: `${service.title} – ${option.name}`, amount: total, quantity: 1 },
    ]);
    router.push(url);
  }

  return (
    <div className="container-narrow px-4 py-10 md:px-8">
      {/* Stepper */}
      <ol className="mb-10 flex flex-wrap items-center gap-2">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  done
                    ? "bg-brand text-white"
                    : active
                    ? "bg-black text-white"
                    : "bg-surface-muted text-text-muted"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  active ? "text-black" : "text-text-muted"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px w-4 bg-line" />}
            </li>
          );
        })}
      </ol>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 0: Select Service */}
          {step === 0 && (
            <Panel title="Select a service" subtitle="Choose what you'd like to book.">
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => {
                      setSlug(s.slug);
                      setOption(null);
                    }}
                    className={`card flex items-center gap-3 p-4 text-left transition-all ${
                      slug === s.slug ? "border-brand ring-2 ring-brand/20" : "hover:border-brand/40"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                      <Icon name={s.icon} className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="text-xs text-text-muted">from {formatPrice(s.fromPrice)}</p>
                    </div>
                  </button>
                ))}
              </div>

              {service && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold">Choose an option</p>
                  <div className="space-y-2">
                    {service.content.options.map((opt) => (
                      <button
                        key={opt.name}
                        onClick={() => setOption(opt)}
                        className={`card flex w-full items-center justify-between p-4 text-left transition-all ${
                          option?.name === opt.name
                            ? "border-brand ring-2 ring-brand/20"
                            : "hover:border-brand/40"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold">{opt.name}</p>
                          <p className="text-xs text-text-muted">{opt.description}</p>
                        </div>
                        <span className="shrink-0 font-extrabold text-brand">
                          {formatPrice(opt.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Panel>
          )}

          {/* Step 1: Service Questions */}
          {step === 1 && service && (
            <Panel title={service.workflow.title} subtitle="Tell us a few details about the job.">
              <div className="space-y-4">
                {service.workflow.steps.map((q) => (
                  <QuestionField
                    key={q}
                    label={q}
                    value={answers[q] ?? ""}
                    onChange={(v) => setAnswers((a) => ({ ...a, [q]: v }))}
                  />
                ))}
              </div>
            </Panel>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <Panel title="Delivery / collection address" subtitle="Where should we come?">
              <div className="space-y-4">
                <Field label="Address line">
                  <input
                    className="input-field"
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    placeholder="House number and street"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Town / City">
                    <input
                      className="input-field"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                    />
                  </Field>
                  <Field label="Postcode">
                    <input
                      className="input-field uppercase"
                      value={address.postcode}
                      onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                      placeholder="Postcode"
                    />
                  </Field>
                </div>
              </div>
            </Panel>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <Panel title="Choose a date & time" subtitle="Pick a slot that works for you.">
              <div className="space-y-5">
                <Field label="Preferred date">
                  <input
                    type="date"
                    className="input-field"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Field>
                <Field label="Time slot">
                  <div className="grid gap-2 sm:grid-cols-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`card p-3 text-sm transition-all ${
                          timeSlot === slot
                            ? "border-brand ring-2 ring-brand/20"
                            : "hover:border-brand/40"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </Panel>
          )}

          {/* Step 4: Review */}
          {step === 4 && service && option && (
            <Panel title="Review your order" subtitle="Check everything looks right.">
              <dl className="divide-y divide-line text-sm">
                <Row label="Service" value={`${service.title} – ${option.name}`} />
                {Object.entries(answers).map(([k, v]) => (
                  <Row key={k} label={k} value={v} />
                ))}
                <Row label="Address" value={`${address.line1}, ${address.city}, ${address.postcode}`} />
                <Row label="Date" value={date} />
                <Row label="Time" value={timeSlot} />
              </dl>
            </Panel>
          )}

          {/* Step 5: Customer Info */}
          {step === 5 && (
            <Panel title="Your information" subtitle="So we can confirm your booking.">
              <div className="space-y-4">
                <Field label="Full name">
                  <input
                    className="input-field"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email">
                    <input
                      type="email"
                      className="input-field"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      type="tel"
                      className="input-field"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="Phone number"
                    />
                  </Field>
                </div>
              </div>
            </Panel>
          )}

          {/* Step 6: Payment */}
          {step === 6 && service && option && (
            <Panel title="Payment" subtitle="Secure checkout powered by Stripe.">
              <div className="card flex items-start gap-3 bg-surface-muted p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm text-text-muted">
                  You'll be redirected to Stripe to pay securely with card, Apple Pay or Google
                  Pay. We never store your card details.
                </p>
              </div>
              <button
                onClick={handlePay}
                disabled={submitting}
                className="btn-primary mt-5 w-full"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay {formatPrice(total)}
                  </>
                )}
              </button>
            </Panel>
          )}

          {/* Nav buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-ghost !py-2.5 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            {step < 6 && (
              <button
                onClick={() => canContinue && setStep((s) => s + 1)}
                disabled={!canContinue}
                className="btn-primary !py-2.5 disabled:opacity-40"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <aside>
          <div className="sticky top-28 card p-6">
            <h3 className="text-base">Order Summary</h3>
            <div className="divider-accent !mx-0 mt-3" />
            {service && option ? (
              <>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft">
                    <Icon name={service.icon} className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{service.title}</p>
                    <p className="text-xs text-text-muted">{option.name}</p>
                  </div>
                </div>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Subtotal</dt>
                    <dd>{formatPrice(option.price)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-muted">VAT (20%)</dt>
                    <dd>{formatPrice(vat)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-2 text-base font-extrabold">
                    <dt>Total</dt>
                    <dd className="text-brand">{formatPrice(total)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="mt-4 text-sm text-text-muted">
                Select a service to see your price.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function QuestionField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isYesNo = label.trim().endsWith("?");
  const isPhotos = /photo|upload/i.test(label);

  return (
    <Field label={label}>
      {isYesNo ? (
        <select className="input-field" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      ) : isPhotos ? (
        <input
          type="file"
          multiple
          accept="image/*"
          className="input-field"
          onChange={(e) =>
            onChange(e.target.files?.length ? `${e.target.files.length} photo(s) attached` : "")
          }
        />
      ) : (
        <input
          className="input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your answer"
        />
      )}
    </Field>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="text-text-muted">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
