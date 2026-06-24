import ScrollReveal from './ScrollReveal.jsx'

import useIsMobile from '../lib/useIsMobile.js'

const AMBER = '#C77E0A'      // school feeding accent (legible amber)
const AMBER_BG = '#FBF1DC'
const GREEN = '#2F7D4F'      // livelihoods accent
const GREEN_BG = '#E6F0E9'

/* ── Shared photo placeholder ───────────────────────────── */
export function PhotoSlot({ caption, ratio = '4/3', accent, src }) {
  return (
    <div>
      {src ? (
        <img
          src={src}
          alt={caption || ''}
          loading="lazy"
          style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', borderRadius: 12, display: 'block', border: '1px solid var(--field-200)' }}
        />
      ) : (
      <div style={{
        width: '100%',
        aspectRatio: ratio,
        background: 'var(--field-50)',
        border: '2px dashed var(--field-300)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={accent || 'var(--grey-600)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p style={{ fontFamily: 'var(--font-en)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: 0 }}>
          Photo Placeholder
        </p>
      </div>
      )}
      {caption && (
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', margin: '10px 0 0', lineHeight: 1.6 }}>
          {caption}
        </p>
      )}
    </div>
  )
}

/* ── Quote block ────────────────────────────────────────── */
export function Quote({ text, source, accent }) {
  return (
    <blockquote style={{
      margin: '20px 0 0',
      paddingLeft: 20,
      borderLeft: `3px solid ${accent}`,
    }}>
      <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 17, lineHeight: 1.7, color: 'var(--midnight)', fontWeight: 500, margin: 0, wordBreak: 'keep-all' }}>
        “{text}”
      </p>
      <footer style={{ fontFamily: 'var(--font-kr)', fontSize: 12, fontWeight: 600, color: 'var(--grey-600)', marginTop: 10 }}>
        — {source}
      </footer>
    </blockquote>
  )
}

/* ── KPI chip ───────────────────────────────────────────── */
function StatChip({ value, unit, label, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <p className="num tnum" style={{ fontSize: 30, color: accent, margin: 0, lineHeight: 1 }}>
        {value}
        {unit && <span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 600, fontSize: 13, color: 'var(--grey-600)', marginLeft: 3 }}>{unit}</span>}
      </p>
      <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-600)', margin: '8px 0 0', lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

/* ── Section number header (matches 01–03 editorial rows) ── */
function PartHeader({ num, title, titleEn, accent }) {
  const isMobile = useIsMobile()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? 8 : 48, alignItems: 'start', marginBottom: isMobile ? 20 : 36 }}>
      <p className="num" style={{ fontSize: 88, lineHeight: 0.85, color: accent, margin: 0, letterSpacing: '-0.04em' }}>{num}</p>
      <div>
        <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>{titleEn}</p>
      </div>
    </div>
  )
}

