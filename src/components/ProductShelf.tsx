import Link from "next/link";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductShelf({ title, products, href }: { title: string; products: Product[]; href?: string }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">{title}</h2>
        {href && <Link href={href} className="text-sm font-semibold text-brand-600 underline">Ver todos</Link>}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
