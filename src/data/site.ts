// Configurações gerais da loja. Edite aqui nome, contatos e regras comerciais.
// Campos de contato vazios ("") ficam ocultos no site — não preencha com dados de exemplo.
export const site = {
  name: "Sabo Cheiro",
  tagline: "Um banho que vira ritual",
  description:
    "Sabonetes artesanais com manteiga de karité e óleo de amêndoas, feitos à mão para homens e mulheres que valorizam um bom cheiro e uma textura cremosa.",
  whatsapp: "556199216393", // apenas números, com DDI + DDD
  whatsappDisplay: "(61) 9921-6393",
  whatsappMessage: "Olá! Vim pelo site da Sabo Cheiro e gostaria de mais informações sobre os sabonetes.",
  email: "", // [confirmar] e-mail oficial
  instagram: "", // [confirmar] URL do Instagram oficial
  pixKey: "", // [confirmar] chave PIX — vazia, o cliente recebe a chave pelo WhatsApp
  flatShipping: 19.9, // frete fixo por pedido (R$)
  maxInstallments: 6, // parcelas sem juros (parcela mínima de R$ 10)
  pixDiscount: 0.05, // 5% de desconto no PIX
  couponBanner: "PRIMEIRACOMPRA", // cupom exibido na barra do topo
  // Cupons válidos no checkout: CÓDIGO -> desconto (0.1 = 10% sobre os produtos)
  coupons: { PRIMEIRACOMPRA: 0.1 } as Record<string, number>,
};