export default function NarrativePrograms() {
  const isMobile = useIsMobile()
  return (
    <div style={{ marginTop: 24 }}>

      {/* ════════ 04 — 학교 급식 ════════ */}
      <ScrollReveal from="right">
      <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
        <PartHeader num="04" title="학교 급식" titleEn="Home-Grown School Feeding" accent={AMBER} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? 0 : 48 }}>
          <div />
          <div>
            {/* Intro + lead stats */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
              <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.85, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                자립형 학교급식(Home-Grown School Feeding)은 끼니를 주는 데서 멈추지 않습니다. 학교가 직접 작물을
                기르고, 학생이 그 기술을 집으로 가져갑니다. 남수단 <strong style={{ color: 'var(--midnight)' }}>주바·얌비오 자립형 학교급식 사업</strong>은
                중앙적도주 21개 초등학교의 13,000여 명에게 급식을 제공하면서, 학교 텃밭을 통한 농업 교육을 결합했습니다.
                2025년 한 해 동안 총 75,550명이 수혜를 받았습니다.
              </p>
              <div style={{
                background: AMBER_BG,
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                gap: 20,
              }}>
                <StatChip value="21" unit="개교" label="중앙적도주 초등학교" accent={AMBER} />
                <StatChip value="75,550" unit="명" label="2025년 누적 수혜자" accent={AMBER} />
              </div>
            </div>

            {/* Field story — Kapuri */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.85fr 1fr', gap: isMobile ? 20 : 40, marginTop: 36, alignItems: 'start' }}>
              <PhotoSlot accent={AMBER} src="/gallery/223753-1.jpg" caption="남수단 주바 자립형 학교급식 사업 — 학생들이 교사와 함께 학교 텃밭을 일구는 모습." />
              <div>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER, margin: '0 0 12px' }}>
                  Field Story · 카푸리 초등학교
                </p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 15, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  4학년 <strong style={{ color: 'var(--midnight)' }}>키덴(13세)</strong>과 <strong style={{ color: 'var(--midnight)' }}>야와(12세)</strong>는
                  학교 텃밭에서 토지 준비·묘판 만들기·이식·작물 윤작·잡초 제거·관개법을 배웠습니다. 두 학생은 배운 기술을
                  집으로 가져가 부모와 함께 <strong style={{ color: AMBER }}>동부콩·오크라·토마토</strong>를 심었습니다.
                  가족은 3~4일마다 수확물을 거뒀고, 일부는 직접 먹고 일부는 시장에 내다 팔았습니다. 하루 판매 수익은
                  3만~3만 5천 남수단파운드(약 5~6 USD). 아버지 마이클 수바 씨는 이 돈으로 아이들의 학용품을 사고 학교
                  발전기금을 냈습니다.
                </p>
                <Quote
                  accent={AMBER}
                  text="일자리가 없는 제게, 시장에서 채소를 팔아 버는 돈이 아이들 책을 사고 학교에 내는 돈의 전부입니다."
                  source="마이클 수바 · 카푸리 마을, 두 학생의 아버지"
                />
              </div>
            </div>

            {/* School gardens — aggregate harvest & income */}
            <div style={{ marginTop: 36, paddingTop: 32, borderTop: '1px solid var(--field-200)' }}>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER, margin: '0 0 16px' }}>
                School Gardens · 학교 텃밭의 결실
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  WFP 배급에 학교가 직접 기른 채소를 더했습니다. 주바 카운티 <strong style={{ color: 'var(--midnight)' }}>목표 21개교 중 20개교</strong>에
                  텃밭을 조성하고 종자·농기구를 지원해 토마토·가지·오크라·옥수수 등을 재배했습니다. 수확물 대부분은 학생
                  급식으로 돌아갔고, 그중 <strong style={{ color: AMBER }}>316kg을 시장에 팔아 약 40만 남수단파운드(약 70 USD)</strong>를
                  학교 운영비에 보탰습니다. 일례로 나바구 초등학교는 옥수수 750kg을 거둬 550kg은 급식에, 200kg은 판매에 썼습니다.
                </p>
                <div style={{ background: AMBER_BG, borderRadius: 12, padding: 24, display: 'flex', gap: 20 }}>
                  <StatChip value="2,269" unit="kg" label="학교 텃밭 총 수확량" accent={AMBER} />
                  <StatChip value="1,403" unit="kg" label="교내 급식으로 소비" accent={AMBER} />
                </div>
              </div>
            </div>

            {/* Secondary — Chad */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--field-200)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', border: '1px solid var(--field-200)', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                차드 · 파르차나 외
              </span>
              <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, wordBreak: 'keep-all' }}>
                차드 동부(아베셰·파르차나·게레다·고즈베이다·이리바)에서는 <strong style={{ color: 'var(--midnight)' }}>긴급 학교급식(Emergency School Feeding)</strong>을
                현금 배분 방식으로 운영했습니다. 식량 보관 창고를 건립해 우기에도 안정적으로 급식을 공급할 수 있는
                공급망을 구축했습니다.
              </p>
            </div>
          </div>
        </div>
      </article>
      </ScrollReveal>

      {/* ════════ 05 — 생계 역량 강화 ════════ */}
      <ScrollReveal from="left">
      <article style={{ padding: '40px 0 8px' }}>
        <PartHeader num="05" title="생계 역량 강화" titleEn="Livelihoods & Resilience" accent={GREEN} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? 0 : 48 }}>
          <div />
          <div>
            {/* Intro + lead stats */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
              <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.85, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                식량을 나눠주는 것을 넘어, 스스로 벌 수 있게 합니다. 케냐 <strong style={{ color: 'var(--midnight)' }}>마쿠에니·키투이
                지속가능 식량체계 사업</strong>은 가뭄이 잦은 건조·반건조 지역에서 식량을 직접 배분하지 않는
                ‘비식량’ 사업으로 설계되었습니다. 빈곤율이 각각 64.1%, 63.1%에 달하는 두 카운티에서 11,306명이
                마을저축그룹(VSLA)에 참여해 저축·소액대출·소득창출 기회를 얻었습니다.
              </p>
              <div style={{
                background: GREEN_BG,
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                gap: 20,
              }}>
                <StatChip value="11,306" unit="명" label="마을저축그룹 참여 주민 (케냐)" accent={GREEN} />
                <StatChip value="0.5→3" unit="ha" label="경작지 확대 (중앙아프리카 자루아)" accent={GREEN} />
              </div>
            </div>

            {/* Two story cards side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 28 : 32, marginTop: 36 }}>

              {/* Kenya SFSP */}
              <div>
                <PhotoSlot ratio="16/10" accent={GREEN} src="/gallery/223864-2.jpg" caption="마쿠에니·키투이 회복력 사업 — 염소 사육으로 자산을 형성한 수혜자." />
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, margin: '16px 0 10px' }}>
                  Kenya · 마쿠에니 · 키투이
                </p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  주민들은 <strong style={{ color: GREEN }}>녹두·동부콩·기장·수수</strong> 같은 가뭄 저항성 작물을 재배하고,
                  기후스마트 농업과 가금류·염소 사육 기술을 익혔습니다. <strong style={{ color: 'var(--midnight)' }}>R4 회복력 강화 프로그램(R4 Rural Resilience Initiative)</strong>을 통해 작물 보험에 가입해 가뭄·홍수·병충해 손실을 보상받게 되었습니다. 이 경제적 완충장치는
                  가정의 구매력을 높여 아이들의 영양·교육·의료 지출을 안정적으로 감당하게 했습니다.
                </p>
              </div>

              {/* CAR FFA */}
              <div>
                <PhotoSlot ratio="16/10" accent={GREEN} src="/gallery/223999-2.jpg" caption="방가수 — 현금근로(Cash for Work)로 농업 접근로를 복구하며 작업 자재를 전달받는 주민들." />
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, margin: '16px 0 10px' }}>
                  Central African Rep. · 부아르 · 방가수 · 생계 역량 강화 및 자산 조성 기회 제공
                </p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  중앙아프리카공화국 음보무·우아카 주에서는 <strong style={{ color: 'var(--midnight)' }}>조건부 현금</strong>을 통한
                  생계 역량 강화 및 자산 조성 기회 제공을 운영했습니다. 자루아 마을 농업그룹의 피에르 파리 씨는 경작지를 0.5헥타르에서 3헥타르로
                  넓혀 땅콩과 벼를 심었습니다. 바지코 마을 주민들은 현금근로(Cash for Work)로 농업용 도로를 보수하고
                  농기구·장비를 지원받아, 농산물 운반과 시장 접근이 한결 수월해졌습니다.
                </p>
                <Quote
                  accent={GREEN}
                  text="조건부 현금 지원이 우리를 움직이게 했습니다. 경작지를 3헥타르까지 넓혀 땅콩과 벼, 두 작물을 심었습니다."
                  source="피에르 파리 · 자루아 농업그룹 대표"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
      </ScrollReveal>
    </div>
  )
}
