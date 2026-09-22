"use client";

import Image from "next/image";
import Link from "next/link";
import QuantityInput from "@/components/QuantityInput";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";
import { formatPrice, pixPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, shipping, total, setQuantity, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-900">Seu carrinho está vazio</h1>
        <p className="mt-2 text-gray-600">Que tal conhecer nossos sabonetes?</p>
        <Link href="/produtos" className="btn-primary mt-6">Ver produtos</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold text-brand-900">Meu carrinho</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-brand-100 rounded-2xl bg-white ring-1 ring-brand-100">
          {items.map(({ id, quantity, product }) => (
            <li key={id} className="flex gap-4 p-4">
              <Image src={product.images[0]} alt={product.name} width={96} height={96} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <Link href={`/produto/${product.slug}`} className="font-semibold text-brand-900 hover:underline">{product.name}</Link>
                  <p className="text-sm text-gray-600">{formatPrice(product.price)} cada</p>
                </div>
                <QuantityInput value={quantity} max={product.stock} onChange={(q) => setQuantity(id, q)} small />
                <p className="w-24 font-bold text-brand-800 sm:text-right">{formatPrice(product.price * quantity)}</p>
                <button onClick={() => remove(id)} className="text-left text-xs text-gray-600 underline hover:text-red-600">Remover</button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-2xl bg-white p-6 ring-1 ring-brand-100">
          <h2 className="mb-4 text-lg font-bold text-brand-900">Resumo</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Frete</dt><dd>{formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-brand-100 pt-2 text-base font-bold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
            <p className="text-right text-xs text-green-700">
              ou {formatPrice(pixPrice(subtotal) + shipping)} no PIX ({Math.round(site.pixDiscount * 100)}% OFF nos produtos)
            </p>
            <p className="text-right text-xs text-gray-600">Tem cupom? Aplique no checkout.</p>
          </dl>
          <Link href="/checkout" className="btn-primary mt-6 w-full">Finalizar compra</Link>
          <Link href="/produtos" className="mt-3 block text-center text-sm text-brand-700 underline">Continuar comprando</Link>
        </aside>
      </div>
    </div>
  );
}
