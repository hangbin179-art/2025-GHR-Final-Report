import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useIsMobile from '../lib/useIsMobile.js'

/* Color tokens by activity */
const ORANGE = 'var(--orange)'
const AMBER = '#C77E0A'
const GREEN = '#2F7D4F'
const RED = '#C8102E'
const TEAL = '#0E7C7B'

/*
 * How to replace/add photos:
 *   Drop a photo into the public/gallery/ folder and add one line to the PHOTOS array.
 *   P(pbas, country, countryEn, site, activity, color, n[, scene])
 *   → src is auto-mapped to /gallery/{pbas}-{n}.jpg
 *   The "first" photo of each country appears in the carousel (one per country),
 *   and the lightbox (enlarged view) lets you page through all photos with country, site, and activity.
 */
const P = (pbas, country, countryEn, site, activity, color, n, scene = '') => ({
  pbas, country, countryEn, site, activity, color, scene,
  src: `/gallery/${pbas}-${n}.jpg`,
  credit: `© World Vision · ${countryEn} 2025`,
})

const PHOTOS = [
  // DR Congo (South Kivu · Tanganyika)
  P('223847', '콩고민주공화국', 'DR Congo', 'South Kivu', 'In-kind Food Distribution', ORANGE, 1, 'Woman beneficiary collecting her food ration'),
  P('223847', '콩고민주공화국', 'DR Congo', 'South Kivu, Kamanyola', 'In-kind Food Distribution', ORANGE, 2, 'Carrying a sack of food'),
  P('223847', '콩고민주공화국', 'DR Congo', 'South Kivu', 'Nutrition Counselling', RED, 3, 'Nutrition-sensitive counselling session'),
  P('223796', '콩고민주공화국', 'DR Congo', 'Tanganyika', 'In-kind Food Distribution', ORANGE, 1, 'Woman who received food assistance'),
  // Sudan (South Darfur · South Kordofan)
  P('223711', '수단', 'Sudan', 'South Darfur', 'In-kind Food Distribution', ORANGE, 1, 'Measuring and distributing grain'),
  P('223711', '수단', 'Sudan', 'South Darfur, Otash', 'In-kind Food Distribution', ORANGE, 2, 'Distribution at the Otash IDP camp'),
  P('223711', '수단', 'Sudan', 'South Darfur', 'In-kind Food Distribution', ORANGE, 3, 'Food distribution from truck delivery (South Darfur)'),
  P('223745', '수단', 'Sudan', 'South Darfur', 'Therapeutic Food', RED, 1, 'Twin brothers recovered with therapeutic food'),
  P('223745', '수단', 'Sudan', 'South Darfur', 'Nutrition Screening', RED, 2, 'MUAC measurement for an infant'),
  P('223710', '수단', 'Sudan', 'South Kordofan', 'In-kind Food Distribution', ORANGE, 1, 'Al-Abassiya Food Distribution Point (FDP)'),
  // Afghanistan (Ghor · Badghis)
  P('223255', '아프가니스탄', 'Afghanistan', 'Ghor · Badghis', 'In-kind Food Distribution', ORANGE, 1, 'Distributing flour and cooking oil'),
  P('223255', '아프가니스탄', 'Afghanistan', 'Ghor · Badghis', 'Food Distribution', ORANGE, 2, 'Overview of a large-scale distribution site'),
  P('223255', '아프가니스탄', 'Afghanistan', 'Ghor · Badghis', 'Food Distribution', ORANGE, 3, 'Distributing food commodities'),
  P('223255', '아프가니스탄', 'Afghanistan', 'Ghor · Badghis', 'Cash for Work', TEAL, 4, 'Asset creation through Cash for Work'),
  // Ethiopia (Tigray · Afar · Amhara)
  P('223707', '에티오피아', 'Ethiopia', 'Tigray · Afar', 'Therapeutic Food', RED, 1, 'Supplementary food distribution site'),
  P('223707', '에티오피아', 'Ethiopia', 'Tigray · Afar', 'Therapeutic Food', RED, 2, 'RUTF therapeutic food distribution'),
  P('223707', '에티오피아', 'Ethiopia', 'Tigray · Afar', 'Nutrition Screening', RED, 3, 'Measuring a child’s nutritional status (MUAC)'),
  P('223707', '에티오피아', 'Ethiopia', 'Tigray · Afar', 'In-kind Food Distribution', ORANGE, 4, 'Waiting for food distribution'),
  P('223707', '에티오피아', 'Ethiopia', 'Tigray · Afar', 'Food Storage', ORANGE, 5, 'Food storage warehouse'),
  P('223707', '에티오피아', 'Ethiopia', 'Tigray · Afar', 'Participant Feedback', RED, 6, 'Listening to nutrition programme participants'),
  // Uganda (Bidibidi · Lobule)
  P('223766', '우간다', 'Uganda', 'Bidibidi · Lobule', 'In-kind Food Distribution', ORANGE, 1, 'Measuring and distributing grain'),
  P('223766', '우간다', 'Uganda', 'Bidibidi · Lobule', 'Food Distribution', ORANGE, 2, 'Women waiting for distribution'),
  P('223766', '우간다', 'Uganda', 'Lobule', 'Food Distribution', ORANGE, 3, 'Indoor food distribution point'),
  // Venezuela (Zulia · Falcón) — School Feeding
  P('223806', '베네수엘라', 'Venezuela', 'Zulia · Falcón', 'School Feeding', AMBER, 1, 'School feeding site'),
  P('223806', '베네수엘라', 'Venezuela', 'Zulia · Falcón', 'School Feeding', AMBER, 2, 'Children eating their school meal'),
  P('223806', '베네수엘라', 'Venezuela', 'Zulia · Falcón', 'School Feeding', AMBER, 3, 'Preparing the school meal'),
  // South Sudan (Fashoda · Juba)
  P('223756', '남수단', 'South Sudan', 'Fashoda · Panyikang', 'Livelihood & Resilience', GREEN, 1, 'Woman farmer in a maize field'),
  P('223756', '남수단', 'South Sudan', 'Fashoda', 'Livelihood & Resilience', GREEN, 2, 'Support for sorghum farming'),
  P('223753', '남수단', 'South Sudan', 'Juba · Yambio', 'School Feeding', AMBER, 1, 'Hands-on school garden cultivation'),
  P('223753', '남수단', 'South Sudan', 'Juba · Yambio', 'School Feeding', AMBER, 2, 'Students tending the school garden'),
  // Bangladesh (Cox's Bazar) — Rohingya refugees, E-Voucher-only programme (not in-kind distribution; direct purchase via voucher)
  P('223748', '방글라데시', 'Bangladesh', 'Cox’s Bazar', 'E-voucher', TEAL, 1, 'Issuing and explaining the E-Voucher'),
  P('223748', '방글라데시', 'Bangladesh', 'Cox’s Bazar', 'E-voucher', TEAL, 2, 'Carrying food bought with vouchers during the rainy season'),
  P('223748', '방글라데시', 'Bangladesh', 'Cox’s Bazar', 'E-voucher', TEAL, 3, 'Distributing E-Voucher tokens'),
  P('223748', '방글라데시', 'Bangladesh', 'Cox’s Bazar', 'E-voucher', TEAL, 4, 'Buying fresh food directly with the E-Voucher'),
  // Central African Republic (Bouar · Bangassou)
  P('223999', '중앙아프리카공화국', 'CAR', 'Bouar · Bangassou', 'Cash Assistance', TEAL, 1, 'Cash assistance distribution in Gotchélé'),
  P('223999', '중앙아프리카공화국', 'CAR', 'Bouar · Bangassou', 'Livelihood & Resilience', GREEN, 2, 'Delivering materials for farm-road rehabilitation'),
  P('223999', '중앙아프리카공화국', 'CAR', 'Nguyali', 'Livelihood & Resilience', GREEN, 3, 'Harvesting and drying maize'),
  P('223999', '중앙아프리카공화국', 'CAR', 'Bouar · Bangassou', 'Cash Assistance', TEAL, 4, 'Workers receiving their cash payment'),
  // Kenya (Makueni · Kitui) — Livelihood resilience
  P('223864', '케냐', 'Kenya', 'Makueni · Kitui', 'Livelihood & Resilience', GREEN, 1, 'Harvest from a fruit-growing household'),
  P('223864', '케냐', 'Kenya', 'Makueni · Kitui', 'Livelihood & Resilience', GREEN, 2, 'Building assets through goat rearing'),
  P('223864', '케냐', 'Kenya', 'Makueni · Kitui', 'Livelihood & Resilience', GREEN, 3, 'Village savings group meeting'),
  P('223864', '케냐', 'Kenya', 'Makueni · Kitui', 'Livelihood & Resilience', GREEN, 4, 'Irrigated orchard farming'),
  // Chad (Farchana and 5 others · Emergency School Feeding)
  P('223850', '차드', 'Chad', 'Farchana and others', 'Emergency School Feeding', AMBER, 1, 'School feeding site'),
  P('223850', '차드', 'Chad', 'Farchana and others', 'Emergency School Feeding', AMBER, 2, 'Cooking the school meal'),
  P('223850', '차드', 'Chad', 'Farchana and others', 'Emergency School Feeding', AMBER, 3, 'Serving meals to students'),
  // Colombia (Valle del Cauca · Cash & Voucher)
  P('223799', '콜롬비아', 'Colombia', 'Valle del Cauca', 'Cash & Voucher', TEAL, 1, 'Cash and voucher distribution site'),
  P('223799', '콜롬비아', 'Colombia', 'Valle del Cauca', 'Participant Verification', TEAL, 2, 'Registering and verifying beneficiaries'),
  // Myanmar (Northern Shan · Emergency Cash)
  P('223982', '미얀마', 'Myanmar', 'Northern Shan', 'Emergency Cash Assistance', TEAL, 1, 'Cash assistance registration and distribution site'),
]

