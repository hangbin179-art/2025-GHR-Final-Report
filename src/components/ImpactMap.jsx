import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import CountryGrid from './CountryGrid.jsx'

// Marker size formula from Direction A reference
function sizeFor(food, ther, cash) {
  const tons = Math.max(food, ther, cash > 0 ? 40 : 0)
  const min = 20, max = 3088
  const t = Math.sqrt(Math.max(0, (tons - min)) / (max - min))
  return Math.round(14 + t * 42)
}

function fmtUsd(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  return '$' + (n / 1000).toFixed(0) + 'K'
}

const PROJECTS = [
  { country: '수단', countryEn: 'Sudan', site: 'South Darfur (IFA)', lat: 11.00, lng: 24.90, food: 2276.3, ther: 15.3, cash: 0, val: 3121934, pbas: '223711' },
  { country: '수단', countryEn: 'Sudan', site: 'South Kordofan', lat: 12.20, lng: 30.20, food: 1025.7, ther: 17.4, cash: 324429, val: 1010325, pbas: '223710' },
  { country: '수단', countryEn: 'Sudan', site: 'South Darfur (Nutr.)', lat: 11.10, lng: 24.95, food: 20.1, ther: 20.1, cash: 0, val: 82059, pbas: '223745' },
  { country: '수단', countryEn: 'Sudan', site: 'White Nile', lat: 13.05, lng: 32.55, food: 0, ther: 0, cash: 0, val: 0, pbas: '223856' },
  { country: '콩고민주공화국', countryEn: 'DR Congo', site: 'South Kivu', lat: -2.50, lng: 28.90, food: 3088.2, ther: 74.9, cash: 0, val: 5050526, pbas: '223847' },
  { country: '콩고민주공화국', countryEn: 'DR Congo', site: 'Tanganyika', lat: -6.00, lng: 29.70, food: 632.6, ther: 0, cash: 0, val: 1093743, pbas: '223796' },
  { country: '콩고민주공화국', countryEn: 'DR Congo', site: 'Kasai · Luiza', lat: -5.90, lng: 22.40, food: 76.2, ther: 76.2, cash: 0, val: 344228, pbas: '224041' },
  { country: '남수단', countryEn: 'South Sudan', site: 'Fashoda · Panyikang', lat: 10.00, lng: 32.00, food: 301.1, ther: 0.5, cash: 397930, val: 518775, pbas: '223756' },
  { country: '남수단', countryEn: 'South Sudan', site: 'Renk · Manyo', lat: 11.75, lng: 32.80, food: 81.2, ther: 0, cash: 0, val: 136515, pbas: '223758' },
  { country: '남수단', countryEn: 'South Sudan', site: 'Juba · Yambio', lat: 4.85, lng: 31.60, food: 29.6, ther: 0, cash: 141103, val: 253929, pbas: '223753' },
  { country: '아프가니스탄', countryEn: 'Afghanistan', site: 'Ghor · Badghis', lat: 34.50, lng: 65.30, food: 829.3, ther: 65.7, cash: 173877, val: 446505, pbas: '223255' },
  { country: '에티오피아', countryEn: 'Ethiopia', site: 'Tigray · Afar · Amhara', lat: 13.50, lng: 39.50, food: 695.8, ther: 695.8, cash: 0, val: 2416084, pbas: '223707' },
  { country: '우간다', countryEn: 'Uganda', site: 'Bidibidi · Lobule', lat: 3.42, lng: 31.40, food: 505.0, ther: 33.6, cash: 558117, val: 679772, pbas: '223766' },
  { country: '베네수엘라', countryEn: 'Venezuela', site: 'Zulia · Falcón +2', lat: 10.40, lng: -72.00, food: 475.5, ther: 0, cash: 0, val: 605800, pbas: '223806' },
  { country: '차드', countryEn: 'Chad', site: 'Farchana +5', lat: 13.60, lng: 22.00, food: 198.5, ther: 0, cash: 15941, val: 278368, pbas: '223850' },
  { country: '방글라데시', countryEn: 'Bangladesh', site: "Cox's Bazar", lat: 21.43, lng: 92.00, food: 0, ther: 0, cash: 1885961, val: 17, pbas: '223748' },
  { country: '콜롬비아', countryEn: 'Colombia', site: 'Valle del Cauca', lat: 3.40, lng: -76.50, food: 0, ther: 0, cash: 1456689, val: 0, pbas: '223799' },
  { country: '중앙아프리카공화국', countryEn: 'CAR', site: 'Bambari · Bouar', lat: 5.70, lng: 20.70, food: 0, ther: 0, cash: 87318, val: 0, pbas: '223999' },
  { country: '미얀마', countryEn: 'Myanmar', site: 'Northern Shan', lat: 22.50, lng: 97.50, food: 0, ther: 0, cash: 64616, val: 0, pbas: '223982' },
  { country: '케냐', countryEn: 'Kenya', site: 'Makueni · Kitui', lat: -1.80, lng: 37.60, food: 0, ther: 0, cash: 0, val: 0, pbas: '223864' },
]

