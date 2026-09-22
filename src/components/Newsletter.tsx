"use client";

import { useState } from "react";

// Conecte ao seu provedor de e-mail marketing (Mailchimp, RD Station, Brevo...) no onSubmit.
export default function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="rounded-3xl bg-brand-100 px-6 py-10 text-center sm:px-12">
        <h2 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">Ganhe 10% OFF na primeira compra</h2>
        <p className="mt-2 text-brand-800">Cadastre seu e-mail e receba novidades, lançamentos e cupons exclusivos.</p>
        {sent ? (
          <p className="mt-6 font-semibold text-green-700">Obrigado! Seu cupom chegará no seu e-mail. 💜</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input required type="email" placeholder="Seu melhor e-mail" aria-label="E-mail" className="flex-1 rounded-full border border-brand-200 px-5 py-3 outline-none focus:border-brand-500" />
            <button className="btn-primary">Quero desconto</button>
          </form>
        )}
      </div>
    </section>
  );
}
