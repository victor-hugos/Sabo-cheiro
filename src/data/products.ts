// Catálogo de produtos. Para cadastrar o catálogo real:
// 1. Copie as fotos para /public/produtos (ex: /public/produtos/lavanda.jpg)
// 2. Edite/adicione itens abaixo apontando `images` para o arquivo.
// Os preços do checkout são sempre recalculados a partir deste arquivo no servidor.

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
    slug: "sabonetes-em-barra",
    name: "Sabonetes em Barra",
    description: "Barras artesanais com óleos vegetais e manteigas nobres.",
    image: "/produtos/cat-barra.svg",
  },
  {
    slug: "sabonetes-liquidos",
    name: "Sabonetes Líquidos",
    description: "Espuma cremosa e perfume marcante para mãos e corpo.",
    image: "/produtos/cat-liquido.svg",
  },
  {
    slug: "kits-presente",
    name: "Kits Presente",
    description: "Combinações prontas para presentear quem você ama.",
    image: "/produtos/cat-kit.svg",
  },
  {
    slug: "esfoliantes",
    name: "Esfoliantes",
    description: "Renovação suave da pele com ingredientes naturais.",
    image: "/produtos/cat-esfoliante.svg",
  },
  {
    slug: "aromatizacao",
    name: "Aromatização",
    description: "Home sprays e sachês para perfumar a casa.",
    image: "/produtos/cat-aroma.svg",
  },
];

