import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── 섹션 전환: 스크롤 진입 시 회전(30°→0°) 등장 ───────────────
   디자인·레이아웃·높이는 그대로 두고, 콘텐츠를 감싼 안쪽 박스만
   스크롤 위치에 맞춰(scrub) 기울었다가 펴집니다(좌상단 기준).
   바깥은 overflow:hidden 으로 회전 중 넘침을 프레임 안에 가둬
   가로 스크롤이 생기지 않게 합니다. prefers-reduced-motion 존중.
   (원본 FlowArt 효과를 핀 고정 없이 회전 등장만 어댑트) */
export default function FlowReveal({ children, rotation = 30 }) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const ctx = gsap.context(() => {
      gsap.set(inner, { rotation, transformOrigin: 'left top' })
      gsap.to(inner, {
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top bottom',   // 섹션 상단이 화면 하단에 닿을 때 시작
          end: 'top 25%',        // 섹션 상단이 화면 상단 25%에 닿으면 정렬 완료
          scrub: true,
        },
      })
    }, outer)

    // 폰트·이미지 로드로 레이아웃이 밀릴 수 있어 위치 재계산
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [rotation])

  return (
    <div ref={outerRef} data-flow-section style={{ overflow: 'hidden' }}>
      <div ref={innerRef} className="flow-art-container" style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
