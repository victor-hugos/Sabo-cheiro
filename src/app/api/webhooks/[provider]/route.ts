import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders/store";

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

// Mercado Pago: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
async function mercadoPago(req: Request) {
  const url = new URL(req.url);
  const body = await req.json().catch(() => ({}));
  const dataId = url.searchParams.get("data.id") ?? body?.data?.id;
  const type = url.searchParams.get("type") ?? body?.type;

  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (secret) {
    const signature = req.headers.get("x-signature") ?? "";
    const requestId = req.headers.get("x-request-id") ?? "";
    const parts = Object.fromEntries(signature.split(",").map((p) => p.trim().split("=")));
    const manifest = `id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${parts.ts};`;
    const expected = createHmac("sha256", secret).update(manifest).digest("hex");
    if (!parts.v1 || !safeEqual(expected, parts.v1)) {
      return NextResponse.json({ error: "assinatura inválida" }, { status: 401 });
    }
  }

  if (type === "payment" && dataId) {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
      headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}` },
    });
    if (res.ok) {
      const payment = (await res.json()) as { status: string; external_reference: string };
      await updateOrderStatus(payment.external_reference, payment.status, payment);
    }
  }
  return NextResponse.json({ ok: true });
}

// Stripe: https://docs.stripe.com/webhooks#verify-manually
async function stripe(req: Request) {
  const payload = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET não configurado" }, { status: 500 });

  const header = req.headers.get("stripe-signature") ?? "";
  const parts = header.split(",").map((p) => p.split("="));
  const t = parts.find(([k]) => k === "t")?.[1];
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);
  const expected = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  const fresh = t && Math.abs(Date.now() / 1000 - Number(t)) < 300;
  if (!fresh || !signatures.some((s) => safeEqual(expected, s))) {
    return NextResponse.json({ error: "assinatura inválida" }, { status: 401 });
  }

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: { client_reference_id?: string; payment_status?: string } };
  };
  const session = event.data.object;
  if (event.type.startsWith("checkout.session.") && session.client_reference_id) {
    await updateOrderStatus(session.client_reference_id, session.payment_status ?? event.type, event);
  }
  return NextResponse.json({ received: true });
}

export async function POST(req: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  if (provider === "mercadopago") return mercadoPago(req);
  if (provider === "stripe") return stripe(req);
  return NextResponse.json({ error: "provedor desconhecido" }, { status: 404 });
}
