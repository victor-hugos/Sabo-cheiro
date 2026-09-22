import type { Order, PaymentProvider } from "./types";

// Stripe Checkout (cartão, PIX e boleto quando habilitados na conta).
// Docs: https://docs.stripe.com/api/checkout/sessions/create
export const stripe: PaymentProvider = {
  name: "stripe",
  async createPayment(order: Order, siteUrl: string) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY não configurado");

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("client_reference_id", order.id);
    params.set("customer_email", order.customer.email);
    params.set("success_url", `${siteUrl}/pedido/sucesso?pedido=${order.id}`);
    params.set("cancel_url", `${siteUrl}/pedido/falha?pedido=${order.id}`);
    params.set("metadata[order_id]", order.id);

    const lines = [...order.items];
    if (order.shipping > 0) lines.push({ id: "FRETE", name: "Frete", unitPrice: order.shipping, quantity: 1 });
    lines.forEach((item, i) => {
      params.set(`line_items[${i}][quantity]`, String(item.quantity));
      params.set(`line_items[${i}][price_data][currency]`, "brl");
      params.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round(item.unitPrice * 100)));
      params.set(`line_items[${i}][price_data][product_data][name]`, item.name);
    });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": order.id,
      },
      body: params,
    });

    if (!res.ok) throw new Error(`Stripe: ${res.status} ${await res.text()}`);
    const data = (await res.json()) as { url: string };
    return { type: "redirect", url: data.url };
  },
};
