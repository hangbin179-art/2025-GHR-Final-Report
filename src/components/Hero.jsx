import { useEffect, useRef, useState } from 'react'
import useIsMobile from '../lib/useIsMobile.js'

/* ── Count-up animation (no dependencies) ───────────────────────
   Counts from 0 to the target value with easeOutCubic. Only the
   number text changes; the design is untouched. Respects
   prefers-reduced-motion. */
function useCountUp(target, { duration = 1.5, delay = 0, start = true } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return // do not start before it is visible on screen
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setValue(target); return }

    let raf, startTime
    const startTimer = setTimeout(() => {
      const tick = (now) => {
        if (startTime == null) startTime = now
        const p = Math.min((now - startTime) / (duration * 1000), 1)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        setValue(target * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
        else setValue(target)
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => { clearTimeout(startTimer); cancelAnimationFrame(raf) }
  }, [target, duration, delay, start])
  return value
}

function CountUp({ value, decimals = 0, prefix = '', duration = 1.5, delay = 0, start = true }) {
  const v = useCountUp(value, { duration, delay, start })
  const formatted = v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{prefix}{formatted}</span>
}

export default function Hero() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const isMobile = useIsMobile()

  // Only start the count-up when the Hero enters the viewport (it sits behind
  // the scroll hero, so starting on mount would finish before it is seen).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setStarted(true); return }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '36px 20px 48px' : '56px 32px 80px', background: 'var(--field-50)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
        gap: isMobile ? 28 : 48,
        alignItems: isMobile ? 'stretch' : 'end',
      }}>
        {/* Left column */}
        <div>
          <p style={{
            fontFamily: 'var(--font-en)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            margin: '0 0 20px',
          }}>
            Result Report · 2025 · Final Report
          </p>
          <h1 lang="en" style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 700,
            fontSize: isMobile ? 40 : 64,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--midnight)',
            margin: 0,
            wordBreak: 'keep-all',
          }}>
            10,235.1 tonnes of food<br />
            <span style={{ color: 'var(--orange)' }}>reached the table.</span>
          </h1>
          <p lang="en" style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 19,
            lineHeight: 1.7,
            color: 'var(--grey-700)',
            margin: '28px 0 0',
            maxWidth: '50ch',
          }}>
            In 2025, World Vision and the World Food Programme (WFP) directly distributed
            10,235.1 tonnes of food, 998.1 tonnes of therapeutic and supplementary food, and
            $5.1M in cash and vouchers across 20 projects in 13 countries.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <a
              href="#sec-where"
              lang="en"
              style={{
                background: 'var(--midnight)',
                color: '#fff',
                padding: '14px 24px',
                borderRadius: 8,
                fontFamily: 'var(--font-en)',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View projects on the map →
            </a>
            <a
              href="#sec-result"
              lang="en"
              style={{
                background: 'transparent',
                color: 'var(--midnight)',
                border: '1.5px solid var(--field-300)',
                padding: '14px 24px',
                borderRadius: 8,
                fontFamily: 'var(--font-en)',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View final results
            </a>
          </div>
        </div>

        {/* Right column — KPI Ledger */}
        <div>
        <div style={{
          background: '#fff',
          border: '1px solid var(--field-200)',
          borderRadius: 12,
          padding: 32,
        }}>
          <p style={{
            fontFamily: 'var(--font-en)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--grey-600)',
            margin: '0 0 24px',
            paddingBottom: 12,
            borderBottom: '1px solid var(--field-200)',
          }}>
            Distribution ledger · Distribution results
          </p>
          <div style={{ display: 'grid', gap: 18 }}>
            <LedgerRow label="Food distributed" value={10235.1} decimals={1} unit="tonnes" delay={0.1} start={started} />
            <div style={{ height: 1, background: 'var(--field-200)' }} />
            <LedgerRow label="Therapeutic & supplementary food" value={998.1} decimals={1} unit="t" delay={0.22} start={started} />
            <div style={{ height: 1, background: 'var(--field-200)' }} />
            <LedgerRow label="Cash & vouchers (USD)" value={5.11} decimals={2} prefix="$" unit="M" unitEn delay={0.34} start={started} />
            <div style={{ height: 1, background: 'var(--field-200)' }} />
            <LedgerRow label="Commodity value (USD)" value={16.04} decimals={2} prefix="$" unit="M" unitEn delay={0.46} start={started} />

            {/* Orange footer box */}
            <div style={{
              background: 'var(--orange-100)',
              margin: '8px -32px -32px',
              padding: '20px 32px',
              borderRadius: '0 0 12px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-en)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--orange-900)',
                    margin: 0,
                  }}>
                    20 Projects · 13 Countries
                  </p>
                  <p lang="en" style={{
                    fontFamily: 'var(--font-kr)',
                    fontSize: 12,
                    color: 'var(--grey-700)',
                    margin: '4px 0 0',
                  }}>
                    20 projects · field sites in 13 countries
                  </p>
                </div>
                <span className="num" style={{ fontSize: 60, color: 'var(--orange-900)' }}>
                  <CountUp value={20} delay={0.58} duration={1.2} start={started} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, lineHeight: 1.6, color: 'var(--grey-500)', margin: '12px 2px 0' }}>
          * Calculated based on Korea's contribution share within WFP projects implemented from January to December 2025
        </p>
        </div>
      </div>
    </section>
  )
}

function LedgerRow({ label, value, decimals = 0, prefix = '', unit, unitEn, delay = 0, start = true, krw }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--grey-600)' }}>
        {label}
      </span>
      <span style={{ display: 'inline-block', textAlign: 'right' }}>
        <span className="num tnum" style={{ fontSize: 30, color: 'var(--midnight)' }}>
          <CountUp value={value} decimals={decimals} prefix={prefix} delay={delay} start={start} />
          <span style={{
            fontFamily: unitEn ? 'var(--font-en)' : 'var(--font-kr)',
            fontWeight: unitEn ? 600 : 500,
            fontSize: 14,
            color: 'var(--grey-600)',
            marginLeft: 6,
          }}>
            {unit}
          </span>
        </span>
        {krw && (
          <span lang="en" style={{ display: 'block', fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', marginTop: 2 }}>
            {krw}
          </span>
        )}
      </span>
    </div>
  )
}
