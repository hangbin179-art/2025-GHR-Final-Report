import { useState, useEffect } from 'react'
import useIsMobile from '../lib/useIsMobile.js'

/* 활동별 색상 토큰 */
const ORANGE = 'var(--orange)'
const AMBER = '#C77E0A'
const GREEN = '#2F7D4F'
const RED = '#C8102E'
const TEAL = '#0E7C7B'

/*
 * 사진 교체 방법:
 *   public/gallery/ 폴더에 사진을 넣고 각 슬라이드의 src에 '/gallery/파일명.jpg' 를 기입하세요.
 *   src 가 null 이면 자리표시자(placeholder)가 표시됩니다.
 */
const SLIDES = [
  { pbas: '223847', country: '콩고민주공화국',     site: '남부 키부',        activity: '일반식량 배분',      color: ORANGE, src: '/gallery/drc-southkivu.jpg' },
  { pbas: '223711', country: '수단',               site: '남다르푸르',       activity: '통합 식량지원',      color: ORANGE, src: null },
  { pbas: '223255', country: '아프가니스탄',       site: '고르·바드기스',    activity: '식량 배분',          color: ORANGE, src: '/gallery/afghanistan-ghor.jpg' },
  { pbas: '223707', country: '에티오피아',         site: '티그라이·아파르',  activity: '영양 치료식',        color: RED,    src: '/gallery/ethiopia-tigray.jpg' },
  { pbas: '223766', country: '우간다',             site: '비디비디·로불레',  activity: '일반식량 배분',      color: ORANGE, src: null },
  { pbas: '223806', country: '베네수엘라',         site: '줄리아·팔콘',      activity: '학교 급식',          color: AMBER,  src: null },
  { pbas: '223753', country: '남수단',             site: '주바·얌비오',      activity: '학교 텃밭 · 급식',   color: AMBER,  src: null },
  { pbas: '223850', country: '차드',               site: '파르샤나 외',      activity: '긴급 학교급식',      color: AMBER,  src: null },
  { pbas: '223748', country: '방글라데시',         site: '콕스바자르',       activity: '현금 · 바우처',      color: TEAL,   src: '/gallery/bangladesh-coxsbazar.jpg' },
  { pbas: '223799', country: '콜롬비아',           site: '바예델카우카',     activity: '현금 · 바우처',      color: TEAL,   src: null },
  { pbas: '223999', country: '중앙아프리카공화국', site: '부아르·방가수',    activity: '생계 역량 강화 및 자산 조성 기회 제공', color: GREEN,  src: null },
  { pbas: '223982', country: '미얀마',             site: '북부 샨',          activity: '긴급 현금 지원',     color: TEAL,   src: null },
  { pbas: '223864', country: '케냐',               site: '마쿠에니·키투이',  activity: '생계 역량 강화',     color: GREEN,  src: null },
]

function Arrow({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'prev' ? 'rotate(180deg)' : 'none' }}>
      <path d="M9 6 L15 12 L9 18" />
    </svg>
  )
}

