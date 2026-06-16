import { CAUSES } from '../data/content.js'
import { Icon } from '../lib/icons.jsx'
import { Section } from './ui/Section.jsx'

// ===========================================================================
// CausesSection — FIELD DISPATCH "ONE EPICENTER" diagram.
//
// The 3-uniform-card grid (borderTop band + tinted-circle icon + border-l-4
// indicator block + hover-lift + shadow) is fully dismantled. Instead the three
// causes read as ONE survey diagram: a single epicenter (the crisis origin)
// from which three 1px category-colored arcs spring at DIFFERENT radii. Each
// arc terminates in a node carrying the Korean title and a footnote-style
// indicator. Data arcs are allowed 1px here (unlike the heavy signature ring),
// because they encode 3 categories, not the WV instrument. The signature solid
// orange concentric ring still bleeds off the panel corner so the WV mark holds.
// ===========================================================================

// Diagram geometry. The epicenter sits lower-left; arcs sweep up-and-right at
// three distinct radii so they never read as a symmetric fan. Node positions
// are hand-tuned (손맛) — not evenly spaced on a circle.
const VB_W = 760
const VB_H = 560
const EPI = { x: 150, y: 392 } // epicenter (crisis origin) — lower-left

// Per-cause arc layout, keyed to data order: conflict / climate / economic.
// `r` = arc radius from the epicenter (deliberately DIFFERENT per cause so the
// three never read as a symmetric fan). `a0`/`a1` = sweep start/end angle in
// degrees (0deg = +x; we draw in SVG's y-down space, hence -sin). Each arc's END
// angle is tuned so the arc terminates exactly on its node — no elbow needed.
const ARCS = {
  conflict: { r: 249, a0: 4, a1: 76.1, align: 'left' },
  climate: { r: 390, a0: 2, a1: 44.2, align: 'left' },
  economic: { r: 530, a0: 1, a1: 22.4, align: 'right' },
}
const ORDER = ['conflict', 'climate', 'economic']

// Does a string contain Hangul? Anton (font-display) has NO Korean glyphs, so a
// Korean indicator value (e.g. "가뭄·홍수") must render in font-sans, while a
// latin/numeric one ("15 / 16", "< 50%") gets the giant Anton treatment.
const hasHangul = (s) => /[㄰-㆏가-힣]/.test(s)

// Polar (deg, y-down) -> cartesian point on the epicenter circle.
function pt(r, deg) {
  const rad = (deg * Math.PI) / 180
  return { x: EPI.x + r * Math.cos(rad), y: EPI.y - r * Math.sin(rad) }
}

// Build an SVG arc path (sweeping) plus the endpoint where the node connects.
function arcPath(r, a0, a1) {
  const p0 = pt(r, a0)
  const p1 = pt(r, a1)
  // a1 < a0 means we sweep counter-clockwise upward → SVG sweep-flag 0.
  const largeArc = Math.abs(a1 - a0) > 180 ? 1 : 0
  const sweep = a1 < a0 ? 0 : 1
  return { d: `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${p1.x} ${p1.y}`, end: p1 }
}

// The node where an arc terminates — a small solid category-color dot plus a
// faint tick ring. No tinted circle, no card; just the data-dot encoding.
function CauseNode({ color, node }) {
  return (
    <g>
      <circle cx={node.x} cy={node.y} r="9" fill="none" stroke={color} strokeWidth="1" />
      <circle cx={node.x} cy={node.y} r="3.5" fill={color} />
    </g>
  )
}

// HTML overlay label anchored to a node — placed via percentage so it tracks the
// SVG viewBox as the diagram scales. Korean = font-sans; latin/numerals =
// font-display/mono. Indicator carries a footnote-indexed superscript.
function NodeLabel({ cause, index, node, align }) {
  const { color } = cause
  const leftPct = (node.x / VB_W) * 100
  const topPct = (node.y / VB_H) * 100
  const justify = align === 'right' ? 'items-end text-right' : 'items-start text-left'
  const offset =
    align === 'right'
      ? { right: `${100 - leftPct}%`, top: `${topPct}%` }
      : { left: `${leftPct}%`, top: `${topPct}%` }

  // Label hangs just below its node dot (top nudged ~0.9rem down), growing into
  // the open lower canvas so it never clips the figure's top edge.
  return (
    <div
      className={`pointer-events-none absolute hidden max-w-[12rem] flex-col md:flex ${justify}`}
      style={{ ...offset, transform: 'translateY(0.9rem)' }}
    >
      {/* 1.5px line icon, single color, no tinted circle behind it */}
      <Icon
        name={cause.icon}
        className="mb-2 h-6 w-6"
        strokeWidth={1.5}
        style={{ color }}
        aria-hidden="true"
      />
      <span className="mono-label mono-label--caps" style={{ color }}>
        {cause.titleEn}
      </span>
      <span className="mt-1 font-sans text-[19px] font-black leading-tight text-ink md:text-[22px]">
        {cause.title}
      </span>
      {/* footnote-style indicator: figure value + superscript index. Korean
          values stay in font-sans (Anton has no Hangul); latin/numeric go Anton. */}
      <span className="mt-2 flex items-baseline gap-1.5">
        {hasHangul(cause.indicator.value) ? (
          <span className="font-sans text-[20px] font-black leading-none text-ink md:text-[22px]">
            {cause.indicator.value}
          </span>
        ) : (
          <span className="font-display text-[26px] leading-none text-ink md:text-[30px]">
            {cause.indicator.value}
          </span>
        )}
        <span className="footnote-idx" style={{ color }}>
          {index + 1}
        </span>
      </span>
    </div>
  )
}

