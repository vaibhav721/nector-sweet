import type { OrderStatus, PaymentStatus, PurchaseMode } from './enums.js';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  purchaseMode: PurchaseMode;
  subscriptionId?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  city: string;
  area: string;
  pincode: string;
  deliverySlotLabel: string;
  subtotal: number;
  subscriptionDiscount: number;
  tax: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}
