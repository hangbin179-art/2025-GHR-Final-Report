import { useRef, useState } from 'react'
import { INTERVENTIONS } from '../data/content.js'
import { Icon } from '../lib/icons.jsx'
import { Section, SectionHeading } from './ui/Section.jsx'

// A stat value is "latin" (Anton-safe) only when it has NO Hangul. Anton has no
// Korean glyphs, so Korean stat values (e.g. "효율 + 효과", "자립") MUST render in
// font-sans. Numeric/latin values ("2,100", "+9%", "SAM · MAM") go in .num-display.
const HANGUL = /[ㄱ-힝]/

// Comma-only orange split-span — breaks the fill discipline ONLY on the
// thousands commas (e.g. "2,100" -> 2<o>,</o>100). Mirrors Hero.jsx.
function CommaSplit({ value }) {
  const parts = String(value).split(',')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="text-wv-orange">,</span>}
          {part}
        </span>
      ))}
    </>
  )
}

// The detail stat. Latin/numeral values become a giant Anton figure on bare
// paper (no tinted box) sitting over a 1px quarter-arc in the activity's own
// data color. Korean values stay in heavy Pretendard so glyphs don't break.
function DetailStat({ stat, color }) {
  const isLatin = !HANGUL.test(stat.value)
  return (
    <div className="relative">
      {/* activity-color 1px quarter arc — data encoding, NOT the orange signature ring.
          Thin 1.5px stroke, knife-cut off the top-right, sweeping a quarter turn. */}
      <svg
        className="ring-svg pointer-events-none absolute -right-6 -top-10 h-56 w-56 md:-right-10 md:h-72 md:w-72"
        viewBox="0 0 240 240"
        fill="none"
        aria-hidden="true"
      >
        {/* outer quarter arc (top-right quadrant) */}
        <path
          d="M 240 120 A 120 120 0 0 0 120 0"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        {/* inner quarter arc + a single colour dot at the radius — quiet survey ticks */}
        <path
          d="M 240 168 A 72 72 0 0 0 168 96"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.65"
        />
        <circle cx="170" cy="70" r="3" fill={color} />
      </svg>

      <p className="mono-label mono-label--caps relative text-ink-muted">측정값 · Metric</p>

      {isLatin ? (
        <div className="num-axis relative mt-4 inline-block w-fit pb-2">
          <span className="num-display block leading-[0.86] text-ink text-[clamp(72px,15vw,148px)]">
            <CommaSplit value={stat.value} />
          </span>
        </div>
      ) : (
        // Korean stat: heavy Pretendard, two-pole loud end (no Anton — no glyphs).
        <p className="num-axis relative mt-4 inline-block w-fit pb-2 font-sans font-black leading-[1.04] tracking-[-0.03em] text-ink text-[clamp(40px,7vw,72px)]">
          {stat.value}
        </p>
      )}

      <div className="relative mt-5 flex items-baseline gap-2.5">
        {stat.unit && (
          <span className="font-display leading-none text-ink text-[clamp(22px,3vw,32px)]">
            {stat.unit}
          </span>
        )}
        <span className="max-w-[26ch] font-sans text-[15px] leading-snug text-ink-soft">
          {stat.label}
        </span>
      </div>
    </div>
  )
}

