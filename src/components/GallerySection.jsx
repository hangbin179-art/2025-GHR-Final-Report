import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useIsMobile from '../lib/useIsMobile.js'

/* 활동별 색상 토큰 */
const ORANGE = 'var(--orange)'
const AMBER = '#C77E0A'
const GREEN = '#2F7D4F'
const RED = '#C8102E'
const TEAL = '#0E7C7B'

/*
 * 사진 교체/추가 방법:
 *   public/gallery/ 폴더에 사진을 넣고 PHOTOS 배열에 한 줄 추가하세요.
 *   P(pbas, 국가, CountryEn, 지역, 활동, 색상, 번호[, 장면])
 *   → src 는 /gallery/{pbas}-{번호}.jpg 로 자동 매핑됩니다.
 *   각 국가의 "첫 번째" 사진이 캐러셀(국가별 대표)로 노출되고,
 *   라이트박스(확대)에서는 전체 사진을 국가·지역·활동과 함께 넘겨봅니다.
 */
const P = (pbas, country, countryEn, site, activity, color, n, scene = '') => ({
  pbas, country, countryEn, site, activity, color, scene,
  src: `/gallery/${pbas}-${n}.jpg`,
  credit: `© World Vision · ${countryEn} 2025`,
})

const PHOTOS = [
  // 콩고민주공화국 (남부 키부 · 탕가니카)
  P('223847', '콩고민주공화국', 'DR Congo', '남부 키부', '일반식량 배분', ORANGE, 1, '식량 받아 가는 여성 수혜자'),
  P('223847', '콩고민주공화국', 'DR Congo', '남부 키부 카만욜라', '일반식량 배분', ORANGE, 2, '식량 포대 운반'),
  P('223847', '콩고민주공화국', 'DR Congo', '남부 키부', '영양 상담', RED, 3, '영양 민감 상담 현장'),
  P('223796', '콩고민주공화국', 'DR Congo', '탕가니카', '일반식량 배분', ORANGE, 1, '식량 지원 받은 여성'),
  // 수단 (남다르푸르 · 남코르도판)
  P('223711', '수단', 'Sudan', '남다르푸르', '일반식량 배분', ORANGE, 1, '곡물 계량 배분 현장'),
  P('223711', '수단', 'Sudan', '남다르푸르 오타시', '일반식량 배분', ORANGE, 2, '오타시 IDP 캠프 배분'),
  P('223711', '수단', 'Sudan', '남다르푸르', '일반식량 배분', ORANGE, 3, '트럭 반입 식량 배분 현장 (South Darfur)'),
  P('223745', '수단', 'Sudan', '남다르푸르', '영양 치료식', RED, 1, '치료식으로 회복한 쌍둥이 형제'),
  P('223745', '수단', 'Sudan', '남다르푸르', '영양 측정', RED, 2, '영유아 MUAC 측정'),
  P('223710', '수단', 'Sudan', '남코르도판', '일반식량 배분', ORANGE, 1, '알 아바시야 식량배분소(FDP)'),
  // 아프가니스탄 (고르 · 바드기스)
  P('223255', '아프가니스탄', 'Afghanistan', '고르·바드기스', '일반식량 배분', ORANGE, 1, '밀가루·식용유 배분'),
  P('223255', '아프가니스탄', 'Afghanistan', '고르·바드기스', '식량 배분', ORANGE, 2, '대규모 배분 현장 전경'),
  P('223255', '아프가니스탄', 'Afghanistan', '고르·바드기스', '식량 배분', ORANGE, 3, '식량 물자 배분'),
  P('223255', '아프가니스탄', 'Afghanistan', '고르·바드기스', '현금성 노동', GREEN, 4, '현금성 노동 자산 형성'),
  // 에티오피아 (티그라이 · 아파르 · 암하라)
  P('223707', '에티오피아', 'Ethiopia', '티그라이·아파르', '영양 치료식', RED, 1, '영양보충식 배분 현장'),
  P('223707', '에티오피아', 'Ethiopia', '티그라이·아파르', '영양 치료식', RED, 2, 'RUTF 영양치료식 배분'),
  P('223707', '에티오피아', 'Ethiopia', '티그라이·아파르', '영양 측정', RED, 3, '아동 영양상태(MUAC) 측정'),
  P('223707', '에티오피아', 'Ethiopia', '티그라이·아파르', '일반식량 배분', ORANGE, 4, '식량 배분 대기'),
  P('223707', '에티오피아', 'Ethiopia', '티그라이·아파르', '식량 보관', ORANGE, 5, '식량 보관소'),
  P('223707', '에티오피아', 'Ethiopia', '티그라이·아파르', '참여자 의견 청취', GREEN, 6, '수혜자 의견 청취'),
  // 우간다 (비디비디 · 로불레)
  P('223766', '우간다', 'Uganda', '비디비디·로불레', '일반식량 배분', ORANGE, 1, '곡물 계량 배분'),
  P('223766', '우간다', 'Uganda', '비디비디·로불레', '식량 배분', ORANGE, 2, '배분 대기 중인 여성들'),
  P('223766', '우간다', 'Uganda', '로불레', '식량 배분', ORANGE, 3, '실내 식량 배분소'),
  // 베네수엘라 (줄리아 · 팔콘) — 학교 급식
  P('223806', '베네수엘라', 'Venezuela', '줄리아·팔콘', '학교 급식', AMBER, 1, '학교 급식 현장'),
  P('223806', '베네수엘라', 'Venezuela', '줄리아·팔콘', '학교 급식', AMBER, 2, '아이들의 학교 급식 식사'),
  P('223806', '베네수엘라', 'Venezuela', '줄리아·팔콘', '학교 급식', AMBER, 3, '학교 급식 조리 준비'),
  // 남수단 (파쇼다 · 주바)
  P('223756', '남수단', 'South Sudan', '파쇼다·파니캉', '생계 역량 강화', GREEN, 1, '옥수수밭의 여성 농민'),
  P('223756', '남수단', 'South Sudan', '파쇼다', '생계 역량 강화', GREEN, 2, '수수밭 영농 지원'),
  P('223753', '남수단', 'South Sudan', '주바·얌비오', '학교 급식', AMBER, 1, '학교 텃밭 경작 실습'),
  P('223753', '남수단', 'South Sudan', '주바·얌비오', '학교 급식', AMBER, 2, '학생들의 텃밭 가꾸기'),
  // 방글라데시 (콕스바자르) — 로힝야 난민, 전자바우처(E-Voucher) 전용 사업 (식량 배분 아님, 바우처로 직접 구매)
  P('223748', '방글라데시', 'Bangladesh', '콕스바자르', '전자바우처', TEAL, 1, '전자바우처(E-Voucher) 발급·안내'),
  P('223748', '방글라데시', 'Bangladesh', '콕스바자르', '전자바우처', TEAL, 2, '우기철 바우처 구매 식품 운반'),
  P('223748', '방글라데시', 'Bangladesh', '콕스바자르', '전자바우처', TEAL, 3, '전자바우처 토큰 배부'),
  P('223748', '방글라데시', 'Bangladesh', '콕스바자르', '전자바우처', TEAL, 4, '전자바우처로 신선식품 직접 구매'),
  // 중앙아프리카공화국 (부아르 · 방가수)
  P('223999', '중앙아프리카공화국', 'CAR', '부아르·방가수', '현금 배분', TEAL, 1, '고첼레 현금 지원 배분'),
  P('223999', '중앙아프리카공화국', 'CAR', '부아르·방가수', '생계 역량 강화', GREEN, 2, '농로 복구 자재 전달'),
  P('223999', '중앙아프리카공화국', 'CAR', '응구얄리', '생계 역량 강화', GREEN, 3, '옥수수 수확·건조'),
  P('223999', '중앙아프리카공화국', 'CAR', '부아르·방가수', '현금 배분', TEAL, 4, '노동참여자 현금 수령'),
  // 케냐 (마쿠에니 · 키투이) — 생계 회복력
  P('223864', '케냐', 'Kenya', '마쿠에니·키투이', '생계 역량 강화', GREEN, 1, '과수 재배 농가의 결실'),
  P('223864', '케냐', 'Kenya', '마쿠에니·키투이', '생계 역량 강화', GREEN, 2, '염소 사육 자산 형성'),
  P('223864', '케냐', 'Kenya', '마쿠에니·키투이', '생계 역량 강화', GREEN, 3, '마을 저축그룹 모임'),
  P('223864', '케냐', 'Kenya', '마쿠에니·키투이', '생계 역량 강화', GREEN, 4, '과수원 관개 농업'),
  // 차드 (파르차나 외 5개 · 긴급 학교급식)
  P('223850', '차드', 'Chad', '파르차나 외', '긴급 학교급식', AMBER, 1, '학교 급식 현장'),
  P('223850', '차드', 'Chad', '파르차나 외', '긴급 학교급식', AMBER, 2, '학교 급식 조리'),
  P('223850', '차드', 'Chad', '파르차나 외', '긴급 학교급식', AMBER, 3, '학생 급식 배분'),
  // 콜롬비아 (바예델카우카 · 현금·바우처)
  P('223799', '콜롬비아', 'Colombia', '바예델카우카', '현금·바우처', TEAL, 1, '현금·바우처 배분 현장'),
  P('223799', '콜롬비아', 'Colombia', '바예델카우카', '참여자 확인', TEAL, 2, '수혜자 등록·확인'),
  // 미얀마 (북부 샨 · 긴급 현금)
  P('223982', '미얀마', 'Myanmar', '북부 샨', '긴급 현금 지원', TEAL, 1, '현금 지원 등록·배분 현장'),
]

