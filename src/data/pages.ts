import { site } from "./site";

// Páginas institucionais. Edite os textos livremente (parágrafos separados por linha em branco).
const contact = site.email
  ? `pelo WhatsApp ${site.whatsappDisplay} ou pelo e-mail ${site.email}`
  : `pelo WhatsApp ${site.whatsappDisplay}`;

export const pages: Record<string, { title: string; body: string }> = {
  sobre: {
    title: "Sobre nós",
    body: `Os nossos sabonetes artesanais têm em sua composição a manteiga de karité e o óleo de amêndoas como base, combinados com argilas, extratos vegetais e fragrâncias de alta qualidade, todos escolhidos para criar experiências únicas. Independentemente da fragrância escolhida, existe um padrão de qualidade presente em todos os produtos.

Nós fazemos tudo à mão, em pequenos lotes. Usamos argilas naturais (branca, vermelha, bege ou preta) e extratos vegetais, como aloe vera e açafrão, que nós colhemos com as próprias mãos. O que muda de um sabonete para outro é a fragrância, o formato e a cor. A base é sempre a mesma.

Para nós, fazer sabonete é a hora em que a mente descansa. É isso que queremos que chegue até você: um banho com calma, espuma cremosa e um cheiro gostoso que fica na pele.

Fazemos sabonetes para homens e mulheres que valorizam um bom cheiro, textura cremosa, aquele ritual que nos dá prazer. Cada peça é embalada individualmente, com o mesmo cuidado que colocamos na receita.`,
  },
  "trocas-e-devolucoes": {
    title: "Trocas e devoluções",
    body: `Você pode desistir da compra em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor (art. 49). O produto deve estar lacrado e sem uso.

Se o produto chegar avariado ou diferente do pedido, fale com a gente em até 7 dias ${contact}, com fotos do produto e da embalagem, que nós fazemos a troca sem custo.

O reembolso é feito pelo mesmo meio de pagamento em até 10 dias úteis após o recebimento da devolução.`,
  },
  entrega: {
    title: "Prazos de entrega",
    body: `Nós separamos e postamos os pedidos em até 2 dias úteis após a confirmação do pagamento.

Enviamos para todo o Brasil via Correios ou transportadora. O prazo de entrega varia de acordo com a região e é informado junto com o código de rastreio.

Ficou com alguma dúvida sobre o envio? Fale com a gente ${contact}.`,
  },
  privacidade: {
    title: "Política de privacidade",
    body: `Nós coletamos apenas os dados necessários para processar e entregar o seu pedido (nome, e-mail, telefone, CPF e endereço), em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).

Os dados de pagamento são processados diretamente pelo gateway de pagamento em ambiente seguro; nós não armazenamos dados de cartão.

Você pode pedir a consulta, correção ou exclusão dos seus dados a qualquer momento ${contact}.`,
  },
  contato: {
    title: "Fale conosco",
    body: `Nós atendemos pelo WhatsApp: ${site.whatsappDisplay}. Pode chamar para tirar dúvidas sobre fragrâncias, pedir ajuda para escolher um presente ou acompanhar o seu pedido.

Para kits e lembrancinhas de casamentos, festas e brindes corporativos, conte a quantidade e a data do evento que nós mostramos os modelos prontos disponíveis.${site.email ? `

E-mail: ${site.email}` : ""}`,
  },
};
