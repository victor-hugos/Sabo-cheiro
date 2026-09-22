"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import type { Order } from "@/lib/payments/types";

const copy = {
  sucesso: { emoji: "💜", title: "Pedido recebido!", text: "Obrigado por comprar com a gente. Você receberá a confirmação por e-mail." },
  pendente: { emoji: "⏳", title: "Pagamento em análise", text: "Assim que o pagamento for confirmado, avisaremos você por e-mail." },
  falha: { emoji: "😕", title: "Pagamento não concluído", text: "Não conseguimos processar o seu pagamento. Tente novamente ou fale com a gente." },
};

function Content({ status }: { status: keyof typeof copy }) {
  const id = useSearchParams().get("pedido");
  const [order, setOrder] = useState<(Order & { manual?: boolean }) | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      const raw = sessionStorage.getItem(`pedido-${id}`);
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, [id]);

  const c = copy[status];
  const manual = status === "sucesso" && order?.manual;
  const whatsText = order
    ? `Olá! Acabei de fazer o pedido ${order.id} no site da ${site.name} (${formatPrice(order.total)}).`
    : `Olá! Tenho uma dúvida sobre o pedido ${id ?? ""}.`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-6xl">{c.emoji}</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-900">{c.title}</h1>
      {id && <p className="mt-2 text-gray-600">Número do pedido: <strong>{id}</strong></p>}
      <p className="mt-4 text-gray-700">{c.text}</p>

      {order && (
        <div className="mt-8 rounded-2xl bg-white p-6 text-left ring-1 ring-brand-100">
          <ul className="space-y-1 text-sm">
            {order.items.map((i) => (
              <li key={i.id} className="flex justify-between"><span>{i.quantity}× {i.name}</span><span>{formatPrice(i.unitPrice * i.quantity)}</span></li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between border-t border-brand-100 pt-3 text-sm"><span>Frete</span><span>{formatPrice(order.shipping)}</span></p>
          {order.discount > 0 && (
            <p className="flex justify-between text-sm text-green-700"><span>Descontos{order.coupon ? ` (cupom ${order.coupon})` : ""}</span><span>-{formatPrice(order.discount)}</span></p>
          )}
          <p className="mt-2 flex justify-between border-t border-brand-100 pt-3 font-bold"><span>Total</span><span>{formatPrice(order.total)}</span></p>
          {manual && order.paymentMethod === "pix" && (
            <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm">
              <p className="font-semibold text-brand-900">Pague via PIX</p>
              {site.pixKey ? (
                <>
                  <p className="mt-1">Chave: <strong className="select-all">{site.pixKey}</strong></p>
                  <p className="mt-1 text-gray-600">Envie o comprovante pelo WhatsApp para agilizar o envio.</p>
                </>
              ) : (
                <p className="mt-1 text-gray-600">Chame a gente no WhatsApp que nós enviamos a chave PIX para você concluir o pagamento.</p>
              )}
            </div>
          )}
          {manual && order.paymentMethod !== "pix" && (
            <p className="mt-4 rounded-xl bg-brand-50 p-4 text-sm text-brand-900">
              Vamos enviar o link de pagamento pelo WhatsApp informado em instantes.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a href={whatsappLink(whatsText)} target="_blank" rel="noopener noreferrer" className="btn-primary">Falar no WhatsApp</a>
        <Link href={status === "falha" ? "/carrinho" : "/produtos"} className="btn-outline">{status === "falha" ? "Tentar novamente" : "Continuar comprando"}</Link>
      </div>
    </div>
  );
}

export default function OrderStatus({ status }: { status: keyof typeof copy }) {
  return <Suspense><Content status={status} /></Suspense>;
}
