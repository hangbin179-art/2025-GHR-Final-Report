import { GLOBAL_KPIS } from '../data/projects.js'
import { num, krwThousandToEok, krwThousandToUsd, tons } from '../lib/format.js'

// Comma-only orange split-span: "464,295" -> 464<o>,</o>295<o>,</o> ...
// The fill discipline is broken ONLY by the thousands commas turning orange.
function CommaSplit({ value, className = '' }) {
  const s = num(value) // grouped integer string, e.g. "464,295"
  const parts = s.split(',')
  return (
    <span className={className}>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="text-wv-orange">,</span>}
          {part}
        </span>
      ))}
    </span>
  )
}

// One quiet KPI ledger entry — Anton/Archivo latin figure + mono Korean label.
// Korean stays in font-sans; latin/numerals use font-archivo. (No card, no tint.)
function Stat({ figure, unit, label }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1.5 leading-none">
        <span className="font-archivo text-[26px] font-bold tabular-nums tracking-tight text-ink md:text-[30px]">
          {figure}
        </span>
        {unit && <span className="font-sans text-sm font-bold text-ink-soft">{unit}</span>}
      </div>
      <span className="mono-label mono-label--caps mt-2 text-ink-muted">{label}</span>
    </div>
  )
}

export default function Hero() {
  // Epicenter = top-right corner. Concentric solid-orange shockwave rings bleed
  // off-page; innermost ring is a filled disk (the signal's origin). All radii
  // share the corner center so the rings read as one survey instrument.
  const cx = 760
  const cy = 0
  // radius / strokeWidth pairs — heavy (16–40px), NEVER a hairline.
  const rings = [
    { r: 96, w: 40 },
    { r: 168, w: 36 },
    { r: 244, w: 32 },
    { r: 326, w: 28 },
    { r: 416, w: 24 },
    { r: 516, w: 20 },
    { r: 628, w: 16 },
  ]
  const diskR = 34 // innermost filled disk

  return (
    <header className="relative overflow-hidden bg-paper text-ink">
      {/* ── Masthead / brand bar — newspaper nameplate ───────────────────── */}
      <div className="relative border-b border-ink-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <span className="flex items-center gap-2.5">
            {/* WV square mark — the only rounded element besides the CTA */}
            <span
              className="flex h-7 w-8 items-center justify-center rounded-md bg-wv-orange text-[11px] font-black leading-none text-paper"
              aria-label="World Vision"
            >
              WV
            </span>
            <span className="font-display text-[15px] tracking-wide text-ink">
              WORLD VISION
            </span>
            <span className="font-sans text-ink-line">✕</span>
            <span className="font-display text-[15px] tracking-wide text-ink-soft">WFP</span>
          </span>
          <span className="flex items-baseline gap-2.5 text-right">
            <span className="mono-label mono-label--caps hidden text-ink-muted sm:inline">
              Field Dispatch
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] text-ink-muted">
              No.2025-12
            </span>
          </span>
        </div>
      </div>

      {/* ── Hero body — paper-cream ground (no radial glow / diagonal wash) ── */}
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        {/* SIGNATURE: solid-orange concentric shockwave, epicenter at top-right
            corner, sliced off-page (bleed). Heavy strokes 16–40px. */}
        <svg
          className="ring-svg pointer-events-none absolute right-0 top-0 h-[clamp(420px,46vw,720px)] w-[clamp(420px,46vw,720px)] translate-x-[34%] -translate-y-[30%]"
          viewBox="0 0 760 760"
          fill="none"
          aria-hidden="true"
        >
          {rings.map((ring) => (
            <circle
              key={ring.r}
              className="ring-stroke"
              cx={cx}
              cy={cy}
              r={ring.r}
              strokeWidth={ring.w}
            />
          ))}
          <circle className="ring-disk" cx={cx} cy={cy} r={diskR} />
        </svg>

        {/* Section code — replaces the eyebrow pill */}
        <p className="relative mono-label mono-label--caps text-ink-muted">
          INTERIM REPORT · 2025.12
        </p>

        {/* Headline — Pretendard 900, left, two-pole loud-but-not-Anton (Korean) */}
        <h1 className="relative mt-6 max-w-[18ch] text-balance font-sans font-black leading-[1.1] tracking-[-0.02em] text-ink text-[clamp(32px,5.4vw,56px)]">
          2025 글로벌 식량위기 대응사업
          <br className="hidden sm:block" />
          <span className="text-ink-soft">중간보고 대시보드</span>
        </h1>
        <p className="relative mt-5 max-w-xl font-sans text-[17px] leading-[1.7] text-ink-soft">
          월드비전{' '}
          <span className="font-archivo font-semibold text-ink">×</span> 유엔세계식량계획(WFP)
          다자기구협력사업 성과
        </p>

        {/* ── Quiet KPI ledger — asymmetric, NO grid-cols-6 ──────────────── */}
        {/* The big one (464,295명) leads; the rest trail as small mono figures. */}
        <div className="relative mt-12 max-w-2xl">
          <div className="flex flex-col">
            <CommaSplit
              value={GLOBAL_KPIS.beneficiaries}
              className="num-axis num-display inline-block w-fit pb-2 text-ink text-[clamp(56px,11vw,104px)]"
            />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-sans text-lg font-black text-ink">명</span>
              <span className="mono-label mono-label--caps text-ink-muted">
                Total Beneficiaries · 총 수혜자
              </span>
            </div>
          </div>

          {/* Trailing ledger row — uneven gaps, not an even strip */}
          <div className="mt-10 flex flex-wrap items-start gap-x-10 gap-y-8 border-t border-ink-line pt-7">
            <Stat figure={num(GLOBAL_KPIS.countries)} unit="개국" label="Countries" />
            <Stat figure={num(GLOBAL_KPIS.projects)} unit="개 사업" label="Projects" />
            <Stat
              figure={krwThousandToEok(GLOBAL_KPIS.wvSupport).replace('억원', '')}
              unit="억원"
              label="WV Support · 월드비전"
            />
            <Stat figure={krwThousandToUsd(GLOBAL_KPIS.wfpGrant)} label="WFP Grant" />
            <Stat
              figure={tons(GLOBAL_KPIS.foodTons).replace('톤', '')}
              unit="톤"
              label="Food Aid · 식량"
            />
          </div>
        </div>

        {/* ── Leverage statement — giant Anton "41" near the ring center ──── */}
        {/* "월드비전 1 → WFP 약 41배": Korean in font-sans, only 41 is Anton+orange. */}
        <div className="relative mt-16 flex flex-col items-start gap-x-8 gap-y-4 md:mt-20 md:flex-row md:items-end">
          <div className="md:pb-6">
            <p className="mono-label mono-label--caps text-ink-muted">Leverage</p>
            <p className="mt-3 max-w-[15ch] font-sans text-xl font-black leading-snug text-ink md:text-2xl">
              월드비전 <span className="font-archivo font-bold text-ink-soft">1</span>
              <span className="mx-2 text-ink-line">→</span>
              <br className="hidden md:block" />
              WFP 약
            </p>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="num-display leading-[0.8] text-wv-orange text-[clamp(120px,22vw,200px)]">
              41
            </span>
            <span className="pb-3 font-sans text-3xl font-black text-ink md:pb-5 md:text-4xl">
              배
            </span>
          </div>
        </div>

        {/* ── Single solid-orange CTA (weak rounded) ─────────────────────── */}
        <div className="relative mt-14">
          <a
            href="#impact-map"
            className="group inline-flex items-center gap-2.5 rounded-md bg-wv-orange px-6 py-3 font-sans text-[15px] font-bold text-paper transition-colors hover:bg-wv-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wv-orange"
          >
            지도에서 사업 보기
            <span aria-hidden="true" className="font-display text-base leading-none">↓</span>
          </a>
        </div>

        {/* ── Footnote rail — source /基準일 / formula, mono, academic ───── */}
        <p className="relative mt-12 max-w-2xl border-t border-ink-line pt-5 font-mono text-[11px] leading-relaxed text-ink-muted">
          <span className="footnote-idx">1</span> 13개국 · 20개 사업 기준. 출처: 2025 글로벌
          식량위기 대응사업(WFP &amp; FAO 2025) 제안서(2025.03) · 중간보고서(2025.12).{' '}
          <span className="footnote-idx">2</span> 레버리지 = WFP 지원금 ÷ 월드비전 지원금
          ($39.9M ÷ ≈$0.97M).
        </p>
      </div>
    </header>
  )
}
