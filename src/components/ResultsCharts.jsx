import useIsMobile from '../lib/useIsMobile.js'

const C = 301.6 // circle circumference at r=48

const FOOD_PCT = 48.4   // 10,235 / 21,133
const CASH_PCT = 63.4   // $5.1M / $8.05M (planned cash, actual/planned basis)
const NUT_PCT  = 100   // No planned-volume denominator for nutrition in the data, so the ring shows cumulative achievement (full). value/dialLabel show the absolute volume (998.1 tonnes).

export default function ResultsCharts() {
  const isMobile = useIsMobile()
  return (
    <section id="sec-result" style={{ background: 'var(--field-50)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: isMobile ? 32 : 48 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>04 — Result</p>
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>Final Results</p>
          </div>
          <div>
            <h2 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '34ch' }}>
              Every $1 from World Vision delivered about $24<br />of food to families’ tables.
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
            title="Food distribution"
            value="10,235.1"
            valueUnit="tonnes"
            sub={`${FOOD_PCT}% of the 21,133-tonne plan **`}
          />
          <DialCard
            color="#0E7C7B"
            pct={CASH_PCT}
            label="CASH"
            title="Cash distribution"
            value="$5.1"
            valueUnit="M"
            sub={`${CASH_PCT}% of the $8.05M plan **`}
          />
          <DialCard
            color="#C8102E"
            pct={NUT_PCT}
            label="NUTRITION"
            title="Nutrition treatment food"
            value="998.1"
            valueUnit="tonnes"
            sub="Therapeutic & supplementary food to treat malnutrition — cumulative"
            dialLabel="998.1t"
          />
        </div>

        {/* Execution-rate footnotes — why food & cash reached about 50% of target */}
        <div style={{ margin: '24px 0 0', paddingTop: 18, borderTop: '1px solid var(--field-200)' }}>
          <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.8, color: 'var(--grey-700)', margin: 0, wordBreak: 'keep-all' }}>
            <span style={{ color: 'var(--orange)', fontWeight: 800, marginRight: 3 }}>*</span>
            In <strong style={{ color: 'var(--midnight)' }}>multilateral partnership programmes</strong>, scale and timeline shift with global humanitarian needs, the donor’s (WFP) funding, and food supply conditions.
          </p>
          <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.8, color: 'var(--grey-700)', margin: '8px 0 0', wordBreak: 'keep-all' }}>
            <span style={{ color: 'var(--orange)', fontWeight: 800, marginRight: 3 }}>**</span>
            <strong style={{ color: 'var(--orange)' }}>Three external shocks</strong> held food and cash below target —{' '}
            <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>① the dissolution of USAID</strong>, which cut or suspended programmes;{' '}
            <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>② intensifying conflict in Sudan, DR Congo and elsewhere</strong>, blocking field access and supply movement; and{' '}
            <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>③ the White Nile programme in Sudan</strong>, stalled by delays in host-government approval.
          </p>
        </div>
      </div>
    </section>
  )
}

function LeverageFlow() {
  const isMobile = useIsMobile()
  return (
    <div style={{ background: '#fff', border: '1px solid var(--field-200)', borderRadius: 12, padding: isMobile ? 18 : 32, marginBottom: 24 }}>
      <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '0 0 24px' }}>
        Leverage flow · Funding flow
      </p>

      {/* Proportional source blocks */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch', gap: isMobile ? 10 : 8, height: isMobile ? 'auto' : 88, marginBottom: 28 }}>

        {/* WV Korea — 1 unit (small block, but legible label) */}
        <div style={{
          flex: isMobile ? '0 0 auto' : '0 0 132px',
          background: 'var(--midnight)',
          borderRadius: 8,
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.3, whiteSpace: 'nowrap' }}>World Vision</p>
          <p className="num tnum" style={{ fontSize: 26, color: '#fff', margin: '3px 0 0', lineHeight: 0.95, whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>$1.05M</p>
        </div>

        {/* Multiplier arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '0 2px', flexShrink: 0 }}>
          <span className="num" style={{ fontSize: 22, color: 'var(--orange)', lineHeight: 1, letterSpacing: '-0.03em' }}>24×</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" style={{ transform: isMobile ? 'rotate(90deg)' : 'none' }}>
            <path d="M0 5 H16 M11 1 L17 5 L11 9" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* WFP Grant — 41 units (large) */}
        <div style={{
          flex: isMobile ? '0 0 auto' : 1,
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
          }}>24×</span>

          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              WFP multilateral total project cost
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 4 }}>
              <p className="num tnum" style={{ fontSize: 44, color: '#fff', margin: 0, lineHeight: 0.9 }}>$25.3M</p>
            </div>
          </div>
        </div>
      </div>

      <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, lineHeight: 1.7, color: 'var(--grey-600)', margin: 0, paddingTop: 20, borderTop: '1px solid var(--field-200)', maxWidth: '82ch' }}>
        In the WFP multilateral partnership model, a member state’s matching contribution is seed funding — it draws in WFP’s supplementary budget and scales into a large programme.
        World Vision’s <strong style={{ color: 'var(--midnight)' }}>$1.05M</strong> matching contribution delivered a total project cost of about <strong style={{ color: 'var(--orange)', fontSize: '1.12em' }}>$25.3M</strong> — <strong style={{ color: 'var(--midnight)', fontWeight: 700 }}>roughly 24×</strong> Korea’s contribution.
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
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', margin: '0 0 8px' }}>{title}</p>
        <p className="num tnum" style={{ fontSize: 28, color: 'var(--midnight)', margin: 0, lineHeight: 1 }}>
          {value}
          <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 500, fontSize: 14, color: 'var(--grey-600)', marginLeft: 4 }}>{valueUnit}</span>
        </p>
        {krw && <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 600, color: 'var(--grey-500)', margin: '4px 0 0' }}>{krw}</p>}
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-600)', margin: '6px 0 0', lineHeight: 1.5 }}>{sub}</p>
      </div>
    </div>
  )
}
