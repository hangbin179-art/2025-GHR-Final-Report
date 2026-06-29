import { useEffect, useRef, useState } from 'react'

// Scroll-expand hero — in the closed state only the background image is visible; once the
// user starts scrolling, the video begins playing from that point and the centre box
// expands to reveal it.
// Original (next/image + framer-motion + TSX) adapted to this project (Vite/JSX) using
// img + inline CSS transitions. (This project does not build Tailwind utilities, so the
// layout is handled entirely with inline styles.)
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
  const autoUnmuteTried = useRef(false)
  const [soundOn, setSoundOn] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  // Detect the reduced-motion setting — when enabled, disable scroll hijacking/expansion and show a static hero
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Try to turn the sound on when scrolling starts (a user gesture). If the browser blocks it, fall back to muted (can be enabled with the button).
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

  // 'Replay' after the video ends — rewind to the start and play again (keeping the current sound setting)
  const replayVideo = () => {
    const v = videoRef.current
    if (!v) return
    setVideoEnded(false)
    try { v.currentTime = 0 } catch (e) { /* noop */ }
    v.muted = !soundOn
    v.play().catch(() => {})
  }

  // Sound toggle button (an explicit user click guarantees sound playback)
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

  // Video playback control: play once scrolling starts (progress>0); when fully scrolled
  // back to the top, stop and rewind to the start, returning to the 'image' state.
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
    if (reduceMotion) return // Reduced motion: disable scroll hijacking (normal page scrolling)
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
  }, [scrollProgress, mediaFullyExpanded, touchStartY, reduceMotion])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // When a 'resetSection' event arrives from outside, return to the initial state.
  useEffect(() => {
    const onReset = () => {
      setScrollProgress(0)
      setShowContent(false)
      setMediaFullyExpanded(false)
    }
    window.addEventListener('resetSection', onReset)
    return () => window.removeEventListener('resetSection', onReset)
  }, [])

  // Always start at the very top (closed state) on mount — prevent browser scroll restoration.
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
    <div ref={sectionRef} className="cg-hero-cinematic" style={{ overflowX: 'hidden', transition: 'background-color 0.7s ease-in-out' }}>
      <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100dvh' }}>
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100dvh' }}>
          {/* Background image — gradually fades out as you scroll */}
          <div
            style={{ position: 'absolute', inset: 0, zIndex: 0, height: '100%', opacity: 1 - scrollProgress, transition: 'opacity 0.1s ease-out' }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,18,34,0.32)' }} />
            {/* Photo credit — bottom left of the main image */}
            <p style={{ position: 'absolute', left: 18, bottom: 16, margin: 0, zIndex: 1, fontFamily: 'var(--font-en)', fontSize: 11, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}>
              © World Vision / Jon Warren · Ethiopia 2025
            </p>
          </div>

          <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100dvh', position: 'relative' }}>
              {/* Expanding media box */}
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
                    {/* Poster overlay so it looks like an image while paused — disappears once scrolling starts */}
                    <img
                      src={posterSrc}
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, opacity: scrollProgress > 0 ? 0 : 1, transition: 'opacity 0.3s ease-out', pointerEvents: 'none' }}
                    />
                    <div
                      style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(0,0,0,1)', opacity: 0.5 - scrollProgress * 0.3, transition: 'opacity 0.2s' }}
                    />
                    {/* 'Replay' button after the video ends (the wrapper is pointer-events:none, so only the button is auto) */}
                    {videoEnded && scrollProgress > 0 && (
                      <button
                        onClick={replayVideo}
                        aria-label="Replay video"
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
                        Replay
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

              {/* Title overlay — fixed to one line, fades out gradually once scrolling starts */}
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

              {/* Sound toggle — given browser autoplay policies, enabling sound on click is the reliable approach */}
              <button
                onClick={toggleSound}
                aria-label={soundOn ? 'Mute' : 'Sound on'}
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
                {soundOn ? 'Mute' : 'Sound on'}
              </button>
            </div>

            {/* Content slot that appears after the box is fully expanded */}
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
