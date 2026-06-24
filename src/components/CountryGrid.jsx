import { useState, useEffect, useRef } from 'react'
import { Wheat, Banknote, HeartPulse, GraduationCap, Sprout, X } from 'lucide-react'
import { AnimatedGradient } from './AnimatedGradient.jsx'
import { usdToKrwLabel } from '../lib/format.js'
import useIsMobile from '../lib/useIsMobile.js'
import { COUNTRIES as RAW_COUNTRIES, countryTotals } from '../data/countries.js'

const MAX_FOOD = 3797 // DRC total (3,088+632+76)
const GREEN = '#2F7D4F'

// ── 5대 활동 정의 (아이콘 + 색) ─────────────────────────────
const ACTIVITY_DEFS = [
  { key: 'food',       label: '일반식량',    Icon: Wheat,         color: '#FF5515' },
  { key: 'cash',       label: '현금·교환권', Icon: Banknote,      color: '#0E7C7B' },
  { key: 'nutrition',  label: '영양 치료식', Icon: HeartPulse,    color: '#C8102E' },
  { key: 'school',     label: '학교 급식',   Icon: GraduationCap, color: '#C77E0A' },
  { key: 'livelihood', label: '생계 역량',   Icon: Sprout,        color: '#2F7D4F' },
]

// 국가별 표시 데이터 — 단일 소스(countries.js)에서 파생 (카드 표시값 + 활동 + 사업 목록 + 계획 수혜자)
const COUNTRIES = RAW_COUNTRIES.map((c) => {
  const t = countryTotals(c)
  return {
    name: c.ko, en: c.en, region: c.region,
    activities: c.activities, livelihood: c.livelihood, projects: c.projects,
    food: Math.round(t.food), cash: t.cash,
  }
})

function fmtCash(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  return '$' + (n / 1000).toFixed(0) + 'K'
}

// 활동 아이콘 — 하는 활동은 컬러, 안 하는 활동은 회색
function ActivityChip({ def, active }) {
  const { Icon, label, color } = def
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, minWidth: 60 }}>
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? `${color}1A` : '#f1f0ee',
        color: active ? color : '#c2c0bb',
        border: active ? `1.5px solid ${color}59` : '1.5px solid var(--field-200)',
        transition: 'all 0.2s ease',
      }}>
        <Icon size={23} strokeWidth={2} />
      </div>
      <span lang="ko" style={{
        fontFamily: 'var(--font-kr)', fontSize: 11, textAlign: 'center',
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
      <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-500)' }}>{label}</span>
      <span className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 14, fontWeight: 700, color }}>{value}</span>
    </span>
  )
}

function ProjectRow({ p }) {
  const empty = !(p.food > 0) && !(p.cash > 0) && !(p.ther > 0)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--field-200)' }}>
      <div style={{ minWidth: 0 }}>
        <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--midnight)' }}>{p.site}</span>
        {p.title && <span style={{ display: 'block', fontFamily: 'var(--font-en)', fontSize: 11, color: 'var(--grey-500)', marginTop: 2 }}>{p.title}</span>}
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'baseline' }}>
        {p.food > 0 && <Metric color="#FF5515" label="식량" value={`${p.food.toLocaleString()}톤`} />}
        {p.cash > 0 && <Metric color="#0E7C7B" label="현금" value={`${fmtCash(p.cash)} · ${usdToKrwLabel(p.cash)}`} />}
        {p.ther > 0 && <Metric color="#C8102E" label="치료식" value={`${p.ther.toLocaleString()}톤`} />}
        {p.note && <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontStyle: 'italic', color: empty ? '#C8102E' : 'var(--grey-500)' }}>{p.note}</span>}
      </div>
    </div>
  )
}

