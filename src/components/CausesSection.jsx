import useIsMobile from '../lib/useIsMobile.js'

export default function CausesSection() {
  const isMobile = useIsMobile()
  return (
    <section id="sec-causes" style={{
      background: '#fff',
      borderTop: '1px solid var(--field-200)',
      borderBottom: '1px solid var(--field-200)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 32px' }}>
        {/* Section header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '240px 1fr',
          gap: isMobile ? 16 : 48,
          marginBottom: isMobile ? 32 : 48,
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-en)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
              margin: 0,
            }}>
              01 — Why
            </p>
            <p lang="ko" style={{
              fontFamily: 'var(--font-kr)',
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--grey-600)',
              margin: '4px 0 0',
            }}>
              식량위기의 원인 및 영향
            </p>
          </div>
          <div>
            <h2 lang="ko" style={{
              fontFamily: 'var(--font-kr)',
              fontWeight: 700,
              fontSize: 'clamp(27px, 3.3vw, 36px)',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: 'var(--midnight)',
              margin: 0,
              maxWidth: 'none',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}>
              왜 세계는 아직도 굶주리는가.<br />
              한 가지 원인이 아닌, 세 개의 충돌입니다.
            </h2>
          </div>
        </div>

        {/* 3-col card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {/* Conflict */}
          <article style={{
            background: 'var(--field-50)',
            border: '1px solid var(--field-200)',
            borderRadius: 12,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            minHeight: 320,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontFamily: 'var(--font-en)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--red-800)',
                background: 'var(--red-100)',
                padding: '5px 10px',
                borderRadius: 999,
              }}>
                Conflict
              </span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red-800)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                <line x1="13" y1="19" x2="19" y2="13" />
                <line x1="16" y1="16" x2="20" y2="20" />
                <line x1="19" y1="21" x2="21" y2="19" />
              </svg>
            </div>
            <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 22, color: 'var(--midnight)', margin: 0 }}>
              분쟁 및 불안정
            </h3>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
              콩고민주공화국·수단 등 내전이 장기화되며 대규모 난민이<br />발생합니다.
              분쟁은 이주 → 인프라·시장 붕괴 → 지원 불안정 → 식량위기 심화의
              악순환을 만듭니다.
            </p>
            <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="num" style={{ fontSize: 42, color: 'var(--red-800)' }}>
                15<span style={{ fontSize: 24, color: 'var(--grey-500)' }}>/16</span>
              </span>
              <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
                2025 주요 식량위기국 중<br />분쟁을 겪는 국가
              </span>
            </div>
          </article>

          {/* Climate */}
          <article style={{
            background: 'var(--field-50)',
            border: '1px solid var(--field-200)',
            borderRadius: 12,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            minHeight: 320,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontFamily: 'var(--font-en)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--blue-900)',
                background: 'var(--blue-100)',
                padding: '5px 10px',
                borderRadius: 999,
              }}>
                Climate
              </span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
                <path d="M16 14v6" /><path d="M8 14v6" /><path d="M12 16v6" />
              </svg>
            </div>
            <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 22, color: 'var(--midnight)', margin: 0 }}>
              기후변화
            </h3>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
              잦은 가뭄과 홍수, 불규칙한 날씨가 흉작과 농업 피해로 이어집니다.
              기후 충격은 취약 지역의 식량 생산성을 직접적으로 떨어뜨립니다.
            </p>
            <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 30, color: 'var(--blue-900)', letterSpacing: '-0.02em' }}>
                가뭄·홍수
              </span>
              <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
                흉작과<br />농업 피해의 주된 원인
              </span>
            </div>
          </article>

          {/* Economic */}
          <article style={{
            background: 'var(--field-50)',
            border: '1px solid var(--field-200)',
            borderRadius: 12,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            minHeight: 320,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontFamily: 'var(--font-en)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--orange-900)',
                background: 'var(--orange-100)',
                padding: '5px 10px',
                borderRadius: 999,
              }}>
                Economic
              </span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                <polyline points="16 17 22 17 22 11" />
              </svg>
            </div>
            <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 22, color: 'var(--midnight)', margin: 0 }}>
              경제적 충격
            </h3>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
              고물가와 식량 가격 폭등으로 취약계층의 구매력이 무너집니다.
              수요는 늘지만 인도적지원 자금은 줄어, 배급량이 하루 권장 칼로리의
              50% 미만까지 축소되기도 합니다.
            </p>
            <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="num" style={{ fontSize: 42, color: 'var(--orange-900)' }}>
                &lt;50<span style={{ fontSize: 24 }}>%</span>
              </span>
              <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
                축소된 배급량<br />(권장 칼로리 대비)
              </span>
            </div>
          </article>
        </div>

        {/* ── 식량위기의 영향: 아동에게 드리운 그늘 (WFP×WV In the Shadow of Hunger, 2026) ── */}
        <div style={{ marginTop: isMobile ? 48 : 72 }}>
          {/* Sub-header */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: isMobile ? 24 : 36 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>
                Impact on Children
              </p>
              <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>
                아동에게 드리운 그늘
              </p>
            </div>
            <div>
              <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--midnight)', margin: 0 }}>
                위기가 깊어질수록, 그 그늘은 아이들에게 가장 먼저 드리워집니다.
              </h3>
              <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.7, color: 'var(--grey-600)', margin: '12px 0 0' }}>
                WFP와 월드비전이 8개 식량위기국에서 함께 수행한 공동연구 「In the Shadow of Hunger」(2026)는,
                식량 불안정과 배급 삭감이 아동에게 남기는 충격을 분석했습니다.
              </p>
            </div>
          </div>

          {/* 3-col impact card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            <ImpactCard
              eyebrow="Education"
              accent="var(--orange-900)"
              accentBg="var(--orange-100)"
              title="교육의 중단"
              body="끼니가 줄면 아이들이 가계를 보조하기 위해 학교를 떠납니다. 결석과 중도 포기가 늘고, 일부는 구걸과 노동으로 내몰립니다."
              stat="학교 → 노동"
              statLabel={<>생계 보조에 동원되어<br />잃어버리는 배움</>}
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>}
            />
            <ImpactCard
              eyebrow="Protection"
              accent="var(--red-800)"
              accentBg="var(--red-100)"
              title="조혼과 가족 분리"
              body="생계가 무너진 가정은 입을 줄이려 아이를 일찍 결혼시키거나, 가족이 뿔뿔이 흩어집니다. 아동을 지키던 보호망이 가장 먼저 끊깁니다."
              stat="약 2배"
              statLabel={<>배급이 삭감된 가구 아동의<br />조혼·가족 분리 등 위험</>}
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" /><path d="m12 5-2 6h3l-2 6" /></svg>}
            />
            <ImpactCard
              eyebrow="Mental Health"
              accent="var(--blue-900)"
              accentBg="var(--blue-100)"
              title="정신건강의 위기"
              body="굶주림과 불확실성은 아이들의 마음에 깊은 불안을 남깁니다. 가정 내 스트레스가 커지며 우울과 학대 위험도 함께 높아집니다."
              stat="불안 · 우울"
              statLabel={<>굶주림과 불안정이 남기는<br />정신적 충격과 학대 위험</>}
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactCard({ eyebrow, accent, accentBg, title, body, stat, statLabel, icon }) {
  return (
    <article style={{
      background: 'var(--field-50)',
      border: '1px solid var(--field-200)',
      borderRadius: 12,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      minHeight: 300,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: 'var(--font-en)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: accent,
          background: accentBg,
          padding: '5px 10px',
          borderRadius: 999,
        }}>
          {eyebrow}
        </span>
        <span style={{ color: accent, display: 'inline-flex' }}>{icon}</span>
      </div>
      <h4 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 20, color: 'var(--midnight)', margin: 0 }}>
        {title}
      </h4>
      <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
        {body}
      </p>
      <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 28, color: accent, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
          {stat}
        </span>
        <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
          {statLabel}
        </span>
      </div>
    </article>
  )
}
