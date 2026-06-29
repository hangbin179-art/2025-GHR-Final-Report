import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Wheat, Banknote, HeartPulse, GraduationCap, Sprout, X } from 'lucide-react'
import { AnimatedGradient } from './AnimatedGradient.jsx'
import { usdToKrwLabel } from '../lib/format.js'
import useIsMobile from '../lib/useIsMobile.js'
import { COUNTRIES as RAW_COUNTRIES, countryTotals, countryFinance } from '../data/countries.js'

const MAX_FOOD = 3797 // DRC total (3,088+632+76)
const GREEN = '#2F7D4F'

// ── 5 core activities (icon + colour) ─────────────────────────────
const ACTIVITY_DEFS = [
  { key: 'food',       label: 'In-kind Food',  Icon: Wheat,         color: '#FF5515' },
  { key: 'cash',       label: 'Cash & Voucher', Icon: Banknote,      color: '#0E7C7B' },
  { key: 'nutrition',  label: 'Nutrition',     Icon: HeartPulse,    color: '#C8102E' },
  { key: 'school',     label: 'School Feeding', Icon: GraduationCap, color: '#C77E0A' },
  { key: 'livelihood', label: 'Livelihood',    Icon: Sprout,        color: '#2F7D4F' },
]

// Per-country display data — derived from the single source (countries.js): card display values + activities + project list + planned beneficiaries
const COUNTRIES = RAW_COUNTRIES.map((c) => {
  const t = countryTotals(c)
  const f = countryFinance(c)
  return {
    name: c.ko, countryEn: c.countryEn, en: c.en, region: c.region,
    activities: c.activities, livelihood: c.livelihood, projects: c.projects,
    food: Math.round(t.food), cash: t.cash,
    match: f.match, wfpIncome: f.wfpIncome, totalCost: f.total,
  }
})

function fmtCash(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  return '$' + (n / 1000).toFixed(0) + 'K'
}

// Activity icons — active activities show in colour, inactive ones in grey
function ActivityChip({ def, active, isMobile }) {
  const { Icon, label, color } = def
  const sz = isMobile ? 44 : 50
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
      <div style={{
        width: sz, height: sz, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? `${color}1A` : '#f1f0ee',
        color: active ? color : '#c2c0bb',
        border: active ? `1.5px solid ${color}59` : '1.5px solid var(--field-200)',
        transition: 'all 0.2s ease', flexShrink: 0,
      }}>
        <Icon size={isMobile ? 20 : 23} strokeWidth={2} />
      </div>
      <span lang="en" style={{
        fontFamily: 'var(--font-kr)', fontSize: 11, textAlign: 'center', lineHeight: 1.25,
        fontWeight: active ? 700 : 500, color: active ? 'var(--midnight)' : 'var(--grey-500)',
      }}>
        {label}
      </span>
    </div>
  )
}

function Metric({ color, label, value }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
      <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-500)' }}>{label}</span>
      <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 14, fontWeight: 700, color }}>{value}</span>
    </span>
  )
}

// Finance cell — Korea's matching contribution / WFP contribution / total project cost (USD)
// Mobile: [label ─ amount] single horizontal row (vertical stack) · Desktop: centred column
function FinanceCell({ label, usd, color, emphasize, isMobile }) {
  if (isMobile) {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, padding: '9px 2px', borderTop: emphasize ? '1px solid var(--field-200)' : 'none' }}>
        <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12.5, fontWeight: 700, color: 'var(--grey-600)' }}>{label}</span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, whiteSpace: 'nowrap' }}>
          <span className="num tnum" style={{ fontSize: emphasize ? 19 : 16, fontWeight: emphasize ? 800 : 700, color: emphasize ? 'var(--midnight)' : color }}>{usd}</span>
        </span>
      </div>
    )
  }
  return (
    <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
      <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 700, color: 'var(--grey-600)', margin: 0, whiteSpace: 'nowrap' }}>{label}</p>
      <p className="num tnum" style={{ fontSize: emphasize ? 21 : 17, fontWeight: emphasize ? 800 : 700, color: emphasize ? 'var(--midnight)' : color, margin: '5px 0 0', lineHeight: 1.1, whiteSpace: 'nowrap' }}>{usd}</p>
    </div>
  )
}

function FinOp({ children }) {
  return <span className="num" style={{ fontSize: 16, color: 'var(--field-300)', flex: '0 0 auto' }}>{children}</span>
}

