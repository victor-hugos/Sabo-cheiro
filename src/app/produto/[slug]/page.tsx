import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductShelf from "@/components/ProductShelf";
import { fragranceOf, getCategory, getProduct, products, weightOf } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice, installmentText, pixPrice } from "@/lib/format";
import { productWhatsappLink } from "@/lib/whatsapp";
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
            <p className="mt-1 text-sm text-gray-500">Cód. {product.id}</p>
            {product.tags?.includes("preco-lancamento") && (
              <span className="mt-3 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">Preço de lançamento</span>
            )}
            <p className="mt-4 text-gray-700">{product.shortDescription}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3 ring-1 ring-brand-100">
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">Fragrância</dt>
                <dd className="mt-1 text-brand-900">{fragranceOf(product)}</dd>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-brand-100">
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">Peso</dt>
                <dd className="mt-1 text-brand-900">{weightOf(product)}</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-brand-100">
              {product.compareAtPrice && <p className="text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</p>}
              <p className="text-3xl font-bold text-brand-800">{formatPrice(product.price)}</p>
              {installments && <p className="text-sm text-gray-600">ou {installments}</p>}
              <p className="mt-1 text-sm font-semibold text-green-700">
                {formatPrice(pixPrice(product.price))} no PIX ({Math.round(site.pixDiscount * 100)}% OFF)
              </p>
              <div className="mt-5"><AddToCart product={product} /></div>
              <a
                href={productWhatsappLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-3 w-full gap-2 border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10"
              >
                Tirar dúvidas no WhatsApp
              </a>
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
                  <summary className="cursor-pointer font-semibold text-brand-900">Composição</summary>
                  <p className="mt-3 text-gray-700">{product.ingredients}</p>
                </details>
              )}
              <details className="rounded-xl bg-white p-4 ring-1 ring-brand-100">
                <summary className="cursor-pointer font-semibold text-brand-900">Modo de uso</summary>
                <p className="mt-3 text-gray-700">
                  Molhe o sabonete e a pele, faça espuma com calma e aproveite o cheiro. Enxágue e, depois do banho, deixe o sabonete
                  numa saboneteira com furinhos para ele secar e durar mais.
                </p>
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
