import useIsMobile from '../lib/useIsMobile.js'

const C = 301.6 // circle circumference at r=48

const FOOD_PCT = 48.4   // 10,235 / 21,133
const CASH_PCT = 47.7   // $5.1M / $10.7M
const NUT_PCT  = 59.5

export default function ResultsCharts() {
  const isMobile = useIsMobile()
  return (
    <section id="sec-result" style={{ background: 'var(--field-50)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: isMobile ? 32 : 48 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>04 — Result</p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>최종 성과</p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              월드비전 1원이 WFP 25.6배를 움직였고,<br />그 돈은 다시 식탁으로 갔습니다.
            </h2>
          </div>
        </div>

        {/* Leverage flow */}
        <LeverageFlow />

        {/* Progress dials */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
          <DialCard
            color="var(--orange)"
            pct={FOOD_PCT}
            label="FOOD"
            title="식량 배분"
            value="10,235.1"
            valueUnit="톤"
            sub={`계획 21,133톤 中 ${FOOD_PCT}% *`}
          />
          <DialCard
            color="#0E7C7B"
            pct={CASH_PCT}
            label="CASH"
            title="현금 배분"
            value="$5.1"
            valueUnit="M"
            krw="≈ 68억원"
            sub={`계획 $10.7M (≈142억원) 中 ${CASH_PCT}% *`}
          />
          <DialCard
            color="#C8102E"
            pct={NUT_PCT}
            label="NUTRITION"
            title="영양 치료식"
            value="999.5"
            valueUnit="톤"
            sub="SAM/MAM 치료식 누계"
            dialLabel="999.5t"
          />
        </div>

        {/* 집행률 각주 — 식량·현금이 목표 대비 약 50% 수준인 사유 */}
        <p lang="ko" style={{
          fontFamily: 'var(--font-kr)',
          fontSize: 13,
          lineHeight: 1.8,
          color: 'var(--grey-700)',
          margin: '24px 0 0',
          paddingTop: 18,
          borderTop: '1px solid var(--field-200)',
          wordBreak: 'keep-all',
        }}>
          <span style={{ color: 'var(--orange)', fontWeight: 800, marginRight: 3 }}>*</span>
          식량·현금 배분 집행률이 목표 대비 약 50% 수준에 머문 주요 사유 —{' '}
          <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>① 미국 USAID(국제개발처) 폐지</strong>에 따른 다수 사업의 축소 및 중단,{' '}
          <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>② 수단 및 DRC 등 분쟁 심화</strong>로 인한 현장 접근·물자 반입 제약,{' '}
          <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>③ 수단 화이트나일(White Nile) 사업</strong>의 현지 정부 승인 지연에 따른 사업 미진행 등 외부 요인으로 인한 배분 실적 하락 발생.
        </p>
      </div>
    </section>
  )
}

function LeverageFlow() {
  const isMobile = useIsMobile()
  return (
    <div style={{ background: '#fff', border: '1px solid var(--field-200)', borderRadius: 12, padding: isMobile ? 18 : 32, marginBottom: 24 }}>
      <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '0 0 24px' }}>
        Leverage flow · 자금 흐름
      </p>

      {/* Proportional source blocks */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, height: 88, marginBottom: 28 }}>

        {/* WV Korea — 1 unit (small) */}
        <div style={{
          flex: '0 0 60px',
          background: 'var(--midnight)',
          borderRadius: 8,
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <p style={{ fontFamily: 'var(--font-en)', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, lineHeight: 1.4 }}>WV KR</p>
          <p className="num" style={{ fontSize: 12, color: '#fff', margin: '4px 0 0', lineHeight: 1 }}>12.9억원</p>
        </div>

        {/* Multiplier arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '0 2px', flexShrink: 0 }}>
          <span className="num" style={{ fontSize: 22, color: 'var(--orange)', lineHeight: 1, letterSpacing: '-0.03em' }}>25.6×</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M0 5 H16 M11 1 L17 5 L11 9" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* WFP Grant — 41 units (large) */}
        <div style={{
          flex: 1,
          background: 'var(--orange)',
          borderRadius: 8,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Ghost number watermark */}
          <span className="num" style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 96,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.1)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
            pointerEvents: 'none',
          }}>25.6×</span>

          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              WFP 다자협력 사업 수입 · 실제 인식액
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 4 }}>
              <p className="num tnum" style={{ fontSize: 44, color: '#fff', margin: 0, lineHeight: 0.9 }}>$24.8M</p>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>≈ 330억원</p>
            </div>
          </div>
        </div>
      </div>

      <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, lineHeight: 1.7, color: 'var(--grey-600)', margin: 0, paddingTop: 20, borderTop: '1px solid var(--field-200)', maxWidth: '82ch' }}>
        유엔세계식량계획(WFP) 다자기구협력사업은 회원국이 출연하는 자기부담금(매치)을 마중물로 WFP 보충 예산을 끌어와 대규모 사업으로 확장하는 구조입니다.
        월드비전이 매칭으로 투입한 12.9억원은 실제 약 330억원의 사업 수입으로 집행되어, 한국 기여 대비 <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>평균 약 25.6배</strong>의 증대 효과를 거뒀습니다.
        <span style={{ display: 'block', marginTop: 6, color: 'var(--grey-500)' }}>* 전체 실제 수입(약 330억원) ÷ 전체 매칭금(12.9억원) 기준. 계획(기대수입) 대비로는 약 41배.</span>
      </p>
    </div>
  )
}

function DialCard({ color, pct, label, title, value, valueUnit, sub, dialLabel, krw }) {
  const dashArray = (pct / 100) * C
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--field-200)',
      borderRadius: 12,
      padding: 32,
      display: 'flex',
      gap: 24,
      alignItems: 'center',
    }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ flex: 'none' }}>
        <circle cx="60" cy="60" r="48" fill="none" stroke="var(--field-200)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="48"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${Math.min(dashArray, C)} ${C}`}
          strokeDashoffset="0"
          transform="rotate(-90 60 60)"
          strokeLinecap="butt"
        />
        <text x="60" y="58" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="20" fontWeight="900" fill="var(--midnight)" dominantBaseline="middle">
          {dialLabel || `${pct}%`}
        </text>
        <text x="60" y="78" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.1em" fill="var(--grey-600)">
          {label}
        </text>
      </svg>
      <div style={{ minWidth: 0 }}>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', margin: '0 0 8px' }}>{title}</p>
        <p className="num tnum" style={{ fontSize: 28, color: 'var(--midnight)', margin: 0, lineHeight: 1 }}>
          {value}
          <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 500, fontSize: 14, color: 'var(--grey-600)', marginLeft: 4 }}>{valueUnit}</span>
        </p>
        {krw && <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 600, color: 'var(--grey-500)', margin: '4px 0 0' }}>{krw}</p>}
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-600)', margin: '6px 0 0', lineHeight: 1.5 }}>{sub}</p>
      </div>
    </div>
  )
}
