"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-50">
        <Image src={images[active]} alt={alt} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button key={src} onClick={() => setActive(i)} className={`relative h-20 w-20 overflow-hidden rounded-xl ring-2 ${i === active ? "ring-brand-500" : "ring-transparent"}`} aria-label={`Imagem ${i + 1}`}>
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
