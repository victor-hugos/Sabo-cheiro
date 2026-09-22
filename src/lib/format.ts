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
  return subtotal > 0 ? site.flatShipping : 0;
}

const round = (n: number) => Math.round(n * 100) / 100;

export function normalizeCoupon(code: string | undefined | null) {
  return (code ?? "").trim().toUpperCase();
}

export function couponRate(code: string | undefined | null) {
  return site.coupons[normalizeCoupon(code)] ?? 0;
}

// Cálculo único dos totais, usado no navegador (resumo) e no servidor (valor cobrado).
export function orderTotals(subtotal: number, paymentMethod: string, coupon?: string | null) {
  const shipping = shippingFor(subtotal);
  const couponDiscount = round(subtotal * couponRate(coupon));
  const pixDiscount = paymentMethod === "pix" ? round((subtotal - couponDiscount) * site.pixDiscount) : 0;
  const discount = round(couponDiscount + pixDiscount);
  return { shipping, couponDiscount, pixDiscount, discount, total: round(subtotal + shipping - discount) };
}
