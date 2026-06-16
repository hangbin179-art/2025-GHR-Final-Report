/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'C:/dev/food-crisis-dashboard/index.html',
    'C:/dev/food-crisis-dashboard/src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // FIELD DISPATCH — warm paper ground, ink type, single orange instrument
        paper: {
          DEFAULT: '#FBFAF7', // warm newsprint cream — default ground (replaces cold canvas)
          sub: '#F4F1EA', // content-plane separation / footnote rail
        },
        wv: {
          orange: '#F47920', // the one instrument color: solid rings, accent figure, CTA, WV mark
          'orange-dark': '#D85F12',
          'orange-light': '#FDEEE2', // effectively retired (no tint fills)
        },
        ink: {
          DEFAULT: '#16233A', // newspaper ink / headings / body
          press: '#10192B', // deeper ink plane — giant figures, footer
          soft: '#27374D',
          muted: '#5A6B82',
          line: '#D8D2C6', // 1px hairline rule on paper (warm, not gray)
        },
        // data categories — line/dot encoding ONLY (no fill tints)
        crisis: '#C8102E',
        gold: '#F4B223',
        teal: '#0E7C7B',
        sage: '#3F8F5B',
        sky: '#2D6CB6',
        canvas: '#FBFAF7', // legacy alias → paper (keeps old refs from breaking)
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
        display: ['Anton', 'system-ui', 'sans-serif'], // latin/numeral display
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'], // footnotes/labels
        archivo: ['Archivo', 'system-ui', 'sans-serif'], // supporting latin figures
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
