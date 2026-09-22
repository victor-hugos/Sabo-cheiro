import { notFound } from "next/navigation";
import OrderStatus from "./OrderStatus";

const valid = ["sucesso", "pendente", "falha"] as const;

export default async function OrderPage({ params }: { params: Promise<{ status: string }> }) {
  const { status } = await params;
  if (!valid.includes(status as (typeof valid)[number])) notFound();
  return <OrderStatus status={status as (typeof valid)[number]} />;
}
