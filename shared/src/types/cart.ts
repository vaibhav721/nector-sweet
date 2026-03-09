import type { PurchaseMode, SubscriptionFrequency } from './enums.js';

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  variantName: string;
  quantity: number;
  purchaseMode: PurchaseMode;
  unitPrice: number;
  frequency?: SubscriptionFrequency;
  customDaysOfWeek?: number[];
}

export interface Cart {
  id: string;
  userId: string;
  city?: string;
  area?: string;
  pincode?: string;
  items: CartItem[];
  subtotal: number;
  subscriptionDiscount: number;
  tax: number;
  total: number;
  updatedAt: string;
}