function Slide({ s, onOpen }) {
  return (
    <div onClick={s.src ? () => onOpen(s) : undefined} style={{ flex: '0 0 100%', position: 'relative', aspectRatio: '16/9', background: 'var(--field-50)', cursor: s.src ? 'zoom-in' : 'default' }}>
      {s.src ? (
        <img src={s.src} alt={`${s.country} ${s.site}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--field-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: 0 }}>
            Photo Placeholder
          </p>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-500)', margin: 0 }}>
            추후 현장 사진으로 교체 예정
          </p>
        </div>
      )}

      {/* 확대 힌트 아이콘 */}
      {s.src && (
        <div style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: 'rgba(17,18,34,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
        </div>
      )}

      {/* Caption overlay */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        padding: '40px 28px 24px',
        background: s.src ? 'linear-gradient(to top, rgba(17,18,34,0.78), rgba(17,18,34,0))' : 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <div>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-en)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            background: s.color,
            padding: '3px 8px',
            borderRadius: 4,
            marginBottom: 10,
          }}>
            {s.activity}
          </span>
          <p lang="ko" style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 700,
            fontSize: 22,
            color: s.src ? '#fff' : 'var(--midnight)',
            margin: 0,
            lineHeight: 1.2,
            textShadow: s.src ? '0 1px 8px rgba(0,0,0,0.4)' : 'none',
          }}>
            {s.country} · {s.site}
          </p>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ s, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(8,9,18,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, cursor: 'zoom-out',
    }}>
      <button aria-label="닫기" onClick={onClose} style={{
        position: 'absolute', top: 20, right: 20, width: 46, height: 46, borderRadius: '50%',
        background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)',
        color: '#fff', fontSize: 20, lineHeight: 1, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>✕</button>
      <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}>
        <img src={s.src} alt={`${s.country} ${s.site}`} style={{
          maxWidth: '92vw', maxHeight: '80vh', objectFit: 'contain',
          borderRadius: 8, boxShadow: '0 16px 50px rgba(0,0,0,0.55)',
        }} />
        <figcaption style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', background: s.color, padding: '3px 8px', borderRadius: 4, marginBottom: 8 }}>{s.activity}</span>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 18, color: '#fff', margin: 0 }}>{s.country} · {s.site}</p>
        </figcaption>
      </figure>
    </div>
  )
}

export default function GallerySection() {
  const isMobile = useIsMobile()
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(null)
  const total = SLIDES.length
  const go = (i) => setIndex((i + total) % total)

  const navBtn = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.92)',
    border: '1px solid var(--field-200)',
    boxShadow: '0 2px 12px rgba(17,18,34,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--midnight)',
    zIndex: 5,
  }

  return (
    <section id="sec-gallery" style={{ background: '#fff', borderTop: '1px solid var(--field-200)', borderBottom: '1px solid var(--field-200)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>05 — Gallery</p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>현장의 기록</p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              숫자 뒤의 사람들.<br />사업 현장을 사진으로 만납니다.
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--field-200)', background: 'var(--field-50)' }}>
          <div style={{ display: 'flex', transform: `translateX(-${index * 100}%)`, transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
            {SLIDES.map((s) => <Slide key={s.pbas} s={s} onOpen={setZoom} />)}
          </div>

          {/* Prev / Next */}
          <button aria-label="이전" onClick={() => go(index - 1)} style={{ ...navBtn, left: 16 }}><Arrow dir="prev" /></button>
          <button aria-label="다음" onClick={() => go(index + 1)} style={{ ...navBtn, right: 16 }}><Arrow dir="next" /></button>
        </div>

        {/* Controls: counter + dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <p className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 700, color: 'var(--midnight)', margin: 0 }}>
            <span style={{ color: 'var(--orange)' }}>{String(index + 1).padStart(2, '0')}</span>
            <span style={{ color: 'var(--field-300)', margin: '0 6px' }}>/</span>
            <span style={{ color: 'var(--grey-500)' }}>{String(total).padStart(2, '0')}</span>
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {SLIDES.map((s, i) => (
              <button
                key={s.pbas}
                aria-label={`${i + 1}번 슬라이드`}
                onClick={() => go(i)}
                style={{
                  width: i === index ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === index ? 'var(--orange)' : 'var(--field-300)',
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 4 : total}, 1fr)`, gap: 8, marginTop: 16 }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.pbas}
              onClick={() => go(i)}
              style={{
                position: 'relative',
                aspectRatio: '16/10',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                padding: 0,
                background: 'var(--field-50)',
                border: i === index ? `2px solid ${s.color}` : '1px solid var(--field-200)',
                opacity: i === index ? 1 : 0.6,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { if (i !== index) e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { if (i !== index) e.currentTarget.style.opacity = '0.6' }}
            >
              {s.src ? (
                <img src={s.src} alt={s.country} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--field-300)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <span lang="ko" style={{
                position: 'absolute',
                left: 0, right: 0, bottom: 0,
                fontFamily: 'var(--font-kr)',
                fontSize: 9,
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(17,18,34,0.55)',
                padding: '3px 4px',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {s.country}
              </span>
            </button>
          ))}
        </div>

        {/* 사진 추가 방법은 파일 상단 주석 참고 — 외부 공개판에는 안내를 표시하지 않음 */}

        {zoom && <Lightbox s={zoom} onClose={() => setZoom(null)} />}
      </div>
    </section>
  )
}
