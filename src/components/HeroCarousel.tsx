"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

// Troque os banners aqui (imagens em /public/banners ou /public/produtos).
const slides = [
  {
    title: "Um banho que vira ritual",
    text: "Sabonetes artesanais com manteiga de karité e óleo de amêndoas, feitos à mão para quem ama um bom cheiro.",
    cta: "Conheça a coleção",
    href: "/produtos",
    image: "/banners/colecao.jpg",
  },
  {
    title: "Coleção Florais",
    text: "Relevos delicados em rosa, verde e perolado, com a mesma base cremosa.",
    cta: "Ver florais",
    href: "/produtos?categoria=florais",
    image: "/banners/florais.jpg",
  },
  {
    title: "Massageadores",
    text: "Pinos em relevo que massageiam a pele enquanto a espuma cremosa faz o resto.",
    cta: "Ver massageadores",
    href: "/produtos?categoria=massageadores",
    image: "/produtos/massageador-laranja-2.jpg",
  },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden" aria-roledescription="carrossel">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, idx) => (
          <div key={s.title} className="relative w-full shrink-0 bg-brand-900" aria-hidden={idx !== i}>
            <Image src={s.image} alt="" fill priority={idx === 0} sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="relative mx-auto flex min-h-[320px] max-w-7xl flex-col justify-center px-6 py-14 text-white sm:min-h-[420px] sm:px-12">
              <h1 className="max-w-xl font-display text-4xl font-bold leading-tight sm:text-6xl">{s.title}</h1>
              <p className="mt-4 max-w-md text-lg text-white/90">{s.text}</p>
              <Link href={s.href} tabIndex={idx === i ? 0 : -1} className="mt-8 inline-flex w-fit rounded-full bg-white px-7 py-3 font-bold text-brand-800 shadow transition hover:bg-brand-50">
                {s.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setI((i - 1 + slides.length) % slides.length)} aria-label="Banner anterior" className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 sm:block">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={() => setI((i + 1) % slides.length)} aria-label="Próximo banner" className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 sm:block">
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, idx) => (
          <button key={s.title} onClick={() => setI(idx)} aria-label={`Ir para banner ${idx + 1}`} className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2.5 bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
