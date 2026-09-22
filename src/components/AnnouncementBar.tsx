import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-800 text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center">
        <span className="font-semibold">Frete grátis</span> acima de {formatPrice(site.freeShippingFrom)} ·{" "}
        <span className="hidden sm:inline">{Math.round(site.pixDiscount * 100)}% OFF no PIX · </span>
        Cupom <span className="rounded bg-white/15 px-1.5 py-0.5 font-bold tracking-wide">{site.couponBanner}</span>
      </div>
    </div>
  );
}
