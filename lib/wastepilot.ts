/**
 * WastePilot integration layer.
 *
 * These functions are the single place that talks to the WastePilot REST API.
 * They currently return mocked data so the UI works end-to-end without
 * credentials. Wire them to the live API by setting the env vars below and
 * replacing the mock bodies with real `fetch` calls.
 *
 *   WASTEPILOT_API_BASE_URL
 *   WASTEPILOT_API_KEY
 */

export type Availability = {
  postcode: string;
  covered: boolean;
  sameDay: boolean;
  nextDay: boolean;
  message: string;
};

export type PriceQuote = {
  serviceSlug: string;
  optionName: string;
  basePrice: number;
  charges: { label: string; amount: number }[];
  total: number;
};

export type BookingPayload = {
  serviceSlug: string;
  answers: Record<string, string>;
  address: {
    line1: string;
    city: string;
    postcode: string;
  };
  date: string;
  timeSlot: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
};

const COVERED_PREFIXES = ["LE", "B", "NG", "CV", "DE", "S", "M", "NN", "EN", "WD", "LU", "MK", "RG"];

export async function checkAvailability(postcode: string): Promise<Availability> {
  const clean = postcode.trim().toUpperCase();
  const prefix = clean.replace(/[0-9].*$/, "");
  const covered = COVERED_PREFIXES.includes(prefix);
  const sameDay = ["LE", "B", "NG", "CV", "NN"].includes(prefix);

  // TODO: replace with `GET ${BASE}/coverage?postcode=...`
  return {
    postcode: clean,
    covered,
    sameDay: covered && sameDay,
    nextDay: covered,
    message: covered
      ? `Great news — we cover ${clean}.`
      : `We don't currently cover ${clean}. Contact us and we'll see what we can do.`,
  };
}

export async function getPriceQuote(
  serviceSlug: string,
  optionName: string,
  basePrice: number
): Promise<PriceQuote> {
  // TODO: replace with `POST ${BASE}/pricing`
  const charges = [{ label: "VAT (20%)", amount: Math.round(basePrice * 0.2 * 100) / 100 }];
  const total = basePrice + charges.reduce((sum, c) => sum + c.amount, 0);
  return { serviceSlug, optionName, basePrice, charges, total };
}

export async function createBooking(
  payload: BookingPayload
): Promise<{ id: string; status: string }> {
  // TODO: replace with `POST ${BASE}/bookings`
  return {
    id: `WP-${Date.now().toString(36).toUpperCase()}`,
    status: "pending_payment",
  };
}
