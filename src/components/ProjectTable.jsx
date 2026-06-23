// 국가별 집계 (사업 단위 합산) — 식량 배분량 내림차순, 현금 전용국 → 생계 사업 순
const COUNTRY_ROWS = [
  { ko: '콩고민주공화국',     region: '남부키부 · 탕가니카 · 카사이',     food: 3797.0, foodVal: 6488497, cash: 0,       ther: 151.1 },
  { ko: '수단',               region: '남다르푸르 · 남코르도판 · 백나일', food: 3322.1, foodVal: 4214318, cash: 324429,  ther: 52.8 },
  { ko: '아프가니스탄',       region: '고르 · 바드기스',                 food: 829.3,  foodVal: 446505,  cash: 173877,  ther: 65.7 },
  { ko: '에티오피아',         region: '티그라이 · 아파르 · 암하라',       food: 695.8,  foodVal: 2416084, cash: 0,       ther: 695.8 },
  { ko: '우간다',             region: '비디비디 · 로불레',               food: 505.0,  foodVal: 679772,  cash: 558117,  ther: 33.6 },
  { ko: '베네수엘라',         region: '줄리아 · 팔콘 외',                food: 475.5,  foodVal: 605800,  cash: 0,       ther: 0 },
  { ko: '남수단',             region: '파쇼다 · 렌크 · 주바',            food: 411.9,  foodVal: 909219,  cash: 539033,  ther: 0.5 },
  { ko: '차드',               region: '파르샤나 외 · 학교급식',          food: 198.5,  foodVal: 278368,  cash: 15941,   ther: 0 },
  { ko: '방글라데시',         region: '콕스바자르 · 현금 전용',          food: 0,      foodVal: 0,       cash: 1885961, ther: 0 },
  { ko: '콜롬비아',           region: '바예델카우카 · 현금 전용',        food: 0,      foodVal: 0,       cash: 1456689, ther: 0 },
  { ko: '중앙아프리카공화국', region: '밤바리 · 부아르 · 생계',          food: 0,      foodVal: 0,       cash: 87318,   ther: 0 },
  { ko: '미얀마',             region: '노던샨 · 긴급 현금',             food: 0,      foodVal: 0,       cash: 64616,   ther: 0 },
  { ko: '케냐',               region: '마쿠에니 · 키투이',              food: 0,      foodVal: 0,       cash: 0,       ther: 0, livelihood: true },
]

const TOTAL = { food: 10235.1, foodVal: 16038579, cash: 5105981, ther: 999.5 }

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
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', color: 'var(--midnight)', margin: 0 }}>
          국가별 배분 현황 <span style={{ fontFamily: 'var(--font-en)', fontWeight: 700, color: 'var(--grey-500)', fontSize: 11, letterSpacing: '0.08em' }}>· COUNTRY BREAKDOWN</span>
        </p>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0 }}>
          13개국 · 20개 사업 누적 · 환율 1,330원/USD
        </p>
      </div>

      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: GRID, background: 'var(--midnight)', borderRadius: '6px 6px 0 0', overflow: 'hidden' }}>
        <div style={headCell}>국가 및 지역</div>
        <div style={{ ...headCell, textAlign: 'right' }}>식량 배분 (톤)</div>
        <div style={{ ...headCell, textAlign: 'right' }}>식량 가액 (USD)</div>
        <div style={{ ...headCell, textAlign: 'right' }}>현금·교환권 (USD)</div>
        <div style={{ ...headCell, textAlign: 'right' }}>치료식 (톤)</div>
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
          {/* 국가 및 지역 */}
          <div style={{ padding: '12px 14px' }}>
            <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--midnight)' }}>{r.ko}</span>
            <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-600)', marginLeft: 8 }}>{r.region}</span>
          </div>

          {r.livelihood ? (
            <div style={{ gridColumn: '2 / 6', padding: '12px 14px', textAlign: 'right' }}>
              <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 600, color: '#2F7D4F' }}>
                배분 없는 생계 역량 강화 사업
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
        <div lang="ko" style={{ padding: '16px 14px', fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: '#fff' }}>
          합계 <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginLeft: 4 }}>GRAND TOTAL</span>
        </div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: '#fff' }}>{TOTAL.food.toLocaleString()}</div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: 'var(--orange)' }}>${(TOTAL.foodVal / 1000000).toFixed(2)}M</div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: '#4ABFBA' }}>${(TOTAL.cash / 1000000).toFixed(2)}M</div>
        <div className="num tnum" style={{ padding: '16px 14px', textAlign: 'right', fontSize: 16, color: '#FF8585' }}>{TOTAL.ther.toLocaleString()}</div>
      </div>

      <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: '14px 0 0', lineHeight: 1.6 }}>
        식량 가액은 배분 식량의 시장가치(USD) 환산액입니다. 케냐는 현물·현금 배분 없이 마을저축대출조합(VSLA)·작물보험 등 생계 역량 강화로 운영된 사업입니다.
      </p>
    </div>
  )
}
