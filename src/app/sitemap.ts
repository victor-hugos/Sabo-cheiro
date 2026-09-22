import type { MetadataRoute } from "next";
import { pages } from "@/data/pages";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: base, priority: 1 },
    { url: `${base}/produtos`, priority: 0.9 },
    ...products.map((p) => ({ url: `${base}/produto/${p.slug}`, priority: 0.8 })),
    ...Object.keys(pages).map((slug) => ({ url: `${base}/institucional/${slug}`, priority: 0.3 })),
  ];
}
