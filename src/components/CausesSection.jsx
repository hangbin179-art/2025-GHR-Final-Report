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
            <p lang="en" style={{
              fontFamily: 'var(--font-kr)',
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--grey-600)',
              margin: '4px 0 0',
            }}>
              Causes & Impact of the Food Crisis
            </p>
          </div>
          <div>
            <h2 lang="en" style={{
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
              Why does the world still go hungry?<br />
              Not one cause, but three colliding forces.
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
            <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 22, color: 'var(--midnight)', margin: 0 }}>
              Conflict & Instability
            </h3>
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
              In countries such as DR Congo and Sudan, prolonged civil war forces<br />mass displacement.
              Conflict drives a vicious cycle: displacement &rarr; collapse of infrastructure and markets &rarr; unstable aid
              &rarr; deepening food crisis.
            </p>
            <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="num" style={{ fontSize: 42, color: 'var(--red-800)' }}>
                15<span style={{ fontSize: 24, color: 'var(--grey-500)' }}>/16</span>
              </span>
              <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
                of the 2025 major food-crisis<br />countries are affected by conflict
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
            <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 22, color: 'var(--midnight)', margin: 0 }}>
              Climate Change
            </h3>
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
              Frequent droughts and floods, along with erratic weather, lead to failed harvests and agricultural losses.
              Climate shocks directly erode food productivity in the most vulnerable regions.
            </p>
            <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 30, color: 'var(--blue-900)', letterSpacing: '-0.02em' }}>
                Drought & Flood
              </span>
              <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
                leading causes of failed harvests<br />and agricultural losses
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
            <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 22, color: 'var(--midnight)', margin: 0 }}>
              Economic Shocks
            </h3>
            <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
              Soaring inflation and surging food prices destroy the purchasing power of the most vulnerable.
              As needs rise but humanitarian funding falls, rations can shrink to less than
              50% of the recommended daily calories.
            </p>
            <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="num" style={{ fontSize: 42, color: 'var(--orange-900)' }}>
                &lt;50<span style={{ fontSize: 24 }}>%</span>
              </span>
              <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
                reduced ration size<br />(vs. recommended calories)
              </span>
            </div>
          </article>
        </div>

        {/* ── Impact of the food crisis: the shadow over children (WFP×WV In the Shadow of Hunger, 2026) ── */}
        <div style={{ marginTop: isMobile ? 48 : 72 }}>
          {/* Sub-header */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 16 : 48, marginBottom: isMobile ? 24 : 36 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>
                Impact on Children
              </p>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>
                The shadow over children
              </p>
            </div>
            <div>
              <h3 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--midnight)', margin: 0 }}>
                As the crisis deepens, its shadow falls first and hardest on children.
              </h3>
              <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 13, lineHeight: 1.7, color: 'var(--grey-600)', margin: '12px 0 0' }}>
                &ldquo;In the Shadow of Hunger&rdquo; (2026), a joint study by WFP and World Vision conducted across eight food-crisis countries,
                analyses the toll that food insecurity and ration cuts take on children.
              </p>
            </div>
          </div>

          {/* 3-col impact card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            <ImpactCard
              eyebrow="Education"
              accent="var(--orange-900)"
              accentBg="var(--orange-100)"
              title="Disrupted Education"
              body="When meals run short, children leave school to help support their families. Absences and dropouts rise, and some are pushed into begging and labour."
              stat="School → Labour"
              statLabel={<>learning lost as children<br />are drawn into earning a living</>}
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>}
            />
            <ImpactCard
              eyebrow="Protection"
              accent="var(--red-800)"
              accentBg="var(--red-100)"
              title="Child Marriage & Family Separation"
              body="Families whose livelihoods have collapsed marry children off early to have one fewer mouth to feed, or are scattered apart. The protective net around children is the first to break."
              stat="~2x"
              statLabel={<>higher risk of child marriage and<br />family separation in ration-cut households</>}
              icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" /><path d="m12 5-2 6h3l-2 6" /></svg>}
            />
            <ImpactCard
              eyebrow="Mental Health"
              accent="var(--blue-900)"
              accentBg="var(--blue-100)"
              title="Mental-Health Crisis"
              body="Hunger and uncertainty leave deep anxiety in children's minds. As stress within the household grows, the risks of depression and abuse rise alongside it."
              stat="Anxiety · Depression"
              statLabel={<>the psychological toll and risk of abuse<br />left by hunger and instability</>}
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
      <h4 lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 20, color: 'var(--midnight)', margin: 0 }}>
        {title}
      </h4>
      <p lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0, flex: 1 }}>
        {body}
      </p>
      <div style={{ borderTop: '1px solid var(--field-200)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 28, color: accent, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
          {stat}
        </span>
        <span lang="en" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', lineHeight: 1.4 }}>
          {statLabel}
        </span>
      </div>
    </article>
  )
}
