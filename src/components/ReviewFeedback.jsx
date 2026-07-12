import { useEffect, useRef, useState } from 'react'

// 리뷰 모드 전용 — 섹션별 수정 제안 버튼.
// 주소에 ?review 를 붙여 열었을 때만 표시된다 (예: https://…vercel.app/?review).
// 후원자용 기본 링크에서는 아무것도 렌더하지 않아 발행물 미학을 해치지 않는다.
// 버튼 → 섹션 선택 → 담당자 앞으로 제목·양식이 채워진 메일 초안이 열린다(mailto, 서버 불필요).

const IS_REVIEW =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('review')

const CONTACT = 'hangbin_cho@worldvision.or.kr' // 푸터 공식 문의 주소와 동일

const SECTIONS = [
  '표지 · 히어로',
  '01 원인 및 영향',
  '02 현장 지도 · 국가별 현황',
  '03 핵심 활동',
  '04 성과',
  '05 갤러리',
  '기타 · 페이지 전체',
]

function mailtoFor(label) {
  const subject = `[대시보드 수정요청] ${label}`
  const body = [
    `■ 요청 섹션: ${label}`,
    '■ 요청 유형: 추가 / 삭제 / 수정  (해당 없는 항목은 지워주세요)',
    '',
    '■ 요청 내용:',
    '(원하시는 변경을 자세히 적어주세요. 스크린샷 첨부 환영합니다!)',
    '',
    '■ 요청자 (이름 / 팀):',
    '',
    `— 요청 대상 페이지: ${window.location.origin}${window.location.pathname}`,
  ].join('\n')
  return `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ReviewFeedback() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  // Esc·바깥 클릭으로 패널 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  if (!IS_REVIEW) return null

  return (
    <div ref={rootRef} style={{ position: 'fixed', left: 20, bottom: 20, zIndex: 2500 }}>
      {/* 섹션 선택 패널 */}
      {open && (
        <div
          role="dialog"
          aria-label="수정 제안 보내기"
          style={{
            position: 'absolute',
            left: 0,
            bottom: 'calc(100% + 10px)',
            width: 'min(320px, calc(100vw - 40px))',
            background: '#fff',
            border: '1px solid var(--field-200)',
            borderRadius: 12,
            boxShadow: '0 16px 48px rgba(17,18,34,0.22)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--field-100)' }}>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--midnight)', margin: 0 }}>
              어느 부분에 대한 제안인가요?
            </p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, color: 'var(--grey-500)', margin: '4px 0 0', lineHeight: 1.5 }}>
              선택하면 담당자에게 보낼 메일 초안이 열립니다.
            </p>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: '6px 0' }}>
            {SECTIONS.map((label) => (
              <li key={label}>
                <a
                  href={mailtoFor(label)}
                  onClick={() => setOpen(false)}
                  lang="ko"
                  style={{
                    display: 'block',
                    padding: '9px 16px',
                    fontFamily: 'var(--font-kr)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--grey-800)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--orange-100)'; e.currentTarget.style.color = 'var(--orange-900)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--grey-800)' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 토글 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="대시보드 수정 제안 보내기"
        lang="ko"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 18px',
          borderRadius: 999,
          border: 'none',
          background: open ? 'var(--midnight)' : 'var(--orange)',
          color: '#fff',
          fontFamily: 'var(--font-kr)',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(17,18,34,0.28)',
          transition: 'background 0.2s ease',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1 }}>{open ? '✕' : '✏️'}</span>
        {open ? '닫기' : '수정 제안'}
      </button>
    </div>
  )
}
