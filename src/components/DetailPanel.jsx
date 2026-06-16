import { ACTIVITY_KEYS, leverageOf } from '../data/projects.js'
import { ACTIVITY_META } from '../data/content.js'
import {
  num,
  tons,
  kg,
  pct,
  multiple,
  krwThousandToWon,
  krwThousandToUsd,
} from '../lib/format.js'
import { Icon } from '../lib/icons.jsx'
import PhotoGallery from './PhotoGallery.jsx'

// ---------------------------------------------------------------------------
// FIELD DISPATCH — right-rail country dossier.
// Square ink-line frame (no rounded card / no shadow); empty + filled states
// share the SAME shell so the layout never jumps. The one instrument color
// (solid orange) is spent on a single bleeding corner ring + the lead figure;
// data categories survive only as 1.5px line icons and small color dots.
// ---------------------------------------------------------------------------

// Outer shell — shared by empty + filled states so layout never jumps.
// Rounded card + shadow retired → right-angle plate framed by a 1px hairline.
function PanelCard({ children }) {
  return (
    <div className="flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden border border-ink-line bg-paper">
      {children}
    </div>
  )
}

// One semicircle arc gauge. % expressed as arc sweep over a 180° track.
// 100% fills the half-turn; anything over 100% (e.g. Afghanistan 113.2%)
// honestly OVERSHOOTS — a second orange arc layers over the start of the
// track so the overflow reads as "계획 초과", never silently clamped.
function ArcGauge({ value, label, sub, note }) {
  const safe = typeof value === 'number' && !Number.isNaN(value) ? Math.max(value, 0) : 0
  const over = safe > 100

  // geometry — a 100×56 viewBox half-dome, centered low so the arc is the top half.
  const cx = 50
  const cy = 50
  const r = 40
  const semi = Math.PI * r // length of a 180° arc

  // base layer: 0–100% of the half-turn (clamped for the primary sweep)
  const baseFrac = Math.min(safe, 100) / 100
  const baseLen = semi * baseFrac
  // overflow layer: the 0–13.2% slice that spills past 100%, drawn on top.
  const overFrac = over ? Math.min(safe - 100, 100) / 100 : 0
  const overLen = semi * overFrac

  // left endpoint of the semicircle → right endpoint, sweeping over the top.
  const dPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`

  return (
    <div className="flex items-end gap-4">
      <div className="relative w-[120px] shrink-0">
        <svg className="block w-full" viewBox="0 0 100 58" fill="none" aria-hidden="true">
          {/* track */}
          <path className="ring-gauge-track" d={dPath} strokeWidth="7" />
          {/* primary sweep (0–100%) — draws once on mount; static under reduced motion */}
          <path
            className="ring-gauge-fill animate-draw-arc motion-reduce:animate-none"
            d={dPath}
            strokeWidth="7"
            strokeDasharray={`${baseLen} ${semi}`}
            strokeDashoffset={semi - baseLen}
            style={{ '--arc-len': `${semi}px`, '--arc-offset': `${semi - baseLen}px` }}
          />
          {/* overflow sweep (>100%) — a 2nd arc layered over the start of the
              track (darker + thinner), so 113.2% honestly overshoots vs. clamps */}
          {over && (
            <path
              className="ring-gauge-fill animate-draw-arc motion-reduce:animate-none"
              d={dPath}
              strokeWidth="3"
              stroke="#D85F12"
              strokeDasharray={`${overLen} ${semi}`}
              strokeDashoffset={semi - overLen}
              transform="translate(0 -5.5)"
              style={{ '--arc-len': `${semi}px`, '--arc-offset': `${semi - overLen}px` }}
            />
          )}
        </svg>
        {/* % readout nested in the dome */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span
            className={
              'num-display leading-none ' + (over ? 'text-wv-orange-dark' : 'text-ink')
            }
            style={{ fontSize: '30px' }}
          >
            {pct(value).replace('%', '')}
          </span>
        </div>
      </div>

      <div className="min-w-0 pb-0.5">
        <div className="flex items-baseline gap-1">
          <span className="font-sans text-sm font-black text-ink">{label}</span>
          <span className="font-display text-[13px] leading-none text-ink-muted">%</span>
        </div>
        {sub ? <div className="tnum mono-label mt-1 text-ink-muted">{sub}</div> : null}
        {note ? (
          <div className="mono-label mono-label--caps mt-1 text-wv-orange-dark">{note}</div>
        ) : null}
      </div>
    </div>
  )
}

export default function DetailPanel({ project, onClose }) {
  // ---- EMPTY STATE --------------------------------------------------------
  // Same shell as filled (zero layout jump). MapPin-in-a-circle retired →
  // one bleeding solid-orange concentric ring + a single Mono instruction line.
  if (!project) {
    return (
      <PanelCard>
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* one solid orange concentric ring, knife-cut off the corner */}
          <svg
            className="ring-svg pointer-events-none absolute -right-16 -top-16 h-56 w-56"
            viewBox="0 0 224 224"
            aria-hidden="true"
          >
            <circle className="ring-stroke" cx="112" cy="112" r="92" strokeWidth="26" opacity="0.5" />
            <circle className="ring-disk" cx="112" cy="112" r="30" opacity="0.55" />
          </svg>

          <div className="relative flex flex-1 flex-col justify-end px-6 pb-8 pt-16 sm:px-7">
            <p className="mono-label mono-label--caps text-ink-muted">No Selection · 사업국 미선택</p>
            <p className="mt-4 max-w-[22ch] font-sans text-xl font-black leading-snug text-ink">
              좌측 도면에서 사업국을 선택하십시오
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink-muted">
              ← 지도 표식을 선택하면 수혜자 규모 · 수행 활동 · 상반기 진척률 · 현장 기록을
              이 도면에 펼쳐 표시합니다.
            </p>
          </div>
        </div>
      </PanelCard>
    )
  }

  const lev = leverageOf(project)
  const progress = project.progress || {}
  const hasFoodPct = typeof progress.foodPct === 'number'
  const hasCashPct = typeof progress.cashPct === 'number'
  const hasNutrition = typeof progress.nutritionKg === 'number' && progress.nutritionKg > 0
  const showProgress = hasFoodPct || hasCashPct || hasNutrition

  const cashIsNone = !project.cashValue
  const foodIsNone = !project.foodTons
  const levIsNone = lev == null

  return (
    <PanelCard>
      {/* keyed wrapper so content transitions once whenever the project changes */}
      <div key={project.id} className="flex flex-1 flex-col overflow-y-auto">
        {/* ── Header — ink plane, one of the few dark surfaces ─────────────── */}
        <div className="relative overflow-hidden border-b border-ink-line bg-ink-press px-5 pb-6 pt-5 text-paper sm:px-6">
          {/* corner ring bleeding off the dark header */}
          <svg
            className="ring-svg pointer-events-none absolute -right-10 -top-10 h-40 w-40"
            viewBox="0 0 160 160"
            aria-hidden="true"
          >
            <circle className="ring-stroke" cx="80" cy="80" r="66" strokeWidth="20" />
            <circle className="ring-disk" cx="80" cy="80" r="22" />
          </svg>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center text-paper/70 transition-colors hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange motion-reduce:transition-none"
          >
            <Icon name="X" className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Mono code chip (border only — retired the bg-ink/5 badge) */}
          <div className="relative flex items-center gap-2 pr-9">
            <span className="mono-label inline-flex items-center border border-paper/30 px-1.5 py-0.5 tracking-[0.08em] text-paper/80">
              {project.pbas}
            </span>
            {/* countryEn — Anton latin */}
            <span className="font-display text-[15px] leading-none tracking-wide text-paper/85">
              {project.countryEn}
            </span>
          </div>

          {/* country — Pretendard 900 (Korean never set in Anton) */}
          <h2 className="relative mt-3 font-sans text-3xl font-black leading-none text-paper">
            {project.country}
          </h2>
          <p className="relative mt-2.5 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-paper/65">
            <Icon name="MapPin" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {project.region}
          </p>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="px-5 py-6 sm:px-6">
          {/* — Lead figure: 총 수혜자, giant Anton with comma-only orange — */}
          <section>
            <p className="mono-label mono-label--caps text-ink-muted">Total Beneficiaries · 총 수혜자</p>
            <div className="mt-2 flex items-baseline gap-2">
              <CommaSplit
                value={project.beneficiaries}
                className="num-axis num-display inline-block w-fit pb-2 text-ink text-[clamp(52px,15vw,76px)]"
              />
              <span className="font-sans text-xl font-black text-ink">명</span>
            </div>
          </section>

          {/* — Trailing ledger: 식량 / 현금 / 레버리지, small + asymmetric — */}
          {/* color dots only (tinted icon chips retired); uneven gaps. */}
          <div className="mt-7 flex flex-wrap items-start gap-x-8 gap-y-5 border-t border-ink-line pt-5">
            <LedgerStat
              dot={ACTIVITY_META.food.color}
              label="배분 식량"
              labelEn="Food"
              value={tons(project.foodTons)}
              muted={foodIsNone}
            />
            <LedgerStat
              dot={ACTIVITY_META.cash.color}
              label="현금/교환권"
              labelEn="Cash & Voucher"
              value={krwThousandToWon(project.cashValue)}
              sub={cashIsNone ? null : krwThousandToUsd(project.cashValue)}
              muted={cashIsNone}
            />
            <LedgerStat
              dot={ACTIVITY_META.livelihood.color}
              label="예산 레버리지"
              labelEn="WV → WFP"
              value={multiple(lev)}
              muted={levIsNone}
            />
          </div>

          {/* — Activities: hairline indent + filled/empty color dot (no pills) — */}
          <section className="mt-8 border-t border-ink-line pt-5">
            <h3 className="mono-label mono-label--caps text-ink-muted">Interventions · 수행 활동</h3>
            <ul className="mt-3">
              {ACTIVITY_KEYS.map((key) => {
                const meta = ACTIVITY_META[key]
                if (!meta) return null
                const active = !!project.activities?.[key]
                return (
                  <li
                    key={key}
                    className="flex items-center gap-3 border-b border-ink-line py-2 last:border-b-0"
                  >
                    {/* color dot (active) vs hollow ring (inactive) */}
                    {active ? (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: meta.color }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full border border-ink-line"
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      name={meta.icon}
                      className={'h-4 w-4 shrink-0 ' + (active ? 'text-ink-soft' : 'text-ink-line')}
                      aria-hidden="true"
                    />
                    <span
                      className={
                        'font-sans text-sm ' +
                        (active ? 'font-semibold text-ink' : 'font-medium text-ink-muted/55')
                      }
                    >
                      {meta.label}
                    </span>
                    <span
                      className={
                        'mono-label ml-auto ' + (active ? 'text-wv-orange' : 'text-ink-line')
                      }
                    >
                      {active ? '●' : '○'}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* — Interim progress: bars retired → semicircle arc gauges — */}
          {showProgress && (
            <section className="mt-8 border-t border-ink-line pt-5">
              <h3 className="mono-label mono-label--caps text-ink-muted">
                Interim 2025 H1 · 상반기 진척률
              </h3>
              <div className="mt-4 space-y-5">
                {hasFoodPct && (
                  <ArcGauge
                    value={progress.foodPct}
                    label="식량 배분"
                    sub={
                      typeof progress.foodActualTons === 'number'
                        ? `실적 ${tons(progress.foodActualTons)} / 계획 ${tons(project.foodTons)}`
                        : undefined
                    }
                  />
                )}
                {hasCashPct && (
                  <ArcGauge
                    value={progress.cashPct}
                    label="현금 배분"
                    note={progress.cashPct > 100 ? '계획 초과' : null}
                  />
                )}
                {hasNutrition && (
                  <div className="flex items-baseline justify-between border-t border-ink-line pt-3">
                    <span className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: ACTIVITY_META.nutrition.color }}
                        aria-hidden="true"
                      />
                      영양 치료식
                    </span>
                    <span className="tnum font-display text-xl leading-none text-ink">
                      {kg(progress.nutritionKg).replace('kg', '')}
                      <span className="ml-1 font-sans text-xs font-bold text-ink-muted">kg</span>
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* — Note callout: gold pill retired → left gold 2px rule + Mono body — */}
          {project.note && (
            <div className="mt-8 border-l-2 border-gold pl-3.5">
              <p className="mono-label mono-label--caps text-ink-muted">Field Note · 비고</p>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-ink-soft">
                {project.note}
              </p>
            </div>
          )}

          {/* — Photos: delegated to PhotoGallery (props/call shape preserved) — */}
          <section className="mt-8 border-t border-ink-line pt-5">
            <h3 className="mono-label mono-label--caps text-ink-muted">Field Record · 현장 사진</h3>
            <div className="mt-3">
              <PhotoGallery
                photos={project.photos}
                projectName={`${project.country} ${project.region}`}
              />
            </div>
          </section>
        </div>
      </div>
    </PanelCard>
  )
}

// Comma-only orange split-span: "464,295" -> 464<o>,</o>295. The fill
// discipline is broken ONLY by the thousands commas turning orange.
function CommaSplit({ value, className = '' }) {
  const s = num(value)
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

// One quiet ledger entry — latin/numeral value sits big-ish, Korean + Mono
// label stay small. `muted` renders an honest "해당 없음" instead of a
// misleading zero. A small category color dot replaces the tinted icon chip.
function LedgerStat({ dot, label, labelEn, value, sub, muted = false }) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex items-center gap-1.5">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: muted ? '#D8D2C6' : dot }}
          aria-hidden="true"
        />
        <span className="font-sans text-xs font-semibold text-ink-soft">{label}</span>
      </div>
      {muted ? (
        <div className="mt-1.5 font-sans text-base font-bold text-ink-muted/60">해당 없음</div>
      ) : (
        <div className="tnum mt-1.5 font-sans text-lg font-black leading-tight text-ink">
          {value}
        </div>
      )}
      {sub ? <div className="tnum mono-label mt-0.5 text-ink-muted">{sub}</div> : null}
      <span className="mono-label mono-label--caps mt-1.5 text-ink-muted">{labelEn}</span>
    </div>
  )
}