export const products: Product[] = [
  {
    id: "SB001",
    slug: "sabonete-lavanda-francesa",
    name: "Sabonete Lavanda Francesa",
    category: "sabonetes-em-barra",
    price: 24.9,
    compareAtPrice: 29.9,
    images: ["/produtos/lavanda.svg"],
    shortDescription: "Calmante e relaxante, ideal para o banho da noite.",
    description:
      "Feito à mão com óleo essencial de lavanda francesa, manteiga de karité e óleo de coco. Espuma cremosa que limpa sem ressecar e deixa um perfume suave na pele.",
    ingredients: "Óleo de coco, azeite de oliva, manteiga de karité, óleo essencial de lavanda, flores de lavanda.",
    weight: "100 g",
    tags: ["mais-vendido", "promocao"],
    stock: 50,
  },
  {
    id: "SB002",
    slug: "sabonete-alecrim-e-hortela",
    name: "Sabonete Alecrim & Hortelã",
    category: "sabonetes-em-barra",
    price: 22.9,
    images: ["/produtos/alecrim.svg"],
    shortDescription: "Refrescante e energizante para começar o dia.",
    description:
      "Combinação revigorante de alecrim e hortelã-pimenta com argila verde, que ajuda a controlar a oleosidade.",
    ingredients: "Óleo de coco, óleo de palma sustentável, argila verde, óleos essenciais de alecrim e hortelã.",
    weight: "100 g",
    tags: ["mais-vendido"],
    stock: 40,
  },
  {
    id: "SB003",
    slug: "sabonete-mel-e-aveia",
    name: "Sabonete Mel & Aveia",
    category: "sabonetes-em-barra",
    price: 21.9,
    images: ["/produtos/mel.svg"],
    shortDescription: "Hidratação intensa para peles sensíveis.",
    description:
      "Mel puro e aveia coloidal formam uma barra delicada, perfeita para peles secas e sensíveis. Sem fragrância sintética.",
    ingredients: "Azeite de oliva, óleo de coco, mel, aveia coloidal, manteiga de cacau.",
    weight: "100 g",
    tags: ["lancamento"],
    stock: 35,
  },
  {
    id: "SB004",
    slug: "sabonete-rosas-brancas",
    name: "Sabonete Rosas Brancas",
    category: "sabonetes-em-barra",
    price: 26.9,
    images: ["/produtos/rosas.svg"],
    shortDescription: "Floral delicado com argila rosa.",
    description:
      "Perfume floral elegante com argila rosa e óleo de rosa mosqueta, que auxilia na regeneração da pele.",
    ingredients: "Óleo de coco, óleo de rosa mosqueta, argila rosa, essência de rosas.",
    weight: "100 g",
    tags: ["lancamento"],
    stock: 30,
  },
  {
    id: "SB005",
    slug: "sabonete-carvao-ativado",
    name: "Sabonete Carvão Ativado",
    category: "sabonetes-em-barra",
    price: 24.9,
    images: ["/produtos/carvao.svg"],
    shortDescription: "Limpeza profunda e detox para o rosto e corpo.",
    description:
      "O carvão ativado de bambu absorve impurezas e o óleo de melaleuca tem ação purificante. Indicado para peles oleosas.",
    ingredients: "Óleo de coco, carvão ativado de bambu, óleo essencial de melaleuca.",
    weight: "100 g",
    tags: ["mais-vendido"],
    stock: 45,
  },
  {
    id: "SB006",
    slug: "sabonete-citrico-laranja-doce",
    name: "Sabonete Cítrico Laranja Doce",
    category: "sabonetes-em-barra",
    price: 21.9,
    compareAtPrice: 25.9,
    images: ["/produtos/laranja.svg"],
    shortDescription: "Alegre, cítrico e vitaminado.",
    description: "Óleo essencial de laranja doce com casca de laranja moída para leve esfoliação.",
    ingredients: "Óleo de coco, azeite, óleo essencial de laranja doce, casca de laranja.",
    weight: "100 g",
    tags: ["promocao"],
    stock: 60,
  },
  {
    id: "SL001",
    slug: "sabonete-liquido-erva-doce",
    name: "Sabonete Líquido Erva-Doce",
    category: "sabonetes-liquidos",
    price: 39.9,
    images: ["/produtos/liquido-erva-doce.svg"],
    shortDescription: "Para mãos e corpo, com perfume acolhedor.",
    description: "Base vegetal suave com extrato de erva-doce e glicerina vegetal. Frasco com válvula pump.",
    weight: "250 ml",
    tags: ["mais-vendido"],
    stock: 25,
  },
  {
    id: "SL002",
    slug: "sabonete-liquido-capim-limao",
    name: "Sabonete Líquido Capim-Limão",
    category: "sabonetes-liquidos",
    price: 39.9,
    images: ["/produtos/liquido-capim.svg"],
    shortDescription: "Fresco e herbal, ótimo para lavabos.",
    description: "Óleo essencial de capim-limão em base vegetal hidratante com pantenol.",
    weight: "250 ml",
    tags: ["lancamento"],
    stock: 25,
  },
  {
    id: "KT001",
    slug: "kit-relax-lavanda",
    name: "Kit Relax Lavanda",
    category: "kits-presente",
    price: 89.9,
    compareAtPrice: 109.9,
    images: ["/produtos/kit-lavanda.svg"],
    shortDescription: "2 sabonetes + home spray + caixa presente.",
    description:
      "Kit completo para um momento de autocuidado: 2 sabonetes Lavanda Francesa, 1 home spray de lavanda 120 ml e caixa presente com laço.",
    tags: ["mais-vendido", "promocao"],
    stock: 15,
  },
  {
    id: "KT002",
    slug: "kit-degustacao-4-aromas",
    name: "Kit Degustação 4 Aromas",
    category: "kits-presente",
    price: 79.9,
    images: ["/produtos/kit-4.svg"],
    shortDescription: "4 mini sabonetes para conhecer a marca.",
    description: "Lavanda, Alecrim & Hortelã, Mel & Aveia e Rosas Brancas em versões de 50 g, em caixa kraft.",
    tags: ["lancamento"],
    stock: 20,
  },
  {
    id: "ES001",
    slug: "esfoliante-cafe-e-coco",
    name: "Esfoliante Café & Coco",
    category: "esfoliantes",
    price: 44.9,
    images: ["/produtos/esfoliante-cafe.svg"],
    shortDescription: "Esfoliação corporal ativadora de circulação.",
    description: "Borra de café, açúcar demerara e óleo de coco. Esfolia e hidrata ao mesmo tempo.",
    weight: "200 g",
    stock: 20,
  },
  {
    id: "AR001",
    slug: "home-spray-lavanda",
    name: "Home Spray Lavanda",
    category: "aromatizacao",
    price: 49.9,
    images: ["/produtos/spray-lavanda.svg"],
    shortDescription: "Perfume para ambientes, roupas de cama e tecidos.",
    description: "Aromatizador à base de álcool de cereais e óleo essencial de lavanda. Aplique a 30 cm das superfícies.",
    weight: "120 ml",
    stock: 30,
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
