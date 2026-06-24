import ScrollExpandMedia from './components/ScrollExpandMedia.jsx'
import StickyNav from './components/StickyNav.jsx'
import Hero from './components/Hero.jsx'
import CausesSection from './components/CausesSection.jsx'
import ImpactMap from './components/ImpactMap.jsx'
import InterventionsSection from './components/InterventionsSection.jsx'
import ResultsCharts from './components/ResultsCharts.jsx'
import GallerySection from './components/GallerySection.jsx'
import FlowReveal from './components/FlowReveal.jsx'
import useIsMobile from './lib/useIsMobile.js'
import { GLOBAL_KPIS } from './data/projects.js'
import { num, krwThousandToUsd, multiple } from './lib/format.js'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--field-50)' }}>
      {/* 00 — Scroll-expand cinematic hero (닫힌 이미지 → 스크롤 시 영상 루프 확장) */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/hero/hero-video.mp4"
        posterSrc="/hero/hero-poster.jpg"
        bgImageSrc="/hero/hero-poster.jpg"
        title="월드비전 식량위기 대응 사업"
        midline="2025년 사업 결과보고"
        subtitle="13개국 20개 사업"
        scrollToExpand="아래로 스크롤하여 영상 재생"
      />

      <StickyNav />

      {/* Hero */}
      <div id="sec-hero" style={{ borderBottom: '1px solid var(--field-200)' }}>
        <Hero />
      </div>

      {/* 01 — Why (Causes) */}
      <FlowReveal>
        <CausesSection />
      </FlowReveal>

      {/* 02 — Where (Map + Country Grid) */}
      <FlowReveal>
        <ImpactMap />
      </FlowReveal>

      {/* 03 — What (Chapter III editorial + PBAS table) */}
      <FlowReveal>
        <InterventionsSection />
      </FlowReveal>

      {/* 04 — Result (Sankey + Progress dials) */}
      <FlowReveal>
        <ResultsCharts />
      </FlowReveal>

      {/* 05 — Field Gallery (사업 사진 슬라이드) */}
      <FlowReveal>
        <GallerySection />
      </FlowReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function Footer() {
  const isMobile = useIsMobile()
  return (
    <footer style={{
      background: 'var(--midnight)',
      color: 'rgba(255,255,255,0.7)',
      padding: isMobile ? '48px 20px' : '64px 32px',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 28 : 40, marginBottom: 40 }}>
          {/* Masthead */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img src="/WorldVision-Logo-Primary.svg" alt="World Vision" style={{ height: 20, filter: 'brightness(0) invert(1) opacity(0.85)' }} />
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>×</span>
              <img src="/wfp-logo.svg" alt="World Food Programme" style={{ height: 22, filter: 'brightness(0) invert(1) opacity(0.85)' }} />
            </div>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              2025 글로벌 식량위기 대응사업 (다자기구협력사업)<br />
              월드비전 긴급구호팀
            </p>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '16px 0 0' }}>
Result Report · 2025
            </p>
          </div>

          {/* Programme at a glance */}
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              Programme at a glance
            </p>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-en)', fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <dt style={{ color: 'rgba(255,255,255,0.4)' }}>Countries / Projects</dt>
                <dd style={{ margin: 0, color: '#fff' }}>{GLOBAL_KPIS.countries} / {GLOBAL_KPIS.projects}</dd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <dt style={{ color: 'rgba(255,255,255,0.4)' }}>Food distributed</dt>
                <dd style={{ margin: 0, color: '#fff' }}>{num(GLOBAL_KPIS.result.foodActualTons)}톤</dd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <dt style={{ color: 'rgba(255,255,255,0.4)' }}>Leverage (WV→WFP)</dt>
                <dd style={{ margin: 0, color: 'var(--orange)' }}>{multiple(GLOBAL_KPIS.leverage)}</dd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <dt style={{ color: 'rgba(255,255,255,0.4)' }}>WFP income (actual)</dt>
                <dd style={{ margin: 0, color: '#fff' }}>{krwThousandToUsd(GLOBAL_KPIS.wfpActualIncome)}</dd>
              </div>
            </dl>
          </div>

          {/* Sources */}
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              Sources &amp; Notice
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              계획 수치는 제안서(2025.03), 배분 실적은 (2025.1~2025.12) 누적 기준입니다.
              환율 1,330원/USD 적용.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: '8px 0 0' }}>
              출처: Hunger Hotspots (WFP &amp; FAO, 2025)<br />
              문의: 인도적지원팀 조항빈 (hangbin_cho@worldvision.or.kr)
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2025 World Vision Korea · 2025 글로벌 식량위기 대응사업 결과보고 · 본 대시보드는 후원자 여러분께 사업 결과를 투명하게 보고하기 위해 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