function ProjectRow({ p, isMobile }) {
  // Projects with no distribution results but with planned volume (e.g. White Nile, not started) show in red; others (livelihood, etc.) in grey
  const undelivered = !(p.food > 0) && !(p.cash > 0) && !(p.ther > 0) && p.plannedTons > 0
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--field-200)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: isMobile ? 8 : 16, alignItems: isMobile ? 'start' : 'center' }}>
        <div style={{ minWidth: 0 }}>
          <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--midnight)' }}>{p.siteEn}</span>
          {p.title && <span style={{ display: 'block', fontFamily: 'var(--font-en)', fontSize: 11, color: 'var(--grey-500)', marginTop: 2 }}>{p.title}</span>}
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end', alignItems: 'baseline' }}>
          {p.food > 0 && p.ther > 0 ? (
            /* Therapeutic-food tonnage is a subset of the food distributed → shown as "N tonnes of food, of which N tonnes therapeutic" */
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7 }}>
              <Metric color="#FF5515" label="Food" value={`${p.food.toLocaleString()} t`} />
              <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)' }}>of which</span>
              <Metric color="#C8102E" label="Therapeutic" value={`${p.ther.toLocaleString()} t`} />
            </span>
          ) : (
            <>
              {p.food > 0 && <Metric color="#FF5515" label="Food" value={`${p.food.toLocaleString()} t`} />}
              {p.ther > 0 && <Metric color="#C8102E" label="Therapeutic" value={`${p.ther.toLocaleString()} t`} />}
            </>
          )}
          {p.cash > 0 && <Metric color="#0E7C7B" label="Cash" value={`${fmtCash(p.cash)}`} />}
        </div>
      </div>
      {p.note && <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontStyle: 'italic', color: undelivered ? '#C8102E' : 'var(--grey-500)', margin: '8px 0 0', lineHeight: 1.5 }}>{p.note}</p>}
    </div>
  )
}

