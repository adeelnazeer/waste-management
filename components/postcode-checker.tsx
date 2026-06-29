"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { checkAvailability, type Availability } from "@/lib/wastepilot";

export function PostcodeChecker() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Availability | null>(null);

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!postcode.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await checkAvailability(postcode);
    setResult(res);
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleCheck} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter your postcode"
            className="input-field !pl-9 uppercase"
            aria-label="Postcode"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Availability"}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 flex items-start gap-3 rounded-lg border p-4 text-sm ${
            result.covered
              ? "border-brand/30 bg-brand-soft text-brand-dark"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.covered ? (
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          )}
          <div>
            <p className="font-semibold">{result.message}</p>
            {result.covered && (
              <p className="mt-1 flex flex-wrap gap-2 text-xs">
                {result.sameDay && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 font-medium text-white">
                    Same-day available
                  </span>
                )}
                {result.nextDay && (
                  <span className="rounded-full bg-black px-2.5 py-0.5 font-medium text-white">
                    Next-day available
                  </span>
                )}
              </p>
            )}
            <Link
              href={result.covered ? "/book" : "/contact"}
              className="mt-2 inline-block font-semibold underline"
            >
              {result.covered ? "Book a service →" : "Contact us →"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
