import axios from 'axios';
import { tokenStore } from './tokenStore';
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});
apiClient.interceptors.request.use((config) => {
    const token = tokenStore.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Helpful local fallback when Firebase credentials are not configured.
    if (!token) {
        config.headers['x-dev-uid'] = localStorage.getItem('nectar_dev_uid') || 'dev-user';
        config.headers['x-dev-role'] = localStorage.getItem('nectar_dev_role') || 'customer';
        config.headers['x-dev-email'] = localStorage.getItem('nectar_dev_email') || 'customer@nectarsweet.com';
        config.headers['x-dev-phone'] = localStorage.getItem('nectar_dev_phone') || '';
    }
    return config;
});
