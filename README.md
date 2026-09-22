# Sabo Cheiro — Loja virtual de sabonetes artesanais

E-commerce completo em **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, no estilo das lojas de cosméticos brasileiras (vitrines, carrinho lateral, PIX com desconto, parcelamento, frete grátis progressivo, WhatsApp).

## Funcionalidades

- Home com barra de avisos, banner carrossel, benefícios, categorias, vitrines (mais vendidos, lançamentos), banners promocionais e newsletter
- Catálogo com filtro por categoria, busca (sem acento), ofertas/lançamentos e ordenação
- Página de produto com galeria, preço "de/por", parcelas, preço no PIX, estoque baixo e SEO (JSON-LD)
- Carrinho lateral + página de carrinho, salvo no navegador, com barra de progresso até o frete grátis
- Checkout com máscaras (CPF, telefone, CEP), validação de CPF, busca de endereço pelo CEP (ViaCEP) e escolha de PIX, cartão ou boleto
- API `/api/checkout` que **recalcula preços, frete e desconto no servidor** (o navegador nunca define o valor)
- Gateways prontos: **Mercado Pago (Checkout Pro)**, **Stripe Checkout** ou **manual** (PIX/WhatsApp, sem gateway)
- Webhooks com verificação de assinatura: `/api/webhooks/mercadopago` e `/api/webhooks/stripe`
- Páginas institucionais (sobre, trocas, entrega, privacidade/LGPD, contato), 404, `sitemap.xml` e `robots.txt`
- Botão flutuante de WhatsApp, layout responsivo (celular, tablet e desktop)

## Como rodar

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome da loja, WhatsApp, e-mail, chave PIX, frete grátis, parcelas, desconto PIX | `src/data/site.ts` |
| Produtos e categorias | `src/data/products.ts` |
| Fotos dos produtos | `public/produtos/` |
| Banners da home | `src/components/HeroCarousel.tsx` |
| Textos institucionais | `src/data/pages.ts` |
| Cores e fontes | `tailwind.config.ts` |

### Cadastrando o catálogo

1. Copie as fotos do catálogo para `public/produtos/` (JPG, PNG ou WebP, de preferência quadradas, com 1000×1000 px ou mais).
2. Em `src/data/products.ts`, edite ou adicione um item para cada produto:
   ```ts
   {
     id: "SB010",                       // código único
     slug: "sabonete-de-camomila",      // aparece na URL
     name: "Sabonete de Camomila",
     category: "sabonetes-em-barra",
     price: 23.9,
     compareAtPrice: 27.9,              // opcional (preço riscado)
     images: ["/produtos/camomila.jpg", "/produtos/camomila-2.jpg"],
     shortDescription: "...",
     description: "...",
     ingredients: "...",                // opcional
     weight: "100 g",                   // opcional
     tags: ["lancamento"],              // "mais-vendido" | "lancamento" | "promocao"
     stock: 20,
   }
   ```
3. As imagens `.svg` atuais são provisórias. Apague-as quando as fotos reais estiverem no lugar.

## Pagamentos

Escolha o gateway com a variável `PAYMENT_PROVIDER` no `.env.local` (ou nas variáveis de ambiente da hospedagem):

- **`manual`** (padrão): o pedido é registrado e o cliente vê a chave PIX e um botão de WhatsApp. Serve para começar a vender sem gateway.
- **`mercadopago`**: defina `MERCADOPAGO_ACCESS_TOKEN` (painel do desenvolvedor do Mercado Pago → Credenciais). O cliente é enviado ao Checkout Pro (PIX, cartão e boleto). Configure o webhook para `https://SEU-DOMINIO/api/webhooks/mercadopago` (evento *Pagamentos*) e copie a assinatura secreta para `MERCADOPAGO_WEBHOOK_SECRET`.
- **`stripe`**: defina `STRIPE_SECRET_KEY`. Crie o webhook `https://SEU-DOMINIO/api/webhooks/stripe` com os eventos `checkout.session.*` e copie o segredo para `STRIPE_WEBHOOK_SECRET`.

Para outro gateway (PagSeguro, Asaas, Pagar.me...), crie um arquivo em `src/lib/payments/` implementando `PaymentProvider` e registre-o em `src/lib/payments/index.ts`.

### Pedidos

Hoje os pedidos e as atualizações dos webhooks aparecem **apenas no log do servidor** (`src/lib/orders/store.ts`). Antes de vender em produção, conecte um banco de dados (por exemplo Supabase, Vercel Postgres ou Firebase) nessas duas funções e/ou dispare um e-mail/WhatsApp para a loja.

## Publicação (Vercel, recomendado)

1. Importe este repositório em https://vercel.com/new (o framework Next.js é detectado sozinho).
2. Adicione as variáveis de ambiente do `.env.example`, com `NEXT_PUBLIC_SITE_URL` sendo o domínio final (ex.: `https://sabocheiro.com.br`).
3. Faça o deploy e aponte o domínio. Depois, cadastre as URLs de webhook no gateway.

O projeto também roda em qualquer hospedagem Node 18+ com `npm run build && npm start`.

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm start`: servidor de produção
- `npm run typecheck`: verificação de tipos
