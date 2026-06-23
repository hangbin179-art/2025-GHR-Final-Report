import { useEffect, useRef, useState } from 'react'

/* ── 스크롤 진입 시 좌/우 슬라이드-인 ─────────────────────────
   디자인 요소는 건드리지 않고, 자식 블록을 감싸기만 합니다.
   화면에 들어오는 순간 from="left" 는 왼쪽에서, from="right" 는
   오른쪽에서 미끄러져 들어옵니다(1초, easeOut). 한 번만 재생하며
   prefers-reduced-motion 을 존중합니다. */
export default function ScrollReveal({ from = 'left', children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect() // 한 번만
        }
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const offset = from === 'right' ? 56 : -56
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateX(0)' : `translateX(${offset}px)`,
        transition: 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
