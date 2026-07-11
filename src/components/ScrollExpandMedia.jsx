import { useEffect, useRef, useState } from 'react'

// 스크롤 확장 히어로 — 닫힌 상태에서는 배경 이미지만 보이다가, 스크롤을
// 시작하면 그 시점부터 영상이 재생되며 가운데 박스가 확장되어 드러난다.
// 원본(next/image + framer-motion + TSX)을 이 프로젝트(Vite/JSX)에 맞춰
// img + 인라인 CSS 트랜지션으로 어댑트. (이 프로젝트는 Tailwind 유틸리티를
// 빌드하지 않으므로 레이아웃은 전부 인라인 스타일로 둔다.)
export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  midline,
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
  const progressRef = useRef(0) // 최신 진행률 — 빠른 연속 휠/터치 이벤트에서 stale state로 델타가 유실되지 않도록 ref로 누적
  const autoUnmuteTried = useRef(false)
  const [soundOn, setSoundOn] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  // 모션 최소화 설정 감지 — 켜져 있으면 스크롤 하이재킹/확장을 비활성화하고 정적 히어로로 표시
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

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

  // 영상이 끝난 뒤 '다시 보기' — 처음으로 되감아 다시 재생(현재 소리 설정 유지)
  const replayVideo = () => {
    const v = videoRef.current
    if (!v) return
    setVideoEnded(false)
    try { v.currentTime = 0 } catch (e) { /* noop */ }
    v.muted = !soundOn
    v.play().catch(() => {})
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
    progressRef.current = 0
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
      setVideoEnded(false)
    }
  }, [scrollProgress])

  useEffect(() => {
    if (reduceMotion) return // 모션 최소화: 스크롤 하이재킹 비활성화 (페이지 정상 스크롤)

    // 진행률 누적 — state 대신 ref 기준으로 계산해, 렌더 사이에 몰려온
    // 휠/터치 이벤트의 델타가 유실(stale closure)되지 않게 한다.
    const applyDelta = (delta) => {
      const next = Math.min(Math.max(progressRef.current + delta, 0), 1)
      progressRef.current = next
      setScrollProgress(next)
      if (next >= 1) {
        setMediaFullyExpanded(true)
        setShowContent(true)
      } else if (next < 0.75) {
        setShowContent(false)
      }
    }

    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        tryAutoUnmute()
        applyDelta(e.deltaY * 0.0009)
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
        applyDelta(deltaY * scrollFactor)
        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = () => {
      setTouchStartY(0)
    }

    // 키보드 스크롤(Space/PageDown/방향키/End)도 확장을 진행시킨다 —
    // 이전에는 wheel/touch만 인식해 키보드·스크롤바 사용자가 히어로에 갇혔음.
    const KEY_DELTAS = { ' ': 0.2, PageDown: 0.25, ArrowDown: 0.12, PageUp: -0.25, ArrowUp: -0.12 }
    const handleKeyDown = (e) => {
      if (mediaFullyExpanded) return
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key === 'End') {
        e.preventDefault()
        tryAutoUnmute()
        applyDelta(1)
        return
      }
      const d = KEY_DELTAS[e.key]
      if (d === undefined) return
      e.preventDefault()
      tryAutoUnmute()
      applyDelta(d)
    }

    // 스크롤바 드래그 등 wheel/키보드가 아닌 스크롤: 최상단으로 되돌리는 대신
    // 스크롤량을 진행률로 환산해 반영 — 어떤 입력으로도 지나갈 수 있게.
    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        const y = window.scrollY
        if (y > 0) {
          applyDelta(y * 0.0025)
          window.scrollTo(0, 0)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [mediaFullyExpanded, touchStartY, reduceMotion])

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
      progressRef.current = 0
      setScrollProgress(0)
      setShowContent(false)
      setMediaFullyExpanded(false)
    }
    window.addEventListener('resetSection', onReset)
    return () => window.removeEventListener('resetSection', onReset)
  }, [])

  // 마운트 시 항상 최상단(닫힌 상태)에서 시작 — 브라우저 스크롤 복원 방지.
  // 단, 앵커 해시(#sec-…)로 직접 들어온 경우엔 히어로를 건너뛰어
  // 공유받은 섹션 링크가 최상단으로 끌려오지 않게 한다.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      progressRef.current = 1
      setScrollProgress(1)
      setMediaFullyExpanded(true)
      setShowContent(true)
      return
    }
    window.scrollTo(0, 0)
  }, [])

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250)
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400)
  const textOpacity = Math.max(1 - scrollProgress * 1.3, 0)

  return (
    <div ref={sectionRef} className="cg-hero-cinematic" style={{ overflowX: 'hidden', transition: 'background-color 0.7s ease-in-out' }}>
      <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100dvh' }}>
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100dvh' }}>
          {/* Background image — 스크롤할수록 서서히 사라짐 */}
          <div
            style={{ position: 'absolute', inset: 0, zIndex: 0, height: '100%', opacity: 1 - scrollProgress, transition: 'opacity 0.1s ease-out' }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,18,34,0.32)' }} />
            {/* 사진 크레딧 — 메인 이미지 좌측 하단 */}
            <p style={{ position: 'absolute', left: 18, bottom: 16, margin: 0, zIndex: 1, fontFamily: 'var(--font-en)', fontSize: 11, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}>
              © World Vision / Jon Warren · Ethiopia 2025
            </p>
          </div>

          <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100dvh', position: 'relative' }}>
              {/* 확장되는 미디어 박스 */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 0,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: 16,
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      muted
                      playsInline
                      preload="auto"
                      onEnded={() => setVideoEnded(true)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }}
                      controls={false}
                      disablePictureInPicture
                    />
                    {/* 정지 상태에서는 이미지로 보이도록 poster 오버레이 — 스크롤 시작 시 사라짐 */}
                    <img
                      src={posterSrc}
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, opacity: scrollProgress > 0 ? 0 : 1, transition: 'opacity 0.3s ease-out', pointerEvents: 'none' }}
                    />
                    <div
                      style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(0,0,0,1)', opacity: 0.5 - scrollProgress * 0.3, transition: 'opacity 0.2s' }}
                    />
                    {/* 영상 종료 후 '다시 보기' 버튼 (래퍼가 pointer-events:none 이라 버튼만 auto) */}
                    {videoEnded && scrollProgress > 0 && (
                      <button
                        onClick={replayVideo}
                        aria-label="영상 다시 보기"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'auto',
                          zIndex: 5,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 9,
                          padding: '13px 24px',
                          borderRadius: 999,
                          border: '1px solid rgba(255,255,255,0.55)',
                          background: 'rgba(17,18,34,0.55)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          color: '#fff',
                          fontFamily: 'var(--font-kr)',
                          fontSize: 15,
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
                        }}
                      >
                        <span style={{ fontSize: 18, lineHeight: 1 }}>↻</span>
                        다시 보기
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }}
                    />
                    <div
                      style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(0,0,0,1)', opacity: 0.7 - scrollProgress * 0.3, transition: 'opacity 0.2s' }}
                    />
                  </div>
                )}
              </div>

              {/* 제목 오버레이 — 한 줄 고정, 스크롤 시작하면 서서히 사라짐 */}
              <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', position: 'relative', zIndex: 10, paddingLeft: 16, paddingRight: 16, gap: 10, opacity: textOpacity, transition: 'opacity 0.15s ease-out' }}
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
                {midline && (
                  <p
                    style={{
                      fontFamily: 'var(--font-kr)',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: 'clamp(16px, 3.4vw, 30px)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      textShadow: '0 1px 16px rgba(0,0,0,0.55)',
                      margin: 0,
                      transform: `translateY(-${scrollProgress * 24}px)`,
                    }}
                  >
                    {midline}
                  </p>
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
                {scrollToExpand && !reduceMotion && (
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
              style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '40px 32px', opacity: showContent ? 1 : 0, transition: 'opacity 0.7s ease-out' }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
