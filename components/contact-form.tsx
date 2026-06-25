"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { form } = contact;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-brand bg-brand-soft p-8 text-center">
        <h3 className="mb-2 text-xl text-brand">Thank You!</h3>
        <p className="text-text-muted">
          Your enquiry has been received. Our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {form.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={form.fields.name.placeholder}
            className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {form.fields.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={form.fields.email.placeholder}
            className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            {form.fields.phone.label}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={form.fields.phone.placeholder}
            className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
            {form.fields.service.label}
          </label>
          <select
            id="service"
            name="service"
            className="w-full rounded-md border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="">Select a service</option>
            {form.fields.service.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {form.fields.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={form.fields.message.placeholder}
          className="w-full resize-none rounded-md border border-black/10 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      <button type="submit" className="btn-primary">
        <Send className="h-4 w-4" />
        {form.submitLabel}
      </button>
    </form>
  );
}
