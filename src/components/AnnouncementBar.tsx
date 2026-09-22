import { site } from "@/data/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-800 text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center">
        Use o cupom <span className="rounded bg-white/15 px-1.5 py-0.5 font-bold tracking-wide">{site.couponBanner}</span> e ganhe{" "}
        <span className="font-semibold">{Math.round((site.coupons[site.couponBanner] ?? 0) * 100)}% OFF</span> na sua compra
      </div>
    </div>
  );
}