export default function CountryGrid() {
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState(null)
  const panelRef = useRef(null)
  const country = COUNTRIES.find((c) => c.name === selected)

  // 선택 시 패널을 화면 안으로 부드럽게 스크롤
  useEffect(() => {
    if (!selected) return
    const t = setTimeout(() => {
      if (panelRef.current) panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 80)
    return () => clearTimeout(t)
  }, [selected])

  // 지도 마커 클릭 → 해당 국가 상세 열기 (ImpactMap에서 발생시키는 이벤트 수신)
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
        Country Grid · 13개국 직접 비교
        <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 600, textTransform: 'none', letterSpacing: 0, color: 'var(--orange)', marginLeft: 8 }}>
          · 카드를 클릭하면 사업 상세가 열립니다
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
                <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--midnight)' }}>
                  {c.name}
                </span>
                {c.livelihood ? (
                  <span lang="ko" style={{ fontSize: 11, color: GREEN, fontFamily: 'var(--font-kr)', fontWeight: 700 }}>
                    생계 사업
                  </span>
                ) : isFood ? (
                  <span className="num tnum" style={{ fontSize: 22, color: numColor }}>
                    {c.food.toLocaleString()}<span style={{ fontSize: 13, color: 'var(--grey-500)', marginLeft: 3 }}>t</span>
                  </span>
                ) : (
                  <span className="num tnum" style={{ fontSize: 22, color: numColor, textAlign: 'right', lineHeight: 1.15 }}>
                    {fmtCash(c.cash)}
                    <span lang="ko" style={{ display: 'block', fontFamily: 'var(--font-kr)', fontSize: 10, fontWeight: 400, color: 'var(--grey-500)' }}>{usdToKrwLabel(c.cash)}</span>
                  </span>
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 10, color: 'var(--grey-600)', fontWeight: 600 }}>
                {c.en}
              </span>
              {c.livelihood ? (
                <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: GREEN, fontWeight: 600, marginTop: 4 }}>
                  배분 없는 생계 역량 강화 사업
                </span>
              ) : (
                <div style={{ height: 3, background: 'var(--field-200)', borderRadius: 2, marginTop: 6 }}>
                  <div style={{ height: '100%', width: `${barPct}%`, background: barColor, borderRadius: 2 }} />
                </div>
              )}
              {/* 클릭 가능 표시 */}
              <span aria-hidden style={{ position: 'absolute', bottom: 6, right: 10, fontSize: 13, lineHeight: 1, fontWeight: 700, color: isSel ? 'var(--orange)' : '#c2c0bb' }}>
                {isSel ? '▾' : '›'}
              </span>
            </div>
          )
        })}
        </div>
      </div>

      {/* 선택된 국가 상세 패널 */}
      {country && (
        <div
          ref={panelRef}
          key={country.name}
          style={{
            marginTop: 24,
            background: '#fff',
            border: '1px solid var(--field-200)',
            borderRadius: 12,
            padding: isMobile ? '22px 18px 24px' : '28px 32px 32px',
            position: 'relative',
            animation: 'cgPanelIn 0.34s ease-out',
          }}
        >
          <button
            onClick={() => setSelected(null)}
            aria-label="상세 닫기"
            style={{
              position: 'absolute', top: 18, right: 18, width: 34, height: 34, borderRadius: 999,
              border: '1px solid var(--field-200)', background: '#fff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--grey-600)',
            }}
          >
            <X size={17} />
          </button>

          <p style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', margin: '0 0 10px' }}>
            Country Detail · 국가별 사업 개요
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 28, color: 'var(--midnight)', margin: 0, letterSpacing: '-0.02em' }}>
              {country.name}
            </h3>
            <span style={{ fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 600, color: 'var(--grey-600)' }}>
              {country.en.split('·')[0].trim()}
            </span>
          </div>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--grey-600)', margin: '6px 0 0' }}>
            {country.region}
          </p>

          {/* 5대 활동 */}
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', margin: '24px 0 14px' }}>
            진행 활동 <span style={{ fontWeight: 400, color: 'var(--grey-500)' }}>· 색이 들어온 활동을 수행합니다</span>
          </p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 520 }}>
            {ACTIVITY_DEFS.map((def) => (
              <ActivityChip key={def.key} def={def} active={country.activities.includes(def.key)} />
            ))}
          </div>

          {/* 사업별 배분 실적 */}
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', margin: '28px 0 4px' }}>
            사업별 배분 실적 <span style={{ fontWeight: 400, color: 'var(--grey-500)' }}>· {country.projects.length}개 사업</span>
          </p>
          <div style={{ borderTop: '2px solid var(--midnight)' }}>
            {country.projects.map((p) => (
              <ProjectRow key={p.site} p={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
