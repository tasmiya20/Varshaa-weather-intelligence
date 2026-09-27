import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0B3D91',
          dark: '#062A63',
          light: '#EAF1FB',
        },
        accent: {
          DEFAULT: '#0891B2',
          light: '#E0F7FA',
        },
        success: { DEFAULT: '#16A34A', light: '#E9F9EF' },
        warning: { DEFAULT: '#D97706', light: '#FEF3E2' },
        danger: { DEFAULT: '#DC2626', light: '#FDECEC' },
        surface: '#FFFFFF',
        canvas: '#F5F7FA',
        border: '#E3E8F0',
        ink: { DEFAULT: '#0F172A', muted: '#64748B', faint: '#94A3B8' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.04), 0 1px 8px rgba(15,23,42,0.04)',
        panel: '0 4px 24px rgba(15,23,42,0.06)',
      },
      borderRadius: { xl2: '1rem' },
    },
  },
  plugins: [],
} satisfies Config
