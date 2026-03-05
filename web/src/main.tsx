import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { brandConfig } from '@nectar-sweet/shared';
import { AppRouter } from './app/AppRouter';
import { AuthProvider } from './context/AuthContext';
import './styles/globals.css';

const queryClient = new QueryClient();

const rootStyle = document.documentElement.style;
rootStyle.setProperty('--color-primary', brandConfig.colors.primary);
rootStyle.setProperty('--color-secondary', brandConfig.colors.secondary);
rootStyle.setProperty('--color-accent', brandConfig.colors.accent);
rootStyle.setProperty('--color-background', brandConfig.colors.background);
rootStyle.setProperty('--color-text', brandConfig.colors.text);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
