import { GLOBAL_KPIS } from '../data/projects.js'
import {
  num,
  krwThousandToEok,
  krwThousandToUsd,
  tons,
  multiple,
} from '../lib/format.js'
import { Icon } from '../lib/icons.jsx'

// Small KPI cell for the headline figure strip.
function Kpi({ icon, value, label, accent = false }) {
  return (
    <div
      className={[
        'flex items-start gap-3 rounded-xl2 border p-4 backdrop-blur-sm transition-colors',
        accent
          ? 'border-wv-orange/40 bg-wv-orange/10'
          : 'border-white/10 bg-white/5 hover:border-white/20',
      ].join(' ')}
    >
      <span
        className={[
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          accent ? 'bg-wv-orange/20 text-wv-orange' : 'bg-white/10 text-white/70',
        ].join(' ')}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="tnum text-xl font-extrabold leading-none text-white md:text-2xl">
          {value}
        </div>
        <div className="mt-1.5 text-xs leading-snug text-white/60">{label}</div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-ink text-white">
      {/* Subtle, tasteful background depth — radial glow + diagonal wash, no loud bars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 80% at 78% 0%, rgba(244,121,32,0.22), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(45,108,182,0.16), transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-soft/40 via-transparent to-ink"
      />

      {/* Slim brand bar */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <span className="flex items-center gap-2.5 text-sm font-bold tracking-wide">
            {/* WV brand mark */}
            <span
              className="flex h-7 w-8 items-center justify-center rounded text-[11px] font-black text-white"
              style={{ background: '#F47920' }}
              aria-label="World Vision"
            >
              WV
            </span>
            <span className="text-wv-orange">WORLD VISION</span>
            <span className="text-white/30">×</span>
            <span className="text-white/90">WFP</span>
          </span>
          <span className="text-right text-[11px] font-medium leading-tight text-white/55 md:text-xs">
            2025 글로벌 식량위기 대응사업 · 중간보고
          </span>
        </div>
      </div>

      {/* Hero body */}
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="max-w-3xl animate-fade-in">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-wv-orange/30 bg-wv-orange/10 px-3.5 py-1.5 text-sm font-semibold text-wv-orange">
            <Icon name="HandHeart" className="h-4 w-4" />
            후원을 멈추는 후원
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-6xl">
            2025 글로벌 식량위기 대응사업
            <br className="hidden sm:block" /> 중간보고 대시보드
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            월드비전 × 유엔세계식량계획(WFP) 다자기구협력사업 성과
          </p>
        </div>

        {/* Standout leverage callout */}
        <div className="mt-10 animate-fade-in">
          <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl2 border border-wv-orange/30 bg-gradient-to-r from-wv-orange/15 to-transparent px-5 py-4">
            <Icon name="Sparkles" className="h-6 w-6 text-gold" />
            <span className="text-sm font-medium text-white/70">레버리지 효과</span>
            <span className="tnum text-2xl font-extrabold text-white md:text-3xl">
              월드비전 1 <span className="text-white/40">→</span>{' '}
              <span className="text-wv-orange">WFP 약 {multiple(GLOBAL_KPIS.leverage)}</span>
            </span>
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Kpi icon="Globe" value={`${num(GLOBAL_KPIS.countries)}개국`} label="사업 국가" />
          <Kpi icon="Layers" value={`${num(GLOBAL_KPIS.projects)}개`} label="사업 수" />
          <Kpi icon="Users" value={`${num(GLOBAL_KPIS.beneficiaries)}명`} label="총 수혜자" />
          <Kpi
            icon="HandHeart"
            value={krwThousandToEok(GLOBAL_KPIS.wvSupport)}
            label="월드비전 지원"
            accent
          />
          <Kpi
            icon="Wallet"
            value={krwThousandToUsd(GLOBAL_KPIS.wfpGrant)}
            label="WFP 지원 규모"
          />
          <Kpi icon="Wheat" value={tons(GLOBAL_KPIS.foodTons)} label="총 식량 지원" />
        </div>

        {/* Downward anchor */}
        <div className="mt-12">
          <a
            href="#impact-map"
            className="group inline-flex items-center gap-2 rounded-full bg-wv-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-wv-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wv-orange"
          >
            지도에서 사업 보기
            <Icon
              name="ArrowRight"
              className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </header>
  )
}
