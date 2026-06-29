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
      {/* 00 — Scroll-expand cinematic hero (closed image → expands to looping video on scroll) */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/hero/hero-video.mp4"
        posterSrc="/hero/hero-poster.jpg"
        bgImageSrc="/hero/hero-poster.jpg"
        title="World Vision Food Crisis Response"
        midline="2025 Final Report"
        subtitle="13 countries · 20 projects"
        scrollToExpand="Scroll to play the film"
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

      {/* 05 — Field Gallery (project photo slides) */}
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
              <a href="https://www.worldvision.or.kr/" target="_blank" rel="noopener noreferrer" aria-label="World Vision Korea homepage" style={{ display: 'flex' }}>
                <img src="/WorldVision-Logo-Primary.svg" alt="World Vision" style={{ height: 20, filter: 'brightness(0) invert(1) opacity(0.85)', display: 'block' }} />
              </a>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>×</span>
              <a href="https://ko.wfp.org/" target="_blank" rel="noopener noreferrer" aria-label="UN World Food Programme (WFP) homepage" style={{ display: 'flex' }}>
                <img src="/wfp-logo.svg" alt="World Food Programme" style={{ height: 22, filter: 'brightness(0) invert(1) opacity(0.85)', display: 'block' }} />
              </a>
            </div>
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              2025 Global Food Crisis Response<br />
              World Vision Humanitarian Affairs Team
            </p>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '16px 0 0' }}>
Final Report · 2025
            </p>
          </div>

          {/* Programme at a glance */}
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              Programme at a glance
            </p>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-en)', fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <dt style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>Countries / Projects</dt>
                <dd style={{ margin: 0, color: '#fff', whiteSpace: 'nowrap' }}>{GLOBAL_KPIS.countries} / {GLOBAL_KPIS.projects}</dd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <dt style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>Food distributed</dt>
                <dd style={{ margin: 0, color: '#fff', whiteSpace: 'nowrap' }}>{GLOBAL_KPIS.result.foodActualTons.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} tonnes</dd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <dt style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>Funding leverage · WV→WFP</dt>
                <dd style={{ margin: 0, color: 'var(--orange)', whiteSpace: 'nowrap' }}>{GLOBAL_KPIS.leverage}×</dd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <dt style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>Total project budget</dt>
                <dd style={{ margin: 0, color: '#fff', whiteSpace: 'nowrap' }}>{krwThousandToUsd(GLOBAL_KPIS.totalProjectBudget)}</dd>
              </div>
            </dl>
          </div>

          {/* Sources */}
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              Sources &amp; Notice
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              Plan figures: proposal, Mar 2025. Results: cumulative Jan–Dec 2025.
              Amounts in USD (converted at ₩1,330/USD).
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', margin: '8px 0 0' }}>
              Sources: Hunger Hotspots (WFP &amp; FAO, 2025)<br />
              In the Shadow of Hunger (WFP &amp; World Vision, 2026)<br />
              Contact: Humanitarian Affairs Team, Hangbin Cho (hangbin_cho@worldvision.or.kr)
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2025 World Vision Korea · 2025 Global Food Crisis Response — Final Report · Built to report our results transparently to supporters.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: '6px 0 0', lineHeight: 1.6 }}>
            © World Vision · All photographs and video in this report are copyright World Vision; unauthorized use or distribution is prohibited.
          </p>
        </div>
      </div>
    </footer>
  )
}
