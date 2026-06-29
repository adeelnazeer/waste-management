/**
 * Stripe Checkout integration layer.
 *
 * Payments are handled directly by Stripe Checkout (not via WastePilot).
 * In production, create a Checkout Session on the server using your secret key
 * and redirect the customer to `session.url`. Use Stripe webhooks to confirm
 * payment success/failure and trigger invoice + confirmation emails.
 *
 *   STRIPE_SECRET_KEY
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 *   STRIPE_WEBHOOK_SECRET
 */

export type CheckoutLineItem = {
  name: string;
  amount: number;
  quantity: number;
};

export async function startCheckout(
  bookingId: string,
  items: CheckoutLineItem[]
): Promise<{ url: string }> {
  // TODO: call your API route which creates a Stripe Checkout Session, e.g.
  //   const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ bookingId, items }) });
  //   const { url } = await res.json();
  //   return { url };
  const total = items.reduce((sum, i) => sum + i.amount * i.quantity, 0);
  const params = new URLSearchParams({ booking: bookingId, amount: String(total) });
  return { url: `/book/confirmation?${params.toString()}` };
}
