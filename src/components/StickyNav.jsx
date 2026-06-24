const NAV = [
  { href: '#sec-causes',  num: '01', label: '원인' },
  { href: '#sec-where',   num: '02', label: '현장' },
  { href: '#sec-what',    num: '03', label: '활동' },
  { href: '#sec-result',  num: '04', label: '성과' },
  { href: '#sec-gallery', num: '05', label: '갤러리' },
]

function NavLink({ item }) {
  return (
    <a
      href={item.href}
      lang="ko"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        textDecoration: 'none',
        padding: '6px 10px',
        borderRadius: 6,
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--field-50)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>{item.num}</span>
      <span style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 600, color: 'var(--grey-700)' }}>{item.label}</span>
    </a>
  )
}

export default function StickyNav() {
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
        padding: '10px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Left — logos + title */}
        <a href="#sec-hero" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', minWidth: 0 }}>
          <img src="/WorldVision-Logo-Primary.svg" alt="World Vision" style={{ height: 24 }} />
          <span style={{ fontFamily: 'var(--font-en)', fontSize: 13, fontWeight: 400, color: 'var(--field-300)' }}>×</span>
          <img src="/wfp-logo.svg" alt="World Food Programme" style={{ height: 24 }} />
          <span style={{ width: 1, height: 18, background: 'var(--field-300)', margin: '0 4px' }} />
          <span lang="ko" style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--midnight)',
            whiteSpace: 'nowrap',
          }}>
            2025 글로벌 식량위기 대응 · 결과보고
          </span>
        </a>

        {/* Right — section navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV.map((item) => <NavLink key={item.href} item={item} />)}
        </div>
      </div>
    </nav>
  )
}
