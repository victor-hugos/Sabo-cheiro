"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import type { Address, Customer, Order, PaymentMethod, PaymentResult } from "@/lib/payments/types";

const maskCpf = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskPhone = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
const maskCep = (v: string) => v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

export default function CheckoutPage() {
  const { items, subtotal, shipping, clear } = useCart();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", phone: "", cpf: "" });
  const [address, setAddress] = useState<Address>({ cep: "", street: "", number: "", complement: "", district: "", city: "", state: "" });
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const discount = method === "pix" ? Math.round(subtotal * site.pixDiscount * 100) / 100 : 0;
  const total = subtotal + shipping - discount;

  async function lookupCep(cep: string) {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setAddress((a) => ({ ...a, street: data.logradouro || a.street, district: data.bairro || a.district, city: data.localidade || a.city, state: data.uf || a.state }));
      }
    } catch {}
    setCepLoading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, address, paymentMethod: method, items: items.map(({ id, quantity }) => ({ id, quantity })) }),
      });
      const data = (await res.json()) as { error?: string; order?: Order; payment?: PaymentResult };
      if (!res.ok || !data.order || !data.payment) throw new Error(data.error || "Erro ao finalizar pedido.");
      try {
        sessionStorage.setItem(`pedido-${data.order.id}`, JSON.stringify({ ...data.order, manual: data.payment.type === "manual" }));
      } catch {}
      clear();
      if (data.payment.type === "redirect") window.location.href = data.payment.url;
      else router.push(`/pedido/sucesso?pedido=${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao finalizar pedido.");
      setLoading(false);
    }
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-900">Seu carrinho está vazio</h1>
        <Link href="/produtos" className="btn-primary mt-6">Ver produtos</Link>
      </div>
    );
  }

  const field = (label: string, input: React.ReactNode, className = "") => (
    <label className={className}>
      <span className="label">{label}</span>
      {input}
    </label>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold text-brand-900">Finalizar compra</h1>
      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-brand-100">
            <h2 className="mb-4 text-lg font-bold text-brand-900">1. Seus dados</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("Nome completo", <input required className="input" autoComplete="name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />, "sm:col-span-2")}
              {field("E-mail", <input required type="email" className="input" autoComplete="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />)}
              {field("Celular / WhatsApp", <input required className="input" inputMode="tel" autoComplete="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: maskPhone(e.target.value) })} placeholder="(11) 99999-9999" />)}
              {field("CPF", <input required className="input" inputMode="numeric" value={customer.cpf} onChange={(e) => setCustomer({ ...customer, cpf: maskCpf(e.target.value) })} placeholder="000.000.000-00" />)}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-brand-100">
            <h2 className="mb-4 text-lg font-bold text-brand-900">2. Entrega</h2>
            <div className="grid gap-4 sm:grid-cols-6">
              {field(
                cepLoading ? "CEP (buscando...)" : "CEP",
                <input required className="input" inputMode="numeric" autoComplete="postal-code" value={address.cep} placeholder="00000-000"
                  onChange={(e) => { const cep = maskCep(e.target.value); setAddress({ ...address, cep }); lookupCep(cep); }} />,
                "sm:col-span-2",
              )}
              {field("Rua", <input required className="input" autoComplete="address-line1" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />, "sm:col-span-4")}
              {field("Número", <input required className="input" value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} />, "sm:col-span-2")}
              {field("Complemento", <input className="input" autoComplete="address-line2" value={address.complement} onChange={(e) => setAddress({ ...address, complement: e.target.value })} />, "sm:col-span-4")}
              {field("Bairro", <input required className="input" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} />, "sm:col-span-2")}
              {field("Cidade", <input required className="input" autoComplete="address-level2" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />, "sm:col-span-3")}
              {field(
                "UF",
                <select required className="input" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}>
                  <option value="">--</option>
                  {UFS.map((uf) => <option key={uf}>{uf}</option>)}
                </select>,
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-brand-100">
            <h2 className="mb-4 text-lg font-bold text-brand-900">3. Pagamento</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {([
                ["pix", "PIX", `${Math.round(site.pixDiscount * 100)}% de desconto`],
                ["card", "Cartão de crédito", `Até ${site.maxInstallments}x sem juros`],
                ["boleto", "Boleto", "Compensação em até 3 dias"],
              ] as const).map(([value, label, hint]) => (
                <label key={value} className={`cursor-pointer rounded-xl border-2 p-4 transition ${method === value ? "border-brand-500 bg-brand-50" : "border-brand-100"}`}>
                  <input type="radio" name="method" value={value} checked={method === value} onChange={() => setMethod(value)} className="sr-only" />
                  <span className="block font-bold text-brand-900">{label}</span>
                  <span className="text-xs text-gray-600">{hint}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">Você será direcionado para um ambiente seguro para concluir o pagamento.</p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 ring-1 ring-brand-100 lg:sticky lg:top-40">
          <h2 className="mb-4 text-lg font-bold text-brand-900">Seu pedido</h2>
          <ul className="mb-4 space-y-3">
            {items.map(({ id, quantity, product }) => (
              <li key={id} className="flex items-center gap-3 text-sm">
                <Image src={product.images[0]} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                <span className="flex-1">{quantity}× {product.name}</span>
                <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-brand-100 pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Frete</dt><dd>{shipping === 0 ? <span className="font-semibold text-green-700">Grátis</span> : formatPrice(shipping)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-green-700"><dt>Desconto PIX</dt><dd>-{formatPrice(discount)}</dd></div>}
            <div className="flex justify-between border-t border-brand-100 pt-2 text-lg font-bold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? "Processando..." : "Confirmar pedido"}
          </button>
          <p className="mt-3 text-center text-xs text-gray-500">🔒 Compra 100% segura</p>
        </aside>
      </form>
    </div>
  );
}
