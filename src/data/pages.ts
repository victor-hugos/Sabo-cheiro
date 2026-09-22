import { site } from "./site";

// Páginas institucionais. Edite os textos livremente (parágrafos separados por linha em branco).
export const pages: Record<string, { title: string; body: string }> = {
  sobre: {
    title: "Sobre nós",
    body: `A ${site.name} nasceu do amor por aromas e pelo cuidado artesanal. Cada sabonete é produzido à mão, em pequenos lotes, com moldes e acabamentos escolhidos com carinho.

Acreditamos que o banho pode ser um momento de pausa e autocuidado. Por isso, cada peça é feita e embalada individualmente, com atenção a cada detalhe.

Obrigado por fazer parte da nossa história!`,
  },
  "trocas-e-devolucoes": {
    title: "Trocas e devoluções",
    body: `Você pode desistir da compra em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor (art. 49). O produto deve estar lacrado e sem uso.

Se o produto chegar avariado ou diferente do pedido, entre em contato em até 7 dias pelo WhatsApp ou e-mail ${site.email}, com fotos do produto e da embalagem, que faremos a troca sem custo.

O reembolso é feito pelo mesmo meio de pagamento em até 10 dias úteis após o recebimento da devolução.`,
  },
  entrega: {
    title: "Prazos de entrega",
    body: `Os pedidos são separados e postados em até 2 dias úteis após a confirmação do pagamento.

Enviamos para todo o Brasil via Correios ou transportadora. O prazo de entrega varia de acordo com a região e é informado junto com o código de rastreio.`,
  },
  privacidade: {
    title: "Política de privacidade",
    body: `Coletamos apenas os dados necessários para processar e entregar o seu pedido (nome, e-mail, telefone, CPF e endereço), em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).

Os dados de pagamento são processados diretamente pelo gateway de pagamento em ambiente seguro; não armazenamos dados de cartão.

Você pode solicitar a consulta, correção ou exclusão dos seus dados a qualquer momento pelo e-mail ${site.email}.`,
  },
  contato: {
    title: "Fale conosco",
    body: `WhatsApp: atendimento de segunda a sexta, das 9h às 18h.

E-mail: ${site.email}

${site.name} · CNPJ ${site.cnpj} · ${site.address}`,
  },
};
