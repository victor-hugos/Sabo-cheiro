import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand-500">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-brand-900">Página não encontrada</h1>
      <Link href="/" className="btn-primary mt-6">Voltar para a loja</Link>
    </div>
  );
}
