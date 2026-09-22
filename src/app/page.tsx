import Image from "next/image";
import Link from "next/link";
import Benefits from "@/components/Benefits";
import HeroCarousel from "@/components/HeroCarousel";
import Newsletter from "@/components/Newsletter";
import ProductShelf from "@/components/ProductShelf";
import { categories, productsByTag } from "@/data/products";

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

      <ProductShelf title="Mais vendidos" products={productsByTag("mais-vendido")} href="/produtos?tag=mais-vendido" />

      <section className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2">
        <Link href="/produtos?categoria=kits-presente" className="rounded-3xl bg-gradient-to-br from-[#c9a27e] to-[#e8c9a8] p-8 text-white transition hover:opacity-95 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest">Presenteie</p>
          <p className="mt-2 font-display text-3xl font-bold">Kits prontos para presente</p>
          <span className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-[#8a5f3c]">Ver kits</span>
        </Link>
        <Link href="/produtos?tag=promocao" className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-400 p-8 text-white transition hover:opacity-95 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest">Ofertas</p>
          <p className="mt-2 font-display text-3xl font-bold">Preços especiais por tempo limitado</p>
          <span className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-700">Aproveitar</span>
        </Link>
      </section>

      <ProductShelf title="Lançamentos" products={productsByTag("lancamento")} href="/produtos?tag=lancamento" />

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid items-center gap-8 rounded-3xl bg-white p-8 ring-1 ring-brand-100 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Nossa essência</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-900">Feito à mão, com carinho e ingredientes de verdade</h2>
            <p className="mt-4 text-gray-600">
              Cada sabonete é produzido artesanalmente em pequenos lotes, com óleos vegetais, manteigas nobres e óleos essenciais puros.
              Sem parabenos, sem corantes artificiais e sem testes em animais.
            </p>
            <Link href="/institucional/sobre" className="btn-outline mt-6">Conheça nossa história</Link>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[["100%", "vegano"], ["0", "parabenos"], ["+20", "aromas"]].map(([n, t]) => (
              <div key={t} className="rounded-2xl bg-brand-50 p-4">
                <p className="font-display text-3xl font-bold text-brand-700">{n}</p>
                <p className="text-sm text-brand-900">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
