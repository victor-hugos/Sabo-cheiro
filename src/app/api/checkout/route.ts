import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { couponRate, normalizeCoupon, orderTotals } from "@/lib/format";
import { getPaymentProvider, type Address, type Customer, type Order, type PaymentMethod } from "@/lib/payments";
import { saveOrder } from "@/lib/orders/store";

type Body = {
  customer: Customer;
  address: Address;
  items: { id: string; quantity: number }[];
  paymentMethod: PaymentMethod;
  coupon?: string;
};

const round = (n: number) => Math.round(n * 100) / 100;

function validCpf(raw: string) {
  const cpf = raw.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  for (const len of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    const digit = ((sum * 10) % 11) % 10;
    if (digit !== Number(cpf[len])) return false;
  }
  return true;
}

function validate(body: Body): string | null {
  const c = body?.customer;
  const a = body?.address;
  if (!c?.name || c.name.trim().split(" ").length < 2) return "Informe nome e sobrenome.";
  if (!c.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return "E-mail inválido.";
  if (!c.phone || c.phone.replace(/\D/g, "").length < 10) return "Telefone inválido.";
  if (!validCpf(c.cpf ?? "")) return "CPF inválido.";
  if (!a?.cep || a.cep.replace(/\D/g, "").length !== 8) return "CEP inválido.";
  if (!a.street || !a.number || !a.district || !a.city || !a.state) return "Endereço incompleto.";
  if (!Array.isArray(body.items) || body.items.length === 0) return "Carrinho vazio.";
  if (!["pix", "card", "boleto"].includes(body.paymentMethod)) return "Forma de pagamento inválida.";
  if (normalizeCoupon(body.coupon) && !couponRate(body.coupon)) return "Cupom inválido.";
  return null;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const error = validate(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  // Preços SEMPRE vêm do catálogo do servidor, nunca do navegador.
  const items = [];
  for (const line of body.items) {
    const product = getProductById(line.id);
    const quantity = Math.floor(Number(line.quantity));
    if (!product || !(quantity > 0)) {
      return NextResponse.json({ error: "Produto inválido no carrinho." }, { status: 400 });
    }
    if (quantity > product.stock) {
      return NextResponse.json({ error: `Estoque insuficiente para ${product.name}.` }, { status: 400 });
    }
    items.push({ id: product.id, name: product.name, unitPrice: product.price, quantity });
  }

  const subtotal = round(items.reduce((s, i) => s + i.unitPrice * i.quantity, 0));
  const coupon = normalizeCoupon(body.coupon) || undefined;
  const totals = orderTotals(subtotal, body.paymentMethod, coupon);

  const order: Order = {
    id: `SC${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    customer: body.customer,
    address: body.address,
    items,
    subtotal,
    coupon,
    ...totals,
    paymentMethod: body.paymentMethod,
  };

  await saveOrder(order);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  try {
    const result = await getPaymentProvider().createPayment(order, siteUrl);
    return NextResponse.json({ order, payment: result });
  } catch (e) {
    console.error("[checkout] erro no gateway", e);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento. Tente novamente em instantes." },
      { status: 502 },
    );
  }
}
