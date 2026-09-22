import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductShelf from "@/components/ProductShelf";
import { getCategory, getProduct, products } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice, installmentText, pixPrice } from "@/lib/format";
import AddToCart from "./AddToCart";
import Gallery from "./Gallery";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: product.images },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const installments = installmentText(product.price);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">Início</Link> /{" "}
          {category && <><Link href={`/produtos?categoria=${category.slug}`} className="hover:underline">{category.name}</Link> / </>}
          <span>{product.name}</span>
        </nav>
        <div className="grid gap-10 md:grid-cols-2">
          <Gallery images={product.images} alt={product.name} />
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-1 text-sm text-gray-500">Cód. {product.id}{product.weight && ` · ${product.weight}`}</p>
            <p className="mt-4 text-gray-700">{product.shortDescription}</p>

            <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-brand-100">
              {product.compareAtPrice && <p className="text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</p>}
              <p className="text-3xl font-bold text-brand-800">{formatPrice(product.price)}</p>
              {installments && <p className="text-sm text-gray-600">ou {installments}</p>}
              <p className="mt-1 text-sm font-semibold text-green-700">
                {formatPrice(pixPrice(product.price))} no PIX ({Math.round(site.pixDiscount * 100)}% OFF)
              </p>
              <div className="mt-5"><AddToCart product={product} /></div>
              {product.stock > 0 && product.stock <= 10 && (
                <p className="mt-3 text-sm font-semibold text-accent">Restam apenas {product.stock} unidades!</p>
              )}
              <p className="mt-4 text-sm text-gray-500">
                🏷️ Use o cupom <strong>{site.couponBanner}</strong> no checkout e ganhe {Math.round((site.coupons[site.couponBanner] ?? 0) * 100)}% OFF
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <details open className="rounded-xl bg-white p-4 ring-1 ring-brand-100">
                <summary className="cursor-pointer font-semibold text-brand-900">Descrição</summary>
                <p className="mt-3 text-gray-700">{product.description}</p>
              </details>
              {product.ingredients && (
                <details className="rounded-xl bg-white p-4 ring-1 ring-brand-100">
                  <summary className="cursor-pointer font-semibold text-brand-900">Ingredientes</summary>
                  <p className="mt-3 text-gray-700">{product.ingredients}</p>
                </details>
              )}
              <details className="rounded-xl bg-white p-4 ring-1 ring-brand-100">
                <summary className="cursor-pointer font-semibold text-brand-900">Modo de uso</summary>
                <p className="mt-3 text-gray-700">Umedeça a pele, aplique fazendo espuma e enxágue. Mantenha o sabonete em saboneteira com drenagem para prolongar sua durabilidade.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
      <ProductShelf title="Você também pode gostar" products={related} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