const feat = (pbas) => PHOTOS.find((p) => p.pbas === pbas)
const pick = (src) => PHOTOS.find((p) => p.src === src)

/* Carousel = one representative shot per country · order of 13 countries (all 13 are real photos) */
const CAROUSEL = [
  feat('223847'),                              // DR Congo
  feat('223711'),                              // Sudan
  feat('223255'),                              // Afghanistan
  feat('223707'),                              // Ethiopia
  feat('223766'),                              // Uganda
  feat('223806'),                              // Venezuela
  pick('/gallery/223753-2.jpg'),               // South Sudan — students tending the school garden
  feat('223850'),                              // Chad
  pick('/gallery/223748-4.jpg'),               // Bangladesh — buying fresh food with the E-Voucher
  feat('223799'),                              // Colombia
  feat('223999'),                              // Central African Republic
  feat('223982'),                              // Myanmar
  feat('223864'),                              // Kenya
]

function Arrow({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'prev' ? 'rotate(180deg)' : 'none' }}>
      <path d="M9 6 L15 12 L9 18" />
    </svg>
  )
}

// Country preview thumbnail card — tap to open the lightbox enlarged
function Thumb({ s, onOpen }) {
  const [hover, setHover] = useState(false)
  const clickable = !!s.src
  return (
    <div
      onClick={clickable ? () => onOpen(s) : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', aspectRatio: '4 / 3', borderRadius: 10, overflow: 'hidden',
        border: '1px solid var(--field-200)', background: 'var(--field-50)',
        cursor: clickable ? 'zoom-in' : 'default',
        transform: hover && clickable ? 'translateY(-3px)' : 'none',
        boxShadow: hover && clickable ? '0 10px 28px rgba(17,18,34,0.18)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {s.src ? (
        <img
          src={s.src}
          alt={`${s.countryEn} ${s.site}`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hover && clickable ? 'scale(1.06)' : 'none', transition: 'transform 0.4s ease' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 8 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--field-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0, textAlign: 'center' }}>Photo coming soon</p>
        </div>
      )}

      {/* Zoom hint icon */}
      {clickable && (
        <div style={{ position: 'absolute', top: 10, right: 10, width: 26, height: 26, borderRadius: '50%', background: 'rgba(17,18,34,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
        </div>
      )}

      {/* Caption overlay */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 12px 10px', background: s.src ? 'linear-gradient(to top, rgba(17,18,34,0.85), rgba(17,18,34,0))' : 'none' }}>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-en)', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', background: s.color, padding: '2px 6px', borderRadius: 3, marginBottom: 6 }}>
          {s.activity}
        </span>
        <p style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 14, color: s.src ? '#fff' : 'var(--midnight)', margin: 0, lineHeight: 1.25, textShadow: s.src ? '0 1px 6px rgba(0,0,0,0.5)' : 'none' }}>
          {s.countryEn}
        </p>
        <p style={{ fontFamily: 'var(--font-kr)', fontWeight: 500, fontSize: 11, color: s.src ? 'rgba(255,255,255,0.8)' : 'var(--grey-500)', margin: '1px 0 0', lineHeight: 1.2, textShadow: s.src ? '0 1px 4px rgba(0,0,0,0.5)' : 'none' }}>
          {s.site}
        </p>
      </div>
    </div>
  )
}

