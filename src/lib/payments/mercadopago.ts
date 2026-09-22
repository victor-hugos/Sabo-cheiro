import type { Order, PaymentProvider } from "./types";

// Checkout Pro do Mercado Pago (PIX, cartão e boleto na página do Mercado Pago).
// Docs: https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post
export const mercadoPago: PaymentProvider = {
  name: "mercadopago",
  async createPayment(order: Order, siteUrl: string) {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado");

    const [firstName, ...rest] = order.customer.name.trim().split(" ");
    // Com desconto, envia um item único com o valor já descontado (o Mercado Pago não aceita preço negativo).
    const items =
      order.discount > 0
        ? [{
            id: order.id,
            title: `Pedido ${order.id} (${order.items.reduce((s, i) => s + i.quantity, 0)} itens)`,
            quantity: 1,
            unit_price: Math.round((order.subtotal - order.discount) * 100) / 100,
            currency_id: "BRL",
          }]
        : order.items.map((i) => ({ id: i.id, title: i.name, quantity: i.quantity, unit_price: i.unitPrice, currency_id: "BRL" }));

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": order.id,
      },
      body: JSON.stringify({
        external_reference: order.id,
        items,
        shipments: { cost: order.shipping, mode: "not_specified" },
        payer: {
          name: firstName,
          surname: rest.join(" "),
          email: order.customer.email,
          identification: { type: "CPF", number: order.customer.cpf.replace(/\D/g, "") },
        },
        back_urls: {
          success: `${siteUrl}/pedido/sucesso?pedido=${order.id}`,
          pending: `${siteUrl}/pedido/pendente?pedido=${order.id}`,
          failure: `${siteUrl}/pedido/falha?pedido=${order.id}`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/webhooks/mercadopago`,
        statement_descriptor: "SABOCHEIRO",
      }),
    });

    if (!res.ok) throw new Error(`Mercado Pago: ${res.status} ${await res.text()}`);
    const data = (await res.json()) as { init_point: string };
    return { type: "redirect", url: data.init_point };
  },
};
