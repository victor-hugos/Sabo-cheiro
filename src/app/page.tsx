import Image from "next/image";
import Link from "next/link";
import Benefits from "@/components/Benefits";
import HeroCarousel from "@/components/HeroCarousel";
import Newsletter from "@/components/Newsletter";
import ProductShelf from "@/components/ProductShelf";
import { categories, products } from "@/data/products";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Benefits />

      <section className="mx-auto max-w-7xl px-4 pt-12">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-brand-900 sm:text-3xl">Compre por categoria</h2>
        <div className="flex gap-5 overflow-x-auto pb-2 sm:justify-center">
          {categories.map((c) => (
            <Link key={c.slug} href={`/produtos?categoria=${c.slug}`} className="group flex w-28 shrink-0 flex-col items-center text-center sm:w-36">
              <span className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-brand-100 transition group-hover:ring-brand-400 sm:h-32 sm:w-32">
                <Image src={c.image} alt="" fill sizes="128px" className="object-cover" />
              </span>
              <span className="mt-2 text-sm font-semibold text-brand-900">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <ProductShelf title="Nossos sabonetes" products={products} href="/produtos" />

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 md:grid-cols-2">
        {[
          { href: "/produtos?categoria=florais", image: "/banners/florais.jpg", kicker: "Coleção", title: "Florais em relevo", cta: "Ver florais" },
          { href: "/produtos?categoria=especiais", image: "/produtos/decorado-1.jpg", kicker: "Presenteie", title: "Especiais e decorados", cta: "Ver especiais" },
        ].map((b) => (
          <Link key={b.href} href={b.href} className="group relative min-h-[240px] overflow-hidden rounded-3xl p-8 text-white sm:p-10">
            <Image src={b.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-widest">{b.kicker}</p>
              <p className="mt-2 font-display text-3xl font-bold">{b.title}</p>
              <span className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-800">{b.cta}</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid items-center gap-8 rounded-3xl bg-white p-8 ring-1 ring-brand-100 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Nossa essência</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-900">Feito à mão, com carinho em cada detalhe</h2>
            <p className="mt-4 text-gray-600">
              Cada sabonete é produzido artesanalmente, em pequenos lotes, com moldes e acabamentos pensados para transformar
              o banho em um momento de cuidado. Todas as peças são embaladas individualmente.
            </p>
            <Link href="/institucional/sobre" className="btn-outline mt-6">Conheça nossa história</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/banners/colecao.jpg" alt="Coleção de sabonetes artesanais" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
