import { CAUSES } from '../data/content.js'
import { Icon } from '../lib/icons.jsx'
import { Section, SectionHeading } from './ui/Section.jsx'

function CauseCard({ cause }) {
  const { color } = cause
  return (
    <article
      className="group flex h-full flex-col rounded-xl2 border border-black/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
      style={{ borderTop: `3px solid ${color}` }}
    >
      {/* Icon in a tinted circle */}
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1A`, color }}
      >
        <Icon name={cause.icon} className="h-7 w-7" />
      </span>

      {/* English label + Korean title */}
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {cause.titleEn}
      </p>
      <h3 className="mt-1.5 text-xl font-extrabold text-ink">{cause.title}</h3>

      {/* Summary */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{cause.summary}</p>

      {/* Prominent indicator block */}
      <div
        className="mt-6 rounded-xl border-l-4 bg-canvas px-4 py-3"
        style={{ borderColor: color }}
      >
        <div className="tnum text-2xl font-extrabold leading-none" style={{ color }}>
          {cause.indicator.value}
        </div>
        <div className="mt-1.5 text-xs leading-snug text-ink-muted">
          {cause.indicator.label}
        </div>
      </div>
    </article>
  )
}

export default function CausesSection() {
  return (
    <Section id="causes" className="bg-canvas">
      <SectionHeading
        eyebrow="WHY · 식량위기의 원인"
        title="왜 세계는 아직도 굶주리나요?"
        description="식량위기는 한 가지 원인으로 일어나지 않습니다. 분쟁, 기후변화, 경제적 충격이라는 세 가지 요인이 서로 맞물려 악순환을 만들고, 가장 취약한 사람들의 식탁을 가장 먼저 비웁니다."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {CAUSES.map((cause) => (
          <CauseCard key={cause.key} cause={cause} />
        ))}
      </div>
    </Section>
  )
}
