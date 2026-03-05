export interface AdminSummary {
  todaysDeliveries: number;
  activeSubscriptions: number;
  newUsers: number;
}

export interface InventorySnapshot {
  variantId: string;
  availableQty: number;
  reservedQty: number;
  inStock: boolean;
}
