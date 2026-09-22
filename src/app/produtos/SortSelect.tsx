"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <select
      aria-label="Ordenar"
      value={params.get("ordem") ?? ""}
      onChange={(e) => {
        const next = new URLSearchParams(params);
        if (e.target.value) next.set("ordem", e.target.value);
        else next.delete("ordem");
        router.push(`${pathname}?${next}`);
      }}
      className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm"
    >
      <option value="">Mais relevantes</option>
      <option value="menor-preco">Menor preço</option>
      <option value="maior-preco">Maior preço</option>
      <option value="nome">Nome (A-Z)</option>
    </select>
  );
}
