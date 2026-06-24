import useIsMobile from '../lib/useIsMobile.js'
import { COUNTRIES, countryTotals } from '../data/countries.js'

// 단일 소스(countries.js)에서 국가별 합계를 구해 식량가액·현금 내림차순 정렬
const _BY = COUNTRIES.map((c) => ({ name: c.chartName || c.ko, ...countryTotals(c) }))
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
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: '4px 0 0' }}>{subtitle}</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.map((d, i) => {
          const pct = (d[maxKey] / maxVal) * 100
          const isFirst = i === 0
          return (
            <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 72px', alignItems: 'center', gap: 10 }}>
              <span lang="ko" style={{
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
        <p lang="ko" style={{
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
        }}>국가별 배분 규모 비교 · DISTRIBUTION BY COUNTRY</p>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0 }}>
          식량 8개국 · 현금 9개국 · USD 기준
        </p>
      </div>

      {/* Two charts side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr', gap: isMobile ? '40px 0' : '0 32px', alignItems: 'start' }}>
        <HBarChart
          title="국가별 식량 배분 가치 (USD)"
          subtitle="식량 배분 실적이 있는 8개국 — 현물 식량 가액 합산"
          data={FOOD_COUNTRIES}
          color="var(--orange)"
          note="DR 콩고 남부 키부 단일 사업($5.05M)이 전체 식량 가액의 40%를 점유합니다."
        />
        {!isMobile && <div style={{ background: 'var(--field-200)', alignSelf: 'stretch' }} />}
        <HBarChart
          title="국가별 현금 · 교환권 배분 (USD)"
          subtitle="현금 또는 교환권 배분 실적이 있는 9개국"
          data={CASH_COUNTRIES}
          color="#0E7C7B"
          note="방글라데시·콜롬비아는 현금 전용 사업으로, 식량 현물 배분은 포함되지 않습니다."
        />
      </div>
    </div>
  )
}
