import { useEffect, useMemo, useRef, useState } from 'react'

/* 컨테이너 크기 측정 (원본 useDimensions 대체 — ResizeObserver) */
function useDimensions(ref) {
  const [dim, setDim] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setDim({ width: el.offsetWidth, height: el.offsetHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return dim
}

const BLUR_PX = { light: 40, medium: 64, heavy: 100 }

/*
 * AnimatedGradient — 부드럽게 떠다니는 컬러 원 배경.
 * 부모는 position:relative + overflow:hidden 이어야 합니다.
 * colors: 원 색상 배열 / speed: 클수록 빠름(1/speed 초) / blur: light|medium|heavy
 */
export function AnimatedGradient({ colors, speed = 0.08, blur = 'medium', opacity = 0.3 }) {
  const containerRef = useRef(null)
  const { width, height } = useDimensions(containerRef)
  const circleSize = useMemo(() => Math.max(width, height), [width, height])

  // 위치·이동 벡터를 마운트 시 1회 고정 (리렌더 시 깜빡임 방지)
  const circles = useMemo(
    () =>
      colors.map((color) => ({
        color,
        top: Math.random() * 50,
        left: Math.random() * 50,
        size: 0.5 + Math.random(), // 0.5 ~ 1.5
        tx1: Math.random() - 0.5, ty1: Math.random() - 0.5,
        tx2: Math.random() - 0.5, ty2: Math.random() - 0.5,
        tx3: Math.random() - 0.5, ty3: Math.random() - 0.5,
        tx4: Math.random() - 0.5, ty4: Math.random() - 0.5,
      })),
    [colors]
  )

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, filter: `blur(${BLUR_PX[blur]}px)` }}>
        {circles.map((c, i) => (
          <svg
            key={i}
            className="animate-background-gradient"
            style={{
              position: 'absolute',
              top: `${c.top}%`,
              left: `${c.left}%`,
              '--background-gradient-speed': `${1 / speed}s`,
              '--tx-1': c.tx1, '--ty-1': c.ty1,
              '--tx-2': c.tx2, '--ty-2': c.ty2,
              '--tx-3': c.tx3, '--ty-3': c.ty3,
              '--tx-4': c.tx4, '--ty-4': c.ty4,
            }}
            width={circleSize * c.size}
            height={circleSize * c.size}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={c.color} opacity={opacity} />
          </svg>
        ))}
      </div>
    </div>
  )
}
