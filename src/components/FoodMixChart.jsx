import { useState } from 'react'
import useIsMobile from '../lib/useIsMobile.js'

// 2025년 배분 식량 종류(톤). 출처: 사업 식량 배분 실적표(영양치료식 포함).
const FOOD = [
  { name: '옥수수',         t: 2947.3, color: '#FF5515', note: '주식 탄수화물·열량원. 가뭄에 강해 수단·DR콩고 등 아프리카 현장에서 주력으로 배분.' },
  { name: '수수',           t: 2808.5, color: '#C2410C', note: '글루텐프리 곡물·철분원. 건조지대에서 현지 조달이 쉬워 전년 대비 약 4배 늘었습니다.' },
  { name: '콩 (렌틸 등)',   t: 1278.6, color: '#2F7D4F', note: '단백질·철분·식이섬유 공급원. 곡물과 함께 배분해 부족한 단백질을 보충.' },
  { name: '영양실조치료 보충식', t: 998.1,  color: '#C8102E', note: '5세 미만·임산부용 고열량 치료식(플럼피넛·영양강화식). 에티오피아·DR콩고 영양사업에 집중.' },
  { name: '밀',             t: 828.0,  color: '#E0A92E', note: '탄수화물 주식. 수입 의존이 커 전년 대비 절반 수준으로 줄었습니다.' },
  { name: '식용유',         t: 461.7,  color: '#F4C430' },
  { name: '쌀',             t: 357.1,  color: '#B6A98F' },
  { name: '식량 키트',      t: 349.9,  color: '#6B7280' },
  { name: '기타',           t: 125.6,  color: '#A8A29E' },
  { name: '소금',           t: 80.3,   color: '#D6D3CD' },
]
const TOTAL = FOOD.reduce((s, d) => s + d.t, 0) // = 10,235.1톤
const MAJOR = FOOD.slice(0, 5)

// 도넛 세그먼트 path — 12시 방향(-90°)에서 시계방향
function polar(c, r, deg) {
  const a = ((deg - 90) * Math.PI) / 180
  return [c + r * Math.cos(a), c + r * Math.sin(a)]
}
function seg(c, rO, rI, s, e) {
  const [x0o, y0o] = polar(c, rO, s)
  const [x1o, y1o] = polar(c, rO, e)
  const [x1i, y1i] = polar(c, rI, e)
  const [x0i, y0i] = polar(c, rI, s)
  const big = e - s > 180 ? 1 : 0
  return `M ${x0o} ${y0o} A ${rO} ${rO} 0 ${big} 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${rI} ${rI} 0 ${big} 0 ${x0i} ${y0i} Z`
}

