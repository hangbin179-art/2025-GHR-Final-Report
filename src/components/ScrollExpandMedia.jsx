import { useEffect, useRef, useState } from 'react'

// 스크롤 확장 히어로 — 닫힌 상태에서는 배경 이미지만 보이다가, 스크롤을
// 시작하면 그 시점부터 영상이 재생되며 가운데 박스가 확장되어 드러난다.
// 원본(next/image + framer-motion + TSX)을 이 프로젝트(Vite/JSX)에 맞춰
// img + 인라인 CSS 트랜지션으로 어댑트.
export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollToExpand,
  children,
}) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobileState, setIsMobileState] = useState(false)

  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const autoUnmuteTried = useRef(false)
  const [soundOn, setSoundOn] = useState(false)

  // 스크롤 시작(사용자 제스처) 시 소리 켜기 시도. 브라우저가 막으면 음소거로 되돌림(버튼으로 켤 수 있음).
  const tryAutoUnmute = () => {
    if (autoUnmuteTried.current) return
    autoUnmuteTried.current = true
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.play().then(() => setSoundOn(true)).catch(() => {
      v.muted = true
      setSoundOn(false)
      v.play().catch(() => {})
    })
  }

  // 사운드 토글 버튼 (확실한 사용자 클릭 → 소리 재생 보장)
  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    autoUnmuteTried.current = true
    const next = !soundOn
    setSoundOn(next)
    v.muted = !next
    if (next) v.play().catch(() => {})
  }

  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
  }, [mediaType])

  // 영상 재생 제어: 스크롤을 시작(progress>0)하면 그때 재생, 최상단으로
  // 완전히 돌아오면 정지하고 처음으로 되감아 다시 '이미지' 상태로.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (scrollProgress > 0) {
      if (v.paused) v.play().catch(() => {})
    } else {
      v.pause()
      try { v.currentTime = 0 } catch (e) { /* noop */ }
      v.muted = true
      autoUnmuteTried.current = false
      setSoundOn(false)
    }
  }, [scrollProgress])

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        tryAutoUnmute()
        const scrollDelta = e.deltaY * 0.0009
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1)
        setScrollProgress(newProgress)
        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
      }
    }

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e) => {
      if (!touchStartY) return
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        tryAutoUnmute()
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005
        const scrollDelta = deltaY * scrollFactor
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1)
        setScrollProgress(newProgress)
        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = () => {
      setTouchStartY(0)
    }

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // 외부에서 'resetSection' 이벤트가 오면 처음 상태로 되돌린다.
  useEffect(() => {
    const onReset = () => {
      setScrollProgress(0)
      setShowContent(false)
      setMediaFullyExpanded(false)
    }
    window.addEventListener('resetSection', onReset)
    return () => window.removeEventListener('resetSection', onReset)
  }, [])

  // 마운트 시 항상 최상단(닫힌 상태)에서 시작 — 브라우저 스크롤 복원 방지.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250)
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400)
  const textOpacity = Math.max(1 - scrollProgress * 1.3, 0)

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Background image — 스크롤할수록 서서히 사라짐 */}
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ opacity: 1 - scrollProgress, transition: 'opacity 0.1s ease-out' }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(17,18,34,0.32)' }} />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* 확장되는 미디어 박스 */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                      disablePictureInPicture
                    />
                    {/* 정지 상태에서는 이미지로 보이도록 poster 오버레이 — 스크롤 시작 시 사라짐 */}
                    <img
                      src={posterSrc}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      style={{ opacity: scrollProgress > 0 ? 0 : 1, transition: 'opacity 0.3s ease-out', pointerEvents: 'none' }}
                    />
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(0,0,0,1)', opacity: 0.5 - scrollProgress * 0.3, transition: 'opacity 0.2s' }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(0,0,0,1)', opacity: 0.7 - scrollProgress * 0.3, transition: 'opacity 0.2s' }}
                    />
                  </div>
                )}
              </div>

              {/* 제목 오버레이 — 한 줄 고정, 스크롤 시작하면 서서히 사라짐 */}
              <div
                className="flex flex-col items-center justify-center text-center w-full relative z-10 px-4"
                style={{ gap: 10, opacity: textOpacity, transition: 'opacity 0.15s ease-out' }}
              >
                {title && (
                  <h2
                    style={{
                      fontFamily: 'var(--font-kr)',
                      fontWeight: 700,
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      fontSize: 'clamp(22px, 5.8vw, 54px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      textShadow: '0 2px 24px rgba(0,0,0,0.6)',
                      margin: 0,
                      transform: `translateY(-${scrollProgress * 30}px)`,
                    }}
                  >
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p
                    style={{
                      fontFamily: 'var(--font-kr)',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.92)',
                      fontSize: 'clamp(15px, 2.6vw, 24px)',
                      textShadow: '0 1px 14px rgba(0,0,0,0.55)',
                      margin: 0,
                    }}
                  >
                    {subtitle}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    style={{
                      fontFamily: 'var(--font-kr)',
                      color: 'rgba(255,255,255,0.78)',
                      fontSize: 'clamp(12px, 2vw, 15px)',
                      marginTop: 8,
                      textShadow: '0 1px 12px rgba(0,0,0,0.5)',
                    }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>

              {/* 사운드 토글 — 브라우저 자동재생 정책상 소리는 클릭으로 켜는 게 안정적 */}
              <button
                onClick={toggleSound}
                aria-label={soundOn ? '소리 끄기' : '소리 켜기'}
                style={{
                  position: 'absolute',
                  bottom: 28,
                  right: 28,
                  zIndex: 20,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.45)',
                  background: 'rgba(17,18,34,0.45)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  color: '#fff',
                  fontFamily: 'var(--font-kr)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>{soundOn ? '🔊' : '🔇'}</span>
                {soundOn ? '소리 켜짐' : '소리 켜기'}
              </button>
            </div>

            {/* 확장 완료 후 나타나는 콘텐츠 슬롯 */}
            <section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.7s ease-out' }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
