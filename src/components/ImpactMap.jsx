// ===========================================================================
// ImpactMap — main interactive world map for the WV x WFP food-crisis dashboard.
//
// Self-contained basemap: country polygons are rendered from a bundled GeoJSON
// (data/world-110m.json) — no external tile CDN, so the map works on any
// network (incl. locked-down corporate networks) and offline. The 13 project
// countries are tinted; one custom marker per project sits on top. Markers use
// L.divIcon (avoids default-icon bundler breakage), are sized lightly by
// beneficiary count, and the selected marker gets a ring + pulsing halo.
// ===========================================================================

import { useMemo } from 'react'
import { MapContainer, GeoJSON, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { ACTIVITY_KEYS, PROJECT_ISO3 } from '../data/projects.js'
import { ACTIVITY_META } from '../data/content.js'
import { num } from '../lib/format.js'
import worldGeo from '../data/world-110m.json'

// Design tokens (mirrored as literals because Leaflet builds marker markup as
// an HTML string outside React's Tailwind-scanned tree).
const WV_ORANGE = '#F47920'
const INK = '#16233A'
const OCEAN = '#0d1b2f'

// Basemap styling. Base layer = all land (solid slate). Highlight layer =
// project countries only, a translucent warm tint drawn over the base land.
const baseLandStyle = { fillColor: '#22344e', fillOpacity: 1, color: '#31496b', weight: 0.5 }
const highlightStyle = { fillColor: WV_ORANGE, fillOpacity: 0.26, color: '#F9A35E', weight: 1 }
const isProjectCountry = (feature) => PROJECT_ISO3.includes(feature.id)

// Map beneficiary count -> a small pin diameter (px). Kept in a tight range so
// every marker stays comfortably clickable regardless of project size.
function pinSize(beneficiaries) {
  const b = Number(beneficiaries) || 0
  const min = 16
  const max = 30
  // The dataset spans ~3k to ~64k beneficiaries; scale across that band.
  const lo = 3000
  const hi = 64000
  const t = Math.max(0, Math.min(1, (b - lo) / (hi - lo)))
  return Math.round(min + (max - min) * Math.sqrt(t))
}

// Build the divIcon HTML for a project marker. `selected` toggles the emphasis
// treatment (white ring + pulsing halo + bigger pin).
function buildIcon(project, selected) {
  const base = pinSize(project.beneficiaries)
  const size = selected ? Math.max(base + 8, 28) : base
  // Total box must accommodate the halo when selected.
  const box = selected ? size + 28 : size + 6
  const half = box / 2

  const halo = selected
    ? `<span class="animate-pulse-ring" style="
         position:absolute; left:50%; top:50%;
         width:${size + 10}px; height:${size + 10}px;
         margin-left:-${(size + 10) / 2}px; margin-top:-${(size + 10) / 2}px;
         border-radius:9999px;
         background:${WV_ORANGE};
         opacity:.5;
         pointer-events:none;"></span>`
    : ''

  const ring = selected
    ? `box-shadow:0 0 0 3px #fff, 0 0 0 5px ${WV_ORANGE}, 0 4px 10px rgba(0,0,0,.45);`
    : `box-shadow:0 0 0 2px rgba(255,255,255,.85), 0 2px 6px rgba(0,0,0,.4);`

  const dotInner = selected
    ? `<span style="
         display:block; width:38%; height:38%;
         border-radius:9999px; background:#fff;"></span>`
    : ''

  const html = `
    <div style="position:relative; width:${box}px; height:${box}px;">
      ${halo}
      <span style="
        position:absolute; left:50%; top:50%;
        width:${size}px; height:${size}px;
        margin-left:-${size / 2}px; margin-top:-${size / 2}px;
        border-radius:9999px;
        background:${WV_ORANGE};
        ${ring}
        display:flex; align-items:center; justify-content:center;
        transition:transform .15s ease;">
        ${dotInner}
      </span>
    </div>`

  return L.divIcon({
    html,
    className: 'impact-map-marker', // strip leaflet's default white box
    iconSize: [box, box],
    iconAnchor: [half, half],
    tooltipAnchor: [0, -half + 2],
  })
}

export default function ImpactMap({ projects = [], selectedId = null, onSelect }) {
  // Precompute the two icon variants per project so they're stable across
  // renders (no Date.now()/Math.random()); recompute only when selection or
  // the projects list changes.
  const markers = useMemo(
    () =>
      projects
        .filter((p) => Array.isArray(p.coords) && p.coords.length === 2)
        .map((p) => {
          const selected = p.id === selectedId
          return {
            project: p,
            selected,
            icon: buildIcon(p, selected),
          }
        }),
    [projects, selectedId]
  )

  return (
    <div className="relative h-[460px] md:h-[620px] w-full rounded-xl2 overflow-hidden shadow-card">
      <MapContainer
        center={[12, 28]}
        zoom={3}
        minZoom={2}
        scrollWheelZoom={false}
        worldCopyJump
        style={{ height: '100%', width: '100%', background: OCEAN }}
        className="z-0"
      >
        {/* Self-contained basemap (bundled GeoJSON, no external tiles) */}
        <GeoJSON data={worldGeo} style={baseLandStyle} interactive={false} />
        <GeoJSON
          key="project-countries"
          data={worldGeo}
          filter={isProjectCountry}
          style={highlightStyle}
          interactive={false}
        />

        {markers.map(({ project, selected, icon }) => (
          <Marker
            key={project.id}
            position={project.coords}
            icon={icon}
            zIndexOffset={selected ? 1000 : 0}
            keyboard
            eventHandlers={{
              click: () => onSelect && onSelect(project.id),
              keydown: (e) => {
                const key = e?.originalEvent?.key
                if ((key === 'Enter' || key === ' ') && onSelect) {
                  onSelect(project.id)
                }
              },
            }}
          >
            <Tooltip direction="top" offset={[0, 0]} opacity={1}>
              <div className="text-[12px] leading-tight">
                <div className="font-semibold text-ink">{project.country}</div>
                <div className="text-ink-muted">{project.region}</div>
                <div className="mt-0.5 text-ink-soft">
                  수혜자 {num(project.beneficiaries)}명
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating legend card */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-[400] max-w-[230px] rounded-xl2 bg-ink/80 px-4 py-3 text-white shadow-panel backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full ring-2 ring-white/80"
            style={{ background: WV_ORANGE }}
            aria-hidden="true"
          />
          <span className="text-[13px] font-semibold">사업 지역</span>
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-white/75">
          마커를 클릭하면 상세 성과가 표시됩니다.
        </p>

        <div className="mt-2.5 border-t border-white/15 pt-2">
          <div className="mb-1 text-[10px] font-medium uppercase tracking-wide text-white/55">
            주요 활동
          </div>
          <ul className="grid grid-cols-1 gap-y-1">
            {ACTIVITY_KEYS.map((key) => {
              const meta = ACTIVITY_META[key]
              if (!meta) return null
              return (
                <li key={key} className="flex items-center gap-2 text-[11px] text-white/85">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ background: meta.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{meta.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
