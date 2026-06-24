import { useState, useEffect, useRef } from 'react'
import { Wheat, Banknote, HeartPulse, GraduationCap, Sprout, X } from 'lucide-react'
import { AnimatedGradient } from './AnimatedGradient.jsx'
import { usdToKrwLabel } from '../lib/format.js'

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

// 국가별 데이터: 카드 표시값(food/cash) + 진행 활동 + 사업별 배분 실적
const COUNTRIES = [
  {
    name: '콩고민주공화국', en: 'DR Congo · S. Kivu, Tanganyika, Kasai', region: '남부키부 · 탕가니카 · 카사이',
    food: 3797, cash: 0, activities: ['food', 'nutrition'],
    projects: [
      { site: '남부키부 (South Kivu)', food: 3088.2, ther: 74.9, cash: 0 },
      { site: '탕가니카 (Tanganyika)', food: 632.6, ther: 0, cash: 0 },
      { site: '카사이 · 루이자 (Kasai · Luiza)', food: 76.2, ther: 76.2, cash: 0 },
    ],
  },
  {
    name: '수단', en: 'Sudan · S. Darfur, S. Kordofan, White Nile', region: '남다르푸르 · 남코르도판 · 백나일',
    food: 3322, cash: 324429, activities: ['food', 'cash', 'nutrition'],
    projects: [
      { site: '남다르푸르 (IFA)', food: 2276.3, ther: 15.3, cash: 0 },
      { site: '남코르도판', food: 1025.7, ther: 17.4, cash: 324429 },
      { site: '남다르푸르 (영양)', food: 20.1, ther: 20.1, cash: 0 },
      { site: '백나일 (White Nile)', food: 0, ther: 0, cash: 0, note: '현지 정부 승인 지연으로 사업 미진행' },
    ],
  },
  {
    name: '아프가니스탄', en: 'Afghanistan · Ghor, Badghis', region: '고르 · 바드기스',
    food: 829, cash: 173877, activities: ['food', 'cash', 'nutrition'],
    projects: [{ site: '고르 · 바드기스', food: 829.3, ther: 65.7, cash: 173877 }],
  },
  {
    name: '에티오피아', en: 'Ethiopia · Tigray, Afar, Amhara', region: '티그라이 · 아파르 · 암하라',
    food: 696, cash: 0, activities: ['food', 'nutrition'],
    projects: [{ site: '티그라이 · 아파르 · 암하라', food: 695.8, ther: 695.8, cash: 0 }],
  },
  {
    name: '우간다', en: 'Uganda · Bidibidi, Lobule', region: '비디비디 · 로불레',
    food: 505, cash: 558117, activities: ['food', 'cash', 'nutrition'],
    projects: [{ site: '비디비디 · 로불레', food: 505.0, ther: 33.6, cash: 558117 }],
  },
  {
    name: '베네수엘라', en: 'Venezuela · Zulia, Falcón +2', region: '줄리아 · 팔콘 외',
    food: 476, cash: 0, activities: ['food'],
    projects: [{ site: '줄리아 · 팔콘 외', food: 475.5, ther: 0, cash: 0 }],
  },
  {
    name: '남수단', en: 'South Sudan · Fashoda, Renk, Juba', region: '파쇼다 · 렌크 · 주바',
    food: 412, cash: 539033, activities: ['food', 'cash', 'nutrition', 'school'],
    projects: [
      { site: '파쇼다 · 파니캉', food: 301.1, ther: 0.5, cash: 397930 },
      { site: '렌크 · 마뇨', food: 81.2, ther: 0, cash: 0 },
      { site: '주바 · 얌비오 (자립형 학교급식)', food: 29.6, ther: 0, cash: 141103 },
    ],
  },
  {
    name: '차드', en: 'Chad · Farchana +5 (학교 급식)', region: '파르샤나 외 · 학교급식',
    food: 199, cash: 15941, activities: ['food', 'cash', 'school'],
    projects: [{ site: '파르샤나 외 5개 지역 (긴급 학교급식 ESF)', food: 198.5, ther: 0, cash: 15941 }],
  },
  {
    name: '방글라데시', en: "Bangladesh · Cox's Bazar (현금)", region: '콕스바자르 · 현금 전용',
    food: 0, cash: 1885961, activities: ['cash'],
    projects: [{ site: "콕스바자르 (전자바우처 E-Voucher)", food: 0, ther: 0, cash: 1885961 }],
  },
  {
    name: '콜롬비아', en: 'Colombia · Valle del Cauca (현금)', region: '바예델카우카 · 현금 전용',
    food: 0, cash: 1456689, activities: ['cash'],
    projects: [{ site: '바예델카우카', food: 0, ther: 0, cash: 1456689 }],
  },
  {
    name: '중앙아프리카공화국', en: 'CAR · Bambari, Bouar (생계)', region: '밤바리 · 부아르 · 생계',
    food: 0, cash: 87318, activities: ['cash', 'livelihood'],
    projects: [{ site: '밤바리 · 부아르 (자산조성지원 FFA)', food: 0, ther: 0, cash: 87318 }],
  },
  {
    name: '미얀마', en: 'Myanmar · Northern Shan (긴급 현금)', region: '노던샨 · 긴급 현금',
    food: 0, cash: 64616, activities: ['cash'],
    projects: [{ site: '노던샨 (긴급 현금)', food: 0, ther: 0, cash: 64616 }],
  },
  {
    name: '케냐', en: 'Kenya · Makueni, Kitui', region: '마쿠에니 · 키투이',
    food: 0, cash: 0, livelihood: true, activities: ['livelihood'],
    projects: [{ site: '마쿠에니 · 키투이 (VSLA · 작물보험)', food: 0, ther: 0, cash: 0, note: '배분 없는 생계 역량 강화 사업' }],
  },
]

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
      <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--midnight)' }}>{p.site}</span>
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
          gridTemplateColumns: 'repeat(4, 1fr)',
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
            padding: '28px 32px 32px',
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
