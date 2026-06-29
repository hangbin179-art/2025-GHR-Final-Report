import ProjectTable from './ProjectTable.jsx'
import DistributionCharts from './DistributionCharts.jsx'
import NarrativePrograms, { PhotoSlot, Quote } from './NarrativePrograms.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import FoodMixChart from './FoodMixChart.jsx'
import useIsMobile from '../lib/useIsMobile.js'

const TEAL = '#0E7C7B'
const RED = '#C8102E'

/* 01–03 field-story block beneath each activity */
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
          <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 15, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
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
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, fontWeight: 700, color: 'var(--grey-600)', margin: 0 }}>
              WHAT · What Was Delivered
            </p>
          </div>
          <div>
            <h2 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: isMobile ? 30 : 54, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--midnight)', margin: 0, wordBreak: 'keep-all' }}>
              What was delivered,<br />and how much.
            </h2>
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 18, lineHeight: 1.85, color: 'var(--grey-800)', margin: '36px 0 0', wordBreak: 'keep-all', maxWidth: '46ch' }}>
              Not just the number of beneficiaries — but the weight of food that reached the field, the cash placed in families' hands,
              and the amount of therapeutic food that reached a child's mouth.
              Cumulative across 20 projects in 13 countries.
            </p>
          </div>
          <div />
        </div>

        {/* Editorial rows + field stories */}
        <div style={{ borderTop: '2px solid var(--midnight)' }}>

          {/* 01 — In-kind Food */}
          <ScrollReveal from="left">
          <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
            <div style={row}>
              <p className="num" style={{ fontSize: isMobile ? 48 : 88, lineHeight: 0.85, color: 'var(--orange)', margin: 0, letterSpacing: '-0.04em' }}>01</p>
              <div>
                <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>In-kind Food Distribution</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>In-kind Food Distribution</p>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.8, color: 'var(--grey-800)', margin: '20px 0 0', wordBreak: 'keep-all' }}>
                  Families who have lost their food to conflict, climate and economic shocks receive regular distributions of
                  in-kind commodities such as sorghum, beans, maize and cooking oil. Each ration is composed to meet a minimum of
                  2,100 kcal per person per day. Across 14 projects in 8 countries, a total of 10,235.1 tonnes was distributed.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="num tnum" style={{ fontSize: isMobile ? 44 : 72, color: 'var(--orange)', margin: 0, lineHeight: 0.85 }}>
                  10,235.1<span style={{ fontSize: 28, color: 'var(--grey-500)', marginLeft: 4, fontWeight: 500, letterSpacing: 0 }}>tonnes</span>
                </p>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '10px 0 0' }}>
                  tonnes distributed
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--field-200)' }}>
                  <p className="num tnum" style={{ fontSize: 32, color: 'var(--grey-700)', margin: 0 }}>$16.0M</p>
                  <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '6px 0 0' }}>
                    commodity value (USD)
                  </p>
                </div>
              </div>
            </div>

            <FieldStory
              accent="var(--orange)"
              eyebrow="Field Story · Sudan"
              photo="/gallery/223711-3.jpg"
              caption="Food distribution site in Sudan — commodities trucked in await distribution at the dispatch point."
              quote="Once my children no longer went hungry, I could finally begin to plan for tomorrow."
              quoteSource="Hawa Ismail · Abu Jubaiha camp, mother of four"
            >
              Displaced by conflict to Abu Jubaiha in South Kordofan, <strong style={{ color: 'var(--midnight)' }}>Hawa Ismail (32)</strong> is
              a mother raising four children. In August–September 2025, WFP and World Vision distributed sorghum, lentils, cooking oil and salt
              to 9,829 people here. With the food assistance easing her worry about meals, Hawa learned <strong style={{ color: 'var(--orange)' }}>how to
              make soap</strong> from women in the market and started a small business; today she employs other displaced women and they earn a living together.
            </FieldStory>

            <FoodMixChart />
          </article>
          </ScrollReveal>

          {/* 02 — Cash / Voucher */}
          <ScrollReveal from="right">
          <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
            <div style={row}>
              <p className="num" style={{ fontSize: isMobile ? 48 : 88, lineHeight: 0.85, color: TEAL, margin: 0, letterSpacing: '-0.04em' }}>02</p>
              <div>
                <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>Cash &amp; Voucher Assistance</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>Cash &amp; Voucher Assistance</p>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.8, color: 'var(--grey-800)', margin: '20px 0 0', wordBreak: 'keep-all' }}>
                  In areas where markets are functioning, families receive cash or vouchers to buy food for themselves directly.
                  This approach lowers transport and storage costs and gives choice back to beneficiaries; 10 projects in 9 countries
                  include a cash or voucher component.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="num tnum" style={{ fontSize: isMobile ? 44 : 72, color: TEAL, margin: 0, lineHeight: 0.85 }}>$5.1M</p>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '10px 0 0' }}>
                  cash &amp; voucher (USD)
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--field-200)' }}>
                  <p className="num" style={{ fontSize: 32, color: TEAL, margin: 0 }}>
                    10<span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 16, marginLeft: 4 }}>projects</span>
                  </p>
                  <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-600)', margin: '6px 0 0' }}>with cash / voucher assistance</p>
                </div>
              </div>
            </div>

            <FieldStory
              accent={TEAL}
              eyebrow="Field Story · Cox's Bazar, Bangladesh"
              photo="/gallery/223748-3.jpg"
              caption="Cox's Bazar camp — a Rohingya beneficiary receives a food e-voucher token."
              quote="I was always worried about how to feed my children. But WFP gave us hope again."
              quoteSource="Dil Bahar · Cox's Bazar camp, mother of three"
            >
              <strong style={{ color: 'var(--midnight)' }}>Dil Bahar (30)</strong>, a Rohingya refugee who fled violence in Myanmar to Bangladesh,
              lost her husband in the camp and raises three children alone. As in-kind rations shifted to an <strong style={{ color: TEAL }}>e-voucher</strong>,
              she can now choose and buy the foods she wants herself, within a set monthly limit. With a fresh-food voucher for women heads of household,
              she buys vegetables, fish and even chicken to set a balanced table.
            </FieldStory>
          </article>
          </ScrollReveal>

          {/* 03 — Nutrition Treatment */}
          <ScrollReveal from="left">
          <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
            <div style={row}>
              <p className="num" style={{ fontSize: isMobile ? 48 : 88, lineHeight: 0.85, color: RED, margin: 0, letterSpacing: '-0.04em' }}>03</p>
              <div>
                <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>Therapeutic &amp; Supplementary Food</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>Therapeutic &amp; Supplementary Food</p>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.8, color: 'var(--grey-800)', margin: '20px 0 0', wordBreak: 'keep-all' }}>
                  Children under five, pregnant and breastfeeding women receive therapeutic and supplementary food such as Plumpy'Nut.
                  It is provided after screening for severe and moderate acute malnutrition using mid-upper-arm circumference measurement,
                  with village mothers' self-help groups following up. Across 9 projects, 998.1 tonnes was distributed.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="num tnum" style={{ fontSize: isMobile ? 44 : 72, color: RED, margin: 0, lineHeight: 0.85 }}>
                  998.1<span style={{ fontSize: 28, color: 'var(--grey-500)', marginLeft: 4, fontWeight: 500, letterSpacing: 0 }}>t</span>
                </p>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: '10px 0 0' }}>
                  therapeutic food
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--field-200)' }}>
                  <p className="num" style={{ fontSize: 32, color: RED, margin: 0 }}>
                    9<span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 16, marginLeft: 4 }}>projects</span>
                  </p>
                  <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-600)', margin: '6px 0 0' }}>with therapeutic &amp; supplementary food</p>
                </div>
              </div>
            </div>

            <FieldStory
              accent={RED}
              eyebrow="Field Story · Tigray, Ethiopia"
              photo="/gallery/223707-1.jpg"
              caption="Tigray Targeted Supplementary Feeding Programme (TSFP) — distributing therapeutic & supplementary food to mothers."
              quote="My baby's health was a constant worry because we couldn't eat properly. Now she is healthier, and I feel confident caring for her."
              quoteSource="Tirhas Tsegay · Adi Hawi IDP camp, Tigray, breastfeeding mother"
            >
              In Tigray, Ethiopia, left in nutritional crisis by two years of blockade, WFP's <strong style={{ color: 'var(--midnight)' }}>Targeted Supplementary Feeding Programme (TSFP)</strong> reached
              19,122 people — 12,906 children under five and 6,216 pregnant and breastfeeding women — through 76 distribution points.
              Breastfeeding mother <strong style={{ color: 'var(--midnight)' }}>Tirhas Tsegay (20)</strong> was admitted with moderate malnutrition (mid-upper-arm circumference 22.7 cm).
              Through the <strong style={{ color: RED }}>fortified blended food (CSB++)</strong> she received every two weeks, together with breastfeeding and hygiene counselling, she recovered to
              23.3 cm within a month and was discharged.
            </FieldStory>
          </article>
          </ScrollReveal>
        </div>

        {/* 04 School Feeding · 05 Livelihood & Resilience — project narratives */}
        <NarrativePrograms />

        {/* Distribution by country table */}
        <ProjectTable />

        {/* Distribution by country bar charts */}
        <DistributionCharts />
      </div>
    </section>
  )
}
