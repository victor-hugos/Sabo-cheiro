export type Customer = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
};

export type Address = {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
};

export type OrderItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type PaymentMethod = "pix" | "card" | "boleto";

export type Order = {
  id: string;
  createdAt: string;
  customer: Customer;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
};

export type PaymentResult =
  | { type: "redirect"; url: string }
  | { type: "manual"; orderId: string };

export interface PaymentProvider {
  name: string;
  createPayment(order: Order, siteUrl: string): Promise<PaymentResult>;
}
