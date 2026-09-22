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

      <ProductShelf title="Nossos sabonetes" products={products.filter((p) => !p.tags?.includes("kit"))} href="/produtos" />

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 md:grid-cols-2">
        {[
          { href: "/produtos?categoria=florais", image: "/banners/florais.jpg", kicker: "Coleção", title: "Florais em relevo", cta: "Ver florais" },
          { href: "/produtos?categoria=especiais", image: "/produtos/decorado-1.jpg", kicker: "Presenteie", title: "Especiais e kits a partir de R$ 39", cta: "Ver especiais e kits" },
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

      <section className="mx-auto max-w-7xl px-4 pb-12" aria-labelledby="composicao">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Composição</p>
          <h2 id="composicao" className="mt-2 font-display text-2xl font-bold text-brand-900 sm:text-3xl">O que tem em cada sabonete</h2>
          <p className="mx-auto mt-3 max-w-3xl text-gray-600">
            Os nossos sabonetes artesanais têm em sua composição a manteiga de karité e o óleo de amêndoas como base, combinados com
            argilas, extratos vegetais e fragrâncias de alta qualidade, todos escolhidos para criar experiências únicas.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Manteiga de karité", "É ela que deixa a espuma cremosa e a pele hidratada depois do banho."],
            ["Óleo de amêndoas", "Deixa a pele macia, com aquele toque gostoso de sentir."],
            ["Argilas naturais", "Branca, vermelha, bege ou preta. Cada uma dá cor e personalidade ao sabonete."],
            ["Extratos vegetais", "Como aloe vera e açafrão, que nós colhemos com as próprias mãos."],
            ["Fragrâncias de alta qualidade", "Escolhidas a dedo para deixar um cheiro bom que fica na pele."],
          ].map(([title, text]) => (
            <li key={title} className="rounded-2xl bg-white p-5 ring-1 ring-brand-100">
              <span className="block h-1 w-10 rounded-full bg-accent" aria-hidden />
              <p className="mt-3 font-bold text-brand-900">{title}</p>
              <p className="mt-1 text-sm text-gray-600">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-3xl text-center font-display text-lg italic text-brand-800">
          Independentemente da fragrância escolhida, existe um padrão de qualidade presente em todos os produtos.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid items-center gap-8 rounded-3xl bg-white p-8 ring-1 ring-brand-100 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">Nossa essência</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-900">Feito à mão, com carinho em cada detalhe</h2>
            <p className="mt-4 text-gray-600">
              Cada sabonete é feito à mão, em pequenos lotes, e embalado individualmente. A base é sempre a mesma: manteiga de
              karité, óleo de amêndoas, argila natural e extratos vegetais. O que muda é a fragrância, o formato e a cor.
            </p>
            <p className="mt-3 text-gray-600">
              Para nós, fazer sabonete é a hora em que a mente descansa. É essa sensação que queremos levar para o seu banho: um
              momento para desacelerar, sentir o cheiro e cuidar de você.
            </p>
            <Link href="/institucional/sobre" className="btn-outline mt-6">Conheça nossa história</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/banners/colecao.jpg" alt="Coleção de sabonetes artesanais" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12" aria-labelledby="para-quem">
        <div className="rounded-3xl bg-brand-800 p-8 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">Para quem é</p>
          <h2 id="para-quem" className="mt-2 max-w-3xl font-display text-2xl font-bold sm:text-3xl">
            “Homens e mulheres que valorizam um bom cheiro, textura cremosa, aquele ritual que nos dá prazer.”
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Para ela", "Relevos delicados, cores suaves e uma espuma cremosa para o banho de todo dia."],
              ["Para ele", "Temos também uma fragrância amadeirada e fresca, inspirada em perfume masculino."],
              ["Para presentear", "Cada sabonete vem embalado individualmente. Quem recebe já se encanta pelo visual."],
            ].map(([title, text]) => (
              <li key={title} className="rounded-2xl bg-white/10 p-5">
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-sm text-brand-100">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
