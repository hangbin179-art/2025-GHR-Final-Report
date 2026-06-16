// Shared layout primitives so every section shares the same rhythm & container.

export function Section({ id, children, className = '', dark = false, bleed = false }) {
  return (
    <section
      id={id}
      className={[
        'py-16 md:py-24',
        dark ? 'bg-ink text-white' : '',
        className,
      ].join(' ')}
    >
      {bleed ? children : <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>}
    </section>
  )
}

export function SectionHeading({ eyebrow, title, description, align = 'left', dark = false }) {
  const center = align === 'center'
  return (
    <header className={['max-w-3xl', center ? 'mx-auto text-center' : ''].join(' ')}>
      {eyebrow && (
        <div className={['mb-3 flex items-center gap-2.5', center ? 'justify-center' : ''].join(' ')}>
          <span className="h-[2px] w-8 shrink-0 bg-wv-orange" aria-hidden="true" />
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-wv-orange">
            {eyebrow}
          </p>
        </div>
      )}
      <h2
        className={[
          'text-balance text-3xl font-extrabold leading-tight md:text-4xl',
          dark ? 'text-white' : 'text-ink',
        ].join(' ')}
      >
        {title}
      </h2>
      {description && (
        <p
          className={[
            'mt-4 text-base leading-relaxed md:text-lg',
            dark ? 'text-white/70' : 'text-ink-muted',
          ].join(' ')}
        >
          {description}
        </p>
      )}
    </header>
  )
}
