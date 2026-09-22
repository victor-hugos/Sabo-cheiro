"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { whatsappLink } from "@/lib/whatsapp";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, WhatsIcon } from "./Icons";

export default function Header() {
  const { count, open } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = String(menuOpen);
  }, [menuOpen]);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/produtos${q.trim() ? `?busca=${encodeURIComponent(q.trim())}` : ""}`);
    setMenuOpen(false);
  }

  const search = (
    <form onSubmit={onSearch} className="relative w-full" role="search">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="O que você procura?"
        aria-label="Buscar produtos"
        className="w-full rounded-full border border-brand-200 bg-white py-2.5 pl-4 pr-11 text-sm outline-none focus:border-brand-500"
      />
      <button type="submit" aria-label="Buscar" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 text-brand-700 hover:bg-brand-50">
        <SearchIcon />
      </button>
    </form>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button className="lg:hidden p-1 text-brand-800" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <MenuIcon className="h-6 w-6" />
        </button>
        <Link href="/" className="shrink-0 font-display text-2xl font-bold text-brand-800 sm:text-3xl">
          {site.name}
        </Link>
        <div className="mx-6 hidden flex-1 md:block">{search}</div>
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full p-2 text-sm text-brand-800 hover:bg-brand-50 sm:flex">
            <WhatsIcon /> <span className="hidden xl:inline">Atendimento</span>
          </a>
          <button onClick={open} className="relative rounded-full p-2 text-brand-800 hover:bg-brand-50" aria-label={`Carrinho, ${count} itens`}>
            <BagIcon className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden">{search}</div>
      <nav className="hidden border-t border-brand-100 lg:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-brand-800">
          <li><Link href="/produtos" className="hover:text-brand-500">Todos</Link></li>
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/produtos?categoria=${c.slug}`} className="hover:text-brand-500">{c.name}</Link></li>
          ))}
        </ul>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl font-bold text-brand-800">{site.name}</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><CloseIcon /></button>
            </div>
            <ul className="space-y-1 text-brand-900">
              <li><Link onClick={() => setMenuOpen(false)} href="/produtos" className="block rounded px-2 py-2.5 hover:bg-brand-50">Todos os produtos</Link></li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link onClick={() => setMenuOpen(false)} href={`/produtos?categoria=${c.slug}`} className="block rounded px-2 py-2.5 hover:bg-brand-50">{c.name}</Link>
                </li>
              ))}
              <li className="border-t border-brand-100 pt-2"><Link onClick={() => setMenuOpen(false)} href="/institucional/sobre" className="block rounded px-2 py-2.5 hover:bg-brand-50">Sobre nós</Link></li>
              <li><a onClick={() => setMenuOpen(false)} href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="block rounded px-2 py-2.5 hover:bg-brand-50">Atendimento pelo WhatsApp</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
