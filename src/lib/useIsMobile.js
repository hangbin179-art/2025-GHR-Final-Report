import { useState, useEffect } from 'react'

/* 뷰포트 너비 기반 반응형 훅 (Vite CSR 전용).
   인라인 스타일 컴포넌트에서 미디어쿼리 대신 분기에 사용. */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  )
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isMobile
}
