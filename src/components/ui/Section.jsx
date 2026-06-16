// Shared layout primitives — FIELD DISPATCH publication system.
// Paper-cream ground, ink hairlines, mono section codes. No eyebrow-orange-line formula.

// Deliberately uneven vertical rhythm — sections do NOT all share py-24.
const PY = {
  tight: 'py-14 md:py-16', // pressure (e.g. causes)
  normal: 'py-20 md:py-24',
  wide: 'py-24 md:py-32', // expanse (e.g. impact map)
}

export function Section({ id, children, className = '', dark = false, bleed = false, py = 'normal' }) {
  return (
    <section
      id={id}
      className={[
        PY[py] ?? PY.normal,
        dark ? 'bg-ink-press text-paper' : '',
        className,
      ].join(' ')}
    >
      {bleed ? children : <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>}
    </section>
  )
}

/**
 * SectionHeading — mono section code + heavy Korean title.
 * NO orange accent line, NO uppercase-tracked eyebrow pill.
 *
 * Props:
 *  - code:        IBM Plex Mono kicker, e.g. "02 / 05 — WHY" (replaces eyebrow). `eyebrow` aliases to it.
 *  - title:       Korean headline (Pretendard 900).
 *  - description: body paragraph.
 *  - align:       'left' | 'right' | 'center' — vary per section for asymmetry.
 *  - watermark:   optional faint Anton latin watermark behind the kicker.
 *  - dark:        on ink-press planes.
 */
export function SectionHeading({
  code,
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  watermark,
  className = '',
}) {
  const kicker = code ?? eyebrow
  const alignCls =
    align === 'center'
      ? 'mx-auto items-center text-center'
      : align === 'right'
        ? 'ml-auto items-end text-right'
        : 'items-start text-left'

  return (
    <header className={['relative flex max-w-3xl flex-col', alignCls, className].join(' ')}>
      {watermark && (
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none select-none font-display uppercase leading-[0.8]',
            'text-[clamp(48px,9vw,120px)]',
            dark ? 'text-paper/[0.06]' : 'text-ink/[0.05]',
          ].join(' ')}
        >
          {watermark}
        </span>
      )}
      {kicker && (
        <span
          className={[
            'mb-4 font-mono text-xs uppercase tracking-[0.18em]',
            dark ? 'text-wv-orange' : 'text-ink-muted',
          ].join(' ')}
        >
          {kicker}
        </span>
      )}
      <h2
        className={[
          'text-balance font-sans font-black leading-[1.14] tracking-[-0.02em]',
          'text-[clamp(28px,3.6vw,44px)]',
          dark ? 'text-paper' : 'text-ink',
        ].join(' ')}
      >
        {title}
      </h2>
      {description && (
        <p
          className={[
            'mt-5 max-w-2xl text-[17px] leading-[1.75]',
            dark ? 'text-paper/70' : 'text-ink-soft',
          ].join(' ')}
        >
          {description}
        </p>
      )}
    </header>
  )
}