function Lightbox({ slides, idx, setIdx, onClose }) {
  const n = slides.length
  const s = slides[idx]
  const [zoom, setZoom] = useState(false)
  const [portrait, setPortrait] = useState(false)
  useEffect(() => { setZoom(false) }, [idx])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + n) % n)
      else if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % n)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [n, onClose, setIdx])

  if (!s) return null
  const navBtn = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 48, height: 48, borderRadius: '50%',
    background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', zIndex: 5,
  }
  return createPortal(
    <div onClick={onClose} role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, zIndex: 4000,
      background: 'rgba(8,9,18,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, cursor: 'zoom-out',
    }}>
      <button aria-label="Close" onClick={onClose} style={{
        position: 'absolute', top: 20, right: 20, width: 46, height: 46, borderRadius: '50%',
        background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)',
        color: '#fff', fontSize: 20, lineHeight: 1, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>✕</button>
      {n > 1 && <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + n) % n) }} style={{ ...navBtn, left: 20 }}><Arrow dir="prev" /></button>}
      {n > 1 && <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % n) }} style={{ ...navBtn, right: 20 }}><Arrow dir="next" /></button>}
      <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}>
        <div style={{ overflow: zoom ? 'auto' : 'visible', maxWidth: '94vw', maxHeight: zoom ? '78vh' : 'none', borderRadius: 8, boxShadow: zoom ? '0 16px 50px rgba(0,0,0,0.55)' : 'none' }}>
          <img
            src={s.src}
            alt={`${s.countryEn} ${s.site}`}
            onLoad={(e) => setPortrait(e.target.naturalHeight > e.target.naturalWidth)}
            onClick={(e) => { e.stopPropagation(); setZoom((z) => !z) }}
            style={zoom
              ? { display: 'block', height: '140vh', width: 'auto', maxWidth: 'none', cursor: 'zoom-out' }
              : { display: 'block', maxWidth: '90vw', maxHeight: portrait ? '74vh' : '62vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 16px 50px rgba(0,0,0,0.55)', cursor: 'zoom-in' }}
          />
        </div>
        <figcaption style={{ marginTop: 16, textAlign: 'center', maxWidth: '88vw' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', background: s.color, padding: '3px 8px', borderRadius: 4, marginBottom: 8 }}>{s.activity}</span>
          <p style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 18, color: '#fff', margin: 0 }}>{s.countryEn} · {s.site}</p>
          {s.scene && <p style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '6px 0 0' }}>{s.scene}</p>}
          {s.credit && <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '6px 0 0' }}>{s.credit}</p>}
          <p className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '8px 0 0' }}>{idx + 1} / {n}</p>
          <p style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: '6px 0 0' }}>
            {zoom ? 'Click the photo to zoom out · scroll to pan around' : 'Click the photo to enlarge and see the detail'}
          </p>
        </figcaption>
      </figure>
    </div>,
    document.body
  )
}

