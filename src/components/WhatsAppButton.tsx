import { whatsappLink } from "@/lib/whatsapp";
import { WhatsIcon } from "./Icons";

// Botão flutuante presente em todas as páginas (renderizado no layout).
// Fica oculto enquanto o carrinho lateral ou o menu do celular estão abertos (ver globals.css),
// para não cobrir o botão "Finalizar compra" nem os itens do menu.
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
      className="wa-float fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6"
    >
      <WhatsIcon className="h-8 w-8" />
    </a>
  );
}
