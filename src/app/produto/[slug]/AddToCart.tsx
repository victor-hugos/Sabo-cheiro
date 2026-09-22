"use client";

import { useState } from "react";
import QuantityInput from "@/components/QuantityInput";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  if (product.stock <= 0) return <button disabled className="btn-primary w-full">Esgotado</button>;
  return (
    <div className="flex gap-3">
      <QuantityInput value={qty} max={product.stock} onChange={(v) => setQty(Math.max(1, v))} />
      <button onClick={() => add(product.id, qty)} className="btn-primary flex-1">Adicionar ao carrinho</button>
    </div>
  );
}
