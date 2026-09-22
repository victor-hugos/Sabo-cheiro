import { site } from "@/data/site";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatPrice(value: number) {
  return brl.format(value);
}

export function installmentText(value: number) {
  const n = Math.max(1, Math.min(site.maxInstallments, Math.floor(value / 10)));
  if (n <= 1) return null;
  return `${n}x de ${formatPrice(value / n)} sem juros`;
}

export function pixPrice(value: number) {
  return Math.round(value * (1 - site.pixDiscount) * 100) / 100;
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= site.freeShippingFrom ? 0 : site.flatShipping;
}
