import ProjectTable from './ProjectTable.jsx'
import DistributionCharts from './DistributionCharts.jsx'
import NarrativePrograms, { PhotoSlot, Quote } from './NarrativePrograms.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import FoodMixChart from './FoodMixChart.jsx'
import useIsMobile from '../lib/useIsMobile.js'

const TEAL = '#0E7C7B'
const RED = '#C8102E'

/* 01–03 활동 하단 현장 스토리 블록 */
function FieldStory({ accent, eyebrow, caption, quote, quoteSource, photo, children }) {
  const isMobile = useIsMobile()
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
      gap: isMobile ? 0 : 48,
      marginTop: 36,
      paddingTop: 32,
      borderTop: '1px solid var(--field-100)',
    }}>
      {!isMobile && <div />}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
        <PhotoSlot accent={accent} ratio="4/3" src={photo} caption={caption} />
        <div>
          <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: '0 0 12px' }}>
            {eyebrow}
          </p>
          <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 15, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
            {children}
          </p>
          {quote && <Quote accent={accent} text={quote} source={quoteSource} />}
        </div>
      </div>
    </div>
  )
}

const ROW = {
  display: 'grid',
  gridTemplateColumns: '120px 1fr 1fr',
  gap: 48,
  alignItems: 'start',
}

export default function InterventionsSection() {
  const isMobile = useIsMobile()
  const row = isMobile ? { display: 'grid', gridTemplateColumns: '1fr', gap: 16, alignItems: 'start' } : ROW
  return (
    <section id="sec-what" style={{
      background: '#fff',
      borderTop: '1px solid var(--field-200)',
      borderBottom: '1px solid var(--field-200)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '56px 20px' : '120px 64px' }}>

        {/* Section header — 3-col editorial grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 760px 1fr', gap: isMobile ? 20 : 0, marginBottom: isMobile ? 40 : 80 }}>
          <div style={{ alignSelf: 'start' }}>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', margin: '0 0 12px' }}>
              Chapter III
            </p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--grey-600)', margin: 0 }}>
              WHAT · 배분된 것들
            </p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: isMobile ? 30 : 54, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--midnight)', margin: 0, wordBreak: 'keep-all' }}>
              실제로 무엇이,<br />얼마나 전달되었나.
            </h2>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 18, lineHeight: 1.85, color: 'var(--grey-800)', margin: '36px 0 0', wordBreak: 'keep-all', maxWidth: '46ch' }}>
              수혜자 수가 아니라 — 현장에 도착한 식량의 무게, 가정의 손에 닿은 현금,
              그리고 아이의 입에 들어간 영양치료식의 양으로 보여드립니다.
              20개 사업, 13개국 누적입니다.
            </p>
          </div>
          <div />
        </div>

        {/* Editorial rows + field stories */}
        <div style={{ borderTop: '2px solid var(--midnight)' }}>

          {/* 01 — 일반식량 */}
          <ScrollReveal from="left">
          <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
            <div style={row}>
              <p className="num" style={{ fontSize: isMobile ? 48 : 88, lineHeight: 0.85, color: 'var(--orange)', margin: 0, letterSpacing: '-0.04em' }}>01</p>
              <div>
                <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>일반식량 배분</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>In-kind Food Distribution</p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.8, color: 'var(--grey-800)', margin: '20px 0 0', wordBreak: 'keep-all' }}>
                  분쟁·기후·경제 충격으로 식량을 잃은 가정에 수수·콩·옥수수·식용유 등 현물 식량을
                  정기 배분합니다. 1인 최소 2,100kcal 기준으로 구성하며, 14개 사업(8개국)에 걸쳐 총
                  10,235.1톤이 배분되었습니다.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="num tnum" style={{ fontSize: isMobile ? 44 : 72, color: 'var(--orange)', margin: 0, lineHeight: 0.85 }}>
                  10,235.1<span style={{ fontSize: 28, color: 'var(--grey-500)', marginLeft: 4, fontWeight: 500, letterSpacing: 0 }}>톤</span>
                </p>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '10px 0 0' }}>
                  tonnes distributed
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--field-200)' }}>
                  <p className="num tnum" style={{ fontSize: 32, color: 'var(--grey-700)', margin: 0 }}>$16.0M</p>
                  <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-500)', margin: '4px 0 0' }}>≈ 213억원</p>
                  <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '6px 0 0' }}>
                    commodity value (USD)
                  </p>
                </div>
              </div>
            </div>

            <FieldStory
              accent="var(--orange)"
              eyebrow="Field Story · 수단"
              photo="/gallery/223711-3.jpg"
              caption="수단 식량 배분 현장 — 트럭으로 반입된 식량이 분배소에서 배분을 기다립니다."
              quote="아이들이 더는 굶지 않게 되자, 비로소 내일을 계획할 수 있었습니다."
              quoteSource="하와 이스마일 · 아부주바이하 캠프, 네 자녀의 어머니"
            >
              분쟁으로 남코르도판 아부주바이하로 피난한 <strong style={{ color: 'var(--midnight)' }}>하와 이스마일(32세)</strong>은
              네 자녀를 키우는 어머니입니다. 2025년 8~9월, WFP와 월드비전은 이곳 9,829명에게 수수·렌틸·식용유·소금을
              배분했습니다. 식량 지원으로 끼니 걱정을 던 하와는 시장 여성들에게서 <strong style={{ color: 'var(--orange)' }}>비누
              만드는 법</strong>을 배워 작은 사업을 시작했고, 지금은 다른 피난 여성들을 고용해 함께 생계를 꾸립니다.
            </FieldStory>

            <FoodMixChart />
          </article>
          </ScrollReveal>

          {/* 02 — 현금/교환권 */}
          <ScrollReveal from="right">
          <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
            <div style={row}>
              <p className="num" style={{ fontSize: isMobile ? 48 : 88, lineHeight: 0.85, color: TEAL, margin: 0, letterSpacing: '-0.04em' }}>02</p>
              <div>
                <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>현금 / 교환권 배분</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>Cash &amp; Voucher Assistance</p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.8, color: 'var(--grey-800)', margin: '20px 0 0', wordBreak: 'keep-all' }}>
                  시장이 작동하는 지역에서 현금이나 교환권을 지급해 수혜 가정이 직접 식량을 구매합니다.
                  운송·보관 비용을 줄이고 수혜자에게 선택권을 돌려주는 방식으로, 10개 사업(9개국)이 현금
                  또는 교환권 요소를 포함합니다.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="num tnum" style={{ fontSize: isMobile ? 44 : 72, color: TEAL, margin: 0, lineHeight: 0.85 }}>$5.1M</p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--grey-500)', margin: '6px 0 0' }}>≈ 68억원</p>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '10px 0 0' }}>
                  cash &amp; voucher (USD)
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--field-200)' }}>
                  <p className="num" style={{ fontSize: 32, color: TEAL, margin: 0 }}>
                    10<span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 16, marginLeft: 4 }}>개 사업</span>
                  </p>
                  <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-600)', margin: '6px 0 0' }}>현금/교환권 배분 포함</p>
                </div>
              </div>
            </div>

            <FieldStory
              accent={TEAL}
              eyebrow="Field Story · 방글라데시 콕스바자르"
              photo="/gallery/223748-3.jpg"
              caption="콕스바자르 캠프 — 식량 전자바우처(E-Voucher) 토큰을 받는 로힝야 수혜자."
              quote="늘 아이들을 어떻게 먹일지 걱정뿐이었습니다. 하지만 WFP가 우리에게 다시 희망을 주었습니다."
              quoteSource="딜 바하르 · 콕스바자르 캠프, 세 자녀의 어머니"
            >
              미얀마의 폭력을 피해 방글라데시로 온 로힝야 난민 <strong style={{ color: 'var(--midnight)' }}>딜 바하르(30세)</strong>는
              캠프에서 남편을 잃고 세 아이를 홀로 키웁니다. 현물 배급이 <strong style={{ color: TEAL }}>전자바우처(E-Voucher)</strong>로
              전환되면서, 그녀는 매달 정해진 한도 안에서 원하는 식품을 직접 골라 살 수 있게 됐습니다. 여성 가구주를 위한
              신선식품 바우처로 채소·생선·닭고기까지 구매해 균형 잡힌 식단을 차립니다.
            </FieldStory>
          </article>
          </ScrollReveal>

          {/* 03 — 영양 치료식 */}
          <ScrollReveal from="left">
          <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
            <div style={row}>
              <p className="num" style={{ fontSize: isMobile ? 48 : 88, lineHeight: 0.85, color: RED, margin: 0, letterSpacing: '-0.04em' }}>03</p>
              <div>
                <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>영양실조치료 보충식 배분</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>Therapeutic &amp; Supplementary Food</p>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.8, color: 'var(--grey-800)', margin: '20px 0 0', wordBreak: 'keep-all' }}>
                  5세 미만 아동·임산부·수유부에게 플럼피넛 등 영양실조치료 보충식을 배분합니다.
                  상완위 둘레 측정법으로 중증·중등도 급성 영양실조를 진단한 후 지급하며, 마을 어머니 자조그룹이 추적 관리합니다.
                  9개 사업에서 998.1톤이 배분되었습니다.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="num tnum" style={{ fontSize: isMobile ? 44 : 72, color: RED, margin: 0, lineHeight: 0.85 }}>
                  998.1<span style={{ fontSize: 28, color: 'var(--grey-500)', marginLeft: 4, fontWeight: 500, letterSpacing: 0 }}>톤</span>
                </p>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '10px 0 0' }}>
                  therapeutic food
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--field-200)' }}>
                  <p className="num" style={{ fontSize: 32, color: RED, margin: 0 }}>
                    9<span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 16, marginLeft: 4 }}>개 사업</span>
                  </p>
                  <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-600)', margin: '6px 0 0' }}>영양실조치료 보충식 배분 포함</p>
                </div>
              </div>
            </div>

            <FieldStory
              accent={RED}
              eyebrow="Field Story · 에티오피아 티그라이"
              photo="/gallery/223707-1.jpg"
              caption="티그라이 표적보충영양사업(TSFP) — 어머니들에게 영양실조치료 보충식을 배분하는 현장."
              quote="제대로 먹지 못해 아기 건강이 늘 걱정이었어요. 이제는 더 건강해졌고, 아이를 돌보는 데 자신감이 생겼습니다."
              quoteSource="티르하스 체가이 · 티그라이 아디하위 국내 실향민 캠프, 수유모"
            >
              2년간의 봉쇄로 영양 위기에 놓인 에티오피아 티그라이에서, WFP의 <strong style={{ color: 'var(--midnight)' }}>표적보충영양사업(TSFP)</strong>은
              76개 배분소를 통해 19,122명 — 5세 미만 아동 12,906명과 임산부·수유부 6,216명 — 에게 영양식을 전달했습니다.
              수유모 <strong style={{ color: 'var(--midnight)' }}>티르하스 체가이(20세)</strong>는 중등도 영양실조(상완위 둘레 22.7cm)로
              입소해, 격주로 받은 <strong style={{ color: RED }}>영양강화식(CSB++)</strong>과 모유수유·위생 상담을 통해 한 달 만에
              23.3cm로 회복하고 퇴소했습니다.
            </FieldStory>
          </article>
          </ScrollReveal>
        </div>

        {/* 04 학교 급식 · 05 생계 역량 강화 — 사업 내러티브 */}
        <NarrativePrograms />

        {/* 국가별 배분 현황 표 */}
        <ProjectTable />

        {/* 국가별 막대 차트 */}
        <DistributionCharts />
      </div>
    </section>
  )
}
