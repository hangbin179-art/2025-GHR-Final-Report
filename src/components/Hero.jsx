import { useEffect, useRef, useState } from 'react'
import useIsMobile from '../lib/useIsMobile.js'

/* ── Count-up 애니메이션 (의존성 없음) ───────────────────────
   0에서 목표값까지 easeOutCubic 으로 증가. 디자인은 건드리지 않고
   숫자 텍스트만 바꿉니다. prefers-reduced-motion 존중. */
function useCountUp(target, { duration = 1.5, delay = 0, start = true } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return // 화면에 보이기 전에는 시작하지 않음
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

  // Hero가 화면에 들어올 때 비로소 카운트업 시작 (스크롤 히어로 뒤에 있으므로
  // 마운트 즉시 시작하면 보기 전에 끝나버림).
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
            Result Report · 2025 · 결과보고
          </p>
          <h1 lang="ko" style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 700,
            fontSize: isMobile ? 40 : 64,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--midnight)',
            margin: 0,
            wordBreak: 'keep-all',
          }}>
            10,235.1톤의 식량이<br />
            <span style={{ color: 'var(--orange)' }}>식탁으로 갔습니다.</span>
          </h1>
          <p lang="ko" style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 19,
            lineHeight: 1.7,
            color: 'var(--grey-700)',
            margin: '28px 0 0',
            maxWidth: '50ch',
          }}>
            2025년, 월드비전과 유엔세계식량계획(WFP)은 13개국 20개 사업 현장에서
            식량 10,235.1톤, 영양실조치료 보충식 998.1톤, 현금·교환권 510만 달러(약 68억원)를
            직접 배분했습니다.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <a
              href="#sec-where"
              lang="ko"
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
              지도에서 사업 보기 →
            </a>
            <a
              href="#sec-result"
              lang="ko"
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
              최종 성과 보기
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
            Distribution ledger · 배분 실적
          </p>
          <div style={{ display: 'grid', gap: 18 }}>
            <LedgerRow label="일반식량 배분" value={10235.1} decimals={1} unit="톤" delay={0.1} start={started} />
            <div style={{ height: 1, background: 'var(--field-200)' }} />
            <LedgerRow label="영양실조치료 보충식" value={998.1} decimals={1} unit="톤" delay={0.22} start={started} />
            <div style={{ height: 1, background: 'var(--field-200)' }} />
            <LedgerRow label="현금 · 교환권 (USD)" value={5.11} decimals={2} prefix="$" unit="M" unitEn krw="≈ 68억원" delay={0.34} start={started} />
            <div style={{ height: 1, background: 'var(--field-200)' }} />
            <LedgerRow label="식량 가액 (USD)" value={15.86} decimals={2} prefix="$" unit="M" unitEn krw="≈ 211억원" delay={0.46} start={started} />

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
                  <p lang="ko" style={{
                    fontFamily: 'var(--font-kr)',
                    fontSize: 12,
                    color: 'var(--grey-700)',
                    margin: '4px 0 0',
                  }}>
                    20개 사업 · 13개국 현장
                  </p>
                </div>
                <span className="num" style={{ fontSize: 60, color: 'var(--orange-900)' }}>
                  <CountUp value={20} delay={0.58} duration={1.2} start={started} /><span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 18, marginLeft: 4 }}>개</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, lineHeight: 1.6, color: 'var(--grey-500)', margin: '12px 2px 0' }}>
          * 2025년 1월~12월 시행된 WFP 사업 내 한국 기여분 비율로 계산하여 산정
        </p>
        </div>
      </div>
    </section>
  )
}

function LedgerRow({ label, value, decimals = 0, prefix = '', unit, unitEn, delay = 0, start = true, krw }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--grey-600)' }}>
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
          <span lang="ko" style={{ display: 'block', fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', marginTop: 2 }}>
            {krw}
          </span>
        )}
      </span>
    </div>
  )
}
