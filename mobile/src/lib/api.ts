import axios from 'axios';

const devHeaders = {
  'x-dev-uid': 'mobile-dev-user',
  'x-dev-role': 'customer',
  'x-dev-email': 'mobile@nectarsweet.com'
};

let authToken = '';

export const setMobileAuthToken = (token: string | null) => {
  authToken = token || '';
};

export const mobileApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
});

mobileApi.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  } else {
    Object.assign(config.headers, devHeaders);
  }

  return config;
});
