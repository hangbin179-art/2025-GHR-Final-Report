/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Direction A tokens
        midnight: '#111222',
        orange: {
          DEFAULT: '#FF5515',
          100: '#FFF0EB',
          800: '#F14014',
          900: '#D93010',
        },
        field: {
          50: '#F3F2F0',
          200: '#E0DDD8',
          300: '#C8C4BD',
        },
        grey: {
          500: '#6D6A76',
          600: '#6B6762',
          700: '#524F4C',
          800: '#3A3835',
        },
        // legacy FIELD DISPATCH (kept for compatibility)
        paper: {
          DEFAULT: '#F3F2F0',
          sub: '#F3F2F0',
        },
        wv: {
          orange: '#FF5515',
          'orange-dark': '#F14014',
          'orange-light': '#FFF0EB',
        },
        ink: {
          DEFAULT: '#111222',
          press: '#111222',
          soft: '#3A3835',
          muted: '#6B6762',
          line: '#E0DDD8',
        },
        crisis: '#C8102E',
        teal: '#0E7C7B',
        gold: '#F4B223',
        sage: '#3F8F5B',
        sky: '#2D6CB6',
        canvas: '#F3F2F0',
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        en: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        kr: ['"Noto Sans KR"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'draw-arc': {
          '0%': { strokeDashoffset: 'var(--arc-len)' },
          '100%': { strokeDashoffset: 'var(--arc-offset, 0)' },
        },
      },
      animation: {
        'draw-arc': 'draw-arc 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