export default function GallerySection() {
  const isMobile = useIsMobile()
  const [zoomIdx, setZoomIdx] = useState(null)
  const photoCount = CAROUSEL.filter((s) => s.src).length

  return (
    <section id="sec-gallery" style={{ background: '#fff', borderTop: '1px solid var(--field-200)', borderBottom: '1px solid var(--field-200)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>05 — Gallery</p>
            <p style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>From the Field</p>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              The people behind the numbers.<br />Meet our project sites through photographs.
            </h2>
          </div>
        </div>

        {/* Country preview grid — tap to open the lightbox enlarged */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))', gap: isMobile ? 10 : 16 }}>
          {CAROUSEL.map((s) => (
            <Thumb key={s.src || `ph-${s.country}`} s={s} onOpen={(slide) => setZoomIdx(PHOTOS.indexOf(slide))} />
          ))}
        </div>

        {/* Hint — full gallery guidance */}
        <p style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--grey-600)', margin: '20px 0 0', lineHeight: 1.6 }}>
          These are <strong style={{ color: 'var(--midnight)' }}>{photoCount} representative shots</strong>, one per country. Tap any photo to enlarge it, and use the left/right arrows or your keyboard to page through all <strong style={{ color: 'var(--orange)' }}>{PHOTOS.length} photos</strong> along with their site and activity. While zoomed in, scroll to explore the detail.
        </p>
      </div>

      {zoomIdx !== null && (
        <Lightbox slides={PHOTOS} idx={zoomIdx} setIdx={setZoomIdx} onClose={() => setZoomIdx(null)} />
      )}
    </section>
  )
}
