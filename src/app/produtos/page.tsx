import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, definedFragrances, getCategory, products, type Product } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";
import SortSelect from "./SortSelect";

type SP = Promise<{ categoria?: string; busca?: string; tag?: string; ordem?: string; fragrancia?: string }>;

const tagNames: Record<string, string> = { "mais-vendido": "Mais vendidos", lancamento: "Lançamentos", promocao: "Ofertas", kit: "Kits" };

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { categoria, tag } = await searchParams;
  return { title: getCategory(categoria ?? "")?.name ?? tagNames[tag ?? ""] ?? "Todos os produtos" };
}

export default async function ProductsPage({ searchParams }: { searchParams: SP }) {
  const { categoria, busca, tag, ordem, fragrancia } = await searchParams;
  const fragrances = definedFragrances();
  const category = categoria ? getCategory(categoria) : undefined;

  let list: Product[] = products;
  if (category) list = list.filter((p) => p.category === category.slug);
  if (tag) list = list.filter((p) => p.tags?.includes(tag as never));
  if (fragrancia) list = list.filter((p) => p.fragrance === fragrancia);
  if (busca) {
    const q = normalize(busca);
    list = list.filter((p) => normalize(`${p.name} ${p.fragrance ?? ""} ${p.shortDescription} ${p.description}`).includes(q));
  }
  if (ordem === "menor-preco") list = [...list].sort((a, b) => a.price - b.price);
  if (ordem === "maior-preco") list = [...list].sort((a, b) => b.price - a.price);
  if (ordem === "nome") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const title = busca ? `Resultados para “${busca}”` : category?.name ?? tagNames[tag ?? ""] ?? "Todos os produtos";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">Início</Link> / <span>{title}</span>
      </nav>
      <h1 className="font-display text-3xl font-bold text-brand-900">{title}</h1>
      {category && <p className="mt-1 text-gray-600">{category.description}</p>}

      <ul className="mt-6 flex gap-2 overflow-x-auto pb-2 text-sm">
        <li>
          <Link href="/produtos" className={`block whitespace-nowrap rounded-full px-4 py-2 ${!category ? "bg-brand-600 text-white" : "bg-white ring-1 ring-brand-100 hover:bg-brand-50"}`}>Todos</Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/produtos?categoria=${c.slug}`} className={`block whitespace-nowrap rounded-full px-4 py-2 ${category?.slug === c.slug ? "bg-brand-600 text-white" : "bg-white ring-1 ring-brand-100 hover:bg-brand-50"}`}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>

      {fragrances.length > 0 && (
        <ul className="mt-2 flex gap-2 overflow-x-auto pb-2 text-sm" aria-label="Filtrar por fragrância">
          {fragrances.map((f) => {
            const active = fragrancia === f;
            const params = new URLSearchParams();
            if (category) params.set("categoria", category.slug);
            if (!active) params.set("fragrancia", f);
            return (
              <li key={f}>
                <Link href={`/produtos${params.size ? `?${params}` : ""}`} className={`block whitespace-nowrap rounded-full px-4 py-1.5 text-xs ${active ? "bg-brand-800 text-white" : "bg-brand-50 text-brand-800 ring-1 ring-brand-100 hover:bg-brand-100"}`}>
                  {f}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {category?.slug === "especiais" && (
        <div className="mt-4 rounded-2xl bg-brand-50 p-5 text-brand-900 ring-1 ring-brand-100 sm:p-6">
          <p className="font-display text-xl font-bold">Kits e lembrancinhas para ocasiões especiais</p>
          <p className="mt-2 text-sm text-brand-800">
            Casamentos, festas, chás e brindes corporativos: nós montamos kits e lembrancinhas com os nossos modelos prontos,
            cada sabonete embalado individualmente. Conte pra gente a quantidade e a data do evento, que nós mostramos as opções disponíveis.
          </p>
          <a
            href={whatsappLink("Olá! Vim pelo site da Sabo Cheiro e gostaria de saber sobre kits e lembrancinhas para um evento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 py-2 text-sm"
          >
            Pedir kits pelo WhatsApp
          </a>
        </div>
      )}

      <div className="mb-4 mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">{list.length} {list.length === 1 ? "produto" : "produtos"}</p>
        <Suspense><SortSelect /></Suspense>
      </div>
      {list.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-brand-100">
          <p>Nenhum produto encontrado.</p>
          <Link href="/produtos" className="btn-primary mt-4">Ver todos</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