const feat = (pbas) => PHOTOS.find((p) => p.pbas === pbas)
const pick = (src) => PHOTOS.find((p) => p.src === src)

/* 캐러셀 = 국가별 대표 1컷 · 13개국 순서 (13개국 전부 실사진) */
const CAROUSEL = [
  feat('223847'),                              // 콩고민주공화국
  feat('223711'),                              // 수단
  feat('223255'),                              // 아프가니스탄
  feat('223707'),                              // 에티오피아
  feat('223766'),                              // 우간다
  feat('223806'),                              // 베네수엘라
  pick('/gallery/223753-2.jpg'),               // 남수단 — 학생들의 텃밭 가꾸기
  feat('223850'),                              // 차드
  pick('/gallery/223748-4.jpg'),               // 방글라데시 — 전자바우처로 신선식품 구매
  feat('223799'),                              // 콜롬비아
  feat('223999'),                              // 중앙아프리카공화국
  feat('223982'),                              // 미얀마
  feat('223864'),                              // 케냐
]

function Arrow({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === 'prev' ? 'rotate(180deg)' : 'none' }}>
      <path d="M9 6 L15 12 L9 18" />
    </svg>
  )
}

// 국가별 미리보기 썸네일 카드 — 누르면 라이트박스로 크게
function Thumb({ s, onOpen }) {
  const [hover, setHover] = useState(false)
  const clickable = !!s.src
  return (
    <div
      onClick={clickable ? () => onOpen(s) : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', aspectRatio: '4 / 3', borderRadius: 10, overflow: 'hidden',
        border: '1px solid var(--field-200)', background: 'var(--field-50)',
        cursor: clickable ? 'zoom-in' : 'default',
        transform: hover && clickable ? 'translateY(-3px)' : 'none',
        boxShadow: hover && clickable ? '0 10px 28px rgba(17,18,34,0.18)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {s.src ? (
        <img
          src={s.src}
          alt={`${s.country} ${s.site}`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hover && clickable ? 'scale(1.06)' : 'none', transition: 'transform 0.4s ease' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 8 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--field-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: 0, textAlign: 'center' }}>사진 준비 중</p>
        </div>
      )}

      {/* 확대 힌트 아이콘 */}
      {clickable && (
        <div style={{ position: 'absolute', top: 10, right: 10, width: 26, height: 26, borderRadius: '50%', background: 'rgba(17,18,34,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
        </div>
      )}

      {/* Caption overlay */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 12px 10px', background: s.src ? 'linear-gradient(to top, rgba(17,18,34,0.85), rgba(17,18,34,0))' : 'none' }}>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-en)', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', background: s.color, padding: '2px 6px', borderRadius: 3, marginBottom: 6 }}>
          {s.activity}
        </span>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 14, color: s.src ? '#fff' : 'var(--midnight)', margin: 0, lineHeight: 1.25, textShadow: s.src ? '0 1px 6px rgba(0,0,0,0.5)' : 'none' }}>
          {s.country}
        </p>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 500, fontSize: 11, color: s.src ? 'rgba(255,255,255,0.8)' : 'var(--grey-500)', margin: '1px 0 0', lineHeight: 1.2, textShadow: s.src ? '0 1px 4px rgba(0,0,0,0.5)' : 'none' }}>
          {s.site}
        </p>
      </div>
    </div>
  )
}

