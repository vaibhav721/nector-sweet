import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Lora', 'serif'],
        body: ['Nunito Sans', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(25, 24, 20, 0.08)'
      },
      keyframes: {
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 450ms ease forwards'
      }
    }
  },
  plugins: []
};

export default config;
