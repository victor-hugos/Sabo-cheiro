import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { CardIcon, LeafIcon, ShieldIcon, TruckIcon } from "./Icons";

const items = [
  { icon: TruckIcon, title: "Frete grátis", text: `Acima de ${formatPrice(site.freeShippingFrom)}` },
  { icon: CardIcon, title: `Até ${site.maxInstallments}x sem juros`, text: `ou ${Math.round(site.pixDiscount * 100)}% OFF no PIX` },
  { icon: ShieldIcon, title: "Compra segura", text: "Site protegido com SSL" },
  { icon: LeafIcon, title: "100% artesanal", text: "Ingredientes naturais" },
];

export default function Benefits() {
  return (
    <section className="border-y border-brand-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-brand-900">{title}</p>
              <p className="text-xs text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