function Lightbox({ slides, idx, setIdx, onClose }) {
  const n = slides.length
  const s = slides[idx]
  const [zoom, setZoom] = useState(false)
  const [portrait, setPortrait] = useState(false)
  useEffect(() => { setZoom(false) }, [idx])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + n) % n)
      else if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % n)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [n, onClose, setIdx])

  if (!s) return null
  const navBtn = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 48, height: 48, borderRadius: '50%',
    background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', zIndex: 5,
  }
  return createPortal(
    <div onClick={onClose} role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, zIndex: 4000,
      background: 'rgba(8,9,18,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, cursor: 'zoom-out',
    }}>
      <button aria-label="닫기" onClick={onClose} style={{
        position: 'absolute', top: 20, right: 20, width: 46, height: 46, borderRadius: '50%',
        background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)',
        color: '#fff', fontSize: 20, lineHeight: 1, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>✕</button>
      {n > 1 && <button aria-label="이전 사진" onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + n) % n) }} style={{ ...navBtn, left: 20 }}><Arrow dir="prev" /></button>}
      {n > 1 && <button aria-label="다음 사진" onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % n) }} style={{ ...navBtn, right: 20 }}><Arrow dir="next" /></button>}
      <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}>
        <div style={{ overflow: zoom ? 'auto' : 'visible', maxWidth: '94vw', maxHeight: zoom ? '78vh' : 'none', borderRadius: 8, boxShadow: zoom ? '0 16px 50px rgba(0,0,0,0.55)' : 'none' }}>
          <img
            src={s.src}
            alt={`${s.country} ${s.site}`}
            onLoad={(e) => setPortrait(e.target.naturalHeight > e.target.naturalWidth)}
            onClick={(e) => { e.stopPropagation(); setZoom((z) => !z) }}
            style={zoom
              ? { display: 'block', height: '140vh', width: 'auto', maxWidth: 'none', cursor: 'zoom-out' }
              : { display: 'block', maxWidth: '90vw', maxHeight: portrait ? '74vh' : '62vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 16px 50px rgba(0,0,0,0.55)', cursor: 'zoom-in' }}
          />
        </div>
        <figcaption style={{ marginTop: 16, textAlign: 'center', maxWidth: '88vw' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', background: s.color, padding: '3px 8px', borderRadius: 4, marginBottom: 8 }}>{s.activity}</span>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 18, color: '#fff', margin: 0 }}>{s.country} · {s.site}</p>
          {s.scene && <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '6px 0 0' }}>{s.scene}</p>}
          {s.credit && <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '6px 0 0' }}>{s.credit}</p>}
          <p className="tnum" style={{ fontFamily: 'var(--font-en)', fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '8px 0 0' }}>{idx + 1} / {n}</p>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: '6px 0 0' }}>
            {zoom ? '사진을 클릭하면 축소 · 스크롤로 상하좌우 이동' : '사진을 클릭하면 확대해서 자세히 볼 수 있어요'}
          </p>
        </figcaption>
      </figure>
    </div>,
    document.body
  )
}

