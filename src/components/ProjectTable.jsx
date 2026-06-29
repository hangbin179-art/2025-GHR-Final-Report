import useIsMobile from '../lib/useIsMobile.js'
import { COUNTRIES, countryTotals, TOTALS as TOTAL } from '../data/countries.js'

// By-country totals — summed per project from a single source (countries.js), kept sorted by food distribution descending
const COUNTRY_ROWS = COUNTRIES.map((c) => ({ ko: c.ko, countryEn: c.countryEn, region: c.region, livelihood: c.livelihood, ...countryTotals(c) }))

function fmtUsd(n) {
  if (!n || n === 0) return null
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  if (n >= 1000) return '$' + Math.round(n).toLocaleString()
  return '$' + n
}

function fmtTon(n) {
  if (!n || n === 0) return null
  return n.toLocaleString('en', { minimumFractionDigits: n % 1 !== 0 ? 1 : 0, maximumFractionDigits: 1 })
}

const GRID = '1.7fr 1fr 1.1fr 1.1fr 0.9fr'
const TEAL = '#0E7C7B'
const RED = '#C8102E'

export default function ProjectTable() {
  const isMobile = useIsMobile()
  const headCell = { padding: '12px 14px', fontFamily: 'var(--font-en)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }
  const dash = <span style={{ color: 'var(--field-300)' }}>—</span>

  return (
    <div style={{ marginTop: 64 }}>
      {/* Section title */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '2px solid var(--midnight)',
      }}>
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: 'var(--midnight)', margin: 0 }}>
          Distribution by country <span style={{ fontFamily: 'var(--font-en)', fontWeight: 700, color: 'var(--grey-500)', fontSize: 11, letterSpacing: '0.08em' }}>· COUNTRY BREAKDOWN</span>
        </p>
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0 }}>
          13 countries · 20 projects cumulative
        </p>
      </div>

      {/* Header */}
      <div style={{ overflowX: isMobile ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ minWidth: isMobile ? 600 : 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: GRID, background: 'var(--midnight)', borderRadius: '6px 6px 0 0', overflow: 'hidden' }}>
        <div style={headCell}>Country & region</div>
        <div style={{ ...headCell, textAlign: 'right' }}>Food (tonnes)</div>
        <div style={{ ...headCell, textAlign: 'right' }}>Commodity value (USD)</div>
        <div style={{ ...headCell, textAlign: 'right' }}>Cash &amp; vouchers (USD)</div>
        <div style={{ ...headCell, textAlign: 'right' }}>Therapeutic food (tonnes)</div>
      </div>

      {/* Rows */}
      {COUNTRY_ROWS.map((r, i) => (
        <div
          key={r.ko}
          style={{
            display: 'grid',
            gridTemplateColumns: GRID,
            border: '0 solid var(--field-200)',
            borderWidth: '0 1px 1px 1px',
            background: i % 2 === 0 ? '#fff' : 'var(--field-50)',
            alignItems: 'center',
          }}
        >
          {/* Country & region */}
          <div style={{ padding: '12px 14px' }}>
            <span style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--midnight)' }}>{r.countryEn}</span>
            <span style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-600)', marginLeft: 8 }}>{r.region}</span>
          </div>

          {r.livelihood ? (
            <div style={{ gridColumn: '2 / 6', padding: '12px 14px', textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 600, color: '#2F7D4F' }}>
                Livelihood &amp; resilience programme (no distribution)
              </span>
            </div>
          ) : (
            <>
              <div className="tnum" style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 600, color: 'var(--midnight)' }}>
                {fmtTon(r.food) || dash}
              </div>
              <div className="tnum" style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-en)', fontSize: 13, color: 'var(--grey-700)' }}>
                {fmtUsd(r.foodVal) || dash}
              </div>
              <div className="tnum" style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 600, color: r.cash > 0 ? TEAL : 'var(--field-300)' }}>
                {fmtUsd(r.cash) || dash}
              </div>
              <div className="tnum" style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 600, color: r.ther > 0 ? RED : 'var(--field-300)' }}>
                {fmtTon(r.ther) || dash}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Grand total */}
      <div style={{ display: 'grid', gridTemplateColumns: GRID, background: 'var(--midnight)', borderRadius: '0 0 6px 6px', overflow: 'hidden', alignItems: 'center' }}>
        <div lang="en" style={{ padding: '16px 14px', fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: '#fff' }}>
          Total <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginLeft: 4 }}>GRAND TOTAL</span>
        </div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: '#fff' }}>{TOTAL.food.toLocaleString()}</div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: 'var(--orange)' }}>
          ${(TOTAL.foodVal / 1000000).toFixed(2)}M
        </div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: '#4ABFBA' }}>
          ${(TOTAL.cash / 1000000).toFixed(2)}M
        </div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: '#FF8585' }}>{TOTAL.ther.toLocaleString()}</div>
      </div>
      </div>
      </div>

      <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: '14px 0 0', lineHeight: 1.6 }}>
        Commodity value is the market value (USD) of the food distributed. Kenya operated without in-kind or cash distribution, delivering instead through livelihood and resilience activities such as village savings groups (VSLAs) and crop insurance.
      </p>
    </div>
  )
}
