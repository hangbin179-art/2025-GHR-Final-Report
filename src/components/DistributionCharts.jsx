import useIsMobile from '../lib/useIsMobile.js'
import { COUNTRIES, countryTotals } from '../data/countries.js'

// Derive per-country totals from the single source (countries.js), sorted by commodity value and cash descending
const _BY = COUNTRIES.map((c) => ({ name: c.countryEn, ...countryTotals(c) }))
const FOOD_COUNTRIES = _BY.filter((c) => c.food > 0).sort((a, b) => b.foodVal - a.foodVal).map((c) => ({ name: c.name, val: c.foodVal, tons: Math.round(c.food) }))
const CASH_COUNTRIES = _BY.filter((c) => c.cash > 0).sort((a, b) => b.cash - a.cash).map((c) => ({ name: c.name, val: c.cash }))

function fmtUsd(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  return '$' + (n / 1000).toFixed(0) + 'K'
}

function HBarChart({ title, subtitle, data, color, maxKey = 'val', note }) {
  const maxVal = data[0][maxKey]
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ marginBottom: 18, paddingBottom: 10, borderBottom: '1px solid var(--field-200)' }}>
        <p style={{
          fontFamily: 'var(--font-en)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--grey-600)',
          margin: 0,
        }}>{title}</p>
        {subtitle && (
          <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: '4px 0 0' }}>{subtitle}</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.map((d, i) => {
          const pct = (d[maxKey] / maxVal) * 100
          const isFirst = i === 0
          return (
            <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 72px', alignItems: 'center', gap: 10 }}>
              <span lang="en" style={{
                fontFamily: 'var(--font-kr)',
                fontSize: 12,
                fontWeight: isFirst ? 700 : 600,
                color: isFirst ? 'var(--midnight)' : 'var(--grey-700)',
                textAlign: 'right',
                lineHeight: 1.2,
              }}>{d.name}</span>
              <div style={{ height: 20, background: 'var(--field-200)', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, bottom: 0,
                  width: `${pct}%`,
                  background: color,
                  borderRadius: 3,
                  opacity: isFirst ? 1 : 0.65 + (0.35 * (1 - i / data.length)),
                }} />
                {d.tons != null && (
                  <span style={{
                    position: 'absolute',
                    left: 6,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'var(--font-en)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#fff',
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}>{d.tons.toLocaleString()}t</span>
                )}
              </div>
              <span className="tnum" style={{
                fontFamily: 'var(--font-en)',
                fontSize: 12,
                fontWeight: 700,
                color: isFirst ? color : 'var(--grey-700)',
              }}>{fmtUsd(d[maxKey])}</span>
            </div>
          )
        })}
      </div>
      {note && (
        <p lang="en" style={{
          fontFamily: 'var(--font-kr)',
          fontSize: 11,
          color: 'var(--grey-500)',
          margin: '14px 0 0',
          lineHeight: 1.6,
        }}>{note}</p>
      )}
    </div>
  )
}

export default function DistributionCharts() {
  const isMobile = useIsMobile()
  return (
    <div style={{ marginTop: 56 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid var(--midnight)' }}>
        <p style={{
          fontFamily: 'var(--font-en)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--midnight)',
          margin: 0,
        }}>Distribution by Country</p>
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0 }}>
          Food: 8 countries · Cash: 9 countries · USD
        </p>
      </div>

      {/* Two charts side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr', gap: isMobile ? '40px 0' : '0 32px', alignItems: 'start' }}>
        <HBarChart
          title="Food Distribution Value by Country (USD)"
          subtitle="8 countries with food distribution results — total in-kind commodity value"
          data={FOOD_COUNTRIES}
          color="var(--orange)"
          note="A single project in South Kivu, DR Congo ($5.05M) accounts for about 31% of total commodity value."
        />
        {!isMobile && <div style={{ background: 'var(--field-200)', alignSelf: 'stretch' }} />}
        <HBarChart
          title="Cash & Voucher Assistance by Country (USD)"
          subtitle="9 countries with cash or voucher distribution results"
          data={CASH_COUNTRIES}
          color="#0E7C7B"
          note="Bangladesh and Colombia are cash-only programmes and do not include in-kind food distribution."
        />
      </div>
    </div>
  )
}
