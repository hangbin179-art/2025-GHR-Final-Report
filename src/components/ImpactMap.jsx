// ===========================================================================
// ImpactMap — main interactive world map for the WV x WFP food-crisis dashboard.
//
// Self-contained basemap: country polygons are rendered from a bundled GeoJSON
// (data/world-110m.json) — no external tile CDN, so the map works on any
// network (incl. locked-down corporate networks) and offline. The 13 project
// countries are OUTLINED (not flooded) in orange; one custom marker per project
// sits on top. Markers use L.divIcon (avoids default-icon bundler breakage),
// are sized lightly by beneficiary count (sqrt), and the selected marker gets a
// static concentric solid-orange "survey ring" — the WV FIELD DISPATCH
// signature, not a pulsing halo.
//
// FIELD DISPATCH skin (function preserved, color only): the dark slate sea →
// warm paper tone, land → paper-cream plate with a 0.5px ink hairline, project
// countries → 0.16 fill + a 1.25px orange outline (a surveyed boundary, not a
// flood fill). The floating legend is a square paper plate with a 1px ink
// hairline; the 5 activity categories are encoded as thin arc/dot samples
// (line/dot only — no tinted pills, no fill swatches).
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
const PAPER = '#FBFAF7' // warm newsprint cream (NOT pure white) — marker legibility halo
const INK_LINE = '#D8D2C6' // warm 1px hairline
// Sea: dark slate → warm paper tone. (Mirrors .leaflet-container in index.css;
// set here too because MapContainer's inline `background` would otherwise win.)
const SEA = '#F0EBE0'

// Basemap styling. Base layer = all land as a paper-cream plate with a hairline
// edge. Highlight layer = project countries, drawn as an OUTLINE (a surveyed
// boundary) — a faint 0.16 fill so the marker still reads, plus a 1.25px orange
// stroke. ("윤곽 > 면" — outline beats flood-fill.)
const baseLandStyle = { fillColor: '#E7E0D2', fillOpacity: 1, color: INK_LINE, weight: 0.5 }
const highlightStyle = { fillColor: WV_ORANGE, fillOpacity: 0.16, color: WV_ORANGE, weight: 1.25 }
const isProjectCountry = (feature) => PROJECT_ISO3.includes(feature.id)

// Map beneficiary count -> a small pin core diameter (px). Kept in a tight range
// so every marker stays comfortably clickable regardless of project size.
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

// Build the divIcon HTML for a project marker. `selected` swaps the quiet pin
// for the FIELD DISPATCH instrument: a filled orange disk ringed by static,
// solid concentric survey strokes (no infinite pulse). Both states are drawn as
// inline SVG so the heavy solid stroke survives Leaflet's HTML-string render.
function buildIcon(project, selected) {
  // Core disk diameter carries the beneficiary scale (sqrt) in BOTH states.
  const core = pinSize(project.beneficiaries)
  const coreR = core / 2

  // A thin paper ring separates the disk from the tinted land beneath it
  // (legibility — a 2px cream stroke, not a glow/blur).
  const paperRingW = 2

  if (!selected) {
    // Quiet pin: solid orange disk + a 2px paper separator ring.
    const pad = paperRingW + 2
    const box = core + pad * 2
    const c = box / 2
    const half = box / 2
    const html = `
      <div style="width:${box}px;height:${box}px;">
        <svg width="${box}" height="${box}" viewBox="0 0 ${box} ${box}" style="display:block;overflow:visible;">
          <circle cx="${c}" cy="${c}" r="${coreR + paperRingW / 2}"
                  fill="none" stroke="${PAPER}" stroke-width="${paperRingW}"></circle>
          <circle cx="${c}" cy="${c}" r="${coreR}" fill="${WV_ORANGE}"></circle>
        </svg>
      </div>`
    return L.divIcon({
      html,
      className: 'impact-map-marker', // strip leaflet's default white box
      iconSize: [box, box],
      iconAnchor: [half, half],
      tooltipAnchor: [0, -half + 2],
    })
  }

  // Selected pin = survey instrument. Filled disk at center, then 3 concentric
  // SOLID orange strokes stepping outward (heavy, not hairline). Radius is
  // anchored to the same beneficiary-scaled core so larger projects read larger.
  const ringW = [6, 4, 3] // solid stroke widths, heavy → light outward
  const gap = 5 // ring-to-ring breathing
  // Innermost survey ring sits just outside the paper separator.
  const r1 = coreR + paperRingW + gap + ringW[0] / 2
  const r2 = r1 + ringW[0] / 2 + gap + ringW[1] / 2
  const r3 = r2 + ringW[1] / 2 + gap + ringW[2] / 2
  const outer = r3 + ringW[2] / 2
  const box = Math.ceil(outer * 2) + 2
  const c = box / 2
  const half = box / 2

  const html = `
    <div style="width:${box}px;height:${box}px;">
      <svg width="${box}" height="${box}" viewBox="0 0 ${box} ${box}" style="display:block;overflow:visible;">
        <circle cx="${c}" cy="${c}" r="${r3}" fill="none" stroke="${WV_ORANGE}" stroke-width="${ringW[2]}"></circle>
        <circle cx="${c}" cy="${c}" r="${r2}" fill="none" stroke="${WV_ORANGE}" stroke-width="${ringW[1]}"></circle>
        <circle cx="${c}" cy="${c}" r="${r1}" fill="none" stroke="${WV_ORANGE}" stroke-width="${ringW[0]}"></circle>
        <circle cx="${c}" cy="${c}" r="${coreR + paperRingW / 2}" fill="none" stroke="${PAPER}" stroke-width="${paperRingW}"></circle>
        <circle cx="${c}" cy="${c}" r="${coreR}" fill="${WV_ORANGE}"></circle>
      </svg>
    </div>`

  return L.divIcon({
    html,
    className: 'impact-map-marker',
    iconSize: [box, box],
    iconAnchor: [half, half],
    tooltipAnchor: [0, -half + 2],
  })
}

