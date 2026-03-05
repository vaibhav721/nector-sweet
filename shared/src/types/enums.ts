export type UserRole = 'guest' | 'customer' | 'admin';

export type ProductType = 'MILK' | 'CURD' | 'PANEER' | 'GHEE';

export type PurchaseMode = 'ONE_TIME' | 'SUBSCRIPTION';

export type SubscriptionFrequency = 'DAILY' | 'ALTERNATE_DAY' | 'CUSTOM';

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED';

export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PACKING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus =
  | 'PAYMENT_PENDING'
  | 'MANUAL_SETTLEMENT'
  | 'PAY_LATER'
  | 'PAID';

export type NotificationType = 'ORDER' | 'SUBSCRIPTION' | 'SYSTEM';
