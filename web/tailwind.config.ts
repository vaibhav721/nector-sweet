import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // Disable auto dark mode based on os preference. Effectively it will always be light if we don't apply the 'dark' class.
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#10b981', // Modern vibrant green
          hover: '#059669',
        },
        secondary: {
          DEFAULT: '#f3f4f6', // Very subtle gray for secondary
          hover: '#e5e7eb',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          800: '#1f2937',
          900: '#111827',
        }
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        card: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)'
      },
      keyframes: {
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }
    }
  },
  plugins: []
};

export default config;
