export default function CountryDeepDive() {
  return (
    <section style={{
      background: '#fff',
      borderTop: '1px solid var(--field-200)',
      borderBottom: '1px solid var(--field-200)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 32px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', margin: 0 }}>
              05 — Country
            </p>
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, fontWeight: 700, color: 'var(--grey-600)', margin: '4px 0 0' }}>
              현장 포커스 — 콩고민주공화국 남부 키부
            </p>
          </div>
          <div>
            <h2 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 36, lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--midnight)', margin: 0, maxWidth: '30ch' }}>
              콩고민주공화국 남부 키부 — 가장 큰 사업.<br />3,088톤의 식탁, 74.9톤의 치료식.
            </h2>
          </div>
        </div>

        {/* 2-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
          {/* Photo slot — drag-and-drop placeholder */}
          <div>
            <ImageSlot />
            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-600)', margin: '12px 0 0', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--midnight)' }}>사진 캡션 ·</strong>{' '}
              2025년 1월, 남부 키부 통합 식량 배분 현장. 사진은 추후 현장 사진으로 교체 예정.
            </p>
          </div>

          {/* Dossier */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{
                fontFamily: 'var(--font-en)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--grey-600)',
                border: '1px solid var(--field-200)',
                padding: '4px 8px',
                borderRadius: 4,
              }}>
                PBAS 223847
              </span>
              <span style={{
                fontFamily: 'var(--font-en)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--red-800)',
                background: 'var(--red-100)',
                padding: '4px 8px',
                borderRadius: 4,
              }}>
                Conflict-affected
              </span>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-en)', fontSize: 14, color: 'var(--grey-600)', margin: 0 }}>
                DR Congo · South Kivu · Integrated Food Assistance 2025
              </p>
              <h3 lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 700, fontSize: 28, color: 'var(--midnight)', margin: '6px 0 0' }}>
                남부 키부
              </h3>
            </div>

            <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-700)', margin: 0 }}>
              동부 콩고민주공화국 남부 키부주는 M23 무장세력의 진격과 르완다·우간다 국경의 만성적
              불안정으로 대규모 내부 실향민이 발생한 지역입니다. 본 사업은 일반식량 배분(GFD)과
              영양 치료(SAM/MAM)를 통합 패키지로 결합해 본 다자기구협력사업 20개 사업 중
              단일 규모로 가장 큰 식량 — 3,088.2톤 — 을 배분했습니다.
            </p>

            {/* 2×2 KPI grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              background: 'var(--field-200)',
              border: '1px solid var(--field-200)',
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              <KpiCell label="식량 배분" value="3,088.2" unit="톤" color="var(--orange)" />
              <KpiCell label="식량 가액 (USD)" value="$5.05" unit="M" color="var(--orange)" unitEn />
              <KpiCell label="영양 치료식" value="74.9" unit="톤" color="#C8102E" />
              <div style={{ background: '#fff', padding: 18 }}>
                <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 700, color: 'var(--grey-600)', margin: '0 0 6px' }}>
                  현금 · 바우처
                </p>
                <p className="num tnum" style={{ fontSize: 24, color: '#0E7C7B', margin: 0 }}>
                  —<span lang="ko" style={{ fontFamily: 'var(--font-kr)', fontWeight: 500, fontSize: 12, color: 'var(--grey-600)', marginLeft: 8 }}>안전 미확보로 중단</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function KpiCell({ label, value, unit, color, unitEn }) {
  return (
    <div style={{ background: '#fff', padding: 18 }}>
      <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 11, fontWeight: 700, color: 'var(--grey-600)', margin: '0 0 6px' }}>
        {label}
      </p>
      <p className="num tnum" style={{ fontSize: 24, color, margin: 0 }}>
        {value}
        <span style={{
          fontFamily: unitEn ? 'var(--font-en)' : 'var(--font-kr)',
          fontWeight: unitEn ? 600 : 500,
          fontSize: 12,
          color: 'var(--grey-600)',
          marginLeft: 4,
        }}>
          {unit}
        </span>
      </p>
    </div>
  )
}

function ImageSlot() {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'var(--field-50)',
      border: '2px dashed var(--field-300)',
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--grey-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-600)', margin: 0 }}>
          PHOTO PLACEHOLDER
        </p>
        <p lang="ko" style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--grey-500)', margin: '4px 0 0' }}>
          남부 키부 현장 사진 — 추후 교체 예정
        </p>
      </div>
    </div>
  )
}
