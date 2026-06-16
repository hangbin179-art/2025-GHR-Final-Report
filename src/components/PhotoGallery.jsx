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

// A single dashed placeholder tile — used both for the empty state grid and as
// the graceful fallback when a real image fails to load.
function PlaceholderTile({ className = '', label = '현장 사진 추가 예정' }) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-muted/25 bg-canvas text-ink-muted ' +
        className
      }
    >
      <Icon name="ImageIcon" className="h-8 w-8 opacity-50" aria-hidden="true" />
      <span className="text-xs font-medium text-ink-muted/90">{label}</span>
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

  // ---- EMPTY STATE: tasteful placeholder grid -----------------------------
  if (items.length === 0) {
    return (
      <div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PlaceholderTile key={i} className="aspect-[4/3]" />
          ))}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-ink-muted">
          <Icon name="Camera" className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>
            사진은 데이터의 <code className="rounded bg-canvas px-1 py-0.5 font-mono text-[11px] text-ink-soft">photos: []</code> 배열에 경로를 추가하면 자동 표시됩니다.
          </span>
        </p>
      </div>
    )
  }

  // ---- SLIDER -------------------------------------------------------------
  const count = items.length
  const current = items[active] || items[0]
  const go = (delta) => setActive((i) => (i + delta + count) % count)
  const markErrored = (idx) => setErrored((e) => ({ ...e, [idx]: true }))
  const altFor = (idx) =>
    items[idx].caption || (projectName ? `${projectName} 현장 사진 ${idx + 1}` : `현장 사진 ${idx + 1}`)

  return (
    <div>
      {/* Large active image */}
      <div className="group relative overflow-hidden rounded-xl bg-canvas">
        <div className="aspect-[16/10] w-full">
          {errored[active] ? (
            <PlaceholderTile className="h-full w-full" label="이미지를 불러올 수 없습니다" />
          ) : (
            <img
              src={current.src}
              alt={altFor(active)}
              loading="lazy"
              onError={() => markErrored(active)}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="이전 사진"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-card backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange"
            >
              <Icon name="ChevronLeft" className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="다음 사진"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-card backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange"
            >
              <Icon name="ChevronRight" className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* index pill */}
            <span className="tnum absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Caption bar */}
      <div className="mt-2 flex min-h-[1.25rem] items-center gap-1.5 text-xs text-ink-soft">
        <Icon name="Camera" className="h-3.5 w-3.5 shrink-0 text-ink-muted" aria-hidden="true" />
        <span className="truncate">{current.caption || projectName || '현장 사진'}</span>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, idx) => {
            const isActive = idx === active
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`${idx + 1}번 사진 보기`}
                aria-current={isActive ? 'true' : undefined}
                className={
                  'relative h-14 w-20 overflow-hidden rounded-lg border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange ' +
                  (isActive
                    ? 'border-wv-orange'
                    : 'border-transparent opacity-70 hover:opacity-100')
                }
              >
                {errored[idx] ? (
                  <span className="flex h-full w-full items-center justify-center bg-canvas text-ink-muted">
                    <Icon name="ImageIcon" className="h-4 w-4 opacity-50" aria-hidden="true" />
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
    </div>
  )
}
