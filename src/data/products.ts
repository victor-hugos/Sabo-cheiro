// Catálogo de produtos. Fotos em /public/produtos (JPG convertido das fotos originais em /fotos-originais).
// Os preços do checkout são sempre recalculados a partir deste arquivo no servidor.
//
// ATENÇÃO: nomes, preços, pesos e estoques abaixo são PROVISÓRIOS — as fotos não
// traziam essas informações. Confirme cada item antes de publicar.

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
  shortDescription: string;
  description: string;
  ingredients?: string;
  weight?: string;
  tags?: ("mais-vendido" | "lancamento" | "promocao")[];
  stock: number;
};

export const categories: Category[] = [
  {
    slug: "massageadores",
    name: "Massageadores",
    description: "Sabonetes com relevo em pinos que massageiam a pele durante o banho.",
    image: "/produtos/massageador-azul-1.jpg",
  },
  {
    slug: "florais",
    name: "Florais",
    description: "Sabonetes redondos com relevo floral delicado, embalados individualmente.",
    image: "/produtos/floral-rosa-1.jpg",
  },
  {
    slug: "especiais",
    name: "Especiais e Decorados",
    description: "Peças com acabamento especial, ótimas para presentear.",
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
    shortDescription: "Barra retangular com pinos massageadores e pontinhos esfoliantes.",
    description:
      "Sabonete artesanal em barra retangular, com pinos em relevo que massageiam a pele e pontinhos esfoliantes na superfície. Tom laranja vibrante, feito à mão.",
    tags: ["mais-vendido"],
    stock: 20,
  },
  {
    id: "MS002",
    slug: "sabonete-massageador-amarelo",
    name: "Sabonete Massageador Amarelo",
    category: "massageadores",
    price: 25,
    images: ["/produtos/massageador-amarelo-1.jpg", "/produtos/massageador-amarelo-2.jpg"],
    shortDescription: "Formato oval com pinos massageadores, em tom amarelo suave.",
    description:
      "Sabonete artesanal oval com pinos em relevo, pensado para massagear e relaxar durante o banho. Tom amarelo suave, feito à mão.",
    tags: ["mais-vendido"],
    stock: 20,
  },
  {
    id: "MS003",
    slug: "sabonete-massageador-azul",
    name: "Sabonete Massageador Azul",
    category: "massageadores",
    price: 25,
    images: ["/produtos/massageador-azul-1.jpg", "/produtos/massageador-azul-2.jpg"],
    shortDescription: "Oval translúcido em duas camadas, com sementes e pinos massageadores.",
    description:
      "Sabonete artesanal oval em duas camadas (azul translúcido e branco), com pinos massageadores e sementes aparentes que dão um toque esfoliante.",
    tags: ["lancamento"],
    stock: 20,
  },
  {
    id: "FL001",
    slug: "sabonete-floral-rosa",
    name: "Sabonete Floral Rosa",
    category: "florais",
    price: 20,
    images: ["/produtos/floral-rosa-1.jpg", "/produtos/floral-rosa-2.jpg"],
    shortDescription: "Redondo, com relevo floral e acabamento perolado.",
    description:
      "Sabonete artesanal redondo em tom rosa, com relevo floral detalhado e brilho perolado. Embalado individualmente.",
    tags: ["mais-vendido"],
    stock: 20,
  },
  {
    id: "FL002",
    slug: "sabonete-floral-verde",
    name: "Sabonete Floral Verde",
    category: "florais",
    price: 20,
    images: ["/produtos/floral-verde-1.jpg", "/produtos/floral-verde-2.jpg", "/produtos/floral-verde-3.jpg"],
    shortDescription: "Redondo, verde menta, com relevo floral.",
    description:
      "Sabonete artesanal redondo em verde menta, com relevo floral delicado em toda a superfície. Embalado individualmente.",
    tags: ["lancamento"],
    stock: 20,
  },
  {
    id: "FL003",
    slug: "sabonete-floral-perolado",
    name: "Sabonete Floral Perolado",
    category: "florais",
    price: 20,
    images: ["/produtos/floral-perolado-1.jpg"],
    shortDescription: "Redondo, branco perolado, com borda em arabescos.",
    description:
      "Sabonete artesanal redondo em branco perolado, com moldura de arabescos em relevo. Elegante e delicado, embalado individualmente.",
    stock: 20,
  },
  {
    id: "ES001",
    slug: "sabonete-especial-verde",
    name: "Sabonete Especial",
    category: "especiais",
    price: 22,
    images: ["/produtos/especial-verde-1.jpg"],
    shortDescription: "Oval verde com a inscrição “Sabonete Especial” em relevo.",
    description:
      "Sabonete artesanal oval em verde, com a inscrição “Sabonete Especial” em relevo e brilho perolado. Um mimo para presentear.",
    stock: 20,
  },
  {
    id: "ES002",
    slug: "sabonete-decorado",
    name: "Sabonete Decorado Coração & Flor",
    category: "especiais",
    price: 22,
    images: ["/produtos/decorado-1.jpg"],
    shortDescription: "Barra retangular com aplique de coração ou flor.",
    description:
      "Sabonete artesanal em barra retangular, decorado à mão com aplique de coração ou de flor em laranja. Embalado individualmente.",
    tags: ["lancamento"],
    stock: 20,
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

export function productsByTag(tag: NonNullable<Product["tags"]>[number]) {
  return products.filter((p) => p.tags?.includes(tag));
}
