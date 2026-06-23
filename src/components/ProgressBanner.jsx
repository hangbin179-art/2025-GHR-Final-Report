import { GLOBAL_KPIS } from '../data/projects.js'
import { tons, kg, pct, usd, wonToEok, num } from '../lib/format.js'

// ── Half-dome arc gauge: % as a 180° sweep; >100% overshoots honestly. ──
function ArcGauge({ value, color = '#F47920' }) {
  const safe = typeof value === 'number' && !Number.isNaN(value) ? Math.max(value, 0) : 0
  const over = safe > 100
  const r = 40, cx = 50, cy = 50
  const semi = Math.PI * r
  const baseLen = (semi * Math.min(safe, 100)) / 100
  const d = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
  return (
    <div className="relative w-[108px] shrink-0">
      <svg className="block w-full" viewBox="0 0 100 56" fill="none" aria-hidden="true">
        <path d={d} stroke="#D8D2C6" strokeWidth="7" strokeLinecap="round" />
        <path
          d={d}
          stroke={over ? '#D85F12' : color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${baseLen} ${semi}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <span
          className={'num-display leading-none ' + (over ? 'text-wv-orange-dark' : 'text-ink')}
          style={{ fontSize: '28px' }}
        >
          {pct(value).replace('%', '')}
        </span>
      </div>
    </div>
  )
}

// ── One result metric: gauge + figure + plan-vs-actual detail ──
function Metric({ label, labelEn, pctValue, figure, unit, detail, color }) {
  return (
    <div className="border-t-2 pt-5" style={{ borderColor: color }}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-sans text-[14px] font-black text-ink">{label}</span>
        <span className="mono-label mono-label--caps text-ink-muted">{labelEn}</span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        {pctValue != null && <ArcGauge value={pctValue} color={color} />}
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="font-archivo text-[30px] font-bold tabular-nums leading-none text-ink">
              {figure}
            </span>
            {unit && <span className="font-sans text-sm font-bold text-ink-soft">{unit}</span>}
          </div>
          <p className="mono-label mt-2 leading-snug text-ink-muted">{detail}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProgressBanner() {
  const { result, wfpDelivered, foodTons, cashValue } = GLOBAL_KPIS
  const cashPlanEok = ((cashValue * 1000) / 1e8).toFixed(0)

  return (
    <section className="border-b border-ink-line bg-paper-sub">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="mono-label mono-label--caps text-ink-muted">
            누적 결과 실적 · Cumulative Results
          </p>
          <span className="mono-label mono-label--caps border border-wv-orange px-2 py-0.5 text-wv-orange">
            데이터 기준 2026.06 · 월드비전 기여분
          </span>
        </div>

        {/* 3 result gauges */}
        <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-3">
          <Metric
            label="식량 배분"
            labelEn="Food Distribution"
            pctValue={result.foodPct}
            figure={num(result.foodActualTons)}
            unit="톤"
            detail={`계획 ${tons(foodTons)} 대비 · ${usd(result.foodActualUSD)} 상당`}
            color="#F47920"
          />
          <Metric
            label="현금/교환권"
            labelEn="Cash & Voucher"
            pctValue={result.cashPct}
            figure={wonToEok(result.cashActualKRW).replace('억원', '')}
            unit="억원"
            detail={`계획 ${cashPlanEok}억원 대비 · ${usd(result.cashActualUSD)} 상당`}
            color="#0E7C7B"
          />
          <Metric
            label="영양 치료식"
            labelEn="Nutrition · RUTF/RUSF"
            pctValue={null}
            figure={num(Math.round(result.nutritionKg / 1000))}
            unit="톤"
            detail={`${kg(result.nutritionKg)} 누적 배분`}
            color="#C8102E"
          />
        </div>

        {/* WFP delivered total — the leverage payoff, as a single bold ledger row */}
        <div className="mt-10 border-t-2 border-ink pt-6">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div className="max-w-md">
              <p className="mono-label mono-label--caps text-ink-muted">
                월드비전이 WFP 파트너로 전달·운영한 사업 전체 규모
              </p>
              <p className="mt-2 font-sans text-[15px] font-bold leading-snug text-ink-soft [word-break:keep-all]">
                월드비전 지원금이 마중물이 되어, 13개국에서 식량·현금 합산{' '}
                <span className="text-wv-orange">약 1억 4,850만 달러</span> 규모의 지원을
                현장에 전달했습니다.
              </p>
            </div>
            <div className="flex items-stretch gap-x-8 gap-y-4">
              <BigStat figure={usd(wfpDelivered.totalValueUSD)} label="전체 전달 가치" labelEn="Total Delivered" accent />
              <div className="w-px self-stretch bg-ink-line" />
              <BigStat figure={`${num(wfpDelivered.foodTons)}`} unit="톤" label="식량 전달량" labelEn="Food Tonnage" />
              <div className="w-px self-stretch bg-ink-line" />
              <BigStat figure={usd(wfpDelivered.cashUSD)} label="현금 전달액" labelEn="Cash Delivered" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BigStat({ figure, unit, label, labelEn, accent = false }) {
  return (
    <div className="flex flex-col justify-end">
      <div className="flex items-baseline gap-1 leading-none">
        <span
          className={
            'num-display leading-none text-[clamp(30px,4.5vw,46px)] ' +
            (accent ? 'text-wv-orange' : 'text-ink')
          }
        >
          {figure}
        </span>
        {unit && <span className="font-sans text-base font-black text-ink-soft">{unit}</span>}
      </div>
      <span className="font-sans text-[12px] font-bold text-ink mt-2">{label}</span>
      <span className="mono-label mono-label--caps text-ink-muted">{labelEn}</span>
    </div>
  )
}
