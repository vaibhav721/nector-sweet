import { create } from 'zustand';
import { apiClient } from '../lib/api';

type CartState = {
  cart: any;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (payload: {
    variantId: string;
    quantity: number;
    purchaseMode: 'ONE_TIME' | 'SUBSCRIPTION';
    frequency?: 'DAILY' | 'ALTERNATE_DAY' | 'CUSTOM';
    customDaysOfWeek?: number[];
  }) => Promise<void>;
  updateItem: (itemId: string, payload: Record<string, unknown>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  setLocation: (payload: { city: string; area: string; pincode: string }) => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,
  async fetchCart() {
    set({ loading: true });
    const response = await apiClient.get('/cart');
    set({ cart: response.data.data, loading: false });
  },
  async addItem(payload) {
    const response = await apiClient.post('/cart/items', payload);
    set({ cart: response.data.data });
  },
  async updateItem(itemId, payload) {
    const response = await apiClient.patch(`/cart/items/${itemId}`, payload);
    set({ cart: response.data.data });
  },
  async removeItem(itemId) {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    set({ cart: response.data.data });
  },
  async setLocation(payload) {
    const response = await apiClient.post('/cart/location', payload);
    set({ cart: response.data.data });
  }
}));
