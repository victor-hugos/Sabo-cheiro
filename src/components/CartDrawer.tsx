"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { CloseIcon } from "./Icons";
import QuantityInput from "./QuantityInput";

export default function CartDrawer() {
  const { items, isOpen, close, subtotal, setQuantity, remove } = useCart();
  const missing = site.freeShippingFrom - subtotal;
  const progress = Math.min(100, (subtotal / site.freeShippingFrom) * 100);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div onClick={close} className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Carrinho"
      >
        <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-brand-900">Meu carrinho</h2>
          <button onClick={close} aria-label="Fechar carrinho" className="rounded-full p-1 hover:bg-brand-50"><CloseIcon /></button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-brand-100 px-5 py-3 text-sm">
            {missing > 0 ? (
              <p>Faltam <strong>{formatPrice(missing)}</strong> para ganhar <strong>frete grátis</strong>!</p>
            ) : (
              <p className="font-semibold text-green-700">Parabéns! Você ganhou frete grátis 🎉</p>
            )}
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
              <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-brand-800">
              <p className="mb-4">Seu carrinho está vazio.</p>
              <Link href="/produtos" onClick={close} className="btn-primary">Ver produtos</Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ id, quantity, product }) => (
                <li key={id} className="flex gap-3">
                  <Image src={product.images[0]} alt={product.name} width={80} height={80} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <Link href={`/produto/${product.slug}`} onClick={close} className="text-sm font-semibold text-brand-900 hover:underline">
                      {product.name}
                    </Link>
                    <span className="text-sm text-brand-700">{formatPrice(product.price)}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <QuantityInput value={quantity} max={product.stock} onChange={(q) => setQuantity(id, q)} small />
                      <button onClick={() => remove(id)} className="text-xs text-gray-500 underline hover:text-red-600">Remover</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-brand-100 px-5 py-4">
            <div className="mb-3 flex justify-between text-base">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <Link href="/checkout" onClick={close} className="btn-primary w-full">Finalizar compra</Link>
            <Link href="/carrinho" onClick={close} className="mt-2 block text-center text-sm text-brand-700 underline">Ver carrinho completo</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
