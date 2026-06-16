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

// Outer card shell — shared by empty + filled states so layout never jumps.
function PanelCard({ children }) {
  return (
    <div className="flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-xl2 bg-white shadow-card">
      {children}
    </div>
  )
}

// One KPI badge. When `muted`, render a subtle "해당 없음" treatment instead of
// a misleading zero.
function KpiBadge({ icon, color, label, value, sub, muted = false }) {
  if (muted) {
    return (
      <div className="rounded-xl border border-black/5 bg-canvas/60 p-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          <Icon name={icon} className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          {label}
        </div>
        <div className="mt-1.5 text-sm font-semibold text-ink-muted/70">해당 없음</div>
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-black/5 bg-white p-3 shadow-card">
      <div className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
        <span
          className="flex h-5 w-5 items-center justify-center rounded-md"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <Icon name={icon} className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        {label}
      </div>
      <div className="tnum mt-1.5 text-lg font-extrabold leading-tight text-ink">{value}</div>
      {sub ? <div className="tnum mt-0.5 text-xs text-ink-muted">{sub}</div> : null}
    </div>
  )
}

// One progress bar row. Visual width capped at 100%, label shows true %.
function ProgressRow({ label, value, color, actualLabel }) {
  const safe = typeof value === 'number' && !Number.isNaN(value) ? value : 0
  const width = Math.min(Math.max(safe, 0), 100)
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-ink-soft">{label}</span>
        <span className="tnum font-semibold" style={{ color }}>
          {pct(value)}
        </span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
      {actualLabel ? <div className="tnum mt-0.5 text-[11px] text-ink-muted">{actualLabel}</div> : null}
    </div>
  )
}

export default function DetailPanel({ project, onClose }) {
  // ---- EMPTY STATE --------------------------------------------------------
  if (!project) {
    return (
      <PanelCard>
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-wv-orange-light text-wv-orange">
            <Icon name="MapPin" className="h-8 w-8" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-lg font-extrabold text-ink">지도에서 사업 지역을 선택하세요</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            지도 위의 표식을 클릭하면 해당 사업의 수혜자 규모, 수행 활동, 상반기 진척률과
            현장 사진을 한눈에 확인할 수 있습니다.
          </p>
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

  return (
    <PanelCard>
      {/* keyed wrapper so the content re-animates whenever the project changes */}
      <div
        key={project.id}
        className="animate-slide-in flex flex-1 flex-col overflow-y-auto"
      >
        {/* Header */}
        <div className="relative border-b border-black/5 px-5 pb-4 pt-5 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition hover:bg-canvas hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange"
          >
            <Icon name="X" className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2 pr-8">
            <span className="inline-flex items-center rounded-md bg-ink/5 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink-soft">
              {project.pbas}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              {project.countryEn}
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl font-extrabold leading-tight text-ink">
            {project.country}
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-ink-muted">
            <Icon name="MapPin" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {project.region}
          </p>
        </div>

        {/* Body */}
        <div className="space-y-6 px-5 py-5 sm:px-6">
          {/* KPI badges */}
          <div className="grid grid-cols-2 gap-3">
            <KpiBadge
              icon="Users"
              color="#2D6CB6"
              label="총 수혜자"
              value={`${num(project.beneficiaries)}명`}
            />
            <KpiBadge
              icon="Package"
              color="#F47920"
              label="배분 식량"
              value={tons(project.foodTons)}
              muted={foodIsNone}
            />
            <KpiBadge
              icon="Wallet"
              color="#0E7C7B"
              label="현금/교환권"
              value={krwThousandToWon(project.cashValue)}
              sub={krwThousandToUsd(project.cashValue)}
              muted={cashIsNone}
            />
            <KpiBadge
              icon="TrendingUp"
              color="#3F8F5B"
              label="예산 레버리지"
              value={multiple(lev)}
              sub="월드비전 → WFP"
              muted={lev == null}
            />
          </div>

          {/* Activities */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              수행 활동
            </h3>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {ACTIVITY_KEYS.map((key) => {
                const meta = ACTIVITY_META[key]
                if (!meta) return null
                const active = !!project.activities?.[key]
                return (
                  <li key={key}>
                    {active ? (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                        style={{
                          backgroundColor: `${meta.color}14`,
                          borderColor: `${meta.color}40`,
                          color: meta.color,
                        }}
                      >
                        <Icon name={meta.icon} className="h-3.5 w-3.5" aria-hidden="true" />
                        {meta.label}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink-muted/25 px-3 py-1.5 text-xs font-medium text-ink-muted/45">
                        <Icon name={meta.icon} className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                        {meta.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Interim progress */}
          {showProgress && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                상반기 진척률
              </h3>
              <div className="mt-3 space-y-3.5">
                {hasFoodPct && (
                  <ProgressRow
                    label="식량 배분"
                    value={progress.foodPct}
                    color={ACTIVITY_META.food.color}
                    actualLabel={
                      typeof progress.foodActualTons === 'number'
                        ? `실적 ${tons(progress.foodActualTons)} / 계획 ${tons(project.foodTons)}`
                        : undefined
                    }
                  />
                )}
                {hasCashPct && (
                  <ProgressRow
                    label="현금 배분"
                    value={progress.cashPct}
                    color={ACTIVITY_META.cash.color}
                  />
                )}
                {hasNutrition && (
                  <div className="flex items-center justify-between rounded-xl bg-canvas px-3 py-2.5">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: `${ACTIVITY_META.nutrition.color}1A`,
                          color: ACTIVITY_META.nutrition.color,
                        }}
                      >
                        <Icon name={ACTIVITY_META.nutrition.icon} className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      영양 치료식
                    </span>
                    <span className="tnum text-sm font-bold text-ink">{kg(progress.nutritionKg)}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Note callout */}
          {project.note && (
            <div className="flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3.5 py-3">
              <Icon name="Info" className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-ink-soft">{project.note}</p>
            </div>
          )}

          {/* Photos */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              사업 현장 사진
            </h3>
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
