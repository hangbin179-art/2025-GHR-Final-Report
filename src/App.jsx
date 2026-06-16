import { useMemo, useState } from 'react'
import { PROJECTS, GLOBAL_KPIS } from './data/projects.js'
import { num, krwThousandToUsd, multiple } from './lib/format.js'
import { Section, SectionHeading } from './components/ui/Section.jsx'
import Hero from './components/Hero.jsx'
import CausesSection from './components/CausesSection.jsx'
import InterventionsSection from './components/InterventionsSection.jsx'
import ImpactMap from './components/ImpactMap.jsx'
import DetailPanel from './components/DetailPanel.jsx'

export default function App() {
  // Pre-select the first project so the panel shows real content on load.
  const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id ?? null)
  const selected = useMemo(
    () => PROJECTS.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  )

  function handleSelect(id) {
    setSelectedId(id)
    // On small screens the panel renders below the map — bring it into view.
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        document.getElementById('detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Hero />
      <CausesSection />
      <InterventionsSection />

      {/* ──────────────── Section 03: Interactive Impact Map ──────────────── */}
      <Section id="impact-map" py="wide">
        <SectionHeading
          code="03 / 03 — IMPACT MAP"
          title="대화형 성과 지도"
          description="지도의 표식 또는 아래 사업 지역 색인을 선택하면 해당 사업의 상세 성과가 우측 도면에 펼쳐집니다. 13개국 20개 사업의 수혜자·식량·현금·예산 레버리지를 한 지면에서 확인하세요."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
          {/* Map + project index */}
          <div className="lg:col-span-7">
            <ImpactMap projects={PROJECTS} selectedId={selectedId} onSelect={handleSelect} />

            {/* Project index — square mono chips, hairline, no rounded pills */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between border-b border-ink-line pb-2">
                <span className="mono-label mono-label--caps text-ink-muted">
                  Project Index · 사업 지역 바로가기
                </span>
                <span className="mono-label tnum text-ink-muted">{PROJECTS.length} sites</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROJECTS.map((p, i) => {
                  const active = p.id === selectedId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelect(p.id)}
                      aria-pressed={active}
                      title={`${p.country} · ${p.region}`}
                      className={[
                        'group flex items-baseline gap-1.5 border px-3 py-1.5 text-left transition-colors',
                        'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wv-orange',
                        active
                          ? 'border-wv-orange bg-wv-orange text-paper'
                          : 'border-ink-line text-ink-soft hover:border-wv-orange hover:text-wv-orange',
                      ].join(' ')}
                    >
                      <span className="font-mono text-[10px] tabular-nums opacity-60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-[13px] font-bold">{p.country}</span>
                      <span
                        className={[
                          'font-sans text-[12px]',
                          active ? 'text-paper/75' : 'text-ink-muted',
                        ].join(' ')}
                      >
                        · {p.region}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Detail dossier */}
          <div id="detail-panel" className="lg:col-span-5">
            <div className="lg:sticky lg:top-4">
              <DetailPanel project={selected} onClose={() => setSelectedId(null)} />
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}

// ── Footer — the one full ink plane: the orange ring closes into a full circle
//    (the 41× reverberation completing), source/contact set as a mono colophon.
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-press text-paper/80">
      {/* Closing ring — solid orange concentric circles bleeding from bottom-right */}
      <svg
        className="ring-svg pointer-events-none absolute -bottom-24 -right-20 h-[clamp(260px,32vw,440px)] w-[clamp(260px,32vw,440px)]"
        viewBox="0 0 440 440"
        fill="none"
        aria-hidden="true"
      >
        {[
          { r: 60, w: 30 },
          { r: 122, w: 26 },
          { r: 190, w: 22 },
          { r: 264, w: 18 },
        ].map((ring) => (
          <circle key={ring.r} className="ring-stroke" cx="440" cy="440" r={ring.r} strokeWidth={ring.w} />
        ))}
        <circle className="ring-disk" cx="440" cy="440" r="26" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-12">
          {/* Masthead block */}
          <div className="md:col-span-5">
            <p className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-8 items-center justify-center rounded-md bg-wv-orange text-[11px] font-black leading-none text-paper"
                aria-hidden="true"
              >
                WV
              </span>
              <span className="font-display text-xl tracking-wide text-paper">WORLD VISION</span>
              <span className="font-sans text-paper/40">✕</span>
              <span className="font-display text-xl tracking-wide text-paper/80">WFP</span>
            </p>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-paper/55">
              2025 글로벌 식량위기 대응사업 (다자기구협력사업)
              <br />
              월드비전 인도적지원팀
            </p>
            <p className="mono-label mono-label--caps mt-6 text-paper/40">
              Field Dispatch · No.2025-12
            </p>
          </div>

          {/* Scale summary — mono ledger */}
          <div className="md:col-span-4">
            <p className="mono-label mono-label--caps border-b border-paper/15 pb-2 text-paper/45">
              Programme at a glance
            </p>
            <dl className="mt-3 flex flex-col gap-2 font-mono text-[12px] leading-relaxed text-paper/70">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-paper/45">Countries / Projects</dt>
                <dd className="tnum text-paper">
                  {GLOBAL_KPIS.countries} / {GLOBAL_KPIS.projects}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-paper/45">Beneficiaries</dt>
                <dd className="tnum text-paper">{num(GLOBAL_KPIS.beneficiaries)}명</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-paper/45">Leverage (WV→WFP)</dt>
                <dd className="tnum text-paper">
                  <span className="text-wv-orange">{multiple(GLOBAL_KPIS.leverage)}</span>{' '}
                  · {krwThousandToUsd(GLOBAL_KPIS.wfpGrant)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Colophon — source / contact / notice */}
          <div className="md:col-span-3">
            <p className="mono-label mono-label--caps border-b border-paper/15 pb-2 text-paper/45">
              Sources & notice
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-paper/55">
              수치는 제안서(2025.03)·중간보고서(2025.12) 기준이며, 최종 실적·재무보고는 2026
              결과보고에서 확정됩니다. 현장 사진은 추후 교체 예정입니다.
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-paper/55">
              <span className="footnote-idx">출처</span> Hunger Hotspots (WFP &amp; FAO, 2025)
              <br />
              <span className="footnote-idx">문의</span> 인도적지원팀 조항빈 대리
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/15 pt-5">
          <p className="font-mono text-[10px] leading-relaxed text-paper/35">
            © 2025 World Vision Korea · 본 대시보드는 마케팅·후원자 커뮤니케이션 지원을 위한 내부
            시각화 자료입니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