export default function FoodMixChart() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState(null)
  const C = 115, RO = 105, RI = 66
  let acc = 0
  const segs = FOOD.map((d) => {
    const start = (acc / TOTAL) * 360
    acc += d.t
    const end = (acc / TOTAL) * 360
    const ang = (((start + end) / 2 - 90) * Math.PI) / 180
    return { ...d, path: seg(C, RO, RI, start, end), pct: (d.t / TOTAL) * 100, dx: 6 * Math.cos(ang), dy: 6 * Math.sin(ang) }
  })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? 0 : 48, marginTop: isMobile ? 28 : 32 }}>
      {!isMobile && <div />}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.95fr 1fr', gap: isMobile ? 28 : 44, alignItems: 'start' }}>

        {/* Donut + legend */}
        <div>
          <div style={{ position: 'relative', width: '100%', maxWidth: 260, margin: '0 auto' }}>
            <svg viewBox="0 0 230 230" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
              {segs.map((s, i) => (
                <path
                  key={s.name}
                  d={s.path}
                  fill={s.color}
                  stroke="#fff"
                  strokeWidth={active === i ? 2.5 : 2}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    cursor: 'pointer',
                    opacity: active === null || active === i ? 1 : 0.34,
                    transform: active === i ? `translate(${s.dx}px, ${s.dy}px)` : undefined,
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                />
              ))}
            </svg>
            {/* 가운데 표시 — 호버 시 해당 품목 톤·%, 평소엔 2025 */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', textAlign: 'center', padding: '0 20%' }}>
              {active === null ? (
                <>
                  <span className="num" style={{ fontSize: 34, color: 'var(--midnight)', lineHeight: 1 }}>2025</span>
                  <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', marginTop: 4 }}>배분 식량 구성</span>
                </>
              ) : (
                <>
                  <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12.5, fontWeight: 700, color: 'var(--grey-700)', lineHeight: 1.15 }}>{segs[active].name}</span>
                  <span className="num tnum" style={{ fontSize: 24, color: segs[active].color, lineHeight: 1.05, marginTop: 3 }}>
                    {segs[active].t.toLocaleString()}<span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-500)', marginLeft: 2 }}>톤</span>
                  </span>
                  <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 14, fontWeight: 800, color: segs[active].color, marginTop: 3 }}>{segs[active].pct.toFixed(1)}%</span>
                </>
              )}
            </div>
          </div>

          {/* Legend — 이름 · 무게 · 비율 */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--midnight)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)' }}>Legend · 종류별 배분량</span>
              <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 10, color: 'var(--grey-500)' }}>톤 · 비율</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '5px 22px' }}>
              {segs.map((d, i) => (
                <div
                  key={d.name}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', padding: '2px 6px', margin: '0 -6px', borderRadius: 5, background: active === i ? 'var(--field-50)' : 'transparent', transition: 'background 0.15s ease' }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0, boxShadow: active === i ? `0 0 0 3px ${d.color}33` : 'none', transition: 'box-shadow 0.15s' }} />
                  <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: active === i ? 'var(--midnight)' : 'var(--grey-700)', fontWeight: active === i ? 700 : 400, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                  <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 11.5, fontWeight: 700, color: 'var(--grey-600)', textAlign: 'right', flexShrink: 0 }}>{d.t.toLocaleString()}<span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 400, color: 'var(--grey-500)', fontSize: 10 }}>톤</span></span>
                  <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 11.5, fontWeight: 700, color: d.color, width: 42, textAlign: 'right', flexShrink: 0 }}>{d.pct.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info panel — 별도 설명(열량·영양소·주요 배분국) */}
        <div>
          <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: '0 0 14px' }}>
            What was on the plate · 식탁에 오른 것들
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {MAJOR.map((d) => (
              <li key={d.name} style={{ display: 'flex', gap: 9, marginBottom: 11 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0, marginTop: 6 }} />
                <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.55, color: 'var(--grey-700)' }}>
                  <strong style={{ color: 'var(--midnight)' }}>{d.name}</strong> — {d.note}
                </span>
              </li>
            ))}
          </ul>

          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.55, color: 'var(--grey-700)', margin: '2px 0 0' }}>
            <strong style={{ color: 'var(--midnight)' }}>식용유 · 쌀 · 식량키트 · 소금 · 기타</strong> — 식용유는 100g당 약 880kcal의 농축 열량과 비타민A를, 요오드 강화 소금은 미량영양소 결핍을 보완합니다.
          </p>

          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12.5, lineHeight: 1.65, color: 'var(--grey-700)', margin: '16px 0 0', padding: '12px 14px', background: 'var(--field-50)', borderRadius: 8, borderLeft: '3px solid var(--orange)' }}>
            <strong style={{ color: 'var(--midnight)' }}>전년 대비 식량 배분량 약 70% 증가</strong> (2024년 6,018톤 → 2025년 10,235.1톤). 수입 밀 비중을 줄이고, 가뭄에 강하고 역내 조달이 쉬운 <strong style={{ color: 'var(--orange)' }}>수수·옥수수</strong> 중심으로 전환됐습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
