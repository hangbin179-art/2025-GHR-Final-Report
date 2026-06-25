const NAV = [
  { href: '#sec-causes',  num: '01', label: '원인·영향' },
  { href: '#sec-where',   num: '02', label: '현장' },
  { href: '#sec-what',    num: '03', label: '활동' },
  { href: '#sec-result',  num: '04', label: '성과' },
  { href: '#sec-gallery', num: '05', label: '갤러리' },
]

import { useState, useEffect } from 'react'
import useIsMobile from '../lib/useIsMobile.js'

function NavLink({ item, active, isMobile }) {
  return (
    <a
      href={item.href}
      lang="ko"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 0 : 5,
        textDecoration: 'none',
        padding: isMobile ? '6px 7px' : '6px 10px',
        borderRadius: 6,
        background: active ? 'var(--orange-100)' : 'transparent',
        transition: 'background 0.15s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--field-50)' }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      {!isMobile && <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>{item.num}</span>}
      <span style={{ fontFamily: 'var(--font-kr)', fontSize: isMobile ? 12 : 13, fontWeight: active ? 700 : 600, color: active ? 'var(--orange-900)' : 'var(--grey-700)', whiteSpace: 'nowrap' }}>{item.label}</span>
    </a>
  )
}

export default function StickyNav() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState('')

  // 스크롤 스파이 — 현재 화면의 섹션을 상단 메뉴에서 강조
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const ids = NAV.map((n) => n.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--field-200)',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: isMobile ? '8px 10px' : '10px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 6 : 24,
      }}>
        {/* Left — logos + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, minWidth: 0 }}>
          <a href="https://www.worldvision.or.kr/" target="_blank" rel="noopener noreferrer" aria-label="월드비전 한국 홈페이지" style={{ display: 'flex' }}>
            <img src="/WorldVision-Logo-Primary.svg" alt="World Vision" style={{ height: 24, display: 'block' }} />
          </a>
          <span style={{ fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 400, color: 'var(--field-300)' }}>×</span>
          <a href="https://ko.wfp.org/" target="_blank" rel="noopener noreferrer" aria-label="유엔세계식량계획 WFP 홈페이지" style={{ display: 'flex' }}>
            <img src="/wfp-logo.svg" alt="World Food Programme" style={{ height: 24, display: 'block' }} />
          </a>
          <span style={{ width: 1, height: 18, background: 'var(--field-300)', margin: '0 4px', display: isMobile ? 'none' : 'block' }} />
          <a href="#sec-hero" lang="ko" style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--midnight)',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            display: isMobile ? 'none' : 'inline',
          }}>
            2025 글로벌 식량위기 대응 · 결과보고
          </a>
        </div>

        {/* Right — section navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV.map((item) => <NavLink key={item.href} item={item} active={active === item.href.slice(1)} isMobile={isMobile} />)}
        </div>
      </div>
    </nav>
  )
}
