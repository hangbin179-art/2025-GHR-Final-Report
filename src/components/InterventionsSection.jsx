import { useState } from 'react'
import { INTERVENTIONS } from '../data/content.js'
import { Icon } from '../lib/icons.jsx'
import { Section, SectionHeading } from './ui/Section.jsx'

export default function InterventionsSection() {
  const [active, setActive] = useState(0)
  const current = INTERVENTIONS[active]
  const { color } = current

  return (
    <Section id="interventions">
      <SectionHeading
        eyebrow="WHAT · 핵심 사업 활동"
        title="식량위기에 대응하는 5대 핵심 활동"
        description="현장의 상황에 따라 가장 효과적인 방식을 조합합니다. 활동을 선택하면 세부 내용을 확인할 수 있습니다."
      />

      {/* Tab pills — keyboard accessible, scrollable on mobile */}
      <div
        role="tablist"
        aria-label="핵심 사업 활동"
        className="mt-10 flex flex-nowrap gap-2.5 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0"
      >
        {INTERVENTIONS.map((item, i) => {
          const selected = i === active
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              id={`intervention-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`intervention-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={[
                'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                selected
                  ? 'text-white shadow-card'
                  : 'border-black/10 bg-white text-ink-muted hover:border-black/20 hover:text-ink',
              ].join(' ')}
              style={
                selected
                  ? { backgroundColor: item.color, borderColor: item.color, outlineColor: item.color }
                  : { outlineColor: item.color }
              }
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div
        key={current.key}
        role="tabpanel"
        id={`intervention-panel-${current.key}`}
        aria-labelledby={`intervention-tab-${current.key}`}
        className="mt-6 grid animate-fade-in grid-cols-1 gap-8 rounded-xl2 border border-black/5 bg-white p-7 shadow-card md:grid-cols-5 md:p-10"
      >
        {/* Left: summary + bullets */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              <Icon name={current.icon} className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {current.labelEn}
              </p>
              <h3 className="text-xl font-extrabold text-ink">{current.label}</h3>
            </div>
          </div>

          <p className="mt-5 text-base leading-relaxed text-ink-soft">{current.summary}</p>

          <ul className="mt-6 space-y-3">
            {current.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}1A`, color }}
                >
                  <Icon name="Check" className="h-3.5 w-3.5" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: stat */}
        <div className="md:col-span-2">
          <div
            className="flex h-full flex-col justify-center rounded-xl2 p-7 text-center"
            style={{ backgroundColor: `${color}0D`, border: `1px solid ${color}26` }}
          >
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="tnum text-4xl font-extrabold leading-none md:text-5xl" style={{ color }}>
                {current.stat.value}
              </span>
              {current.stat.unit && (
                <span className="text-lg font-bold" style={{ color }}>
                  {current.stat.unit}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-snug text-ink-muted">{current.stat.label}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
