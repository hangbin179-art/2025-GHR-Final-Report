/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'C:/dev/food-crisis-dashboard/index.html',
    'C:/dev/food-crisis-dashboard/src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // World Vision brand + humanitarian palette
        wv: {
          orange: '#F47920',
          'orange-dark': '#D85F12',
          'orange-light': '#FDEEE2',
        },
        ink: {
          DEFAULT: '#16233A', // deep navy — dark sections, headings
          soft: '#27374D',
          muted: '#5A6B82',
        },
        crisis: '#C8102E', // severity red — nutrition / conflict
        gold: '#F4B223', // school feeding / accent
        teal: '#0E7C7B', // cash & voucher
        sage: '#3F8F5B', // livelihood / progress
        sky: '#2D6CB6', // nutrition / water
        canvas: '#F6F7F9', // page background
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Pretendard Variable',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,35,58,0.04), 0 8px 24px rgba(16,35,58,0.08)',
        panel: '0 10px 40px rgba(16,35,58,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in': 'slide-in 0.35s ease-out both',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
