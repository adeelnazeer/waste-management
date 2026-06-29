"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { contact } from "@/lib/content";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card border-brand/30 bg-brand-soft p-8 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-brand" />
        <h3 className="text-xl text-brand-dark">Thank you!</h3>
        <p className="mt-2 text-text-muted">
          Your message has been received. Our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name</label>
          <input id="name" name="name" required placeholder="Your full name" className="input-field" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email Address</label>
          <input id="email" name="email" type="email" required placeholder="your@email.com" className="input-field" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone Number</label>
          <input id="phone" name="phone" type="tel" placeholder="Your phone number" className="input-field" />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium">Service</label>
          <select id="service" name="service" className="input-field">
            <option value="">Select a service</option>
            {contact.form.services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your project and requirements..."
          className="input-field resize-none"
        />
      </div>
      <button type="submit" className="btn-primary">
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}
