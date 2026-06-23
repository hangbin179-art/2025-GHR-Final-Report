import { Section, SectionHeading } from './ui/Section.jsx'

// Real field stories from 2025 GHR EOP / Quarterly / Success Story reports.
// Source: 2025 GHR 결과보고 폴더 (40+ .docx, 2026-06-22 분석)
const STORIES = [
  {
    id: 's1',
    country: '방글라데시',
    region: '콕스바자르 캠프 11',
    activityLabel: '식량 배분',
    activityColor: '#F47920',
    quote:
      '항상 아이들을 어떻게 먹여야 할지 걱정에 마음이 무거웠어요. 그런데 WFP가 우리에게 희망을 되찾아 주었습니다. 이 지원 덕분에 우리 가족이 살아갈 수 있어요.',
    attribution: '딜 바하르 · 30세 · 여성가구주 로힝야 난민',
    featured: true,
  },
  {
    id: 's2',
    country: '콩고민주공화국',
    region: '남키부 주 카마뇰라',
    activityLabel: '식량 배분',
    activityColor: '#F47920',
    quote:
      '이 보릿고개에 식량을 지원해 준 WFP와 월드비전에 하느님의 축복이 함께하시길 빕니다. 이 취약한 상황 속에서 보여준 그들의 헌신에도 축복이 있기를.',
    attribution: '푸라하 마테소 마리아 · 남키부 카마뇰라 · 8자녀의 어머니',
  },
  {
    id: 's3',
    country: '에티오피아',
    region: '티그레이 아디하우시',
    activityLabel: '영양실조 치료',
    activityColor: '#C8102E',
    quote:
      '프로그램에 참여하기 전엔 제대로 먹지 못하면서 아기 건강이 걱정됐어요. 지원을 받으면서 수유 중 영양이 얼마나 중요한지 배웠습니다. 지금은 더 건강해졌고, 아이를 돌보는 일에 자신감이 생겼어요.',
    attribution: '티르하스 차가이 · 20세 · IDP 센터 수유부',
  },
  {
    id: 's4',
    country: '남수단',
    region: '중앙적도주 카푸리',
    activityLabel: '학교 급식',
    activityColor: '#F4B223',
    quote:
      '이 텃밭이 큰 도움이 됐어요. 저는 일자리가 없어서, 시장에서 채소를 팔아 번 돈으로 아이들 책을 사고 학교에 내는 비용을 냅니다.',
    attribution: '미카엘 수바 · 48세 · 카푸리 초등학교 학부형',
  },
  {
    id: 's5',
    country: '중앙아프리카공화국',
    region: '방가수 바지코 마을',
    activityLabel: '현금성 지원 · FFA',
    activityColor: '#0E7C7B',
    quote:
      '세계비전이 우리 마을에 제공한 도구와 작업 자재 덕분에 농업 접근로가 복구되어, 우리는 만족스럽고 안도하고 있습니다.',
    attribution: '투투 레이몽 · Cash for Work 팀원 · 농업 접근로 복구',
  },
]

// ── Photo placeholder ─────────────────────────────────────────────────────────
// Dashed 1px hairline frame, warm paper-sub fill, centered camera SVG.
// `ratio` = padding-bottom % (CSS aspect-ratio trick).
function PhotoPlaceholder({ ratio = '62.5%', country, region }) {
  return (
    <div
      className="relative w-full overflow-hidden border border-dashed border-ink-line bg-paper-sub"
      style={{ paddingBottom: ratio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
        {/* Camera outline icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D8D2C6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <span className="mono-label mono-label--caps text-center text-ink-line">
          현장 사진 교체 예정
        </span>
      </div>
      {/* Country / region label at bottom-left */}
      {country && (
        <div className="absolute bottom-2 left-3">
          <span className="mono-label bg-paper/80 px-1.5 py-0.5 text-ink-muted">
            {country} · {region}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Quote block ───────────────────────────────────────────────────────────────
// Opening quotation mark in Anton orange → quote text (bold sans) → attribution.
function QuoteBlock({ story, large = false }) {
  return (
    <div className="flex flex-col">
      {/* Activity tag + location */}
      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: story.activityColor }}
          aria-hidden="true"
        />
        <span
          className="mono-label mono-label--caps"
          style={{ color: story.activityColor }}
        >
          {story.activityLabel}
        </span>
        <span className="mono-label text-ink-muted">
          · {story.country}, {story.region}
        </span>
      </div>

      {/* Quotation mark */}
      <span
        className="num-display select-none leading-none text-wv-orange"
        style={{ fontSize: large ? '72px' : '52px', lineHeight: 1 }}
        aria-hidden="true"
      >
        "
      </span>

      {/* Quote text */}
      <p
        className={[
          'mt-1 font-sans font-bold leading-relaxed text-ink [word-break:keep-all]',
          large ? 'text-[19px]' : 'text-[15px]',
        ].join(' ')}
      >
        {story.quote}
      </p>

      {/* Attribution */}
      <div className="mt-5 border-t border-ink-line pt-3">
        <span className="mono-label text-ink-muted">— {story.attribution}</span>
      </div>
    </div>
  )
}

// ── StoriesSection ────────────────────────────────────────────────────────────
export default function StoriesSection() {
  const featured = STORIES[0]
  const grid = STORIES.slice(1)

  return (
    <Section id="stories" py="wide">
      <SectionHeading
        code="05 / 05 — STORIES"
        watermark="VOICES"
        title="현장의 변화 이야기"
        description="숫자 너머의 이야기입니다. 식량·현금·영양 지원이 한 사람의 하루를 어떻게 바꾸는지, 현장의 목소리로 전합니다."
      />

      {/* ── Featured story: photo (left) + quote (right) ── */}
      <div className="mt-14 grid grid-cols-1 items-center gap-x-12 gap-y-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <PhotoPlaceholder
            ratio="62.5%"
            country={featured.country}
            region={featured.region}
          />
        </div>
        <div className="md:col-span-5">
          <QuoteBlock story={featured} large />
        </div>
      </div>

      {/* ── Story grid: 4 portrait cards ── */}
      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 border-t border-ink-line pt-12 sm:grid-cols-2 md:grid-cols-4">
        {grid.map((story) => (
          <div key={story.id} className="flex flex-col gap-6">
            <PhotoPlaceholder
              ratio="125%"
              country={story.country}
              region={story.region}
            />
            <QuoteBlock story={story} />
          </div>
        ))}
      </div>

      {/* ── Photo notice ── */}
      <p className="mt-12 max-w-xl border-t border-ink-line pt-5 font-mono text-[11px] leading-relaxed text-ink-muted">
        수혜자 이야기는 각 사업 결과보고서(EOP·Quarterly·Success Story)에서 수집한 실제 인터뷰입니다.
        현장 사진은 추후 교체 예정 — <code className="text-ink-soft">public/photos/</code>에 파일 추가 후 각 story 객체에 <code className="text-ink-soft">photo</code> 필드를 추가하세요.
      </p>
    </Section>
  )
}
