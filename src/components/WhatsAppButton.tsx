import { site } from "@/data/site";
import { WhatsIcon } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Vim pelo site da ${site.name}.`)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
    >
      <WhatsIcon className="h-8 w-8" />
    </a>
  );
}
