// Configurações gerais da loja. Edite aqui nome, contatos e regras comerciais.
export const site = {
  name: "Sabo Cheiro",
  tagline: "Sabonetes artesanais que perfumam o seu dia",
  description:
    "Sabonetes artesanais feitos à mão: massageadores, florais e peças especiais para presentear.",
  whatsapp: "5511999999999", // apenas números, com DDI + DDD
  email: "contato@sabocheiro.com.br",
  instagram: "https://instagram.com/sabocheiro",
  cnpj: "00.000.000/0001-00",
  address: "São Paulo - SP",
  pixKey: "contato@sabocheiro.com.br",
  flatShipping: 19.9, // frete fixo por pedido (R$)
  maxInstallments: 6, // parcelas sem juros
  pixDiscount: 0.05, // 5% de desconto no PIX
  couponBanner: "PRIMEIRACOMPRA", // cupom exibido na barra do topo
  // Cupons válidos no checkout: CÓDIGO -> desconto (0.1 = 10% sobre os produtos)
  coupons: { PRIMEIRACOMPRA: 0.1 } as Record<string, number>,
};
