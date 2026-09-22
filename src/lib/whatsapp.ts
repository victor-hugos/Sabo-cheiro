import { site } from "@/data/site";

// Link do WhatsApp oficial, com mensagem opcional já codificada na URL.
export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function productWhatsappLink(productName: string) {
  return whatsappLink(`Olá! Tenho interesse no ${productName} que vi no site da ${site.name}.`);
}
