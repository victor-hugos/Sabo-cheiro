import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-block rounded-2xl bg-cream px-5 py-3" aria-label={`${site.name}: página inicial`}>
            <Image src="/brand/logo-horizontal.png" alt="PAUSE Sabonetes Artesanais" width={323} height={90} className="h-12 w-auto" />
          </Link>
          <p className="mt-3 text-sm text-brand-200">
            Sabonetes artesanais com manteiga de karité e óleo de amêndoas, feitos à mão, em pequenos lotes, para homens e
            mulheres que valorizam um bom cheiro, textura cremosa e aquele ritual que nos dá prazer.
          </p>
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline">Instagram</a>
          )}
        </div>
        <div>
          <p className="mb-3 font-semibold uppercase tracking-wide text-white">Produtos</p>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/produtos?categoria=${c.slug}`} className="hover:text-white">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold uppercase tracking-wide text-white">Institucional</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/institucional/sobre" className="hover:text-white">Sobre nós</Link></li>
            <li><Link href="/institucional/trocas-e-devolucoes" className="hover:text-white">Trocas e devoluções</Link></li>
            <li><Link href="/institucional/entrega" className="hover:text-white">Prazos de entrega</Link></li>
            <li><Link href="/institucional/privacidade" className="hover:text-white">Política de privacidade</Link></li>
            <li><Link href="/institucional/contato" className="hover:text-white">Fale conosco</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold uppercase tracking-wide text-white">Atendimento</p>
          <ul className="space-y-2 text-sm">
            <li>
              WhatsApp:{" "}
              <a className="underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a>
            </li>
            {site.email && <li>E-mail: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></li>}
          </ul>
          <p className="mb-2 mt-6 font-semibold uppercase tracking-wide text-white">Pagamento</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {["PIX", "Visa", "Master", "Elo", "Boleto"].map((p) => (
              <span key={p} className="rounded bg-white px-2 py-1 font-bold text-brand-900">{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-brand-300">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