// Tiny line/dot category sample for the legend (the data 5-colour scale is
// encoded as a thin arc + dot — NEVER a filled swatch/tinted pill).
function CategorySample({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0" aria-hidden="true">
      <path d="M3 9 A6 6 0 0 1 15 9" fill="none" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.9" fill={color} />
    </svg>
  )
}

export default function ImpactMap({ projects = [], selectedId = null, onSelect }) {
  // Precompute the icon per project so it's stable across renders (no
  // Date.now()/Math.random()); recompute only when selection or the projects
  // list changes.
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
    <div className="relative h-[460px] w-full overflow-hidden border border-ink-line bg-paper md:h-[620px]">
      {/* Section code — a quiet mono kicker, top-left, over the sea plate */}
      <span className="pointer-events-none absolute left-3 top-3 z-[400] mono-label mono-label--caps bg-paper/85 px-2 py-1 text-ink-muted">
        FIELD MAP
      </span>

      <MapContainer
        center={[12, 28]}
        zoom={3}
        minZoom={2}
        scrollWheelZoom={false}
        worldCopyJump
        style={{ height: '100%', width: '100%', background: SEA }}
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
                <div className="font-sans font-bold text-ink">{project.country}</div>
                <div className="font-sans text-ink-muted">{project.region}</div>
                <div className="mt-0.5 font-sans text-ink-soft">
                  수혜자 <span className="font-archivo font-semibold tabular-nums">{num(project.beneficiaries)}</span>명
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend plate — square paper plate + 1px ink hairline (no round, no
          shadow, no backdrop-blur, no dark panel). Sits above the sea. */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-[400] max-w-[244px] border border-ink-line bg-paper px-4 py-3">
        <div className="flex items-center gap-2">
          {/* WV instrument mark for the project markers: solid disk + 1 solid ring */}
          <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0" aria-hidden="true">
            <circle cx="9" cy="9" r="7.25" fill="none" stroke={WV_ORANGE} strokeWidth="1.5" />
            <circle cx="9" cy="9" r="3.4" fill={WV_ORANGE} />
          </svg>
          <span className="font-sans text-[13px] font-bold text-ink">사업 지역</span>
        </div>
        <p className="mt-1.5 font-sans text-[11px] leading-snug text-ink-muted">
          마커를 선택하면 해당 사업의 상세 성과가 표시됩니다. 점 크기 = 수혜자 규모.
        </p>

        <div className="mt-2.5 border-t border-ink-line pt-2">
          <div className="mb-1 mono-label mono-label--caps text-ink-muted">주요 활동</div>
          <ul className="flex flex-col gap-y-1">
            {ACTIVITY_KEYS.map((key) => {
              const meta = ACTIVITY_META[key]
              if (!meta) return null
              return (
                <li key={key} className="flex items-center gap-2 font-sans text-[11px] text-ink-soft">
                  <CategorySample color={meta.color} />
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
