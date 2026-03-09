import { create } from 'zustand';
import { apiClient } from '../lib/api';
export const useCartStore = create((set) => ({
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
