const FOOD_COUNTRIES = [
  { name: 'DR 콩고', val: 6488497, tons: 3797 },
  { name: '수단', val: 4214318, tons: 3322 },
  { name: '에티오피아', val: 2416084, tons: 696 },
  { name: '남수단', val: 909219, tons: 412 },
  { name: '우간다', val: 679772, tons: 505 },
  { name: '베네수엘라', val: 605800, tons: 476 },
  { name: '아프가니스탄', val: 446505, tons: 829 },
  { name: '차드', val: 278368, tons: 199 },
]

const CASH_COUNTRIES = [
  { name: '방글라데시', val: 1885961 },
  { name: '콜롬비아', val: 1456689 },
  { name: '우간다', val: 558117 },
  { name: '남수단', val: 539033 },
  { name: '수단', val: 324429 },
  { name: '아프가니스탄', val: 173877 },
  { name: '중앙아프리카', val: 87318 },
  { name: '미얀마', val: 64616 },
  { name: '차드', val: 15941 },
]

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
        }}>국가별 배분 현황 · Country Distribution Summary</p>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0 }}>
          식량 8개국 · 현금 9개국 · USD 기준
        </p>
      </div>

      {/* Two charts side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 32px', alignItems: 'start' }}>
        <HBarChart
          title="국가별 식량 배분 가치 (USD)"
          subtitle="식량 배분 실적이 있는 8개국 — 현물 식량 가액 합산"
          data={FOOD_COUNTRIES}
          color="var(--orange)"
          note="DRC 남부 키부 단일 사업($5.05M)이 전체 식량 가액의 40%를 점유합니다."
        />
        <div style={{ background: 'var(--field-200)', alignSelf: 'stretch' }} />
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
