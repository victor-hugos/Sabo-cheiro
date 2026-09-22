// Catálogo de produtos. Fotos em /public/produtos (JPG convertido das fotos originais em /fotos-originais).
// Os preços do checkout são sempre recalculados a partir deste arquivo no servidor.
//
// Todos os sabonetes têm a mesma base (manteiga de karité + óleo de amêndoas + argila natural
// + extratos vegetais). O que muda é a fragrância, o formato e a cor.
// Campos ainda sem informação ficam vazios e aparecem no site como os textos PENDENTE_* abaixo.

export const PENDENTE_FRAGRANCIA = "[definir fragrância]";
export const PENDENTE_PESO = "[confirmar peso]";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // slug da categoria
  price: number;
  compareAtPrice?: number; // preço "de" (riscado)
  images: string[];
  fragrance?: string; // vazio = PENDENTE_FRAGRANCIA
  weight?: string; // vazio = PENDENTE_PESO
  shortDescription: string;
  description: string;
  ingredients?: string;
  tags?: ("mais-vendido" | "lancamento" | "promocao" | "preco-lancamento" | "kit")[];
  stock: number;
};

const BASE =
  "Manteiga de karité, óleo de amêndoas, argila natural [confirmar qual: branca, vermelha, bege ou preta], extratos vegetais [confirmar quais: aloe vera, açafrão] e fragrância.";

export const categories: Category[] = [
  {
    slug: "massageadores",
    name: "Massageadores",
    description: "Pinos em relevo que massageiam a pele enquanto a espuma cremosa faz o resto.",
    image: "/produtos/massageador-azul-1.jpg",
  },
  {
    slug: "florais",
    name: "Florais",
    description: "Sabonetes redondos com relevo floral, embalados um a um.",
    image: "/produtos/floral-rosa-1.jpg",
  },
  {
    slug: "especiais",
    name: "Especiais e Decorados",
    description: "Peças com acabamento especial e kits prontos para presentear.",
    image: "/produtos/decorado-1.jpg",
  },
];

