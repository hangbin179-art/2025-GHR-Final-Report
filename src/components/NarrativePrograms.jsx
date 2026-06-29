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
        <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', margin: '10px 0 0', lineHeight: 1.6 }}>
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
      <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 17, lineHeight: 1.7, color: 'var(--midnight)', fontWeight: 500, margin: 0, wordBreak: 'keep-all' }}>
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
        {unit && <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 600, fontSize: 13, color: 'var(--grey-600)', marginLeft: 3 }}>{unit}</span>}
      </p>
      <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 600, color: 'var(--grey-600)', margin: '8px 0 0', lineHeight: 1.4 }}>
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
        <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 32, color: 'var(--midnight)', margin: 0 }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--grey-600)', margin: '6px 0 0' }}>{titleEn}</p>
      </div>
    </div>
  )
}

export default function NarrativePrograms() {
  const isMobile = useIsMobile()
  return (
    <div style={{ marginTop: 24 }}>

      {/* ════════ 04 — School Feeding ════════ */}
      <ScrollReveal from="right">
      <article style={{ padding: '40px 0', borderBottom: '1px solid var(--field-200)' }}>
        <PartHeader num="04" title="School Feeding" titleEn="Home-Grown School Feeding" accent={AMBER} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? 0 : 48 }}>
          <div />
          <div>
            {/* Intro + lead stats */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.85, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                Home-Grown School Feeding does not stop at providing a meal. Schools grow their own crops, and
                students carry those skills back home. In South Sudan, the <strong style={{ color: 'var(--midnight)' }}>Juba & Yambio Home-Grown School Feeding programme</strong> served
                meals to more than 13,000 children across 21 primary schools in Central Equatoria, combining agricultural
                education through school gardens. Over the course of 2025, the programme reached 47,468 people in total.
              </p>
              <div style={{
                background: AMBER_BG,
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                gap: 20,
              }}>
                <StatChip value="21" unit="schools" label="Primary schools in Central Equatoria" accent={AMBER} />
                <StatChip value="47,468" unit="people" label="Total programme beneficiaries" accent={AMBER} />
              </div>
            </div>

            {/* Field story — Kapuri */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.85fr 1fr', gap: isMobile ? 20 : 40, marginTop: 36, alignItems: 'start' }}>
              <PhotoSlot accent={AMBER} src="/gallery/223753-1.jpg" caption="Juba Home-Grown School Feeding programme, South Sudan — students tending the school garden alongside their teacher." />
              <div>
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER, margin: '0 0 12px' }}>
                  Field Story · Kapuri Primary School
                </p>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 15, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  Fourth-graders <strong style={{ color: 'var(--midnight)' }}>Kiden (13)</strong> and <strong style={{ color: 'var(--midnight)' }}>Yawa (12)</strong> learned
                  land preparation, seedbed making, transplanting, crop rotation, weeding, and irrigation in the school garden. The two
                  students brought those skills home and, together with their parents, planted <strong style={{ color: AMBER }}>cowpeas, okra, and tomatoes</strong>.
                  The family harvested every three to four days, eating some of the produce and selling the rest at the market. Daily sales earned
                  30,000–35,000 South Sudanese pounds (about USD 5–6). Their father, Michael Suba, used this income to buy his children's
                  school supplies and contribute to the school development fund.
                </p>
                <Quote
                  accent={AMBER}
                  text="I have no job, so the money I earn selling vegetables at the market is all I have to buy my children's books and pay their school fees."
                  source="Michael Suba · Kapuri village, father of two students"
                />
              </div>
            </div>

            {/* School gardens — aggregate harvest & income */}
            <div style={{ marginTop: 36, paddingTop: 32, borderTop: '1px solid var(--field-200)' }}>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER, margin: '0 0 16px' }}>
                School Gardens · Harvest from the school plots
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  Vegetables grown by the schools themselves were added to the WFP ration. In Juba County, gardens were
                  established in <strong style={{ color: 'var(--midnight)' }}>20 of the 21 targeted schools</strong>, supported with seeds and farming
                  tools to grow tomatoes, eggplant, okra, maize, and more. Most of the harvest went back into student
                  meals, and of the rest <strong style={{ color: AMBER }}>316 kg was sold at market for about 400,000 South Sudanese pounds (about USD 70)</strong>,
                  contributing to school running costs. Nabagu Primary School, for example, harvested 750 kg of maize — 550 kg for meals and 200 kg for sale.
                </p>
                <div style={{ background: AMBER_BG, borderRadius: 12, padding: 24, display: 'flex', gap: 20 }}>
                  <StatChip value="2,269" unit="kg" label="Total school-garden harvest" accent={AMBER} />
                  <StatChip value="1,403" unit="kg" label="Consumed in school meals" accent={AMBER} />
                </div>
              </div>
            </div>

            {/* Secondary — Chad */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--field-200)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-600)', border: '1px solid var(--field-200)', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                Chad · Farchana &amp; more
              </span>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, wordBreak: 'keep-all' }}>
                In eastern Chad (Abéché, Farchana, Guéréda, Goz Beïda, and Iriba), <strong style={{ color: 'var(--midnight)' }}>Emergency School Feeding</strong> was
                delivered through cash distribution. Food storage warehouses were built to establish a supply chain capable of
                providing meals reliably even during the rainy season.
              </p>
            </div>
          </div>
        </div>
      </article>
      </ScrollReveal>

      {/* ════════ 05 — Livelihood & Resilience ════════ */}
      <ScrollReveal from="left">
      <article style={{ padding: '40px 0 8px' }}>
        <PartHeader num="05" title="Livelihood & Resilience" titleEn="Livelihoods & Resilience" accent={GREEN} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr', gap: isMobile ? 0 : 48 }}>
          <div />
          <div>
            {/* Intro + lead stats */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 16, lineHeight: 1.85, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                Beyond handing out food, the goal is to help people earn for themselves. In Kenya, the <strong style={{ color: 'var(--midnight)' }}>Makueni & Kitui
                Sustainable Food Systems programme</strong> was designed as a "non-food" project that distributes no food directly,
                operating in arid and semi-arid regions prone to frequent drought. In the two counties — where poverty rates reach
                64.1% and 63.1% respectively — 11,306 people joined Village Savings and Loan Associations (VSLAs), gaining access to
                savings, microloans, and income-generating opportunities.
              </p>
              <div style={{
                background: GREEN_BG,
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                gap: 20,
              }}>
                <StatChip value="11,306" unit="people" label="VSLA participants (Kenya)" accent={GREEN} />
                <StatChip value="0.5→3" unit="ha" label="Farmland expansion (Zaroua, Central African Republic)" accent={GREEN} />
              </div>
            </div>

            {/* Two story cards side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 28 : 32, marginTop: 36 }}>

              {/* Kenya SFSP */}
              <div>
                <PhotoSlot ratio="16/10" accent={GREEN} src="/gallery/223864-2.jpg" caption="Makueni & Kitui resilience programme — a beneficiary building assets through goat rearing." />
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, margin: '16px 0 10px' }}>
                  Kenya · Makueni · Kitui
                </p>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  Community members grew drought-resistant crops such as <strong style={{ color: GREEN }}>green grams, cowpeas, millet, and sorghum</strong>,
                  and learned climate-smart agriculture and poultry- and goat-rearing skills. Through the <strong style={{ color: 'var(--midnight)' }}>R4 Rural Resilience Initiative</strong> they took out crop insurance to be compensated for losses from drought, flooding, and pests. This economic buffer
                  raised households' purchasing power, allowing them to cover their children's nutrition, education, and healthcare costs more steadily.
                </p>
              </div>

              {/* CAR FFA */}
              <div>
                <PhotoSlot ratio="16/10" accent={GREEN} src="/gallery/223999-2.jpg" caption="Bangassou — community members receiving work materials while restoring farm access roads through Cash for Work." />
                <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, margin: '16px 0 10px' }}>
                  Central African Rep. · Bouar · Bangassou · Livelihood &amp; asset-building support
                </p>
                <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.8, color: 'var(--grey-800)', margin: 0, wordBreak: 'keep-all' }}>
                  In the Mbomou and Ouaka prefectures of the Central African Republic, livelihood strengthening and asset-building
                  opportunities were delivered through <strong style={{ color: 'var(--midnight)' }}>conditional cash</strong>. Pierre Pari, of the Zaroua village
                  farming group, expanded his plot from 0.5 hectares to 3 hectares to plant groundnuts and rice. Residents of Baziko village repaired
                  agricultural roads through Cash for Work and received farming tools and equipment, making it far easier to transport produce and reach markets.
                </p>
                <Quote
                  accent={GREEN}
                  text="The conditional cash support got us moving. I expanded my plot to three hectares and planted two crops — groundnuts and rice."
                  source="Pierre Pari · leader of the Zaroua farming group"
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
