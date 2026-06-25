import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import CountryGrid from './CountryGrid.jsx'
import useIsMobile from '../lib/useIsMobile.js'
import { ALL_PROJECTS } from '../data/countries.js'

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

// USD → 한화 ($1=1,330원). 팝업 병기용.
function fmtKrw(n) {
  const won = n * 1330
  const eok = won / 1e8
  if (eok >= 10) return Math.round(eok) + '억원'
  if (eok >= 1) return eok.toFixed(1) + '억원'
  return Math.round(won / 1e4).toLocaleString() + '만원'
}

// 사업 데이터는 단일 소스(countries.js)의 ALL_PROJECTS 사용

export default function ImpactMap() {
  const isMobile = useIsMobile()
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
      scrollWheelZoom: true,
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

    ALL_PROJECTS.forEach((p) => {
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
      if (p.food > 0) rows.push(`<div class="pop-row"><span>식량</span><strong>${p.food.toLocaleString()} 톤</strong></div>`)
      if (p.val > 100) rows.push(`<div class="pop-row"><span>식량 가액</span><strong>${fmtUsd(p.val)} <span style="font-weight:400;color:#9a9a9a;font-size:11px">(${fmtKrw(p.val)})</span></strong></div>`)
      if (p.cash > 0) rows.push(`<div class="pop-row"><span>현금·교환권</span><strong style="color:#0E7C7B">${fmtUsd(p.cash)} <span style="font-weight:400;color:#9a9a9a;font-size:11px">(${fmtKrw(p.cash)})</span></strong></div>`)
      if (p.ther > 0) rows.push(`<div class="pop-row"><span>치료식 (식량 중)</span><strong style="color:#C8102E">${p.ther.toFixed(1)} 톤</strong></div>`)

      // 배분 실적 블록 — 케냐(223864)는 현물·현금 배분 없는 생계 역량 강화 사업이라 별도 표기
      let bodyHtml
      if (rows.length) {
        bodyHtml = `<div class="pop-rows">${rows.join('')}</div>`
      } else if (p.pbas === '223864') {
        bodyHtml = `<div class="pop-rows"><div class="pop-row"><span>총 사업비</span><strong>2.2억원</strong></div></div>
         <p style="font-size:11px;line-height:1.55;color:#6b6b6b;margin:8px 0 0">저축 그룹 운영·비즈니스 교육 등 생계 역량 강화 사업 진행</p>`
      } else {
        bodyHtml = `<div class="pop-rows"><div class="pop-row"><span>배분 실적</span><strong>집행 준비 중</strong></div></div>`
      }

      const marker = L.marker([p.lat, p.lng], { icon })
        .bindTooltip(
          `<p class="pop-eyebrow">${p.countryEn} · ${p.siteEn}</p>
           <p class="pop-name">${p.country}</p>
           ${bodyHtml}`,
          { direction: 'top', offset: [0, -(size / 2) - 4], opacity: 1, className: 'wv-tip' }
        )
        .addTo(map)
      // 마우스 오버 → 상세 툴팁(Leaflet 자동) / 클릭 → 해당 국가 상세 드로어 열기(+지도 확대)
      marker.on('click', () => window.dispatchEvent(new CustomEvent('cg-select-country', { detail: p.country })))
    })

    // CountryGrid에서 국가 선택 시 → 해당 국가 사업지들로 지도 확대 (화면 이동 없이 지도만 fly)
    const onZoomCountry = (e) => {
      const name = e.detail
      if (!name) return
      const pts = ALL_PROJECTS
        .filter((p) => p.country === name && p.lat != null && p.lng != null)
        .map((p) => [p.lat, p.lng])
      if (!pts.length) return
      const bounds = L.latLngBounds(pts)
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 6, duration: 0.9 })
    }
    window.addEventListener('cg-zoom-country', onZoomCountry)

    return () => {
      window.removeEventListener('cg-zoom-country', onZoomCountry)
      map.remove()
      instanceRef.current = null
    }
  }, [])

  return (
    <section id="sec-where" style={{ background: 'var(--field-50)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>02 — Where</p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>현장</p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              13개국 20개 현장.<br />한눈에 확인합니다.
            </h2>
          </div>
        </div>

        {/* Map card */}
        <div style={{ background: '#fff', border: '1px solid var(--field-200)', borderRadius: 12, padding: isMobile ? 16 : 32, position: 'relative' }}>
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
          <div style={{ position: 'relative', height: isMobile ? 360 : 520, background: 'var(--field-50)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--field-200)' }}>
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
                마커에 마우스를 올리면 상세 실적이 표시되고, 클릭하면 해당 국가 사업 개요가 옆에서 열립니다.
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
