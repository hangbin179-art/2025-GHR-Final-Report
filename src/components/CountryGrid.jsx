import { AnimatedGradient } from './AnimatedGradient.jsx'

const MAX_FOOD = 3797 // DRC total (3,088+632+76)
const GREEN = '#2F7D4F'

const COUNTRIES = [
  { name: '콩고민주공화국', en: 'DR Congo · S. Kivu, Tanganyika, Kasai', food: 3797, cash: 0 },
  { name: '수단',           en: 'Sudan · S. Darfur, S. Kordofan, White Nile', food: 3322, cash: 0 },
  { name: '아프가니스탄',  en: 'Afghanistan · Ghor, Badghis', food: 829, cash: 0 },
  { name: '에티오피아',    en: 'Ethiopia · Tigray, Afar, Amhara', food: 696, cash: 0 },
  { name: '우간다',        en: 'Uganda · Bidibidi, Lobule', food: 505, cash: 0 },
  { name: '베네수엘라',    en: 'Venezuela · Zulia, Falcón +2', food: 476, cash: 0 },
  { name: '남수단',        en: 'South Sudan · Fashoda, Renk, Juba', food: 412, cash: 0 },
  { name: '차드',          en: 'Chad · Farchana +5 (학교 급식)', food: 199, cash: 0 },
  { name: '방글라데시',    en: "Bangladesh · Cox's Bazar (현금)", food: 0, cash: 1885961 },
  { name: '콜롬비아',      en: 'Colombia · Valle del Cauca (현금)', food: 0, cash: 1456689 },
  { name: '중앙아프리카공화국', en: 'CAR · Bambari, Bouar (생계)', food: 0, cash: 87318 },
  { name: '미얀마',        en: 'Myanmar · Northern Shan (긴급 현금)', food: 0, cash: 64616 },
  { name: '케냐',          en: 'Kenya · Makueni, Kitui', food: 0, cash: 0, livelihood: true },
]

function fmtCash(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  return '$' + (n / 1000).toFixed(0) + 'K'
}

export default function CountryGrid() {
  return (
    <div style={{ marginTop: 40, borderTop: '1px solid var(--field-200)', paddingTop: 24 }}>
      <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '0 0 16px' }}>
        Country Grid · 13개국 직접 비교
      </p>
      <div style={{ position: 'relative', border: '1px solid var(--field-200)', borderRadius: 8, overflow: 'hidden' }}>
        <AnimatedGradient colors={['#FF5515', '#0E7C7B', '#F4B223', '#2F7D4F']} speed={0.08} blur="medium" />
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'transparent',
        }}>
        {COUNTRIES.map((c) => {
          const isFood = c.food > 0
          const isCash = c.cash > 0
          const barPct = isFood ? (c.food / MAX_FOOD) * 100 : isCash ? (c.cash / 1885961) * 100 : 0
          const barColor = isCash ? '#0E7C7B' : 'var(--orange)'
          const numColor = isCash ? '#0E7C7B' : c.livelihood ? GREEN : 'var(--orange)'

          return (
            <div
              key={c.name}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: 'rgba(255,255,255,0.85)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                transition: 'box-shadow 0.15s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(17,18,34,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--midnight)' }}>
                  {c.name}
                </span>
                {c.livelihood ? (
                  <span lang="ko" style={{ fontSize: 11, color: GREEN, fontFamily: 'var(--font-kr)', fontWeight: 700 }}>
                    생계 사업
                  </span>
                ) : isFood ? (
                  <span className="num tnum" style={{ fontSize: 22, color: numColor }}>
                    {c.food.toLocaleString()}<span style={{ fontSize: 13, color: 'var(--grey-500)', marginLeft: 3 }}>t</span>
                  </span>
                ) : (
                  <span className="num tnum" style={{ fontSize: 22, color: numColor }}>
                    {fmtCash(c.cash)}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, color: 'var(--grey-600)', fontWeight: 600 }}>
                {c.en}
              </span>
              {c.livelihood ? (
                <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: GREEN, fontWeight: 600, marginTop: 4 }}>
                  배분 없는 생계 역량 강화 사업
                </span>
              ) : (
                <div style={{ height: 3, background: 'var(--field-200)', borderRadius: 2, marginTop: 6 }}>
                  <div style={{ height: '100%', width: `${barPct}%`, background: barColor, borderRadius: 2 }} />
                </div>
              )}
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}
