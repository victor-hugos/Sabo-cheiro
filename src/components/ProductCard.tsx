"use client";

import Image from "next/image";
import Link from "next/link";
import { fragranceOf, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice, installmentText, pixPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;
  const installments = installmentText(product.price);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-100 transition hover:shadow-lg">
      <Link href={`/produto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-brand-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {off > 0 && <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">-{off}%</span>}
          {product.tags?.includes("lancamento") && <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">Novo</span>}
          {product.tags?.includes("kit") && <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">Kit</span>}
          {product.tags?.includes("preco-lancamento") && <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-brand-800">Preço de lançamento</span>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link href={`/produto/${product.slug}`} className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-brand-900 hover:underline sm:text-base">
          {product.name}
        </Link>
        <span className="mt-1 text-xs text-brand-600">Fragrância: {fragranceOf(product)}</span>
        <div className="mt-2">
          {product.compareAtPrice && <span className="mr-2 text-xs text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>}
          <span className="text-lg font-bold text-brand-800">{formatPrice(product.price)}</span>
        </div>
        {installments && <span className="text-xs text-gray-500">{installments}</span>}
        <span className="text-xs text-green-700">{formatPrice(pixPrice(product.price))} no PIX</span>
        <button
          onClick={() => add(product.id)}
          disabled={product.stock <= 0}
          className="btn-primary mt-3 w-full py-2 text-sm"
        >
          {product.stock > 0 ? "Comprar" : "Esgotado"}
        </button>
      </div>
    </div>
  );
}