export default function CausesSection() {
  const byKey = Object.fromEntries(CAUSES.map((c) => [c.key, c]))

  // Compute each cause's arc geometry once: the path string, the terminal node
  // point (where the label anchors), and its alignment. Single source of truth
  // shared by the in-SVG node dots and the HTML overlay labels.
  const legs = ORDER.map((key, i) => {
    const cfg = ARCS[key]
    const { d, end } = arcPath(cfg.r, cfg.a0, cfg.a1)
    return { key, cause: byKey[key], d, node: end, align: cfg.align, index: i }
  })

  // Signature solid-orange concentric ring — epicenter at the panel's lower-left,
  // bleeding off-frame. Heavy strokes (16–28px), innermost filled disk = origin.
  const sigRings = [
    { r: 30, w: 28 },
    { r: 78, w: 22 },
    { r: 132, w: 18 },
  ]

  return (
    <Section id="causes" py="tight">
      {/* ── Custom asymmetric header: giant Anton "WHY" watermark + mono code ── */}
      <div className="relative">
        {/* Anton latin watermark — sits behind, faint. Latin only (no Korean). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-0 select-none font-display uppercase leading-[0.8] text-ink/[0.05] text-[clamp(72px,16vw,200px)]"
        >
          WHY
        </span>

        <div className="relative max-w-2xl">
          <p className="mono-label mono-label--caps text-ink-muted">01 / 03 — WHY</p>
          <h2 className="mt-4 max-w-[18ch] text-balance font-sans font-black leading-[1.12] tracking-[-0.02em] text-ink text-[clamp(28px,3.6vw,44px)]">
            왜 세계는 아직도 굶주리나요?
          </h2>
          <p className="mt-5 max-w-xl font-sans text-[17px] leading-[1.75] text-ink-soft">
            식량위기는 한 가지 원인으로 일어나지 않습니다. 하나의 진앙에서{' '}
            <span className="font-sans font-bold text-ink">분쟁·기후·경제</span> 세 충격이
            서로 다른 궤적으로 퍼져 나가 맞물리고, 가장 취약한 사람들의 식탁을 가장 먼저
            비웁니다.
          </p>
        </div>
      </div>

      {/* ── ONE EPICENTER diagram ──────────────────────────────────────────── */}
      {/* A single origin; three 1px category arcs at different radii terminate in
          footnoted nodes. The heavy solid-orange signature ring bleeds the corner. */}
      <div className="relative mt-12 md:mt-16">
        {/* SIGNATURE ring — solid orange, heavy, bleeds off the lower-left corner */}
        <svg
          className="ring-svg pointer-events-none absolute bottom-0 left-0 h-[clamp(180px,24vw,320px)] w-[clamp(180px,24vw,320px)] -translate-x-[34%] translate-y-[34%]"
          viewBox="0 0 320 320"
          fill="none"
          aria-hidden="true"
        >
          {sigRings.map((ring) => (
            <circle
              key={ring.r}
              className="ring-stroke"
              cx="320"
              cy="320"
              r={ring.r}
              strokeWidth={ring.w}
            />
          ))}
        </svg>

        {/* The diagram itself — relative wrapper so HTML node-labels can anchor
            to the same coordinate space as the responsive SVG. */}
        <figure className="relative m-0">
          <svg
            className="block w-full"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            fill="none"
            role="img"
            aria-label="식량위기의 세 가지 원인 — 하나의 진앙에서 분쟁·기후·경제 충격이 서로 다른 궤적으로 퍼져 나가는 다이어그램"
          >
            {/* faint baseline rule under the epicenter — 1px ink hairline */}
            <line
              x1="0"
              y1={EPI.y}
              x2={VB_W}
              y2={EPI.y}
              stroke="#D8D2C6"
              strokeWidth="1"
              strokeDasharray="2 5"
            />

            {/* three category arcs, each a different radius from the epicenter */}
            {legs.map((leg) => (
              <g key={leg.key}>
                {/* the data arc — 1px allowed (category encoding, not the ring) */}
                <path d={leg.d} fill="none" stroke={leg.cause.color} strokeWidth="1" />
                <CauseNode color={leg.cause.color} node={leg.node} />
              </g>
            ))}

            {/* epicenter — small solid orange disk = the single crisis origin */}
            <circle className="ring-disk" cx={EPI.x} cy={EPI.y} r="7" />
            <circle
              cx={EPI.x}
              cy={EPI.y}
              r="15"
              fill="none"
              stroke="#F47920"
              strokeWidth="1.5"
            />
          </svg>

          {/* epicenter caption — mono field note, anchored to the origin */}
          <figcaption
            className="pointer-events-none absolute"
            style={{ left: `${(EPI.x / VB_W) * 100}%`, top: `${(EPI.y / VB_H) * 100}%`, transform: 'translate(-50%, 1.4rem)' }}
          >
            <span className="mono-label mono-label--caps whitespace-nowrap text-wv-orange">
              진앙 · EPICENTER
            </span>
          </figcaption>

          {/* HTML node labels overlaid on the SVG endpoints */}
          {legs.map((leg) => (
            <NodeLabel
              key={leg.key}
              cause={leg.cause}
              index={leg.index}
              node={leg.node}
              align={leg.align}
            />
          ))}
        </figure>
      </div>

      {/* ── Three summaries, DELIBERATELY uneven length, set as a dispatch ────
          conflict (long) / climate (short) / economic (medium). Hairline-ruled
          columns — no cards, no shadow, no hover lift. */}
      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink-line pt-10 md:mt-20 md:grid-cols-12">
        {/* conflict — long, takes the most width */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 shrink-0"
              style={{ backgroundColor: byKey.conflict.color }}
              aria-hidden="true"
            />
            <span className="mono-label mono-label--caps" style={{ color: byKey.conflict.color }}>
              {byKey.conflict.titleEn}
              <span className="footnote-idx" style={{ color: byKey.conflict.color }}>
                1
              </span>
            </span>
          </div>
          <h3 className="mt-3 font-sans text-xl font-black text-ink">{byKey.conflict.title}</h3>
          <p className="mt-3 font-sans text-[15px] leading-[1.75] text-ink-soft">
            {byKey.conflict.summary}
          </p>
        </div>

        {/* climate — short, sits narrow with breathing room */}
        <div className="md:col-span-3 md:pt-2">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 shrink-0"
              style={{ backgroundColor: byKey.climate.color }}
              aria-hidden="true"
            />
            <span className="mono-label mono-label--caps" style={{ color: byKey.climate.color }}>
              {byKey.climate.titleEn}
              <span className="footnote-idx" style={{ color: byKey.climate.color }}>
                2
              </span>
            </span>
          </div>
          <h3 className="mt-3 font-sans text-xl font-black text-ink">{byKey.climate.title}</h3>
          <p className="mt-3 font-sans text-[15px] leading-[1.75] text-ink-soft">
            {byKey.climate.summary}
          </p>
        </div>

        {/* economic — medium; pushed down a touch for uneven vertical rhythm */}
        <div className="md:col-span-4 md:pt-8">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 shrink-0"
              style={{ backgroundColor: byKey.economic.color }}
              aria-hidden="true"
            />
            <span className="mono-label mono-label--caps" style={{ color: byKey.economic.color }}>
              {byKey.economic.titleEn}
              <span className="footnote-idx" style={{ color: byKey.economic.color }}>
                3
              </span>
            </span>
          </div>
          <h3 className="mt-3 font-sans text-xl font-black text-ink">{byKey.economic.title}</h3>
          <p className="mt-3 font-sans text-[15px] leading-[1.75] text-ink-soft">
            {byKey.economic.summary}
          </p>
        </div>
      </div>

      {/* ── Footnote rail — source / basis date / mono, academic ──────────── */}
      <p className="mt-12 max-w-3xl border-t border-ink-line pt-5 font-mono text-[11px] leading-relaxed text-ink-muted">
        <span className="footnote-idx">1</span> 2025년 주요 식량위기국 16개국 중 15개국이 분쟁
        영향권. 출처: Hunger Hotspots (WFP &amp; FAO 2025). <span className="footnote-idx">2</span>{' '}
        가뭄·홍수 등 기후 충격이 흉작·농업 피해의 주된 동인. <span className="footnote-idx">3</span>{' '}
        자금 축소 시 배급량이 하루 권장 칼로리의 50% 미만까지 감축(기준: 제안서 2025.03 ·
        중간보고 2025.12).
      </p>
    </Section>
  )
}
