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

// Project data uses ALL_PROJECTS from the single source (countries.js)

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
      if (p.food > 0) rows.push(`<div class="pop-row"><span>Food</span><strong>${p.food.toLocaleString()} tonnes</strong></div>`)
      if (p.val > 100) rows.push(`<div class="pop-row"><span>Commodity value</span><strong>${fmtUsd(p.val)}</strong></div>`)
      if (p.cash > 0) rows.push(`<div class="pop-row"><span>Cash &amp; vouchers</span><strong style="color:#0E7C7B">${fmtUsd(p.cash)}</strong></div>`)
      if (p.ther > 0) rows.push(`<div class="pop-row"><span>Therapeutic food (of which)</span><strong style="color:#C8102E">${p.ther.toFixed(1)} t</strong></div>`)

      // Distribution results block — Kenya (223864) is a livelihood & resilience programme with no in-kind or cash distribution, so it is shown separately
      let bodyHtml
      if (rows.length) {
        bodyHtml = `<div class="pop-rows">${rows.join('')}</div>`
      } else if (p.pbas === '223864') {
        bodyHtml = `<div class="pop-rows"><div class="pop-row"><span>Total project cost</span><strong>$0.17M</strong></div></div>
         <p style="font-size:11px;line-height:1.55;color:#6b6b6b;margin:8px 0 0">Livelihood &amp; resilience programme running savings groups, business training and more</p>`
      } else {
        bodyHtml = `<div class="pop-rows"><div class="pop-row"><span>Distribution results</span><strong>Preparing for delivery</strong></div></div>`
      }

      const marker = L.marker([p.lat, p.lng], { icon })
        .bindTooltip(
          `<p class="pop-eyebrow">${p.countryEn} · ${p.siteEn}</p>
           <p class="pop-name">${p.countryEn}</p>
           ${bodyHtml}`,
          { direction: 'top', offset: [0, -(size / 2) - 4], opacity: 1, className: 'wv-tip' }
        )
        .addTo(map)
      // Hover → detailed tooltip (Leaflet automatic) / click → open the country detail drawer (+ zoom the map)
      marker.on('click', () => window.dispatchEvent(new CustomEvent('cg-select-country', { detail: p.country })))
    })

    // When a country is selected in CountryGrid → zoom the map to that country's project sites (fly the map only, no scroll)
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
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>Field</p>
          </div>
          <div>
            <h2 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              20 sites, 13 countries,<br />one map.
            </h2>
          </div>
        </div>

        {/* Map card */}
        <div style={{ background: '#fff', border: '1px solid var(--field-200)', borderRadius: 12, padding: isMobile ? 16 : 32, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: 0 }}>
              Field Map · Project Sites
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-en)', fontSize: 11, color: 'var(--grey-600)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)' }} />Project country
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--orange)', boxSizing: 'border-box' }} />Large-scale site
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
                Marker size · Food distributed
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {[12, 18, 28].map(s => (
                  <span key={s} style={{ width: s, height: s, borderRadius: '50%', background: 'var(--orange)', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', flexShrink: 0 }} />
                ))}
                <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, color: 'var(--grey-700)', fontWeight: 600 }}>20t → 3,200t</span>
              </div>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-600)', margin: '10px 0 0', lineHeight: 1.5 }}>
                Hover a marker for results. Click to open the country's project overview.
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
