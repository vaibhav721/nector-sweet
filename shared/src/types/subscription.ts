import type { SubscriptionFrequency, SubscriptionStatus } from './enums.js';

export interface Subscription {
  id: string;
  userId: string;
  variantId: string;
  quantity: number;
  frequency: SubscriptionFrequency;
  customDaysOfWeek?: number[];
  status: SubscriptionStatus;
  startDate: string;
  nextDeliveryDate: string;
  pauseFrom?: string;
  pauseUntil?: string;
}

export interface SubscriptionScheduleOverride {
  id: string;
  subscriptionId: string;
  date: string;
  action: 'SKIP' | 'EXTRA_QUANTITY' | 'SET_QUANTITY';
  extraQuantity?: number;
  quantity?: number;
  note?: string;
}