export default function ImpactMap() {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return
    const el = mapRef.current
    if (!el) return

    const map = L.map(el, {
      center: [12, 28],
      zoom: 3,
      minZoom: 2,
      maxZoom: 8,
      scrollWheelZoom: false,
      attributionControl: true,
      worldCopyJump: true,
    })
    instanceRef.current = map

    // CartoDB Positron — light base (no labels)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map)
    // Labels layer on top
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd', maxZoom: 19, pane: 'shadowPane' }
    ).addTo(map)

    PROJECTS.forEach((p) => {
      const size = sizeFor(p.food, p.ther, p.cash)
      const labelFont = Math.max(8, Math.round(size * 0.30))
      let label
      if (p.food > 0) label = p.food >= 1000 ? (p.food / 1000).toFixed(1) + 'k' : p.food + 't'
      else if (p.cash > 0) label = '$' + (p.cash / 1000000).toFixed(1) + 'M'
      else label = '—'

      const icon = L.divIcon({
        className: '',
        html: `<div class="wv-marker" style="width:${size}px;height:${size}px;font-size:${labelFont}px;">${label}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })

      const rows = []
      if (p.food > 0) rows.push(`<div class="pop-row"><span>일반식량</span><strong>${p.food.toLocaleString()} 톤</strong></div>`)
      if (p.val > 100) rows.push(`<div class="pop-row"><span>식량 가액</span><strong>${fmtUsd(p.val)}</strong></div>`)
      if (p.cash > 0) rows.push(`<div class="pop-row"><span>현금·바우처</span><strong style="color:#0E7C7B">${fmtUsd(p.cash)}</strong></div>`)
      if (p.ther > 0) rows.push(`<div class="pop-row"><span>치료식</span><strong style="color:#C8102E">${p.ther.toFixed(1)} 톤</strong></div>`)

      L.marker([p.lat, p.lng], { icon }).bindPopup(
        `<p class="pop-eyebrow">${p.countryEn} · ${p.site}</p>
         <p class="pop-name">${p.country}</p>
         <div class="pop-rows">${rows.join('') || '<div class="pop-row"><span>배분 실적</span><strong>집행 준비 중</strong></div>'}</div>`
      ).addTo(map)
    })

    return () => {
      map.remove()
      instanceRef.current = null
    }
  }, [])

  return (
    <section id="dir-a-map" style={{ background: 'var(--field-50)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>02 — Where</p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>현장</p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              13개국 20개 현장.<br />한 지면에서 모두 확인합니다.
            </h2>
          </div>
        </div>

        {/* Map card */}
        <div style={{ background: '#fff', border: '1px solid var(--field-200)', borderRadius: 12, padding: 32, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: 0 }}>
              Field Map · 사업 현장
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-en)', fontSize: 11, color: 'var(--grey-600)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)' }} />사업국
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--orange)', boxSizing: 'border-box' }} />대규모 사업지
              </span>
            </div>
          </div>

          {/* Map */}
          <div style={{ position: 'relative', height: 520, background: 'var(--field-50)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--field-200)' }}>
            <div ref={mapRef} style={{ position: 'absolute', inset: 0 }} />

            {/* Legend chip */}
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              background: '#fff',
              border: '1px solid var(--field-200)',
              borderRadius: 8,
              padding: '14px 16px',
              maxWidth: 280,
              zIndex: 400,
              boxShadow: '0 4px 12px rgba(17,18,34,0.08)',
            }}>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '0 0 8px' }}>
                Marker size · 식량 배분량
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {[12, 18, 28].map(s => (
                  <span key={s} style={{ width: s, height: s, borderRadius: '50%', background: 'var(--orange)', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', flexShrink: 0 }} />
                ))}
                <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, color: 'var(--grey-700)', fontWeight: 600 }}>20t → 3,200t</span>
              </div>
              <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-600)', margin: '10px 0 0', lineHeight: 1.5 }}>
                마커를 클릭하면 사업별 배분 실적이 표시됩니다.
              </p>
            </div>
          </div>

          {/* Country Grid */}
          <CountryGrid />
        </div>
      </div>
    </section>
  )
}
