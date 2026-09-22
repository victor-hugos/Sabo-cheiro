"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

// Troque os banners aqui. Para usar imagens, adicione `image: "/banners/arquivo.jpg"`.
const slides = [
  {
    title: "Um banho que vira ritual",
    text: "Sabonetes artesanais com óleos essenciais puros.",
    cta: "Conheça a coleção",
    href: "/produtos",
    bg: "from-brand-700 via-brand-600 to-brand-400",
  },
  {
    title: "Kits presente com até 20% OFF",
    text: "Caixas prontas para presentear, com laço e cartão.",
    cta: "Ver kits",
    href: "/produtos?categoria=kits-presente",
    bg: "from-[#b5835a] via-[#c9a27e] to-[#e8c9a8]",
  },
  {
    title: "Lançamentos da estação",
    text: "Mel & Aveia, Rosas Brancas e Capim-Limão chegaram.",
    cta: "Ver novidades",
    href: "/produtos?tag=lancamento",
    bg: "from-[#4f7a5a] via-[#6d9d78] to-[#a8cdb0]",
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
          <div key={s.title} className={`w-full shrink-0 bg-gradient-to-r ${s.bg}`} aria-hidden={idx !== i}>
            <div className="mx-auto flex min-h-[320px] max-w-7xl flex-col justify-center px-6 py-14 text-white sm:min-h-[420px] sm:px-12">
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
