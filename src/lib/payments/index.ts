import { mercadoPago } from "./mercadopago";
import { stripe } from "./stripe";
import type { Order, PaymentProvider } from "./types";

// Sem gateway configurado: o pedido é confirmado e o cliente finaliza via PIX/WhatsApp.
const manual: PaymentProvider = {
  name: "manual",
  async createPayment(order: Order) {
    return { type: "manual", orderId: order.id };
  },
};

const providers: Record<string, PaymentProvider> = {
  manual,
  mercadopago: mercadoPago,
  stripe,
};

export function getPaymentProvider(): PaymentProvider {
  const name = process.env.PAYMENT_PROVIDER ?? "manual";
  const provider = providers[name];
  if (!provider) throw new Error(`PAYMENT_PROVIDER inválido: ${name}`);
  return provider;
}

export * from "./types";
