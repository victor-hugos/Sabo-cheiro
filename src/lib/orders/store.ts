import type { Order } from "@/lib/payments";

// Ponto único de persistência de pedidos.
// Hoje apenas registra no log do servidor. Para produção, troque por um banco
// (ex.: Supabase, Vercel Postgres, Firebase) mantendo estas duas funções.
export async function saveOrder(order: Order) {
  console.log("[pedido criado]", JSON.stringify(order));
}

export async function updateOrderStatus(orderId: string, status: string, raw?: unknown) {
  console.log("[pedido atualizado]", orderId, status, raw ? JSON.stringify(raw) : "");
}
