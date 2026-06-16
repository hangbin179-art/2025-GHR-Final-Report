import { useMemo, useState } from 'react'
import { PROJECTS, GLOBAL_KPIS } from './data/projects.js'
import { num, krwThousandToUsd, multiple } from './lib/format.js'
import { Icon } from './lib/icons.jsx'
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
    <div className="min-h-screen bg-canvas font-sans text-ink">
      <Hero />
      <CausesSection />
      <InterventionsSection />

      {/* ---------------- Section 4: Interactive Impact Map ---------------- */}
      <Section id="impact-map" className="bg-canvas">
        <SectionHeading
          eyebrow="IMPACT MAP · 사업 현장"
          title="대화형 성과 지도"
          description="지도의 마커 또는 아래 사업 지역을 선택하면 해당 사업의 상세 성과가 우측 패널에 표시됩니다. 13개국 20개 사업의 수혜자·식량·현금·예산 레버리지를 한눈에 확인하세요."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Map + quick selector */}
          <div className="lg:col-span-7">
            <ImpactMap projects={PROJECTS} selectedId={selectedId} onSelect={handleSelect} />

            {/* Quick region selector — easier than hunting small markers */}
            <div className="mt-5">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink-muted">
                <Icon name="MapPin" className="h-4 w-4 text-wv-orange" />
                사업 지역 바로가기
                <span className="font-normal text-ink-muted/70">({PROJECTS.length}개 사업)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {PROJECTS.map((p) => {
                  const active = p.id === selectedId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelect(p.id)}
                      aria-pressed={active}
                      className={[
                        'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-wv-orange/60',
                        active
                          ? 'border-wv-orange bg-wv-orange text-white shadow-sm'
                          : 'border-ink/10 bg-white text-ink-soft hover:border-wv-orange/50 hover:text-wv-orange',
                      ].join(' ')}
                      title={`${p.country} ${p.region}`}
                    >
                      <span className="font-semibold">{p.country}</span>
                      <span className={active ? 'text-white/80' : 'text-ink-muted'}> · {p.region}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div id="detail-panel" className="lg:col-span-5">
            <div className="lg:sticky lg:top-6">
              <DetailPanel project={selected} onClose={() => setSelectedId(null)} />
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold text-white">WORLD VISION <span className="text-wv-orange">×</span> WFP</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              2025 글로벌 식량위기 대응사업 (다자기구협력사업)<br />
              월드비전 인도적지원팀
            </p>
          </div>

          <div className="md:col-span-1">
            <p className="text-sm font-semibold text-white">사업 규모 요약</p>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              <li>· {GLOBAL_KPIS.countries}개국 / {GLOBAL_KPIS.projects}개 사업 / 총 수혜자 {num(GLOBAL_KPIS.beneficiaries)}명</li>
              <li>· 월드비전 지원 → WFP 지원금 약 {multiple(GLOBAL_KPIS.leverage)} ({krwThousandToUsd(GLOBAL_KPIS.wfpGrant)})</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">안내</p>
            <p className="mt-2 text-xs leading-relaxed text-white/55">
              본 대시보드의 수치는 제안서(2025.03) 및 중간보고서(2025.12)를 기준으로 하며,
              최종 실적과 재무보고는 2026년 결과보고에서 확정됩니다. 현장 사진은 추후 데이터로 교체될 예정입니다.
            </p>
            <p className="mt-3 text-xs text-white/55">
              문의 · 인도적지원팀 조항빈 대리<br />
              출처 · Hunger Hotspots (WFP &amp; FAO, 2025)
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © 2025 World Vision Korea · 본 대시보드는 마케팅·후원자 커뮤니케이션 지원을 위한 내부 시각화 자료입니다.
        </div>
      </div>
    </footer>
  )
}
