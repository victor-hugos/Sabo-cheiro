import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/data/pages";
import { site } from "@/data/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = pages[(await params).slug];
  return page ? { title: page.title } : {};
}

export default async function InstitutionalPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-900">{page.title}</h1>
      <div className="mt-6 space-y-4 text-gray-700">
        {page.body.split("\n\n").map((p) => <p key={p}>{p}</p>)}
      </div>
      {slug === "contato" && (
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="btn-primary mt-8">Chamar no WhatsApp</a>
      )}
    </div>
  );
}