export const products: Product[] = [
  {
    id: "MS001",
    slug: "sabonete-massageador-laranja",
    name: "Sabonete Massageador Laranja",
    category: "massageadores",
    price: 25,
    images: ["/produtos/massageador-laranja-1.jpg", "/produtos/massageador-laranja-2.jpg", "/produtos/massageador-laranja-3.jpg"],
    shortDescription: "Barra com pinos em relevo que massageiam a pele, sobre a nossa base de karité e amêndoas.",
    description:
      "Os pinos em relevo massageiam a pele durante o banho, e os pontinhos na superfície dão um toque esfoliante. Por baixo de tudo está a nossa base de manteiga de karité e óleo de amêndoas, que deixa a espuma cremosa e a pele macia. Feito à mão, em pequenos lotes.",
    ingredients: BASE,
    tags: ["mais-vendido", "preco-lancamento"],
    stock: 20,
  },
  {
    id: "MS002",
    slug: "sabonete-massageador-amarelo",
    name: "Sabonete Massageador Amarelo",
    category: "massageadores",
    price: 25,
    images: ["/produtos/massageador-amarelo-1.jpg", "/produtos/massageador-amarelo-2.jpg"],
    shortDescription: "Formato oval com pinos em relevo para massagear e relaxar, com karité e amêndoas.",
    description:
      "Um sabonete oval que cabe na mão, com pinos em relevo que massageiam a pele enquanto você se ensaboa. A base de manteiga de karité e óleo de amêndoas garante aquela espuma cremosa e a pele macia depois do banho. Feito à mão, em pequenos lotes.",
    ingredients: BASE,
    tags: ["mais-vendido", "preco-lancamento"],
    stock: 20,
  },
  {
    id: "MS003",
    slug: "sabonete-massageador-azul",
    name: "Sabonete Massageador Azul",
    category: "massageadores",
    price: 25,
    images: ["/produtos/massageador-azul-1.jpg", "/produtos/massageador-azul-2.jpg"],
    shortDescription: "Oval em duas camadas, com pinos em relevo e sementinhas, sobre karité e amêndoas.",
    description:
      "Duas camadas, azul e branca, com pinos em relevo que massageiam a pele e sementinhas que dão um leve toque esfoliante. A base é a mesma de todos os nossos sabonetes: manteiga de karité e óleo de amêndoas, para uma espuma cremosa e pele macia. Feito à mão, em pequenos lotes.",
    ingredients: BASE,
    tags: ["lancamento", "preco-lancamento"],
    stock: 20,
  },
  {
    id: "FL001",
    slug: "sabonete-floral-rosa",
    name: "Sabonete Floral Rosa",
    category: "florais",
    price: 20,
    images: ["/produtos/floral-rosa-1.jpg", "/produtos/floral-rosa-2.jpg"],
    shortDescription: "Redondo, rosa e perolado, com relevo floral e a nossa base de karité e amêndoas.",
    description:
      "Um sabonete redondo com relevo floral e brilho perolado, bonito de ver e gostoso de usar. A manteiga de karité e o óleo de amêndoas deixam a espuma cremosa e a pele macia, com um cheiro que fica. Feito à mão e embalado individualmente.",
    ingredients: BASE,
    tags: ["mais-vendido", "preco-lancamento"],
    stock: 20,
  },
  {
    id: "FL002",
    slug: "sabonete-floral-verde",
    name: "Sabonete Floral Verde",
    category: "florais",
    price: 20,
    images: ["/produtos/floral-verde-1.jpg", "/produtos/floral-verde-2.jpg", "/produtos/floral-verde-3.jpg"],
    shortDescription: "Redondo, verde menta, com relevo floral e a nossa base de karité e amêndoas.",
    description:
      "Verde menta, redondo e com relevo floral em toda a superfície. Por dentro, a mesma base de sempre: manteiga de karité e óleo de amêndoas, para uma espuma cremosa e pele macia. Feito à mão e embalado individualmente.",
    ingredients: BASE,
    tags: ["lancamento", "preco-lancamento"],
    stock: 20,
  },
  {
    id: "FL003",
    slug: "sabonete-floral-perolado",
    name: "Sabonete Floral Perolado",
    category: "florais",
    price: 20,
    images: ["/produtos/floral-perolado-1.jpg"],
    shortDescription: "Redondo, branco perolado, com borda em arabescos e a nossa base de karité e amêndoas.",
    description:
      "Branco perolado, com uma moldura de arabescos em relevo. Delicado de ver e cremoso de usar, graças à manteiga de karité e ao óleo de amêndoas. Feito à mão e embalado individualmente.",
    ingredients: BASE,
    tags: ["preco-lancamento"],
    stock: 20,
  },
  {
    id: "ES001",
    slug: "sabonete-especial-verde",
    name: "Sabonete Especial",
    category: "especiais",
    price: 22,
    images: ["/produtos/especial-verde-1.jpg"],
    shortDescription: "Oval verde com “Sabonete Especial” em relevo, com a nossa base de karité e amêndoas.",
    description:
      "Um sabonete oval com a inscrição “Sabonete Especial” em relevo e brilho perolado. Um mimo pronto para presentear, com a mesma base cremosa de manteiga de karité e óleo de amêndoas. Feito à mão e embalado individualmente.",
    ingredients: BASE,
    tags: ["preco-lancamento"],
    stock: 20,
  },
  {
    id: "ES002",
    slug: "sabonete-decorado",
    name: "Sabonete Decorado Coração & Flor",
    category: "especiais",
    price: 22,
    images: ["/produtos/decorado-1.jpg"],
    shortDescription: "Barra com aplique de coração ou flor feito à mão, sobre a nossa base de karité e amêndoas.",
    description:
      "Uma barra decorada à mão com aplique de coração ou de flor. Chama a atenção pelo visual e conquista pela espuma cremosa da manteiga de karité com óleo de amêndoas. Embalado individualmente, pronto para presentear.",
    ingredients: BASE,
    tags: ["lancamento", "preco-lancamento"],
    stock: 20,
  },
  // Kits (proposta): florais de R$ 20. Caixinha com 2 = R$ 39 (preço que já é praticado na venda direta).
  // Kit com 3 = R$ 57 (3 x R$ 20 = R$ 60, 5% de desconto, R$ 19 por sabonete). [confirmar custo da caixinha]
  {
    id: "KT002",
    slug: "caixinha-2-sabonetes-florais",
    name: "Kit Caixinha com 2 Sabonetes Florais",
    category: "especiais",
    price: 39,
    compareAtPrice: 40,
    images: ["/banners/florais.jpg"],
    fragrance: "Você escolhe",
    weight: `2 x ${PENDENTE_PESO}`,
    shortDescription: "Dois florais numa caixinha, prontos para presentear (ou para você).",
    description:
      "Dois sabonetes florais, embalados um a um e acomodados numa caixinha. Depois da compra, nós chamamos você no WhatsApp para escolher as cores e fragrâncias entre os modelos disponíveis.",
    ingredients: BASE,
    tags: ["kit", "preco-lancamento"],
    stock: 10,
  },
  {
    id: "KT003",
    slug: "kit-3-sabonetes-florais",
    name: "Kit com 3 Sabonetes Florais",
    category: "especiais",
    price: 57,
    compareAtPrice: 60,
    images: ["/banners/florais.jpg"],
    fragrance: "Você escolhe",
    weight: `3 x ${PENDENTE_PESO}`,
    shortDescription: "Três florais com um descontinho: cada sabonete sai por R$ 19.",
    description:
      "Três sabonetes florais, embalados um a um, para ter sempre um no banho ou para presentear. Depois da compra, nós chamamos você no WhatsApp para escolher as cores e fragrâncias entre os modelos disponíveis.",
    ingredients: BASE,
    tags: ["kit", "preco-lancamento"],
    stock: 10,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function fragranceOf(p: Product) {
  return p.fragrance || PENDENTE_FRAGRANCIA;
}

export function weightOf(p: Product) {
  return p.weight || PENDENTE_PESO;
}

// Fragrâncias já definidas (usadas no filtro do catálogo). Placeholders e kits ficam de fora.
export function definedFragrances() {
  return [...new Set(products.filter((p) => p.fragrance && !p.tags?.includes("kit")).map((p) => p.fragrance!))].sort();
}

export function productsByTag(tag: NonNullable<Product["tags"]>[number]) {
  return products.filter((p) => p.tags?.includes(tag));
}
