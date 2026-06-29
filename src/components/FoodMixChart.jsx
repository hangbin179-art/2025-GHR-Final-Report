import { useState } from 'react'
import useIsMobile from '../lib/useIsMobile.js'

// 2025 food commodities distributed (tonnes). Source: project food distribution results (incl. therapeutic food).
const FOOD = [
  { name: 'Maize',          t: 2947.3, color: '#FF5515', note: 'Staple carbohydrate and energy source. Drought-resistant, it was the mainstay distributed across African field sites such as Sudan and DR Congo.' },
  { name: 'Sorghum',        t: 2808.5, color: '#C2410C', note: 'A gluten-free grain and source of iron. Easy to source locally in arid zones, it grew roughly fourfold year on year.' },
  { name: 'Pulses (lentils, etc.)', t: 1278.6, color: '#2F7D4F', note: 'A source of protein, iron and dietary fibre. Distributed alongside grains to make up protein shortfalls.' },
  { name: 'Therapeutic food', t: 998.1,  color: '#C8102E', note: 'High-energy treatment food for children under 5 and pregnant women (Plumpy’Nut, fortified foods). Concentrated in nutrition programmes in Ethiopia and DR Congo.' },
  { name: 'Wheat',          t: 828.0,  color: '#E0A92E', note: 'A staple carbohydrate. Heavily reliant on imports, it was cut to about half of the prior year.' },
  { name: 'Vegetable oil',  t: 461.7,  color: '#F4C430' },
  { name: 'Rice',           t: 357.1,  color: '#B6A98F' },
  { name: 'Food kits',      t: 349.9,  color: '#6B7280' },
  { name: 'Other',          t: 125.6,  color: '#A8A29E' },
  { name: 'Salt',           t: 80.3,   color: '#D6D3CD' },
]
const TOTAL = FOOD.reduce((s, d) => s + d.t, 0) // = 10,235.1 tonnes
const MAJOR = FOOD.slice(0, 5)

// Donut segment path — clockwise from 12 o'clock (-90°)
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
            {/* Center label — on hover shows the item's tonnage and %, otherwise 2025 */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', textAlign: 'center', padding: '0 20%' }}>
              {active === null ? (
                <>
                  <span className="num" style={{ fontSize: 34, color: 'var(--midnight)', lineHeight: 1 }}>2025</span>
                  <span style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', marginTop: 4 }}>Food mix distributed</span>
                </>
              ) : (
                <>
                  <span style={{ fontFamily: 'var(--font-kr)', fontSize: 12.5, fontWeight: 700, color: 'var(--grey-700)', lineHeight: 1.15 }}>{segs[active].name}</span>
                  <span className="num tnum" style={{ fontSize: 24, color: segs[active].color, lineHeight: 1.05, marginTop: 3 }}>
                    {segs[active].t.toLocaleString()}<span style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-500)', marginLeft: 2 }}>t</span>
                  </span>
                  <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 14, fontWeight: 800, color: segs[active].color, marginTop: 3 }}>{segs[active].pct.toFixed(1)}%</span>
                </>
              )}
            </div>
          </div>

          {/* Legend — name · weight · share */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--midnight)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)' }}>Legend · Distribution by type</span>
              <span style={{ fontFamily: 'var(--font-kr)', fontSize: 10, color: 'var(--grey-500)' }}>tonnes · share</span>
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
                  <span style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: active === i ? 'var(--midnight)' : 'var(--grey-700)', fontWeight: active === i ? 700 : 400, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
                  <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 11.5, fontWeight: 700, color: 'var(--grey-600)', textAlign: 'right', flexShrink: 0 }}>{d.t.toLocaleString()}<span style={{ fontFamily: 'var(--font-kr)', fontWeight: 400, color: 'var(--grey-500)', fontSize: 10 }}>t</span></span>
                  <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 11.5, fontWeight: 700, color: d.color, width: 42, textAlign: 'right', flexShrink: 0 }}>{d.pct.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info panel — separate notes (calories · nutrients · main distribution countries) */}
        <div>
          <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: '0 0 14px' }}>
            What was on the plate
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {MAJOR.map((d) => (
              <li key={d.name} style={{ display: 'flex', gap: 9, marginBottom: 11 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.55, color: 'var(--grey-700)' }}>
                  <strong style={{ color: 'var(--midnight)' }}>{d.name}</strong> — {d.note}
                </span>
              </li>
            ))}
          </ul>

          <p style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.55, color: 'var(--grey-700)', margin: '2px 0 0' }}>
            <strong style={{ color: 'var(--midnight)' }}>Vegetable oil · Rice · Food kits · Salt · Other</strong> — vegetable oil delivers about 880 kcal of concentrated energy per 100 g plus vitamin A, while iodised salt helps offset micronutrient deficiencies.
          </p>

          <p style={{ fontFamily: 'var(--font-kr)', fontSize: 12.5, lineHeight: 1.65, color: 'var(--grey-700)', margin: '16px 0 0', padding: '12px 14px', background: 'var(--field-50)', borderRadius: 8, borderLeft: '3px solid var(--orange)' }}>
            <strong style={{ color: 'var(--midnight)' }}>Food distribution rose about 70% year on year</strong> (6,018 tonnes in 2024 → 10,235.1 tonnes in 2025). The mix shifted away from imported wheat toward <strong style={{ color: 'var(--orange)' }}>sorghum and maize</strong>, which are drought-resistant and easier to source within the region.
          </p>
        </div>
      </div>
    </div>
  )
}