export default function CountryGrid() {
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState(null)
  const firstZoom = useRef(true)
  const drawerRef = useRef(null)
  const country = COUNTRIES.find((c) => c.name === selected)

  // On country selection → tell the map to zoom to that country (received by ImpactMap).
  // The current view stays put and only the map zooms in place (user request). Closing does not auto-zoom-out.
  useEffect(() => {
    if (firstZoom.current) { firstZoom.current = false; return }
    if (selected) window.dispatchEvent(new CustomEvent('cg-zoom-country', { detail: selected }))
  }, [selected])

  // Non-modal drawer: no scroll lock / focus trap so the background (map · cards) stays usable.
  // Clicking another country switches the drawer content and map zoom instantly. Esc to close, and reset content scroll to top on switch.
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    const sc = drawerRef.current && drawerRef.current.querySelector('.panel-scroll')
    if (sc) sc.scrollTop = 0
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  // Map marker click → open that country's detail (receives the event dispatched by ImpactMap)
  useEffect(() => {
    const onSelect = (e) => {
      if (COUNTRIES.some((c) => c.name === e.detail)) setSelected(e.detail)
    }
    window.addEventListener('cg-select-country', onSelect)
    return () => window.removeEventListener('cg-select-country', onSelect)
  }, [])

  return (
    <div style={{ marginTop: 40, borderTop: '1px solid var(--field-200)', paddingTop: 24 }}>
      <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '0 0 16px' }}>
        Country Grid · 13 countries at a glance
        <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 600, textTransform: 'none', letterSpacing: 0, color: 'var(--orange)', marginLeft: 8 }}>
          · Tap a card to zoom the map and open its project detail
        </span>
      </p>
      <div style={{ position: 'relative', border: '1px solid var(--field-200)', borderRadius: 8, overflow: 'hidden' }}>
        <AnimatedGradient colors={['#FF5515', '#0E7C7B', '#F4B223', '#2F7D4F']} speed={0.08} blur="medium" />
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 1,
          background: 'transparent',
        }}>
        {COUNTRIES.map((c) => {
          const isFood = c.food > 0
          const isCash = c.cash > 0
          const barPct = isFood ? (c.food / MAX_FOOD) * 100 : isCash ? (c.cash / 1885961) * 100 : 0
          const barColor = isCash ? '#0E7C7B' : 'var(--orange)'
          const numColor = isCash ? '#0E7C7B' : c.livelihood ? GREEN : 'var(--orange)'
          const isSel = c.name === selected

          return (
            <div
              key={c.name}
              onClick={() => setSelected((s) => (s === c.name ? null : c.name))}
              style={{
                position: 'relative',
                color: 'inherit',
                background: isSel ? '#fff' : 'rgba(255,255,255,0.85)',
                padding: '18px 20px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                transition: 'box-shadow 0.15s ease',
                cursor: 'pointer',
                outline: isSel ? '2px solid var(--orange)' : 'none',
                outlineOffset: '-2px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(17,18,34,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--midnight)' }}>
                  {c.countryEn}
                </span>
                {c.livelihood ? (
                  <span lang="en" style={{ fontSize: 11, color: GREEN, fontFamily: 'var(--font-kr)', fontWeight: 700 }}>
                    Livelihood programme
                  </span>
                ) : isFood ? (
                  <span className="num tnum" style={{ fontSize: 22, color: numColor }}>
                    {c.food.toLocaleString()}<span style={{ fontSize: 13, color: 'var(--grey-500)', marginLeft: 3 }}>t</span>
                  </span>
                ) : (
                  <span className="num tnum" style={{ fontSize: 22, color: numColor, textAlign: 'right', lineHeight: 1.15 }}>
                    {fmtCash(c.cash)}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, color: 'var(--grey-600)', fontWeight: 600 }}>
                {c.en}
              </span>
              {c.livelihood ? (
                <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: GREEN, fontWeight: 600, marginTop: 4 }}>
                  Livelihood &amp; resilience — no distribution
                </span>
              ) : (
                <div style={{ height: 3, background: 'var(--field-200)', borderRadius: 2, marginTop: 6 }}>
                  <div style={{ height: '100%', width: `${barPct}%`, background: barColor, borderRadius: 2 }} />
                </div>
              )}
              {/* Clickable indicator — › hints that it opens to the side (side drawer) */}
              <span aria-hidden style={{ position: 'absolute', bottom: 6, right: 10, fontSize: 13, lineHeight: 1, fontWeight: 700, color: isSel ? 'var(--orange)' : '#c2c0bb' }}>
                ›
              </span>
            </div>
          )
        })}
        </div>
      </div>

      {/* Selected country detail — right-side drawer (non-modal: fixed overlay on body, background map · cards stay usable/switchable) */}
      {country && createPortal(
          <div
            className="cg-drawer"
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-label={`${country.countryEn} project overview`}
            style={{
              position: 'fixed', top: 0, right: 0, zIndex: 3000,
              width: 'min(500px, 93vw)', background: '#fff', outline: 'none',
              boxShadow: '-14px 0 44px rgba(17,18,34,0.24)',
              display: 'flex', flexDirection: 'column',
              animation: 'cgDrawerIn 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close detail"
              style={{
                position: 'absolute', top: 14, right: 14, zIndex: 2, width: 34, height: 34, borderRadius: 999,
                border: '1px solid var(--field-200)', background: '#fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--grey-600)',
                boxShadow: '0 1px 4px rgba(17,18,34,0.1)',
              }}
            >
              <X size={17} />
            </button>

            <div className="panel-scroll" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', flex: 1, padding: isMobile ? '24px 18px 40px' : '30px 32px 40px' }}>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', margin: '0 0 10px' }}>
                Country Detail · Project overview by country
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', paddingRight: 40 }}>
                <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 28, color: 'var(--midnight)', margin: 0, letterSpacing: '-0.02em' }}>
                  {country.countryEn}
                </h3>
                <span style={{ fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 600, color: 'var(--grey-600)' }}>
                  {country.en.split('·')[0].trim()}
                </span>
              </div>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--grey-600)', margin: '6px 0 0' }}>
                {country.region}
              </p>

              {/* Finance structure — Korea's matching contribution →(leverage) WFP multilateral total project cost */}
              {country.wfpIncome > 0 && (
                <div style={{ marginTop: 22, padding: isMobile ? '16px 14px' : '18px 22px', background: 'var(--field-50)', borderRadius: 10, border: '1px solid var(--field-200)' }}>
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: isMobile ? 0 : 14 }}>
                    <FinanceCell isMobile={isMobile} label="Korea's matching contribution" usd={fmtCash(country.match)} color="var(--orange)" />
                    {!isMobile && <FinOp>→</FinOp>}
                    <FinanceCell isMobile={isMobile} label="WFP multilateral total project cost" usd={fmtCash(country.wfpIncome)} emphasize />
                  </div>
                  <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: '12px 0 0', lineHeight: 1.6, textAlign: 'center' }}>
                    <strong style={{ color: 'var(--orange)' }}>Korea's matching contribution</strong> unlocked the wider WFP multilateral budget. This <strong style={{ color: 'var(--midnight)' }}>WFP-basis total</strong> spans nutrition, school feeding, livelihoods, logistics and operating costs — well beyond food and cash — so it runs higher than the distribution results below.
                  </p>
                </div>
              )}

              {/* 5 core activities */}
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', margin: '24px 0 14px' }}>
                Activities <span style={{ fontWeight: 400, color: 'var(--grey-500)' }}>· those in colour are delivered here</span>
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {ACTIVITY_DEFS.map((def) => (
                  <ActivityChip key={def.key} def={def} active={country.activities.includes(def.key)} isMobile={isMobile} />
                ))}
              </div>

              {/* Distribution results by project */}
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', margin: '28px 0 4px' }}>
                Distribution results by project <span style={{ fontWeight: 400, color: 'var(--grey-500)' }}>· {country.projects.length} projects</span>
              </p>
              <div style={{ borderTop: '2px solid var(--midnight)' }}>
                {country.projects.map((p) => (
                  <ProjectRow key={p.site} p={p} isMobile={isMobile} />
                ))}
              </div>
            </div>
          </div>,
        document.body
      )}
    </div>
  )
}