export default function InterventionsSection() {
  const [active, setActive] = useState(0)
  const current = INTERVENTIONS[active]
  const { color } = current
  const tabRefs = useRef([])

  // Roving-tabindex keyboard model for a vertical tablist (WAI-ARIA APG):
  // Up/Down move + select, Home/End jump to ends, focus follows selection.
  const onKeyDown = (e) => {
    const last = INTERVENTIONS.length - 1
    let next = null
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = active === last ? 0 : active + 1
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        next = active === 0 ? last : active - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="interventions">
      <SectionHeading
        code="02 / 03 — WHAT"
        watermark="ACTIONS"
        title="식량위기에 대응하는 5대 핵심 활동"
        description="현장의 상황에 따라 가장 효과적인 방식을 조합합니다. 왼쪽 목록에서 활동을 선택하면 세부 내용을 확인할 수 있습니다."
      />

      {/* Asymmetric split: a left index rail (5/12) + a wide detail column (7/12).
          NOT an even 3/2 grid, NOT rounded pill tabs. */}
      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
        {/* ── LEFT: vertical 01–05 index. Selected row = bold ink + orange rule;
            the rest sit quiet in ink-muted. This IS the tablist. ──────────── */}
        <div className="md:col-span-5">
          <p className="mono-label mono-label--caps mb-5 text-ink-muted">
            Activities · 01—05
          </p>
          <ul
            role="tablist"
            aria-orientation="vertical"
            aria-label="핵심 사업 활동"
            className="flex flex-col"
          >
            {INTERVENTIONS.map((item, i) => {
              const selected = i === active
              return (
                <li key={item.key} role="presentation" className="border-t border-ink-line last:border-b">
                  <button
                    type="button"
                    role="tab"
                    ref={(el) => (tabRefs.current[i] = el)}
                    id={`intervention-tab-${item.key}`}
                    aria-selected={selected}
                    aria-controls={`intervention-panel-${item.key}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    className="group flex w-full items-baseline gap-4 py-5 text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wv-orange md:gap-5"
                  >
                    {/* Anton index numeral — loud when selected, faint when not */}
                    <span
                      className={[
                        'num-display shrink-0 leading-none text-[clamp(28px,4vw,40px)] transition-colors duration-200 motion-reduce:transition-none',
                        selected ? 'text-ink' : 'text-ink-line group-hover:text-ink-muted',
                      ].join(' ')}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      {/* Korean activity name — font-sans always. Selected = black +
                          orange underline; unselected = muted, no underline. */}
                      <span
                        className={[
                          'block font-sans leading-snug tracking-[-0.01em] transition-colors duration-200 text-[clamp(18px,2.2vw,22px)] motion-reduce:transition-none',
                          selected
                            ? 'font-black text-ink underline decoration-wv-orange decoration-[3px] underline-offset-[6px]'
                            : 'font-bold text-ink-muted group-hover:text-ink-soft',
                        ].join(' ')}
                      >
                        {item.label}
                      </span>
                      {/* Latin label — mono caps, the quiet pole */}
                      <span
                        className={[
                          'mono-label mono-label--caps mt-1.5 block transition-colors duration-200 motion-reduce:transition-none',
                          selected ? 'text-ink-soft' : 'text-ink-muted',
                        ].join(' ')}
                      >
                        {item.labelEn}
                      </span>
                    </span>

                    {/* tiny activity-color dot marking the selected row, far right */}
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full transition-opacity duration-200 motion-reduce:transition-none"
                      style={{
                        backgroundColor: item.color,
                        opacity: selected ? 1 : 0,
                      }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ── RIGHT: detail panel. Giant stat on bare paper + activity arc;
            summary; em-dash bullets. Number crossfades on switch (key). ──── */}
        <div className="relative overflow-hidden md:col-span-7 md:pl-10 md:border-l md:border-ink-line">
          <div
            key={current.key}
            role="tabpanel"
            id={`intervention-panel-${current.key}`}
            aria-labelledby={`intervention-tab-${current.key}`}
            tabIndex={0}
            className="ix-panel focus:outline-none"
          >
            {/* Big stat — single, on paper, no tinted box */}
            <DetailStat stat={current.stat} color={color} />

            {/* Summary — body, generous measure */}
            <p className="relative mt-12 max-w-xl font-sans text-[17px] leading-[1.8] text-ink-soft">
              {current.summary}
            </p>

            {/* Bullets — orange em-dash + hairline indent, NO tinted check circles.
                A small activity-color dot precedes the em-dash as a data tick. */}
            <ul className="mt-8 max-w-xl border-t border-ink-line">
              {current.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 border-b border-ink-line py-4 font-sans text-[15px] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span aria-hidden="true" className="shrink-0 font-display text-wv-orange leading-none">
                    —
                  </span>
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>

            {/* Footnote — source / basis date, mono, academic */}
            <p className="mt-8 max-w-xl border-t border-ink-line pt-4 font-mono text-[11px] leading-relaxed text-ink-muted">
              <span className="footnote-idx">{active + 1}</span> 활동 기준·수치는 사업 설계
              기준값입니다. 출처: 2025 글로벌 식량위기 대응사업(WFP &amp; FAO 2025)
              제안서(2025.03) · 중간보고서(2025.12).
            </p>
          </div>
        </div>
      </div>

      {/* Number/arc crossfade on tab switch (1 transition only; honors reduced motion). */}
      <style>{`
        .ix-panel { animation: ix-cross 0.45s ease-out both; }
        @keyframes ix-cross {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ix-panel { animation: none; }
        }
      `}</style>
    </Section>
  )
}
