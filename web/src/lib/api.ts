import axios from 'axios';
import { tokenStore } from './tokenStore';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  const devUid = localStorage.getItem('nectar_dev_uid');
  const devRole = localStorage.getItem('nectar_dev_role');
  const devEmail = localStorage.getItem('nectar_dev_email');
  const devPhone = localStorage.getItem('nectar_dev_phone');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Dev-role headers are sent when available, and always when no token exists.
  if (devUid || devRole || !token) {
    config.headers['x-dev-uid'] = devUid || 'dev-user';
    config.headers['x-dev-role'] = devRole || 'customer';
    config.headers['x-dev-email'] = devEmail || 'customer@nectarsweet.com';
    config.headers['x-dev-phone'] = devPhone || '';
  }

  return config;
});