export default function GallerySection() {
  const isMobile = useIsMobile()
  const [zoomIdx, setZoomIdx] = useState(null)
  const photoCount = CAROUSEL.filter((s) => s.src).length

  return (
    <section id="sec-gallery" style={{ background: '#fff', borderTop: '1px solid var(--field-200)', borderBottom: '1px solid var(--field-200)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>05 — Gallery</p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>현장의 기록</p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '24ch' }}>
              숫자 뒤의 사람들.<br />사업 현장을 사진으로 만납니다.
            </h2>
          </div>
        </div>

        {/* 국가별 미리보기 그리드 — 누르면 라이트박스로 크게 */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))', gap: isMobile ? 10 : 16 }}>
          {CAROUSEL.map((s) => (
            <Thumb key={s.src || `ph-${s.country}`} s={s} onOpen={(slide) => setZoomIdx(PHOTOS.indexOf(slide))} />
          ))}
        </div>

        {/* Hint — 전체 사진 안내 */}
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--grey-600)', margin: '20px 0 0', lineHeight: 1.6 }}>
          국가별 <strong style={{ color: 'var(--midnight)' }}>대표 사진 {photoCount}컷</strong>입니다. 사진을 누르면 크게 보이고, 좌우 화살표·키보드로 전체 <strong style={{ color: 'var(--orange)' }}>{PHOTOS.length}장</strong>을 지역·활동과 함께 넘겨볼 수 있어요. 확대 상태에서는 스크롤로 세부를 살펴볼 수 있습니다.
        </p>
      </div>

      {zoomIdx !== null && (
        <Lightbox slides={PHOTOS} idx={zoomIdx} setIdx={setZoomIdx} onClose={() => setZoomIdx(null)} />
      )}
    </section>
  )
}
