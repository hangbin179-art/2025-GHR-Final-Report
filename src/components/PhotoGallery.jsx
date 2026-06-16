import { useEffect, useState } from 'react'
import { Icon } from '../lib/icons.jsx'

// Normalize incoming items: accept either a string (URL/path) or { src, caption }.
function normalize(photos) {
  if (!Array.isArray(photos)) return []
  return photos
    .map((p) => {
      if (typeof p === 'string') return { src: p, caption: '' }
      if (p && typeof p === 'object' && p.src) return { src: p.src, caption: p.caption || '' }
      return null
    })
    .filter(Boolean)
}

// Signature: a single solid orange concentric ring (filled disk + one heavy
// stroke), knife-cut off the frame's top-right corner. Reused by the empty
// "archive pending" state and overlaid on real photos (photo × ring = "신호의 진원지").
// `dim` softens it for the empty state so type stays legible; full strength
// when masking a photographic plate.
function CornerRing({ dim = false }) {
  return (
    <svg
      className="ring-svg pointer-events-none absolute -right-12 -top-12 h-44 w-44"
      viewBox="0 0 176 176"
      aria-hidden="true"
    >
      <circle
        className="ring-stroke"
        cx="88"
        cy="88"
        r="74"
        strokeWidth="22"
        opacity={dim ? 0.55 : 1}
      />
      <circle className="ring-disk" cx="88" cy="88" r="24" opacity={dim ? 0.6 : 1} />
    </svg>
  )
}

// Graceful image-load fallback — a square ink-line plate (no dashed tile, no
// rounded card). Keeps the 16:10 footprint so layout never jumps.
function ImageFallback({ className = '', label = '이미지를 불러올 수 없습니다' }) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center gap-2 border border-ink-line bg-paper-sub text-ink-muted ' +
        className
      }
    >
      <Icon name="ImageIcon" className="h-7 w-7 opacity-40" aria-hidden="true" />
      <span className="mono-label text-ink-muted">{label}</span>
    </div>
  )
}

export default function PhotoGallery({ photos = [], projectName = '' }) {
  const items = normalize(photos)
  const [active, setActive] = useState(0)
  const [errored, setErrored] = useState({})

  // Reset to first slide whenever the photo set changes (e.g. project switch).
  useEffect(() => {
    setActive(0)
    setErrored({})
  }, [photos])

  // ---- EMPTY STATE: "아카이브 대기" — incompleteness as a design asset --------
  if (items.length === 0) {
    return (
      <figure className="m-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-ink-line bg-paper-sub">
          {/* one solid orange concentric ring, bleeding off the corner */}
          <CornerRing dim />

          {/* caption-style label, set like a field note */}
          <div className="absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-5">
            <span className="mono-label mono-label--caps text-ink-muted">현장 기록</span>
            <span className="num-display mt-1 text-[clamp(28px,7vw,44px)] leading-none text-ink">
              ARCHIVE
              <br />
              PENDING
            </span>
          </div>
        </div>
        <figcaption className="mt-2 border-t border-ink-line pt-2">
          <span className="mono-label text-ink-muted">
            ARCHIVE PENDING
            <span className="px-1.5 text-ink-line">/</span>
            <span className="font-sans">2026 결과보고 시 교체 예정</span>
          </span>
        </figcaption>
      </figure>
    )
  }

  // ---- SLIDER -------------------------------------------------------------
  const count = items.length
  const safeActive = active % count
  const current = items[safeActive] || items[0]
  const go = (delta) => setActive((i) => (i + delta + count) % count)
  const markErrored = (idx) => setErrored((e) => ({ ...e, [idx]: true }))
  const altFor = (idx) =>
    items[idx].caption || (projectName ? `${projectName} 현장 사진 ${idx + 1}` : `현장 사진 ${idx + 1}`)

  // Keyboard: left/right arrows step through the set when the frame is focused.
  const onKeyDown = (e) => {
    if (count < 2) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  return (
    <figure className="m-0">
      {/* Active plate — square frame, full-bleed image, ring overlap mask */}
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden border border-ink-line bg-paper-sub focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange"
        role={count > 1 ? 'group' : undefined}
        aria-label={count > 1 ? `현장 사진 ${safeActive + 1} / ${count}` : undefined}
        tabIndex={count > 1 ? 0 : undefined}
        onKeyDown={onKeyDown}
      >
        {errored[safeActive] ? (
          <ImageFallback className="h-full w-full" />
        ) : (
          <img
            src={current.src}
            alt={altFor(safeActive)}
            loading="lazy"
            onError={() => markErrored(safeActive)}
            className="h-full w-full object-cover"
          />
        )}

        {/* photo × ring: solid orange arc slightly overlapping the plate */}
        <CornerRing />

        {/* index — Mono "n / total", no pill background */}
        {count > 1 && (
          <span className="mono-label tnum absolute left-3 top-3 bg-ink-press/85 px-2 py-1 text-paper">
            <span className="font-display">{safeActive + 1}</span>
            <span className="px-1 text-paper/55">/</span>
            <span className="font-display">{count}</span>
          </span>
        )}

        {/* edge nav — Mono PREV / NEXT caps on hover, no round/shadow buttons */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="이전 사진"
              className="group/nav absolute inset-y-0 left-0 flex w-1/4 items-center justify-start pl-3 focus:outline-none"
            >
              <span className="mono-label mono-label--caps bg-ink-press/85 px-2 py-1 text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-90 group-focus-within:opacity-90 group-hover/nav:opacity-100 motion-reduce:transition-none">
                {'◂ PREV'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="다음 사진"
              className="group/nav absolute inset-y-0 right-0 flex w-1/4 items-center justify-end pr-3 focus:outline-none"
            >
              <span className="mono-label mono-label--caps bg-ink-press/85 px-2 py-1 text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-90 group-focus-within:opacity-90 group-hover/nav:opacity-100 motion-reduce:transition-none">
                {'NEXT ▸'}
              </span>
            </button>
          </>
        )}
      </div>

      {/* Caption bar — Mono field note under the plate */}
      <figcaption className="mt-2 flex min-h-[1.25rem] items-start gap-2 border-t border-ink-line pt-2">
        <span className="mono-label mono-label--caps shrink-0 text-wv-orange">FIG</span>
        <span className="mono-label truncate font-sans text-ink-soft">
          {current.caption || projectName || '현장 사진'}
        </span>
      </figcaption>

      {/* Thumbnails — square plates, 1px orange active edge, no rounded/shadow */}
      {count > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, idx) => {
            const isActive = idx === safeActive
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`${idx + 1}번 사진 보기`}
                aria-current={isActive ? 'true' : undefined}
                className={
                  'relative h-14 w-20 overflow-hidden border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange motion-reduce:transition-none ' +
                  (isActive
                    ? 'border-wv-orange'
                    : 'border-ink-line opacity-60 hover:opacity-100')
                }
              >
                {errored[idx] ? (
                  <span className="flex h-full w-full items-center justify-center bg-paper-sub text-ink-muted">
                    <Icon name="ImageIcon" className="h-4 w-4 opacity-40" aria-hidden="true" />
                  </span>
                ) : (
                  <img
                    src={item.src}
                    alt={altFor(idx)}
                    loading="lazy"
                    onError={() => markErrored(idx)}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </figure>
  )
}
